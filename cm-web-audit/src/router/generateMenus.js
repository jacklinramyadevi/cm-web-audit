import showData from '../router/teamSystem.js'

export default{
	generateMenus(list,thisval){
		var trylist = [];
		for(var l=0; l<list.length; l++){
	        if(list[l].type=='memu' && list[l].parentId==null){
	            
	            //var urlval = `../views`+list[l].url+`.vue`
	            if(list[l].url != undefined){
	            	var filename1 = list[l].url
	            	var menu={};
		            trylist.push({name:list[l].id, url:list[l].url})
		        }

	            for(var i=0; i<list.length; i++){
	                if(list[l].id==list[i].parentId && list[i].type=='memu' && list[i].url!='/index'){
	                    trylist.push({name:list[i].parentId+'-'+list[i].id, url:list[i].url})
	                    //thisval.$router.addRoutes({path: list[i].url, name:l+'-'+i,component: require('../views'+list[i].url+'.vue')})
	                }
	            }
	        }
	    }


		var counter = trylist.length - 1;


		function myFunction() {
		    
		    var menu = {};
		    var filename = trylist[counter].url;
		    menu = {path:trylist[counter].url,name:(trylist[counter].name).toString(),component:resolve => require(['../views'+filename+'.vue'],resolve)};
		    var newmenu = []
		    newmenu.push(menu)
		    thisval.$router.options.routes[0].children.push(menu);
		    thisval.$router.addRoutes(thisval.$router.options.routes);

		    counter--;
		    if (counter >= 0) {
		        setTimeout(myFunction, 100);    
		    }else{
			    thisval.$store.dispatch('edit_menuList',JSON.stringify(trylist));
		    }
		}

		myFunction();

	    
	}
}

