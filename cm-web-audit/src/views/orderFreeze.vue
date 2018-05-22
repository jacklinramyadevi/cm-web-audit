<template>
  <div class="sections">
    <h1>已冻结订单</h1>
    <div class="pl_body">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                        <Button type="success" @click="">查询</Button>
                        <Dropdown rel="show3" trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                            <Button type="ghost" :class="{active:vs3,chk:formSel.typePs!=''}">
                                操作人<span v-text="formSel.typePs"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <!-- <DropdownItem name="全部" :selected="formSel.typePs=='全部'">全部</DropdownItem> -->
                                <DropdownItem v-for="(p,index) in persons" :key="index" :name="index" :selected="formSel.typePs.indexOf('{{p.name}}')>-1">{{p.name}}</DropdownItem>
                                <!-- <DropdownItem name="李四" :selected="formSel.typePs.indexOf('李四')>-1">李四</DropdownItem> -->
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.typeAd!=''}">
                                归属<span v-text="formSel.typeAd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typeAd=='全部'">全部</DropdownItem>
                                <DropdownItem name="新乡市宝奇" :selected="formSel.typeAd.indexOf('新乡市宝奇')>-1">新乡市宝奇</DropdownItem>
                                <DropdownItem name="小小数码店" :selected="formSel.typeAd.indexOf('小小数码店')>-1">小小数码店</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        
                        <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="冻结时间" @on-change="dateChange"></DatePicker>
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
                <Page :total="total" show-elevator @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="total" simple @on-change="changePage"></Page>
    </div>

    
    <Modal v-model="model1" title="解冻订单" class="noFooter noHeight" width="600" @on-cancel="closeModal('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr">
            <FormItem prop="txtFr">
                <Input type="textarea" v-model="formFr.txtFr" :rows="6" :maxlength="200" placeholder="输入解冻的理由" @on-keyup="txtKeyup('formFr')"></Input>
                <div class="submitDesc"><span v-text="formFr.descCount"></span><Button type="success" @click="">提交</Button></div>
            </FormItem>
         </Form>
         <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>

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
  data () {
    return {
        model1:false,
        vs2:false,
        vs3:false,
        tbWidth:100,
        total:100,
        formSel:{
            input:'',
            typeAd:'',
            typePs:'',
            selectTm:[]
        },
        formFr:{
            txtFr:'',
            descCount:'',
            descNm:0
        },
        ruleFr:{
            descLength:200,
            txtFr:[
                {validator:validateLen,trigger:'blur'}
            ]
        },
        columns1: [
        {
            title: '借款编号',
            key: 'userId'
        },
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '手机号',
            key: 'agent'
        },
        {
            title: '借款时间',
            key: 'createdTm',
            width:104
        },
        {
            title: '订单金额',
            key: 'createdMn'
        },{
            title: '贴息金额',
            key: 'upsetName'
        },
        {
            title: '归属',
            key: 'status'
        },{
            title: '操作人',
            key: 'creditPs'
        },
        {
            title: '冻结时间',
            key: 'freezeTm',
            width:104
        },
        {
            title: '冻结原因',
            key: 'freezeWhy'
        },
        {
            title: '操作',
            key: 'action',
            width: 110,
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
                    }, '解冻订单')
                ]);
            }
        }],
        data1: [{
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdTm: '2017-07-12 12:12:11',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                freezeTm:'2017-05-12  12:12:23',
                freezeWhy:'订单需要核实'
            },
            {
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdTm: '2017-07-12 12:12:11',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                freezeTm:'2017-05-12  12:12:23',
                freezeWhy:'订单需要核实'
            },
            {
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdTm: '2017-07-12 12:12:11',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                freezeTm:'2017-05-12  12:12:23',
                freezeWhy:'订单需要核实'
            },
            {
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdTm: '2017-07-12 12:12:11',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                freezeTm:'2017-05-12  12:12:23',
                freezeWhy:'订单需要核实'
            },
            {
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdTm: '2017-07-12 12:12:11',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                freezeTm:'2017-05-12  12:12:23',
                freezeWhy:'订单需要核实'
            }],
            persons:[{name:'张一河',code:'1'},{name:'张三',code:'2'}]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=90;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        showMenu2(val){
            if(val!='全部' && val!=''){
                this.formSel.typeAd=' : '+val;
            }else{
                this.formSel.typeAd='';
            }
        },
        orShow2(visible){
            this.vs2=visible;
        },
        showMenu3(val){
            /*console.log(this.persons[val].name+'----'+this.persons[val].code)*/
            if(val!='全部' && val!=''){
                this.formSel.typePs=' : '+this.persons[val].name;
            }else{
                this.formSel.typePs='';
            }
        },
        orShow3(visible){
            this.vs3=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData (type) {
        },
        changePage(){
            /*this.data1=this.*/
        },
        show(index){
            this.formFr.descNm=0;
            this.formFr.txtFr='';
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            this.model1=true;
        },
        txtKeyup(name){
            var val=this.formFr.txtFr;
            this.formFr.descNm=val.length;
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error(valid.message);
                }
            });
        },
        closeModal(name){
            this.$refs[name].resetFields();
        },
        reset(){
            this.formSel.input='';
            this.formSel.typeAd='';
            this.formSel.typePs='';
            this.formSel.selectTm=[];
        }
    }
}
</script>
