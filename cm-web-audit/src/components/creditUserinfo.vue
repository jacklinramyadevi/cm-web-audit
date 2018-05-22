
<template>
<div class="creditUser">
			<div>
				<h2><span><span class="circle">1</span>申请人基本信息</span></h2><p class="titleBd"></p>
				<Form :label-width="120">
				<Row>
					<Col :sm="12" :xs="24" style="padding-right:16px;">
					<FormItem label="申请人姓名">
						<span>{{this.$route.query.name}}</span>
					</FormItem>
					<FormItem label="申请人账号">
						<span>{{this.$route.query.mobileNumber}}</span>
					</FormItem>
					<FormItem label="身份证号码">
						<span>{{this.$route.query.idCard}}</span>
					</FormItem>
					<FormItem label="年龄">
						<span>{{this.$route.query.age}}</span>
					</FormItem>
					<FormItem label="认证产品">
						<span>{{this.$route.query.approveProduct}}</span>
					</FormItem>
					<FormItem label="申请额度">
						<span>￥{{this.$route.query.applyQuota/100}}</span>
					</FormItem>
					<FormItem label="系统建议额度">
						<span>￥{{this.$route.query.referQuota /100}}</span>
					</FormItem>
					<FormItem label="是否是黑名单">
						<span>{{this.$route.query.isBlack}}</span>
					</FormItem>
					<FormItem label="申请人是否推荐">
						<span>{{this.$route.query.reCommender != '' && this.$route.query.reCommender != null ? '有':'没有'}}</span>
					</FormItem>
					<FormItem label="推荐人">
						<span>{{this.$route.query.reCommender}}</span>
					</FormItem>
					<FormItem label="设备信息">
						<span>{{api.deviceType}}</span>
					</FormItem>
					<FormItem label="GPRS定位信息">
						<span>{{api.gpsAddress}}</span>
					</FormItem>
					</Col>

					<Col :sm="12" :xs="24">
					<FormItem label="学历">
						<span>{{api.eduStatus}}</span>
					</FormItem>
					<FormItem label="学籍">
						<Button type="success" size="small" @click="showImg">点击查看</Button>
					</FormItem>
					<FormItem label="婚姻">
						<span>{{this.api.maritalStatus}}</span>
					</FormItem>
					<FormItem label="户籍">
						<span>{{api.houseHodeRegister}}</span>
					</FormItem>
					<FormItem label="有无车辆">
						<span>{{api.vehicle}}</span>
					</FormItem>
					<FormItem label="手机实名">
						<span>{{api.moblReln}}</span>
					</FormItem>
					<FormItem label="家庭成员(人)">
						<span>{{api.familyMember}}</span>
					</FormItem>
					<FormItem label="住房性质">
						<span>{{api.housingNature}}</span>
					</FormItem>
					<FormItem label="月收入">
						<span>{{aji.payMoney}}</span>
					</FormItem>
					<FormItem label="家庭详细地址">
						<span>{{api.personalHouseProvince}}{{api.personalHouseCounty}}</span>
					</FormItem>
					<FormItem label="相关照片和视频">
						<Button type="success" size="small" @click="showImg">点击查看</Button>
					</FormItem>
					<FormItem label="IP地址">
						<span>{{this.$route.query.ip}}</span>
					</FormItem>
					</Col>
					</Row>
				</Form>
				<h2><span><span class="circle">2</span>单位信息</span></h2><p class="titleBd"></p>
				<Form :label-width="120">
					<FormItem label="所在公司名称">
						<span>{{aji.companyName}}</span>
					</FormItem>
					<FormItem label="公司性质">
						<span>{{aji.companyProperty}}</span>
					</FormItem>
					<FormItem label="工作年限">
						<span>{{aji.workYears}}</span>
					</FormItem>
					<FormItem label="社保">
						<span>{{api.social}}</span>
					</FormItem>
					<FormItem label="同事号码">
						<span>{{aji.bffMbl}}</span>
					</FormItem>
					<FormItem label="公司座机号码">
						<span>{{aji.conmpanyPlaneMbl}}</span>
					</FormItem>
					<FormItem label="公司详细地址">
						<span>{{aji.companyAddressProvin}}{{aji.companyAddressCounty}}</span><div class="addIcon" v-show="!orAddress" @click="btnAdd('address')"></div>
						<Row :gutter="0" v-show="orAddress"><Col span="19" style="padding-left:0!important;"><Input placeholder="输入新地址"></Input></Col><Col span="5" style="padding-left:0!important;"><Button type="success" @click="add('address')">添加</Button></Col></Row>
					</FormItem>
				</Form>
			</div>
			<div>
				<h2><span><span class="circle">3</span>联系人信息</span></h2><p class="titleBd"></p>
				
				<div class="table_show">
					<Table border :columns="columns1" :data="data1"></Table>
				</div>

				<h2><span><span class="circle">4</span>系统审核信息</span></h2><p class="titleBd"></p>
				<div class="table_show">
					<table class="headerTb" cellpadding="0" cellspacing="0" style="width:100%;">
						<tr v-for="(rule,i) in rules" :key="i">
							<td v-bind:class="{colorRed:rule.a.indexOf('-1') > -1}">{{rule.a.replace('1','').replace('-','')}}</td>
							<td v-bind:class="{colorRed:rule.b.indexOf('-1') > -1}">{{rule.b.replace('1','').replace('-','')}}</td>
							<td v-bind:class="{colorRed:rule.c.indexOf('-1') > -1}">{{rule.c.replace('1','').replace('-','')}}</td>
							<td v-bind:class="{colorRed:rule.d.indexOf('-1') > -1}">{{rule.d.replace('1','').replace('-','')}}</td>
						</tr>
					</table>
				</div>
			</div>
