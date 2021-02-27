var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.io = require("socket.io")();
var clients = {};
function nickname_vaild(nickname) {
  //닉네임중복체크
  var returnCode = 1;
  for (var i in clients) {
    if (clients[i] == nickname) {
      returnCode = -1;
      break;
    }
  }
  return returnCode;
}

app.io.on("connection", function (socket) {

  socket.on('create_nickname', function (nickname, returnFunction) {
    /*//닉네임중복체크
  var returnCode = 1;
    for (var i in clients) {
      if (clients[i] == nickname) {
        returnCode = -1;
        break;
      }
    }*/
    //nickname_vaild(nickname);
    var returnCode = nickname_vaild(nickname);

    //닉네임체크확인 결과 전달
    console.log(returnCode)
    returnFunction(returnCode);
    //닉네임체크 유효화됨
    if (returnCode == 1) {
      //클라이언트 닉네임등록
      clients[socket.id] = nickname;
      //새접속자로인한 전체 유저리스트 전달함
      app.io.emit('user_list', clients);
      //app.io.emit('msgPush', { "nickname": "시스템", "msg": clients[socket.id] + " 유저가 입장하셨습니다." });
      console.log('CONNECT : ', nickname + ' [' + socket.id + '] ' + '(' + Object.keys(clients).length + '명)');

    }
  });
  socket.on('msgSend', function (data) {
    //자신을 제외한 전체유저에게 메세지전송
    socket.broadcast.emit('msgPush', data);
    /*
    *socket.emit('msgPush',data);//자신에게만 보낼때
    *socket.broadcast.emit('msgPush',data);//자신제외 전체유저
    *io.sockets.emit('msgPush',data);//자신포함 전체유저에게
    *io.sockets.in(socket_id).emit('msgPush',data);//특정유저에게 귓속말시 socket_id추가입력하면됨
        *io.of('namespace').emit('msgPush', data); //of 지정된 name space의 유저
    */
    console.log('Chat Msg : ', '[' + data['nickname'] + '] ' + data['msg']);
  });
  //접속종료시처리
  socket.on('changename', function (data) {
    console.log(data);
    var returnCode = nickname_vaild(data.nickname);
    if(returnCode == 1) {
      clients[socket.id] = data.nickname;
      console.log("유저 이름이 변경되었습니다.")
      app.emit('user_list', clients);
      console.log(clients);
    }
  })
  socket.on('disconnect', function () {
    if (clients[socket.id]) {
      //유저이탈 메세지전달
      app.emit('msgPush', { "nickname": "시스템", "msg": clients[socket.id] + " 유저가 나가셨습니다." });
      console.log('DISCONNECT : ', clients[socket.id]);
      //이탈유저닉네임삭제
      delete clients[socket.id];
      //유저이탈 전체유저리스트 갱신
      app.emit('user_list', clients);
    } else {
      console.log('NOT USER DISCONNECT : ', socket.id);
    }
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/js', express.static(__dirname + '/node_modules/gixi/dist'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
