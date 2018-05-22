<template>
    <div class="creditUser tbCredit">
        <Row><Col :sm="6"><h3>申请信息</h3></Col>
        <Col :sm="18"><div class="float_right" v-if="tbData1.length>0 && !tbData1[0].finish">
                <Button type="primary" @click="showModel('线上',tbData1[0])">线上扣款</Button>
                <Button type="primary" @click="showModel('线下',tbData1[0])">线下还款</Button>
                <Button type="ghost" @click="showModel('明细',tbData1[0])">还款明细</Button>
                <Button type="ghost" @click="showModel('计划',tbData1[0])">还款计划</Button>
                <!-- <Button type="ghost">查看合同</Button> -->
            </div></Col></Row>
        <div class="table_show" v-if="tbData1.length>0" v-for="(t,i) in tbData1" :key="i">
            <div class="float_right" v-if="i!=0 && !t.finish" style="padding-bottom:10px;">
                <Button type="primary" @click="showModel('线上',t)">线上扣款</Button>
                <Button type="primary" @click="showModel('线下',t)">线下还款</Button>
                <Button type="ghost" @click="showModel('明细',t)">还款明细</Button>
                <Button type="ghost" @click="showModel('计划',t)">还款计划</Button>
                <!-- <Button type="ghost">查看合同</Button> -->
            </div>
            <table class="headerTb" border="0" cellpadding="0" cellspacing="0" :class="{orderFinish:t.finish}">
                <tr v-for="c in t.value">
                    <td class="txt_center" v-html="c[0].title"></td><td v-html="c[0].val"></td>
                    <td class="txt_center" v-html="c[1].title"></td><td v-html="c[1].val"></td>
                </tr>
            </table>
        </div>

        
    </div>

</template>

<script>
import '../router/dateFormat.js';
import showData from '../router/csmsData.js';

export default {
    props:['tabMsg','selPhone'],
    data:function(){
        return{
            tbWidth:100,
            total:0,
            totalRecords:0,
            pageStart:0,
            pageSize:10,
            vs:false,
            vs2:false,
            formSel:{
                input:'',
                typeChn:'',
                selectTm:[]
            },
            tbData1: [
                    /*{finish:false,value:[[{title:'产品名称',val:'小美钱包'},
                    {title:'订单状态',val:'放款中'}],
                    [{title:'借款金额',val:'￥20000.00'},
                    {title:'放款金额',val:'￥20000.00'}],
                    [{title:'借款时间',val:'2017-09-06 14:12:21'},
                    {title:'放款时间',val:'2017-09-06 14:12:21'}],
                    [{title:'分期基数',val:'12'},
                    {title:'首付金额',val:'￥500.00'}],
                    [{title:'年化利率',val:'13%'},
                    {title:'备注',val:''}]]},

                    {finish:true,value:[[{title:'产品名称',val:'小美钱包'},
                    {title:'订单状态',val:'放款中'}],
                    [{title:'借款金额',val:'￥20000.00'},
                    {title:'放款金额',val:'￥20000.00'}],
                    [{title:'借款时间',val:'2017-09-06 14:12:21'},
                    {title:'放款时间',val:'2017-09-06 14:12:21'}],
                    [{title:'分期基数',val:'12'},
                    {title:'首付金额',val:'￥500.00'}],
                    [{title:'年化利率',val:'13%'},
                    {title:'备注',val:''}]]},*/
                ],
        }
    },
    created:function(){
        var detail={"data":{"value":this.selPhone}};
        showData.getOrderList(detail,this);

    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    watch:{
        tabMsg:function(val){
            if(val=='tab4'){
                this.tbData1=[];
                var detail={"data":{"value":this.selPhone}};
                showData.getOrderList(detail,this);
            }
        },
        selPhone:function(val){
            var detail={"data":{"value":val}};
            showData.getOrderList(detail,this);
        }
    },
    methods: {
        loadPage(){
            /*let loadData = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"firstResult":this.pageStart,"maxResults":this.pageSize,"operationType":this.operationType}};
            this.selData(loadData);*/
        },
        showModel(title,detail){
            this.$emit('listenTo',{'title':title,'data':detail});
        },
        getOrderList(result){
            this.tbData1=[];

            var list=result;
            if(list.length>0){
                for(var i in list){
                    var data={};
                    var status='';
                    data['finish']=false;//该订单未完成
                    data['loanNo']=list[i].loanNo;
                    if(list[i].status==0){
                        status='等待放款';
                    }else if(list[i].status==1){
                        status='放款成功';
                    }else if(list[i].status==2){
                        data['finish']=true;
                        status='放款失败';
                    }else if(list[i].status==3){
                        data['finish']=true;
                        status='合同取消';
                    }else if(list[i].status==4){
                        data['finish']=true;
                        status='合同结清';
                    }else if(list[i].status==5){
                        status='放款处理中';
                    }else if(list[i].status==6){
                        status='发标中';
                    }else if(list[i].status==7){
                        status='发标成功';
                    }else if(list[i].status==8){
                        data['finish']=true;
                        status='发标失败';
                    }else if(list[i].status==9){
                        data['finish']=true;
                        status='满标';
                    }else if(list[i].status==10){
                        data['finish']=true;
                        status='未放款撤单';
                    }else if(list[i].status==11){
                        status='测试订单';
                    }
                    data['value']=[];
                    data['value'].push([{title:'产品名称',val:list[i].channelName},
                        {title:'订单状态',val:status}],
                        [{title:'借款金额',val:'￥'+list[i].amount/100},
                        {title:'放款金额',val:'￥'+list[i].payAmt/100}],
                        [{title:'借款时间',val:new Date(list[i].loanTm).Format('yyyy-MM-dd HH:mm:ss')},
                        {title:'放款时间',val:new Date(list[i].payTm).Format('yyyy-MM-dd HH:mm:ss')}],
                        [{title:'分期基数',val:list[i].loanLtm},
                        {title:'首付金额',val:'￥0'}],
                        [{title:'年化利率',val:0},
                        {title:'备注',val:''}]);
                    data['unionId']=list[i].unionId;
                    data['flowNo']=list[i].flowNo;
                    data['channel']=list[i].channel;
                    this.tbData1.push(data);
                }
            }
        }
    }
}
</script>