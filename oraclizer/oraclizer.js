const net = require('net');
const stream = require('./stream');
const SMTP = require('./smtp');

net.createServer((client) =>
{
   console.log("new connection from", client.remoteFamily, client.remoteAddress, client.remotePort);
   SMTP.GreetClient(client);

   client.on('data', (data) =>
   {
      console.log("received data:", data.toString());

      stream.handle(data.toString(), (function(client){return function(command){return SMTP.ParseIncommingData(client, command)}}(client)));

   }).on('end', () =>
   {
      console.log("the connection was terminated");
   });
}).on('data', (data) =>
   {
      console.log("received data", data.toString());
      client.end();
   }).on('error', (err) =>
{
   console.error("error in server", err);
   //throw err;
}).listen(24);
