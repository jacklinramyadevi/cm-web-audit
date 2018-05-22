
<template>
  <div class="sections chkUser">
    <div class="selCenter">
        <Row>
            <Col :sm="showUser ? 10:24" :xs="24">
                <h1 style="border:0;" :style="styleObject">客户查询</h1>
            </Col>
            <Col :sm="showUser ? 14:24" :xs="24">
                <Form :model="formSel" class="downMenu blackChk">
                    <FormItem :style="styleInput">
                        <Input style="display:none;"></Input>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="手机号" @on-enter="selUser"></Input>
                        <Button type="primary" @click="selUser">查询</Button>
                    </FormItem>
 					<FormItem v-if="!showUser && treatedCount>0" style="text-align:center;margin-left:-152px;"><span>待处理事项：{{treatedCount}}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="javacript:" @click="model5=!model5">立即处理</a></FormItem>
                </Form>
            </Col>
        </Row>
    </div>
    <div class="clear"></div>
    <div class="demo-tabs-style2 userStyle" v-if="showUser">
        <Tabs type="card" class="tabs" :size="tabSize" v-model="tabVal">
            <TabPane label="基本信息" name="tab1">
                <detail v-bind:tabMsg="tabVal" v-bind:selPhone="valueSel"></detail>
            </TabPane>
            <!-- <TabPane label="实名信息" name="tab2">
                <detail v-bind:tabMsg="'tab2'"></detail>
            </TabPane> -->
            <TabPane label="授信信息" name="tab3">
                <credit v-bind:tabMsg="tabVal" v-bind:selPhone="valueSel"></credit>
            </TabPane>
            <TabPane label="订单信息" name="tab4">
                <order v-bind:tabMsg="tabVal" v-bind:selPhone="valueSel" v-on:listenTo="showDetail"></order>
            </TabPane>
            <TabPane label="短信记录" name="tab5">
                <record v-bind:tabMsg="tabVal" v-bind:selPhone="valueSel"></record>
            </TabPane>
            <TabPane label="支付记录" name="tab6">
                <record v-bind:tabMsg="tabVal" v-bind:selPhone="valueSel"></record>
            </TabPane>
        </Tabs>
    </div>

    <Modal v-model="model5" title="待处理事项" class="noFooter" width="800">
      <div class="table_show">
        <Table border :columns="columns3" :data="data3"></Table>
      </div>
      <div slot="footer"></div>
    </Modal>

    <Modal v-model="model1" title="线下还款" class="payStyle" width="600" @on-ok="payClick">
        <Form :model="formPay" :label-width="70">
            <FormItem label="还款时间">
                <DatePicker format="yyyy-MM-dd" :value="formPay.date"></DatePicker>
            </FormItem>
            <FormItem label="结清处理">
                <Select v-model="formPay.payFinish">
                    <Option value="0">是</Option>
                    <Option value="1">否</Option>
                </Select>
            </FormItem>
            <FormItem label="还款金额">
                <InputNumber v-model="formPay.money" :min="0" class="moneyIpt" placeholder="输入金额"></InputNumber><Icon type="social-yen"></Icon>
            </FormItem>
            <FormItem v-if="formPay.payFinish==0">
                <Checkbox v-model="formPay.changeMn">减免金额：￥<span v-text="formPay.payChange"></span></Checkbox>
            </FormItem>
            <FormItem label="附件">
                <!-- <Upload :on-success="" :format="['jpg','jpeg','png']" :max-size="2048" action=""></Upload> -->
                <Upload ref="upload" :show-upload-list="false" :multiple="true" :action="uploadFile" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="4048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize">
                    <Button type="ghost" icon="plus" style="width:250px;" @click="">添加附件</Button><label style="margin-left:10px;">支持.jpg / .png / .pdf格式</label>
                </Upload>
                <ul class="imgList">
                    <li v-for="(item,i) in formPay.uploadList" :key="i"><span v-text="item.docNm"></span><Button type="text" @click="handleRemove(item)" class="float_right" style="color:#00b06c;">删除</Button></li>
                </ul>
            </FormItem>
        </Form>
    </Modal>

    <Modal v-model="model2" title="线上扣款" :loading="modelLoading" class="payStyle" width="600" @on-ok="onlineRepay">
        <Form :model="formOnlinePay" :label-width="70">
            <FormItem label="还款金额">
                <InputNumber v-model="formOnlinePay.money" :min="0" :step="0.5" class="moneyIpt" placeholder="输入金额"></InputNumber><Icon type="social-yen"></Icon>
            </FormItem>
            <div class="table_show">
                <Row><Col span="12"><h3>还款计划</h3></Col>
                <Col span="12"><div class="float_right"><Button type="text" @click="showDetail({'title':'计划','data':getData},'detail')">查看详情</Button></div></Col></Row>
                <Table border :columns="repayColumns" :data="repayData" ref="repayTb" @on-select="selectChk" @on-select-cancel="selectChkChange"></Table>
            </div>
        </Form>
    </Modal>

    <Modal v-model="model3" title="还款明细" class="noFooter" width="600">
        <div class="table_show">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div slot="footer"></div>
    </Modal>

    <Modal v-model="model4" title="还款计划" class="noFooter" width="1400">
        <div class="table_show">
            <Table border :columns="columns2" :data="data2"></Table>
        </div>
        <div slot="footer"></div>
    </Modal>


  </div>
