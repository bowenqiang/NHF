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
    database: 'myproject',
    multipleStatements:true
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

router.get('/getquestiondiagnosis',function(req,res){
    con.query('SELECT * FROM diagnosis;SELECT * FROM question',function(err,rows){
        if(err) throw err;
        let result={
            diagnosis:[],
            questions:[]
        };
        console.log(rows[0])
        console.log("row1")
        console.log(rows[1])
        for(let diagnosis of rows[0]){
            result.diagnosis.push(diagnosis.diagnosis);
        }
        for(let question of rows[1]){
            result.questions.push(question.question);
        }
        console.log(rows)
        res.send(JSON.stringify(result));

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
            res.send(JSON.stringify(rows[0].idadmin));
            //res.redirect('/#/login');

        }else{
            res.send(JSON.stringify(0)); 
            //res.redirect('/#/');  
        }
    });


});

router.post('/checkin', function (req, res) {
    console.log(req.body);
    let idnumber = req.body.idnumber;
    console.log("idnumber:"+idnumber);
    const idstation = parseInt(req.body.idstation)+1;
    if(idnumber==''){
        const email = req.body.email;
        console.log("email:"+email);
        con.query('SELECT idnumber FROM users WHERE email="'+email+'"',function(err,rows){
            if(err) throw err;
            console.log(rows);
            idnumber= rows[0].idnumber;
            con.query('INSERT INTO checkin (idstation,idnumber) VALUES ('+idstation+','+idnumber+')',function(err,row){
                if(err) throw err;
                res.send(JSON.stringify(1));

            });
        });
    }else{
        con.query('INSERT INTO checkin (idstation,idnumber) VALUES ('+idstation+','+idnumber+')',function(err,rows){
            if(err) throw err;
            res.send(JSON.stringify(1));
        });
    }



});

router.post('/registerUser',function(req,res){
    console.log(req.body);
    const firstname= req.body.firstname;
    const lastname= req.body.lastname;
    const email= req.body.email;
    const phone= req.body.phone;
    const diagnosis= parseInt(req.body.selectedDiagnosis)+1;
    const question= parseInt(req.body.selectedQuestion)+1;
    const answer= req.body.answer;
    const password= req.body.password;
    con.query('SELECT MAX(idnumber) FROM users',function(err,rows){
        if(err) throw err;
        console.log(rows);
        const idnumber = rows[0]['MAX(idnumber)']+1;
        console.log(idnumber);
        let query='INSERT INTO users (firstname, lastname, email,phone,idquestion,answer,password,iddiagnosis,idnumber) VALUES ("'+firstname+'","'+lastname+'","'+email+'","'+phone+'",'+question+',"'+answer+'","'+password+'",'+diagnosis+','+idnumber+')';
        con.query(query,function(err){
            if(err) throw err;
            res.send(JSON.stringify(idnumber));
        });
    });
});





const server = app.listen(8081, function () {
    console.log('Demo app listening at http://127.0.0.1:8081');
})