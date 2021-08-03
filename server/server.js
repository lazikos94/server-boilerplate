const http = require('http'), express = require('express'), helmet = require('helmet'),cors = require("cors"),path = require('path'),Database = require('./Database/main'),api = require('./Api/Api'), config = require('./config');

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());

async function init(){
    try{
        const db = new Database(config.db_url);
        await db.db_connect();
        app.use('/api/',api)
    }catch(err){
        console.log(err.name, err.message)
    }
}

init();

server.listen(config.PORT,() => console.log('server is listening at port === ' + config.PORT))