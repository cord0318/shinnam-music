// basic file -> server.js

const express = require("express");
const request = require("request");
const app = express();
app.set("view engine", "ejs");

// mongoDB connect
const mongoose = require("mongoose");
const uri = "mongodb+srv://jihyo0318:QcWCBkRNHKXmXM2B@cluster0.93il326.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect("mongodb+srv://jihyo0318:QcWCBkRNHKXmXM2B@cluster0.93il326.mongodb.net/?retryWrites=true&w=majority",{
// 	}).then(() => console.log("MongoDB connected..."))   //연결잘되면
//     .catch((err) => console.log(err));  

var database;
var UserSchema; // 데이터베이스 객체를 위한 변수 선언
var UserModel; // 데이터베이스 모델 객체를 위한 변수 선언

function connectDB(){
    // 데이터베이스 연결 정보
    // var databaseUrl = 'mongodb://127.0.0.1:27017/local';
    var databaseUrl = 'mongodb+srv://jihyo0318:QcWCBkRNHKXmXM2B@cluster0.93il326.mongodb.net/?retryWrites=true&w=majority';
    // 데이터베이스 연결
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
	// 연결 에러 처리
    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    // 연결되었을 경우
    database.on('open', function(){
    	console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
        // 스키마 및 모델 정의
        UserSchema = mongoose.Schema({
            song: {
                type: String,
                maxLength: 40,
            },
            name: {
                type: String,
                maxLength: 40,
            },
            url: {
                type: String,
                maxLength: 100,
        }},
            {
                timestamps: true
        });
        console.log('UserSchema 정의함');
        //UserModel 모델 정의
        var UserModel = mongoose.model('song', UserSchema);
        console.log('UserModel 정의함');
    });
}


app.listen(8080, function() {
    console.log('Listening at 8080 port (shinnam_music)');
    connectDB();
});

app.get("/", (req, res) => {
    res.render("index", {
        title: "Shinnam Music 🎧"
    });
})

app.get("/add", function(req, res) {
    res.render("add", {
        title: "Shinnam Music 🎧 - ADD"
    })
});

app.get("/music", (req, res)=> {
    let name = req.query.name;
    let song = req.query.song;
    let url = req.query.url;
    
    res.render("music", {
        title: "Shinnam Music 🎧 - DataBase",
        name: name,
        song: song,
        url: url,
    });
    
})

app.use('/users', require('./routes/users'));
app.use('admin', require("./routes/admin"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
// QcWCBkRNHKXmXM2B - mongodb password
// mongodb+srv://jihyo0318:<password>@cluster0.93il326.mongodb.net/?retryWrites=true&w=majority