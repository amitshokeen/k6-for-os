const fs = require('fs');
const fileName = process.argv.slice(2);
try {
  const data = fs.readFileSync(`./${fileName}`, 'utf8');
  //console.log(data);
  let dataArr = data.split(" ");
  const reg = new RegExp('^[0-9]+$');
  const myFinalArr = dataArr.filter(e => reg.test(e)).map(x => parseInt(x))
  // TODO: write this myFinalArr to a separate file
  // and find a way to plot a chart, extract tha vlues for avg, min, med, max, p(90) and p(95)
  console.log(myFinalArr); 
  console.log("Minimum value: " + Math.min(...myFinalArr));
  console.log("Maximum value: " + Math.max(...myFinalArr));
  console.log("Average value: " + myFinalArr.reduce((a, b) => a + b, 0) / myFinalArr.length);
  
} catch (err) {
  console.error(err);
}