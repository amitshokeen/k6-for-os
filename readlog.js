const fs = require('fs');
const fileName = process.argv.slice(2);
try {
  const data = fs.readFileSync(`./${fileName}`, 'utf8');
  //console.log(data);
  let dataArr = data.split(" ");
  const reg = new RegExp('^[0-9]+$');
  const myFinalArr = dataArr.filter(e => reg.test(e)).map(x => parseInt(x))
  const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };
  // TODO: write this myFinalArr to a separate file
  // and find a way to plot a chart, extract the vlues for avg, min, med, max, p(90) and p(95)
  console.log(myFinalArr); 
  console.log("Average 'took' value: " + myFinalArr.reduce((a, b) => a + b, 0) / myFinalArr.length);
  console.log("Minimum 'took' value: " + Math.min(...myFinalArr));
  console.log("Median 'took' value: " + median(myFinalArr));
  console.log("Maximum 'took' value: " + Math.max(...myFinalArr));
} catch (err) {
  console.error(err);
}