const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoute = require('./route/api');
var session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000; //PORT의 경우 이후 Heroku에 배포하는 경우를 고려해 설정한 것이다. Heroku의 경우 내부에서 어떤 포트를 사용하는지 우리가 알 수 없다. 따라서 Heroku에서 부여하는 포트를 사용하도록 설정해준다. 로컬에서 실행할 경우 ‘http://localhost:5000’에서 확인 가능하다.

// 미들웨어들
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/user/profile', 'https://s3.ap-northeast-2.amazonaws.com/codelink/');

//세션 관련
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
 }));


 //배포시 필요한 코드 *요청에대해 이미 index 파일을 보내주고는 있지만
 // 그 안의 각종 자바스크립트 번들 코드들을 제공받지못해서 빈페이지로 나오는듯함
 // 그래서 /client/build/ 안의 모든 파일들을 접근가능하게 해주어야 하는것 같음
// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.resolve(__dirname+"/client/build")));
// }


// api 미들웨어
app.use('/api', apiRoute);

app.get('*', (req, res) => {
  const index = path.resolve(__dirname+"/client/build/index.html");
  res.sendFile(index);
});


app.listen(PORT, () => {
	console.log('Express listening on port', PORT);
});











//==================================================================
// 배포시 필요한 코드들
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
// }
// app.get("/", (req, res) => {
//   console.log(process.env.NODE_ENV);
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });
//
// 아래 코드는 /package.json 파일의 scripts 부분에 넣어준다.
//"heroku-postbuild": "cd client && npm install && npm run build",
//이렇게 해두면, Build를 깜빡하더라도, 혹은 React 프로젝트 내에서 새로운 라이브러리를 설치하더라도 문제 없이 작동하게 할 수 있다.