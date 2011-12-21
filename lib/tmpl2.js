
 (function(){
   var cache = {};
   var quote=function(str){   
      return str.replace(/'/g,"\\'").replace(/"/g,'\\"');
   }
   var replaceFnStart=function(f1,f2,f3){     
       return  pushWraper(quote(f2))+replaceTag(f3)+'\r';  
   }  
   var replaceFnEnd=function(f1,f2){       
       return  pushWraper(quote(f2));
   } 
   var pushWraper=function(str){
      return "p.push('"+str+"');";
   }   
   var replaceTag=function(tag){
     if(tag.indexOf('<%=')==0 ){
        return "p.push("+tag.substring(3,tag.length-2)+");";
     }else{
        return tag.substring(2,tag.length-2);
     }
   }
  this.tmpl = function tmpl(str, data){
     var fn = !/\W/.test(str) ?
       cache[str] = cache[str] ||
         tmpl(document.getElementById(str).innerHTML) :
         new Function("obj",
         "var p=[],print=function(){p.push.apply(p,arguments);};" +     
         "with(obj){" +       
         str.replace(/[\t\r\n]/g,' ')
         .replace(/(.*?)(<%.*?%>)/g,replaceFnStart)
         .replace(/([^\r]*?)$/,replaceFnEnd)      
         .replace(/\r/g,'')         
       + "}return p.join('');");
     return data ? fn( data ) : fn;
   };
 })(); 