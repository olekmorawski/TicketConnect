const net = require('net');
const stream = require('./stream');

const SMTP = require('./smtp_proto');

const fs = require('fs');

eval(String(fs.readFileSync('./smtp_proto.js')));

eval(String(fs.readFileSync('./minid.js')));


startSMTPServer(24);
start_minid();




function handleNewIncomingMessage(message)
{
   console.log(message);

   
}





function handleNewIncomingMessages(messages)
{
   console.log(messages);
   for(var i=0;i<messages.length;++i)
   {
      if(!messages[i].finished) continue;
      var message = messages.shift();
      --i;

      handleNewIncomingMessage(message);
   }
}