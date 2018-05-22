
<template>
<div class="creditUser">
	<div>
			<p class="txt_right" style="color:#adb2bd">上传时间：2017-08-05 12:12:32</p>
		<h2><span><span class="circle">1</span>运营商基本信息</span></h2><p class="titleBd"></p>
		<div class="creditPh">
    		<Table border :columns="columns1" :data="data1" ref="table"></Table>
    	</div>
		<h2><span><span class="circle">2</span>运营商用户信息汇总</span></h2><p class="titleBd"></p>
		<div class="creditPh">
    		<Table border :columns="columns2" :data="data2" ref="table"></Table>
    	</div>
		<h2><span><span class="circle">3</span>高频联系人({{this.operInfo.callErrorInfo !=null && this.operInfo.callErrorInfo !=callErrorInfo ? this.operInfo.callErrorInfo :  this.operInfo.in_net_date}})</span></h2><p class="titleBd"></p>
		
		<div class="creditPh">
    		<Table border :columns="columns3" :data="data3" ref="table" height="300"></Table>
    	</div>
	</div>
	<div>
		<h2><span><span class="circle">4</span>通话记录（共{{this.operCallCount}}条，最早通话时间 ：{{operLatestTime}})</span></h2><p class="titleBd"></p>
		
		<div class="creditPh">
    		<Table border :columns="columns4" :data="data4" ref="table" height="300"></Table>
    	</div>
		<h2><span><span class="circle">5</span>短信（共{{this.operSmsCount}}条，最早短信时间 ：{{this.operSmsLatestTime}})</span></h2><p class="titleBd"></p>
		
		<div class="creditPh">
    		<Table border :columns="columns5" :data="data5" ref="table" height="300"></Table>
    	</div>
		<!-- <h2><span><span class="circle">5</span>上网(10135条)</span></h2><p class="titleBd"></p>
		
		<div class="creditPh">
		    		<Table border :columns="columns5" :data="data5" ref="table"></Table>
		    	</div>
		<h2><span><span class="circle">6</span>运营商充值记录(条)</span></h2><p class="titleBd"></p>
		<div class="creditPh">
		    		<Table border :columns="columns6" :data="data6" ref="table"></Table>
		    	</div>
		
		<h2><span><span class="circle">7</span>运营商账单信息(20条)</span></h2><p class="titleBd"></p>
		<div class="creditPh">
		    		<Table border :columns="columns7" :data="data7" ref="table"></Table>
		    	</div> -->
	</div>
</div>
</template>

<script>

import axios from 'axios';

export default{
	props:['oper'],
	data(){
		return{
			operInfo:{},
			contactCount :'0',
			operLatestTime:'',
			operCallCount:0,
			operSmsLatestTime:'',
			operSmsCount:0,
			columns1:[{
				title: '手机号',
            	key: 'phonNm'
			},{
				title:'类型',
				key:'name'
			},{
				title: '省份',
            	key: 'product'
			},{
				title:'编号',
				key:'no'
			},{
				title:'创建时间',
				key:'time'
			}],
			data1:[],
			columns2:[{
				title: '客户姓名',
            	key: 'userName'
			},{
				title:'入网日期',
				key:'isNet'
			},{
				title: '邮箱',
            	key: 'eamil'
			},{
				title:'证件号码',
				key:'idCard'
			},{
				title:'证件类型',
				key:'cardType'
			},{
				title:'证件地址',
				key:'address'
			}],
			data2:[],
			columns3:[{
				title: '手机号',
            	key: 'phonNm'
			},{
				title:'姓名',
				key:'name'
			},{
				title: '次数',
            	key: 'product'
			}],
			data3:[],
			columns4:[{
				title: '通话日期',
            	key: 'callTime'
			},{
				title:'通话时间',
				key:'startTime'
			},{
				title: '通话时长（s）',
            	key: 'totalTime'
			},{
				title:'类型',
				key:'callTypeName'
			},{
				title:'通话地点',
				key:'callPlace'
			},{
				title:'对方号码',
				key:'otherPhoneNum'
			},{
				title:'本次费用',
				key:'totalFee'
			}],
			data4:[],
			columns5:[{
				title:'日期',
				key:'date'
			},{
				title:'对方号码',
				key:'otherPhone'
			},{
				title:'短信内容',
				key:'content'
			},{
				title:'类型',
				key:'type'
			},{
				title:'地点',
				key:'address'
			},{
				title:'时间',
				key:'timeCount'
			},{
				title:'本次费用',
				key:'free'
			}],
			data5:[]
		}
	} , 
	created : function() {
		
	}, 
	watch :{
		oper : function(val) {
			if(val == 5) {
				this.queryOperInfo();		
				this.queryOperHighContact();
				this.queryOperCallRecord();
				this.queryOperSms();
			}
		}
	},
	methods : {
		queryOperInfo() {
			var that = this;

			 axios.post('/audit/oper/info' , `token=${this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data1 = [];
					that.data2 = [];

					if(result != null && result != undefined) {				
						that.operInfo = result;
						that.data1.push({
								'phonNm':that.$route.query.mobileNumber,
								'name': result.operator,
								'product': result.address,
								'no':'',
								'time':result.create_time
						});
						
						that.data2.push({
							'userName':result.user_name,
							'isNet':result.in_net_date,
							'eamil':result.email,
							'idCard':result.cert_type,
							'cardType':'',
							'address':''
						});
					}
                }
            });
		},
		queryOperHighContact() {
			var that = this;

			if(that.operInfo.callErrorInfo != null && that.operInfo.callErrorInfo != undefined) {
				return;
			}

			 axios.post('/audit/oper/high/contact' , `token=${ this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data3 = [];
					if(result != null && result.length > 0) {
						that.contactCount = result.length;
						for(var i = 0 ; i < result.length ; i++) {
							that.data3.push({
									'phonNm':result[i].phone_num,
									'name':'',
									'product':result[i].search_count
							});
						}
					}
                }
            });
		},
		queryOperCallRecord() {
			var that = this;

			if(that.operInfo.callErrorInfo != null && that.operInfo.callErrorInfo != undefined) {
				return;
			}

			axios.post('/audit/oper/call' , `token=${this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data4 = [];

					if(result != null && result != undefined) {
						var call = result.calls;
						
						that.operCallCount = call.length;
						that.operLatestTime = result.latestTime;

						for(var i = 0 ; i < that.operCallCount ; i++) {
							that.data4.push({
									'callTime':call[i].startDate,
									'startTime':call[i].startTime,
									'totalTime':call[i].totalTime,
									'callTypeName':call[i].callTypeName,
									'callPlace':call[i].callPlace,
									'otherPhoneNum':call[i].otherPhoneNum,
									'totalFee':call[i].totalFee
							});
						}
					}
                }
            });
		},
		queryOperSms() {
			var that = this;

			axios.post('/audit/oper/sms' , `token=${this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data5 = [];

					if(result != null && result != undefined) {

						var sms = result.sms;
						that.operSmsLatestTime = result.latestTime;
						that.operSmsCount = sms.length;
						for(var i = 0 ; i < sms.length ; i++) {
							that.data5.push({
									'date':sms[i].smsDate,
									'otherPhone':sms[i].otherPhoneNum,
									'content':'',
									'type':sms[i].smsType,
									'address':sms[i].place,
									'timeCount':sms[i].smsTime,
									'free':sms[i].totalFee
							});
						}
					}
                }
            });
		}
	}
}
</script>