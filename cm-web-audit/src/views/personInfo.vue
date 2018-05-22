
<template>
  <div class="sections page_tab">
    <!-- <h1>成员管理</h1> -->
    <div class="pl_body">

    <div class="">
        <Tabs class="tabs" :size="tabSize" v-model="tabVal">
            <TabPane v-for="s in showSystem" :label="s.remarks" :name="s.id.toString()">
                <div class="creditUser">
                    <Row class="form_row">
                        <Col :sm="22" :xs="24">
                                <Form :model="formSel" class="downMenu">
                                    <FormItem>
                                        <Input style="display:none;"></Input>
                                        <Input v-model="formSel.input" icon="ios-search" placeholder="客户姓名/手机号" @on-enter="searchBykeyword"></Input>
                                        <Button type="warning" @click="searchBykeyword">查询</Button>

                                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                                            <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                                                组织<span v-text="formSel.typePd"></span>
                                                <Icon type="arrow-down-b"></Icon>
                                            </Button>
                                            <DropdownMenu slot="list">
                                                <DropdownItem name="全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>
                                                <DropdownItem v-for="(item, i) in organizationList" :key="i" :name="item.value"
                                                              :selected="formSel.typePd.indexOf(item.label)>-1">{{item.label}}
                                                </DropdownItem>
                                                <!--<DropdownItem name="催收部" :selected="formSel.typePd.indexOf('催收部')>-1">催收部
                                            </DropdownItem>
                                                <DropdownItem name="市场部" :selected="formSel.typePd.indexOf('市场部')
                                                >-1">市场部</DropdownItem>-->
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Dropdown class="showMn" trigger="click" :class="rolevisible" @on-click="showMenu2"
                                                  @on-visible-change="orShow2">
                                            <Button type="ghost" :class="{active:vs2,chk:formSel.typeAd!=''}" >
                                                角色<span v-text="formSel.typeAd"></span>
                                                <Icon type="arrow-down-b"></Icon>
                                            </Button>
                                            <DropdownMenu slot="list" >
                                                <DropdownItem name="全部"  :selected="formSel.typeAd=='全部'">全部</DropdownItem>

                                                <DropdownItem v-for="(item, i) in dropDownRoleList" :name="item.value" :key="i"
                                                              :selected="formSel.typeAd.indexOf(item.label)>-1">{{item.label}}
                                                </DropdownItem>
                                                <!--<DropdownItem name="一级管理员" :selected="formSel.typeAd.indexOf('一级管理员')>-1">一级管理员
                                            </DropdownItem>
                                                <DropdownItem name="部门副经理" :selected="formSel.typeAd.indexOf('部门副经理')
                                                >-1">部门副经理</DropdownItem>-->
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Button v-if="formSel.input!='' || formSel.typePd!=''" @click="reset">重置</Button>
                                    </FormItem>
                                </Form></Col>
                                <Col :sm="2" :xs="24"><div class="float_right">
                                <Button type="warning" :disabled="opArr.indexOf('add')<0" @click="addNewUser">新增</Button>
                            </div></Col>
                        </Row>
                        <div class="table_show">
                        <Table border :columns="columns1" :data="data1" ref="table"></Table></div>
                        <Row :gutter="16" v-if="pageWin>=768">
                            <Col :sm="5" :xs="24">
                                <div class="total">共{{total}}页</div>
                            </Col>
                            <Col :sm="19" :xs="24" class="txt_right">
                                <Page :total="totalRecords" :current="currentPage" show-elevator @on-change="changePage"></Page>
                            </Col>
                        </Row>
                        <Page v-else :total="totalRecords" :current="currentPage" simple @on-change="changePage"></Page>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>

    <Modal v-model="model1" :title="modalTitle" :loading="modelLoading" width="600" @on-cancel="closeModal('formFr')"
           @on-ok="handleAdd('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr" :label-width="80">
            <FormItem label="姓名" prop="name">
                <Input v-model="formFr.name" placeholder="输入成员姓名"></Input>
            </FormItem>
            <FormItem label="账号" prop="userNo">
                <Input v-model="formFr.userNo" placeholder="输入成员手机号"></Input>
            </FormItem>
            <FormItem label="初始密码">
                <span v-text="formFr.pwd"></span>
            </FormItem>
            <FormItem label="角色" prop="addressAll" class="ivu-form-item-required">
                <Dropdown trigger="click" class="showMn" :visible="orAds" @on-visible-change="changeAds" style="width:100%;">
                    <Button type="ghost" style="width:100%;border:1px solid #dddee1;text-align:left;padding: 6px 8px;">
                        <div>
                        <span v-if="formFr.addressAll.length<=0">点击添加角色</span>
                        <span style="float:left;" v-else v-for="(a,index) in formFr.addressAll" :key="index"><span
                                v-text="a.label.toString()"></span><label @click="delAdr(index)"><Icon type="close" style="margin:0 5px;cursor:pointer;"></Icon></label></span>
                        
                        <Icon type="plus" class="float_right" style="    margin-top: 2px;"></Icon>
                        </div>
                    </Button>
                    <DropdownMenu slot="list" style="padding:5px 10px;">
                        <Cascader :data="actorData" id='actorDataCas' :load-data="loadData" @on-change="cascarderShow"></Cascader>
                        <Button type="primary" class="float_right" style="margin-top:5px;" @click="cascarOk">确定</Button>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
         </Form>
    </Modal>


    <Modal v-model="model3" width="360">
        <div style="text-align:center;margin-top:20px;">
            <p>确定要删除该成员吗？</p>
        </div>
            <Row :gutter="16" slot="footer"><Col span="12"><Button type="ghost" long @click="model3=!model3">取消</Button></Col>
            <Col span="12"><Button type="warning" @click="deleteUser" long>确定</Button></Col>
            </Row>
    </Modal>
  </div>
