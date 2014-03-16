# LightTemplate

  Jsp-like style template ,writer you template in html just like in jsp .  
  you also can you ${} epresstion to output string.


```


## For Example

```js

	   var branchTags=[		  
		    '<% for(var i=0;i<list.length;i++){%>',
		    '<% if (!list[i].leaf){ %>',
				'<li node="${list[i].id}">',				    
					'<div class="node">',
						'<em></em><a href="#">${list[i].text}</a>',
					'</div>',
					'<ul>',
					'<li class="loading">加载中...</li>',
					'</ul>',
				'</li>',		
			 '<%}else{%>',
			    '<li><a href="${list[i].id}">${list[i].text}</a></li>',		
			'<%}}%>'			
		].join("");	
		var branchTpl=tmpl(branchTags);
		
		tmpl({list:[{leaf:true,name:'test',id:'123'}]})
		
		
		
	 
```
