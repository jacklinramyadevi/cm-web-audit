<template>
  <div class="sections">
    <div class="demo-tabs-style2 creditDd">
        <Row>
            <Col :sm="16" :xs="24">
              <Tabs type="card" class="tabs creadTab" :size="tabSize" v-model="tabVal" @on-click="tabShow" :style="{'height':tabHeight+'px'}">
                <TabPane label="基本信息" name="1">
                    <detail v-on:listenTo="showData" v-on:showTm="showUp" v-on:selPhone="showPhone"></detail>
                </TabPane> <!-- v-bind:creditRcd="RcdYes" -->
                <TabPane label="社交圈" name="2">
                    <detailFr v-bind:circle="tabVal"></detailFr>
                </TabPane>
                <TabPane label="个人征信" name="3">
                    <detailCredit v-bind:credit="tabVal"></detailCredit>
                </TabPane>
                <TabPane label="通话记录" name="4">
                    <detailGoodFr v-bind:appCall="tabVal"></detailGoodFr>
                </TabPane>
                <TabPane label="运营商" name="5">
                    <detailAgent v-bind:oper="tabVal"></detailAgent>
                </TabPane>
                <TabPane label="京东淘宝" name="6">
                    <detailTaobao v-bind:shop="tabVal"></detailTaobao>
                </TabPane>
                <TabPane label="网银信息" name="7">
                    <detailNET v-bind:bank="tabVal"></detailNET>
                </TabPane>
                <TabPane label="APP列表" name="8">
                    <detailApp v-bind:app="tabVal"></detailApp>
                </TabPane>
            </Tabs>
            </Col>
            <Col :sm="8" :xs="24" class="creditDetail creditUser" style="padding:0;" :style="{'minHeight':tabHeight+'px'}">

            <div class="goBack">
                <span v-show="RcdYes"><Button type="success" @click="show">回访详情</Button>
                <Button @click="show2">重新审核</Button></span>
                <router-link :to="goBack"><Button>< 返回</Button></router-link>
            </div>
            <h2 class="title">审核信息</h2>
            <div class="creditData">
                <div class="table_show" style="margin:0 14px;" v-show="RcdYes">
                    <table class="headerTb" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
                        <tr>
                            <td class="txt_center">总额度</td><td>￥10000.00</td>
                        </tr>
                        <tr>
                            <td class="txt_center">消费额度</td><td>￥5000.00</td>
                        </tr>
                        <tr>
                            <td class="txt_center">提现额度</td><td>￥5000.00</td>
                        </tr>
                    </table>
                </div>
                <Form :label-width="120" class="bdinfo">
                    <h3>补充资料信息</h3>
                    <FormItem label="角色">
                        <span>{{formRevive.applyRole}}</span>
                    </FormItem>
                    <FormItem label="上传人">
                        <span>{{formRevive.applyNm}}</span>
                    </FormItem>
                    <FormItem label="账号">
                        <span>{{formRevive.applyAcct}}</span>
                    </FormItem>
                    <FormItem label="等级">
                        <span>{{formRevive.applyGrade}}</span>
                    </FormItem>
                    <FormItem label="上传时间">
                        <span>{{formRevive.applyTm}}</span>
                    </FormItem>
                    <FormItem label="设备信息">
                        <span>{{formRevive.deviceType}}</span>
                    </FormItem>
                    <FormItem label="GPRS定位信息">
                        <span>{{formRevive.gpsAddress}}</span><Button type="success" class="float_right" style="margin-top:5px;" size="small" @click="showMap('l-map','河南省新乡市平原路')">查看地图</Button>
                        <div id="l-map" :style="{height:mapHeight+'px',visibility:mapVs}"><div ></div></div>
                    </FormItem>
                    <FormItem label="补充资料">
                        <Button type="success" size="small" @click="modelRevive=!modelRevive">点击查看</Button>
                    </FormItem>
                    <FormItem class="smallLine" label="备注">
                        <span>{{formRevive.remark}}</span>
                    </FormItem>
                    <h3>审核记录</h3>
                    <div v-for="(approve,i) in approveRecord" :key="i">
                        <FormItem label="审批结果">
                            <span>{{approve.approveRlt == 1 ? '通过' : '拒绝'}}</span>
                        </FormItem>
                        <FormItem label="审核人员">
                            <span>{{approve.approveUser}}</span>
                        </FormItem>
                        <FormItem label="审批时间">
                            <span>{{approve.lmfTm}}</span>
                        </FormItem>
                        <FormItem label="审批产品">
                            <span>{{approve.approveProduct}}</span>
                        </FormItem>
                        <FormItem label="审批金额">
                            <span>￥{{approve.approveScore}}</span>
                        </FormItem>
                        <FormItem class="smallLine" label="审批备注信息">
                            <span>{{approve.refuseDescript}}</span>
                        </FormItem>
                    </div>

                    
                    <h3>代理商信息</h3>
                    <FormItem label="账号">
                        <span>{{this.$route.query.agentAcct}}</span>
                    </FormItem>
                    <FormItem label="姓名">
                        <span>{{this.$route.query.agentAcct}}</span>
                    </FormItem>
                    <FormItem label="等级">
                        <span>{{this.$route.query.agentGrade}}</span>
                    </FormItem>
                    <FormItem label="产品配置">
                        <span>{{this.$route.query.agentFpd}}</span>
                    </FormItem>
                    <FormItem label="管理区域">
                        <span>{{this.$route.query.agentArea}}</span>
                    </FormItem>
                    <FormItem label="担保协议">
                        <span>{{this.$route.query.isSigned}}</span>
                    </FormItem>
                </Form>
                
                <div v-show="!RcdYes">
                    <h2>审核</h2>
                    <Form class="bdinfo" ref="formDesc" :model="formDesc" :rules="ruleDesc" style="border:0;">
                        <FormItem prop="desc">
                            <Input type="textarea" v-model="formDesc.desc" :rows="6" :maxlength="200" placeholder="请输入备注信息" @on-keyup="txtKeyup('formDesc')"></Input>
                            <div class="submitDesc"><span v-text="formDesc.descCount"></span></div>
                        </FormItem>
                        <Row :gutter="16" class="opBtn">
                            <Col :sm="5" :xs="5">
                                <Button type="success" @click="successShow('formDesc')">通过</Button>
                            </Col>
                            <Col :sm="5" :xs="5">
                                <Button type="ghost" @click="fail('formDesc')">拒绝</Button>
                            </Col>
                            <Col :sm="5" :xs="5">
                                <Button type="ghost">挂起</Button>
                            </Col>
                            <Col :sm="4" :xs="4">
                                <Button type="ghost" @click="model6=!model6">转接</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </Col>
    </Row>

    </div>


    <Modal v-model="model1" title="提升额度" class="noFooter noHeight" width="900" @on-cancel="handleReset('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr">
            <FormItem prop="phonchk">
                <Row>
                    <Col :sm="11" :xs="24">
                        <Dropdown trigger="custom" class="selNum" :visible="orclick" @on-click="selPhone">
                            <Button type="ghost" style="width:100%;text-align:left;" @click="handleOpen"><span v-text="formFr.phonNum">手动输入</span><Icon type="arrow-down-b ivu-select-arrow"></Icon></Button>
                            <DropdownMenu slot="list">
                                <DropdownItem><Input placeholder="手动输入" v-model="formFr.phonchk" @on-keyup="chkKeyup"></Input></DropdownItem>
                                <DropdownItem v-for="(ph,index) in phone" :name="index"  :key="ph.id">{{ph.contactMbl}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    <Col :sm="11" :xs="24">
                        <Dropdown trigger="custom" class="selNum" :visible="ortype" @on-click="selType">
                            <Button type="ghost" style="width:100%;text-align:left;" @click="handleOpen2"><span v-text="formFr.type">与客户关系</span><Icon type="arrow-down-b ivu-select-arrow"></Icon></Button>
                            <DropdownMenu slot="list">
                                <DropdownItem><Input placeholder="与客户关系" v-model="formFr.typeChk" @on-keyup="chkKeyup2"></Input></DropdownItem>
                                <DropdownItem v-for="(ph,index) in phone" :name="index"  :key="ph.id">{{ph.contactType}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>

                    <Col :sm="2" :xs="24">
                        <Button type="success" class="float_right" @click="call">呼叫</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem prop="txtFr">
                <Input type="textarea" v-model="formFr.txtFr" :rows="6" :maxlength="200" placeholder="输入回访内容" @on-keyup="txtKeyup1('formFr')"></Input>
                <div class="submitDesc"><span v-text="formFr.descCount"></span></div>
            </FormItem>
            <Button type="success" @click="insertVisit">确定</Button>
            <Button @click="handleReset('formFr')">取消</Button>
         </Form>
         <h3 style="line-height:36px;margin-top:20px;">回访记录</h3>
         <Table border :columns="columns1" :data="visitData" height="200"></Table>
         <div slot="footer"></div>
    </Modal>

    <Modal v-model="model2" title="重新审核" class="noFooter noHeight" width="600" @on-cancel="handleReset('formAgain')">
         <Form ref="formAgain" :model="formAgain" :rules="ruleAgain">
            <FormItem prop="desc">
                <Input type="textarea" v-model="formAgain.desc" :rows="6" :maxlength="200" placeholder="输入重新审核的理由" @on-keyup="txtKeyup2('formAgain')"></Input>
                <div class="submitDesc"><span v-text="formAgain.descCount"></span><Button type="success" @click="rexamAudit">提交</Button></div>
            </FormItem>
         </Form>
         <div slot="footer"></div>
    </Modal>
        
    <Modal v-model="model3" title="客户补充详情" class="userInfo noFooter" width="900">
        <Row :gutter="16" class="photoShow docs-pictures txt_center" style="margin-bottom:20px;">
            <Col :sm="6" :xs="12" v-for="(doc,i) in auditDoc" :key="i">
                <img v-if="doc.docType == 1"  :src="doc.docId"/>
                <video v-if="doc.docType == 2" :src="doc.docId"/>
                <p v-text="doc.docNm"></p>
            </Col>
        </Row>
        <div slot="footer"></div>

    </Modal>

    <Modal v-model="modelRevive" title="补充资料详情" class="userInfo noFooter" width="900">
        <Row :gutter="16" class="photoShow docs-pictures txt_center" style="margin-bottom:20px;">
            <Col :sm="6" :xs="12" v-for="(doc,i) in reviveDoc" :key="i">
                <img v-if="doc.docType == 1"  :src="doc.docId"/>
                <video v-if="doc.docType == 2" :src="doc.docId"/>
                <p v-text="doc.docNm"></p>
            </Col>
        </Row>
        <div slot="footer"></div>

    </Modal>

    <Modal v-model="model4" title="选择产品" class="addAgent" width="600" @on-ok="approveMethd">
         <Form :model="formCount" :label-width="70">
            <FormItem label="产品">
                <!--<Select v-model="formCount.person" placeholder="选择产品">
                    <Option value="消费分期">消费分期</Option>
                    <Option value="信美分期">信美分期</Option>
                </Select>-->
                <Input disabled v-model="formCount.person" class="moneyIpt"></Input></Icon>
            </FormItem>
            <FormItem label="额度">
                <Input v-model="formCount.txtMoney" class="moneyIpt" placeholder="输入额度"></Input><Icon type="social-yen"></Icon>
            </FormItem>
        </Form>
    </Modal>

    <Modal v-model="model5" title="审核拒绝" class="addAgent" width="600" @on-ok="approveMethd">
         <Form :model="formBs">
            <Dropdown trigger="click" class="showMn" style="width: 100%">
                <Button type="ghost" style="width:100%;text-align:left;padding: 6px 8px;">
                    <span v-if="formBs.product.length<=0">拒绝原因</span>
                    <span v-else v-for="(a,index) in formBs.product" :key="index"><span v-text="a.toString()" ></span><label @click="delAdr2(index)"><Icon type="close" style="margin:0 5px;cursor:pointer;"></Icon></label></span>
                    
                    <Icon type="plus" class="float_right" style="margin-top: 2px;"></Icon>
                </Button>
                <DropdownMenu slot="list" style="padding:5px 10px;">
                    <Cascader :data="data1" @on-change="cascarderShow2"></Cascader>
                </DropdownMenu>
            </Dropdown>
            <FormItem>
                <CheckboxGroup v-model="formBs.orFalse">
                    <Checkbox label="可疑人员"></Checkbox>
                    <Checkbox label="资料不足"></Checkbox>
                    <Checkbox label="资质不足"></Checkbox>
                </CheckboxGroup>
            </FormItem>
        </Form>
    </Modal>

    <Modal v-model="model6" title="选择接收人员" class="addAgent" width="600">
         <Form :model="formCount">
            <FormItem>
                <Select v-model="formCount.person" placeholder="选择接收人员">
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import detail from '../components/creditUserinfo.vue'
import detailFr from '../components/creditUserFriend.vue'
import detailGoodFr from '../components/creditUserGoodFrd.vue'
import detailCredit from '../components/creditUserData.vue'
import detailAgent from '../components/creditAgentData.vue'
import detailTaobao from '../components/creditTaobaoData.vue'
import detailNET from '../components/creditNETData.vue'
import detailApp from '../components/creditUserApp.vue'
import '../router/jquery-1.11.3.min.js'
import viewer from '../router/viewer.min.js'
import axios from 'axios'
import {formatDate} from  '../router/data.js';

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
    components:{ detail,detailFr,detailGoodFr,detailCredit,detailAgent,detailTaobao,detailNET,detailApp },name: 'sections',
    components:{ detail,detailFr,detailGoodFr,detailCredit,detailAgent,detailTaobao,detailNET,detailApp },
    data () {
        return {
            tabSize:'default',
            tabVal:'1',
            model1:false,
            model2:false,
            model3:false,
            model4:false,
            model5:false,
            model6:false,
            modelRevive:false,
            RcdYes:false,
            orclick:false,
            ortype:false,
			token:'',
            goBack:'/creditAudit',
            approveSts:-1,
            pageReferQuota:'',
            winHeight:0,
            approveRecord:[],
            formRevive:[],
            phone:[],
            tabName:0,
            auditDoc:[],
            reviveDoc:[],
            formBs:{
                product:[],
                orFalse:false
            },
            formCount:{
                product:'',
                txtMoney:''
            },
            formDesc:{
                desc:'',
                descCount:'',
                descNm:0
            },
            ruleDesc:{
                descLength:200,
                desc:[
                    {validator:validateLen,trigger:'blur'}
                ]
            },
            formFr:{
                phonNum:'手动输入',
                phonchk:'',
                type:'与客户关系',
                typeChk:'',
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
            formAgain:{
                desc:'',
                descCount:'',
                descNm:0
            },
            ruleAgain:{
                descLength:200,
                desc:[
                    {validator:validateLen,trigger:'blur'}
                ]
            },
            columns1:[{
                title:'回访人员',
                key:'visitNm'
            },{
                title:'回访时间',
                key:'lmfTm'
            },{
                title:'关系',
                key:'visitType'
            },{
                title:'手机号码',
                key:'visitPhone'
            },{
                title:'回访内容',
                key:'visitContent'
            }],
            visitData:[],
            mapHeight:0,
            mapVs:'hidden',
            tabHeight:'',
            data1:[{
                value:'照片不清晰',
                label:'照片不清晰'
            },{
                value:'资料虚假',
                label:'资料虚假'
            }]
        }
    },
    created:function(){
        if(this.$route.query.type==0){
            this.RcdYes=true;
            this.queryVisitRecord();
        }
        if($(window).width()<768){
            this.tabSize='small';
        }

        this.token = this.$route.query.token;
        this.showHistoryApproveRecord();
        this.showRevive();
        this.queryDocRecord();
    },
    mounted(){
        this.$nextTick(function(){
            $('.docs-pictures').viewer("data-original");
            this.winHeight=$('.creadTab').height()+28;
            this.formDesc.descCount=this.formDesc.descNm+'/'+this.ruleDesc.descLength;

            window.onscroll=function(){
                if(window.innerWidth>=768){
                    var top=document.body.scrollTop;
                    var barTop=$('.demo-tabs-style2 .ivu-tabs-bar').css('top');

                    if(top>60){
                        $('.demo-tabs-style2 .ivu-tabs-bar').css({'position':'fixed','width':'calc(100% - 40px)'});
                        $('.creditDetail h2.title').css({'position':'fixed','top':0,'width':'30%'});
                        //$('.demo-tabs-style2 .ivu-tabs-bar').css();
                    }else{
                        $('.demo-tabs-style2 .ivu-tabs-bar,.creditDetail h2.title').css({'position':'relative','width':''});
                    }
                }
            }
        });
    },
    watch:{
        RcdYes:function(newVal,oldVal){
            if(newVal){
                this.goBack='/creditAuditRcds';
            }
        }
    },
    methods:{
        showMap(id,city){
            var map = new BMap.Map(""+id);
            
            var point = new BMap.Point(116.395645,39.929986);
            map.centerAndZoom(point,11);
            
            this.mapHeight='300';
            this.mapVs='visible';
            var myGeo=new BMap.Geocoder();
            myGeo.getPoint(city,function(point){
                if(point){
                    map.centerAndZoom(point,11);
                    map.addOverlay(new BMap.Marker(point));
                }
            },city);
        },
        changeOk(){},
        successShow(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.model4=!this.model4;
                    this.approveSts=2;
                    this.formCount.txtMoney=this.$route.query.referQuota;
                    this.formCount.person=this.$route.query.approveProduct;
                }else{
                    this.$Message.error('表单验证失败');
                }
            });
           // this.$refs[name].resetFields();
        },
        fail(name){
            //this.$refs[name].resetFields();
            this.model5=!this.model5;
            this.approveSts=-4
        },
        showData(arr){
            if(arr!='' || arr!=undefined){
                this.model3=true;
                if(arr.length>1){
                    console.log(arr)
                }
            }
        },
        showUp(a){
            if(a){
                this.tabsHeight();
            }
        },
        show(){
            this.formFr.descNm=0;
            this.formFr.phonNum='手动输入';
            this.formFr.type='与客户关系';
            this.formFr.phonchk='';
            this.formFr.txtFr='';
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            this.model1=true;
        },
        show2(){
            this.formAgain.desc='';
            this.formAgain.descNm=0;
            this.formAgain.descCount=this.formAgain.descNm+'/'+this.ruleAgain.descLength;
            this.model2=true;
        },
        txtKeyup(name){
            var val=this.formDesc.desc;
            this.formDesc.descNm=val.length;
            this.formDesc.descCount=this.formDesc.descNm+'/'+this.ruleDesc.descLength;
            
            this.$refs[name].validate((valid) => {
                if(valid){
                }else{
                    this.$Message.error(valid.message);
                }
            });
        },
        txtKeyup1(name){
            var val=this.formFr.txtFr;
            this.formFr.descNm=val.length;
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            this.$refs[name].validate((valid) => {
                if(valid){
                }else{
                    this.$Message.error(valid.message);
                }
            });
        },
        txtKeyup2(name){
            var val=this.formAgain.desc;
            this.formAgain.descNm=val.length;
            this.formAgain.descCount=this.formAgain.descNm+'/'+this.ruleAgain.descLength;
            this.$refs[name].validate((valid) => {
                if(valid){
                }else{
                    this.$Message.error(valid.message);
                }
            });
        },
        chkKeyup(){
            this.orclick=true;
            this.formFr.phonNum=this.formFr.phonchk;
            this.formFr.typeChk = '';
        },
        chkKeyup2(){
            this.ortype=true;
            this.formFr.type=this.formFr.typeChk;
        },
        selPhone(index){
            if(index>=0){
                var ph = this.phone;
                var mobl = ph[index];
                if(mobl == null && mobl == undefined) {
                    return false;
                }

                this.formFr.phonNum=mobl.contactMbl;
                this.formFr.typeChk=mobl.contactType;
                this.formFr.type=mobl.contactType;
                this.orclick=false;
            }else{
                return false;
            }
        },
        selType(index){
            if(index>=0){//!='' && index!=undefined
                 var ph = this.phone;
                var mobl = ph[index];
                if(mobl == null && mobl == undefined) {
                    return false;
                }

                this.formFr.typeChk=mobl.contactType;
                this.formFr.type=mobl.contactType;
                this.ortype=false;
            }else{
                return false;
            }
        },
        handleReset(name){
            this.formFr.descNm=0;
            this.formFr.phonNum='手动输入';
            this.formFr.type='与客户关系';
            this.formFr.phonchk='';
            this.formFr.typeChk='';
            this.formFr.txtFr='';
            this.formAgain.desc='';
            this.formAgain.descNm=0;
            this.$refs[name].resetFields();
            this.orclick=false;
            this.ortype=false;
        },
        handleOpen(){
            this.orclick=!this.orclick;
        },
        handleOpen2(){
            this.ortype=!this.ortype;
        },
        call(){
            this.orclick=false;
        },
        tabShow(val){
            this.tabsHeight();
        },
        tabsHeight(){
            /*if(window.innerWidth<768){*/
                var val=this.tabVal-1;
                this.tabHeight=$('.ivu-tabs-content .ivu-tabs-tabpane').eq(val).find('.creditUser').height()+80;
                /*if(this.tabHeight<window.innerHeight){
                    this.tabHeight=window.innerHeight+80;
                }*/
            /*}*/
        },
        cascarderShow(val,selData){
            if(val.length>0)
                this.formCount.product.push(val);
        },
        delAdr(index){
            this.formCount.product.splice(index,1);
        },
        cascarderShow2(val,selData){
            if(val.length>0) {
                this.formBs.product.push(val);
                if(this.formBs.reasonTxt != '' && this.formBs.reasonTxt != undefined) {
                    this.formBs.reasonTxt  = this.formBs.reasonTxt + ',' + val;
                }else {
                    this.formBs.reasonTxt = val;
                }
            }
        },
        delAdr2(index){
            this.formBs.product.splice(index,1);
        },
        showHistoryApproveRecord() {
            var idcard = this.$route.query.idCard;
            var that = this;
			var param = [];

			param.push('"idCard":"' + idcard + '"');
			axios.post('/audit/approve' , `param={${param.join(",")}}`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
                    var result = resp.data.result.approves;
                    if(result != undefined && result != null) {
                        for(var i = 0 ; i < result.length ; i++) {                            
                            that.approveRecord.push({
                                'approveRlt':result[i].approveRlt,
                                'approveUser':result[i].approveUser,
                                'lmfTm': formatDate(new Date(result[i].lmfTm) , 'yyyy-MM-dd hh:mm:ss'),
                                'approveProduct':result[i].approveProduct,
                                'approveScore':result[i].approveScore,
                                'refuseDescript':result[i].remark
                            });
                        }
                    }
                }
            });
        },approveMethd() {
            var that = this;

            var param = [];
            var status = this.approveSts;
            if(status == 2) {
                var txtPrice = this.formCount.txtMoney;
                if(txtPrice == '') { //通过
                    this.$message.error('请填写审核额度');
                    return;
                }
                
                param.push('"approveScore":"' + txtPrice  + '"');
                param.push('"isSend":' + true);
            }else if(status == -4) { //拒绝
                var refuseDescript = that.formBs.orFalse ;
                if(refuseDescript == '') {
                    this.$Message.error('请勾选拒绝描述');
                    return;
                }

                var reason = this.formBs.reasonTxt;
                if(reason == '' || reason == undefined) {
                    this.$Message.error('请选择拒绝原因');
                    return '';
                }

                param.push('"refuseDescript":"' + refuseDescript + '"');
                param.push('"refuseReason":"' + reason + '"');
                param.push('"isSend":' + true);
            }

            //备注
            var remark = this.formDesc.desc;
            if(remark == null || remark == '') {
                this.$Message.error('请填写备注');
                return;
            }

            
            param.push('"remark":"' + remark + '"');
            param.push('"approveRlt":' + status);
            param.push('"name":"' + this.$route.query.name + '"');
            param.push('"idCard":"' + this.$route.query.idCard + '"');
            param.push('"agentAcct":"' + this.$route.query.agentAcct + '"');
            param.push('"agentName":"' + this.$route.query.agentName + '"');
            param.push('"agentGrade":"' + this.$route.query.agentGrade + '"');
            param.push('"agentArea":"' + this.$route.query.agentArea + '"');
            param.push('"agentFpd":"' + this.$route.query.agentFpd + '"');
            param.push('"token":"' + this.$route.query.token + '"');
            param.push('"reliveId":' + this.$route.query.id);
            param.push('"mcNo":"' + this.$route.query.mcNo + '"');
            param.push('"mobileNumber":"' + this.$route.query.mobileNumber + '"');
            param.push('"isBlack":"' + this.$route.query.isBlack + '"');
            param.push('"applyQuota":"' + this.$route.query.applyQuota + '"');
            param.push('"approveProduct":"' + this.$route.query.approveProduct + '"');

            axios.post('/audit/check' , `param={${param.join(",")}}`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
                    that.$router.push({path:that.goBack});
                }
            });
            

        }, clickModul(modul) {
           
        } ,changeCheckBox(val) {
            this.formBs.bsTxt = '';
            this.formBs.bsTxt = val;
        } , showRevive() {
            var that = this;
            var param = [];

            param.push('"token":"' + this.$route.query.token + '"');

            axios.post('/audit/revive' , `param={${param.join(",")}}`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result.revive) {
                    that.formRevive = resp.data.result.revive;
                    var docs = resp.data.result.docs;
                    if(docs != null && docs.length > 0) {
                        var path = '/audit/file/esDownDocInfoNew?objId='
                        for(var i = 0 ; i < docs.length ; i ++) {
                            that.reviveDoc.push({
                                'docType':docs[i].docType,
                                'docId':path + docs[i].docId,
                                'txt':docs[i].remark,
                                'docNm':docs[i].docNm
                            });
                        }
                    }
                }
            });

            if(that.formRevive != null) {
                
            }

        } ,queryVisitRecord() {
            var that = this;

            axios.post('/audit/visit' , `token=${this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result.visit) {
                    var visit = resp.data.result.visit;
                    for(var i = 0 ; i < visit.length ; i++) {
                         that.visitData.push({
                            'visitNm':visit[i].visitNm,
                            'lmfTm': formatDate(new Date(visit[i].crtTm) , 'yyyy-MM-dd hh:mm:ss'),
                            'visitType':visit[i].visitType,
                            'visitPhone':visit[i].visitPhone,
                            'visitContent':visit[i].visitContent
                        });    
                    }
                }
            });
        },
        showPhone(phone){
            this.phone=phone;
            console.log(phone)
        },
        insertVisit(){
            var that = this;
            var phone = that.formFr.phonNum;
            if(phone == null && phone == undefined && phone == ''){
                this.$Message.error('请输入手机号码');
                return;
            }

            var phoneType = that.formFr.typeChk;
            if(phoneType == null && phoneType == undefined && phoneType == ''){
                this.$Message.error('请选择与客户关系');
                return;
            }

            var remark = that.formFr.txtFr;
            if(remark == null && remark == undefined && remark == ''){
                this.$Message.error('请填写备注');
                return;
            }           

            var param = [];
            param.push('"visitPhone":"' + phone + '"');
            param.push('"visitType":"' + phoneType + '"');
            param.push('"visitContent":"' + remark + '"');
            param.push('"token":"' + this.$route.query.token + '"');

            if(that.visitData.length > 0) {
                param.push('"isVisit":1');
            }else {
                param.push('"isVisit":0');
            }


            axios.post('/audit/add/visit' , `param={${param.join(",")}}`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result && resp.data.result > 0) {
                    that.visitData.push({
                        'visitNm':'',
                        'lmfTm': formatDate(new Date() , 'yyyy-MM-dd hh:mm:ss'),
                        'visitType':phoneType,
                        'visitPhone':phone,
                        'visitContent':remark
                    });                    
                }
            });

        },
        rexamAudit(){
            var that = this;
            var reason = that.formAgain.desc;           
            if(reason == null || reason == '' || reason == undefined) {
                that.$Message.error('请输入重审原因');
                return;
            }

            var param = [];
            param.push('"examCause":"' + reason + '"');
            param.push('"token":"' + this.$route.query.token + '"');
            param.push('"staffUser":0');

            axios.post('/audit/rexam' , `param={${param.join(",")}}`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
                    that.$router.push({path:that.goBack});       
                }
            });
        },
        queryDocRecord() {
            var that = this;
            var param = [];
            
            param.push('"token":"' + this.$route.query.token + '"');
            param.push('"joinId":' + this.$route.query.id);

            axios.post('/audit/doc' , `param={${param.join(",")}}`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
                    var docs = resp.data.result.docs;
                    if(docs != null && docs.length >0) {
                        var path = '/audit/file/esDownDocInfoNew?objId='
                        for(var i = 0 ; i < docs.length ; i++) {
                            that.auditDoc.push({
                                'docType':docs[i].docType,
                                'docId':path + docs[i].docId,
                                'txt':docs[i].remark,
                                'docNm':docs[i].docNm
                            });
                        }
                    } 
                }
            });
        }

    }
}
</script>
