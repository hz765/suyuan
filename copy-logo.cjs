const fs = require('fs');
const src = 'C:\\Users\\32042\\AppData\\Roaming\\QoderCN\\SharedClientCache\\cache\\images\\7146fea3\\58d25688f4aa4125bb52425bdad7c73f-86be8f53.jpg';
const dest = 'd:\\suyuan\\realive-guard\\public\\logo.jpg';
fs.copyFileSync(src, dest);
console.log('Copied logo.jpg');
