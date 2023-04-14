echo "*** running k6 ***"
logfile="$(date +%Y-%m-%dT%H:%M:%S)_loadtest.log"
k6 run --console-output ${logfile} -e AGG_SIZE=$1 -e QUERY_LENGTH=$2 -e QUERY_TYPE=$3 k6-script.js
echo "*** running node ***"
node readlog.js ${logfile}