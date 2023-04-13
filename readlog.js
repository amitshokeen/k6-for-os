const fs = require('fs');
const fileName = process.argv.slice(2);
try {
  const data = fs.readFileSync(`./${fileName}`, 'utf8');
  console.log(data);
  let dataArr = data.split(" ");
  const reg = new RegExp('^[0-9]+$');
  let myFinalArr = [];
  dataArr.forEach(e => reg.test(e) && myFinalArr.push(e))

  // TODO: write this myFinalArr to a separate file
  // and find a way to plot a chart, extract tha vlues for avg, min, med, max, p(90) and p(95)
  console.log(myFinalArr); 
} catch (err) {
  console.error(err);
}