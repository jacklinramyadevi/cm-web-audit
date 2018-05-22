<style>
@import '../css/swiper.min.css'
</style>
<template>
  <div class="sections">
    <h1>商户尽调</h1>
    <div class="pl_body">
        <Form :model="formSel" class="downMenu">
            <FormItem>
                <Input v-model="formSel.input" icon="ios-search" placeholder="复活人账号/姓名"></Input>
                <Button type="success" @click="search">查询</Button>

                <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                    <Button type="ghost" :class="{active:vs,chk:formSel.typeChn!=''}">
                        省份 <span v-text="formSel.typeChn"></span>
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="全部" :selected="formSel.typeChn=='全部'">全部</DropdownItem>
                        <DropdownItem v-for="(p,i) in provices" :key="i" :name="p" :selected="formSel.typeChn.indexOf(p)>-1">{{p}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="申请时间" @on-change="dateChange"></DatePicker>
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
                <Page :total="totalRecords" :page-size="pageSize" show-elevator @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="totalRecords" :page-size="pageSize" simple @on-change="changePage"></Page>

    </div>

    <Modal v-model="model1" title="详情" class="noFooter noHeight" width="900" @on-cancel="handleReset('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr">
            <FormItem>
                <Row :gutter="16">
                    <Col :sm="12" :xs="24">
                        <Select v-model="formFr.merchantName" placeholder="选择尽调人员">
                            <Option value="xxx">xxx</Option>
                            <Option value="2">李四</Option>
                        </Select>
                    </Col>
                    <Col :sm="12" :xs="24">
                        <DatePicker class="datesel" :value="formFr.investigationTm" format="yyyy/MM/dd" placement="bottom-start" placeholder="选择尽调时间" @on-change="dateChange2"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem prop="txtFr">
                <Input type="textarea" v-model="formFr.auditMsc" :rows="6" :maxlength="200" placeholder="输入尽调详情" @on-keyup="txtKeyup('formFr')"></Input>
                <div class="submitDesc"><span v-text="formFr.descCount"></span></div>
            </FormItem>
            <FormItem><!--  -->
                <Upload ref="upload" :show-upload-list="false" :multiple="true" action="/audit/file/uploadFile" :on-success="handleSuccess" :format="['jpg','png','pdf']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize">
                    <Button type="ghost" icon="plus" style="width:250px;" @click="">添加附件</Button><label style="margin-left:10px;">支持.jpg / .png / .pdf格式</label>
                </Upload>
                <ul class="imgList">
                    <li v-for="(item,i) in formFr.uploadList" :key="i"><span v-text="item.docNm"></span><Button type="text" @click="handleRemove(item)" class="float_right" style="color:#00b06c;">删除</Button></li>
                </ul>
            </FormItem>
            <Button type="success" @click="handleAdd('formFr')">添加</Button>
            <Button type="ghost" @click="handleReset('formFr')">取消</Button>
         </Form>
         <div class="table_show">
            <Table border :columns="columns2" :data="data2"></Table>
         </div>
         <div slot="footer"></div>
    </Modal>
    <Modal v-model="model2" class="noFooter" width="900">
        <swiper :options="swiperOption" ref="mySwiper" class="swiperShow">
            <swiperSlide v-for="(s,i) in swiperImg" :key="i"><h3 v-text="s.docNm"></h3><img v-if="s.docType==1" :src="s.src"/>
            <video v-else :src="s.src"></video></swiperSlide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { swiper,swiperSlide } from 'vue-awesome-swiper';
import '../router/dateFormat.js';
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
  components:{ swiper,swiperSlide },
  data () {
    return {
        model1:false,
        model2:false,
        vs:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageStart:0,
        pageSize:10,
        valShow:0,
        provices:[],
        formSel:{
            input:'',
            typeChn:'',
            selectTm:[]
        },
        loadData:'',
        formChange:{
            name:''
        },
        formFr:{
            auditFlowNo:'',
            merchantName:'xxx',
            investigationTm:'',
            auditMsc:'',
            descCount:'',
            descNm:0,
            uploadList:[]
        },
        ruleFr:{
            descLength:200,
            auditMsc:[
                {validator:validateLen,trigger:'blur'}
            ]
        },
        columns1: [{
            title: '商户名称',
            key: 'merchantName'
        },
        {
            title: '申请人姓名',
            key: 'applyName'
        },
        {
            title: '手机号',
            key: 'applyMobile'
        },
        {
            title: '省市',
            key: 'address'
        },{
            title: '归属',
            key: 'belong'
        },
        {
            title: '申请时间',
            key: 'applyTm',
            width:104
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
                                this.show(params.index)
                            }
                        }
                    }, '详情')
                ]);
            }
        }],
        showIndex:0,
        data1: [],
        columns2: [{
            title: '尽调人员',
            key: 'merchantName'
        },
        {
            title: '尽调时间',
            key: 'investigationTm'
        },
        {
            title: '尽调详情',
            key: 'auditMsc'
        },
        {
            title: '附件',
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
                                this.fileShow(params.index)
                            }
                        }
                    }, '查看')
                ]);
            }
        }],
        data2:[],
        //swiperImg:[{'docType':1,'docNm':'dfdf','src':'https://ben.lobaugh.net/blog/wp-content/uploads/cropped-IMG_5921-1.jpg'}],
        swiperImg:[],
        swiperOption:{
            notNextTick:true,
            effect:'coverflow',
            grabCursor:true,
            setWrapperSize:true,
            pagination:'.swiper-pagination',
            paginationClickable:true,
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
            observeParents:true,
            debugger:true
        },
        userInfo:{}
        }
    },
    created:function(){
        this.userInfo=this.$store.getters.userInfo;
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=60;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
        this.loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{}};
        this.pageStart=0;
        this.loadList();
        var proviceList=showData.showProvince(this.loadData,this);
    },
    mounted(){
        //this.formFr.uploadList=this.$refs.upload.fileList;
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        },
        swiper(){
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        loadList(loadList){
            var loadData={};
            if(loadList!=null || loadList!=undefined){
                loadData=loadList;
            }else{
                loadData=this.loadData;
                loadData['content']={"firstResult":this.pageStart,"maxResults":this.pageSize,"operationType":4};
            }
            let investList=showData.showMerchant(loadData,this);
        },
        showresult(result){//获取列表
            this.data1=[];
            var list=result.list;
            if(list!=null || list!=undefined){
                this.total=Math.ceil((result.total/this.pageSize));
                this.totalRecords = result.total;
                for(var l in list){
                    var relive=list[l];
                    var detail={};
                    detail['amiId']=relive.id;
                    detail['auditFlowNo']=relive.auditFlowNo;
                    detail['merchantName']=relive.merchantName;
                    detail['applyName']=relive.applyName;
                    detail['applyMobile']=relive.applyMobile;
                    detail['address']=relive.province+''+relive.city;
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
                    detail['belong']=belong;
                    detail['applyTm']=new Date(relive.applyTm).Format('yyyy-MM-dd HH:mm:ss');
                    this.data1.push(detail);
                }
            }
        },
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typeChn='：'+val;
            }else{
                this.formSel.typeChn='';
            }
            this.search();
        },
        orShow(visible){
            this.vs=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
            this.search();
        },
        exportData (type) {
        },
        changePage(pageNum){
            this.pageStart=(pageNum - 1) * this.pageSize;
            this.loadList();
        },
        dateChange2(date){
            this.formFr.investigationTm=date;
        },
        show(index){
            this.formFr.descNm=0;
            this.formFr.type='张三';
            this.formFr.selectTm=[];
            this.formFr.auditMsc='';
            this.formFr.uploadList=[];
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            this.showIndex=index;
            var id=this.data1[index].id;
            this.formFr.auditFlowNo=this.data1[index].auditFlowNo;
            var loadData=this.loadData;
            loadData.content={};
            loadData.content['auditFlowNo']=this.data1[index].auditFlowNo;
            let investList=showData.getInvestList(loadData,this);
            this.model1=true;
        },
        getInvest(result){//商户尽调详情列表
            this.data2=[];
            var list=result.InvestigationList;
            if(list.length>0 || list!=undefined){
                this.data2=list;
                for(var d in this.data2){
                    this.data2[d]['investigationTm']=new Date(this.data2[d]['investigationTm']).Format('yyyy-MM-dd');
                }
            }
        },
        txtKeyup(name){
            var val=this.formFr.auditMsc;
            this.formFr.descNm=val.length;
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
        },
        handleReset(name){
            this.$refs[name].resetFields();
        },
        reset(){
            this.formSel.input='';
            this.formSel.typeChn='';
            this.formSel.selectTm=[];
            this.search();
        },
        handleAdd(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    var  loadData=this.loadData;
                    loadData.content={};
                    loadData.content['auditFlowNo']=this.formFr.auditFlowNo;
                    loadData.content['merchantName']=this.formFr.merchantName;
                    loadData.content['investigationTm']=new Date(this.formFr.investigationTm).Format('yyyy-MM-dd');
                    loadData.content['auditMsc']=this.formFr.auditMsc;
                    loadData.content['docList']=this.formFr.uploadList;
                    var info=showData.getInvestInfoList(loadData,this);
                }else{
                    this.$Message.error(valid.message);
                }
            })
        },
        getInvestInfo(result){
            this.$Message.success('添加成功');
            this.show(this.showIndex);
        },
        handleSuccess(res,file){
            var doc={};
            doc['docId']=res.result.docId;
            doc['docNm']=file.name;
            if(file.name.indexOf('.png') || file.name.indexOf('.jpg') || file.name.indexOf('.pdf'))
                doc['docType']=1;
            else
                doc['docType']=2;
            this.formFr.uploadList.push(doc);
        },
        handleRemove(file){
            const fileList=this.$refs.upload.fileList;
            //this.$refs.upload.fileList.splice(fileList.indexOf(file),1);
            this.formFr.uploadList.splice(this.formFr.uploadList.indexOf(file),1);
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
        fileShow(index){
            var id=this.data2[index].id;
            var loadData=this.loadData;
            loadData.content={};
            loadData.content['id']=id;
            loadData.content['auditFlowNo']=this.data2[index].auditFlowNo;
            var investDoc=showData.getInvestInfoDoc(loadData,this);
        },
        getInvestDoc(result){
            //this.swiperImg=[];
            var docLists=result.docList;
            if(docLists.length>0 || docLists!=undefined){
                this.model2=true;
                for(var d in docLists){
                    var imgArr={};
                    imgArr['docNm']=docLists[d].docNm;
                    imgArr['docType']=docLists[d].docType;
                    imgArr['src']='http://localhost:3000/audit/file/esDownDocInfoNew?objId='+docLists[d].docId;
                    this.swiperImg.push(imgArr);
                }
            }else
                this.$Message.warning('暂无详情');
        },
        showResultProvice(resultdata){
            var list=resultdata.provinceList;
            if(list!=null || list!=undefined){
                for(var l in list){
                    this.provices.push(list[l].pName);
                }
            }
        },
        search(){
            var loadData=this.loadData;
            loadData['content']={"firstResult":this.pageStart,"maxResults":this.pageSize,"operationType":4};
            if(this.formSel.input!=''){
                loadData.content['customName']=this.formSel.input;
            }
            if(this.formSel.typeChn!=''){
                var wd=this.formSel.typeChn.split('：');
                loadData.content['province']=wd[wd.length-1];
            }
            if(this.formSel.selectTm.length>0){
                loadData.content['startApplyTm']=new Date(this.formSel.selectTm[0]).Format('yyyy-MM-dd');
                loadData.content['endApplyTm']=new Date(this.formSel.selectTm[1]).Format('yyyy-MM-dd');
            }
            this.loadList(loadData);
        },
    }
}
</script>
