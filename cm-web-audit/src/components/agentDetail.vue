<template>
    <div class="creditUser">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="名称/姓名/手机号"></Input>
                        <Button type="success" @click="filterByname">查询</Button>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                                审核人员<span v-text="formSel.typePd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="-1|全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>
                                <DropdownItem name="1|xxx" :selected="formSel.typePd.indexOf('xxx')>-1">xxx</DropdownItem>
                                <DropdownItem name="2|李四" :selected="formSel.typePd.indexOf('李四')>-1">李四</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.typeSh!=''}">
                                分配状态<span v-text="formSel.typeSh"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="-1|全部" :selected="formSel.typeSh=='全部'">全部</DropdownItem>
                                <DropdownItem name="1|已分配" :selected="formSel.typeSh.indexOf('已分配')>-1">已分配</DropdownItem>
                                <DropdownItem name="0|未分配" :selected="formSel.typeSh.indexOf('未分配')>-1">未分配</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="申请时间" @on-change="dateChange"></DatePicker>
                        <Button @click="reset">重置</Button>
                    </FormItem>
                </Form>
                </Col>
                <Col :sm="2" :xs="24"><div class="float_right">
                    <Button type="success" @click="allChange"> 批量分配</Button>
                </div></Col>
            </Row>
            <div class="table_show">
            <Table border :columns="columns" :data="data" ref="table1" @on-select="selectChk" @on-select-cancel="selectChk" @on-selection-change="selectChk"></Table></div>
            <Row :gutter="16" v-if="pageWin>=768">
                <Col :sm="5" :xs="24">
                    <div class="total">共{{total}}页</div>
                </Col>
                <Col :sm="19" :xs="24" class="txt_right">
                    <Page :page-size="pageSize" :total="totalRecords" :current="1"  show-elevator @on-change="changePage"></Page>
                </Col>
            </Row>
            <Page v-else :total="totalRecords" :page-size="pageSize" simple @on-change="changePage"></Page>
    </div>

</template>

