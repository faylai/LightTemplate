 (function(){
   var cache = {};
   var quote=function(str){   
      return str.replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/[\r\n]/g,' ');
   }
   var pushWraper=function(str){
      return "p.push('"+quote(str)+"');";
   }   
   var replaceTag=function(tag){
     if(tag.indexOf('=')==0 ){
        return "p.push("+tag.substring(1)+");";
     }else{
        return tag;
     }
   }
   function resolve(str)
   {    
         // support ${}  expression
         str=str.replace(/[$][{]([^{]*?)[}]/g,"<%print($1);%>");
         var pChar=undefined,pos=0;bf=[],i=0;
         for(;i<str.length;i++)
         {
             if(pChar!=undefined){
                pChar=pChar+str[i];
                if(pChar=='<%'){
                   bf.push(pushWraper(str.substring(pos,i-1)));
                   pos=i+1
                }else if(pChar=="%>"){                   
                   bf.push(replaceTag(str.substring(pos,i-1)));
                   pos=i+1;
                }
             
             }
             pChar=str[i];         
         }
         bf.push(pushWraper(str.substring(pos,str.length)))       
         return bf.join('');         
   }
  this.tmpl = function tmpl(str, data){
     var fn = !/\W/.test(str) ?
       cache[str] = cache[str] ||
         tmpl(document.getElementById(str).innerHTML) :
         new Function("obj",
         "var p=[],print=function(){p.push.apply(p,arguments);};" +     
         "with(obj){" +resolve(str)      
       + "}return p.join('');");
     return data ? fn( data ) : fn;
   };
 })(); 
