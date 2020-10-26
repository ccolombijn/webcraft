// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const open = require('open');
app.use(helmet());
app.use(compression());

//const config = JSON.parse(fs.readFileSync('/../app/config.json'));

fs.readFile('./app/config.json', (err, data) => {
    if (err) throw err;
    let config = JSON.parse(data);
    console.log(config)
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
    fs.readFile('./app/index.html', (err, html) => {
        app.use('*', (req, res) => {
            res.send(html);
        });
        app.listen(PORT, () =>{
            console.log(`✅  Server started: http://${HOST}:${PORT}`);
            open(`http://${HOST}:${PORT}`)
        });
    });

});
