
<template>
  <div class="sections">
    <div class="demo-tabs-style2">
        <Tabs type="card" class="tabs" v-model="cardType" :size="tabSize">
            <TabPane :label="agentCount" name="tab1">
                <detail ref="tabChild"  v-bind:tabMsg="'tab1'" v-bind:userInfo="userInfo" v-on:listenTo="showData"></detail>
            </TabPane>
            <TabPane :label="merchantCount" name="tab2">
                <detail ref="tabChild2"  v-bind:tabMsg="'tab2'" v-bind:userInfo="userInfo" v-on:listenTo="showData"></detail>
            </TabPane>
            <TabPane :label="salesManCount" name="tab3">
                <detail ref="tabChild3"  v-bind:tabMsg="'tab3'" v-bind:userInfo="userInfo" v-on:listenTo="showData"></detail>
            </TabPane>
            <TabPane :label="clerkCount" name="tab4">
                <detail ref="tabChild4"  v-bind:tabMsg="'tab4'" v-bind:userInfo="userInfo" v-on:listenTo="showData"></detail>
            </TabPane>
        </Tabs>
    </div>

    <Modal v-model="model2" title="代理商配置" class="addAgent" width="600" @on-cancel="closeModal('formCount')" @on-ok="successClick('formCount')">
         <Form :model="formCount" ref="formCount" :rules="ruleCount" :label-width="70">
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
                        <div>
                        <span v-if="formCount.input.length<=0">点击添加产品</span>
                        <span style="float:left;" v-else v-for="(a,index) in formCount.input" :key="index"><span v-text="a.name"></span><label @click="delAdr1(index)"><Icon type="close" style="margin:0 5px;cursor:pointer;"></Icon></label></span>

                        <Icon type="plus" class="float_right" style="margin-top: 2px;"></Icon>
                        </div>
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
                        <div>
                        <span v-if="formCount.addressAll.length<=0">点击添加区域</span>
                        <span style="float:left;" v-else v-for="(a,index) in formCount.addressAll" :key="index">
                            <span  v-text="a.toString()"></span>
                            <label @click="delAdr(index)"><Icon type="close" style="margin:0 5px;cursor:pointer;"></Icon></label>
                        </span>
                        <Icon type="plus" class="float_right" style="margin-top: 2px;"></Icon>
                        </div>
                        
                    </Button>
                    <DropdownMenu slot="list" style="padding:5px 10px;">
                        <Cascader :data="addressList" :load-data="addressLoad" change-on-select @on-change="cascarderShow"></Cascader>
                        <Button type="primary" class="float_right" style="margin-top:5px;" @click="cascarOk">确定</Button>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem label="起诉地">
                <Cascader :data="addressList" :load-data="addressLoad" v-model="formCount.address"></Cascader>
            </FormItem>
            <FormItem prop="desc">
                <Input type="textarea" v-model="formCount.desc" :rows="6" :maxlength="200" placeholder="注意事项" @on-keyup="txtKeyup1('formCount')"></Input>
                <div class="submitDesc"><span v-text="formCount.descCount"></span></div>
            </FormItem>
        </Form>
    </Modal>


    <Modal v-model="model5" title="商户配置" class="addAgent" width="600" @on-cancel="closeModal('formBs')"  @on-ok="merchantClick">
         <Form :model="formBs" ref="formBs" :rules="ruleBs" :label-width="70">
            <FormItem label="产品">

                <Dropdown trigger="click" class="showMn" :visible="vsAds" @on-visible-change="changeAds2">
                    <Button type="ghost" style="width:100%;border:1px solid #dddee1;text-align:left;padding: 6px 8px;">
                        <div>
                        <span v-if="formBs.input.length<=0">点击添加产品</span>
                        <span style="float:left;"  v-else v-for="(a,index) in formBs.input" :key="index"><span v-text="a.name"></span><label
                                @click="delAdr2(index)"><Icon type="close" style="margin:0 5px;cursor:pointer;"></Icon></label></span>

                        <Icon type="plus" class="float_right" style="margin-top: 2px;"></Icon>
                        </div>
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

    <Modal v-model="model7" title="业务员/店员配置" class=" " width="600"  @on-ok="salesPersonAndCleckClick">
         <Form :model="formSm" ref="formSm" :label-width="70">
            <FormItem label="等级">
                <Select v-model="formSm.startVal">
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>

    <Modal v-model="model8" title="商品信息" class="noFooter" width="600">
         <Row><Upload class="float_right" ref="excelUpload" :format="['xls', 'xlsx']" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" action="/audit/merchant/importMerchantGoods"><Button type="success">导入商品</Button></Upload></Row>
         <div class="table_show">
            <Table border :columns="cloumns2" :data="data2"></Table>
         </div>
         <div slot="footer"></div>
    </Modal>

    <Modal v-model="model9" width="360">
        <div style="text-align:center;margin-top:20px;">
            <p>确定要删除该商品？</p>
        </div>
            <Row :gutter="16" slot="footer"><Col span="12"><Button type="ghost" long @click="model3=!model3">取消</Button></Col>
            <Col span="12"><Button type="success" @click="del(delIndex)" long>确定</Button></Col>
            </Row>
    </Modal>

    <Modal v-model="model10" title="修改商品" class=" " width="600"  @on-ok="updGood">
         <Form :model="formPd" ref="formPd" :label-width="70">
            <FormItem label="商品名称">
                <Input v-model="formPd.goodsName" placeholder="输入商品名称"></Input>
            </FormItem>
            <FormItem label="商品价格">
                <Input v-model="formPd.goodsPrice" placeholder="输入商品价格" class="moneyIpt"></Input><Icon type="social-yen"></Icon>
            </FormItem>
            <FormItem label="商品图片">
            <!-- <div class="demo-upload-list" v-for="item in formPd.uploadList">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="formPd.defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="camera" size="20"></Icon>
                    </div>
                </Upload> -->
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import detail from '../components/agentDetailAllocate.vue';

