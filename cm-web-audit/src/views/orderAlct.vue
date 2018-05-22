<template>
  <div class="sections">
    <h1>分配</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                        <Button type="success" @click="loanContent(1)">查询</Button>

                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                                产品类型<span v-text="formSel.typePd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>
                                <DropdownItem name="消费贷" :selected="formSel.typePd.indexOf('消费贷')>-1">消费贷</DropdownItem>
                                <DropdownItem name="现金贷" :selected="formSel.typePd.indexOf('现金贷')>-1">现金贷</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                            <Button type="ghost" :class="{active:vs3,chk:formSel.typeSh!=''}">
                                分配状态<span v-text="formSel.typeSh"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typeSh=='全部'">全部</DropdownItem>
                                <DropdownItem name="已分配" :selected="formSel.typeSh.indexOf('已分配')>-1">已分配</DropdownItem>
                                <DropdownItem name="未分配" :selected="formSel.typeSh.indexOf('未分配')>-1">未分配</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu4" @on-visible-change="orShow4">
                            <Button type="ghost" :class="{active:vs4,chk:formSel.typePs!=''}">
                                审核人员<span v-text="formSel.typePs"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typePs=='全部'">全部</DropdownItem>
                                <DropdownItem name="1:系统" :selected="formSel.typePs.indexOf('张三')>-1">系统</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <DatePicker :value="formSel.selectTm" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="借款时间" @on-change="dateChange"></DatePicker>
                        <Button @click="reset">重置</Button>
                    </FormItem>
                </Form>
                </Col>
                <Col :sm="2" :xs="24"><div class="float_right">
                <Button type="success" @click="model1=!model1">批量分配</Button>
            </div></Col>
        </Row>
        <div class="table_show">
        <Table border :columns="columns1" :data="data1" ref="table" @on-selection-change="selectAll"></Table></div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}条</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="pageTotal" show-elevator @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="pageTotal" simple @on-change="changePage"></Page>
    </div>

    <Modal v-model="model1" title="选择审核人员" @on-ok="toFP">
         <Form :model="formChange">
             <FormItem>
                <Select v-model="formChange.name" placeholder="选择审核人员">
                    <Option value=1>系统</Option>
                </Select>
            </FormItem>
         </Form>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios';
