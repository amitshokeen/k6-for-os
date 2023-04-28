# k6-for-os
k6.io based load/performance testing framework for OpenSearch

## Steps to run the tests in your system
1. Install k6 from https://k6.io/docs/get-started/installation/
2. In the terminal, at the root of your project, run this command:<br>
    > sh k6_node_combined.sh <AGG_SIZE> <QUERY_LENGTH> <QUERY_TYPE> <br>
    > Ex. Simple, Complex, Broad: sh k6_node_combined.sh 10 3 Simple<br>
    > Ex. Wildcard (QUERY_LENGTH MUST BE 1): sh k6_node_combined.sh 10 1 Wildcard<br>
    ### Explanation of the variables used
    > AGG_SIZE can have any of the values 10, 20, 50, or 100<br>
    > QUERY_LENGTH = Number of words to generate<br>
    > QUERY_TYPE = Simple (no boolean operators), Complex (includes boolean operators)<br>
    > Wildcard (include wildcard character), Broad (test for single until three characters)
3. After the test is complete, you will see the "took" values in the loadtest.log file created at the root of the project.
4. The other load test relevant data like the response times, number of virtual users, iterations made etc. can be noted directly from the console.
