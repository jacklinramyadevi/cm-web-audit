
<template>
<div class="creditUser creditTitle">
			<p class="txt_right" style="color:#adb2bd">上传时间：2017-08-05 12:12:32</p>
	<h2><span><span class="circle">1</span>京东淘宝基本信息</span></h2><p class="titleBd"></p>
	<div class="creditPh">
		<Table border :columns="columns1" :data="data1" ref="table"></Table>
	</div>
	<h2><span><span class="circle">2</span>收货地址信息（共{{shopAddressCount}}条)</span></h2><p class="titleBd"></p>
	<div class="creditPh">
		<Table border :columns="columns2" :data="data2" ref="table"></Table>
	</div>
	<h2><span><span class="circle">3</span>总订单数（共{{shopOrderCount}}条，订单总金额：￥{{shopOrderFee}}，最早交易时间 ：{{shopOrderNewTime}})</span></h2><p class="titleBd"></p>
	
	<div class="creditPh">
		<Table border :columns="columns3" :data="data3" ref="table" height="400"></Table>
	</div>
</div>
</template>

<script>

import axios from 'axios'

export default{
	props:['shop'],
	data(){
		return{
			shopAddressCount : 0,
			shopOrderFee:0,
			shopOrderNewTime:'',
			shopOrderCount:0,
			columns1:[{
				title: '身份证',
            	key: 'IDNo'
			},{
				title: '手机号',
            	key: 'phonNm'
			},{
				title: '姓名',
            	key: 'name'
			},{
				title:'类型',
				key:'type'
			},{
				title: '总订单数',
            	key: 'orderCount'
			},{
				title:'总商品数',
				key:'productCount'
			},{
				title:'总订单金额',
				key:'moneyCount'
			}],
			data1:[],
			columns2:[{
				title: '收货人姓名',
            	key: 'name'
			},{
				title: '收货人手机号',
            	key: 'phonNm'
			},{
				title:'省份',
				key:'produce'
			},{
				title: '邮编',
            	key: 'bizCode'
			},{
				title:'城市',
				key:'city'
			},{
				title:'镇',
				key:'zhen'
			},{
				title:'区',
				key:'qu'
			},{
				title:'详细地址',
				key:'address'
			}],
			data2:[],
			columns3:[{
				title: '创建时间',
            	key: 'startTime'
			},{
				title:'结束时间',
				key:'endTime'
			},{
				title: '订单金额',
            	key: 'orderMoney'
			},{
				title:'商品数量',
				key:'productCount'
			},{
				title:'交易状态',
				key:'tradeSts'
			},{
				title:'支付时间',
				key:'payTime'
			},{
				title:'店铺名',
				key:'shopName'
			},{
				title:'收货地址',
				key:'address'
			},{
				title:'收货人姓名',
				key:'takeName'
			},{
				title:'收货人手机',
				key:'takeMobile'
			},{
				title:'邮编',
				key:'zipCode'
			}],
			data3:[]
		}
	},created : function() {

	},methods : {

		queryShopOrder () {
			var that = this;

			 axios.post('/audit/shop/order' , `token=${ this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data3 = [];
					if(result != null && result != undefined) {
						var loginSt = result.loginSt;
						if(loginSt == '1') {
							var order = result.order;						

							that.shopOrderFee = result.totalFee;
							that.shopOrderNewTime = result.newTime;
							that.shopOrderCount = order.length;

							for(var i = 0 ; i < order.length ; i++) {
								that.data3.push({
										'startTime':order[i].order_create_time,
										'endTime':order[i].order_finish_time,
										'orderMoney':order[i].actual_fee,
										'productCount':order[i].goods_num,
										'tradeSts':order[i].trans_status,
										'payTime':order[i].order_pay_time,
										'shopName':order[i].shop_name,
										'address':order[i].order_address,
										'takeName':order[i].order_full_name,
										'takeMobile':order[i].order_mobile,
										'zipCode':order[i].order_post
								});
							}
						}

						
					}
                }
            });
		},
		queryShopInfo(){
			var that = this;

			 axios.post('/audit/shop/info' , `token=${ this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data1 = [];
					if(result != null && result != undefined) {
						var loginSt = result.loginSt;
						if(loginSt == '1') {							
							that.data1.push({
								'IDNo':result.auth_id_card,
								'phonNm':result.auth_mobile,
								'name':result.auth_name,
								'type':result.shop_type,
								'orderCount':result.total_order_count,
								'productCount':result.total_order_goods_count,
								'moneyCount':result.total_order_money
							});							
						}						
					}
                }
            });
		},
		queryShopAddress() {
			var that = this;

			 axios.post('/audit/shop/address' , `token=${ this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data2 = [];
					if(result != null && result != undefined) {
						var loginSt = result.loginSt;
						if(loginSt == '1') {
							var address = result.address;						

							that.shopAddressCount = address.length;
							for(var i = 0 ; i < address.length ; i++) {
								that.data2.push({
										'name':address[i].full_name,
										'phonNm':address[i].mobile,
										'produce':address[i].province,
										'bizCode':address[i].post,
										'city':address[i].city,
										'zhen' :address[i].area,
										'qu':address[i].town,
										'address':address[i].address_detail
								});
							}
						}

						
					}
                }
            });
		}
	} , watch : {
		shop : function(val) {
			if(val == '6') {
				this.queryShopInfo();
				this.queryShopAddress();
				this.queryShopOrder();
			}
		}
	}
}
</script>