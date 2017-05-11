const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use('/modules', express.static(path.join(__dirname, '/node_modules/')));
app.use('/public', express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "701717",
    database: 'myproject'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('connected to database');
});


//index page
app.get('/', function (req, res) {
    console.log('find the path');
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


//implement your own Apis
const router = express.Router();
//api test
app.use('/api', router);
router.get('/', function (req, res) {
    res.json({ message: 'Welcome to my api!' });
});



// get stations from DB
router.get('/getstations', function (req, res) {
    con.query('SELECT * FROM station', function (err, rows) {
        if (err) throw err;
        let stations = []
        for(let station of rows){
            stations.push(station.name);
        }
        res.send(JSON.stringify(stations));
    });

});

router.post('/validateAdmin', function (req, res) {
    console.log(req.body);
    const name = req.body.ipadname;
    const password = req.body.password;
    const station = req.body.station;
    let query='SELECT * FROM admin WHERE name="'+name+'" AND password="'+password+'"';
    console.log("query:"+query);
    con.query(query,function(err,rows){
        if(err) throw err;
        console.log(rows[0]);
        if(rows.length>0){
           // res.redirect('#/login');
            res.send(JSON.stringify(rows[0].idadmin));

        }else{
            res.send(JSON.stringify(0));         
        }
    });


});

router.post('/validateUser', function (req, res) {
    console.log(req.body);

});





const server = app.listen(8081, function () {
    console.log('Demo app listening at http://127.0.0.1:8081');
})