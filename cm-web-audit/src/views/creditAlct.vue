<template>
  <div class="sections">
    <h1>分配</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="复活人账号/姓名"></Input>
                        <Button type="success" @click="selectReliveByName">查询</Button><Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                                审核人员<span v-text="formSel.typePd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>
                                <DropdownItem name="张三" :selected="formSel.typePd.indexOf('张三')>-1">张三</DropdownItem>
                                <DropdownItem name="李四" :selected="formSel.typePd.indexOf('李四')>-1">李四</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.typeSh!=''}">
                                分配状态<span v-text="formSel.typeSh"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部"  :selected="formSel.typeSh=='全部'">全部</DropdownItem>
                                <DropdownItem name="已分配" :selected="formSel.typeSh.indexOf('已分配')>-1">已分配</DropdownItem>
                                <DropdownItem name="未分配" :selected="formSel.typeSh.indexOf('未分配')>-1">未分配</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                            <Button type="ghost" :class="{active:vs3,chk:formSel.typeChn!=''}">
                                渠道<span v-text="formSel.typeChn"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list" >
                                <DropdownItem name="全部" :name="-1"  :selected="formSel.typeChn=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(channel,index) in channelData" :name="index"  :key="channel.code"  :selected="formSel.typeChn=='{{channel.name}}'">{{channel.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="申请时间" @on-change="dateChange"></DatePicker>
                        <Button @click="reset">重置</Button>
                    </FormItem>
                </Form>
                </Col>
                <Col :sm="2" :xs="24"><div class="float_right">
                <Button type="success" @click="model1=!model1">批量分配</Button>
            </div></Col>
        </Row>
        <div class="table_show">
        <Table border :columns="columns1" :data="data1" ref="table"></Table></div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="pageTotal" show-elevator @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="pageTotal" simple @on-change="changePage"></Page>
    </div>

    <Modal v-model="model1" title="选择审核人员">
         <Form :model="formChange">
             <FormItem>
                <Select v-model="formChange.name" placeholder="选择审核人员">
                    <Option value="张三">张三</Option>
                    <Option value="李四">李四</Option>
                </Select>
            </FormItem>
         </Form>
    </Modal>
  </div>
</template>

<script>

import axios from 'axios';
import {formatDate} from  '../router/data.js';

export default {
  name: 'sections',
  data () {
    return {
        model1:false,
        model2:false,
        model3:false,
        model4:false,
        vs:false,
        vs2:false,
        vs3:false,
        tbWidth:100,
        total:0,
        pageTotal:0,
        maxResult:10,
        curNm:0,
        formSel:{
            input:'',
            typePd:'',
            typeSh:'',
            typeChn:'',
            selectTm:[],
            channelCode:''
        },
        formChange:{
            name:''
        },
        columns1: [
        {
            type:'selection',
            width:60,
            align:'center'
        },{
            title: '客户账号',
            key: 'mobileNumber'
        },
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '所属代理商',
            key: 'agentBusName'
        },
        {
            title: '申请额度',
            key: 'applyQuota'
        },{
            title: '提交人',
            key: 'upsetName'
        },
        {
            title: '渠道',
            key: 'source'
        },
        {
            title: '申请时间',
            key: 'crtTm',
            width:104
        },
        {
            title: '分配状态',
            key: 'isSigned'
        },
        {
            title: '审核人',
            key: 'approveUser'
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
                                this.show(params.index);
                            }
                        }
                    }, '分配')
                ]);
            }
        }],
        data1: [],
        channelData :[]

        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[0]['width']=60;
            arr[0]['fixed']='left';
            arr[arr.length-1]['width']=60;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
        this.showContent();
        this.channelMethod();
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typePd=' : '+val;
            }else{
                this.formSel.typePd='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu2(val){
            if(val!='全部' && val!=''){
                this.formSel.typeSh=' : '+val;
            }else{
                this.formSel.typeSh='';
            }

            this.showContent();

        },
        orShow2(visible){
            this.vs2=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
            this.showContent();
        },
        showMenu3(val){
            if(val != -1){
                var name = this.channelData[val].name;
                var code = this.channelData[val].code;
                if(name!='全部' && name!=''){
                    this.formSel.typeChn=' : '+name;
                    this.formSel.channelCode = code;
                }else{
                    this.formSel.typeChn='';
                    this.formSel.channelCode = '';
                }
            }else{
                 this.formSel.typeChn='';
                 this.formSel.channelCode = '';
            }

            this.showContent();

        },
        orShow3(visible){
            this.vs3=visible;
        },
        exportData (type) {
        },
        changePage(val){
            var pageNo = ((val -1) * this.maxResult) + 1;
            this.curNm = pageNo;
            this.showContent();
        },
        show(index){
            this.model1=true;
        },
        reset(){
            this.formSel.input='';
            this.formSel.typePd='';
            this.formSel.typeSh='';
            this.formSel.typeChn='';
            this.formSel.selectTm=[];
            this.formSel.channelCode = '';

            this.showContent();
        } ,
        showContent() {
            var param = [];
            param.push('"firstResult":' + this.curNm);
            param.push('"maxResult":' + this.maxResult);
            param.push('"status":[0]');

            var that = this;
            
            var inputName = that.formSel.input;
            if(inputName != null && inputName != ''){
                param.push('"name":"' + inputName + '"');
            }

            if(this.formSel.typeSh.indexOf('已分配') > -1) {
                param.push('"isAssign":1');
            }else if(this.formSel.typeSh.indexOf("未分配") > -1){
                param.push('"isAssign":0');
            }

           
            if(that.formSel.channelCode != '') {                
                param.push('"source":"'+ that.formSel.channelCode +'"');
            }

            if(that.formSel.selectTm.length >=2) {
                param.push('"startTime":"'+ that.formSel.selectTm[0] +'"');
                param.push('"endTime":"'+ that.formSel.selectTm[1] +'"');
            }

            axios.post("/audit/relive",   `param={${param.join(",")}}`,{
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(resp){
                    if(!!resp.data.result) {
                        var result = resp.data.result;
                        that.data1 = [];
                        if(result.totalCount > 0) {
                            that.total = Math.ceil(( result.totalCount / 10));
                            that.pageTotal = result.totalCount;
                            for(var i = 0 ; i < result.reliveList.length ; i++) {
                                var relive = result.reliveList[i];
                            
                                that.data1.push({
                                    "mobileNumber":relive.mobileNumber,
                                    'name':relive.name,
                                    'agentBusName':relive.agentBusName,
                                    'applyQuota':relive.applyQuota,
                                    'upsetName':'未知',
                                    'source':relive.source,
                                    'crtTm': formatDate(new Date(relive.crtTm) , 'yyyy-MM-dd hh:mm:ss'),
                                    'isSigned':relive.isAssign == 0 ? '未分配':'已分配',
                                    'approveUser':relive.approveUser
                                });
                            }            
                        } else{

                        }           
                    }
                }).catch(function(resp){
                    that.$Message.warning("系统异常");
                });
        },
        selectReliveByName (){
            if(!/^[\W\w]+$/.test(this.formSel.input)){
                this.$Message.warning("请先输入要查询的信息");
                return;
            }
            this.showContent();
        },
        channelMethod () {
            var that = this;
            axios.post('/audit/channel',{
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(resp){
                    if(!!resp.data.result) {
                        var result = resp.data.result;
                        that.channelData = [];
                        for(var i = 0 ; i < result.length ; i++) {
                            that.channelData.push({
                                'name':result[i].name,
                                'code':result[i].code
                            });
                        }
                    }
                });
        },formateDate(fmt) {

        }
    }
}
</script>