</template>

<script>
import detail from '../components/userDetail.vue'
import credit from '../components/creditRecord.vue'
import order from '../components/orderRecord.vue'
import record from '../components/otherRecord.vue'
import '../router/dateFormat.js';
import cookie from '../router/cookie.js';
import showData from '../router/csmsData.js';
export default {
    name: 'sections',
    components:{ detail,credit,order,record },
    data () {
        return {
            pageSize:10,
            treatedCount:0,
            showUser:false,
            tabSize:'default',
            tabVal:'tab1',
            loadData:'',
            model1:false,
            model2:false,
            model3:false,
            model4:false,
            model5:false,
            modelLoading:true,
            valueSel:'',
            formSel:{
                input:'18666827541'
            },
            uploadFile:this.$store.getters.uploadFile,
            userInfo:{},
            imgId:'',
            getData:[],
            formPay:{
                date:new Date(),
                money:0,
                payFinish:'1',
                changeMn:false,
                payChange:'100.00',
                uploadList:''
            },
            formOnlinePay:{
                money:0
            },
            selection:[],
            getRepayData:{},
            columns1:[{
                title:'借款编号',
                key:'loanNo'
            },{
                title:'客户姓名',
                key:'acctName'
            },{
                title:'订单状态',
                key:'loanSt'
            },{
                title:'还款时间',
                key:'repTm'
            },{
                title:'还款金额',
                key:'amount'
            }],
            data1:[],
            columns2:[{
                title:'期数',
                key:'planStage',
                width:60
            },{
                title:'应还时间',
                key:'planLtm',
                width:'102'
            },{
                title:'应还总额',
                key:'nYetAmt'
            },{
                title:'应还本金',
                key:'planPrp'
            },{
                title:'应还利息',
                key:'planInt'
            },{
                title:'应还服务费',
                key:'planSfe'
            },{
                title:'应还罚息',
                key:'planPin'
            },{
                title:'应还违约金',
                key:'dfltAmt'
            },{
                title:'实际还款时间',
                key:'realTm',
                width:'102'
            },{
                title:'实际还款总额',
                key:'repayAmt'
            },{
                title:'实还本金',
                key:'repayPrp'
            },{
                title:'实还利息',
                key:'repayInt'
            },{
                title:'实还服务费',
                key:'repaySfe'
            },{
                title:'实还罚息',
                key:'repayPin'
            },{
                title:'实还违约金',
                key:'repayDfltAmt'
            },{
                title:'状态',
                key:'planSt',
                width:62
            },{
                title:'还款',
                key:'clrType',
            }],
            data2:[],
            repayColumns:[
            {
                title:'选择',
                type:'selection',
                width:60,
                align:'center'
            },{
                title:'期数',
                key:'planStage'
            },{
                title:'应还时间',
                key:'planLtm',
                width:'102'
            },{
                title:'应还总额',
                key:'nYetAmt'
            }],
            repayData:[],
            columns3:[{
                title:'借款编号',
                key:'fpdNum'
            },{
                title:'用户账号',
                key:'custMbl'
            },{
                title:'还款金额',
                key:'repAmt'
            },{
                title:'审核人员',
                key:'auditNm'
            },{
                title:'拒绝理由',
                key:'auditDsc'
            },{
                title:'操作',
                key:'action',
                width:100,
                align:'center',
                render:(h,params) => {
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:() => {
                                    this.show(params.row)
                                }
                            }
                        },'重新提交')
                    ]);
                }
            }],
            data3:[]
        }
    },
    created:function(){
        /*this.userInfo=this.$store.getters.userInfo;
        this.loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{}};
        var detail = this.loadData;
        detail.content["operationType"]=3;
        detail.content["auditCutsId"]=1;
        let resultCount=showData.showCount(detail,this);*/

        if($(window).width()<=768){
            this.tabSize='small';
        }
        this.loadTreatedRecord("",1);
        
    },
    computed:{
        styleObject(){
            if($(window).width()>768){
                return {marginTop:this.showUser ? '20px':'100px',
                fontSize:this.showUser ? '16px':'32px',
                textAlign:this.showUser ? 'right':'center',
                marginRight:this.showUser ? '30px':'0px'}
            }else{
                return '';
            }
        },
        styleInput(){
            if($(window).width()>768){
                return {marginTop:this.showUser ? '20px':'0px',
                textAlign:this.showUser ? 'left':'center'}
            }else{
                return '';
            }
        }
    },
    watch: {
    },
    mounted(){
        this.uploadList=this.$refs.upload.fileList;
    },
    methods:{
        /*selUser(){

            let self  = this

            let params = {
                data:{
                  mobile:'15816168188'
                }
            }

            this.axios.post("/manage/custs/info", params,
              {
                  headers:{'Content-Type':'application/json'}
              })
              .then(function(respon){
                  console.log(JSON.stringify(respon))
              })
              .catch(function(resp){
                this.$Message.warning('系统异常');
              });
        },*/
        loadTreatedRecord(phone,status){
            var detail={
              "data": {
                "custMbl": phone,
                "firstResult": 0,
                "maxResults": this.pageSize,
                "status": status
              }
            };
            showData.getTreatedRecordInfo(detail,this);
        },
        getTreatedRecordInfo(result){
            this.treatedCount=result.treatedCount;
            var list=result.treatedList;
            if(list.length>0){
                for(var l in list){
                    var data={};
                    data['fpdNum']=list[l].fpdNum;
                    data['custMbl']=list[l].custMbl;
                    data['repAmt']=list[l].repAmt;
                    data['auditNm']=list[l].auditNm;
                    data['auditDsc']=list[l].auditDsc;
                    this.data3.push(data);
                }
            }
        },
        selUser(){
            if(this.formSel.input!=''){
                this.valueSel=this.formSel.input;
                this.showUser=true;
            }else{
                this.$Message.warning('输入不能为空');
            }
        },
        changeOk(){},
        showDetail(arr,title){
            var t=arr['title'];
            var data=arr['data'];
            this.getData=data;
            var detail={'data':{'flowNo':data.flowNo,'channel':data.channel,'unionId':data.unionId}};
            if(t=='线上' || t=='计划'){
                this.formOnlinePay.money=0;
                this.repayData=[];
                this.data2=[];
                showData.getRepayPlan(detail,this);
            }
            if(t=='线下'){
                showData.getRepayStatusAndClrAmount(detail,this);
                this.model1=true;
            }else if(t=='线上'){
                this.model2=true;
            }else if(t=='明细'){
                this.data1=[];
                showData.getRepayDetail(detail,this);
                this.model3=true;
            }else if(t=='计划'){
                this.model4=true;
            }
        },
        getRepayDetail(list){
            //this.data1=[];
            if(list!=undefined || list.length>0){
                for(var l in list){
                    var d={};
                    d['loanNo']=list[l].loanNo;
                    d['acctName']=list[l].acctName;
                    d['loanSt']=list[l].loanSt;
                    d['repTm']=new Date(list[l].repTm).Format('yyyy-MM-dd HH:mm:ss');
                    d['amount']=list[l].amount/100;
                    this.data1.push(d);
                }
            }
        },
        getRepayPlan(result){
            var list=result.planList;
            if(list!=undefined || list.length>0){
                for(var l in list){
                    var d={};
                    d['planStage']=list[l].planStage;
                    d['planLtm']=new Date(list[l].planLtm).Format('yyyy-MM-dd HH:mm:ss');
                    d['nYetAmt']=list[l].nYetAmt/100;
                    d['planPrp']=list[l].planPrp/100;
                    d['repAmt']=list[l].repAmt/100;
                    d['planInt']=list[l].planInt/100;
                    d['planSfe']=list[l].planSfe/100;
                    d['planPin']=list[l].planPin/100;
                    d['dfltAmt']=list[l].dfltAmt!=null ? list[l].dfltAmt/100:0;
                    if(list[l].realTm!=null){
                        d['realTm']=new Date(list[l].realTm).Format('yyyy-MM-dd HH:mm:ss');
                    }else{
                        d['realTm']='无';
                    }
                    d['repayAmt']=list[l].repayAmt!=null?list[l].repayAmt/100:0;
                    d['repayPrp']=list[l].repayPrp!=null?list[l].repayPrp/100:0;
                    d['repayInt']=list[l].repayInt!=null?list[l].repayInt/100:0;
                    d['repaySfe']=list[l].repaySfe!=null?list[l].repaySfe/100:0;
                    d['repayPin']=list[l].repayPin!=null?list[l].repayPin/100:0;
                    d['repayDfltAmt']=list[l].repayDfltAmt!=null?list[l].repayDfltAmt/100:0;
                    if(list[l].clrType==1){
                        d['planInt']=0;
                        d['planSfe']=0;
                    }
                    if(list[l].nYetAmt==0){
                        d['planSt']='已还款';
                    }else{
                        d['planSt']='未还款';
                    }
                    this.data2.push(d);
                    if(list[l].planSt!=5 &&  list[l].planSt!=6){
                        var repay={};
                        repay['planStage']=list[l].planStage;
                        repay['planLtm']=new Date(list[l].planLtm).Format('yyyy-MM-dd HH:mm:ss');
                        repay['nYetAmt']=list[l].nYetAmt/100;
                        repay['_checked']=false;
                        this.repayData.push(repay);
                    }
                }
            }
        },
        selectChk(sel){
            this.selection=sel;
            this.formOnlinePay.money=0;
            var chk=sel[sel.length-1];
            for(var d in this.repayData){
                if(this.repayData[d].planStage<=chk.planStage){
                    this.repayData[d]['_checked']=true;
                    this.formOnlinePay.money+=this.repayData[d].nYetAmt;
                }else{
                    return false;
                }
            }
        },
        selectChkChange(sel,row){
            this.selection=row;
            var chk=row;
            for(var d in this.repayData){
                if(this.repayData[d]['_checked'] && this.repayData[d].planStage>=chk.planStage){
                    this.repayData[d]['_checked']=false;
                    this.formOnlinePay.money-=this.repayData[d].nYetAmt;
                }/*else{
                    return false;
                }*/
            }
        },
        onlineRepay(){
            if(parseFloat(this.formOnlinePay.money)>0){
                var detail={'data':{'flowNo':this.getData.flowNo,'channel':this.getData.channel,'unionId':this.getData.unionId,amount:this.formOnlinePay.money,stage:this.repayData[0].planStage,operator:1,remark:''}};
                showData.systemWithhold(detail,this);
                this.model2=false;
            }else{
                this.modelLoading=false;
                setTimeout(function(){
                    this.modelLoading=true;
                },500);
                if(parseFloat(this.formOnlinePay.money)<=0){
                    this.$Message.warning('输入金额必须大于0');
                }/*else{
                    this.$Message.warning('请选择还款期数');
                }*/
            }
        },
        handleSuccess(res,file){
            var doc={};
            doc['docId']=res.result.docId;
            doc['docNm']=file.name;
            if(file.name.indexOf('.png')>=0 || file.name.indexOf('.jpg')>=0)
                doc['docType']=1;
            else if(file.name.indexOf('.pdf')>=0)
                doc['docType']=3;
            else
                doc['docType']=2;
            this.formPay.uploadList.push(doc);
        },
        handleRemove(file){
            const fileList=this.$refs.upload.fileList;
            //this.$refs.upload.fileList.splice(fileList.indexOf(file),1);
            this.formPay.uploadList.splice(this.formPay.uploadList.indexOf(file),1);
        },
        handleFormatError(file){
            this.$Notice.warning({
                title:'警告',
                desc:file.name+'上传失败，请重新上传'
            })
        },
        handleMaxSize(file){
            this.$Notice.warning({
                title:'警告',
                desc:file.name+'文件太大了，请上传小于2M的文件'
            })
        },
        payClick(){
            if(this.getRepayData.enableRepay){
                var delAmt=0;
                if(this.formPay.payFinish==0){
                    this.formPay.payChange=this.getRepayData.clrAmount-this.formPay.money;
                    if(this.formPay.changeMn){
                        delAmt=this.formPay.payChange;
                    }
                }
                var docId=this.formPay.uploadList.docId;
                var detail={
                  "data": {
                    "custMbl": this.formSel.input,
                    "custNm": cookie.getCookie('acctName'),
                    "customerNm": this.$store.getters('userInfo').custName,
                    "delAmt": delAmt,
                    "docId": docId,
                    "fpdNum":this.getData.loanNo,
                    "jobNumber": 0,
                    "platNo": this.getRepayData.repLtm,
                    "repAmt": this.formPay.money,
                    "repLtm": this.formPay.date,
                    "settleStatus": this.formPay.payFinish
                  }
                };
                this.saveLineRepRecord(detail,this);
            }
        }
    }
}
</script>
