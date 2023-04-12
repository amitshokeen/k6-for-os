# k6-for-os
k6.io based load/performance testing framework for OpenSearch

## Steps to run the tests in your system
1. Install k6 from https://k6.io/docs/get-started/installation/
2. In the terminal, at the root of your project, run this command:<br>
    > k6 run --console-output "loadtest.log" k6-script.js
3. After the test is complete, you will see the "took" values in the loadtest.log file created at the root of the project.
4. The other load test relevant data like the response times, number of virtual users, iterations made etc. can be noted directly from the console.
