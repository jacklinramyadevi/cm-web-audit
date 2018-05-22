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
<style>

    @import '../css/style.css';
</style>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import showData from  '../router/teamSystem.js';
    require('swiper/dist/css/swiper.css')
    export default {
        name: 'sections',
        components: {
            swiper,
            swiperSlide
        },
        data() {
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

                swiperOption: {
                    notNextTick: true,
                    //循环
                    loop:true,
                    init: false,
                    loopedSlides:25,
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
                    //左右点击
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                    //分页器设置
                    /*pagination: {
                       el: '.swiper-pagination',
                       clickable :true,
                       type: 'custom',
                       //自定义分页器样式
                       renderCustom: function (swiper, current, total) {
                            const activeColor = '#168fed'
                            const normalColor = '#aeaeae'
                            let color = ''
                            let paginationStyle = ''
                            let html = ''
                            for (let i = 1; i <= total; i++) {
                                if (i === current) {
                                    color = activeColor
                                } else {
                                    color = normalColor
                                }
                                paginationStyle = `background:${color};opacity:1;margin-right:20px;width:20px;height:20px;transform:skew(15deg);border-radius:0;`
                                html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`
                            }
                            return html
                        }
                    }*/
                }
            }
        },

        // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
        computed: {
            pageWin(){
                return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
            },
            swiper() {
                return this.$refs.mySwiper.swiper
            },

        },
        mounted() {

            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            // console.log('this is current swiper instance object', this.swiper)
            // this.swiper.slideTo(3, 1000, false)
        },
        created(){
            /*if(this.$route.query.updPwd){
                this.model1=true;
            }else{
                showData.getSystemList('?token='+this.$store.getters.token,this);
            }*/

            this.getSystemList()
        },
        methods:{
            getSystemList(){
                var self = this;

                this.systemList.push({'val':'slide 3'})
                this.systemList.push({'val':'slide 4'})
                this.systemList.push({'val':'slide 5'})
                setTimeout(function(){
                    self.systemList.pop();
                    self.systemList.pop();
                    self.systemList.pop();
                    self.systemList.push({'val':'slide 11'})
                    self.systemList.push({'val':'slide 12'})
                    self.systemList.push({'val':'slide 13'})
                    self.systemList.push({'val':'slide 14'})
                    self.systemList.push({'val':'slide 15'})

                    self.swiperOption['init'] = true;

                    //mySwiper.update();

                    console.log(self.systemList)
                }, 20);


            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    .systemShow{position: absolute;top: 50%;left: 50%;margin-top: -300px;margin-left: -500px;}

</style>