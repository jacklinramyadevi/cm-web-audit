<style scoped>
    @import '../css/viewer.min.css'
</style>
<template>
  <div class="sections">
    <h1>订单查询</h1>
    <div class="pl_body">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                        <Button type="success" @click="loanContent(1)">查询</Button>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                                产品类型<span v-text="formSel.typePd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>                                
                                <DropdownItem name="消费贷" :selected="formSel.typePd.indexOf('消费贷')>-1">消费贷</DropdownItem>
                                <DropdownItem name="现金贷" :selected="formSel.typePd.indexOf('现金贷')>-1">现金贷</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                            <Button type="ghost" :class="{active:vs3,chk:formSel.typePs!=''}">
                                审核人员<span v-text="formSel.typePs"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typePs=='全部'">全部</DropdownItem>
                                <DropdownItem name="1:系统" :selected="formSel.typePs.indexOf('张三')>-1">系统</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        
                        <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="借款时间" @on-change="dateChange"></DatePicker>
                        <Button @click="reset">重置</Button>
                    </FormItem>
                </Form>
        <div class="table_show">
        <Table border :columns="columns1" :data="data1" ref="table"></Table></div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="pageTotal" show-elevator @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="pageTotal" simple @on-change="changePage"></Page>
    </div>

    <Modal v-model="model1" title="订单详情" class="userInfo noFooter agentsDetail" width="900">
     <Form :model="dataRdo" class="dataRdo">
        <Row :gutter="16" v-for="(apo, i) in orderApprove" :key = "i">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="审核人员"><span>{{apo.approveNm}}</span></FormItem>
                        <FormItem label="审核状态">{{apo.statusTxt}} </FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="审核时间"><span>{{apo.approveTm}}</span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="借款编号"><span>{{dataRdo.loanNum}}</span></FormItem>
                        <FormItem label="客户姓名"><span>{{dataRdo.custNm}}</span></FormItem>
                        <FormItem label="手机号码"><span>{{dataRdo.custNm}}</span></FormItem>
                        <FormItem label="年龄"><span>{{dataRdo.custAge}}</span></FormItem>
                        <FormItem label="单位"><span>"无字段"</span></FormItem>
                        <FormItem label="所属省市"><span>{{dataRdo.province}}{{dataRdo.city}}</span></FormItem>
                        <FormItem label="推荐人"><span>{{dataRdo.recomNm}}</span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="产品名称"><span>{{dataRdo.tpNm}}</span></FormItem>
                        <FormItem label="所属代理商"><span>{{dataRdo.agentNm}}</span></FormItem>
                        <FormItem label="所属商户"><span>{{dataRdo.meichantNm}}</span></FormItem>
                        <FormItem label="借款金额"><span>￥{{dataRdo.loanAmt}}</span></FormItem>
                        <FormItem label="贴息金额"><span>￥{{dataRdo.discount}}</span></FormItem>
                        <FormItem label="分期期数"><span>{{dataRdo.loanLtm}}</span></FormItem>
                        <FormItem label="借款时间"><span>{{dataRdo.crtTm}}</span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>

        <!-- <Row :gutter="16" class="photoShow txt_center" style="margin-bottom:30px;margin-top:0;border:none;">
            <Col :sm="6" :xs="12">
                <h3>合同协议</h3>
                <img src="../assets/userImg.jpg"/>
                <p>借款合同</p>
            </Col>
            <Row class="docs-pictures">
                <Col :sm="6" :xs="12">
                    <h3>合影照片</h3>
                    <img src="../assets/userImg.jpg"/>
                    <p>客户身份证正面照</p>
                </Col>
                <Col :sm="6" :xs="12" class="contract">
                    <img src="../assets/userImg.jpg"/>
                    <p>业务员身份证正面照</p>
                </Col>
                <Col :sm="6" :xs="12" class="contract">
                    <img src="../assets/userImg.jpg"/>
                    <p>客户与业务员合影</p>
                </Col>
            </Row>
        </Row> -->
            <Row class="moneyCt" v-show="thawFlag">                
                <Col :sm="3" :xs="6">
                    <div><Button type="ghost" @click="thaw">解冻订单</Button></div>
                </Col> 
                <Col :sm="3" :xs="6">
                    <div><Button type="ghost" @click="orderCancel(-4)">取消订单</Button></div>
                </Col>              
            </Row>
        </Form>
        <div slot="footer"></div>
        
    </Modal>
    <Modal v-model="model2" title="解冻订单" class="noFooter noHeight" width="600" @on-cancel="closeModal('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr">
            <FormItem prop="txtFr">
                <Input type="textarea" v-model="formFr.txtFr" :rows="6" :maxlength="200" placeholder="输入解冻的理由" @on-keyup="txtKeyup('formFr')"></Input>
                <div class="submitDesc"><span v-text="formFr.descCount"></span><Button type="success" @click="thawOrder(0)">提交</Button></div>
            </FormItem>
         </Form>
         <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import '../router/jquery-1.11.3.min.js';
