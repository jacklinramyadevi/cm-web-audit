
<template>
  <div class="sections">
    <h1>客户投诉记录</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="20" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input style="display:none;"></Input>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="客户姓名/客户手机号/客服姓名" @on-enter="loadList(1)"></Input>
                        <Button type="primary" @click="loadList(1)">查询</Button>

                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.typeChn!=''}">
                                投诉渠道 <span v-text="formSel.typeChn"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typeChn=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(p,i) in chennl" :key="i" :name="p" :selected="formSel.typeChn.indexOf(p)>-1">{{p}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu1" @on-visible-change="orShow1">
                            <Button type="ghost" :class="{active:vs1,chk:formSel.typeCpl!=''}">
                                投诉类型 <span v-text="formSel.typeCpl"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typeChn=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(p,i) in complaint" :key="i" :name="p" :selected="formSel.typeCpl.indexOf(p)>-1">{{p}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button v-if="formSel.input!='' || formSel.typeChn!='' || formSel.typeCpl!=''" @click="reset">重置</Button>
                    </FormItem>
                </Form>
                </Col>
                <Col :sm="4" :xs="24"><div class="float_right">
                    <Button type="primary" @click="newData('0')">新增投诉</Button>
                    <Button type="ghost" @click="exportData">导出</Button>
                </div></Col>
        </Row>
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

    <Modal v-model="model1" title="跟进记录" class="noFooter noHeight" width="900">
        <div class="float_right">
            <Button type="primary" @click="newData('1')">新增记录</Button>
        </div>
        <div class="clear"></div>
         <div class="table_show">
            <Table border :columns="columns2" :data="data2"></Table>
         </div>
         <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total2}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="totalRecords2" :page-size="pageSize" show-elevator @on-change="changePage2"></Page>
            </Col>
        </Row>
        <Page v-else :total="totalRecords2" :page-size="pageSize" simple @on-change="changePage2"></Page>
         <div slot="footer"></div>
    </Modal>
    <Modal v-model="model2" :title="modalTitle" class="noFooter noHeight" width="900" @on-cancel="handleReset('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr" :label-width="80">

            <Row :gutter="16">
                <Col :sm="12" :xs="24">
                    <FormItem label="客户姓名" prop="name">
                        <Input v-if="modalTitle=='新增投诉'" placeholder="客户姓名" v-model="formFr.name">
                        </Input><span v-else v-text="formFr.name"></span>
                    </FormItem>
                </Col>
                <Col :sm="12" :xs="24">
                    <FormItem label="客户手机号" prop="phone">
                        <Input v-if="modalTitle=='新增投诉'" placeholder="客户手机号" v-model="formFr.phone"></Input><span v-else v-text="formFr.phone"></span>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col :sm="12" :xs="24">
                    <FormItem label="客服" prop="nameRe">
                        <Input placeholder="客服姓名" v-model="formFr.nameRe"></Input>
                    </FormItem>
                </Col>
                <Col :sm="12" :xs="24">
                    <FormItem label="工号" prop="No">
                        <Input placeholder="客服工号" v-model="formFr.No"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col :sm="12" :xs="24">
                    <FormItem label="投诉渠道">
                        <Select v-model="formFr.merchantName">
                            <Option value="全部">全部</Option>
                            <Option v-for="(p,i) in chennl" :key="i" :value="p">{{p}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :sm="12" :xs="24">
                    <FormItem label="投诉类型">
                        <Select v-model="formFr.type">
                            <Option value="全部">全部</Option>
                            <Option v-for="(p,i) in complaint" :key="i" :value="p">{{p}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col :sm="12" :xs="24">
                    <FormItem label="投诉时间">
                        <DatePicker class="datesel" :value="formFr.investigationTm" format="yyyy-MM-dd" placement="bottom-start" placeholder="选择投诉时间"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <FormItem prop="txtFr" :label="msgTitle">
                <Input type="textarea" v-model="formFr.auditMsc" :rows="6" :maxlength="200" placeholder="输入投诉内容" @on-keyup="txtKeyup('formFr')"></Input>
                <div class="submitDesc"><span v-text="formFr.descCount"></span></div>
            </FormItem>
            <div class="float_right">
                <Button type="primary" @click="handleAdd('formFr')">确定</Button>
                <Button type="ghost" @click="handleReset('formFr')">取消</Button>
            </div>
            <div class="clear"></div>
         </Form>
         <div slot="footer"></div>
    </Modal>
    <!-- <Modal v-model="model3" class="noFooter" width="900">
        <swiper :options="swiperOption" ref="mySwiper" class="swiperShow">
            <swiperSlide v-for="(s,i) in swiperImg" :key="i"><h3 v-text="s.docNm"></h3><img v-if="s.docType==1" :src="s.src"/>
            <video v-else :src="s.src"></video></swiperSlide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div slot="footer"></div>
    </Modal> -->
  </div>
</template>

<script>
import '../router/dateFormat.js';
import showData from '../router/csmsData.js';



export default {
  name: 'sections',
  data () {
    const validateLen=function(rule,value,callback){
        if(!value){
            return callback(new Error('投诉内容不能为空'));
        }else if(value.length>=100){
            return callback(new Error('投诉内容至多为200字'));
        }else{
            callback();
        }
    };
    const validatePhone=(rule,value,callback)=>{
        if(this.modalTitle=='新增投诉'){
                var re=new RegExp(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
            if(value.length!=0){
                var retu=value.match(re);
                if(retu){
                    callback();
                }else{
                    callback(new Error('账号输入必须为11位数字'));
                }
            }else{
                callback(new Error('账号不能为空'));
            }
        }
        
    };
    const validateIntNum=(rule,value,callback)=>{
        if(value.length!=0){
            var regPos=/ ^\d+$/;
            if(!isNaN(value)){
                callback();
            }else{
                callback(new Error('工号输入必须为数字'));
            }
        }else{
            callback(new Error('工号不能为空'));
        }
    }
    return {
        model1:false,
        model2:false,
        model3:false,
        vs:false,
        vs1:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageStart:0,
        pageSize:10,
        total2:0,
        totalRecords2:0,
        valShow:0,
        chennl:['客服电话','通讯软件','线下'],
        complaint:['客户投诉','商户投诉','销售投诉'],
        formSel:{
            input:'',
            typeChn:'',
            typeCpl:''
        },
        loadData:'',
        modalTitle:'新增投诉',
        msgTitle:'投诉内容',
        formFr:{
            name:'',
            phone:'',
            nameRe:'',
            No:'',
            merchantName:'全部',
            type:'全部',
            investigationTm:new Date(),
            auditMsc:'',
            descCount:'',
            descNm:0,
        },
        ruleFr:{
            descLength:100,
            name:[{required:true,message:'客户姓名不能为空',trigger:'blur'}],
            phone:[
                {validator:validatePhone,trigger:'blur'}
            ],
            nameRe:[{required:true,message:'客服姓名不能为空',trigger:'blur'}],
            No:[{validator:validateIntNum,trigger:'blur'}],
            auditMsc:[
                {validator:validateLen,trigger:'blur'}
            ]
        },
        columns1: [{
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '客户手机号码',
            key: 'mobile'
        },
        {
            title: '客服',
            key: 'customerNm'
        },
        {
            title: '工号',
            key: 'jobNumber'
        },{
            title: '投诉渠道',
            key: 'complaintChannal'
        },{
            title: '投诉类型',
            key: 'complaintType'
        },
        {
            title: '投诉时间',
            key: 'complaintTm',
            width:104
        },
        {
            title: '投诉内容',
            key: 'complaintContent'
        },{
            title: '跟进次数',
            key: 'hanCount'
        },{
            title: '跟进内容',
            key: 'handleContent'
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.show('0',params.index)
                            }
                        }
                    }, '跟进记录')/*,
                    h('Button', {
                        props: {
                            type: 'ghost',
                            size: 'small'
                        },
                        style:{
                            marginLeft:'5px'
                        },
                        on: {
                            click: () => {
                                this.show('1',params.index)
                            }
                        }
                    }, '播放')*/
                ]);
            }
        }],
        showIndex:0,
        data1: [],
        cpltData:{},
        columns2: [{
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '跟进时间',
            key: 'crtTm',
            width:104
        },
        {
            title: '客服',
            key: 'customerNm'
        },
        {
            title: '跟进内容',
            key: 'handleContent'
        }/*,
        {
            title: '操作',
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.fileShow(params.index)
                            }
                        }
                    }, '播放')
                ]);
            }
        }*/],
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
        //this.userInfo=this.$store.getters.userInfo;
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=60;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
        this.loadList(1);
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
        loadList(page){
            var typeChn=null,typeCpl=null;
            if(this.formSel.typeChn!=''){
                var t=this.formSel.typeChn.split('：');
                typeChn=t[1];
            }
            if(this.formSel.typeCpl!=''){
                var t=this.formSel.typeCpl.split('：');
                typeCpl=t[1];
            }
            var input=this.formSel.input==''?null:this.formSel.input;

            var loadData={
              "data": {
                "comChannal": typeChn,
                "comType": typeCpl,
                "firstResult": (page - 1) * this.pageSize,
                "maxResults": this.pageSize,
                "nameOrMbl": input
              }
            };
            showData.getComplaintRecordInfo(loadData,this);
        },
        getComplaintRecordInfo(result){//获取列表
            this.data1=[];
            var list=result.comList;
            if(list!=null || list!=undefined){
                this.total=Math.ceil((result.comCount/this.pageSize));
                this.totalRecords=result.comCount;
                for(var l in list){
                    var relive=list[l];
                    var detail={};
                    detail['id']=relive.id;
                    detail['name']=relive.name;
                    detail['mobile']=relive.mobile;
                    detail['customerNm']=relive.customerNm;
                    detail['jobNumber']=relive.jobNumber;
                    detail['complaintChannal']=relive.complaintChannal;
                    detail['complaintType']=relive.complaintType;
                    detail['complaintTm']=relive.complaintTm!=null?new Date(relive.complaintTm).Format('yyyy-MM-dd HH:mm:ss'):'';
                    detail['complaintContent']=relive.complaintContent;
                    detail['hanCount']=relive.hanCount;
                    detail['handleContent']=relive.handleContent;
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
            this.loadList(1);
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu1(val){
            if(val!='全部' && val!=''){
                this.formSel.typeCpl='：'+val;
            }else{
                this.formSel.typeCpl='';
            }
            this.loadList(1);
        },
        orShow1(visible){
            this.vs1=visible;
        },
        exportData () {
            var typeChn=null,typeCpl=null;
            if(this.formSel.typeChn!=''){
                var t=this.formSel.typeChn.split('：');
                typeChn=t[1];
            }
            if(this.formSel.typeCpl!=''){
                var t=this.formSel.typeCpl.split('：');
                typeCpl=t[1];
            }
            var input=this.formSel.input==''?null:this.formSel.input;
            window.open(this.$store.getters.httpUrl+this.$store.getters.excelRepayPlanStatInfo+'?nameOrMbl='+input+'&comChannal='+typeChn+'&comType='+typeCpl);
        },
        changePage(pageNum){
            this.loadList(pageNum);
        },
        newData(type){
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            if(type=='0'){
                this.modalTitle='新增投诉';
                this.msgTitle='投诉内容';
            }else{
                this.modalTitle='新增记录';
                this.msgTitle='跟进内容';
                this.formFr.name=this.cpltData.name;
                this.formFr.phone=this.cpltData.mobile;
                this.formFr.nameRe='';
                this.formFr.No='';
                this.formFr.merchantName='全部';
                this.formFr.type='全部';
                this.formFr.investigationTm=new Date();
                this.formFr.auditMsc='';
            }
            this.model2=true;
        },
        txtKeyup(name){
            var val=this.formFr.auditMsc;
            this.formFr.descNm=val.length;
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
        },
        show(type,index){
            this.cpltData=this.data1[index];
            if(type=='0'){
                this.model1=true;
                this.getHandleRecord(1);
            }else{
                this.model3=true;
            }
        },
        getHandleRecord(page){
           var detail={
              "data": {
                "comId": this.cpltData.id,
                "firstResult": (page - 1) * this.pageSize,
                "maxResults": this.pageSize
              }
            };
            showData.getHandleRecordInfo(detail,this); 
        },
        getHandleRecordInfo(result){
            this.data2=[];
            var list=result.handList;
            if(list!=null || list!=undefined){
                this.total2=Math.ceil((result.handCount/this.pageSize));
                this.totalRecords2=result.handCount;
                for(var l in list){
                    var relive=list[l];
                    var detail={};
                    detail['name']=relive.name;
                    detail['mobile']=relive.mobile;
                    detail['customerNm']=relive.customerNm;
                    detail['handleContent']=relive.handleContent;
                    detail['crtTm']=new Date(relive.crt_tm).Format('yyyy-MM-dd HH:mm:ss');
                    this.data2.push(detail);
                }
            }
        },
        handleReset(name){
            this.$refs[name].resetFields();
            this.model2=false;
        },
        reset(){
            this.formSel.input='';
            this.formSel.typeChn='';
            this.formSel.typeCpl='';
            this.loadList(1);
        },
        handleAdd(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    if(this.msgTitle=='投诉内容'){
                        var  loadData={"data": {
                                "complaintChannal": this.formFr.merchantName,
                                "complaintContent": this.formFr.auditMsc,
                                "complaintTm": this.formFr.investigationTm,
                                "complaintType": this.formFr.type,
                                "customerNm": this.formFr.nameRe,
                                "jobNumber": this.formFr.No,
                                "mobile": this.formFr.phone,
                                "name": this.formFr.name
                              }
                          }
                        showData.saveComplaintRecord(loadData,this);
                        this.loadList(1);
                    }else if(this.msgTitle='跟进内容'){
                        var  loadData={"data": {
                                "comId": this.cpltData.id,
                                "customerNm": this.formFr.nameRe,
                                "handleContent": this.formFr.auditMsc,
                                "jobNumber":this.formFr.No
                              }
                          }
                        showData.saveHandleRecord(loadData,this);
                    }
                }else{
                    this.$Message.error(valid.message);
                }
            })
        },
        changePage2(pageNum){
            this.getHandleRecord(pageNum);
        },
        /*handleSuccess(res,file){
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
        },*/
        /*fileShow(index){
            var id=this.data2[index].id;
            var loadData=this.loadData;
            loadData.content={};
            loadData.content['id']=id;
            loadData.content['auditFlowNo']=this.data2[index].auditFlowNo;
            //var investDoc=showData.getInvestInfoDoc(loadData,this);
        },*/
        getInvestDoc(result){
            //this.swiperImg=[];
            var docLists=result.docList;
            if(docLists.length>0 || docLists!=undefined){
                this.model2=true;
                for(var d in docLists){
                    var imgArr={};
                    imgArr['docNm']=docLists[d].docNm;
                    imgArr['docType']=docLists[d].docType;
                    imgArr['src']='/audit/file/esDownDocInfoNew?objId='+docLists[d].docId;
                    this.swiperImg.push(imgArr);
                }
            }else
                this.$Message.warning('暂无详情');
        }
    }
}
</script>
