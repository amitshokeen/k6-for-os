const fs = require('fs');
const percentile = require("percentile");
let chalk = require('chalk');
const fileName = process.argv.slice(2);
try {
  const data = fs.readFileSync(`./${fileName}`, 'utf8');
  //console.log(data);
  let dataArr = data.split(" ");
  const reg = new RegExp('^[0-9]+$');
  const finalArr = dataArr.filter(e => reg.test(e)).map(x => parseInt(x))
  
  // TODO: write this finalArr to a separate file
  // and find a way to plot a chart, extract the vlues for avg, min, med, max, p(90) and p(95)
  //console.log(finalArr);
  let avg = chalk.bold.magenta(Math.round((finalArr.reduce((a, b) => a + b, 0) / finalArr.length)*100)/100);
  let min = chalk.bold.magenta(Math.min(...finalArr));
  let med = chalk.bold.magenta(percentile(50, finalArr));
  let max = chalk.bold.magenta(Math.max(...finalArr));
  let p90 = chalk.bold.magenta(percentile(90, finalArr));
  let p95 = chalk.bold.magenta(percentile(95, finalArr));
  console.log(chalk.bold.magenta("The 'took' values:"))
  console.log(`avg=${avg}          min=${min}          med=${med}          max=${max}          p(90)=${p90}          p(95)=${p95}`);
} catch (err) {
  console.error(err);
}