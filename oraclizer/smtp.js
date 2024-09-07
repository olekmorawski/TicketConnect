function SendToClient(client, data)
{
   console.log("sending data:", data);
   client.write(data);
}

var connections = [];

exports.GreetClient = function(client)
{
   SendToClient(client, '220 smtp.example.com ESMTP OurOraclizer\r\n')
}

exports.ParseIncommingData = function(client, receivedData)
{
   var lines_commands = receivedData.split('\r\n');
   for(var i=0;i<lines_commands.length;++i)
   {
      var command = lines_commands[i];

      if(connections[client.remotePort]/*.receivingData*/ == true)
      {
         if(lines_commands[i].length == 1 && lines_commands[i][0] == '.')
         {
            console.log("end of data block in message - dot");
            connections[client.remotePort]/*.receivingData*/ = false;
         }
         if(i >= 1 && lines_commands[i].length == 0 && lines_commands[i-1].length == 0)
         {
            console.log("end of data block in message");
            //connections[client.remotePort]/*.receivingData*/ = false;
         }
      }
      else
      {
         if(command.length == 0) continue;
         var command_args = command.split(' ');
         console.log("command_args", command_args);

         if(command_args.length == 2 && command_args[0] == "HELO")
         {
            var client_name = command_args[1];
            SendToClient(client, '250 Aloha '+client_name+', have lots of fun interacting with me!\r\n');
            connections[client.remotePort]/*.receivingData*/ = false;
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
            connections[client.remotePort]/*.receivingData*/ = true;
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
}
