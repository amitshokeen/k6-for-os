const fs = require('fs');
const percentile = require("percentile");
let chalk = require('chalk');
const fileName = process.argv.slice(2);
try {
  const data = fs.readFileSync(`./${fileName}`, 'utf8');
  //console.log(data);
  let dataArr = data.split(" ");
  const reg = new RegExp('^[0-9]+$');
  const tookArr = dataArr.filter(e => reg.test(e)).map(x => parseInt(x))
  
  // TODO: write this tookArr to a separate file
  // and find a way to plot a chart, extract the vlues for avg, min, med, max, p(90) and p(95)
  //console.log(tookArr);
  let avg = chalk.bold.magenta(Math.round((tookArr.reduce((a, b) => a + b, 0) / tookArr.length)*100)/100);
  let min = chalk.bold.magenta(Math.min(...tookArr));
  let med = chalk.bold.magenta(percentile(50, tookArr));
  let max = chalk.bold.magenta(Math.max(...tookArr));
  let p90 = chalk.bold.magenta(percentile(90, tookArr));
  let p95 = chalk.bold.magenta(percentile(95, tookArr));
  console.log(chalk.bold.magenta("The 'took' values:"))
  console.log(`avg=${avg}          min=${min}          med=${med}          max=${max}          p(90)=${p90}          p(95)=${p95}`);
} catch (err) {
  console.error(err);
}


/*
const tookArr = [333, 222, 111];
const timeArray = [1681714196311, 1681714196321, 1681714196324];
var result = tookArr.reduce((acc, item, i) => {
  acc[item] = timeArray[i];
  return acc;
}, {}); 
console.log(result);
*/