import viewer from '../router/viewer.min.js';
import axios from 'axios';
import {formatDate} from  '../router/data.js';
import showData from '../router/dateFormat.js';

var validateLen=function(rule,value,callback){
    if(!value){
        return callback(new Error('备注不能为空'));
    }else if(value.length>=200){
        return callback(new Error('备注至多为200字'));
    }else{
        callback();
    }
}

export default {
  name: 'sections',
    components:{ viewer },
  data () {
    return {
        model1:false,
        model2:false,
        model3:false,
        vs:false,
        vs2:false,
        vs3:false,
        thawFlag:false,
        titleMdl:'审核拒绝',
        txtVal:'输入审核拒绝的理由',
        tbWidth:100,
        total:0,
        pageTotal:0,
        products:[],
        formSel:{
            input:'',
            typePd:'',
            typePs:'',
            selectTm:[],
            typePdValue:''
        },
        formFr:{
            txtFr:'',
            descCount:'',
            descNm:0
        },
        ruleFr:{
            descLength:200,
            txtFr:[
                {validator:validateLen,trigger:'blur'}
            ]
        },
        dataRdo:{},
        orderApprove:[],
        columns1: [
        {
            title: '借款编号',
            key: 'loanNum'
        },
        {
            title: '客户姓名',
            key: 'custNm'
        },
        {
            title: '手机号',
            key: 'custMbl'
        },
        {
            title: '产品类型',
            key: 'consumeType'
        },
        {
            title: '审核状态',
            key: 'status'
        },{
            title: '审核人员',
            key: 'apprvNm'
        },
        {
            title: '借款时间',
            key: 'crtTm'
        },
        {
            title: '操作',
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'success',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.show(params.index);
                            }
                        }
                    }, '详情')
                ]);
            }
        }],
        data1: [{
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                createdTm: '2017-07-12 12:12:11'
            }]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=60;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
        this.loanContent(1);
    },
    mounted(){
        this.$nextTick(function(){
            $('.docs-pictures').viewer("data-original");
        });
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typePd=' : '+val;
                if(val.indexOf('消费贷') > -1) {
                    this.formSel.typePdValue = 0;
                }else if(val.indexOf('现金贷') > -1) {
                    this.formSel.typePdValue = 1;
                }
                
            }else{
                this.formSel.typePd='';
                this.formSel.typePdValue = '';
            }

            this.loanContent(1);
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu3(val){
            if(val!='全部' && val!=''){
                this.formSel.typePs=' : '+val;
                this.formSel.typePsValue = val.split(":")[0];
            }else{
                this.formSel.typePs='';
                this.formSel.typePsValue = '';
            }

            this.loanContent(1);
        },closeModal(name){
            this.$refs[name].resetFields();
        },txtKeyup(name){
            var val=this.formFr.txtFr;
            this.formFr.descNm=val.length;
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error(valid.message);
                }
            });
        },thaw(index){
            this.formFr.descNm=0;
            this.formFr.txtFr='';
            
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            this.model2=true;
        },
        orShow3(visible){
            this.vs3=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData (type) {
        },
        changePage(page){
            /*this.data1=this.*/
            this.loanContent(page);
        },
        show(index){
            this.model1=true;
            var that=this;

            that.dataRdo = that.data1[index];

            that.dataRdo.crtTm =   new Date(that.dataRdo.crtTm).Format('yyyy-MM-dd HH:mm:ss');

            that.thawFlag = false;
            if(that.dataRdo.status == '冻结中') { //冻结订单
                that.thawFlag = true;
            }

            var detail = {"token":that.dataRdo.flowNo , "orderId":that.dataRdo.id}

            axios.post('/audit/order/findOrderDetails',JSON.stringify(detail),
                 {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
                    if(!!resp.data.result){
                         var obj = resp.data.result;                         

                        //加载订单审核记录
                        that.orderApprove = [];
                        var orderApo = obj.orderApprove;
                        if(orderApo != null && orderApo != undefined) {
                            for(var i = 0 ; i < orderApo.length ; i++) {
                                var data = orderApo[i];
                                var status = data.status;
                                var statusTxt = '';
                                if(status == 0){
                                    statusTxt = "审核中";
                                }else if(status == 1){
                                    statusTxt = "放款中";
                                }else if(status == 2){
                                    statusTxt = "放款成功";
                                }else if(status == 3){
                                    statusTxt = "募标中";
                                }else if(status == 4){
                                    statusTxt = "募标成功";
                                }else if(status == 5){
                                    statusTxt = "解冻成功";
                                }else if(status == -1){
                                    statusTxt = "放款失败";
                                }else if(status == -2){
                                    statusTxt = "募标失败";
                                }else if(status == -3){
                                   statusTxt = "冻结中";
                                }else if(status == -4){
                                   statusTxt = "订单已取消";
                                }
                                that.orderApprove.push({
                                    'approveNm':data.apprvNm,
                                    'approveTm':data.crtTm != null ? new Date(data.crtTm).Format('yyyy-MM-dd HH:mm:ss') : data.crtTm,
                                    'statusTxt':statusTxt
                                });
                            }
                           
                        }
                         
                    }
            }).catch(function(resp){
                that.$Message.warning('系统异常');
            });
        },
        reset(){
            this.formSel.input='';
            this.formSel.typePd='';
            this.formSel.typePs='';
            this.formSel.selectTm=[];
        },
        loanContent(page){
            var firstResult = (parseInt(page) - 1) * 10;
            var maxResults = firstResult + 10;
            var that=this;

            //是否分配

            var detail = {"content":{"value":that.formSel.input,"type":that.formSel.typePdValue,"apprvId":that.formSel.typePsValue,
                                     "loanStartTime":that.formSel.selectTm[0],"loanEndTime":that.formSel.selectTm[1],
                                     "firstResult":firstResult,"maxResults":maxResults,"isAssign":1,
                                     "status":[-3,-2,-1,1,2,3,4,-4]}};

            axios.post('/audit/order/selectOrder',JSON.stringify(detail),
                 {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
                    if(!!resp.data.result){
                         var result=resp.data.result;
                         that.total = Math.ceil(( result.total / 10));
                         that.pageTotal = result.total;

                         result.orderRecordList.forEach(function(obj) {
                             obj.province = obj.province + obj.city;
                             if(obj.consumeType == 0){
                                 obj.consumeType = "消费贷";
                             }else if(obj.consumeType == 1){
                                 obj.consumeType = "现金贷";
                             }

                             obj.crtTm = new Date(obj.crtTm).Format('yyyy-MM-dd HH:mm:ss');

                             if(obj.status == 0){
                                    obj.status = "审核中";
                                }else if(obj.status == 1){
                                    obj.status = "放款中";
                                }else if(obj.status == 2){
                                    obj.status = "放款成功";
                                }else if(obj.status == 3){
                                    obj.status = "募标中";
                                }else if(obj.status == 4){
                                    obj.status = "募标成功";
                                }else if(obj.status == 5){
                                    obj.status = "解冻成功";
                                }else if(obj.status == -1){
                                    obj.status = "放款失败";
                                }else if(obj.status == -2){
                                    obj.status = "募标失败";
                                }else if(obj.status == -3){
                                   obj.status = "冻结中";
                                }else if(obj.status == -4){
                                   obj.status = "订单已取消";
                                }

                         }, this);
                        that.data1 = result.orderRecordList;
                    }
            }).catch(function(resp){
                that.$Message.warning('系统异常');
            });
        },
        thawOrder(type) {
            var that=this;
            var detail = {
                "userId": '1',
                "custName": "xxx",
                "content":{"status":type,"flowNo":this.dataRdo.flowNo,
                                     "channel":this.dataRdo.channelId,"receiverId":this.dataRdo.receiverId,"reason":this.formFr.txtFr,
                                     "unionId":this.dataRdo.unionId,"outTradeNo":this.dataRdo.outTradeNo,"id":this.dataRdo.id}
                        };
            axios.post('/audit/order/auditOrderApprove',JSON.stringify(detail),
                 {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
                    if(resp.data.resCode == "1"){
                         that.model1=false;
                         that.model2 = false;
                         that.$Message.success('解冻成功');
                         that.loanContent(1);
                    }
            }).catch(function(resp){
                that.$Message.warning('系统异常');
            });
        },
        queryOrderApprove() {
            var that = this;

            var detail = {
                "userId": '1',
                "custName": "xxx",
                'token':that.dataRdo.flowNo
                }

            axios.post('/audit/order/queryOrderApprove',JSON.stringify(detail),
                 {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
                    if(resp.data.resCode == "1"){
                         that.model1=false;
                         that.model2 = false;
                         that.$Message.success('解冻成功');
                         that.loanContent(1);
                    }
            }).catch(function(resp){
                that.$Message.warning('系统异常');
            });
        },
        orderCancel(sts){
            var that=this;
            var detail = {
                "userId": '1',
                "custName": "xxx",
                "content":{"status":sts,"flowNo":this.dataRdo.flowNo,
                                     "channel":this.dataRdo.channelId,"receiverId":this.dataRdo.receiverId,"reason":this.formFr.txtFr,
                                     "unionId":this.dataRdo.unionId,"outTradeNo":this.dataRdo.outTradeNo,"id":this.dataRdo.id}
                        };
            axios.post('/audit/order/auditOrderApprove',JSON.stringify(detail),
                 {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
                    if(resp.data.resCode == "1"){
                         that.model1=false;
                         that.model2 = false;
                         that.$Message.success('订单取消成功');
                         that.loanContent(1);
                    }
            }).catch(function(resp){
                that.$Message.warning('系统异常');
            });
        }
    }
}
</script>
