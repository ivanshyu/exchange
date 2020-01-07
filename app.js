var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
//var contractRouter = require('./routes/contract');


let jwt = require('jsonwebtoken');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//＊＊＊＊＊＊＊＊＊＊＊＊＊＊上傳文件＊＊＊＊＊＊＊＊＊＊＊＊＊＊
//配置diskStorage來控制文檔存儲的位置以及文檔名字等
var storage = multer.diskStorage({
  //確定圖片存儲的位置
  destination: function (req, file, cb) {
      cb(null, './public/uploadImgs')
  },
  //確定圖片存儲時的名字,注意，如果使用原名，可能會造成再次上傳同一張圖片的時候的衝突
  filename: function (req, file, cb) {
      //重新命名
      //console.log(file.fieldname);
      cb(null, Date.now() + "_" + file.fieldname + "_" + file.originalname);
  }
});
//生成的專門處理上傳的一個工具，可以傳入storage、limits等配置
var upload = multer({ storage: storage });
//var upload = multer({ dest: 'upload/' });

//接收上傳圖片請求的接口
var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }])
app.post('/upload', cpUpload, function (req, res, next) {
  console.log(req.files.image[0]);
  res.json({
      filePath: req.files.image[0].slice(7,)
  })
});

app.get('/form', function(req, res, next){
  var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  res.send(form);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);
//app.use('/contract', contractRouter);

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
