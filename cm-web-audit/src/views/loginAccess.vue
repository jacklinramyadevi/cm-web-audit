<template>

</template>

<script>
import cookie from '../router/cookie.js'
import showData from '../router/commonMo.js'

export default{
	data(){
		return{
			
		}
	},
	created:function(){
		/*if(this.$route.query.redirect!=undefined){
			cookie.setCookie('redirect',this.$route.query.redirect,2);
		}*/
		var detail;
		var href=window.location.search;
		if(this.$store.getters.accessToken!='' && this.$store.getters.accessToken!=null){
			detail='accessToken='+this.$store.getters.accessToken+'&userId=0';
		}else if(href.indexOf('?')>=0){
			var arr=href.replace('?','');
			var hrefArr=arr;
			if(arr.indexOf('&')>=0){
				hrefArr=arr.split('&');
			}

			var a={};
			for(var h in hrefArr){
				var r=hrefArr[h].split('=');
				a[''+r[0]]=r[r.length-1];
			}
			this.$store.dispatch("edit_accessToken",a['accessToken']);
			detail='accessToken='+a['accessToken']+'&userId=0';
            
		}else{
			detail='accessToken=""&userId=0';
		}
		showData.loginAuth(detail,this);
	},
	methods:{
        /*getLoginData(list){
            if(list!=undefined){
                this.userInfo=list.userInfo;
                cookie.setCookie('userInfo',list.userInfo,2);
                this.$store.dispatch('edit_userInfo',list.userInfo);
				this.$router.push({path:'index'});
            }
        },*/
        getuserInfo(userInfo){
            if(userInfo!=undefined){
                this.$store.dispatch("edit_userInfo",{id:userInfo.id,name:userInfo.name});
                
                if(this.$route.query.redirect!=undefined){
					window.location.href=this.$route.query.redirect;
                }
				else{
					this.$router.push({path:'/index'});
				}
            }
        },
        getMenu(list){
        	if(list.length>0 && list!=undefined){
                //generateMenus.generateMenus(list,this);
            }
        }
	}
}
</script>