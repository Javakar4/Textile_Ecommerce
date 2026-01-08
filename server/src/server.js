require("./instrument.js");
const expressApp = require('express');
const app = expressApp();
const http = require('http');
const cors = require('cors');
const Sentry = require("@sentry/node");
require('dotenv').config();
const authRoutes = require("./routes/authRoute");//auth route
app.use(expressApp.json())
app.use(cors({//cors
    origin: [
            'http://localhost:3000',
            //'*'// never use both the address and * use any one of this 
        ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    redentials:true
    }))

Sentry.init({
  dsn: "https://f4e05cd1941d76c9181a986aaff465c5@o4510458469613568.ingest.us.sentry.io/4510458475446272",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
app.use(expressApp.static('uploads'))    
app.use(function(req,res,next){
    console.log("Here the incoming request id",req.ip, req.ips, req.path, req?.body);
    next();
})
//app middlewares
// app.use('/',async function(req,res){//
//     res.send("fuck you");
// })


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/products', require('./routes/productRoute'));
app.use('/api/v1/cart', require('./routes/cartRoute'));

Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

const server = http.createServer(app);
const port = process.env.PORT ||  4000;
server.listen(port,function(req,res){
    console.log(`server listening on ${port}`);
})


