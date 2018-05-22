<template>
	<Dropdown trigger="custom" :visible="vs" placement="left-start" class="staffs" style="float:right;" @on-click="changeChk">
        <Button type="ghost" @click="show" style="border:0;fontSize:16px;padding:0">
            <Icon type="ios-compose-outline"></Icon>
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem class="title">设置人员</DropdownItem>
            <DropdownItem :selected="selStaff('张三')" name="张三">张三</DropdownItem>
            <DropdownItem :selected="selStaff('李四')" name="李四">李四</DropdownItem>
            <DropdownItem :selected="selStaff('张一河')" name="张一河">张一河</DropdownItem>
            <DropdownItem :selected="selStaff('刘浩')" name="刘浩">刘浩</DropdownItem>
            <div class="clear"></div>
            <div class="btnOk txt_center" @click="btnOk" style="margin-bottom:10px;"><Button type="warning">确定</Button>
               <Button type="ghost" @click="vs=!vs">取消</Button></div>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default{
	data(){
		return {
			vs:false,
			staffNum:[]
		}
	},
	computed:{
	},
	methods:{
		changeChk(name){
			this.staffNum.push(name);
		},
		selStaff(name){
			var sel=false;
			var staffs=this.staffNum;
			for(var i=0;i<staffs.length;i++){
				if(name==staffs[i]){
					sel=true;
				}
			}
			return sel;
		},
		show(){
			this.vs=true;
		},
		btnOk(){
			this.vs=false;
		}
	}
}
</script>