<template>
	<div class="creditUser">
		<div class="table_show">
        <Table border :columns="columns" :data="data" ref="table"></Table></div>
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
</template>
<script>
import '../router/dateFormat.js';
import showData from '../router/csmsData.js';
	export default {
    props:['tabMsg','selPhone'],
	  data () {
	    return {
	        total:0,
	        totalRecords:0,
	        pageStart:0,
	        pageSize:10,
	        columns:this.columns1,
	        data:[],
	        columns1:[/*{
	            title: '短信验证码',
	            key: 'smsSign',
	            width:100
	        },*/{
	            title: '短信内容',
	            key: 'smsContent'
	        },
	        {
	            title: '发送时间',
	            key: 'crtTm',
	            width:104
	        },{
	            title: '类型',
	            key: 'smsTp'
	        },{
	            title: '渠道',
	            key: 'thirdNm'
	        },{
	            title: '状态',
	            key: 'isDesc',
	            width:100
	        }],
	        columns2: [{
	            title: '流水号',
	            key: 'tradeNo'
	        },
	        {
	            title: '金额',
	            key: 'amount'
	        },
	        {
	            title: '支付渠道',
	            key: 'merchant'
	        },
	        {
	            title: '业务类型',
	            key: 'payChannel'
	        },{
	            title: '返回信息',
	            key: 'reason'
	        },
	        {
	            title: '支付时间',
	            key: 'crtTm',
	            width:104
	        },{
	            title: '状态',
	            key: 'status'
	        }]
	    }
	},
	created:function(){
		this.loadData();
	},
	computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        },
    },
    watch:{
    	tabMsg:function(val){
    		this.data=[];
    		this.pageStart=0;
			this.loadData();
    	},
    	selPhone:function(val){
    		this.selPhone=val;
    		this.loadData();
    	}
    },
	methods:{
		loadData(){
			var detail={"data": {"mobile":this.selPhone,"pageNum": this.pageStart,"pageSize": 10}};
			if(this.tabMsg=='tab5'){
				this.columns=this.columns1;
				showData.getsmsList(detail,this);
			}else if(this.tabMsg=='tab6'){
				this.columns=this.columns2;
				showData.getRecords(detail,this);
			}
		},
		getsmsList(result){
			var list=result.smsList;
			this.data=[];
			if(list.length>0){
				this.total=Math.ceil((result.smsCount/this.pageSize));
				this.totalRecords=result.smsCount;
				for(var i in list){
					var d={};
					d['smsContent']=list[i].amount;
					d['smsTp']=list[i].smsTp;
					d['thirdNm']=list[i].thirdNm;
					d['isDesc']=list[i].isDesc;
					d['crtTm']=new Date(list[i].crtTm).Format('yyyy-MM-dd HH:mm:ss');
					this.data.push(d);
				}
			}
		},
		getRecords(result){
			this.data=[];
			var list=result.pageInfo.list;
			if(list.length>0){
				this.total=Math.ceil((result.pageInfo.total/this.pageSize));
				this.totalRecords=result.pageInfo.total;
				for(var i in list){
					var d={};
					d['tradeNo']=list[i].tradeNo;
					d['amount']=list[i].amount;
					d['merchant']=list[i].merchant;
					d['payChannel']=list[i].payChannel;
					d['reason']=list[i].reason;
					d['crtTm']=new Date(list[i].crtTm).Format('yyyy-MM-dd HH:mm:ss');
					d['status']=list[i].status;
					this.data.push(d);
				}
			}
		},
		changePage(num){
			this.pageStart=(num-1)*this.pageSize;
			this.loadData();
		}
	}
}
</script>