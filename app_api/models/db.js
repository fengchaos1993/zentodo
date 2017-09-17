var mongoose = require('mongoose');

var dbUrl = 'mongodb://fengzhazha:u8vrpkx4@fzz-mongo-cluster-shard-00-00-dr2rc.mongodb.net:27017,fzz-mongo-cluster-shard-00-01-dr2rc.mongodb.net:27017,fzz-mongo-cluster-shard-00-02-dr2rc.mongodb.net:27017/todoDB?ssl=true&replicaSet=FZZ-mongo-cluster-shard-0&authSource=admin';
mongoose.connect(dbUrl, {
    useMongoClient: true
});

mongoose.connection.on('connected', function(){
    console.log('Mongoose has connected to ' + dbUrl);
});

mongoose.connection.on('error', function(error){
    console.log('Mongose connection error: ' + error);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected.');
});

var gracefulShutdown = function(msg, callback){
    console.log('Mongoose disconnected through ' + msg);
    callback();
}


// for nodemon restarts
process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});

// for app termination
process.on('SIGINT', function(){
    gracefulShutdown('app termination', function(){
        process.exit(0);
    });
});

// for Heroku app shutdown
process.on('SIGTERM', function(){
    gracefulShutdown('Heroku app shutdown', function(){
        process.exit(0);
    });
});

require('./todo');