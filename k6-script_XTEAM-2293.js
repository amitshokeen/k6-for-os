import "./libs/shim/core.js";
import { check, sleep } from 'k6';
import { fakeQueryString, fakeFromDate, fakeToDate } from "./fakeDataMaker_XTEAM-2293.js"; 
import { configuration } from "./configuration.js";

export let options = { 
  //maxRedirects: 4,
  // duration: '2s',
  //  vus: 2,
  // stages: [
  //   { duration: '5s', target: 3},
  //   { duration: '5s', target: 6},
  //   { duration: '5s', target: 10},
  //   { duration: '5s', target: 0},
  // ]
  stages: [
    { duration: '5s', target: 50 },
    { duration: '10s', target: 100 },
    { duration: '60s', target: 300 }, // Dan says 300 may be enough!!!
    { duration: '30s', target: 300 },
    { duration: '10s', target: 50 },
    { duration: '5s', target: 0 },
  ]
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
  const fqs = fakeQueryString();
  let response = postman[Request]({
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    address:
      "https://narratives-api.dev.ml-feapps.pulsarinternal.com/v1.0/narratives/search",
      data: JSON.stringify({
        "sort": "frequency", //trend_score, date, relevance >> will these options matter to the load test?
        "search_term": fqs,
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
  sleep(Math.floor(Math.random() * 30));
}