import showData from '../router/dateFormat.js';

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
        vs4:false,
        tbWidth:100,
        total:0,
        pageTotal:0,
        orderShow:[],
        formSel:{
            input:'',
            typePd:'',
            typeSh:'',
            typePs:'',
            selectTm:[]
        },
        orderList:[],
        formChange:{
            name:''
        },
        columns1: [
        {
            type:'selection',
            width:60,
            align:'center'
        },{
            title: '借款编号',
            key: 'loanNum'
        },
        {
            title: '客户姓名',
            key: 'custNm'
        },
        {
            title: '手机号',
            key: 'custMbl'
        },
        {
            title: '所属省市',
            key: 'province'
        },{
            title: '产品类型',
            key: 'consumeType'
        },
        {
            title: '借款时间',
            key: 'crtTm'
        },
        {
            title: '分配状态',
            key: 'isAssign'
        },
        {
            title: '审核人员',
            key: 'apprvNm'
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
                        class:this.orderShow[params.index],
                        on: {
                            click: () => {
                                this.show(params.row);
                            }
                        }
                    }, '分配')
                ]);
            }
        }],
        data1: [{
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                channel: '内蒙',
                createdTm: '2017-07-12 12:12:11',
                power: '未分配',
                adudit: '未分配'
            }]
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
        this.loanContent(1);
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
                if(val.indexOf('消费贷') > -1) {
                    this.formSel.typePdValue = 0;
                }else if(val.indexOf('现金贷') > -1) {
                    this.formSel.typePdValue = 1;
                }
                
            }else{
                this.formSel.typePd='';
                this.formSel.typePdValue = '';
            }

            this.loanContent(1);
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu3(val){
            if(val!='全部' && val!=''){
                this.formSel.typeSh=' : '+val;
                if(val.indexOf("未分配") > -1) {
                    this.formSel.typeShValue = 0;
                }else if(val.indexOf("已分配") > -1){
                    this.formSel.typeShValue = 1;
                }
                
            }else{
                this.formSel.typeSh='';
                this.formSel.typeShValue= '';
            }

            this.loanContent(1);
        },
        orShow3(visible){
            this.vs3=visible;
        },
        showMenu4(val){
            if(val!='全部' && val!=''){
                this.formSel.typePs=' : '+val;
                this.formSel.typePsValue = val.split(":")[0];
            }else{
                this.formSel.typePs='';
                this.formSel.typePsValue = '';
            }
        },
        orShow4(visible){
            this.vs4=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData (type) {
        },
        changePage(page){
            /*this.data1=this.*/
            this.loanContent(page);
        },
        show(row){
            this.model1=true;
            this.orderList = [];
            this.orderList.push(row.flowNo);   
            console.log(this.orderList);  
        },
        reset(){
            this.formSel.input='';
            this.formSel.typePd='';
            this.formSel.typeSh='';
            this.formSel.typePs='';
            this.formSel.selectTm=[];
            this.formSel.typePdValue = '';
            this.formSel.typeShValue = '';

            this.loanContent(1);
        },
        loanContent(page){
            var firstResult = (parseInt(page) - 1) * 10;
            var maxResults = firstResult + 10;
            var that=this;
            var detail = {"content":{"value":that.formSel.input,"type":that.formSel.typePdValue,
                                     "allotStatus":that.formSel.typeShValue,"apprvId":that.formSel.typePsValue,
                                     "loanStartTime":that.formSel.selectTm[0],"loanEndTime":that.formSel.selectTm[1],
                                     "firstResult":firstResult,"maxResults":maxResults , "status":[0] , "isAssign":that.formSel.typeShValue}};

            axios.post('/audit/order/selectOrder',JSON.stringify(detail),
                 {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
                    if(!!resp.data.result){
                        var result=resp.data.result;
                        
                        that.total = Math.ceil(( result.total / 10));
                        that.pageTotal = result.total;

                        var detail = [];
                         result.orderRecordList.forEach(function(obj) {
                             obj.province = obj.province + obj.city;
                             if(obj.consumeType == 0){
                                 obj.consumeType = "消费贷";
                             }else if(obj.consumeType == 1){
                                 obj.consumeType = "现金贷";
                             }
                             if(obj.isAssign == 0){
                                 obj.isAssign = "未分配";
                             }else if(obj.isAssign != null){
                                 obj.isAssign = "已分配";
                             }
                             if(obj.status != 0){
                                 that.orderShow.push('orderShow');
                                 obj._disabled = true;
                             }else{
                                 that.orderShow.push('');
                             }

                            obj.crtTm = new Date(obj.crtTm).Format('yyyy-MM-dd HH:mm:ss');

                         }, this);
                        that.data1 = result.orderRecordList;

                    }
            }).catch(function(resp){
                that.$Message.warning('系统异常');
            });
        },
        selectAll(data){
             this.orderList = [];
             if(data.length != 0){
                data.forEach(function(obj) {
                    this.orderList.push(obj.flowNo);        
                }, this);
             }
        },
        toFP(){
            var that=this;
            if(this.orderList.length == 0){
                that.$Message.warning('请勾选统订单！');
                return;
            }
            var detail = {"content":{"apprvId":1,"apprvNm":"系统",
                                     "orderList":this.orderList}};
            axios.post('/audit/order/orderAllot',JSON.stringify(detail),
                 {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
                    if(resp.data.resCode == "1"){
                         that.model1=false;
                         that.loanContent(1);
                    }
            }).catch(function(resp){
                that.$Message.warning('系统异常');
            });
        }
    }
}
</script>
<style>
    .orderShow{display:none;}
</style>