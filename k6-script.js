import "./libs/shim/core.js";
import URI from "./libs/urijs.js";
import { check } from 'k6';
//import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
//import createFakeNameArray from './tests/test666.js'
//import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';
import { fakeQueryString, fakeFromDate, fakeToDate, fakeAgg_size } from "./fakeDataMaker.js"; 

export let options = { 
  //maxRedirects: 4,
   duration: '6s',
   vus: 3,
  // stages: [
  //   { duration: '10s', target: 10 },
  //   { duration: '35s', target: 10 },
  //   { duration: '15s', target: 0 }
  // ]
 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  console.log(`Random name: ${fakeQueryString()}`);
  console.log(`Random agg_size: ${fakeAgg_size()}`);
  //console.log(faker.name.firstName());
  let response = postman[Request]({
    name:
      "https://narratives-os.dev.ml-feapps.pulsarinternal.com/ml_narratives_context_bundles/_search/template",
    id: "968cafa0-0da3-4777-87e6-624b7b6201c6",
    headers: {
      'Content-Type': 'application/json'
    },
    method: "GET",
    address:
      "https://narratives-os.dev.ml-feapps.pulsarinternal.com/ml_narratives_context_bundles/_search/template",
    data: JSON.stringify({
            "id": "narratives-aggs-list",
            "params": {

                "query_string": fakeQueryString(),
                "agg_size": fakeAgg_size(),
                "from_date": fakeFromDate(),
                "to_date": fakeToDate(),
                "size": 3,
                "from": 0,
                "sort_by_trend_score": true
            }
    }),
    auth(config, Var) {
      const address = new URI(config.address);
      address.username("master");
      address.password("h$Y!*r?e5;VrrC]q");
      config.address = address.toString();
      config.options.auth = "basic";
    }
  });
  let str1 = response.body;
  console.log(Number(str1.slice(2,str1.indexOf(',')).split(':')[1]))
  check (response, {
    'response status 200 ' : (r) => r.status === 200
});
}
