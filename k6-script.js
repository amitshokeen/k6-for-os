import "./libs/shim/core.js";
import URI from "./libs/urijs.js";
import { check } from 'k6';
import { configuration } from "./configuration.js";
import { fakeQueryString, fakeFromDate, fakeToDate } from "./fakeDataMaker.js"; 


export let options = { 
  //maxRedirects: 4,
  //  duration: '5s',
  //  vus: 5,
  stages: [
    { duration: '10s', target: 10 },
    { duration: '35s', target: 10 },
    { duration: '15s', target: 0 }
  ]
 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  let aggSize = __ENV.AGG_SIZE;
  let response = postman[Request]({
    headers: {
      'Content-Type': 'application/json'
    },
    method: "GET",
    address: configuration().base_url + configuration().query,
    data: JSON.stringify({
            "id": "narratives-aggs-list",
            "params": {

                "query_string": fakeQueryString(),
                "agg_size": aggSize,
                "from_date": fakeFromDate(),
                "to_date": fakeToDate(),
                "size": 3,
                "from": 0,
                "sort_by_trend_score": true
            }
    }),
    auth(config, Var) {
      const address = new URI(config.address);
      address.username(configuration().username);
      address.password(configuration().password);
      config.address = address.toString();
      config.options.auth = "basic";
    }
  });
  let str1 = response.body;
  console.log('took: '+ Number(str1.slice(2,str1.indexOf(',')).split(':')[1]))
  const checkOutput = check (response, {
    'response status 200 ' : (r) => r.status === 200,
  });
  if(!checkOutput) {
    console.log(response.body);
  }
}
