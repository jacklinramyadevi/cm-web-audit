<style scoped>
    .ivu-menu-primary{background: #E88423;}
    .layout{
        background: #f5f7f9;
    }

    .layout-logo{
        width: auto;
        height: 60px;
        line-height:60px;
        float: left;
        margin-right:10px;
        font-size:1.8em;
    }
    .layout-nav{
        width: auto;
        float:right;
    }
    .ivu-col-span-3{width:200px;}
    .ivu-col-span-21{width:calc(100% - 200px);}
    /* .topMenu{padding:0 20px;} */
    .layout-content{
        width:100%;
        min-height: 200px;
        overflow: hidden;
    }
    .layout-content-main{
        margin:10px;
        padding: 10px;
        background:#fff;
        border-radius:4px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #fff;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .topMenu.ivu-menu,.topMenu a,.topMenu .ivu-btn-text{color:#fff;}
    .topMenu .ivu-poptip-body a{color: #495060;}
    .layout-content .ivu-menu a{color: #495060;padding: 14px 24px;}
    .layout-content li .ivu-menu a{color: #999;padding: 10px 0;}
    .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu:hover{background:#E88423;}
    .topMenu .ivu-menu-item a{color:#ffad33;}
    .topMenu .ivu-menu-item-active a, .topMenu .ivu-menu-item:hover a, .topMenu .ivu-menu-submenu-active a,.topMenu .ivu-menu-submenu:hover a{background:#E88423;color:#fff;}
    .ivu-menu-vertical.ivu-menu-light:after{background:#fff;}
    .ivu-menu a{width:100%;color:#fff;height:auto;display:inline-block;}
    .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
        padding: 0;
    }
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item a, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title a {
        padding: 14px 24px;
        color: rgba(255,255,255,.7);
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){border:0;background:#FCF5EB;}
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) a{
        color:#E88423;
    }
    /* .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item a{padding-left: 43px;} */
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active a, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover a{
        color: #fff;
    }
    .layout-menu-left li .ivu-icon{margin-right:8px;}
    .layout-menu-left li .ivu-icon:before{content:'';float: left;width: 14px;height: 14px;margin-bottom: -2px;background-size:14px 14px;}
    .layout-menu-left .ivu-icon-index:before{background:url('../assets/icon_home.png') no-repeat center;}
    .layout-menu-left .ivu-icon-userInfo:before{background:url('../assets/icon_Personal-information.png') no-repeat center;}
    .layout-menu-left .ivu-icon-menuDetail:before{background:url('../assets/icon_Personal-information.png') no-repeat center;}
    .layout-menu-left .ivu-icon-team:before{background:url('../assets/icon_tuanduiguanli.png') no-repeat center;}
    .layout-menu-left .ivu-icon-ios-close:before{background:url('../assets/icon_qudaoguanli.png') no-repeat center;}
    .layout-menu-left .ivu-icon-ios-repay:before{background:url('../assets/icon_shouxinziliao.png') no-repeat center;}
    .layout-menu-left .ivu-icon-ios-compenstate:before{background:url('../assets/icon_dindanguanli.png') no-repeat center;}
    .layout-menu-left .ivu-icon-ios-recommend:before{background:url('../assets/icon_yewuchaxun.png') no-repeat center;}
    .userOp{width:auto;height:60px;line-height:60px;cursor:pointer;padding-left:30px;padding-right:15px;}
    .userImage{width:auto;height:60px;float:left;padding:10px 6px 0;overflow:hidden;}
    .userImage img{border:0;width:40px;height:40px;border-radius:50% 50%;-webkit-border-radius:50% 50%;-moz-border-radius:50% 50%;-o-border-radius:50% 50%;}
    .btn_right{display:none;}
    .layout-content-main{border-radius: 0px;}
    .api a{text-align:center;padding:10px 0;border-bottom:1px solid #dfdfdf;}
    .api li:last-child a{border:0;}
     
     @media (max-width:768px){
        .layout-logo{font-size:18px;}
        .ivu-menu-submenu-title span>i, .ivu-menu-submenu-title>i{margin-right: 4px;}
        .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item a{padding:14px 24px;}
        .btn_right{display:block;float:right;padding:0;color:#2d8cf0;    padding: 14px 15px;}
        .btn_right .expand{background:url('../assets/close.png') no-repeat center;width:20px;height:32px;background-size: 20px 20px;}
        .btn_right .expand:before{content:'';}
        .topMenu .layout-nav,.topMenu .ivu-menu-item{clear:both;width:100%;padding:0;}
        .topMenu .layout-nav{position:absolute;top:60px;z-index:990;background-color:#fff;box-shadow:0 0 3px #ccc;}
        .topMenu .layout-nav li{border-bottom:1px solid #e5e5e5;text-align:center;}
        .topMenu .api li{border-bottom:0;}
        .topMenu .layout-nav{width: 100%;text-align: center;}
        .topMenu .userOp{padding-left:0;}
        .topMenu a{width:auto;padding:0 8px;}
        .topMenu .layout-nav .ivu-menu-item-active a,.topMenu .layout-nav .ivu-menu-submenu:hover a{border-bottom: 2px solid #4eb45d;}
        .layout-content .ivu-col-span-3{position:absolute;left:0;z-index:32;}
        .layout-content .ivu-col-span-21{width:100%;}
        .layout-menu-left{margin-left:-200px;}
        .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover{
            border-bottom: 1px solid #ccc;
        }
        .topMenu.ivu-menu{color:#88eeb1;}
        .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu:hover,.topMenu .ivu-menu-item-active a, .topMenu .ivu-menu-item:hover a, .topMenu .ivu-menu-submenu-active a,.topMenu .ivu-menu-submenu:hover a{background:#fff;color:#4eb45d;}
    }
</style>
<style>
@import '../css/style.css';
</style>
<template>
  <div class="headers">
    <div class="layout">
        <Menu mode="horizontal" ref="topMenu" class="topMenu" theme="primary" :active-name="systemId">
            <i-button type="text" style="float:left;padding: 14px 15px;" @click="toggleClick">
                <Icon type="navicon" size="32"></Icon>
            </i-button>

            <div class="layout-logo"><router-link to="/index">信美分期管理系统</router-link></div>
            <!-- <i-button type="text" class="btn_right" @click="show=!show">
                <Icon type="navicon" :class="{expand:show}" size="32"></Icon>
            </i-button> -->
            <!-- <transition name="fadeInDownBig">  -->
                <div class="layout-nav" v-if="show">

                    <MenuItem :name="s.id" v-for="(s,i) in menuSystem" :key="i"><a :href="s.url">{{s.remarks}}</a></MenuItem>
                    
                    <Poptip placement="bottom">
                        <div type="ghost" class="userOp"><div class="userImage"><img src="../assets/userImg.jpg" height="334" width="500"/></div><span v-text="userInfo.name"></span></div>
                        <ul class="api" slot="content">
                            <li><router-link to="/userInfo">个人信息</router-link></li>
                            <li><router-link to="/logout">退出登录</router-link></li>
                        </ul>
                    </Poptip>
                </div>
            <!-- </transition> -->
        </Menu>
        <div class="layout-content" :class="{'layout-hide-text':spanLeft<3}">
            <Row type="flex">
             <!-- :duration="{enter:1000,leave:3000}" -->
            <transition name="fadeInLeft">
                <i-col :span="spanLeft" class="layout-menu-left" >
                <div @click="menuClick">
                <Menu ref="activeMenu" :open-names="openName" :active-name="activeName" width="auto" accordion>
                    <li v-for="(m,index) in menuList" :key="index">
                        <Submenu :name="m.id" v-if="m.children.length>0">
                            <template slot="title">
                                <Icon :type="m.icon" :size="iconSize"></Icon>
                                <span class="layout-text" v-text="m.name"></span>
                            </template>
                            <MenuItem :name="(c.parentId+'-'+c.id).toString()" v-for="(c,i) in m.children" :key="i"><router-link :to="c.path" v-text="c.name"></router-link></MenuItem>
                        </Submenu>
                        <MenuItem :name="m.id.toString()" v-else-if="m.children!=undefined">
                            <router-link :to="m.path">
                                <Icon :type="m.icon" :size="iconSize"></Icon>
                                <span class="layout-text" v-text="m.name"></span>
                            </router-link>
                        </MenuItem>
                    </li>
                
                    <!--<MenuItem name="2">
                        <router-link to="/userInfo">
                            <Icon type="ios-bussiness" :size="iconSize"></Icon>
                            <span class="layout-text">个人信息</span>
                        </router-link>
                    </MenuItem>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-freeze" :size="iconSize"></Icon>
                            <span class="layout-text">团队管理</span>
                        </template>
                        <MenuItem name="3-1"><router-link to="/personInfo">成员管理</router-link></MenuItem>
                        <MenuItem name="3-2"><router-link to="/actorMsg">角色管理</router-link></MenuItem>
                        <MenuItem name="3-3"><router-link to="/organization">组织管理</router-link></MenuItem>
                        <MenuItem name="3-4"><router-link to="/userWorks">排班管理</router-link></MenuItem>
                    </Submenu>
                    <MenuItem name="8">
                        <router-link to="/menuDetail">
                            <Icon type="ios-bussiness" :size="iconSize"></Icon>
                            <span class="layout-text">系统菜单设置</span>
                        </router-link>
                    </MenuItem>-->
                    <Submenu name="10" v-if="!show">
                        <template slot="title">
                            <Icon type="ios-close" :size="iconSize"></Icon>
                            <span class="layout-text">系统管理</span>
                        </template>
                        <MenuItem :name="s.id" v-for="(s,i) in menuSystem" :key="i"><a :href="s.url">{{s.remarks}}</a></MenuItem>
                    </Submenu> 
                </Menu>

                <ul class="api mobile_api" v-if="!show">
                    <li><router-link to="/userInfo">个人信息</router-link></li>
                    <li><router-link to="/logout">退出登录</router-link></li>
                </ul>
                </div>
            </i-col>
            </transition>
            <i-col :span="spanRight" class="layout-right">
                <div class="layout-content-main">
                    <router-view v-bind:showSystem="showSystem"></router-view>
                </div>
                <div class="layout-copy">
                    2016-2017 &copy; 信美分期
                </div>
            </i-col>
        </Row>
        </div>
    </div>
</div>
</template>

<script>
import '../router/jquery-1.11.3.min.js';
import swipe from '../router/jquery.touchSwipe.min.js';
import showData from '../router/teamSystem.js';
import generateMenus from '../router/generateMenus.js';

export default {
  name: 'headers',
	data () {
	    return {
	        spanLeft: 3,
	        spanRight: 21,
            show:false,
            timer:true,
            //showSystemid : null,
            showSystem:[],
            menuSystem:[],
            systemId:1,
            /*screnWidth:document.body.clientWidth,*/
            screnHeight:window.innerHeight-62 || document.documentElement.clientHeight-62 || document.body.clientHeight-62,
            userInfo:{},
            routeName:'',
            activeName:0 || '',
            openName:[],
            token:'',
            menuList:[]
	    }
	},
    created:function(){
        this.routeName=this.$route.name;
        if(showData.getCookie('systemId')==undefined || showData.getCookie('systemId')=='' || showData.getCookie('systemId')==null){
            showData.setCookie('systemId',1,20);
        }else{
            this.systemId=showData.getCookie('systemId');
        }
        this.token=this.$store.getters.token;
        if(this.token!=''){
            var detail='?token='+this.token;
            showData.getMenu(detail+'&systemId=1',this);
            showData.getSystemList(detail,this);
            showData.getTabSystemList(detail,this);
            showData.getuserInfo(this,detail);
        }
    },
    mounted (){

        var height=window.innerHeight-62 || document.documentElement.clientHeight-62 || document.body.clientHeight-62;
        /*var height1=Math.max(window.innerHeight-62,document.documentElement.clientHeight-62,document.body.clientHeight-62)*/
        $('.layout-menu-left').css('minHeight',height);
        $('.layout-content-main').css('minHeight',height-68);

        if(window.innerWidth>=768){
            this.show=true;
        }else{
            $('.layout-right').touchwipe({
                wipeLeft:function(){
                    if($('.layout-menu-left').hasClass('expand')){
                        $('.layout-menu-left').animate({'marginLeft':-200},500);
                        $('.layout-right').animate({'marginLeft':0},500);
                        $('.layout-menu-left').removeClass('expand');
                    }
                },
                min_move_x:10,
                preventDefaultEvents:false
            })
        }

        window.onresize=function(){
            if(window.innerHeight){
                this.screnHeight=window.innerHeight-62;
            }
            else if((document.body) && (document.body.clientHeight)){
                this.screnHeight=document.body.clientHeight-62;
            }
            $('.layout-menu-left').css('minHeight',this.screnHeight);
            $('.layout-content-main').css('minHeight',this.screnHeight-68);
        }
    },
    computed: {
        /*activeName (){
            const name=this.routeName;
            if(name!=null && name!=''){
                return name;
            }
        },
        openName (){
            const name=this.routeName;
            console.log(name)
            console.log(typeof(name))
            this.$nextTick(function(){
                if(name!=null && name!=''){
                    var n=name.split('-');
                    var a=[];
                    this.$set(a,0,n[0]);
                    return a;
                }
            })
        },*/
        iconSize () {
            return this.spanLeft === 3 ? 14 : 24;
        }
    },
    watch:{
        routeName:function(newValue,oldValue){
            if(window.innerWidth<768){
                if(newValue!=oldValue){
                    this.expentMenu();
                }
            }
        },
        '$route':function(val){
            this.routeName=val.name;
            this.$nextTick(function(){
                this.getRoute();
            })
        },
        show:function(val){
            if(val){
                this.$nextTick(function(){
                    var height=window.innerHeight-62 || document.documentElement.clientHeight-62 || document.body.clientHeight-62;
                    //$('.topMenu li').eq(this.systemId-1).addClass('ivu-menu-item-active');
                    if(window.innerWidth<768){
                        $('.topMenu .layout-nav').css('minHeight',height+2);
                        $('body').css('overflow','hidden');
                    }
                });
            }else{
                $('body').css('overflow','auto');
            }
        }
    },
    methods:{
        getRoute(){
            if(this.routeName.toString().indexOf('-')>=0){
                var name=this.routeName.split('-');
                var a=[];
                a[0]=parseInt(name[0]);
                this.openName=[a[0]];
                this.activeName=this.routeName;
            }else{
                this.activeName=(this.routeName).toString();
            }
            this.$nextTick(function() {
                this.$refs.topMenu.updateActiveName();
                this.$refs.activeMenu.updateOpened();
            });
        },
        getMenu(result){
            this.menuList=[{id:0,name:'首页',url:'/index',icon:'index',children:[],permission:[],path:{path:'/index'}}];
            var that=this;
            let list=result;
            if(list.length>0 && list!=undefined){
                for(var l in list){
                    if(list[l].name!='个人信息'){
                        if(list[l].parentId==null && list[l].type=='memu'){
                            var menu={};
                            menu['id']=list[l].id;
                            menu['name']=(list[l].name).toString();
                            menu['url']=list[l].url;
                            menu['icon']=list[l].url!=null?list[l].url.substring(1,list[l].url.length):'';
                            menu['children']=[];
                            menu['permission']=[];
                            menu['path']={path:menu.url};
                            for(var i in list){
                                if(list[l].id==list[i].parentId){
                                    if(list[i].type=='memu'){
                                        var children={};
                                        children['id']=list[i].id;
                                        children['name']=(list[i].name).toString();
                                        children['url']=list[i].url;
                                        children['permission']=[];
                                        children['parentId']=list[i].parentId;
                                        for(var t in list){
                                            if(list[t].type=='permission'){
                                                if(list[i].id==list[t].parentId){
                                                    children['permission'].push(list[t].url);
                                                }
                                            }
                                        }
                                        children['path']={path:list[i].url,query:{op:children.permission}};
                                        menu['children'].push(children);
                                    }else{
                                        menu['permission'].push(list[i].url);
                                    }
                                }
                            }
                            menu['path'].query={op:menu.permission};
                            this.menuList.push(menu);
                        }
                    }
                }
                this.$nextTick(function(){this.getRoute()});
                generateMenus.generateMenus(list,this);
            }else{
                this.$router.push({path:'/systemSelect'});
            }
        },
        getuserInfo(list){
            if(list!=undefined){
                this.userInfo=list;
            }
        },
        getSystemList(list){
            if(list.length>0 || list!=undefined){
                this.menuSystem=list;
                /*for(var i in this.showSystem){
                    if(this.showSystem[i].id == this.systemId){
                        this.showSystemid= this.showSystem[i].id;
                        break;
                    }else{
                        this.showSystemid= this.showSystem[0].id;
                    }
                }*/

                this.$nextTick(function() {
                    this.systemId=1;
                    this.$refs.topMenu.updateActiveName();
                    this.$refs.activeMenu.updateOpened();
                })
               
            }
        },
        getTabSystemList(list){
            if(list.length>0 && list!=undefined){
                this.showSystem=list;
            }
        },
        /*changeSystem(id){
            this.systemId=id;
            showData.setCookie('systemId',id,20);
        },*/
        expentMenu (){
            $('.layout-menu-left').animate({'marginLeft':-200},500);
            $('.layout-right').animate({'marginLeft':0},500);
            $('.layout-menu-left').removeClass('expand');
        },
        toggleClick () {
            if(window.innerWidth>=768){
                if (this.spanLeft === 3) {
                    this.spanLeft = 1;
                    this.spanRight = 23;
                    $('.ivu-menu-opened .ivu-menu').hide();
                } else {
                    this.spanLeft = 3;
                    this.spanRight = 21;
                    $('.ivu-menu-opened .ivu-menu').show();
                }
            }else{
                if(!$('.layout-menu-left').hasClass('expand')){
                    this.show=false;
                    $('.layout-menu-left').animate({'marginLeft':0},500);
                    $('.layout-right').animate({'marginLeft':200},500);
                    $('.layout-menu-left').css('height',$('.layout-right').height());
                    $('.layout-menu-left').addClass('expand');
                }else{
                    this.expentMenu();
                }
            }
        },
        menuClick (){
            if(this.spanLeft===1){
                this.toggleClick();
            }
        }
    }
}
</script>
<style>
.layout-hide-text .ivu-menu-vertical .ivu-menu-submenu-title-icon{display:none;}
.ivu-menu-vertical .ivu-menu-item:hover,.ivu-menu-light.ivu-menu-vertical .ivu-menu-submenu-title:hover{background:#FCF5EB!important;}
</style>

