const app = require('./app');
const {PORT} = require('./utils/config');
const {info} = require('./utils/logger');
const http = require('http');

http.createServer(app);


app.listen(PORT,()=>{
    info('server running on Port:',PORT);
});