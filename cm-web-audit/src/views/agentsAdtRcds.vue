<style scoped>
    @import '../css/viewer.min.css'
</style>
<template>
  <div class="sections">
      <div class="demo-tabs-style2">
          <Tabs type="card" class="tabs" :size="tabSize" v-model="tabVal">
            <TabPane :label="agentCount" name="tab1">
                <detail v-bind:tabMsg="'tab1'" v-bind:userInfo="userInfo" v-on:listenTo="showDetail"></detail>
            </TabPane>
            <TabPane :label="merchantCount" name="tab2">
                <detail v-bind:tabMsg="'tab2'" v-bind:userInfo="userInfo" v-on:listenTo="showDetail"></detail>
            </TabPane>
            <TabPane :label="salesManCount" name="tab3">
                <detail v-bind:tabMsg="'tab3'" v-bind:userInfo="userInfo" v-on:listenTo="showDetail"></detail>
            </TabPane>
            <TabPane :label="clerkCount" name="tab4">
                <detail v-bind:tabMsg="'tab4'" v-bind:userInfo="userInfo" v-on:listenTo="showDetail"></detail>
            </TabPane>
        </Tabs>
    </div>
        
    <Modal v-model="model1" title="代理商详情" class="userInfo noFooter agentsDetail" width="900">
    <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="审核人员"><span v-text="agentsDetail.auditCutsName"></span></FormItem>
                        <FormItem label="审核状态"><span v-html="agentsDetail.auditStatus"></span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="审核时间"><span v-text="agentsDetail.lmtTm"></span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="代理商名称"><span v-text="agentsDetail.agentName"></span></FormItem>
                        <FormItem label="申请人姓名"><span v-text="agentsDetail.applyName"></span></FormItem>
                        <FormItem label="申请人号码"><span v-text="agentsDetail.applyMobile"></span></FormItem>
                        <FormItem label="法人姓名"><span v-text="agentsDetail.legalName"></span></FormItem>
                        <FormItem label="联系人姓名"><span v-text="agentsDetail.contactsName"></span></FormItem>
                        <FormItem label="联系人号码"><span v-text="agentsDetail.contactsMobile"></span></FormItem>
                         <FormItem label="地址"><span v-text="agentsDetail.address"></span></FormItem>
                        <FormItem label="状态"><span v-text="agentsDetail.auditStatus"></span></FormItem>
                        <FormItem label="申请时间"><span v-text="agentsDetail.applyTm"></span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="营业执照编号"><span v-text="agentsDetail.socialCreditCode"></span></FormItem>
                        <FormItem label="收益比例"><span v-text="agentsDetail.income"></span></FormItem>
                        <FormItem label="收益期限"><span v-text="agentsDetail.income"></span></FormItem>
                        <FormItem label="每期收益比例"><span v-text="agentsDetail.income"></span></FormItem>
                        <FormItem label="银行卡户名"><span v-text="agentsDetail.bankAccountName"></span></FormItem>
                        <FormItem label="银行类型"><span v-text="agentsDetail.bankType"></span></FormItem>
                        <FormItem label="支行名称"><span v-text="agentsDetail.bankBranch"></span></FormItem>
                        <FormItem label="银行账号"><span v-text="agentsDetail.bankAccountNum"></span></FormItem>
                        <FormItem label="等级"><span v-text="agentsDetail.level"></span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>
        <Row :gutter="16" class="photoShow docs-pictures txt_center" style="margin-bottom:20px;">
            
            <Col :sm="6" :xs="12" v-for="(img,i) in imgList" :key="i">
                <div v-if="imgList.length<=4">
                    <video v-if="img.docType==2" :src="img.imgSrc" controls="controls"></video>
                    <img v-else :src="img.imgSrc"/>
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
        <div slot="footer"></div>
    </Modal>

    <Modal v-model="model2" title="商户详情" class="userInfo noFooter agentsDetail" width="900">

        <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="审核人员"><span v-text="agentsDetail.auditCutsName"></span></FormItem>
                        <FormItem label="审核状态"><span v-html="agentsDetail.auditStatus"></span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="审核时间"><span v-text="agentsDetail.lmtTm"></span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="商户名称"><span v-text="agentsDetail.merchantName"></span></FormItem>
                        <FormItem label="申请人姓名"><span v-text="agentsDetail.applyName"></span></FormItem>
                        <FormItem label="申请人号码"><span v-text="agentsDetail.applyMobile"></span></FormItem>
                        <FormItem label="员工人数"><span v-text="agentsDetail.employeeNum"></span></FormItem>
                        <FormItem label="联系人姓名"><span v-text="agentsDetail.contactsName"></span></FormItem>
                        <FormItem label="联系人号码"><span v-text="agentsDetail.contactsMobile"></span></FormItem>
                        <FormItem label="申请时间"><span v-text="agentsDetail.applyTm"></span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="法人姓名"><span v-text="agentsDetail.legalName"></span></FormItem>
                        <FormItem label="营业执照编号"><span v-text="agentsDetail.socialCreditCode"></span></FormItem><FormItem label="银行卡户名"><span v-text="agentsDetail.bankAccountName"></span></FormItem>
                        <FormItem label="支行名称"><span v-text="agentsDetail.bankBranch"></span></FormItem>
                        <FormItem label="银行账号"><span v-text="agentsDetail.bankAccountNum"></span></FormItem>
                        <FormItem label="银行类型"><span v-text="agentsDetail.bankType"></span></FormItem>
                        <FormItem label="地址"><span v-text="agentsDetail.address"></span></FormItem>
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
        <div slot="footer"></div>

    </Modal>

    <Modal v-model="model3" title="业务员详情" class="userInfo noFooter agentsDetail" width="900">
    <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="120">
                        <FormItem label="审核人员"><span v-text="agentsDetail.auditCutsName"></span></FormItem>
                        <FormItem label="审核状态"><span v-html="agentsDetail.auditStatus"></span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="120">
                        <FormItem label="审核时间"><span v-text="agentsDetail.lmtTm"></span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="120">
                        <FormItem label="业务员/店员姓名"><span v-text="agentsDetail.salesmanName"></span></FormItem>
                        <FormItem label="手机号"><span v-text="agentsDetail.salesmanMobile"></span></FormItem>
                        <FormItem label="身份证号"><span v-text="agentsDetail.applyIdCard"></span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="120">
                        <FormItem label="归属"><span v-text="agentsDetail.belong"></span></FormItem>
                        <FormItem label="申请时间"><span v-text="agentsDetail.applyTm"></span></FormItem>
                        <FormItem label="上级审核时间"><span v-text="agentsDetail.superiorAuditTm"></span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>
        <Row :gutter="16" class="photoShow docs-pictures txt_center">
            <h3>合同协议</h3>
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
        <div slot="footer"></div>

    </Modal>
  </div>
