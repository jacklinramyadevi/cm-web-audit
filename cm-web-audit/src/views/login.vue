
<style>
    .login{background:url('../assets/login_bg.png') no-repeat center;width:100%;height:auto;background-size:100% 100%;position:relative;}
    .lgBody{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:33;}
    .lgBody img{width:auto;}
    .lgContent{width:600px;position:absolute;top:0;left:50%;z-index:34;padding:140px 80px;}
    .lgContent h1{font-size:38px;color: #4063DE;line-height:38px;letter-spacing:20px;}
    .lgContent h1 span{font-size:18px;font-weight:normal;color: #9B9B9B;letter-spacing:2px;}
    .login .lgForm{width:100%;height:auto;padding-top:60px;}
    .login .ivu-form .ivu-form-item-label{font-size:16px;color:#4063DE;}
    .login .lgForm input{border:0;border-radius:0;border-bottom:1px solid #DCE0EA;font-size:16px;color:#333333;height:40px;line-height:40px;}
    .login .ivu-checkbox-group{font-size:16px;margin-top:40px;text-align:left;}
    .login .ivu-checkbox-wrapper{font-size:16px;color:#BCC0CE;}
    .login .btnLogin,.btnLogin.ivu-btn-primary{width:100%;font-size:24px;background-color:#405DFA;border-color:#405DFA;box-shadow:0 3px 10px #9EB2EF;padding:10px 0;color:#fff;}
    .login .btnLogin:hover,, .btnLogin.ivu-btn-primary:hover, .btnLogin..ivu-btn-primary:active{background-color:#3A52D5!important;border-color:#3A52D5;color:#fff;}
    .ivu-form-item-label{float:left!important;}
    /* .login .ivu-checkbox-checked .ivu-checkbox-inner{background-color:#fff;border-color:#DCE0EA;}
    .login .ivu-checkbox-inner:after,.login .ivu-checkbox-checked .ivu-checkbox-inner:after{border-color:#CCD2E1;} */
    @media (max-width:768px){
        .login{overflow:hidden;background: url('../assets/mblLogin_bg.png') no-repeat center;}
        .lgBody{width:84%;top:11%;transform: translateX(-50%);}
        .lgBody img{display:none;}
        .lgContent{width:100%;position:static;background-color:#fff;padding:30px 5%;border-radius:6px;}
        .lgContent h1{font-size:28px;letter-spacing:8px;line-height:32px;}
        .lgContent h1 span{font-size:16px;}
        .login .lgForm{padding-top:30px;}
        .login .ivu-checkbox-group{margin-top:10px;}
        .login .lgForm input{height:32px;line-height:32px;}
        .login .btnLogin{padding:4px 0;font-size: 16px;}
    }
</style>

<template>
  <div class="login" :style="{height:heightLg+'px'}">
    <div class="lgBody">
        <img src="../assets/login_bg1.png" alt=""/>
        <div class="lgContent">
            <h1>信美管理系统<br/><span>让资产管理变得更高效</span></h1>
            <Form ref="lgForm" :model="lgForm" :rules="ruleForm" class="lgForm" label-position="top">
                <FormItem label="账号" prop='name'>
                    <Input v-model="lgForm.name" autofocus="true" @keyup.tab="orFocus=true"></Input>
                </FormItem>
                <FormItem label="登录密码" prop="pwd">
                    <Input type="password" v-model="lgForm.pwd" autofocus="orFocus" @on-enter="btnLogin('lgForm')"></Input>
                </FormItem>
                <FormItem>
                    <CheckboxGroup v-model="lgForm.remove">
                        <Checkbox label="记住登录密码"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" class="btnLogin" @click="btnLogin('lgForm')">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import showData from '../router/teamSystem.js'
export default {
  name: 'login',
  data () {
    return {
            winHeight:Math.max(window.innerHeight,document.documentElement.clientHeight,document.body.clientHeight),
            orFocus:false,
            lgClick:false,
            href:'',
            lgForm:{
                name:'',
                pwd:'',
                remove:['记住登录密码']
            },
            ruleForm:{
                name:[{required:true,message:'请输入账号',trigger:'blur'}],
                pwd:[{required:true,message:'请输入密码',trigger:'blur'}]
            }
        }
    },
    created:function(){
        //showData.loginOut(this);
        if(showData.getCookie('rememberPwd')){
            this.lgForm.name=showData.getCookie('account');
            this.lgForm.pwd=showData.getCookie('pwd');
            this.lgForm.remove=['记住登录密码'];
        }
    },
    mounted(){
        var winWidth=Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        if(winWidth>=768){
            window.onresize=function(){
                this.winHeight=Math.max(window.innerHeight,document.documentElement.clientHeight,document.body.clientHeight);
            }
        }
    },
    computed:{
        heightLg(){
            return this.winHeight;
        }
    },
    watch:{
        winHeight(newVal,oldVal){
            if(newVal!=oldVal){
                this.heightLg=function(){ return newVal};
            }
        }
    },
    methods: {
        btnLogin(name){
            if(!this.lgClick){//第一次点击登录按钮，提交
                this.$refs[name].validate((valid) => {
                    if(valid){

                        var detail={'account':this.lgForm.name,'password':this.lgForm.pwd};
                        let remember=false;
                        showData.loginAuth(detail,this);
                    }else{
                        this.$Message.error('验证失败');
                        this.lgClick=false;
                    }
                });
            }else{
                return false;
            }
        },
        loginOk(result){
            this.lgClick=true;
            if(this.lgForm.remove!=undefined || this.lgForm.remove.length>0){
                showData.setCookie('rememberPwd',true,20);
            }
            showData.setCookie('account',this.lgForm.name,20);
            showData.setCookie('pwd',this.lgForm.pwd,20);
            var token=result.token;
            this.$store.dispatch('edit_token',token);
            var h=this.$route.query.redirect;
            var pwd=this.lgForm.pwd;
            /*if(h!=undefined){
                window.location.href=h;
            }else*/ if(pwd=='888888'){
                this.$router.push({path:'/systemSelect',query:{updPwd:true}});
            }else{
                this.$router.push({path:'/systemSelect'});
            }
        }
    }
}
</script>

