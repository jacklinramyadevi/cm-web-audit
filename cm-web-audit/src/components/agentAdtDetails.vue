<template>
    <div class="creditUser">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="名称/姓名/手机号" @on-keyup="search"></Input>
                        <Button type="success" @click="search">查询</Button>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                                审核人员<span v-text="formSel.typePd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(c,i) in formSel.creditPerson" :key="i" :name="i" :selected="formSel.typeSh.indexOf(c.name)>-1">{{c.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.typeSh!=''}">
                                审核状态<span v-text="formSel.typeSh"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typeSh=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(c,i) in formSel.creditStatus" :key="i" :name="i" :selected="formSel.typeSh.indexOf(c.name)>-1">{{c.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                            <Button type="ghost" :class="{active:vs3,chk:formSel.startVal!=''}">
                                选择等级<span v-text="formSel.startVal"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.startVal=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(l,i) in formSel.level" :key="i" :name="l.level" :selected="formSel.startVal.indexOf(l.level)>-1">{{l.level}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        
                        <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="审核时间" @on-change="dateChange"></DatePicker>
                        <Button @click="reset">重置</Button>
                    </FormItem>
                </Form>
                </Col>
                <Col :sm="2" :xs="24"><div class="float_right">
                    <Button type="success" @click="">渠道导入</Button>
                </div></Col>
            </Row>
            <div class="table_show">
            <Table border :columns="columns" :data="data" ref="table1"></Table></div>
            <Row :gutter="16" v-if="pageWin>=768">
                <Col :sm="5" :xs="24">
                    <div class="total">共{{total}}页</div>
                </Col>
                <Col :sm="19" :xs="24" class="txt_right">
                    <Page :page-size="pageSize" :total="totalRecords" show-elevator @on-change="changePage"></Page>
                </Col>
            </Row>
            <Page v-else :page-size="pageSize" :total="totalRecords" simple @on-change="changePage"></Page>
    </div>

</template>

<script>
import '../router/dateFormat.js';
import showData from '../router/agentDetail.js';

export default {
    props:['userInfo','tabMsg'],
    data:function(){
        return{
            tbWidth:100,
            total:0,
            totalRecords:0,
            pageStart:0,
            pageSize:10,
            vs:false,
            vs2:false,
            vs3:false,
            formSel:{
                input:'',
                creditPerson:[{"id":1,"name":"xxx"},{"id":2,"name":"gfg"}],
                typePd:'',
                typePdId:'',
                creditStatus:[{"status":2,"name":"已通过"},{"status":-2,"name":"未通过"}],
                typeShId:'',
                typeSh:'',
                level:[],
                startVal:'',
                selectTm:[]
            },
            columns:[],
            data:[],
            selection:[],
            operationType:3,
            columns1: [
            {
                title: '代理商名称',
                key: 'agentName',
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
            },
            {
                title: '等级',
                key: 'level'
            },
            {
                title: '审核人员',
                key: 'auditCutsName'
            },
            {
                title: '审核状态',
                key: 'auditStatus'
            },
            {
                title: '申请时间',
                key: 'applyTm',
                width:104
            },
            {
                title: '操作',
                key:'action',
                width:80,
                align:'center',
                render:(h,params)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'success',
                                size:'small'
                            },
                            on:{
                                click:() => {
                                    this.show(params.index);
                                }
                            }
                        },'详情')
                    ])
                }
            }],
            columns2: [
            {
                title: '商户名称',
                key: 'merchantName',
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
            },
            {
                title: '归属',
                key: 'belong'
            },
            {
                title: '等级',
                key: 'level'
            },
            {
                title: '审核人员',
                key: 'auditCutsName'
            },
            {
                title: '审核状态',
                key: 'auditStatus'
            },
            {
                title: '申请时间',
                key: 'applyTm',
                width:104
            },
            {
                title: '操作',
                key:'action',
                width:80,
                align:'center',
                render:(h,params)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'success',
                                size:'small'
                            },
                            on:{
                                click:() => {
                                    this.show(params.index);
                                }
                            }
                        },'详情')
                    ])
                }
            }],
            columns3: [
            {
                title: '业务员姓名',
                key: 'salesmanName',
            },
            {
                title: '手机号',
                key: 'salesmanMobile'
            },
            {
                title: '身份证',
                key: 'applyIdCard'
            },
            {
                title: '省市',
                key: 'address'
            },
            {
                title: '归属',
                key: 'belong'
            },
            {
                title: '等级',
                key: 'level'
            },
            {
                title: '审核人员',
                key: 'auditCutsName'
            },
            {
                title: '审核状态',
                key: 'auditStatus'
            },
            {
                title: '申请时间',
                key: 'applyTm',
                width:104
            },
            {
                title: '操作',
                key:'action',
                width:80,
                align:'center',
                render:(h,params)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'success',
                                size:'small'
                            },
                            on:{
                                click:() => {
                                    this.show(params.index);
                                }
                            }
                        },'详情')
                    ])
                }
            }],
            columns4: [
            {
                title: '店员姓名',
                key: 'clerkName',
            },
            {
                title: '手机号',
                key: 'clerkMobile'
            },
            {
                title: '身份证',
                key: 'applyIdCard'
            },
            {
                title: '省市',
                key: 'address'
            },
            {
                title: '归属',
                key: 'belong'
            },
            {
                title: '等级',
                key: 'level'
            },
            {
                title: '审核人员',
                key: 'auditCutsName'
            },
            {
                title: '审核状态',
                key: 'auditStatus'
            },
            {
                title: '申请时间',
                key: 'applyTm',
                width:104
            },
            {
                title: '操作',
                key:'action',
                width:80,
                align:'center',
                render:(h,params)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'success',
                                size:'small'
                            },
                            on:{
                                click:() => {
                                    this.show(params.index);
                                }
                            }
                        },'详情')
                    ])
                }
            }]
        }
    },
    created:function(){
        this.columns=this.columns1;
        this.pageStart=0;
        this.loadData();
        if($(window).width()<768){
            var arr=this.columns;
            for(var i=0;i<arr.length;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=60;            
            arr[arr.length-1]['fixed']='right';
            this.columns=arr;
        }
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        loadData(){
            let loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"firstResult":this.pageStart,"maxResults":this.pageSize,"operationType":this.operationType}};
            this.selData(loadData);
        },
        selData(loadData){
            if(this.tabMsg=='tab2'){//商户列表
                this.columns=this.columns2;
                let resultdata = showData.showMerchant(loadData, this );
            }else if(this.tabMsg=='tab3'){//业务员列表
                this.columns=this.columns3;
                let resultdata = showData.showSalesPerson(loadData, this );
            }else if(this.tabMsg=='tab4'){//店员列表
                this.columns=this.columns4;
                let resultdata = showData.showClerk(loadData, this );
            }else{//代理商查询
                let resultdata = showData.showAgent(loadData, this );
            }
        },
        showMenu(i){
            if(i!='全部' && i>=0){
                this.formSel.typePd='：'+this.formSel.creditPerson[i].name;
                this.formSel.typePdId=this.formSel.creditPerson[i].id;
            }else{
                this.formSel.typePdId-1;
                this.formSel.typePd='';
            }
            this.pageStart=0;
            this.search();
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu2(i){
            if(i!='全部' && i>=0){
                this.formSel.typeSh='：'+this.formSel.creditStatus[i].name;
                this.formSel.typeShId=this.formSel.creditStatus[i].status;
            }else{
                this.formSel.typeShId='';
                this.formSel.typeSh='';
            }
            this.pageStart=0;
            this.search();
        },
        orShow2(visible){
            this.vs2=visible;
        },
        showMenu3(val){
            if(val!='全部' && val!=''){
                this.formSel.startVal='：'+val;
            }else{
                this.formSel.startVal='';
            }
            this.pageStart=0;
            this.search();
        },
        orShow3(visible){
            if(visible){
                let loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{}};
                var levelList=showData.getLevelList(loadData,this);
            }
            this.vs3=visible;
        },
        getLevel(result){
            this.formSel.level=result.levelList;
        },
        dateChange(date){
            if(date[0]==''){
                date=[];
            }
            this.formSel.selectTm=date;
            this.pageStart=0;
            this.search();
        },
        show(index){
            this.$emit('listenTo',this.data[index]);
        },
        changePage(pageNum){
            this.pageStart=(pageNum - 1) * this.pageSize;
            this.search();
        },
        showresult(resultdata){
            this.data=[];
            let result = resultdata;

            if(result.total>0){
                this.total=Math.ceil((result.total/this.pageSize));
                this.totalRecords = result.total;
                var list=result.list;
                for(var i=0;i<list.length;i++){
                    var relive=list[i];
                    var detail={};
                    detail['id']=relive.id;
                    detail['auditFlowNo']=relive.auditFlowNo;
                    if(this.tabMsg=='tab1'){
                        detail['agentName']=relive.agentName;
                        detail['applyName']=relive.applyName;
                        detail['applyMobile']=relive.applyMobile;
                        detail['address']=relive.province+''+relive.city;
                    }else if(this.tabMsg=='tab2'){
                        detail['id']=relive.amiId;
                        detail['merchantName']=relive.merchantName;
                        detail['applyName']=relive.applyName;
                        detail['applyMobile']=relive.applyMobile;
                        detail['address']=relive.province+''+relive.city;
                    }else if(this.tabMsg=='tab3'){
                        detail['salesmanName']=relive.salesmanName;
                        detail['salesmanMobile']=relive.salesmanMobile;
                        detail['applyIdCard']=relive.applyIdCard;
                    }else if(this.tabMsg=='tab4'){
                        detail['clerkName']=relive.clerkName;
                        detail['clerkMobile']=relive.clerkMobile;
                        detail['applyIdCard']=relive.applyIdCard;
                    }
                    if(this.tabMsg!='tab1'){
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
                    }
                    if(relive.level=='' || relive.level==null){
                        detail['level']='无';
                    }else{
                        detail['level']=relive.level;
                    }
                    if(relive.auditCutsName!=null){
                        detail['auditCutsName']=relive.auditCutsName;
                    }else{
                        detail['auditCutsName']='无';
                    }
                    if(relive.auditStatus==0){
                        detail['auditStatus']='待分配';
                    }else if(relive.auditStatus==1){
                        detail['auditStatus']='已分配待审核';
                    }else if(relive.auditStatus==2){
                        detail['auditStatus']='审核通过';
                    }else if(relive.auditStatus==-2){
                        detail['auditStatus']='审核拒绝';
                    }
                    var dates=relive.applyTm;
                    var dateShow=new Date(dates).Format('yyyy-MM-dd HH:mm:ss');
                    detail['applyTm']=dateShow;
                    this.data.push(detail);
                }
            }
        },
        search(){
            var detail={};
            let loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"firstResult":this.pageStart,"maxResults":this.pageSize,"operationType":this.operationType}};
            if(this.formSel.input!=''){
                loadData.content['customName']=this.formSel.input;
            }
            if(this.formSel.typePdId!=''){
                loadData.content['auditCutsId']=parseInt(this.formSel.typePdId);
            }
            if(this.formSel.typeShId!=''){
                loadData.content['auditStatus']=parseInt(this.formSel.typeShId);
            }
            if(this.formSel.startVal!=''){
                var level=this.formSel.startVal.split('：');
                loadData.content['level']=level[level.length-1];
            }
            if(this.formSel.selectTm.length>0){
                loadData.content['startAuditTm']=this.formSel.selectTm[0];
                loadData.content['endAuditTm']=this.formSel.selectTm[1];
            }
            
            this.selData(loadData);
        },
        reset(){
            this.formSel.input='';
            this.formSel.typePd='';
            this.formSel.typeSh='';
            this.formSel.startVal='';
            this.formSel.selectTm=[];
            this.pageStart=0;
            this.search();
        }
    }
}
</script>