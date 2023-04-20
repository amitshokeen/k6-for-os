import "./libs/shim/core.js";
import { check } from 'k6';
import { fakeQueryString, fakeFromDate, fakeToDate } from "./fakeDataMaker.js"; 
import { configuration } from "./configuration.js";

export let options = { 
  //maxRedirects: 4,
  duration: '10s',
   vus: 10,
  // stages: [
  //   { duration: '5s', target: 50 },
  //   { duration: '10s', target: 100 },
  //   { duration: '60s', target: 500 }, // Dan says 300 may be enough!!!
  //   { duration: '30s', target: 200 },
  //   { duration: '10s', target: 50 },
  //   { duration: '5s', target: 0 },
  // ]
 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options,
  collection: {
    undefined: ""
  }
});

export default function() {
  let aggSize = __ENV.AGG_SIZE;
  let response = postman[Request]({
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    address:
      "https://narratives-api.dev.ml-feapps.pulsarinternal.com/v1.0/narratives/search",
      data: JSON.stringify({
        "sort": "frequency", //trend_score, date, relevance >> will these options matter to the load test?
        "search_term": fakeQueryString(),
        "from_date": "2022-04-12",
        "to_date": "2023-04-12",
        "offset": 0,
        "limit": aggSize,
        "fetch_frequency": false,
        "filters": "string"
      }),
    auth(config, Var) {
      config.headers.Authorization = "Bearer " + configuration().access_token;
    }
  });
  const checkOutput = check (response, {
    'response status 200 ' : (r) => r.status === 200,
  });
  if(!checkOutput) {
    console.log(response.body);
  }
}
