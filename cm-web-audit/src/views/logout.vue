<template></template>
<script>
import showData from '../router/teamSystem.js';

export default {
	created:function(){
                var token=this.$store.getters.token;
                showData.clearCookie('systemId');
                //this.$store.dispatch('delete_menuList');
                if(token==='null' || token===''){
                        this.$store.dispatch('delete_token');
                	this.$router.push({path:'/login'});
                }else{
                        var detail='?token='+token;
        		showData.loginOut(detail,this);
                }
	}
}
</script>