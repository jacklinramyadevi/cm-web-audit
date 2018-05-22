<template>
    <div class="creditUser">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="名称/姓名/手机号" @on-keyup="search"></Input>
                        <Button type="success" @click="search">查询</Button>
                        <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="申请时间" @on-change="dateChange"></DatePicker>
                        <!-- <Dropdown trigger="click" v-if="tabMsg=='tab2'" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.typeChn!=''}">
                                尽调<span v-text="formSel.typeChn"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list" >
                                <DropdownItem name="全部" :name="-1" :selected="formSel.typeChn=='全部'">全部</DropdownItem>
                                <DropdownItem name="未尽调"  :selected="formSel.typeChn.indexOf('未尽调')>-1">未尽调</DropdownItem>
                                <DropdownItem name="已尽调"  :selected="formSel.typeChn.indexOf('已尽调')>-1">已尽调</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> -->
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
            pageSize:3,
            vs:false,
            vs2:false,
            formSel:{
                input:'',
                typeChn:'',
                selectTm:[]
            },
            columns:[],
            data:[],
            selection:[],
            operationType:2,
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
                        },'审核')
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
            /*{
                title: '尽调',
                key: 'move'
            },*/
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
                        },'审核')
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
                        },'审核')
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
                        },'审核')
                    ])
                }
            }],
            vs:false
        }
    },
    created:function(){
        this.columns=this.columns1;
        this.pageStart=0;
        this.loadPage();
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
            let loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"firstResult":this.pageStart,"maxResults":this.pageSize,"operationType":this.operationType}};
            this.selData(loadData);
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
        dateChange(date){
            if(date[0]==''){
                date=[];
            }
            this.formSel.selectTm=date;
            this.search();
        },
        show(index){
            var arr=this.data[index];
            this.$emit('listenTo',arr);
        },
        changePage(pageNum){
            this.pageStart=(pageNum - 1) * this.pageSize;
            this.search();
        },
        showMenu(val){
           if(val != -1){
                //var name = this.channelData[val].name;
                //var code = this.channelData[val].code;
                if(name!='全部' && name!=''){
                    this.formSel.typeChn=' : '+name;
                    //this.formSel.channelCode = code;
                }else{
                    this.formSel.typeChn='';
                    //this.formSel.channelCode = '';
                }
            }else{
                 this.formSel.typeChn='';
                 //this.formSel.channelCode = '';
            }

            this.showContent();

        },
        orShow(visible){
            this.vs=visible;
        },
        showresult(result){
            this.data=[];

            if(result.total>0){
                var list=result.list;
                this.total=Math.ceil((result.total/this.pageSize));
                this.totalRecords = result.total;
                for(var i=0;i<list.length;i++){
                    var relive=list[i];
                    var detail={};
                        detail['id']=relive.id;
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
                    }else if(this.tabMsg=='tab4'){
                        detail['clerkName']=relive.clerkName;
                        detail['clerkMobile']=relive.clerkMobile;
                    }
                    if(this.tabMsg!='tab1'){
                        detail['applyIdCard']=relive.applyIdCard;
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
                    detail['auditFlowNo']=relive.auditFlowNo;
                    var dates=relive.applyTm;
                    var dateShow=new Date(dates).Format('yyyy-MM-dd HH:mm:ss');
                    detail['applyTm']=dateShow;
                    this.data.push(detail);
                }
            }
        },
        search(){
            let loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"firstResult":this.pageStart,"maxResults":this.pageSize,"operationType":this.operationType}};
            if(this.formSel.input!=''){
                loadData.content['customName']=this.formSel.input;
            }
            if(this.formSel.selectTm.length>0){
                var startApplyTm=new Date(this.formSel.selectTm[0]).Format('yyyy-MM-dd HH:mm:ss');
                var endApplyTm=new Date(this.formSel.selectTm[1]).Format('yyyy-MM-dd HH:mm:ss');
                loadData.content['startApplyTm']=startApplyTm;
                loadData.content['endApplyTm']=endApplyTm;
            }
           
            this.selData(loadData);
        },
        reset(){
            this.formSel.input='';
            this.formSel.typeChn='';
            this.formSel.selectTm=[];
            this.pageStart=0;
            this.search();
        },
    }
}
</script>