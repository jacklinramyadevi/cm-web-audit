<template>
  <div class="sections">
    <h1>二次营销</h1>
    <div class="pl_body">
        <Form :model="formSel" class="downMenu">
            <FormItem>
                <Input v-model="formSel.input" icon="ios-search" placeholder="客户姓名/手机号"></Input>
                <Button type="success" @click="">查询</Button>
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

    
    <Modal v-model="model1" title="提升额度" class="noFooter noHeight" width="900" @on-cancel="handleReset('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr">
            <FormItem prop="txtMoney">
                <Input v-model="formFr.txtMoney" class="moneyIpt" placeholder="输入额度"></Input><Icon type="social-yen"></Icon>
            </FormItem>
            <FormItem>
                <Select v-model="formFr.type">
                    <Option value="消费分期">消费分期</Option>
                    <Option value="乐薪分期">乐薪分期</Option>
                </Select>
            </FormItem>
            <FormItem prop="txtFr">
                <Input type="textarea" v-model="formFr.txtFr" :rows="6" :maxlength="200" placeholder="输入提额原因" @on-keyup="txtKeyup('formFr')"></Input>
                <div class="submitDesc"><span v-text="formFr.descCount"></span></div>
            </FormItem>
            <Button type="success" @click="">确定</Button>
            <Button type="ghost" @click="handleReset('formFr')">取消</Button>
         </Form>
         <h3 style="line-height:36px;margin-top:20px;">提额记录</h3>
         <Table border :columns="columns2" :data="data2"></Table>

         <h3 style="line-height:36px;margin-top:20px;">借款信息</h3>
         <Table border :columns="columns3" :data="data3"></Table>

         <h3 style="line-height:36px;margin-top:20px;">还款计划</h3>
         <Table border :columns="columns4" :data="data4"></Table>
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
        tbWidth:100,
        total:100,
        formSel:{
            input:'',
        },
        formFr:{
            txtMoney:'',
            type:'消费分期',
            txtFr:'',
            descCount:'',
            descNm:0
        },
        ruleFr:{
            descLength:200,
            txtMoney:[
                {required:true,message:'额度不能为空',trigger:'blur'}
            ],
            txtFr:[
                {validator:validateLen,trigger:'blur'}
            ]
        },
        columns1: [
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '手机号',
            key: 'agent'
        },
        {
            title: '可提现额度',
            key: 'createdTm'
        },
        {
            title: '可消费额度',
            key: 'createdMn'
        },{
            title: '总额度',
            key: 'upsetName'
        },
        {
            title: '授信时间',
            key: 'createdTm',
            width:104
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
                    }, '提升额度')
                ]);
            }
        }],
        data1: [{
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                createdTm: '2017-07-12 12:12:11'
            },
            {
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                createdTm: '2017-07-12 12:12:11'
            },
            {
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                createdTm: '2017-07-12 12:12:11'
            },
            {
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                createdTm: '2017-07-12 12:12:11'
            },
            {
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                createdTm: '2017-07-12 12:12:11'
            }],
            columns2:[{
                title:'原提现/消费额度',
                key:'money'
            },{
                title:'原产品名称',
                key:'product'
            },{
                title:'现提现额度',
                key:'moneyNow'
            },{
                title:'现产品名称',
                key:'productNow'
            },{
                title:'提额原因',
                key:'why'
            },{
                title:'提额时间',
                key:'time',
                width:'104'
            },{
                title:'操作人',
                key:'person'
            }],
            data2:[{
                money:'￥5000',
                product:'乐薪分期',
                moneyNow:'￥10000',
                productNow:'乐车分期',
                why:'额度不够用',
                time:'2017-08-03 12:21:23',
                person:'13655555555（张一新）'
            }],
            columns3:[{
                title:'产品名称',
                key:'money'
            },{
                title:'借款金额',
                key:'product'
            },{
                title:'借款时间',
                key:'moneyNow'
            },{
                title:'借款期限',
                key:'productNow'
            },{
                title:'状态',
                key:'why'
            }],
            data3:[{
                money:'￥5000',
                product:'乐薪分期',
                moneyNow:'￥10000',
                productNow:'乐车分期',
                why:'额度不够用'
            }],
            columns4:[{
                title:'期数',
                key:'dates'
            },{
                title:'应还时间',
                key:'repayTm',
                width:104
            },{
                title:'应还总额',
                key:'repayCountMn'
            },{
                title:'应还本金',
                key:'repayMn'
            },{
                title:'应还利息',
                key:'repayDs'
            },{
                title:'应还服务费',
                key:'repaySv'
            },{
                title:'应还罚息',
                key:'repayLt'
            },{
                title:'应还违约金',
                key:'repayDis'
            },{
                title:'实还时间',
                key:'repayTmRl'
            },{
                title:'实还总额',
                key:'repayMnCountRl'
            },{
                title:'实还本金',
                key:'repayMnRl'
            },{
                title:'实还利息',
                key:'repayDsRl'
            },{
                title:'实还服务费',
                key:'repaySvRl'
            },{
                title:'实还罚息',
                key:'repayLtRl'
            },{
                title:'实还违约金',
                key:'repayDisRl'
            },{
                title:'状态',
                key:'repayStatus'
            }],
            data4:[{
                dates:1,
                repayTm:'2017-08-08',
                repayCountMn:'500.00',
                repayMn:'500.00',
                repayDs:'500.00',
                repaySv:'500.00',
                repayLt:'500.00',
                repayDis:'500.00',
                repayTmRl:'500.00',
                repayMnCountRl:'500.00',
                repayMnRl:'500.00',
                repayDsRl:'500.00',
                repaySvRl:'500.00',
                repayLtRl:'500.00',
                repayDisRl:'500.00',
                repayStatus:'已还款'
            },
            {
                dates:2,
                repayTm:'2017-08-08',
                repayCountMn:'500.00',
                repayMn:'500.00',
                repayDs:'500.00',
                repaySv:'500.00',
                repayLt:'500.00',
                repayDis:'500.00',
                repayTmRl:'500.00',
                repayMnCountRl:'500.00',
                repayMnRl:'500.00',
                repayDsRl:'500.00',
                repaySvRl:'500.00',
                repayLtRl:'500.00',
                repayDisRl:'500.00',
                repayStatus:'已还款'
            }]
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
        exportData (type) {
        },
        changePage(){
            /*this.data1=this.*/
        },
        show(index){
            this.formFr.descNm=0;
            this.formFr.txtMoney='';
            this.formFr.type='消费分期';
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
        handleReset(name){
            this.$refs[name].resetFields();
        },
        reset(){
            this.formSel.input='';
        }
    }
}
</script>
