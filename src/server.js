import App from './src/App'
//引用'http'模組
//const http = require('http');

//設定server網址，因為在本機端測試，所以輸入127.0.0.1
//const hostname = '127.0.0.1'  //上傳至伺服器需拿掉
var express = require('express');
const { default: App } = require('./src/app');
var app = express();
 
//port 號會由 Heroku 給予，因此不再自行指定
const port = process.env.PORT || 3000;

//新增一個server並指定他的頁面資訊，內容為'Hello World!'
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World!\n');
// });
app.use(express.static('dist'));
app.get('*',(req,res) => {
    const content = renderToString(<App />);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // res.send('<div>Hello World?!</div>');
    // res.sendFile(__dirname + "/" + "index.html");
    // res.sendFile(__dirname + "/" + "src/app.js");
})

//監聽得到的 port 號開啟
// server.listen(port, () => console.log(`Listening on ${port}`));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});