import '../router/jquery-1.11.3.min.js';
import showDetail from '../router/agentDetail.js';


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
    components:{ detail },
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
            model8:false,
            model9:false,
            model10:false,
            delIndex:0,
            vsAds:false,
            orAds:false,
            orpdt:false,
            agentCount:'',
            merchantCount:'',
            salesManCount:'',
            clerkCount:'',
            selectedObject:{},
            loadData:[],
            goodFile:null,
            loadingStatus:false,
            cloumns2:[{
                title:'商品名称',
                key:'product'
            },{
                title:'价格',
                key:'price'
            },{
                title:'操作',
                key:'action',
                width:100,
                align:'center',
                render:(h,params)=>{
                    return h('div',[
                        h('a',{
                            on:{
                                click:() =>{
                                    this.upd(params.index);
                                }
                            }
                        },'修改'),
                        h('a',{
                            style:{
                                'marginLeft':'5px'
                            },
                            on:{
                                click:() =>{
                                    this.delIndex=params.index;
                                    this.model9=true;
                                }
                            }
                        },'删除')
                    ])
                }
            }],
            data2:[],
            goodFlowNo:'',
            formPd:{
                id:0,
                goodsName:'',
                goodsPrice:'',
                goodsPic:''
            },
            addressList:[],
            cityLists:[],
            districtLists:[],
            formChange:{name:''},
            formCount:{
                level:[],
                startVal:'A',
                or:'0',
                product:[],
                productList:[],
                input:[],
                adr:[],
                area:{},
                addressAll:[],
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
                product:[],
                productList:[],
                input:[],
                level:[],
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
            },
            dataMerchant1: [],
            userInfo:{}
        }
    },
    created:function(){
        this.userInfo=this.$store.getters.userInfo;
        var detail = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"firstResult":0,"maxResults":10,"operationType":4}};
        let resultCount=showDetail.showCount(detail,this);
        if($(window).width()<768){
            this.tabSize='small';
        }
    },
    methods:{
        changeOk(){},
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
        showData(arr){
            if(arr!='' || arr!=undefined){
                var index;
                this.loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{}};
                if(this.cardType=='tab1'){
                    this.formCount.startVal='A';
                    this.formCount.desc='';
                    this.formCount.descCount=this.formCount.descNm+'/'+this.ruleCount.descLength;
                    index=arr;
                    this.loadData.content["agentId"]=arr[0].id;
                    this.selectedObject = arr[0]

                    var approve={
                        "custId":this.userInfo.id ,
                        "custName":this.userInfo.name ,
                        "content":
                            {
                                "auditFlowNo":this.selectedObject.auditFlowNo
                            }
                    };
                    let agentList = showDetail.getAuditAgentProduct(approve,this);
                    let provinceList = showDetail.showProvince(this.loadData,this);
                    this.model2=true;
                }else if(this.cardType=='tab2'){
                    if(arr.length>=1){
                        if(arr[1]=='info'){
                            this.goodFlowNo=arr[0].auditFlowNo;
                            this.showGoods();
                            this.model8=true;
                        }else{
                            this.formBs.product=[];
                            this.formBs.startVal='A';
                            this.formBs.desc='';
                            this.formBs.descCount=this.formBs.descNm+'/'+this.ruleBs.descLength;
                            index=arr;
                            this.selectedObject = arr[0]
                            var approve={
                                "custId":this.userInfo.id ,
                                "custName":this.userInfo.name ,
                                "content":
                                    {
                                        "auditFlowNo":this.selectedObject.auditFlowNo
                                    }
                            };
                            let MerchantList = showDetail.getMerchantProduct(approve,this);
                        }
                    }
                }
                else if(this.cardType=='tab3'){
                    this.formSm.startVal='A';
                    index=arr;
                    this.selectedObject = arr[0]
                    var approve={
                        "custId":this.userInfo.id ,
                        "custName":this.userInfo.name ,
                        "content":
                            {
                                "auditFlowNo":this.selectedObject.auditFlowNo
                            }
                    };
                    let SalesMan = showDetail.getAuditSalesMan(approve,this);
                    this.model7=true;
                }
                else if(this.cardType=='tab4'){
                    this.formSm.startVal='A';
                    index=arr;
                    this.selectedObject = arr[0]
                    var approve={
                        "custId":this.userInfo.id ,
                        "custName":this.userInfo.name ,
                        "content":
                            {
                                "auditFlowNo":this.selectedObject.auditFlowNo
                            }
                    };
                    let SalesMan = showDetail.getAuditClerk(approve,this);
                    this.model7=true;
                }
            }
        },
        showGoods(){
            var loadGood={
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":
                    {
                        "auditFlowNo":this.goodFlowNo
                    }
            };
            let GoodList = showDetail.getGoodList(loadGood,this);
        },
        getGood(result){
            this.data2=[];
            var list=result.goodsList;
            if(list!=null){
                for(var i in list){
                    this.data2.push({'id':list[i].id,'product':list[i].goodsName,'price':list[i].goodsPrice/100});
                }
            }
        },
        closeModal(name){
            this.$refs[name].resetFields();
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
        cascarOk(){
            if(this.formCount.addressAll.indexOf(this.formCount.area.label)<0){
                this.formCount.addressAll.push(this.formCount.area.label);
                this.orAds=!this.orAds;
            }else{
                this.$Message.warning('所选管理区域不能相同');
            }
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
        delAdr(index){
            this.formCount.addressAll.splice(index,1);
        },
        cascarderShow1(val,selData){
            var input=this.formCount.input;
            var push=true;
            if(selData.length>0){
                this.formCount.product=selData;
            }
        },
        cascarderShow1(val,selData){
            if(selData.length>0){
                this.formCount.product=selData;
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
        upd(index){
            var loadDetail={
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":
                    {
                        "merchantGoodsId":this.data2[index].id
                    }
            };
            this.formPd.id=this.data2[index].id;
            let showGood=showDetail.showGoodList(loadDetail, this);
        },
        del(index){
            var loadDetail={
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":
                    {
                        "id":this.data2[index].id
                    }
            };
            let delGood=showDetail.delGoodList(loadDetail, this);
        },
        updGood(){
            this.formPd.goodsPrice=this.formPd.goodsPrice*100;
            var loadDetail={
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":this.formPd
            };
            let updGood=showDetail.updGoodList(loadDetail, this);
        },
        showGoodInfo(result){
            var goodsInfo=result.goodsInfo;
            this.model10=true;
            if(goodsInfo!=null || goodsInfo!=undefined){
                this.formPd=goodsInfo;
                this.formPd.goodsPrice=goodsInfo.goodsPrice/100;
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
        getAuditAgent(result){
            this.formCount.startVal='';
            //this.formCount.or=0;
            this.formCount.desc='';
            this.formCount.input=[];
            this.formCount.addressAll=[];
            this.formCount.address=[];
            var level=result.levelList;
            for(var i=0;i<level.length;i++){
                this.formCount.level.push(level[i].level);
            }
            var products=result.productList;
            for(var p in products){
                this.formCount.productList.push({'value':products[p].productId,'label':products[p].productName});
            }
            var agents = result.agentList;
            var firstId=[];
            var firstManageArea=[];
            if(agents!=null){
                for(var a=0; a<agents.length; a++){
                    
                    if(a==0){
                        firstId.push(agents[a].productId);
                        this.formCount.startVal=agents[a].level;
                        this.formCount.or= (agents[a].isCloude).toString();
                        this.formCount.desc=agents[a].remark;
                        this.formCount.input.push({'id':agents[a].productId,'name':agents[a].productName});
                        var manageAreaArr=agents[a].manageArea;
                        if(manageAreaArr!=null){
                            firstManageArea.push(manageAreaArr);
                            var address=manageAreaArr.split(',');
                            this.formCount.addressAll.push(address.join('/'));
                        }
                        var proseCity=agents[a].prosecuteCity;
                        if( proseCity!= null)
                            this.formCount.address=proseCity.split(',');
                        else{
                            this.formCount.address='';
                        }


                    }else{
                        var manageAreaArr=agents[a].manageArea;
                        if(manageAreaArr!=null){
                            if(firstManageArea.indexOf(manageAreaArr)<0){
                                firstManageArea.push(manageAreaArr);
                                var address=manageAreaArr.split(',');
                                this.formCount.addressAll.push(address.join('/'));
                            }
                        }
                        if(firstId.indexOf(agents[a].productId)<0){
                            firstId.push(agents[a].productId);
                            this.formCount.input.push({'id':agents[a].productId,'name':agents[a].productName});
                        }
                    }
                }
            }

        },
        getMerchant(result){
            this.formBs.startVal = 'A';
            this.formBs.input = [];
            this.formBs.desc = '';
            this.formBs.productList=[];
            var levalList=result.levelList;
            for(var l in levalList){
                this.formBs.level.push(levalList[l].level);
            }
            var products = result.productList;
            for(var p in products){
                this.formBs.productList.push({'value':products[p].productId,'label':products[p].productName});
            }
            var merchants = result.merchantList;
            
            var firstId=[];
            if(merchants!=null){
                for(var a=0; a<merchants.length; a++){
                    if(a==0){
                        firstId.push(merchants[a].productId);
                        this.formBs.startVal=merchants[a].level;
                        this.formBs.desc=merchants[a].remark;
                        this.formBs.input.push({'id':merchants[a].productId,'name':merchants[a].productName});
                    }else{
                        if(firstId.indexOf(merchants[a].productId)<0){
                            firstId.push(merchants[a].productId);
                            this.formBs.input.push({'id':merchants[a].productId,'name':merchants[a].productName});
                        }
                    }
                }
            }

            this.model5=true;
        },
        getSalesMan(result){
            this.formSm.startVal = 'A';
            var levalList=result.levelList;
            for(var l in levalList){
                this.formSm.level.push(levalList[l].level);
            }
            var salesMans = result.salesManList;
            if(salesMans!= null){
                this.formSm.startVal = salesMans[salesMans.length-1].level;
            }
        },
        getClerkProd(result){
            this.formSm.startVal = 'A';
            var levalList=result.levelList;
            for(var l in levalList){
                this.formSm.level.push(levalList[l].level);
            }
            var clerkList = result.clerkList;
            if(clerkList.length != 0){
                this.formSm.startVal = clerkList[clerkList.length - 1].level;
            }
        },
        refreshTableResult(result){
            this.$Message.success('配置成功');
            if(this.cardType=='tab1'){
                this.$refs.tabChild.loadPage();
            }else if(this.cardType=='tab2'){
                this.$refs.tabChild2.loadPage();
            }else if(this.cardType=='tab3'){
                this.$refs.tabChild3.loadPage();
            }else if(this.cardType=='tab4'){
                this.$refs.tabChild4.loadPage();
            }

        },
        successClick(name){


            this.$refs[name].validate((valid) => {

                if(valid){
                    var manageArea = '';
                    var prosecuteCity = '';
                    var manageAreaArr = this.formCount.addressAll;
                    //var prosecuteCityArr = this.formCount.address;
                    var addressAll='';
                    if(manageAreaArr.length>0){
                        for(var a in manageAreaArr){
                            var s=manageAreaArr[a].split('/');
                            addressAll+=s.join(',')+';';
                        }
                    }
                    var address=this.formCount.address.join(',');


                    var productIdsList = this.formCount.input;
                    var approve = {
                        "custId":this.userInfo.id ,
                        "custName":this.userInfo.name ,
                        "content":
                            {
                                "level":this.formCount.startVal,
                                "auditFlowNo":this.selectedObject.auditFlowNo,
                                "isCloude":this.formCount.or,
                               /* "productIds": productIds,
                                "productNames" : productNames,*/
                                "product": productIdsList,
                                "manageArea": addressAll,
                                /*"manageProvince" : '',
                                "manageCity" : '',*/
                                "auditMsc":this.formCount.desc,
                                "prosecuteCity": address 
                            }
                    };

                    let agentList = showDetail.updateProductCfgInfo(approve, this.cardType,this);;

                }else{
                    this.$Message.error('验证失败');
                }
            });
        },
        merchantClick(){
            this.$refs['formBs'].validate((valid) => {
                if(valid){
                    var productIds = '';
                    var productNames = '';
                    var productIdsList = this.formBs.input;
                    var product = []


                    for(var i=0; i<productIdsList.length; i++){
                        if(i == productIdsList.length - 1){
                            productIds += productIdsList[i].value;
                            productNames += productIdsList[i].name;
                        }else{
                            productIds += productIdsList[i].value + ',';
                            productNames += productIdsList[i].name + ',';
                        }
                        product.push({
                                id:  productIdsList[i].value,
                                name: productIdsList[i].name
                            })
                    }
                    var approve = {
                            "custId":this.userInfo.id ,
                            "custName":this.userInfo.name ,
                            "content":
                                    {
                                        "level":this.formBs.startVal,
                                        "auditFlowNo":this.selectedObject.auditFlowNo,
                                        "merchantId":'',
                                        "productIds": productIds,
                                        "productNames" : productNames,
                                        "product": product,
                                        "cfgCutsId":this.userInfo.id,
                                        "auditMsc": this.formBs.desc

                                    },
                    };
                    let agentList = showDetail.updateProductCfgInfo(approve, this.cardType,this);

                }else{
                    this.$Message.error('验证失败');
                }
            });
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
                    let cityList=showDetail.showCity(loadCity,this , item, callback);
                }else if(item.type=='city'){
                    var loaddistrict={"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"cityId":item.id}};
                    let districtList=showDetail.showDistrict(loaddistrict,this, item, callback);
                    
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
        salesPersonAndCleckClick(){
            var approve = {
                            "custId":this.userInfo.id ,
                            "custName":this.userInfo.name ,
                            "content":
                                {
                                    "auditFlowNo":this.selectedObject.auditFlowNo,
                                    "level":this.formSm.startVal,
                                    "cfgCutsId":this.userInfo.id
                                }
                    };
            let agentList='';
            if(this.cardType=='tab3')
                agentList = showDetail.updateProductCfgInfo(approve, this.cardType,this);
            else if(this.cardType=='tab4')
                agentList = showDetail.updateProductCfgInfo(approve, this.cardType,this);
        },
        resultGood(type){
            if(type=='upd'){
                this.$Message.success('修改成功');
            }else if(type=='del'){
                this.model9=false;
                this.$Message.success('删除成功');
            }
            this.showGoods();
        },
        handleView(){

        },
        /*handleRemove(){},
        handleSuccess(){},
        handleFormatError(){},
        handleFormatError(){},
        handleBeforeUpload(){},
        handleMaxSize(){},*/
        handleUpload (file){
            //this.goodFile=file;
            
        },
        uploadSuccess(){
            this.loadingStatus=true;
            setTimeout(function(){
                this.goodFile=null;
                this.loadingStatus=false;
                this.$Message.success('上传成功');
                this.showGoods();
            }.bind(this),100);
        }
    }
}
</script>