</div>
</template>

<script>
import axios from 'axios';
export default{
	data(){
		return {
			orAddress:false,
			orcouple:false,
			orfamilyPh:false,
			orfriendPh:false,
			desc:'',
			api:{},
			aji:{},
			rules:[],
			flowNo:this.$route.query.token,
			formFr:{
	            desc:'',
	            descCount:'',
	            descNm:0
	        },
	        ruleFr:{
	            descLength:200,
	            desc:[
	                {required:true,message:'备注不能为空',trigger:'blur'},
	                {type:'string',max:this.descLength,message:'备注最多为200字',trigger:'blur'}
	            ]
			},
			newPhone:'',
	        columns1:[{
	        	title:'关系',
	        	key:'contactType'
	        },{
	        	title:'姓名',
	        	key:'contactName'
	        },{
	        	title:'手机号码',
	        	key:'contactMbl'
	        },{
	        	title:'通话记录',
	        	key:'checkCall'
	        },{
	        	title:'运营商',
	        	key:'checkOper'
	        },{
	        	title:'通讯录',
	        	key:'checkMbl'
	        }],
	        data1:[]
		}
	},
	created :function(){
		this.showPersonal();
		this.showApproveRule();
	},
	computed:{
	},
	mounted(){
		this.$nextTick(function(){
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
		});
	},
	updated:function(){
		this.$nextTick(function(){
			this.$emit('showTm',true);
		})
	},
	methods: {
		btnAdd(name){
			if(name=='address'){
				this.orAddress=true;
			}else if(name=='couple'){
				this.orcouple=true;
			}else if(name=='familyPh'){
				this.orfamilyPh=true;
			}else if(name=="friendPh"){
				this.orfriendPh=true;
			}
		},
		add(name){
			if(name=='address'){
				this.orAddress=false;
			}else if(name=='couple'){
				this.orcouple=false;
			}else if(name=='familyPh'){
				this.orfamilyPh=false;
			}else if(name=="friendPh"){
				this.orfriendPh=false;
			}
		},
        txtKeyup(name){
            var val=this.formFr.desc;
            this.formFr.descNm=val.length;
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        showImg(){
        	/*var h=$('.creditUser').height();*/
        	var arr=[1,4];
        	this.$emit('listenTo',arr);
		},
		showPersonal() {

			var that = this;
            var param = [];
            param.push('"flowNo":"' + that.flowNo + '"');

            axios.post('/audit/base' , `param={${param.join(",")}}`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
				if(!!resp.data.result){
					var result = resp.data.result;
					that.api = result.api;
					that.aji = result.aji;

					var acis = result.acis;
					that.data1 = [];
					for(var i = 0 ; i < acis.length ; i++) {
						var aci = acis[i];
						that.data1.push({
							'contactType': aci.contactType,
							'contactName': aci.contactName,
							'contactMbl' : aci.contactMbl,
							'checkCall'  : aci.checkCall ? '有' : '没有',
							'checkOper'  : aci.checkOper ? '有' : '没有',
							'checkMbl'   : aci.checkMbl  ? '有' : '没有'
						});
					}
					that.$emit('selPhone',that.data1);
				}
			});
		},
		showApproveRule() {
			var that = this;
			var param = [];

			param.push('"flowNo":"' + that.flowNo + '"');
			axios.post('/audit/rule' , `param={${param.join(",")}}`,{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(resp){
				if(!!resp.data.result){
					var result = resp.data.result;
					var len = result.length;
					that.rules = [];
					if(len > 0) {
						var column = 4;
						var num = Math.ceil(len / column);
						var size = 0;
						var begin = 0;
						var end = column;
						for(var i = 0; i < num ; i++) {

							if(end > len) {
								end = len;
							}
							var sub = result.slice(begin , end);
								that.rules.push({
									'a': sub[0] != undefined ? sub[0].key + '' + sub[0].status : '',
									'b': sub[1] != undefined ? sub[1].key + '' + sub[1].status : '',
									'c': sub[2] != undefined ? sub[2].key + '' + sub[2].status : '',
									'd': sub[3] != undefined ? sub[3].key + '' + sub[3].status : ''
							});
							begin += num;
							end += num;
						}
					}
				}
			});
		}
	}
}
</script>