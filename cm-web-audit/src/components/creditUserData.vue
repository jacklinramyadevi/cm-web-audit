
<template>
<div class="creditUser">
	<div>
			<p class="txt_right" style="color:#adb2bd">上传时间：2017-08-05 12:12:32</p>
		<h2><span><span class="circle">1</span>用户基本信息</span></h2><p class="titleBd"></p>
		<div class="creditPh"></div>
		<h2><span><span class="circle">2</span>用户信息汇总</span></h2><p class="titleBd"></p>
		<div class="creditPh">
    		<Table border :columns="columns1" :data="data1" ref="table"></Table>
    	</div>
		<h2><span><span class="circle">3</span>信用卡信息</span></h2><p class="titleBd"></p>
		<div></div>
		<h2><span><span class="circle">4</span>购房贷款</span></h2><p class="titleBd"></p>
		<div></div>
	</div>
	<div>
		<h2><span><span class="circle">5</span>其他贷款</span></h2><p class="titleBd"></p>
		<div class="table_show">
			<table class="headerTb" cellpadding="0" cellspacing="0" style="width:100%;">
				<tr><td class="colorRed">ADNC</td><td class="colorRed">CNCN</td><td class="colorRed">DIDR</td><td>FJF</td></tr>
				<tr><td class="colorRed">GLVGI</td><td class="colorRed">ADNC</td><td>CNCN</td><td>DIDR</td></tr>
				<tr><td>GLVCI</td><td>GLVGI</td><td>ADNC</td><td>CNCN</td></tr>
				<tr><td>GLVM</td><td>GLVCI</td><td>GLVGI</td><td>DIDR</td></tr>
				<tr><td>FYEF</td><td>GLVM</td><td>GLVCI</td><td>CNCN</td></tr>
				<tr><td>SMRPN</td><td>FYEF</td><td>DIDR</td><td>FJF</td></tr>
				<tr><td>ADNC</td><td>CNCN</td><td>DIDR</td><td>FJF</td></tr>
				<tr><td>SMRPN</td><td>FYEF</td><td>DIDR</td><td>FJF</td></tr>
				<tr><td>ADNC</td><td>CNCN</td><td>DIDR</td><td>FJF</td></tr>
			</table>
		</div>
		<h2><span><span class="circle">6</span>查询记录</span></h2><p class="titleBd"></p>
		<h3>机构查询记录明细</h3>
		<div class="table_show">
    		<Table border :columns="columns1" :data="data1" ref="table"></Table>
    	</div>
		<h3>本人查询记录明细</h3>
		<div class="table_show">
    		<Table border :columns="columns1" :data="data1" ref="table"></Table>
    	</div>
	</div>
</div>
</template>

<script>

export default{
	data(){
		return{
			columns1:[{
				title: '手机号',
            	key: 'phonNm'
			},{
				title:'姓名',
				key:'name'
			}],
			data1:[{
				phonNm:'15838591158',
				name:'马旭'
			},{
				phonNm:'15838591158',
				name:'马旭'
			},{
				phonNm:'15838591158',
				name:'马旭'
			},{
				phonNm:'15838591158',
				name:'马旭'
			},{
				phonNm:'15838591158',
				name:'马旭'
			},{
				phonNm:'15838591158',
				name:'马旭'
			}]
		}
	}
}
</script>