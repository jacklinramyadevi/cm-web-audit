<template>
  <div class="sections">
    <h1>人员管理</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="姓名/手机号"></Input>
                        <Button type="success" @click="">查询</Button>
                        <Button @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="2" :xs="24">
                <Button type="success"class="float_right" @click="model3=!model3">新增</Button>
            </Col>
        </Row>
        <div class="table_show">
        <Table border :columns="columns1" :data="data1" ref="table"></Table></div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="total" show-elevator @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="total" simple @on-change="changePage"></Page>
    </div>
    <Modal v-model="model1" title="修改权限" width="600">
         <Form ref="formFr" :model="formPower" :label-width="40">
            <FormItem label="权限">
                <Input v-model="formPower.txtPower" icon="plus" placeholder="点击分配权限" @on-focus="selPower(1)"></Input>
            </FormItem>
         </Form>
    </Modal>

    <Modal v-model="model2" title="重置密码">
         

        <h3>确定重置“<span v-text="txtName"></span>”的密码？</h3>


        <p>重置后密码为“<span v-text="txtPwd"></span>“<br/>

        重置成功后，请通知用户尽快登录修改密码</p>

    </Modal>

    <Modal v-model="model3" title="新增" width="600" @on-ok="handleSubmit('formFr')" @on-cancel="handleReset('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr" :label-width="70">
            <FormItem prop="txtName" label="姓名">
                <Input v-model="formFr.txtName" placeholder="输入员工姓名"></Input>
            </FormItem>
            <FormItem prop="txtPhone" label="手机号码">
                <Input v-model="formFr.txtPhone" placeholder="输入员工手机号码 ，这是登录账号"></Input>
            </FormItem>
            <FormItem prop="txtPwd" label="密码">
                <Input type="password" v-model="formFr.txtPwd" placeholder="输入登录密码"></Input>
            </FormItem>
            <FormItem label="权限">
                <Input v-model="formFr.txtPower" icon="plus" placeholder="点击分配权限" @on-focus="selPower(0)"></Input>
            </FormItem>
         </Form>
    </Modal>

    <Modal v-model="model4" @on-ok="powerOk" title="权限分配">
         <Form>
             <FormItem v-for="(item,i) in chkGroup" :key="i">
                <Checkbox class="powerTitle" :indeterminate="item.indeterminate" :value="item.checkAll" @click.prevent.native="checkAllClick(i)"><label v-text="item.name"></label></Checkbox>
                <CheckboxGroup v-model="item.nowChk" @on-change="checkAllGrp(i,item.nowChk)">
                    <Checkbox v-for="(val,j) in item.val" :key="j" :label="val"></Checkbox>
                </CheckboxGroup>
            </FormItem>
         </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'sections',
  data () {
    return {
        model1:false,
        model2:false,
        model3:false,
        model4:false,
        ShowCheck:0,
        chkGroup:[{name:'团队管理',val:['人员管理','排班管理'],indeterminate:false,checkAll:false,nowChk:[]},{name:'渠道管理',val:['分配','审核','审核记录'],indeterminate:false,checkAll:false,nowChk:[]},{name:'授信复活',val:['分配','审核','审核记录'],indeterminate:false,checkAll:false,nowChk:[]},{name:'团队管理',val:['分配','审核','审核记录'],indeterminate:false,checkAll:false,nowChk:[]},{name:'业务查询',val:['已冻结订单','二次营销','黑名单查询'],indeterminate:false,checkAll:false,nowChk:[]}],
        tbWidth:100,
        total:100,
        txtName:'136225562626（张河）',
        txtPwd:'00000000',
        formSel:{
            input:''
        },
        formPower:{
            txtPower:''
        },
        formUpdset:{
            sel:''
        },
        formFr:{
            txtName:'',
            txtPhone:'',
            txtPwd:'',
            txtPower:''
        },
        ruleFr:{
            txtName:[
                {required:true,message:'姓名不能为空',trigger:'blur'}
            ],
            txtPhone:[
                {required:true,message:'手机号不能为空',trigger:'blur'},
                {type:'number',max:11,message:'手机号只能是11位的数字',trigger:'blur'}
            ],
            txtPwd:[
                {required:true,message:'密码不能为空',trigger:'blur'}
            ]
        },
        columns1: [
        {
            title: '员工姓名',
            key: 'name'
        },
        {
            title: '手机号码/账号',
            key: 'phone'
        },
        {
            title: '权限',
            key: 'power'
        },
        {
            title: '创建时间',
            key: 'createdTm',
            width:104
        },
        {
            title: '操作',
            key: 'action',
            width: 220,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on: {
                            click: () => {
                                this.show(params.index,0);
                            }
                        }
                    }, '修改权限'),
                    h('Button', {
                        props: {
                            type:'success',
                            size: 'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on: {
                            click: () => {
                                this.show(params.index,1);
                            }
                        }
                    }, '重置密码'),
                    h('Button', {
                        props: {
                            type:'ghost',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                //this.show(params.index);
                            }
                        }
                    }, '删除')
                ]);
            }
        }],
        data1: [{
                name: '崔一凡',
                phone: '13622225555',
                power: '分配订单',
                createdTm: '2017-07-12 12:12:11'
            },
            {
                name: '崔一凡',
                phone: '13622225555',
                power: '分配订单',
                createdTm: '2017-07-12 12:12:11'
            }]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=110;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        exportData (type) {
        },
        changePage(){
            /*this.data1=this.*/
        },
        show(index,model){
            if(model==0){
                this.model1=true;
            }else{
                this.model2=true;
            }
        },
        selPower(index){
            this.model4=true;
            this.ShowCheck=index;
        },
        checkAllClick(i){
            if(this.chkGroup[i].indeterminate){
                this.chkGroup[i].checkAll=false;
            }else{
                this.chkGroup[i].checkAll=!this.chkGroup[i].checkAll;
            }
            this.chkGroup[i].indeterminate=false;

            if(this.chkGroup[i].checkAll){
                this.chkGroup[i].nowChk=this.chkGroup[i].val;
            }else{
                this.chkGroup[i].nowChk=[];
            }
        },
        checkAllGrp(i,data){
            let val=this.chkGroup[i].val;
            if(val!=''){
                if(data.length===val.length){
                    this.chkGroup[i].indeterminate=false;
                    this.chkGroup[i].checkAll=true;
                }else if(data.length>0){
                    this.chkGroup[i].indeterminate=true;
                    this.chkGroup[i].checkAll=false;
                }else{
                    this.chkGroup[i].indeterminate=false;
                    this.chkGroup[i].checkAll=false;
                }
            }
        },
        powerOk(){
            var grp='';
            for(var i=0;i<this.chkGroup.length;i++){
                var val=this.chkGroup[i].nowChk;
                if(val.length>0){
                    grp+=this.chkGroup[i].name+': ';
                    for(var k=0;k<val.length;k++){
                        grp+=val[k]+',';
                    }
                }
            }
            if(grp.length>50){
                grp=grp.substring(0,50)+'...';
            }
            if(this.ShowCheck==0){
                this.formFr.txtPower=grp;
            }else{
                this.formPower.txtPower=grp;
            }
        },
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name){
            this.$refs[name].resetFields();
        },
        reset(){
            this.formSel.input='';
        } 
    }
}
</script>
