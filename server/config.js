const fs = require('fs');
module.exports = (callback)=>{
  fs.readFile('./app/config.json', (err, data) => {
    if (err) throw err;
    callback(data);
  });
}