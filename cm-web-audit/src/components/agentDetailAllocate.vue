<template>
    <div class="creditUser">
        <Row class="form_row">
            <Col :sm="24" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="名称/姓名/手机号" @on-keyup="search"></Input>
                        <Button type="success" @click="search">查询</Button>
                        
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.typeWd!=''}">
                                省份<span v-text="formSel.typeWd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typeWd=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(p,i) in provices" :key="i" :name="p" :selected="formSel.typeWd.indexOf(p)>-1">{{p}}</DropdownItem>
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
                        <Button @click="reset">重置</Button>
                    </FormItem>
                </Form>
                </Col>
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
            vs3:false,
            formSel:{
                input:'',
                typeWd:'',
                level:[],
                startVal:''
            },
            provices:[],
            columns:[],
            data:[],
            selection:[],
            loadData:{},
            provinces:[],
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
                        },'配置')
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
                title: '操作',
                key:'action',
                width:165,
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
                        },'配置'),
                        h('Button',{
                            props:{
                                type:'ghost',
                                size:'small'
                            },
                            style:{
                                marginLeft:'5px'
                            },
                            on:{
                                click:() => {
                                    this.show(params.index,'info');
                                }
                            }
                        },'商品信息')
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
                        },'配置')
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
                title: '归属',
                key: 'belong'
            },
            {
                title: '等级',
                key: 'level'
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
                        },'配置')
                    ])
                }
            }]
        }
    },
    created:function(){
        this.columns=this.columns1;
        this.loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{}};
        this.pageStart=0;
        this.loadPage();
        var levelList=showData.getLevelList(this.loadData,this);
        var proviceList=showData.showProvince(this.loadData,this);
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
        loadPage(){
            var loadData=this.loadData;
            loadData["content"]={"firstResult":this.pageStart,"maxResults":this.pageSize,"operationType":4};
            this.selData(loadData);
        },
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typeWd='：'+val;
            }else{
                this.formSel.typeWd='';
            }
            this.pageStart=0;
            this.search();
        },
        orShow(visible){
            this.vs=visible;
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
            this.vs3=visible;
        },
        show(index,info){
            if(info!=null || info!=''){
                var arr = [];
                arr.push(this.data[index]);
                arr.push(info);
                this.$emit('listenTo',arr);
            }else{
                this.$emit('listenTo',index);
            }
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
        showResultProvice(resultdata){
            var list=resultdata.provinceList;
            if(list!=null || list!=undefined){
                for(var l in list){
                    this.provices.push(list[l].pName);
                }
            }
        },
        showresult(resultdata){
            var that=this;

            that.data=[];
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
                        detail['amiId']=relive.id;
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
                    that.data.push(detail);
                }
            }
        },
        selData(loadData){
            if(this.tabMsg=='tab2'){//商户列表
                this.columns=this.columns2;
                let resultdata = showData.showMerchant(loadData, this );
                //let resultdata=showData.showProvince(detail,this);
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
        search(){
            var loadData=this.loadData;
            loadData['content']={"firstResult":this.pageStart,"maxResults":this.pageSize,"operationType":4};
            if(this.formSel.input!=''){
                loadData.content['customName']=this.formSel.input;
            }
            if(this.formSel.typeWd!=''){
                var wd=this.formSel.typeWd.split('：');
                loadData.content['province']=wd[wd.length-1];
            }
            if(this.formSel.startVal!=''){
                var level=this.formSel.startVal.split('：');
                loadData.content['level']=level[level.length-1];
            }
            this.selData(loadData);
        },
        reset(){
            this.formSel.input='';
            this.formSel.typeWd='';
            this.formSel.startVal='';
            this.pageStart=0;
            this.search();
        },
        changePage(pageNum){
            this.pageStart = (pageNum - 1) * this.pageSize;
            this.search();
        },
    }
}
</script>