const express = require('express');
const https = require('https');
const fs = require('fs');
var path = require('path')
const genericUtils = require('./utils/genericUtils');
const configs = require('./configs');

const registrationRouter = require('./routes/registerRouter');
const templateRouter = require('./routes/templateRouter');
const mailRouter = require('./routes/mailRouter');

const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))

app.use(genericUtils.jwtAuthMiddleware);

app.use('/api/v1/register', registrationRouter);
app.use('/api/v1/template', templateRouter);
app.use('/api/v1/mail', mailRouter);

app.get('/api/access.log',(request, response)=>{
	fs.readFile('./access.log', 'utf8', (error, data) => {
	  if (error) {
		    response.send(genericUtils.createErrorResponse(error));
		return;
	  }
	    response.send(genericUtils.createSuccessResponse(data));
	})
});

app.get('/api',(request, response)=>{
    response.send({version:'v1', status:'UP'});
});


const options = {
    key : fs.readFileSync('./secrets/server.key'),
    cert : fs.readFileSync('./secrets/server.cert')
}

https.createServer(options, app)
    .listen(
        configs.server.port,
        configs.server.accessFilter,
        ()=>{
            console.clear();
            console.log('mailer for ParkNgo');
            console.log('started mailer web service');
            console.log('https://localhost:'+configs.server.port+'/api/v1/');
        }
    )   

// app.listen(
//     configs.server.port,
//     configs.server.accessFilter,
//     (request, response)=>{
//         console.clear();
//         console.log('mailer for ParkNgo');
//         console.log('started mailer web service');
//         console.log('https://localhost:'+configs.server.port);
//     }
// );