</template>

<script>
import router from  '../router/teamSystem.js';
export default {
  name: 'sections',
  props:['showSystem'],
  data () {
      const validateRole = (rule, value, callback) => {

          if (value.length == 0) {
              callback(new Error('角色不能为空'));
          }else {
              callback();
          }
      };
      const validatePhone=(rule,value,callback)=>{
        var re=new RegExp(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
        if(value.length!=0){
            var retu=value.match(re);
            if(retu){
                callback();
            }else{
                callback(new Error('账号输入必须为11位数字'));
            }
        }else{
            callback(new Error('账号不能为空'));
        }
    }
    return {
        tabSize:'default',
        tabVal:'1',
        systemId:'1',
        model1:false,
        model3:false,
        vs:false,
        vs2:false,
        orAds:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        //pageNum:1,
        pageSize:10,
        currentPage:1,
        modelLoading: true,
        modalTitle:'新增',
        selectedTableId: -1,
        selectedRoleName:'',
        selectedRoleId : [],
        selectedOrgName: '',
        selectedOrgId: [],
        selectedOrgCount:0,
        organizationList:[],
        dropDownRoleList:[],
        dropdownOrgID: -1,
        dropdownRoleID: -1,
        rolevisible: 'hiddenRoleDropDown',
        formSel:{
            input:'',
            typePd:'',
            typeAd:''
        },
        formFr:{
            name:'',
            userNo:'',
            pwd:'888888',
            adr:'',
            addressAll:[]
        },
        ruleFr:{
            name:[{required:true,message:'姓名不能为空',trigger:'blur'}],
            userNo:[{validator: validatePhone,trigger:'blur'}],
            addressAll : [{ validator: validateRole, trigger: 'blur' }]
        },
        actorData: [],
        columns1: [
        {
            title: '姓名',
            key: 'name'
        },
        {
            title: '账号（手机号）',
            key: 'mobile'
        },
        {
            title: '创建人',
            key: 'createUser'
        },{
            title: '角色',
            key: 'roleName',
            type:'html'
        },
        {
            title: '组织',
            key: 'orgName',
            type:'html'
        },
        {
            title: '操作',
            key: 'action',
            width: 250,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    /*h('Button', {
                        props: {
                            type: 'warning',
                            size: 'small'
                        },
                        style:{
                            'display': this.data1[params.index]['account'].toString() == "admin" ? 'none' : 'inline-block'
                        },
                        on: {
                            click: () => {
                                this.show(params.index);
                            }
                        }
                    }, '分配权限'),*/
                    h('Button', {
                        props: {
                            type: 'ghost',
                            size: 'small',
                            disabled:this.opArr.indexOf('initPassword')<0
                        },
                        style:{
                            'marginLeft':'5px',
                            'display': this.data1[params.index]['account'].toString() == "admin" ? 'none' : 'inline-block'
                        },
                        on: {
                            click: () => {
                                this.resetUserPassword(params.index);
                            }
                        }
                    }, '重置密码'),
                    h('Button', {
                        props: {
                            type: 'warning',
                            size: 'small'
                        },
                        style:{
                            'marginLeft':'5px',
                            'display': this.data1[params.index]['account'].toString() == "admin" ? 'none' : 'inline-block'
                        },
                        on: {
                            click: () => {
                                this.show(params.index,'upd');
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: this.data1[params.index].status == '0' ? 'ghost':'default',
                            size: 'small',
                            disabled:this.data1[params.index].status == '0' ? this.opArr.indexOf('inactive')<0 : this.opArr.indexOf('active')<0
                        },
                        style:{
                            'marginLeft':'5px',
                            'display': this.data1[params.index]['account'].toString() == "admin" ? 'none' : 'inline-block'
                        },
                        on: {
                            click: () => {
                                this.userActive_inActive(params.index)
                            }
                        }
                    }, this.data1[params.index].status == '0' ?  '禁用' : '解禁'),
                    h('Button', {
                        props: {
                            type: 'ghost',
                            size: 'small',
                            disabled:this.opArr.indexOf('delete')<0
                        },
                        style:{
                            'marginLeft':'5px',
                            'display': this.data1[params.index]['account'].toString() == "admin" ? 'none' : 'inline-block'
                        },
                        on: {
                            click: () => {
                                this.del(params.index)
                            }
                        }
                    }, '删除')
                ]);
            }
        }],
        data1: [],
        token:'',
        opArr:[]
        }
    },
    created:function(){
        var op=this.$route.query.op;
        for(var o in op){
            var p=op[o].split(':');
            this.opArr.push(p[p.length-1]);
        }
        this.token=this.$store.getters.token;
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=60;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
        var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
        this.loadPage(detail);
        router.getOrganizationList('systemId='+this.systemId+'&token='+this.token,this);
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    watch:{
        tabVal:function(val){
            this.data1=[];
            this.currentPage=1;
            this.systemId=val;
            var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
            this.loadPage(detail);
            this.actorData = [];
            this.formFr.adr = null;
            this.formFr.addressAll = [];
            this.organizationList=[];
            var casTxt = document.getElementById('actorDataCas').getElementsByClassName('ivu-input');
            casTxt[0].value = ''
            this.formSel.input='';
            this.formSel.typePd='';
            this.formSel.typeAd='';
            this.formSel.selectTm=[];
            this.dropdownOrgID = -1;
            this.dropdownRoleID = -1;
            this.rolevisible = 'hiddenRoleDropDown';
            router.getOrganizationList('systemId='+this.systemId+'&token='+this.token,this);
        }
    },
    methods: {
        showMenu(val){
            var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
            if(val =='全部' ){
                this.formSel.typePd='';
                this.dropdownOrgID = -1;
                this.rolevisible = 'hiddenRoleDropDown';
                this.formSel.typeAd='';
                this.dropdownRoleID = -1;
            }else{
                var id = val.split('|')[1];
                var name  = val.split('|')[0];
                this.formSel.typePd=' : '+ name;
                detail = 'page=1&size=10&systemId='+this.systemId+'&orgId='+ id+'&token='+this.token;
                this.dropdownOrgID = id;
                var detail = 'orgId=' + id+'&token='+this.token;
                router.getRoleById(detail, this, {}, {}, '');
                this.formSel.typeAd='';
                this.rolevisible = 'showRoleDropDown';

                detail = 'page=1&size=10&systemId='+this.systemId+'&orgId='+ id+'&token='+this.token;


            }
            if(this.formSel.input !=  ''){
                detail += '&keyword=' + this.formSel.input;
            }

            this.loadPage(detail);


        },
        orShow(visible){
            this.vs=visible;
        },
        searchBykeyword(){
            var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
            if(this.dropdownOrgID != -1){
                detail += '&orgId='+ this.dropdownOrgID;
                if(this.dropdownRoleID != -1){
                    detail += '&roleId='+ this.dropdownRoleID;
                }
            }
            detail += '&keyword=' + this.formSel.input;
            this.loadPage(detail);

        },
        showMenu2(val){

            var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
            if(val =='全部' ){
                this.formSel.typeAd='';
                this.dropdownRoleID = -1;
                if(this.dropdownOrgID != -1){
                    detail += '&orgId='+ this.dropdownOrgID;
                }
            }else{
                var id = val.split('|')[1];
                var name  = val.split('|')[0];
                this.formSel.typeAd=' : '+ name;
                this.dropdownRoleID = id;
                detail = 'page=1&size=10&systemId='+this.systemId+'&orgId='+ this.dropdownOrgID + '&roleId=' + this.dropdownRoleID+'&token='+this.token;

            }
            if(this.formSel.input !=  ''){
                detail += '&keyword=' + this.formSel.input;
            }
            this.loadPage(detail);

            //this.rolevisible = !this.rolevisible;
        },
        orShow2(visible){
            this.vs2=visible;


        },
        changePage(pageNum){
            this.currentPage = pageNum;
            var detail = 'page='+ pageNum +'&size='+this.pageSize+'&systemId='+this.systemId+'&token='+this.token;
            this.loadPage(detail);
        },
        show(index,title){
            var casTxt = document.getElementById('actorDataCas').getElementsByClassName('ivu-input');
            casTxt[0].value = ''
            if(title=='upd'){
                this.modalTitle='修改';
                this.selectedTableId = this.data1[index]['id'];
                this.formFr.userNo =  this.data1[index]['mobile'];
                this.formFr.name =  this.data1[index]['name'];
                this.formFr.addressAll = [];
                if(this.actorData.length == 0){
                    router.getOrganizationList('systemId='+this.systemId+'&token='+this.token,this);
                }else {
                    this.updateUser(this.data1[index]['orgName'], this.data1[index]['roleName']);
                }

            }else{
                this.modalTitle='新增';
            }
            this.model1=true;
        },
        reset(){
            this.formSel.input='';
            this.formSel.typePd='';
            this.formSel.typeAd='';
            this.formSel.selectTm=[];
            this.dropdownOrgID = -1;
            this.dropdownRoleID = -1;
            this.rolevisible = 'hiddenRoleDropDown';
            var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
            this.loadPage(detail);
        },
        changeAds(visible){
            this.orAds=visible;
        },
        loadData(item, callback) {
            //console.log(item.value)
            item.loading = true;
            var detail = 'orgId=' + item.value+'&token='+this.token;
            router.getRoleById(detail, this, item, callback, 'getRoleById');


        },
        cascarderShow(val,selData){
            this.formFr.adr = null;
            if(val.length>0) {
                if(selData[selData.length - 1]['__label'] != undefined){
                    this.formFr.adr = {
                        'label': selData[selData.length - 1]['__label'],
                        'value': selData[selData.length - 1]['__value']
                    };
                }else if(selData[selData.length-1]['__label'] == undefined){
                    this.formFr.adr = {
                        'label': selData[selData.length - 1]['label'],
                        'value': selData[selData.length - 1]['value']
                    };
                }

            }else{
                this.formFr.adr = null;
                return false;
            }
        },
        delAdr(index){
            this.formFr.addressAll.splice(index,1);
        },
        cascarOk(){
            if(this.formFr.adr != null){
                this.formFr.addressAll.push(this.formFr.adr);
                this.orAds=false;
            }

        },
        refreshTable(){
            this.model1 = false;
            var detail = 'page='+ this.currentPage +'&size='+this.pageSize+'&systemId='+this.systemId+'&token='+this.token;
            this.loadPage(detail);
        },
        handleAdd(name){
            this.$refs[name].validate((valid) => {
                if (valid) {


                    if (this.formFr.addressAll.length == 0) {
                        //角色不能为空
                        this.$refs.formFr.validateField('addressAll');

                    } else {
                        var addParams = {}
                        addParams = {
                            "systemId": this.systemId,
                            "user": {
                                "account": this.formFr.userNo,
                                "name": this.formFr.name
                            },
                            "org": []
                        }
                        var orgId = [];
                        for (var item in this.formFr.addressAll) {
                            var selected = this.formFr.addressAll[item].value
                            var selectedArr = selected.split(',');
                            orgId.push({
                                "orgId": selectedArr[selectedArr.length - 2],
                                "roleId": selectedArr[selectedArr.length - 1]
                            })
                        }
                        addParams['org'] = orgId;
                        if(this.modalTitle == '修改'){
                            addParams['user']["id"] = this.selectedTableId;
                            router.updateUser(addParams, this,'?token='+this.token);
                        }else {
                            router.addUser(addParams, this,'?token='+this.token);
                        }
                    }
                }else{
                    this.modelLoading = false;
                    setTimeout(() => {
                        this.modelLoading = true;
                    }, 1000);

                }
            })
        },
        getRole(result, item, callback, returnFn){
            if(returnFn == 'getRoleById'){
                this.getRoleById(result, item, callback);
            }else if(returnFn == 'getUpdateFirstRole'){
                this.getUpdateFirstRole(result, item);
            }else{
                this.getUpdateRole(result, item);
            }
        },
        getRoleById(result, item, callback){


            var resultlist = result.obj;
            for(var i in resultlist){
                item.children.push({
                    label : resultlist[i].name,
                    value : resultlist[i].id
                })

            }

            item.loading = false;

            callback();

        },
        closeModal(name){
            this.$refs[name].resetFields();
        },
        handleReset(name){

        },
        del(index){
            this.selectedTableId = this.data1[index]['id'];
            this.model3=true;
        },
        loadPage(detail){
            router.getUserList(detail, this );
        },
        getUserList(result){
            this.total = Math.ceil((result.total/this.pageSize));
            this.totalRecords = result.total;
            //this.currentPage = 1;
            this.data1 = result.list;
        },
        addNewUser(){

            this.modalTitle = '新增';
            if(this.actorData.length == 0){
                router.getOrganizationList('systemId='+this.systemId+'&token='+this.token,this);
            }
            this.formFr.userNo = '';
            this.formFr.name = '';
            this.formFr.addressAll = [];

            this.model1 = !this.model1
        },
        updateUser(orgName , roleName){
            this.selectedOrgName = orgName;
            this.selectedRoleName = roleName;
            this.selectedOrgId = [];
            this.selectedRoleId = [];
            this.selectedOrgCount = 0;
            var orgNameArr = orgName.split(',')
            if(orgNameArr == 0){
                orgNameArr.push(orgName)
            }

            if(this.actorData.length == 0){
                router.getOrganizationList('systemId='+this.systemId+'&token='+this.token,this);
            }else{
                for(var k in orgNameArr) {
                    for (var i in this.actorData) {
                        if (orgNameArr[k] == this.actorData[i].label) {
                            this.selectedOrgId.push({name:orgNameArr[k],id: this.actorData[i].value,parentId:this.actorData[i].parentId});
                        } else {
                            for (var j in this.actorData[i].children) {
                                if (orgNameArr[k] == this.actorData[i].children[j].label) {
                                    this.selectedOrgId.push({name:orgNameArr[k],id: this.actorData[i].children[j].value,parentId:this.actorData[i].children[j].parentId});
                                }
                            }
                        }
                    }
                }

                for(var item in this.selectedOrgId){
                    var detail = 'orgId=' + this.selectedOrgId[item].id+'&token='+this.token;

                    router.getRoleById(detail, this, {}, {}, 'getUpdateRole');
                }

            }
        },
        getUpdateRole(result, item){
            this.selectedOrgCount += 1;
            this.dropDownRoleList = [];

            var resultlist = result.obj;
            var roleArr = this.selectedRoleName.split(',')
            for(var k in roleArr) {
                for (var i in resultlist) {
                    if (roleArr[k] == resultlist[i].name) {
                        this.selectedRoleId.push({id: resultlist[i].id, name: resultlist[i].name,orgId:
                            resultlist[i]['orgId']})
                    }
                }
            }
            for(var i in resultlist){

                this.dropDownRoleList.push({
                    value: resultlist[i].name + '|' + resultlist[i].id,
                    id: resultlist[i].id,
                    label: resultlist[i].name
                })
            }

            //信美合作商 / 信美合作商1部 / 信美合作商1部组织管理员
            //6,7,9
            if(this.selectedOrgCount == this.selectedOrgId.length) {
                for(var i = 0; i<this.selectedOrgId.length; i++){
                    for(var j = 0; j<this.selectedRoleId.length; j++){
                        if(this.selectedRoleId[j]['orgId'] == this.selectedOrgId[i].id){
                            var valueStr = this.selectedOrgId[i].id + ',' + this.selectedRoleId[j].id;
                            var nameStr = this.selectedOrgId[i].name + ' / '+this.selectedRoleId[j].name;
                            this.formFr.addressAll.push({'value': valueStr, 'label': nameStr});
                        }
                    }
                }

            }


        },
        deleteUser(){
            //this.selectedTableId
            var params = {
                "systemId": this.systemId,
                "userIds": [this.selectedTableId]
            }
            router.deleteUser(params, this,'?token='+this.token);
            this.model3 = false;
        },
        resetUserPassword(index){
            router.resetUserPassword([this.data1[index].id],this,'?token='+this.token);
            /*if(params.index){//重置成功
                this.$Message.info('重置成功<br/>密码为'+this.formFr.pwd);
            }else{
                this.$Message.error('重置失败');
            }  */
        },
        userActive_inActive(index){
            var activeurl = ''
            if(this.data1[index].status == '1'){
                activeurl = 'active'
            }else{
                activeurl = 'inactive'

            }
            router.userActive_inActive(activeurl+'?token='+this.token, [this.data1[index].id], this);
        },
        getOrganizationList(result, dataparams){
            var objArr = result.obj;
            var childrenList = []
            this.actorData = [];
            this.organizationList = [];
            for (var item in objArr){
                if(objArr[item]['parentId'] == null){
                    this.actorData.push({
                        value: objArr[item]['id'],
                        label: objArr[item]['name'],
                        parentId:  objArr[item]['parentId'],
                        children:[],
                        loading: false
                    })
                    this.organizationList.push({
                        value: objArr[item]['name'] + '|' + objArr[item]['id'],
                        id:objArr[item]['id'],
                        label: objArr[item]['name']
                    })
                }else{
                    for(var i=0; i<this.actorData.length; i++){

                        if(this.actorData[i].value == objArr[item]['parentId']){

                            this.actorData[i].children.push({
                                value: objArr[item]['id'],
                                label: objArr[item]['name'],
                                parentId:  objArr[item]['parentId'],
                                children:[],
                                loading: false
                            })
                            this.organizationList.push({
                                value: objArr[item]['name'] + '|' + objArr[item]['id'],
                                id:objArr[item]['id'],
                                label: objArr[item]['name']
                            })
                            var detail = 'orgId=' + this.actorData[i].value +'&token='+this.token;
                            router.getRoleById(detail, this, this.actorData[i].children,{},  'getUpdateFirstRole');
                        }
                    }
                }
            }
            if(dataparams['orgName']!= undefined){
                this.updateUser(dataparams['orgName'], dataparams['roleName']);
            }
        },
        getUpdateFirstRole(result, item){
            var list=result.obj;
            if(list!=undefined){
                for(var l in list){
                    item.push({
                                value: list[l]['id'],
                                label: list[l]['name'],
                                parentId: list[l]['parentId']
                            });
                }
            }
        }
    }
}
</script>
