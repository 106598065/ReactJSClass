var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	name: identityKey, //cookie中儲存sessionID的key
	secret: 'testAct',  // 必填，sign 用來驗證SessionID
	store: new FileStore(),  // session在server端的存放方式
	saveUninitialized: false,  // 每次request重新設定session cookie
	resave: false,  // 每次request重新設定session
	cookie: { //設定sessionID 的cookie相關選項
		maxAge: 1000 * 1000  // 有效期，单位是毫秒
	}
}));

app.get('/', function(req, res, next){
	var sess = req.session;
	var loginUser = sess.loginUser;
	var isLogined = !!loginUser;

	res.render('index', {
		isLogined: isLogined,
		name: loginUser || ''
	});
});

app.post('/login', function(req, res, next){
	
	var sess = req.session;
	var user = findUser(req.body.name, req.body.password);

	if(user){
		req.session.regenerate(function(err) {
			if(err){
				return res.json({ret_code: 2, ret_msg: 'login fail'});				
			}
			
			req.session.loginUser = user.name;
			res.json({ret_code: 0, ret_msg: 'login successfully'});							
		});
	}else{
		res.json({ret_code: 1, ret_msg: '账号或密码错误'});
	}	
});

app.get('/logout', function(req, res, next){
	// 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
	// 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
	// 然后去查找对应的 session 文件，报错
	// session-file-store 本身的bug	

	req.session.destroy(function(err) {
		if(err){
			res.json({ret_code: 2, ret_msg: 'logout fail'});
			return;
		}
		
		// req.session.loginUser = null;
		res.clearCookie(identityKey);
		res.redirect('/');
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));