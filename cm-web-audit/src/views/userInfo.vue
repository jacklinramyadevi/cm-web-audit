<template>
  <div class="sections">
    <h1>个人信息</h1>
    <div class="pl_body">
        <div class="table_show">
            <table class="headerTb smallTb" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="txt_center">姓名</td><td v-text="userInfo.name"></td>
                </tr>
                <tr>
                    <td class="txt_center">账号</td><td v-text="userInfo.mobile"></td>
                </tr>
                <tr>
                    <td class="txt_center">座机号码</td><td v-text="userInfo.officePhone"></td>
                </tr>
                <tr>
                    <td class="txt_center">加入时间</td><td v-text="new Date(userInfo.createTime).Format('yyyy-MM-dd')"></td>
                </tr>
                <!-- <tr>
                    <td class="txt_center">上班时间</td><td><Row><Col :sm="20" :xs="24"><p>今日：早班（09：00-16：00） </p><p>明日：中班（09：00-16：00）</p></Col><Col :sm="4" :xs="24"><Badge dot><Button type="warning" size="small" @click="model1=!model1">详情</Button></Badge></Col></Row></td>
                </tr> -->
                <tr>
                    <td class="txt_center">密码修改</td><td><Row><Col :sm="20" :xs="24"><p>********</p></Col><Col :sm="4" :xs="24"><Button type="ghost" @click="model4=!model4" size="small">修改</Button></Col></Row></td>
                </tr>
            </table>
        </div>
    </div>
    <Modal v-model="model1" class="noFooter" title="上班时间" width="600">
        <div><span>早班：09:00-16:00&nbsp;&nbsp;&nbsp;&nbsp;中班：12:00-19:00&nbsp;&nbsp;&nbsp;&nbsp;中晚班： 14:00-21:00&nbsp;&nbsp;&nbsp;&nbsp;晚班：15:00-22:00</span></div>
        <div>
            <calendar :events="calendar1.events" :lunar="calendar1.lunar" :value="calendar1.value" :begin="calendar1.begin" :end="calendar1.end" @select="calendar1.select"></calendar>
        </div>
        <span>点击日期可进行换班</span><br/>
        <Button type="warning" @click="model3=!model3">换班记录</button>
        <Button type="ghost" @click="model1=!model1">取消</Button>
        <div slot="footer"></div>
    </Modal>

    <Modal v-model="model2" @on-ok="changeOk" title="换班">
         <Form :model="formChange" class="frmperson">
             <FormItem>
                <Select v-model="formChange.name" placeholder="选择换班人员">
                    <Option value="张三">张三</Option>
                    <Option value="李四">李四</Option>
                </Select>
            </FormItem>
            <FormItem label="换班前时间">
                <p v-html="formChange.nowTm"></p>
            </FormItem>
            <FormItem label="换班后时间">
                <p v-html="formChange.changeTm"></p>
            </FormItem>
         </Form>
    </Modal>

    <Modal v-model="model3" class="noFooter" title="换班记录" width="600">
         <dl class="changeDetail">
            <dt><span>2017-08-08 12:12:31</span><p>“张三”申请与我换班</p><div class="float_right btnAll"><Button type="warning" @click="">通过</Button>
        <Button type="ghost" @click="">拒绝</Button></div></dt>
            <dd><div class="clear"></div>
            <p><label>2017-08-05  <span class="powerTitle">早班(09:00-14:00)</span></label><Icon type="around"></Icon> 2017-08-05   <span class="powerTitle">中班(10:00-18:00)</span></p>
            </dd>
            <dt><span>2017-08-08 12:12:31</span><p>我申请与“张三”换班 <span class="float_right">等待对方同意</span></p></dt>
            <dd><div class="clear"></div>
            <p v-html=""><label>2017-08-05  <span class="powerTitle">早班(09:00-14:00)</span></label><Icon type="around"></Icon>  2017-08-05   <span class="powerTitle">中班(10:00-18:00)</span></p>
            </dd>
         </dl>
         <div class="clear"></div>
         <div class="moneyCt"><Button type="ghost" style="margin-bottom:20px;" @click="model3=!model3"><返回</Button></div>
         <div slot="footer"></div>
    </Modal>

    <Modal v-model="model4" title="修改密码" class="noFooter minModal" width="600">
         <Form ref="formFr" :model="formFr" :rules="ruleFr">
            <FormItem prop="txtPwdOld">
                <Input type="password" v-model="formFr.txtPwdOld" placeholder="请输入原密码"></Input>
            </FormItem>
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
import calendar from '../components/calendar.vue'
import '../router/dateFormat.js'
import showData from '../router/teamSystem.js'

export default {
    name: 'sections',
    props:['systemId'],
    components: {
        calendar
    },
    data () {
        const validateSame = (rule, value, callback) => {
            if (value.length == 0) {
                callback(new Error('新密码不能为空'));
            }else {
                if(this.formFr.txtPwdNew!='' && this.formFr.txtPwd!='' && this.formFr.txtPwdNew!=this.formFr.txtPwd){
                    callback(new Error('两次密码输入不一致'));
                }else
                    callback();
            }
        };
        return {
            model1:false,
            model2:false,
            model3:false,
            model4:false,
            tbWidth:100,
            userShow:{},
            userInfo:{},
            formChange:{
                name:'',
                nowTm:'',
                changeTm:''
            },
            formFr:{
                txtPwdOld:'',
                txtPwdNew:'',
                txtPwd:''
            },
            ruleFr:{
                txtPwdOld:[
                    {required:true,message:'旧密码不能为空',trigger:'blur'}
                ],
                txtPwdNew:[
                    {required:true,validator:validateSame,trigger:'blur'}],
                txtPwd:[
                    {required:true,validator:validateSame,trigger:'blur'}
                ]
            },
            startDate:Date.now(),
            calendar1:{
                range:true,
                value:this.startDate, //默认日期
                // lunar:true, //显示农历
                /*weeks:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],*/
                events:{
                    '2017-9-20':'（早班）',
                    '2017-9-21':'（早班）',
                    '2017-9-22':'（晚班）',
                    '2017-9-24':'（早班）',
                    '2017-9-26':'（早班）',
                    '2017-9-27':'（晚班）',
                    '2017-9-28':'（早班）',
                    '2017-9-29':'（早班）',
                    '2017-9-30':'（晚班）',
                },
                select:(value)=>{
                    this.model2=true;
                    var v=value.toString();
                    var val=v.split(',');
                    var str=val[0]+'-'+val[1]+'-'+val[2];
                    this.formChange.nowTm=str+'&nbsp;&nbsp; 早班（09:00-16:00）';
                    this.formChange.changeTm=str+'&nbsp;&nbsp;休息';
                },
                timestamp:Date.now()
            }
        }
    },
    created:function(){
        this.loadData();
    },
    methods: {
        loadData(){
            showData.getuserInfo(this,'?token='+this.$store.getters.token);
        },
        getuserInfo(list){
            if(list.length>0 || list!=undefined){
                this.userInfo=list;
            }
        },
        changeOk(){

        },
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    var detail={'oldPassword':this.formFr.txtPwdOld,'newPassword':this.formFr.txtPwdNew};
                    showData.updPassword(detail,this,'?token='+this.$store.getters.token);
                    this.model4=false;
                }else{
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name){
            this.$refs[name].resetFields();
            this.model4=false;
        },
        /*changeEvents(){
            this.calendar1.events={
                '2017-7-20':'$'+(Math.random()*1000>>0),
                '2017-7-21':'$'+(Math.random()*1000>>0),
                '2017-7-22':'$'+(Math.random()*1000>>0),
            }
        }*/
    }
}
</script>

