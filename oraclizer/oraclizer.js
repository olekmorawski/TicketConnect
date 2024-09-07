const SMTP = require('./smtp');
const net = require('net');
net.createServer((client) =>
{
   console.log("new connection from", client.remoteFamily, client.remoteAddress);
   SMTP.GreetClient(client);

   client.on('data', (data) =>
   {
      console.log("received data:", data.toString());

      SMTP.ParseIncommingData(client, data.toString());
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
