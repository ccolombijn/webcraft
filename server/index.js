// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const open = require('open');
const parse = require('node-html-parser').parse;
const templates = require('./templates.js');
//app.use(compression());


require('./config.js')((data)=>{
//fs.readFile('./app/config.json', (err, data) => {
    
    let config = JSON.parse(data);
    //console.log(config)
    const static_dirs = config.static_dirs;
    static_dirs.forEach(dir => {
        app.use(express.static(path.join(__dirname, `/../${dir}`)));
    });
    const HOST = process.env.HOST || 'localhost';
    const PORT = process.env.PORT || 3001;
    /*
    app.use('*', (req, res) => {
        res.sendFile(path.resolve('./dist', 'index.html'));
    });
    */
    fs.readFile('./templates/index.html', (err, html) => {
        const root = parse(html); // HTML Parser
        const body = root.querySelector('body');
        const head = root.querySelector('head');
        head.appendChild('<style></style>')
        body.appendChild('<span>test</span>')
        body.appendChild('<script src="scripts.js" type="module"></script>');
        //const output = templates(root.toString()).then((o)=>{
            app.use('*', (req, res) => res.send(o));
            app.listen(PORT, () =>{
                console.log(`✅  Server started: http://${HOST}:${PORT}`);
                open(`http://${HOST}:${PORT}`);
            });
        //});
        
    });

});