<script>
import showData from '../router/agentDetail.js';
import '../router/dateFormat.js';
export default {
    props:['userInfo','tabMsg'],
    data:function(){
        return{
            tbWidth:100,
            totalRecords:0,
            pageSize:5,
            vs:false,
            vs2:false,
            total:0,
            formSel:{
                input:'',
                typePd:'',
                typeSh:'',
                selectTm:[]
            },
            columns:[],
            data:[],
            selection:[],
            selAlct:[],
            filter_auditCutsId: -1,
            filter_auditStatus: -1,
            columns1: [
            {
                type:'selection',
                width:60,
                align:'center'
            },
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
                title: '分配状态',
                key: 'auditStatus'
            },
            {
                title: '审核人员',
                key: 'auditCutsName'
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
                            class:'btnAP',
                            on:{
                                click:() => {
                                    if(this.selAlct[params.index]==null || this.selAlct[params.index]==''){
                                        this.show(params.index);
                                    }else{
                                        return false;
                                    }
                                }
                            }
                        },'分配')
                    ])
                }
            }],
            columns2: [
            {
                type:'selection',
                width:60,
                align:'center'
            },
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
                title: '归属',
                key: 'belong'
            },
            {
                title: '省市',
                key: 'address'
            },
            {
                title: '分配状态',
                key: 'auditStatus'
            },
            {
                title: '审核人员',
                key: 'auditCutsName'
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
                            class:'btnAP',
                            on:{
                                click:() => {
                                    if(this.selAlct[params.index]==null || this.selAlct[params.index]==''){
                                        this.show(params.index);
                                    }else{
                                        return false;
                                    }
                                }
                            }
                        },'分配')
                    ])
                }
            }],
            columns3: [
            {
                type:'selection',
                width:60,
                align:'center'
            },
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
                title: '归属名称',
                key: 'belong'
            },
            {
                title: '分配状态',
                key: 'auditStatus'
            },
            {
                title: '审核人员',
                key: 'auditCutsName'
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
                            class:'btnAP',
                            on:{
                                click:() => {
                                    if(this.selAlct[params.index]==null || this.selAlct[params.index]==''){
                                        this.show(params.index);
                                    }else{
                                        return false;
                                    }
                                }
                            }
                        },'分配')
                    ])
                }
            }],
            columns4: [
            {
                type:'selection',
                width:60,
                align:'center'
            },
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
                title: '归属名称',
                key: 'belong'
            },
            {
                title: '分配状态',
                key: 'auditStatus'
            },
            {
                title: '审核人员',
                key: 'auditCutsName'
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
                            class:'btnAP',
                            on:{
                                click:() => {
                                    if(this.selAlct[params.index]==null || this.selAlct[params.index]==''){
                                        this.show(params.index);
                                    }else{
                                        return false;
                                    }
                                }
                            }
                        },'分配')
                    ])
                }
            }]
        }
    },
    created:function(){
        this.columns=this.columns1;
        this.loadData();
        
        if($(window).width()<768){

            var arr=this.columns;
            for(var i=0;i<arr.length;i++){
                arr[i]['width']=80;
            }
            arr[0]['fixed']='left';
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
        filterFunction(detail){

            if(this.tabMsg=='tab2'){//商户列表
                this.columns=this.columns2;
                let resultdata = showData.showMerchant(detail, this );
            }else if(this.tabMsg=='tab3'){//业务员列表
                this.columns=this.columns3;
                let resultdata = showData.showSalesPerson(detail, this );
            }else if(this.tabMsg=='tab4'){//店员列表
                this.columns=this.columns4;
                let resultdata = showData.showClerk(detail, this );
            }else{//代理商查询
                let resultdata = showData.showAgent(detail, this );
            }
        },
        filterByname(){


            var detail = {}
            detail = {
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":
                    {
                        "firstResult":0,
                        "maxResults":this.pageSize,
                        "operationType":1
                    }
            };
            if(this.filter_auditStatus != -1){
                detail['content']["auditStatus"] = this.filter_auditStatus;
            }if(this.filter_auditCutsId != -1){
                detail['content']["auditCutsId"] = this.filter_auditCutsId;
            }if(this.formSel.selectTm.length != 0){
                var selectedDateArr = this.formSel.selectTm;
                var startApplyTm = selectedDateArr[0].replace(/[/]/g,'-');
                var endApplyTm = selectedDateArr[1].replace(/[/]/g,'-');
                detail['content']["startApplyTm"] =  startApplyTm;
                detail['content']["endApplyTm"] =  endApplyTm;
            }


            if(this.formSel.input != ''){
                detail['content']["customName"] = this.formSel.input;
            }
            this.filterFunction(detail);
        },
        showMenu(name){
            console.log(this.formSel.selectTm.length)
            var nameArr = name.split('|');
            var val = nameArr[1].toString();
            this.filter_auditCutsId =  parseInt(nameArr[0]);
            var detail = {}
            var detail = {}
            detail = {
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":
                    {
                        "firstResult":0,
                        "maxResults":this.pageSize,
                        "operationType":1
                    }
            };
            if(this.filter_auditStatus != -1){
                detail['content']["auditStatus"] = this.filter_auditStatus;
            }if(this.formSel.input != ''){
                detail['content']["customName"] = this.formSel.input;
            }if(this.formSel.selectTm.length != 0){
                var selectedDateArr = this.formSel.selectTm;
                var startApplyTm = selectedDateArr[0].replace(/[/]/g,'-');
                var endApplyTm = selectedDateArr[1].replace(/[/]/g,'-');
                detail['content']["startApplyTm"] =  startApplyTm;
                detail['content']["endApplyTm"] =  endApplyTm;
            }
            console.log(this.formSel.selectTm)
            /**/


            if(val!='全部' && val!=''){
                this.formSel.typePd=' : '+val;
                if(this.filter_auditCutsId != -1){
                    detail['content']["auditCutsId"] = this.filter_auditCutsId;
                }
            }else{
                this.filter_auditCutsId = -1;
                this.formSel.typePd='';

            }

            this.filterFunction(detail);
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu2(name){

            console.log(name)
            var nameArr = name.split('|');
            var val = nameArr[1].toString();
            this.filter_auditStatus =  parseInt(nameArr[0]);
            var detail = {}
            detail = {
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":
                    {
                        "firstResult":0,
                        "maxResults":this.pageSize,
                        "operationType":1
                    }
            };
            if(this.filter_auditCutsId != -1){
                detail['content']["auditCutsId"] = this.filter_auditCutsId;
            }if(this.formSel.input != ''){
                detail['content']["customName"] = this.formSel.input;
            }if(this.formSel.selectTm.length != 0){
                var selectedDateArr = this.formSel.selectTm;
                var startApplyTm = selectedDateArr[0].replace(/[/]/g,'-');
                var endApplyTm = selectedDateArr[1].replace(/[/]/g,'-');
                detail['content']["startApplyTm"] =  startApplyTm;
                detail['content']["endApplyTm"] =  endApplyTm;
            }


            if(val!='全部' && val!=''){
                this.formSel.typeSh=' : '+val;
                detail['content']["auditStatus"] = this.filter_auditStatus;
            }else{
                this.filter_auditStatus = -1;
                this.formSel.typeSh='';
            }

            this.filterFunction(detail);

        },
        orShow2(visible){
            this.vs2=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
            var selectedDateArr = date;
            var startApplyTm = selectedDateArr[0].replace(/[/]/g,'-');
            var endApplyTm = selectedDateArr[1].replace(/[/]/g,'-');

            var detail = {}
            detail = {
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":
                    {
                        "firstResult":0,
                        "maxResults":this.pageSize,
                        "operationType":1
                    }
            };
            if(this.filter_auditCutsId != -1){
                detail['content']["auditCutsId"] = this.filter_auditCutsId;
            }if(this.formSel.input != ''){
                detail['content']["customName"] = this.formSel.input;
            }if(this.filter_auditStatus != -1){
                detail['content']["auditStatus"] = this.filter_auditStatus;
            }

            detail['content']["startApplyTm"] =  startApplyTm;
            detail['content']["endApplyTm"] =  endApplyTm;

            this.filterFunction(detail);

        },
        show(index){
            if(typeof(index) == 'number') {
                this.$emit('listenTo', this.data[index]);
            }else{
                this.$emit('listenTo', index);
            }
        },
        selectChk(selection){
            this.selection=selection;
        },
        allChange(){
            let arr=[];
            if(this.selection.length != 0) {
                this.selection.forEach((value,index,array) => {
                    this.data.forEach((v,i,a) => {
                        if(value.id == v.id){
                            arr.push(this.data[i]);
                        }
                    })
                });
                this.show(arr);
            }else{
                this.$Message.warning('请选择需分配行');
            }
        },
        changePage(pageNum){
            var detail = {}
            
            detail = {
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":
                    {
                        "firstResult": (pageNum - 1) * this.pageSize,
                        "maxResults":this.pageSize,
                        "operationType":1
                    }
            };
            if(this.filter_auditStatus != -1){
                detail['content']["auditStatus"] = this.filter_auditStatus;
            }if(this.filter_auditCutsId != -1){
                detail['content']["auditCutsId"] = this.filter_auditCutsId;
            }if(this.formSel.selectTm.length != 0){
                var selectedDateArr = this.formSel.selectTm;
                var startApplyTm = selectedDateArr[0].replace(/[/]/g,'-');
                var endApplyTm = selectedDateArr[1].replace(/[/]/g,'-');
                detail['content']["startApplyTm"] =  startApplyTm;
                detail['content']["endApplyTm"] =  endApplyTm;
            }if(this.formSel.input != ''){
                detail['content']["customName"] = this.formSel.input;
            }
            this.filterFunction(detail);

        },
        reset(){
            this.formSel.input='';
            this.formSel.typePd='';
            this.formSel.typeSh='';
            this.formSel.selectTm=[];

            this.filter_auditCutsId = -1;
            this.filter_auditStatus = -1;

            var detail = {}
            detail = {
                "custId":this.userInfo.id ,
                "custName":this.userInfo.name ,
                "content":
                    {
                        "firstResult":0,
                        "maxResults":this.pageSize,
                        "operationType":1
                    }
            };
            this.filterFunction(detail);
        },
        showresult(resultdata){
            let result = resultdata;
            this.data =[];


            if(result.total>0){
                this.total=Math.ceil((result.total/this.pageSize));
                this.totalRecords = result.total;
                var list=result.list;
                for(var i=0;i<list.length;i++){
                    var relive=list[i];
                    var detail={};
                        detail['id']=relive.id;
                    if(this.tabMsg=='tab1'){
                        detail['agentName']=relive.agentName;
                        detail['applyName']=relive.applyName;
                    }else if(this.tabMsg=='tab2'){
                        detail['id']=relive.amiId;
                        detail['merchantName']=relive.merchantName;
                        detail['applyName']=relive.applyName;
                    }else if(this.tabMsg=='tab3'){
                        detail['salesmanName']=relive.salesmanName;
                        detail['salesmanMobile']=relive.salesmanMobile;
                    }else if(this.tabMsg=='tab4'){
                        detail['clerkName']=relive.clerkName;
                        detail['clerkMobile']=relive.clerkMobile;
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

                    if(this.tabMsg=='tab1' || this.tabMsg=='tab2'){
                        detail['address']=relive.province+''+relive.city;
                    }else{
                        detail['applyIdCard']=relive.applyIdCard;
                    }

                    if(relive.auditStatus==0){
                        this.selAlct.push('');
                        detail['auditStatus']='未分配';
                    }else{
                        
                        this.selAlct.push('selAlct');
                        detail['auditStatus']='已分配';
                        detail['_disabled'] =  true;
                        detail['cellClassName'] = {
                            action: 'selAlct'
                        }
                    }
                    detail['applyMobile']=relive.applyMobile;
                    if(relive.auditCutsName!=null){
                        detail['auditCutsName']=relive.auditCutsName;
                    }else{
                        detail['auditCutsName']='无';
                    }
                    detail['applyTm'] = (new Date(relive.applyTm).Format("yyyy-MM-dd HH:mm:ss"))
                    this.data.push(detail);
                }
            }
        },
        loadData(){
            this.data=[];
            var detail = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"firstResult":0,"maxResults":this.pageSize,"operationType":1}};

            if(this.tabMsg=='tab2'){//商户列表
                this.columns=this.columns2;
                let resultdata = showData.showMerchant(detail, this );
            }else if(this.tabMsg=='tab3'){//业务员列表
                this.columns=this.columns3;
                let resultdata = showData.showSalesPerson(detail, this );
            }else if(this.tabMsg=='tab4'){//店员列表
                this.columns=this.columns4;
                let resultdata = showData.showClerk(detail, this );
            }else{//代理商查询
                let resultdata = showData.showAgent(detail, this );
            }
        }
    }
}
</script>
