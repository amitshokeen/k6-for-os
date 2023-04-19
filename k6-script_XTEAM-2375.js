import "./libs/shim/core.js";
import URI from "./libs/urijs.js";
import { check } from 'k6';
import { configuration } from "./configuration.js";
import { fakeQueryString, fakeFromDate, fakeToDate } from "./fakeDataMaker.js"; 


export let options = { 
  //maxRedirects: 4,
  // duration: '2s',
  //  vus: 2,
  stages: [
    { duration: '5s', target: 50 },
    { duration: '10s', target: 100 },
    { duration: '60s', target: 500 },
    { duration: '30s', target: 200 },
    { duration: '10s', target: 50 },
    { duration: '5s', target: 0 },
  ]
 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  let aggSize = __ENV.AGG_SIZE;
  const fqs = fakeQueryString();
  let response = postman[Request]({
    headers: {
      'Content-Type': 'application/json'
    },
    method: "GET",
    address: configuration().base_url + configuration().query,
    data: JSON.stringify({
            "id": "narratives-aggs-list",
            "params": {

                "query_string": fqs,
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
  // extracting the 'took' value
  console.log("Query String: " + fqs);
  console.log("T" + Date.now());
  console.log(Number(str1.slice(2,str1.indexOf(',')).split(':')[1]))
  const checkOutput = check (response, {
    'response status 200 ' : (r) => r.status === 200,
  });
  if(!checkOutput) {
    console.log(response.body);
  }
}
