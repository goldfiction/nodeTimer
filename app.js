var async=require('async');
var exec = require('child_process').exec,
    child;


function playalarm(cb){
    child = exec('mplayer.exe alarm1.mp3',
        function (error, stdout, stderr) {
            //console.log('stdout: ' + stdout);
            //console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            cb(error,stdout);
        });
}

function alarmloop(cb){
    cb=cb||function(e,r){};
    async.whilst(function(){return true;},playalarm,cb);
}

var time=process.argv[2]||1800;
var start=new Date();
setInterval(function(){
    var current=new Date();
    current=current-start;
    current/=1000;
    console.log((current)+"/"+(time));
},1000);
setTimeout(alarmloop,time*1000);

