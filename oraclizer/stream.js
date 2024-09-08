var stream = "";

exports.handle = _handle;
function _handle(toAdd, handler)
{
   stream += toAdd;
   for(var i=0;i<stream.length;++i)
   {
      if(i >= 1 && stream[i-1] == '\r' && stream[i] == '\n')
      {
         var str = stream;
         var ret;

         ret = str.substring(0, i-1);
         stream = str.substring(i+1);
         ++i;

         handler(ret);
         return _handle("", handler);
      }
   }
}
