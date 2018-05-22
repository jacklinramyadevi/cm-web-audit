<style scoped>
    .ivu-menu-primary{background: #384FD3;}
    .layout{
        background: #fff;
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
    .layout-content{
        width:100%;
        min-height: 200px;
        overflow: hidden;
    }
    .ivu-menu a{width:100%;color:#fff;height:auto;display:inline-block;}
    .systemShow{position: absolute;top: 50%;left: 50%;margin-top: -300px;margin-left: -500px;}
     .systemShow .bd_system{text-align:center;/* border:1px solid #ccc; */}
     .swiper-container{
  height:200px;
  overflow: hidden;
  margin-top:88px;/*px*/
}
.swiper-wrapper{
  height:200px;
}
.swiper-slide{
  height:200px;
  float: left;
  /*background:red;*/
  width:300px;
}
     /* #certify {
        position: relative;
        width: 1000px;
        margin: 0 auto
         }

         #certify .swiper-container {
        padding-bottom: 60px;
         }

         #certify  .swiper-slide {
        width: 360px;
        height: 420px;
        box-shadow: 0 8px 30px #ddd;
        margin-bottom: 20px;
         }
         #certify  .swiper-slide img{
        display:block;
        width:auto;
        height: 520px;
         }
         #certify  .swiper-slide p {
        line-height: 98px;
        padding-top: 0;
        text-align: center;
        color: #636363;
        font-size: 1.1em;
        margin: 0;
         }

         #certify .swiper-pagination {
        width: 100%;
        bottom: 20px;
         }
         #certify .swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 5px;
        border: 3px solid #fff;
        background-color: #d5d5d5;
        width: 10px;
        height: 10px;
        opacity: 1;
         }

         #certify .swiper-pagination-bullets .swiper-pagination-bullet-active {
        border: 3px solid #00aadc;
        background-color: #fff;
         } */
    .systemShow h3{font-size:18px;padding-top:20px;}
    .systemShow p{padding-bottom:12px;}
    .systemShow a{color:#495060;}
    .btn_go{border-radius:20px;color:#999;position: relative;bottom: 80px;padding: 10px 45px;}
    .creditmate:hover .btn_go{background-color:#E88423;color:#fff;border-color:#E88423;}
    .audit:hover .btn_go{background-color:#00B06C;color:#fff;border-color:#00B06C;}
    .csms:hover .btn_go{background-color:#2463E4;color:#fff;border-color:#2463E4;}
    .finance:hover .btn_go{background-color:#3F5CFA;color:#fff;border-color:#3F5CFA;}
    .collect:hover .btn_go{background-color:#E64F52;color:#fff;border-color:#E64F52;} /* 催收系统 */
    .bsbsmng:hover .btn_go{background-color:#5D6CC1;color:#fff;border-color:#5D6CC1;} /* 业务监控系统 */


</style>
<style>
@import '../css/swiper.min.css';
@import '../css/style.css';
</style>
<template>
    <div class="sections">
        <div class="headers">
            <div class="layout">
                <Menu mode="horizontal" ref="topMenu" class="topMenu" theme="primary">
                    <div class="layout-logo" style="padding-left:52px;"><router-link to="/index">CreditMate&nbsp;信美分期管理系统</router-link></div>
                </Menu>
                <div class="layout-content">
                    <div >
                        <!--class="systemShow" <Row :gutter="70"> -->
                        <h3 style="padding-left:35px;padding-top:0;font-weight:normal;">选择系统：</h3>
                         <div >
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="s in systemList" ><div>{{s.val}}</div></swiper-slide>
        <!-- <swiper-slide>I'm Slide 2</swiper-slide>
        <swiper-slide>I'm Slide 3</swiper-slide>
        <swiper-slide>I'm Slide 4</swiper-slide>
        <swiper-slide>I'm Slide 5</swiper-slide>
        <swiper-slide>I'm Slide 6</swiper-slide>
        <swiper-slide>I'm Slide 7</swiper-slide>-->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
</div>
                            <!-- <Col :sm="8" :xs="24" v-for="(s,i) in systemList" :key="i">
                                <a :href="s.url" :class="s.colClass">s.url
                                    <div class="bd_system">
                                        <img :src="s.img"/>
                                        <img :src="'../static/img/'+s.img+'.90eddd8.png'"/>
                                        <h3 v-text="s.remarks"></h3>
                                        <p>点击进入</p>
                                        <Button type="ghost" class="btn_go">点击进入</Button>
                                    </div>
                                </a>
                            </Col> -->
                            <!-- <Col :sm="8" :xs="24">
                                <a href="" class="collection">s.url
                                    <div class="bd_system">
                                        <img src="../assets/collection.png"/>
                                        <Button type="ghost" class="btn_go">点击进入</Button>
                                    </div>
                                </a>
                            </Col>
                            <Col :sm="8" :xs="24">
                                <a href="" class="bsbsmng">s.url
                                    <div class="bd_system">
                                        <img src="../assets/bsbsmng.png"/>
                                        <Button type="ghost" class="btn_go">点击进入</Button>
                                    </div>
                                </a>
                            </Col> -->
                        <!-- </Row> -->
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="model1" :closable="false" :mask-closable="false" title="修改密码" class="noFooter minModal" width="600">
         <Form ref="formFr" :model="formFr" :rules="ruleFr">
            <FormItem prop="txtPwdNew">
                <Input type="password" v-model="formFr.txtPwdNew" placeholder="请设置新密码"></Input>
            </FormItem>
            <FormItem prop="txtPwd">
                <Input type="password" v-model="formFr.txtPwd" placeholder="再次输入新密码"></Input>
            </FormItem>
            <div class="float_right">
                <Button type="ghost" @click="handleReset('formFr')">取消</Button>
                <Button type="warning" @click="handleSubmit('formFr')">确定</Button>
            </div>
         </Form>
        <div slot="footer"></div>
    </Modal>
    </div>
</template>
<script>
import { swiper,swiperSlide } from 'vue-awesome-swiper';
import showData from  '../router/teamSystem.js';
require('swiper/dist/css/swiper.css')

export default {
  name: 'sections',
  components:{ swiper,swiperSlide },
  data () {
    const validateSame = (rule, value, callback) => {
        if (value.length == 0) {
            callback(new Error('新密码不能为空'));
        }else if(value=='888888'){
            callback(new Error('新密码不能与初始化密码相同'));
        }else {
            if(this.formFr.txtPwdNew!='' && this.formFr.txtPwd!='' && this.formFr.txtPwdNew!=this.formFr.txtPwd){
                callback(new Error('两次密码输入不一致'));
            }else
                callback();
        }
    };
    return {
        systemList:[],
        model1:false,
        formFr:{
            txtPwdNew:'',
            txtPwd:''
        },
        ruleFr:{
            txtPwdNew:[
                {required:true,validator:validateSame,trigger:'blur'}],
            txtPwd:[
                {required:true,validator:validateSame,trigger:'blur'}
            ]
        },
        swiperOption:{
            notNextTick: true,
                //循环
                loop:true,
                loopedSlides:5,
                watchSlidesProgress:true,
                slidesPerView:'auto',
                centeredSlides:true,
                //设定初始化时slide的索引
                initialSlide:0,
                //自动播放
                autoplay: false,
                //滑动速度
                speed:800,
                //滑动方向
                direction : 'horizontal',
                //小手掌抓取滑动
                grabCursor : true,
                //滑动之后回调函数
                on: {
                    slideChangeTransitionEnd: function(){
                      console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                    },
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            /*notNextTick:true,
            initialSlide:0,
            watchSlidesProgress:true,
            slidesPerView:'auto',
            centeredSlides:true,
            loop:true,
            loopedSlides:5,
            autoplay:false,
            direction : 'horizontal',
            //autoplayDisableOnInteraction:false,
            //slidesPerView:3,
            //slidesPerGroup:3,
            //spaceBetween:0,
            //effect:'coverflow',
            //grabCursor:true,
            //setWrapperSize:true,
            navigation:{
                prevEl:'.swiper-button-prev',
                nextEl:'.swiper-button-next',
            },
            pagination:{
                el:'.swiper-pagination',
                clickable:true
            },*/
            //observer:true,
            //observeParents:true,
            //debugger:true,
            /*on: {
                progress: function(progress) {
                    for (var i = 0; i < this.slides.length; i++) {
                        var slide = this.slides.eq(i);

                        var slideProgress = this.slides[i].progress;
                        var modify = 1;
                        if (Math.abs(slideProgress) > 1) {
                            modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                        }
                        var translate = slideProgress * modify * 150 + 'px';
                        var scale = 1 - Math.abs(slideProgress) / 5;
                        var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                        slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                        slide.css('zIndex', zIndex);
                        slide.css('opacity', 1);
                        if (Math.abs(slideProgress) > 3) {
                            slide.css('opacity', 0);
                        }
                    }
                },
                setTransition: function(transition) {
                    for (var i = 0; i < this.slides.length; i++) {
                        var slide = this.slides.eq(i)
                        slide.transition(transition);
                    }

                }
            }*/

        },
    }
    },
    created:function(){
        if(this.$route.query.updPwd){
            this.model1=true;
        }else{
            showData.getSystemList('?token='+this.$store.getters.token,this);
        }
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        },
        swiper() {
         return this.$refs.mySwiper.swiper
        },

    },
    methods: {
        getSystemList(list){
            this.systemList=[];
            /*if(list!=undefined){
                if(list.length<=1){
                    window.location.href=list[0].url;
                }else{
                    this.systemList=list;
                    for(var i in list){
                        var url=list[i].url;
                        var l=url.split('.');
                        this.systemList[i].colClass=l[1];
                        this.systemList[i].img=require('../assets/'+l[1]+'.png');

                    }
                }

            }*/
            this.systemList.push({'val':'slide 1'})
            this.systemList.push({'val':'slide 2'})
            this.systemList.push({'val':'slide 3'})
            this.systemList.push({'val':'slide 4'})
            this.systemList.push({'val':'slide 5'})
            console.log(this.systemList)
        },
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    var detail={'oldPassword':'888888','newPassword':this.formFr.txtPwdNew};
                    showData.updPassword(detail,this,'?token='+this.$store.getters.token);
                    this.model1=false;
                    showData.getSystemList('?token='+this.$store.getters.token,this);
                }else{
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name){
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style>
.ivu-btn-primary,.ivu-btn-primary:hover, .ivu-btn-primary.active, .ivu-btn-primary:active{background-color:#E88423;color:#fff;border-color:#E88423;}





</style>
