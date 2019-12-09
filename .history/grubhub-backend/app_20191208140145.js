var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const graphqlHTTP = require('express-graphql');
var schema = require('./graphqlSchema/schema');
var mongoose = require('mongoose');


var connStr = "mongodb+srv://root:root1234@cluster0-o7wbx.mongodb.net/grubhub?retryWrites=true&w=majority"

console.log(connStr);
mongoose.connect(connStr, { useNewUrlParser: true, poolSize: 10, }, function(err) {
  if (err) throw err;
  else {
      console.log('Successfully connected to MongoDB');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var ownerSignUp = require('./routes/OwnerSignUp')
var buyerSignUp = require('./routes/BuyerSignUp')
var buyerSignIn = require('./routes/BuyerSignIn')
var ownerSignIn = require('./routes/OwnerSignIn')
var dbConnection = require('./database/dbConnectionPool');
var buyerDetails = require('./routes/buyerDetails')
var restaurantDetails = require('./routes/restaurantDetails');
var menuItemManage = require('./routes/menuItemManage');
var orderManage = require('./routes/orderManage');
var sectionManage = require('./routes/sectionManage');
var dbConnection = require('./database/dbConnectionPool');
//var updatePicture = require('./routes/UpdateProfile')


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
    secret: 'cmpe273_kafka',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

app.use(session({
    secret: 'cmpe273_grubhub_node_react_mysql',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  
app.use('/', ownerSignUp);
app.use('/', buyerSignIn);
app.use('/', ownerSignIn);
app.use('/', buyerSignUp);
app.use('/', orderManage);
app.use('/', sectionManage);
app.use('/', menuItemManage);
app.use('/', buyerDetails);
app.use('/', restaurantDetails);

// app.post("/ownerSignUp", function(req, res){
//     console.log(req.body);
// })




// testDBConection = async() => {
//     let con = await dbConnection();
//     if(con){
//       console.log("Connected to Database");
//     }
//   }
//   testDBConection();

