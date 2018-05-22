<style scoped>
    @import '../css/viewer.min.css'
</style>
<template>
  <div class="sections">
    <div class="demo-tabs-style2">
        <Tabs type="card" class="tabs" v-model="cardType" :size="tabSize">
            <TabPane :label="agentCount" name="tab1">
                <detail ref="tabChild" v-bind:tabMsg="'tab1'" v-bind:userInfo="userInfo" v-on:listenTo="showDetail"></detail>
            </TabPane>
            <TabPane :label="merchantCount" name="tab2">
                <detail ref="tabChild2" v-bind:tabMsg="'tab2'" v-bind:userInfo="userInfo" v-on:listenTo="showDetail"></detail>
            </TabPane>
            <TabPane :label="salesManCount" name="tab3">
                <detail ref="tabChild3" v-bind:tabMsg="'tab3'" v-bind:userInfo="userInfo" v-on:listenTo="showDetail"></detail>
            </TabPane>
            <TabPane :label="clerkCount" name="tab4">
                <detail ref="tabChild4" v-bind:tabMsg="'tab4'" v-bind:userInfo="userInfo" v-on:listenTo="showDetail"></detail>
            </TabPane>
        </Tabs>
    </div>
        
    <Modal v-model="model1" title="详情" class="userInfo noFooter" width="900">
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="100">
                        <FormItem label="代理商名称"><span v-text="agentsDetail.agentName"></span></FormItem>
                        <FormItem label="申请人姓名"><span v-text="agentsDetail.applyName"></span></FormItem>
                        <FormItem label="申请人号码"><span v-text="agentsDetail.applyMobile"></span></FormItem>
                        <FormItem label="法人姓名"><span v-text="agentsDetail.legalName"></span></FormItem>
                        <FormItem label="地址"><span v-text="agentsDetail.address"></span></FormItem>
                        <FormItem label="状态"><span v-text="agentsDetail.auditStatus"></span></FormItem>
                        <FormItem label="申请时间"><span v-text="agentsDetail.applyTm"></span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="100">
                        <FormItem label="联系人姓名"><span v-text="agentsDetail.contactsName"></span></FormItem>
                        <FormItem label="联系人号码"><span v-text="agentsDetail.contactsMobile"></span></FormItem>
                        <FormItem label="营业执照编号"><span v-text="agentsDetail.socialCreditCode"></span></FormItem>
                        <FormItem label="银行卡户名"><span v-text="agentsDetail.bankAccountName"></span></FormItem>
                        <FormItem label="银行类型"><span v-text="agentsDetail.bankType"></span></FormItem>
                        <FormItem label="支行名称"><span v-text="agentsDetail.bankBranch"></span></FormItem>
                        <FormItem label="银行账号"><span v-text="agentsDetail.bankAccountNum"></span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>

        <Row :gutter="16" class="photoShow docs-pictures txt_center" style="margin-bottom:20px;">
            
            <Col :sm="6" :xs="12" v-for="(img,i) in imgList" :key="i">
                <div v-if="imgList.length<=4">
                    <video v-if="img.docType==2" :src="img.imgSrc" controls="controls"></video>
                    <img  v-else :src="img.imgSrc"/>
                    <p v-text="img.docNm"></p>
                </div>
                <div v-else :class="{'hide':i>=4}">
                    <video v-if="img.docType==2" :src="img.imgSrc" controls="controls"></video>
                    <div v-else >
                        <div v-if="i==3">
                            <div class="bd_img">点击查看更多</div>
                            <img :src="img.imgSrc" style='width:100%;opacity:0;' alt=''/>
                            
                        </div>
                        <img  v-else :src="img.imgSrc"/>
                    </div>
                    <p v-if="i==3" text="..."></p>
                    <p v-else v-text="img.docNm"></p>
                </div>
            </Col>
        </Row>
        <!-- <mobileImg v-bind:imgMsg="imgArr"></mobileImg> -->
        <div class="clear"></div>
        <Row class="moneyCt">
            <Col :sm="10" :xs="24">
                <Row>
                    <Col span="8">
                        <div><Button type="success" @click="successShow">通过</Button></div>
                    </Col>
                    <Col span="8">
                        <div><Button type="ghost" @click="fail">拒绝</Button></div>
                    </Col>
                    <Col span="8">
                        <div><Button type="ghost" @click="model1=!model1">取消</Button></div>
                    </Col>
                </Row>
            </Col>
            <Col :sm="14" :xs="0"></Col>
        </Row>
        <div slot="footer"></div>

    </Modal>

    <Modal v-model="model4" title="详情" class="userInfo noFooter" width="900">
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="120">
                        <FormItem label="商户名称"><span v-text="agentsDetail.merchantName"></span></FormItem>
                        <FormItem label="申请人姓名"><span v-text="agentsDetail.applyName"></span></FormItem>
                        <FormItem label="申请人号码"><span v-text="agentsDetail.applyMobile"></span></FormItem>
                        <FormItem label="员工人数"><span v-text="agentsDetail.employeeNum"></span></FormItem>
                        <FormItem label="银行卡户名"><span v-text="agentsDetail.bankAccountName"></span></FormItem>
                        <FormItem label="支行名称"><span v-text="agentsDetail.bankBranch"></span></FormItem>
                        <FormItem label="银行账号"><span v-text="agentsDetail.bankAccountNum"></span></FormItem>
                        <FormItem label="银行账户类型"><span v-text="agentsDetail.bankType"></span></FormItem>
                        <FormItem label="地址"><span v-text="agentsDetail.address"></span></FormItem>
                        <FormItem label="申请时间"><span v-text="agentsDetail.applyTm"></span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="130">
                        <FormItem label="联系人姓名"><span v-text="agentsDetail.contactsName"></span></FormItem>
                        <FormItem label="联系人号码"><span v-text="agentsDetail.contactsMobile"></span></FormItem>
                        <FormItem label="法人姓名"><span v-text="agentsDetail.legalName"></span></FormItem>
                        <FormItem label="营业执照编号"><span v-text="agentsDetail.socialCreditCode"></span></FormItem>
                        <FormItem label="开户银行许可证号"><span></span></FormItem>
                        <FormItem label="组织机构代码"><span></span></FormItem>
                        <FormItem label="税务登记号"><span></span></FormItem>
                        <FormItem label="统一社会代码"><span v-text="agentsDetail.socialCreditCode"></span></FormItem>
                        <FormItem label="机构信用代码"><span></span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>

        <Row :gutter="16" class="photoShow docs-pictures txt_center" style="margin-bottom:20px;">
            <Col :sm="6" :xs="12" v-for="(img,i) in imgList" :key="i">
                <div v-if="imgList.length<=4">
                    <video v-if="img.docType==2" :src="img.imgSrc" controls="controls"></video>
                    <img  v-else :src="img.imgSrc"/>
                    <p v-text="img.docNm"></p>
                </div>
                <div v-else :class="{'hide':i>=4}">
                    <video v-if="img.docType==2" :src="img.imgSrc" controls="controls"></video>
                    <div v-else >
                        <div v-if="i==3">
                            <div class="bd_img">点击查看更多</div>
                            <img :src="img.imgSrc" style='width:100%;opacity:0;' alt=''/>
                            
                        </div>
                        <img  v-else :src="img.imgSrc"/>
                    </div>
                    <p v-if="i==3" text="..."></p>
                    <p v-else v-text="img.docNm"></p>
                </div>
            </Col>
        </Row>
        <!-- <mobileImg v-bind:imgMsg="imgArr"></mobileImg> -->
        <div class="clear"></div>
        <Row class="moneyCt">
            <Col :sm="10" :xs="24">
                <Row>
                    <Col span="8">
                        <div><Button type="success" @click="showBs">通过</Button></div>
                    </Col>
                    <Col span="8">
                        <div><Button type="ghost" @click="fail">拒绝</Button></div>
                    </Col>
                    <Col span="8">
                        <div><Button type="ghost" @click="model4=!model4">取消</Button></div>
                    </Col>
                </Row>
            </Col>
            <Col :sm="14" :xs="0"></Col>
        </Row>
        <div slot="footer"></div>

    </Modal>

    <Modal v-model="model2" title="代理商配置" class="addAgent" width="600" @on-cancel="closeModal('formCount')" @on-ok="successClick('formCount')">
         <Form ref="formCount" :model="formCount" :rules="ruleCount" :label-width="70">
            <FormItem label="等级">
                <Select v-model="formCount.startVal">
                    <Option :value="level" v-for="(level,i) in formCount.level" :key="i">{{level}}</Option>
                </Select>
            </FormItem>
            <FormItem label="担保协议">
                <Select v-model="formCount.or" placeholder="是否签订担保协议">
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                </Select>
            </FormItem>
            <FormItem label="产品配置">
                <Dropdown trigger="click" class="showMn" :visible="orpdt" @on-visible-change="changeAds1">
                    <Button type="ghost" style="width:100%;border:1px solid #dddee1;text-align:left;padding: 6px 8px;">
                        <span v-if="formCount.input.length<=0">点击添加产品</span>
                        <span v-else v-for="(a,index) in formCount.input"><span v-text="a.name"></span><label @click="delAdr1(index)"><Icon type="close" style="margin:0 5px;cursor:pointer;"></Icon></label></span>
                        
                        <Icon type="plus" class="float_right" style="margin-top: 2px;"></Icon>
                    </Button>
                    <DropdownMenu slot="list" style="padding:5px 10px;">
                        <Cascader :data="formCount.productList" @on-change="cascarderShow1"></Cascader>
                        <Button type="primary" class="float_right" style="margin-top:5px;" @click="productClick">确定</Button>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem label="管理区域">
                <Dropdown trigger="click" class="showMn" :visible="orAds" @on-visible-change="changeAds">
                    <Button type="ghost" style="width:100%;border:1px solid #dddee1;text-align:left;padding: 6px 8px;">
                        <span v-if="formCount.addressAll.length<=0">点击添加区域</span>
                        <span v-else v-for="(a,index) in formCount.addressAll" :key="index"><span v-text="a.toString()"></span><label @click="delAdr(index)"><Icon type="close" style="margin:0 5px;cursor:pointer;"></Icon></label></span>
                        
                        <Icon type="plus" class="float_right" style="margin-top: 2px;"></Icon>
                    </Button>
                    <DropdownMenu slot="list" style="padding:5px 10px;">
                        <Cascader :data="addressList" :load-data="addressLoad" change-on-select @on-change="cascarderShow"></Cascader>
                        <Button type="primary" class="float_right" style="margin-top:5px;" @click="areaClick">确定</Button>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem label="起诉地">
                <Cascader :data="addressList" :load-data="addressLoad" :value.sync="formCount.address"></Cascader>
            </FormItem>
            <FormItem prop="desc">
                <Input type="textarea" v-model="formCount.desc" :rows="6" :maxlength="200" placeholder="注意事项" @on-keyup="txtKeyup1('formCount')"></Input>
                <div class="submitDesc"><span v-text="formCount.descCount"></span></div>
            </FormItem>
        </Form>
    </Modal>


    <Modal v-model="model5" title="商户配置" class="addmerchant" width="600" @on-cancel="closeModal('formBs')" @on-ok="merchantClick">
         <Form :model="formBs" ref="formBs" :rules="ruleBs" :label-width="70">
            <FormItem label="产品">
                <Dropdown trigger="click" class="showMn" :visible="vsAds" @on-visible-change="changeAds2">
                    <Button type="ghost" style="width:100%;border:1px solid #dddee1;text-align:left;padding: 6px 8px;">
                        <span v-if="formBs.input.length<=0">点击添加产品</span>
                        <span v-else v-for="(a,index) in formBs.input" :key="index"><span v-text="a.name"></span><label @click="delAdr2(index)"><Icon type="close" style="margin:0 5px;cursor:pointer;"></Icon></label></span>
                        
                        <Icon type="plus" class="float_right" style="margin-top: 2px;"></Icon>
                    </Button>
                    <DropdownMenu slot="list" style="padding:5px 10px;">
                        <Cascader :data="formBs.productList" @on-change="cascarderShow2"></Cascader>
                        <Button type="primary" class="float_right" style="margin-top:5px;" @click="productClick2">确定</Button>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem label="等级">
                <Select v-model="formBs.startVal">
                    <Option :value="level" v-for="(level,i) in formBs.level" :key="i">{{level}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="desc">
                <Input type="textarea" v-model="formBs.desc" :rows="6" :maxlength="200" placeholder="注意事项" @on-keyup="txtKeyup2('formBs')"></Input>
                <div class="submitDesc"><span v-text="formBs.descCount"></span></div>
            </FormItem>
        </Form>
    </Modal>

    <Modal v-model="model6" title="详情" class="userInfo noFooter" width="900">
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form>
                        <FormItem label="业务员/店员姓名"><span v-text="agentsDetail.salesmanName"></span></FormItem>
                        <FormItem label="手机号"><span v-text="agentsDetail.salesmanMobile"></span></FormItem>
                        <FormItem label="身份证号"><span v-text="agentsDetail.applyIdCard"></span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form>

                        <FormItem label="归属"><span v-text="agentsDetail.belong"></span></FormItem>
                        <FormItem label="申请时间"><span v-text="agentsDetail.applyTm"></span></FormItem>
                        <FormItem label="上级审核时间"><span v-text="agentsDetail.superiorAuditTm"></span></FormItem>
                        
                    </Form>
                </div>
            </Col>
        </Row>
        <Row :gutter="16" class="photoShow docs-pictures txt_center" style="margin-bottom:20px;">
            <h3>代理商线下合同</h3>
            
            <Col :sm="6" :xs="12" v-for="(img,i) in imgList" :key="i">
                <div v-if="imgList.length<=4">
                    <video v-if="img.docType==2" :src="img.imgSrc" controls="controls"></video>
                    <img  v-else :src="img.imgSrc"/>
                    <p v-text="img.docNm"></p>
                </div>
                <div v-else :class="{'hide':i>=4}">
                    <video v-if="img.docType==2" :src="img.imgSrc" controls="controls"></video>
                    <div v-else >
                        <div v-if="i==3">
                            <div class="bd_img">点击查看更多</div>
                            <img :src="img.imgSrc" style='width:100%;opacity:0;' alt=''/>
                            
                        </div>
                        <img  v-else :src="img.imgSrc"/>
                    </div>
                    <p v-if="i==3" text="..."></p>
                    <p v-else v-text="img.docNm"></p>
                </div>
            </Col>
        </Row>
        <!-- <mobileImg v-bind:imgMsg="imgArr"></mobileImg> -->
        <div class="clear"></div>
        <Row class="moneyCt">
            <Col :sm="10" :xs="24">
                <Row>
                    <Col span="8">
                        <div><Button type="success" @click="showsmall">通过</Button></div>
                    </Col>
                    <Col span="8">
                        <div><Button type="ghost" @click="fail">拒绝</Button></div>
                    </Col>
                    <Col span="8">
                        <div><Button type="ghost" @click="model6=!model6">取消</Button></div>
                    </Col>
                </Row>
            </Col>
            <Col :sm="14" :xs="0"></Col>
        </Row>
        <div slot="footer"></div>

    </Modal>
    <Modal v-model="model7" title="业务员/店员配置" class=" " width="600" @on-cancel="closeModal('formSm')" @on-ok="salesPersonClick">
         <Form :model="formSm" ref="formSm" :rules="ruleSm" :label-width="70">
            <FormItem label="等级">
                <Select v-model="formSm.startVal">
                    <Option :value="level" v-for="(level,i) in formSm.level" :key="i">{{level}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="desc">
                <Input type="textarea" v-model="formSm.desc" :rows="6" :maxlength="200" placeholder="注意事项" @on-keyup="txtKeyup3('formSm')"></Input>
                <div class="submitDesc"><span v-text="formSm.descCount"></span></div>
            </FormItem>
        </Form>
    </Modal>

    <Modal v-model="model3" title="审核拒绝" class="noFooter noHeight" width="600" @on-cancel="closeModal('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr">
            <FormItem prop="txtFr">
                <Input type="textarea" v-model="formFr.txtFr" :rows="6" :maxlength="200" placeholder="输入审核拒绝的理由" @on-keyup="txtKeyup('formFr')"></Input>
                <div class="submitDesc"><span v-text="formFr.descCount"></span><Button type="success" @click="rejectedClick('formFr')">提交</Button></div>
            </FormItem>
         </Form>
         <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import detail from '../components/agentDetailAdt.vue';
/*import mobileImg from '../components/mobileImgShow.vue'*/

import '../router/jquery-1.11.3.min.js';
import viewer from '../router/viewer.min.js';
import showData from '../router/agentDetail.js';

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
    components:{ detail,viewer },
    data () {
        return {
            tabSize:'default',
            cardType:'tab1',
            closetab:false,
            model1:false,
            model2:false,
            model3:false,
            model4:false,
            model5:false,
            model6:false,
            model7:false,
            vsAds:false,
            orAds:false,
            orpdt:false,
            agentCount:'',
            merchantCount:'',
            salesManCount:'',
            clerkCount:'',
            agentsDetail:{},
            imgList:[],
            loadData:[],
            addressList:[],
            cityLists:[],
            districtLists:[],
            formChange:{name:''},
            formCount:{
                productList:[],
                level:[],
                startVal:'A',
                or:'1',
                input:[],
                product:[],
                addressAll:[],
                area:{},
                address:[],
                desc:'',
                descCount:'',
                descNm:0
            },
            ruleCount:{
                descLength:200,
                desc:[
                    {validator:validateLen,trigger:'blur'}
                ]
            },
            formBs:{
                productList:[],
                level:[],
                input:[],
                product:[],
                startVal:'A',
                desc:'',
                descCount:'',
                descNm:0
            },
            ruleBs:{
                descLength:200,
                desc:[
                    {validator:validateLen,trigger:'blur'}
                ]
            },
            formSm:{
                level:[],
                startVal:'A',
                desc:'',
                descCount:'',
                descNm:0
            },
            ruleSm:{
                descLength:200,
                desc:[
                    {validator:validateLen,trigger:'blur'}
                ]
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
            data: [],
            userInfo:{}
        }
    },
    created:function(){
        this.userInfo=this.$store.getters.userInfo;
        this.loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{}};
        var detail = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"operationType":2,"auditCutsId":this.userInfo.id}};
        let resultCount=showData.showCount(detail,this);
        if($(window).width()<768){
            this.tabSize='small';
        }
    },
    watch: {
        imgList: function(currentValue){
            setTimeout(function(){
                if($('.docs-pictures img:eq(0)').length != 0){
                    $('.docs-pictures').viewer("destroy");
                    $('.docs-pictures').viewer("data-original");
                }
            }.bind(this), 500);
            

        }
    },
    methods:{
        changeOk(){},
        successShow(){
            this.formCount.startVal='A';
            this.formCount.desc='';
            this.formCount.descCount=this.formCount.descNm+'/'+this.ruleCount.descLength;
            this.model2=true;
            this.loadData.content={};
            let levelList=showData.getLevelList(this.loadData, this);
            let productList=showData.showProduct(this);
            let provinceList=showData.showProvince(this.loadData,this);
        },
        txtKeyup1(name){
            var val=this.formCount.desc;
            this.formCount.descNm=val.length;
            this.formCount.descCount=this.formCount.descNm+'/'+this.ruleCount.descLength;
            this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error(valid.message);
                }
            });
        },
        showBs(){
            this.formBs.input=[];
            this.formBs.product=[];
            this.formBs.startVal='A';
            this.formBs.desc='';
            this.formBs.descCount=this.formBs.descNm+'/'+this.ruleBs.descLength;
            this.model5=true;
            this.loadData.content={};
            let levelList=showData.getLevelList(this.loadData, this);
            this.loadData.content['auditFlowNo']=this.agentsDetail.auditFlowNo;
            let productList=showData.getMerchantProductList(this.loadData,this);
        },
        txtKeyup2(name){
            var val=this.formBs.desc;
            this.formBs.descNm=val.length;
            this.formBs.descCount=this.formBs.descNm+'/'+this.ruleBs.descLength;
            this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error(valid.message);
                }
            });
        },
        showsmall(){
            this.formSm.startVal='A';
            this.formSm.desc='';
            this.formSm.descCount=this.formSm.descNm+'/'+this.ruleSm.descLength;
            let levelList=showData.getLevelList(this.loadData, this);
            this.model7=true;
        },
        txtKeyup3(name){
            var val=this.formSm.desc;
            this.formSm.descNm=val.length;
            this.formSm.descCount=this.formSm.descNm+'/'+this.ruleSm.descLength;
            this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error(valid.message);
                }
            });
        },
        fail(){
            this.formFr.txtFr='';
            this.formFr.descNm=0;
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            this.model3=true;
        },
        rejectedClick(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    var desc=this.formFr.txtFr;
                    var id=this.agentsDetail.id;
                    var no=this.agentsDetail.auditFlowNo;
                    var approve={"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"auditCutsId":this.userInfo.id,"auditFlowNo":
                    no,"auditCutsName":"xxx","id":id,"auditMsc":desc,"status":-2}};
                    let result;
                    if(this.cardType=='tab1')
                        result=showData.auditAgent(approve,this);
                    else if(this.cardType=='tab2')
                        result=showData.auditMerchant(approve,this);
                    else if(this.cardType=='tab3')
                        result=showData.auditSalesPerson(approve,this);
                    else if(this.cardType=='tab4')
                        result=showData.auditClerk(approve,this);
                }else{
                    this.$Message.error(valid.message);
                }
            });
        },
        txtKeyup(name){
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
        closeModal(name){
            this.$refs[name].resetFields();
        },
        showDetail(arr){
            if(arr!='' || arr!=undefined){
                this.agentsDetail={};
                this.loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"auditFlowNo":arr.auditFlowNo}};
                let resultdata;
                if(this.cardType=='tab1'){
                    this.loadData.content["agentId"]=arr.id;
                    resultdata = showData.detailAgent(this.loadData, this );
                }else if(this.cardType=='tab2'){
                    this.loadData.content["merchantId"]=arr.id;
                    resultdata = showData.detailMerchant(this.loadData, this );
                }else if(this.cardType=='tab3'){
                    this.loadData.content["salesmanId"]=arr.id;
                    resultdata = showData.detailSalesPerson(this.loadData, this );
                }else if(this.cardType=='tab4'){
                    this.loadData.content["clerkId"]=arr.id;
                    resultdata = showData.detailClerk(this.loadData, this );
                }
            }
        },
        changeAds(visible){
            this.orAds=visible;
        },
        changeAds1(visible){
            this.orpdt=visible;
        },
        changeAds2(visible){
            this.vsAds=visible;
        },
        cascarderShow(val,selData){
            var txt='';
            if(selData.length>0){
                for(var s in selData){
                    txt+=selData[s].label+'/';
                }
                txt=txt.substring(0,txt.length-2);
                this.formCount.area['label']=txt;
                this.formCount.area['value']=val;
            }
        },
        areaClick(){
            if(this.formCount.addressAll.indexOf(this.formCount.area.label)<0){
                this.formCount.addressAll.push(this.formCount.area.label);
                this.orAds=!this.orAds;
            }else{
                this.$Message.warning('所选管理区域不能相同');
            }
        },
        delAdr(index){
            this.formCount.addressAll.splice(index,1);
        },
        cascarderShow1(val,selData){
            if(selData.length>0){
                this.formCount.product=selData;
            }
        },
        productClick(){
            var product=this.formCount.product;
            var input=this.formCount.input;
            var push=true;
            if(product!=null){
                var arr={'id':product[0].value,'name':product[0].label};
                for(var i in input){
                    if(input[i].name==arr.name){
                        push=false;
                        this.$Message.warning('所选产品不能相同');
                        return false;
                    }
                    
                }
                if(push){
                    this.formCount.input.push(arr);
                    this.orpdt=!this.orpdt;
                }
            }
        },
        delAdr1(index){
            this.formCount.input.splice(index,1);
        },
        cascarderShow2(val,selData){
            if(selData.length>0){
                this.formBs.product=selData;
            }
        },
        productClick2(){
            var product=this.formBs.product;
            var input=this.formBs.input;
            var push=true;
            if(product!=null){
                var arr={'id':product[0].value,'name':product[0].label};
                for(var i in input){
                    if(input[i].name==arr.name){
                        push=false;
                        this.$Message.warning('所选产品不能相同');
                        return false;
                    }
                    
                }
                if(push){
                    this.formBs.input.push(arr);
                    this.orpdt=!this.orpdt;
                }
            }
        },
        delAdr2(index){
            this.formBs.input.splice(index,1);
        },
        showResultCount(resultCount){
            var result=resultCount;
            if(result!=null || result!=undefined){
                this.agentCount='代理商('+result.agentCount+')';
                this.merchantCount='商户('+result.merchantCount+')';
                this.salesManCount='业务员('+result.salesManCount+')';
                this.clerkCount='店员('+result.clerkCount+')';
            }
        },
        showresult(resultdata){
            var relive=resultdata.detailedInfo;
            var imgArr=resultdata.docList;
            this.agentsDetail={};

            if(relive != null){
                    
                this.agentsDetail['id']=relive.id;
                this.agentsDetail['auditFlowNo']=relive.auditFlowNo;
                if(this.cardType=='tab1'){
                    this.model1=true;
                    this.agentsDetail['agentName']=relive.agentName;
                    this.agentsDetail['applyName']=relive.applyName;
                    this.agentsDetail['applyMobile']=relive.applyMobile;
                    this.agentsDetail['legalName']=relive.legalName;
                    this.agentsDetail['address']=relive.address;
                    
                    if(relive.auditStatus==0){
                        this.agentsDetail['auditStatus']='待分配';
                    }else if(relive.auditStatus==1){
                        this.agentsDetail['auditStatus']='已分配待审核';
                    }else if(relive.auditStatus==2){
                        this.agentsDetail['auditStatus']='审核通过';
                    }else if(relive.auditStatus==-2){
                        this.agentsDetail['auditStatus']='审核拒绝';
                    }

                    var dates=relive.applyTm;
                    var dateShow=new Date(dates).Format('yyyy-MM-dd HH:mm:ss');
                    this.agentsDetail['applyTm']=dateShow;
                    this.agentsDetail['contactsName']=relive.contactsName;
                    this.agentsDetail['contactsMobile']=relive.contactsMobile;
                    this.agentsDetail['socialCreditCode']=relive.socialCreditCode;
                    this.agentsDetail['bankAccountName']=relive.bankAccountName;
                    if(relive.bankType==1)
                        this.agentsDetail['bankType']='对公账号';
                    else if(relive.bankType==2)
                        this.agentsDetail['bankType']='对私账号';
                    this.agentsDetail['bankBranch']=relive.bankBranch;
                    
                    this.agentsDetail['bankAccountNum']=relive.bankAccountNum;
                    
                }else if(this.cardType=='tab2'){
                    this.model4=true;
                    this.agentsDetail['id']=relive.amiId;
                    this.agentsDetail['merchantName']=relive.merchantName;
                    this.agentsDetail['applyName']=relive.applyName;
                    this.agentsDetail['applyMobile']=relive.applyMobile;
                    this.agentsDetail['employeeNum']=relive.employeeNum;
                    this.agentsDetail['bankAccountName']=relive.bankAccountName;
                    this.agentsDetail['bankBranch']=relive.bankBranch;
                    this.agentsDetail['bankAccountNum']=relive.bankAccountNum;
                    if(relive.bankType==1)
                        this.agentsDetail['bankType']='对公账号';
                    else if(relive.bankType==2)
                        this.agentsDetail['bankType']='对私账号';
                    
                    this.agentsDetail['contactsName']=relive.contactsName;
                    this.agentsDetail['contactsMobile']=relive.contactsMobile;
                    this.agentsDetail['legalName']=relive.legalName;
                    this.agentsDetail['socialCreditCode']=relive.socialCreditCode;
                    this.agentsDetail['address']=relive.address;
                    var dates=relive.applyTm;
                    var dateShow=new Date(dates).Format('yyyy-MM-dd HH:mm:ss');
                    this.agentsDetail['applyTm']=dateShow;
                }else if(this.cardType=='tab3'){
                    this.model6=true;
                    this.agentsDetail['salesmanName']=relive.salesmanName;
                    this.agentsDetail['salesmanMobile']=relive.salesmanMobile;
                }else if(this.cardType=='tab4'){
                    this.model6=true;
                    this.agentsDetail['salesmanName']=relive.clerkName;
                    this.agentsDetail['salesmanMobile']=relive.clerkMobile;
                }


                if(this.cardType=='tab3' || this.cardType=='tab4'){
                    this.agentsDetail['applyIdCard']=relive.applyIdCard;
                    var belong='';
                    if(relive.ascriptionAgentName!=null && relive.ascriptionAgentName!=''){
                        belong=relive.ascriptionAgentName;
                    }
                    if(relive.ascriptionAgencyName!=null && relive.ascriptionAgencyName!=''){
                        belong+=' / '+relive.ascriptionAgencyName;
                    }
                    if(relive.ascriptionSalesmanName!=null && relive.ascriptionSalesmanName!=''){
                        belong+=' / '+relive.ascriptionSalesmanName;
                    }
                    if(relive.merchantName!=null && relive.merchantName!=''){
                        belong+=' / '+relive.merchantName;
                    }
                    this.agentsDetail['belong']=belong;
                    var dates1=relive.applyTm;
                    var dateShow1=new Date(dates1).Format('yyyy-MM-dd HH:mm:ss');
                    this.agentsDetail['applyTm']=dateShow1;
                    var dates2=relive.superiorAuditTm;
                    var dateShow2=new Date(dates2).Format('yyyy-MM-dd HH:mm:ss');
                    this.agentsDetail['superiorAuditTm']=dateShow2;
                }
                this.showImgList(imgArr);
            }else{
                this.$Message.error('此项暂无详情');
            }
        },
        showImgList(imgArr){
            this.imgList=[];
            if(imgArr.length>0 || imgArr!=undefined){
                for(var i=0;i<imgArr.length;i++){
                    this.imgList.push({'docType' : imgArr[i].docType, 'docNm' : imgArr[i].docNm,'imgSrc':'http://localhost:3000/audit/file/esDownDocInfoNew?objId='+imgArr[i].docId});
                }

            }
        },
        showProductRt(productList){
            this.formCount.productList=[];
            this.formBs.productList=[];
            
            if(productList!=null || productList!=undefined){
                if(this.cardType=='tab1'){
                    var list=productList;
                    for(var i=0;i<list.length;i++){
                        var dataPt={};
                        dataPt['value']=list[i].productId;
                        dataPt['label']=list[i].productName;
                        this.formCount.productList.push(dataPt);
                    }
                }else if(this.cardType=='tab2'){
                    var list=productList.productList;
                    for(var i=0;i<list.length;i++){
                        var dataPt={};
                        dataPt['value']=list[i].productId;
                        dataPt['label']=list[i].productName;
                        this.formBs.productList.push(dataPt);
                    }
                }
            }
        },
        showResultProvice(provinceList){
            var provice=provinceList.provinceList;
            if(provice.length>0){
                for(var list in provice){
                    var datalist={'type':'provice','id':provice[list].id,'value':provice[list].pName,'label':provice[list].pName,'children':[],'loading':false};
                    this.addressList.push(datalist);
                }
            }
        },
        addressLoad(item,callback){
            item.loading=true;
            setTimeout(()=>{
                if(item.type=='provice'){
                    var loadCity={"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"provinceId":item.id}};
                    let cityList=showData.showCity(loadCity,this , item, callback);
                }else if(item.type=='city'){
                    var loaddistrict={"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"cityId":item.id}};
                    let districtList=showData.showDistrict(loaddistrict,this, item, callback);
                    
                }
                
            },10)
            
        },
        showCityRt(cityList, item, callback){
            this.cityLists=[];
            var city=cityList.cityList;
            if(city.length>0){
                for(var list in city){
                    var datalist={'type':'city','id':city[list].id,'value':city[list].cName,'label':city[list].cName,'children':[],'loading':false};
                    this.cityLists.push(datalist);
                }
                item.children=this.cityLists;
            }
            item.loading=false;
            callback();
        },
        showDistrictRt(districtList, item, callback){
            this.districtLists=[];
            var district=districtList.districtList;
             if(district.length>0){
                for(var list in district){
                    var datalist={'value':district[list].dName,'label':district[list].dName};
                    this.districtLists.push(datalist);
                }
                item.children=this.districtLists;
            }
            item.loading=false;
            callback();
        },
        successClick(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    var address=this.formCount.addressAll;
                    var addressAll='';
                    for(var a in address){
                        var s=address[a].split('/');
                        addressAll+=s.join(',')+';';
                    }
                    var prose=this.formCount.address.join(',');
                    var approve={"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"auditCutsId":this.userInfo.id,"auditFlowNo":this.agentsDetail.auditFlowNo,"product":this.formCount.input,"auditCutsName":"xxx","manageArea":addressAll,"id":this.agentsDetail.id,"level":this.formCount.startVal,"auditMsc":this.formCount.desc,"isCloude":this.formCount.or,"prosecuteCity":prose,"status":2}};
                    let agentList=showData.auditAgent(approve,this);

                }else{
                    this.$Message.error('验证失败');
                }
            });
        },
        merchantClick(){
            this.$refs['formBs'].validate((valid) => {
                if(valid){
                    var approve={"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"auditCutsId":this.userInfo.id,"auditFlowNo":this.agentsDetail.auditFlowNo,"product":this.formBs.input,"auditCutsName":"xxx","id":this.agentsDetail.id,"level":this.formBs.startVal,"auditMsc":this.formBs.desc,"status":2}};
                    let agentList=showData.auditMerchant(approve,this);

                }else{
                    this.$Message.error('验证失败');
                }
            });
        },
        salesPersonClick(){
            this.$refs['formSm'].validate((valid) => {
                if(valid){
                    var approve={"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"auditCutsId":this.userInfo.id,"auditFlowNo":this.agentsDetail.auditFlowNo,"auditCutsName":this.userInfo.name,"id":this.agentsDetail.id,"level":this.formSm.startVal,"auditMsc":this.formSm.desc,"status":2}};
                    let agentList='';
                    if(this.cardType=='tab3')
                        agentList=showData.auditSalesPerson(approve,this);
                    else if(this.cardType=='tab4')
                        agentList=showData.auditClerk(approve,this);

                }else{
                    this.$Message.error('验证失败');
                }
            });
        },
        showAudit(agentList){
            this.$Message.success('审核成功');
            if(this.cardType=='tab1'){
                this.model1=false;
                this.$refs.tabChild.loadPage();
            }else if(this.cardType=='tab2'){
                this.model4=false;
                this.$refs.tabChild2.loadPage();
            }else if(this.cardType=='tab3'){
                this.model6=false;
                this.$refs.tabChild3.loadPage();
            }else if(this.cardType=='tab4'){
                this.model6=false;
                this.$refs.tabChild4.loadPage();
            }
        },
        getLevel(result){
            var levels=result.levelList;
            var levelArr=[];
            if(levels.length !=null){
                for(var l in levels){
                    levelArr.push(levels[l].level);
                }

                if(this.cardType=='tab1'){
                    this.formCount.level=levelArr;
                }else if(this.cardType=='tab2'){
                    this.formBs.level=levelArr;
                }else{
                    this.formSm.level=levelArr;
                }
            }
        }
    }
}
</script>