</template>

<script>
import detail from '../components/agentAdtDetails.vue'
import showData from '../router/agentDetail.js';
import viewer from '../router/viewer.min.js'

export default {
    name: 'sections',
    components:{ detail,viewer },
    data () {
        return {
            tabSize:'default',
            tabVal:'tab1',
            loadData:'',
            agentCount:'',
            merchantCount:'',
            salesManCount:'',
            clerkCount:'',
            closetab:false,
            model1:false,
            model2:false,
            model3:false,
            agentsDetail:{},
            imgList:[],
            startVal:'A',
            formChange:{name:''},
            userInfo:{}
        }
    },
    created:function(){
        this.userInfo=this.$store.getters.userInfo;
        this.loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{}};
        var detail = this.loadData;
        detail.content["operationType"]=3;
        detail.content["auditCutsId"]=1;
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
        showDetail(arr){
            if(arr!=null || arr!=undefined){
                this.agentsDetail={};
                let loadData = this.loadData;
                loadData.content["auditFlowNo"]=arr.auditFlowNo;
                let resultdata;
                if(this.tabVal=='tab1'){
                    loadData.content["agentId"]=arr.id;
                    resultdata = showData.detailAgent(loadData, this );
                }else if(this.tabVal=='tab2'){
                    loadData.content["merchantId"]=arr.id;
                    resultdata = showData.detailMerchant(loadData, this );
                }else if(this.tabVal=='tab3'){
                    loadData.content["salesmanId"]=arr.id;
                    resultdata = showData.detailSalesPerson(loadData, this );
                }else if(this.tabVal=='tab4'){
                    loadData.content["clerkId"]=arr.id;
                    resultdata = showData.detailClerk(loadData, this );
                }
            }
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
                    
                this.agentsDetail=relive;

                var dates2=relive.lmtTm;
                var dateShow2=new Date(dates2).Format('yyyy-MM-dd HH:mm:ss');
                this.agentsDetail['lmtTm']=dateShow2;
                if(this.tabVal=='tab1'){
                    this.model1=true;
                    
                    if(relive.auditStatus==0){
                        this.agentsDetail['auditStatus']='待分配';
                    }else if(relive.auditStatus==1){
                        this.agentsDetail['auditStatus']='已分配待审核';
                    }else if(relive.auditStatus==2){
                        this.agentsDetail['auditStatus']='审核通过';
                    }else if(relive.auditStatus==-2){
                        this.agentsDetail['auditStatus']='审核拒绝<span class="colorRed">'+relive.auditMsc+'</span>';
                    }

                    var dates=relive.applyTm;
                    var dateShow=new Date(dates).Format('yyyy-MM-dd HH:mm:ss');
                    this.agentsDetail['applyTm']=dateShow;
                    if(relive.bankType==1)
                        this.agentsDetail['bankType']='对公账号';
                    else if(relive.bankType==2)
                        this.agentsDetail['bankType']='对私账号';
                    
                }else if(this.tabVal=='tab2'){
                    this.model2=true;
                    this.agentsDetail['id']=relive.amiId;
                    if(relive.bankType==1)
                        this.agentsDetail['bankType']='对公账号';
                    else if(relive.bankType==2)
                        this.agentsDetail['bankType']='对私账号';

                    this.agentsDetail['address']=relive.address;
                    var dates=relive.applyTm;
                    var dateShow=new Date(dates).Format('yyyy-MM-dd HH:mm:ss');
                    this.agentsDetail['applyTm']=dateShow;
                }else if(this.tabVal=='tab3'){
                    this.model3=true;
                }else if(this.tabVal=='tab4'){
                    this.model3=true;
                    this.agentsDetail['salesmanName']=relive.clerkName;
                    this.agentsDetail['salesmanMobile']=relive.clerkMobile;
                    var dates2=relive.superiorAuditTm;
                    var dateShow2=new Date(dates2).Format('yyyy-MM-dd HH:mm:ss');
                    this.agentsDetail['lmtTm']=dateShow2;
                }


                if(this.tabVal=='tab3' || this.tabVal=='tab4'){
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
                }
                this.showImgList(imgArr);
            }else{
                this.$Message.error('此项暂无详情');
            }
        },
        showImgList(imgArr){
            console.log('imgArr')
            console.log(imgArr)
            this.imgList=[];
            if(imgArr.length>0){
                for(var i=0;i<imgArr.length;i++){
                    this.imgList.push({'docType' : imgArr[i].docType, 'docNm' : imgArr[i].docNm,'imgSrc':'http://localhost:3000/audit/file/esDownDocInfoNew?objId='+imgArr[i].docId});
                }
                console.log('this.imgList')
                console.log(this.imgList)
            }
        },
    }
}
</script>
