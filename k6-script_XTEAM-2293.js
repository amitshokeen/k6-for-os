import "./libs/shim/core.js";
import { check } from 'k6';
import { fakeQueryString, fakeFromDate, fakeToDate } from "./fakeDataMaker.js"; 

export let options = { 
  //maxRedirects: 4,
  // duration: '2s',
  //  vus: 2,
  stages: [
    { duration: '10s', target: 50 },
    { duration: '40s', target: 100 },
    { duration: '10s', target: 0 }
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
    })
  });
  const checkOutput = check (response, {
    'response status 200 ' : (r) => r.status === 200,
  });
  if(!checkOutput) {
    console.log(response.body);
  }
}
