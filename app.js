const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {getHomePageScanner, getHomePageRadio, getHomePageNoTag, getHomeMonitor, getNewIdTag} = require('./routes/asset');
const {addPlayerPage, addPlayer} = require('./routes/player');
const port = 3000;

let lastScannerCode = '';
let lastScannerDate = null;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'userRFID',
    password: 'Amazon2022!',
    database: 'socka'
});

// connect to database
db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
        
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder



// routes for the app

app.get('/', getHomePage);
app.get('/scanner',  getHomePageScanner);
app.get('/radio',  getHomePageRadio);
app.get('/notags',  getHomePageNoTag);
app.get('/monitor',  getHomeMonitor);
app.get('/newIdTag',  getNewIdTag);
app.get('/add', addPlayerPage);
app.post('/add', addPlayer);
app.get ('/api/newread',function(req, res) {
    const scannerCode = req.query.scannerCode;
    lastScannerCode = scannerCode;
    lastScannerDate = new Date().getTime()
    let type_asset="";
    let model="";
    let image="";
    if(scannerCode.indexOf("ABEF0000")>=0){
        type_asset="Scanner";
        model="MC33000";
        image="mc3300.jpg";
    }
    if(scannerCode.indexOf("E2003412")>=0){
        type_asset="Radio";
        model="XPR3500";
        image="radioMotorola.jpg";
    }
    if(scannerCode.indexOf("E2801191")>=0){
        type_asset="Laptop";
        model="HP-Serie800";
        image="elitebook.jpg";
    }
    const sql = "insert into tags_seen "
			+"(id, id_epc, type_asset, model, image, date_time, building)"
			+ " values (default,'"+scannerCode+"','"+type_asset+"','"+model+"','"+image+"',now(), 'Building 1 KLAL')";
    

    db.query(sql, function (err, result) {
        if (err) throw err;
        res.send('ok: ' + scannerCode)
    });
    
});

app.get ('/api/getlastread',function getLastRead(req, res) {
    res.send({ lastScannerCode, lastScannerDate, currentDate: new Date().getTime()})  
});


// set the app to listen on the port
app.listen(port, () => {
    console.log('Server running on port: ${port}');
});
