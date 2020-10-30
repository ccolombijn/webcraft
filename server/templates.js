const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

module.exports = (template)=>{
    const repl_open = template.split('{{ '), replacements = new Array([]);
    repl_open.forEach((repl)=>replacements.push(repl.split(' }}')[0]));
    const getFile = (file)=>readFile(file);
    replacements.forEach((file)=>{
        getFile(`./templates/${file}.html`)
    });

}
