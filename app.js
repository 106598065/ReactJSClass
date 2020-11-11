var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser'); // 解析POST METHOD所帶來過來的參數
var cookieParser = require('cookie-parser'); 

var identityKey = 'skey';
var users = require('./users').items;

var findUser = function(name, password){
	return users.find(function(item){
		return item.name === name && item.password === password;
	});
};

app.set('views', 'views/');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); //接收json格式
app.use(bodyParser.urlencoded({ extended: false })); //application/x-www-form-urlencoded
app.use(cookieParser());

app.use(session({
	secret: 'testAct',  // 必填，sign 用來驗證SessionID
	store: new FileStore(),  // session在server端的存放方式
	saveUninitialized: false,  // 新的session在被修改時才會產生
	resave: false,  // 每次request重新設定session
	cookie: { //設定sessionID 的cookie相關選項
		maxAge: 1000 * 1000  // 有效期限(毫秒)
	}
}));

//index.html
app.get('/', function(req, res, next){
	var sess = req.session;
	var loginUser = sess.loginUser;
	var isLogined = !!loginUser;

	res.render('index', {
		isLogined: isLogined,
		name: loginUser || ''
	});
});
// ReactDOM.render(
//     <Auth state={store.getState()}
//     />,
//     document.getElementById('root')
//   );

app.post('/login', function(req, res, next){
	var sess = req.session;
	var user = findUser(req.body.name, req.body.password);

	if(user){
		req.session.regenerate(function(err) {
			req.session.loginUser = user.name;
			res.json({ret_code: 0, ret_msg: 'login successfully'});							
		});
	}
});

app.get('/logout', function(req, res, next){
	req.session.destroy(function(err) {
		res.clearCookie(identityKey);
		res.redirect('/');
	});
});

app.use((req, res) => {
	if(req.session.loginUser){
		res.sendStatus(404);
	}else{
		res.sendStatus(401);
	}
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));