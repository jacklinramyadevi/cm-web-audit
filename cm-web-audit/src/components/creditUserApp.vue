<template>
	<div class="creditUser">
			<p class="txt_right" style="color:#adb2bd">上传时间：2017-08-05 12:12:32</p>
			<h2><span><span class="circle">1</span>APP列表</span></h2><p class="titleBd"></p>
			<div class="table_show smallTb">
	        <Table border :columns="columns1" :data="data1" ref="table" height="400"></Table></div>
        
	</div>
</template>

<script>

import axios from 'axios'

export default{
	props:['app'],
	data(){
		return{
			columns1:[{
				title: '包名',
            	key: 'appNm'
			},{
				title:'版本名',
				key:'versionNm'
			},{
				title:'版本号',
				key:'verison'
			}],
			data1:[]
		}
	},
	created : function() {

	},
	watch: {
		app : function(val) {
			if(val == '8') {
				this.queryAppRecord();
			}
		}
	},
	methods :{
		queryAppRecord() {
			var that = this;

			 axios.post('/audit/app/applt' , `token=${ this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data1 = [];
					if(result != null && result != undefined) {							
						var apps = result.apps;

						for(var i = 0 ; i < apps.length ; i++) {		
							that.data1.push({
									'appNm':apps[i].appName,
									'versionNm':apps[i].versionCode,
									'verison':apps[i].versionName
							});								
						}				
					}
                }
            });
		}
	}
}
</script>