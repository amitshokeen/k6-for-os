echo "*** running k6 ***"
logfile="$(date +%Y-%m-%dT%H:%M:%S)_loadtest.log"
k6 run --console-output ${logfile} -e AGG_SIZE=10 -e QUERY_LENGTH=3 -e QUERY_TYPE=Simple k6-script.js
echo "*** running node ***"
node readlog.js ${logfile}