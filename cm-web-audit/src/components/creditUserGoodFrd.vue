<template>
	<div class="creditUser">
		
		<h2><span><span class="circle">2</span>通话记录（{{callCount}}条）最新通话时间 （{{latestTime}}）</span></h2><p class="titleBd"></p>
		
		<div class="creditPh">
    		<Table border :columns="columns2" :data="data2" ref="table"  height="400"></Table>
    	</div>
	</div>
</template>

<script>

import axios from 'axios';

export default{
	props:['appCall'],
	data(){
		return{
			callCount:0,
			latestTime:'',
			columns2:[{
				title: '通话日期',
            	key: 'date',
            	width:'104'
			},{
				title: '通话时长（s）',
            	key: 'times'
			},{
				title: '类型',
            	key: 'type'
			},{
				title:'姓名',
				key:'name'
			},{
				title: '对方号码',
            	key: 'phonNm'
			}],
			data2:[]
		}
	},
	created : function() {
		
	},
	/*mounted(){
		this.$nextTick(function(){
        	var h=$('.creditUser').height();
        	var arr=[h];
        	this.$emit('listenTo',arr);
		});
	},*/
	watch :{
		appCall : function(val) {
			if(val == '4') {
				this.queryAppCall();
			}
		}
	},
	methods:{
		queryHighContact () {
			
		},
		queryAppCall() {
			var that = this;

			 axios.post('/audit/app/call' , `token=${this.$route.query.token }`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
                if(!!resp.data.result) {
					var result = resp.data.result;
					that.data2 = [];

					if(result != null && result != undefined) {
						var call = result.calls;
						
						that.callCount = call.length;
						that.latestTime = result.latestTime;

						for(var i = 0 ; i < that.callCount ; i++) {
							that.data2.push({
									'date':call[i].date,
									'times':call[i].duration,
									'type':call[i].type,
									'name':'',
									'phonNm':call[i].number
							});
						}
					}
                }
            });
		}
	}
}
</script>