echo "*** running k6 ***"
logfile="$(date +%Y-%m-%dT%H:%M:%S)_loadtest.log"
k6 run --console-output ${logfile} -e AGG_SIZE=10 -e QUERY_LENGTH=5 -e QUERY_TYPE=Complex k6-script.js
echo "*** running node ***"
node readlog.js ${logfile}