
<template>
<div class="creditUser creditTitle">
			<p class="txt_right" style="color:#adb2bd">上传时间：2017-08-05 12:12:32</p>
	<h2><span><span class="circle">1</span>基本信息</span></h2><p class="titleBd"></p>
	<div class="creditPh">
        <table class="headerTb smallTb" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td class="txt_center">姓名</td><td>{{bankInfo.login_name}}</td><td class="txt_center">总交易数</td><td> </td>
            </tr>
            <tr>
                <td class="txt_center">账户类型</td><td>{{bankInfo.bank_code}}</td><td class="txt_center">总交易额</td><td></td>
            </tr>
            <tr>
                <td class="txt_center">银行账号</td><td>{{bankInfo.login_account}}</td><td class="txt_center"></td><td></td>
            </tr>
        </table>
    </div>
	<h2><span><span class="circle">2</span>网银流水（共{{bankRecordCount}}条，收入小计：￥{{bankIncomeFee}}      支出：￥{{bankPayFee}}）</span></h2><p class="titleBd"></p>
	<div class="table_show creditPh">
		<Table border :columns="columns2" :data="data2" ref="table" height="400"></Table>
	</div>
    
	<h2><span><span class="circle">3</span>贷款信息（共{{bankLoanCount}}条，总金额：￥{{bankLoanTotalMoney}}      总罚息：￥{{bankLoanTotalPenalty}}）</span></h2><p class="titleBd"></p>
	
	<div class="creditPh">
		<Table border :columns="columns3" :data="data3" ref="table"></Table>
	</div>
</div>
</template>

<script>

import axios from 'axios'

export default{
	props: ['bank'],
	data(){
		return{
			bankRecordCount:0,
			bankIncomeFee:0,
			bankPayFee:0,
			bankInfo:{},
			bankLoanCount:0,
			bankLoanTotalMoney:0,
			bankLoanTotalPenalty:0,
			columns2:[{
				title: '交易日期',
            	key: 'transTm'
			},{
				title:'交易摘要',
				key:'transRemark'
			},{
				title: '收入',
            	key: 'income'
			},{
				title:'支出',
				key:'pay'
			},{
				title:'账户余额',
				key:'acctBalance'
			},{
				title:'详情',
				key:'detail'
			}],
			data2:[],
			columns3:[{
				title: '账号',
            	key: 'bankAcct'
			},{
				title:'种类',
				key:'bankType'
			},{
				title: '金额',
            	key: 'money'
			},{
				title:'期限',
				key:'term'
			},{
				title:'到期日期',
				key:'expTm'
			},{
				title:'总罚息',
				key:'penalty'
			}],
			data3:[]
		}
	},
	watch: {
		bank : function(val) {
			if(val == '7') {
				this.queryBankInfo();
				this.queryBankRecord();
				this.queryBankLoan();
			}
		}
	},
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods:{

		queryBankLoan() {
			var that = this;

			 axios.post('/audit/bank/loan' , `token=${ this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data3 = [];
					if(result != null && result != undefined) {											
						var banks = result.banks;
						that.bankLoanCount = banks.length;	

						for(var i = 0 ; i < banks.length ; i++) {
							var bank = banks[i];
							var loanAmt = bank.loanAmt/100;
							var penalty = 0;
							if(bank.totalPenalty != '' && bank.totalPenalty != undefined) {
								penalty = parseInt(bank.totalPenalty) /100;
							}
							
							that.bankLoanTotalMoney += loanAmt;
							that.bankLoanTotalPenalty += penalty;

							that.data3.push({
									'bankAcct':bank.loanAct,
									'bankType':bank.loanType,
									'money':loanAmt,
									'term':'',
									'expTm':bank.expiryDate,
									'penalty':bank.penalty
							});								
						}

						that.bankLoanTotalMoney = Math.ceil(that.bankLoanTotalMoney);
						that.bankLoanTotalPenalty = Math.ceil(that.bankLoanTotalPenalty);					
					}
                }
            });
		},
		queryBankRecord() {
			var that = this;

			 axios.post('/audit/bank/record' , `token=${ this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data2 = [];
					if(result != null && result != undefined) {
						var loginSt = result.loginSt;
						if(loginSt == '1') {		
											
							var banks = result.banks;
							that.bankRecordCount = banks.length;	

							for(var i = 0 ; i < banks.length ; i++) {
								var bank = banks[i];
								var income = bank.income_money/100;
								var pay = bank.pay_money /100;
								that.bankIncomeFee += income;
								that.bankPayFee += pay;

								that.data2.push({
										'transTm':bank.trans_time,
										'transRemark':bank.trans_remark,
										'income':income,
										'pay':pay,
										'acctBalance':bank.balance /100,
										'detail':bank.trans_info
								});								
							}

							that.bankIncomeFee = Math.ceil(that.bankIncomeFee);
							that.bankPayFee = Math.ceil(that.bankPayFee);
						}						
					}
                }
            });
		},
		queryBankInfo(){
			var that = this;

			 axios.post('/audit/bank/info' , `token=${ this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data1 = [];
					if(result != null && result != undefined) {
						var loginSt = result.loginSt;
						if(loginSt == '1') {							
							that.bankInfo = result;					
						}						
					}
                }
            });
		}
    }
}
</script>