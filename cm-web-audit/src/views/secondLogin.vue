
<style>
    /* .login{width:1200px;margin:0 auto;}
    .lgContent{padding:140px 80px;text-align:center;}
    .lgContent h1{font-size:20px;color: #4063DE;line-height:38px;letter-spacing:20px;} */
</style>

<template>
  <!-- <div class="login">
        <div class="lgContent">
            <h1>快速安全登录</h1>
            <Form class="lgForm" label-position="top">
                <FormItem>
                    <Button type="primary" class="btnLogin" @click="btnLogin">登录</Button>
                </FormItem>
            </Form>
        </div>
  </div> -->
</template>

<script>
import showData from '../router/teamSystem.js';

export default {
  name: 'login',
  data () {
    return {
            lgClick:false,
        }
    },
    created:function(){
        var href=window.location.search;
        if(!href || href.indexOf('?')!=0){
            return false;
        }
        var hrefArr=href.replace('?','');
        //var token=window.sessionStorage.getItem("token");
        var token=showData.getCookie('token');
        /*console.log(token)
        if(token!=null && token!=''){*/
        let hrefArrs=hrefArr+'&token='+token;
        showData.secondLogin(hrefArrs,this);
        /*}else{
            this.$router.pash({path:'login'});
        }*/
    },
    methods: {
    }
}
</script>

