const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

module.exports = ()=>{
    const replacements = new Array([]);
    fs.readdirSync('./templates').forEach((file) => {
        if(file){
            const template = fs.readFileSync( `./templates/${file}` );
            replacements.push({ template : file.replace('.html',''),file : template})
        }
        
    });
    
    replacements.forEach((item)=>{
        const template = item.template;
        let file = item.file;
        replacements.forEach((_item,index)=>{
           //item.file = _item.file.replace( `{{ ${_item.template} }}`,_item.file)
        });
    });

}
