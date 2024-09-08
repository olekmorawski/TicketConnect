const net = require('net');
const stream = require('./stream');

const SMTP = require('./smtp_proto');

const fs = require('fs');

eval(String(fs.readFileSync('./smtp_server.js')));

eval(String(fs.readFileSync('./minid.js')));

const crypto = require('node:crypto');
const util = require('util');




startSMTPServer(25);
start_minid();


do_hybrid_crypto("DUPA", "03d71d56d5e787561ae4a9244a387c92f06c942284db1e7f73794112c8b93b8c16");


function handleNewIncomingMessage(message)
{
   console.log(message);

   //do_hybrid_crypto();

   if(!known_addresses.contains(message.recipient))
      return null;

   
}

async function crypto_random_array_nondetermin(len)
{
   var iv = new Uint8Array(len);
   return await
      util.promisify((function(iv){return function(cb){return crypto.randomFill(iv, cb)}}(iv)))();
}

/*class HybridCryptoDataPack
{
   constructor()
   {
   }
};*/

async function do_hybrid_crypto(data, remotePublicKey)
{
   var iv = await crypto_random_array_nondetermin(16);
   var key = await crypto_random_array_nondetermin(32);
   console.log(iv, key);

   var ecdh = crypto.createECDH("secp256k1");
   var our_public_key = ecdh.generateKeys();
   var shared_secret = ecdh.computeSecret(remotePublicKey, 'hex');
   console.log(shared_secret);

   var aes = crypto.createCipheriv('aes-256-cbc', key, iv);
   cipher.update();
   //;  o

   //return /* HybridCryptoDataPack */
   var a = {
      our_public_key: our_public_key,
      eee: shared_secret,
      data: cipher.final()
   };
   return a;


   

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