<template>
	<div class="creditUser">
		<div class="creditPh">
			<p class="txt_right" style="color:#adb2bd">上传时间：2017-08-05 12:12:32</p>
			<h2><span><span class="circle">1</span>相似度</span></h2><p class="titleBd"></p>
			<Form :label-width="120">
				<FormItem label="匹配的身份证">
					<span>无</span>
				</FormItem>
				<FormItem label="匹配的姓名">
					<span>无</span>
				</FormItem>
				<FormItem label="匹配的手机">
					<span>无</span>
				</FormItem>
				<FormItem label="匹配度">
					<span>无</span>
				</FormItem>
			</Form>
			<h2><span><span class="circle">2</span>社交圈（共{{circleCount}}条)</span></h2><p class="titleBd"></p>
			<div class="table_show smallTb">
	        <Table border :columns="columns1" :data="data1" ref="table" height="500"></Table></div>
        </div>
	</div>
</template>

<script>

import axios from 'axios';

export default{
		props:['circle'],		
		data:function(){
			return{
				circleCount : 0,
				columns1:[{
					title: '手机号',
					key: 'phonNm'
				},{
					title:'姓名',
					key:'name'
				}],
				data1:[]
			}		
	} ,
	created :function () {
		
		
	}, 
	mounted(){
		
	},
	watch:{
		circle:function(val){
			if(val == '2'){
				this.queryCircle();
			}
		}
	},
	methods : {
		queryCircle(){
			var that = this;

			 axios.post('/audit/circle' , `token=${ this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data1 = [];
					if(result != null && result.length > 0) {
						that.circleCount = result.length;
						for(var i = 0 ; i < result.length ; i++) {
							that.data1.push({
									'phonNm':result[i].phone,
									'name':result[i].name
							});
						}
					}
                }
            });
		}
	}
}
</script>