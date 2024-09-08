class connection
{
   constructor(receivingData, emptyLinesContCount)
   {
      this.receivingData = receivingData;
      this.emptyLinesContCount = emptyLinesContCount;
   }
}
var connections = [];

function SendToClient(client, data)
{
   console.log("sending data:", data);
   client.write(data);
}

exports.GreetClient = function(client)
{
   SendToClient(client, '220 smtp.example.com ESMTP OurOraclizer\r\n')
}

exports.ParseIncommingData = function(client, command)
{
   if(connections[client.remotePort] === undefined
      || connections[client.remotePort].receivingData === undefined
      || connections[client.remotePort].emptyLinesContCount === undefined)
      connections[client.remotePort] = new connection(false, 0);

   if(command.length == 0)
   {
      ++(connections[client.remotePort].emptyLinesContCount);
      return;
   }
   else if(connections[client.remotePort].emptyLinesContCount >= 2
      && command.length > 0 && command[0] == '.')
   {
      connections[client.remotePort].receivingData = false;
      connections[client.remotePort].emptyLinesContCount = 0;
      console.log("end of data block in message");

      command = command.substring(1);
      if(command.length == 0) return;
   }

   if(!(connections[client.remotePort].receivingData))
   {
      var command_args = command.split(' ');
      console.log("command_args", command_args);

      if(command_args.length == 2 && command_args[0] == "HELO")
      {
         var client_name = command_args[1];
         SendToClient(client, '250 Aloha '+client_name+', have lots of fun interacting with me!\r\n');
      }
      else if(/*command_args.length == 2 &&*/ command_args[0] == "MAIL")
      {
         SendToClient(client, '250 Ok\r\n');
      }
      else if(/*command_args.length == 2 &&*/ command_args[0] == "RCPT")
      {
         SendToClient(client, '250 Ok\r\n');
      }
      else if(/*command_args.length == 2 &&*/ command_args[0] == "DATA")
      {
         SendToClient(client, '250 Ok\r\n');
         console.log("begin of data block in message");
         connections[client.remotePort].receivingData = true;
      }
      else if(/*command_args.length == 2 &&*/ command_args[0] == "RSET")
      {
         SendToClient(client, '250 Ok\r\n');
      }
      else if(/*command_args.length == 2 &&*/ command_args[0] == "VRFY")
      {
         SendToClient(client, '250 Ok\r\n');
      }
      else if(/*command_args.length == 2 &&*/ command_args[0] == "EXPN")
      {
         SendToClient(client, '250 Ok\r\n');
      }
      else if(/*command_args.length == 2 &&*/ command_args[0] == "HELP")
      {
         SendToClient(client, '250 Ok\r\n');
      }
      else if(/*command_args.length == 2 &&*/ command_args[0] == "NOOP")
      {
         SendToClient(client, '250 Ok\r\n');
      }
      else if(/*command_args.length == 2 &&*/ command_args[0] == "QUIT")
      {
         SendToClient(client, '250 Ok\r\n');
      }
      else
      {
         SendToClient(client, "500 5.5.2 Error: command not recognized\r\n");
      }
   }
}
