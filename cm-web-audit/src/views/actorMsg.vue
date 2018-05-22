
<template>
  <div class="sections page_tab">
    <!-- <h1>角色管理</h1> -->
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
                                        <Input v-model="formSel.input" icon="ios-search" placeholder="角色名称" @on-enter="searchbyName"></Input>
                                        <Button type="warning" @click="searchbyName">查询</Button>

                                        <Dropdown trigger="click" ref="orgList" class="showMn"  @on-click="showMenu" @on-visible-change="orShow">
                                            <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                                                所属组织<span v-text="formSel.typePd"></span>
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
                                        <Button v-if="formSel.input!='' || formSel.typePd!=''" @click="reset">重置</Button>
                                    </FormItem>
                                </Form></Col>

                                <Col :sm="2" :xs="24"><div class="float_right">
                                <Button type="warning" @click="show(0,'add')" :disabled="opArr.indexOf('add')<0">新增</Button>
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

    <Modal v-model="model1" :title="modalTitle" :loading="modalLoading" width="600" @on-cancel="closeModal('formFr')" @on-ok="handleAdd('formFr')">
         <Form ref="formFr" :model="formFr" :rules="ruleFr" :label-width="80">
            <FormItem label="所属组织" prop="addressAll" class="ivu-form-item-required">
                <Dropdown trigger="click" class="showMn" :visible="orAds"
                          @on-visible-change="changeAds"
                          style="width:100%;">
                    <Button type="ghost" :disabled="formFr.disabled" style="width:100%;border:1px solid #dddee1;text-align:left;padding: 6px 8px;">
                        <span v-if="formFr.addressAll.length<=0">请选择组织</span>
                        <span v-else v-for="(a,index) in formFr.addressAll" :key="index"><span v-text="a.toString()"></span><label @click="delAdr(index)"><Icon type="close" style="margin:0 5px;cursor:pointer;"></Icon></label></span>
                        
                        <Icon type="plus" class="float_right" style="    margin-top: 2px;"></Icon>
                    </Button>
                    <DropdownMenu slot="list" style="padding:5px 10px;">
                        <Cascader :data="actorData" id='actorDataCas' change-on-select @on-change="cascarderShow"></Cascader>
                        <Button type="primary" class="float_right" style="margin-top:5px;" @click="cascarOk">确定</Button>
                    </DropdownMenu>
                </Dropdown>
            </FormItem>
            <FormItem label="角色名称" prop="name" class="ivu-form-item-required">
                <Input v-model="formFr.name" :maxlength="15" placeholder="输入角色名称，不超过15个字"></Input>
            </FormItem>
            <FormItem label="描述" prop="txtFr">
                <Input type="textarea" v-model="formFr.txtFr" :rows="3" :maxlength="50" placeholder="输入描述" @on-keyup="txtKeyup('formFr')"></Input>
                <div class="submitDesc"><span v-text="formFr.descCount"></span></div>
            </FormItem>
         </Form>
    </Modal>

      <Modal v-model="model2" title="分配权限" width="900" @on-ok="updateRolePermission">
          <Checkbox class="chkAll" :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>

          <Row class="powerShow">
              <Col :sm="8" :xs="24" :style="powerShowhei">
              <h3>一级菜单</h3>

              <!--<CheckboxGroup v-model="modules">-->
                  <div v-for="(a, index) in moduleList" :key="index">
                      <Checkbox v-model="a.checked"
                                @on-change="modulesCheckboxClicked(a.id)">

                      </Checkbox>
                      <div style="    display: inline-block;cursor:pointer;" @click="modulesClicked(a.id)">{{a.name}}
                      </div>
                      <!--<div style="    width: 15px; float: right; position: relative; top: 9px;"
                            @click="moduleChange(a.id)">
                          <Icon  style="cursor: pointer;" type="ios-arrow-right"></Icon>
                      </div>-->
                  </div>
                  <!--<Checkbox label="渠道管理"></Checkbox>
                  <Checkbox label="授信资料"></Checkbox>
                  <Checkbox label="订单管理"></Checkbox>-->
              <!--</CheckboxGroup>-->
              </Col>
              <Col :class="visible_page" :sm="8" :xs="24" :style="powerShowhei">
              <h3>二级菜单</h3>
              <!--<CheckboxGroup v-model="pages" @on-change="pageCheckAllGroupChange">-->
              <div v-if="shownPageList.length != 0">
                  <div v-for="(a, index) in shownPageList" :key="index">
                      <Checkbox v-model="a.checked"
                                @on-change="pagesCheckboxClicked(a.id)">
                          {{a.name}}
                      </Checkbox>
                  <!--<Checkbox  :label="a.id">{{a.name}} </Checkbox>
                      <div style="    width: 15px; float: right; position: relative; top: 9px;" @click="pageChange(a.id)"><Icon  style="cursor: pointer;"
                            type="ios-arrow-right"></Icon></div>-->
                  </div>
              </div>
              <p style="text-align:center;padding-top:10px;" v-else>暂无二级菜单</p >
                  <!--<Checkbox label="审核"></Checkbox>
                  <Checkbox label="查询"></Checkbox>-->
              <!--</CheckboxGroup>-->
              </Col>
              <Col :class="visible_permission" :style="powerShowhei" :sm="8" :xs="24">
              <h3>功能</h3>
              <!--<CheckboxGroup v-model="permissions"  @on-change="permissionCheckAllGroupChange">-->
              <div v-if="shownPermissionList.length != 0">
                  <div v-for="(a, index) in shownPermissionList" :key="index">
                      <Checkbox v-model="a.checked"
                                @on-change="permissionsCheckboxClicked(a.id)">
                          {{a.name}}
                      </Checkbox>
                      <!--<Checkbox :label="a.id">{{a.name}}</Checkbox>-->
                      <!--<div style="    width: 15px; float: right; position: relative; top: 9px;"
                            @click="pageChange(a.id)">
                          <Icon  style="cursor: pointer;" type="ios-arrow-right"></Icon>
                      </div>-->
                  </div>
              </div>
              <p style="text-align:center;padding-top:10px;" v-else>暂无功能</p >
                  <!--<Checkbox label="Excel导入"></Checkbox>
                  <Checkbox label="导出"></Checkbox>-->
              <!--</CheckboxGroup>-->
              </Col>
          </Row>
      </Modal>


    <Modal v-model="model3" width="360">
        <div style="text-align:center;margin-top:20px;">
            <p>确定要删除该成员吗？</p>
        </div>
            <Row :gutter="16" slot="footer"><Col span="12"><Button type="ghost" long @click="model3=!model3">取消</Button></Col>
            <Col span="12"><Button type="warning" @click="deleteRole" long>确定</Button></Col>
            </Row>
    </Modal>
  </div>
</template>
<style>
    .hide{
        display: block;
    }
</style>
<script>
import router from  '../router/teamSystem.js';

export default {
  name: 'sections',
  props:['showSystem'],
  data () {
    const _that=this;
    const validateRole = (rule, value, callback) => {

        if (value.length == 0) {
            callback(new Error('所属组织不能为空'));
        }else {
            callback();
        }
    };
    const validateLen=function(rule,value,callback){
        if(value.length>=50){
            return callback(new Error('备注至多为50字'));
        }else{
            callback();
        }
    };
    const checkName=function(rule,value,callback){
        if (value.length == 0) {
            callback(new Error('角色名称不能为空'));
        }else{
            var detail='token='+_that.token+'&name='+value+'&systemId='+_that.systemId;
            router.checkRoleName(detail,this,callback);
        }
    };
    return {
        tabSize:'default',
        tabVal:'1',
        systemId:'1',
        powerShowhei: '',
        indeterminate: true,
        module_indeterminate: true,
        page_indeterminate: true,
        checked: true,
        checkAll: false,
        checkAllGroup: ['分配', '审核'],
        model1:false,
        model2: false,
        model3:false,
        visible_page: 'pagevisible',//'pagehidden',
        visible_permission: 'pagevisible',//'permissionhidden',
        moduleList: [],
        modules:[],
        pages:[],
        permissions:[],
        pageList: [],
        shownPageList:[],
        shownPermissionList:[],
        permissionList : [],
        organizationList: [],
        dropdownOrgID: -1,
        vs:false,
        vs2:false,
        orAds:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageSize:10,
        currentPage:1,
        modalTitle:'新增',
        modalLoading:true,
        modalSelectedId: -1,
        selectedOrganizationId:-1,
        opArr:[],
        formSel:{
            input:'',
            typePd:'',
            typeAd:''
        },
        formFr:{
            adr:'',
            addressAll:[],
            oldName:'',
            name:'',
            txtFr:'',
            descCount:'',
            descNm:0,
            disabled:false
        },
        ruleFr:{
            descLength:50,
            name:[{validator:checkName,trigger:'blur'}],
            txtFr:[{validator:validateLen,trigger:'blur'}],
            addressAll:[{validator:validateRole,trigger:'blur'}]
        },
        actorData: [],
        columns1: [
        {
            title: '所属组织',
            key: 'orgName'
        },
        {
            title: '上一级组织',
            key: 'parentOrgName'
        },
        {
            title: '角色名称',
            key: 'name'
        },{
            title: '描述',
            key: 'remarks',
            type:'html'
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
                return h('div', [

                    h('Button', {
                        props: {
                            type: 'warning',
                            size: 'small'
                        },
                        style:{
                            'display': this.data1[params.index]['isManager'].toString() == 'false' ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => {
                                this.showPermission(params.index);
                            }
                        }
                    }, '分配权限'),
                    h('Button', {
                        props: {
                            type: 'warning',
                            size: 'small',
                            disabled:this.opArr.indexOf('update')<0
                        },
                        style:{
                            'marginLeft':'5px',
                            'display': this.data1[params.index]['isManager'].toString() == 'false' ? 'inline-block' :
                                'none'
                        },
                        on: {
                            click: () => {
                                this.show(params.index,'upd');
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'ghost',
                            size: 'small',
                            disabled:this.opArr.indexOf('delete')<0
                        },
                        style:{
                            'marginLeft':'5px',
                            'display': this.data1[params.index]['isManager'].toString() == 'false' ? 'inline-block' : 'none'
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
        data1: []
        }
    },
    created:function(){
        var op=this.$route.query.op;
        for(var o in op){
            var p=op[o].split(':');
            this.opArr.push(p[p.length-1]);
        }
        this.token=this.$store.getters.token;
        this.loginSuccess();

        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=60;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
        
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    watch:{
        tabVal:function(val){
            this.systemId=val;
            this.data1=[];
            this.currentPage=1;
            this.$refs['orgList'].visible=false;
            this.reset();
            var casTxt = document.getElementById('actorDataCas')
            if(casTxt){
                casTxt.value = ''
            }
            router.getOrganizationList('systemId='+this.systemId+'&token='+this.token, this);
        }
    },
    methods: {
        loginSuccess(){
            router.getOrganizationList('systemId='+this.systemId+'&token='+this.token, this)
            var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
            this.loadPage(detail);
        },
        getOrganizationList(result, dataparams){
            var objArr = result.obj;
            var childrenList = [];
            this.actorData = [];
            this.organizationList = [];
            for (var item in objArr){
                if(objArr[item]['parentId'] == null){
                    this.actorData.push({
                        value: objArr[item]['id'],
                        label: objArr[item]['name'],
                        children:[]
                    })
                    this.organizationList.push({
                        value: objArr[item]['name'] + '|' + objArr[item]['id'],
                        id:objArr[item]['id'],
                        label: objArr[item]['name']
                    })
                }else{
                    for(var i=0; i<this.actorData.length; i++){

                        if(this.actorData[i].value == objArr[item]['parentId']){

                            this.actorData[i]['children'].push({
                                value: objArr[item]['id'],
                                label: objArr[item]['name']
                            })
                            this.organizationList.push({
                                value: objArr[item]['name'] + '|' + objArr[item]['id'],
                                id:objArr[item]['id'],
                                label: objArr[item]['name']
                            })
                        }
                    }
                }

            }


        },
        showMenu(val){
            var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
            if(val =='全部' ){
                this.formSel.typePd='';
                this.dropdownOrgID = -1;
            }else{
                var id = val.split('|')[1];
                var name  = val.split('|')[0];
                this.formSel.typePd=' : '+ name;
                detail = 'page=1&size=10&systemId='+this.systemId+'&orgId='+ id+'&token='+this.token;
                this.dropdownOrgID = id;

            }
            if(this.formSel.input != ''){
                detail += '&name='+ this.formSel.input;
            }
            this.loadPage(detail);
        },
        searchbyName(){
            var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
            if(this.dropdownOrgID != -1){
                detail += '&orgId='+ this.dropdownOrgID;
            }

            detail += '&name='+ this.formSel.input;
            this.loadPage(detail);
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu2(val){
            if(val!='全部' && val!=''){
                this.formSel.typeAd=' : '+val;
            }else{
                this.formSel.typeAd='';
            }
        },
        orShow2(visible){
            this.vs2=visible;
        },
        changePage(pageNum){
            /*this.data1=this.*/
            this.currentPage = pageNum;
            var detail = 'page='+ pageNum +'&size='+this.pageSize+'&systemId='+this.systemId+'&token='+this.token;
            this.loadPage(detail);
        },
        show(index,title){
            this.modalLoading = true;
            this.formFr.descNm=0;
            this.formFr.name='';
            this.formFr.addressAll=[];
            this.formFr.txtFr='';
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;

            var casTxt = document.getElementById('actorDataCas').getElementsByClassName('ivu-input');
            casTxt[0].value = ''

            this.formFr.disabled = false;
            if(title=='upd'){
                this.formFr.disabled = true;
                this.modalSelectedId = this.data1[index]['id'];

                this.modalTitle='修改';
                this.formFr.descNm=0;
                this.formFr.name = this.data1[index]['name'];
                this.formFr.addressAll.push(this.data1[index]['orgName']);
                this.formFr.txtFr= this.data1[index]['remarks'];
                this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
                this.formFr.oldName=this.data1[index]['name'];

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

            var detail = 'page=1&size=10&systemId='+this.systemId+'&token='+this.token;
            this.loadPage(detail)
        },
        changeAds(visible){
            this.orAds=visible;
        },
        cascarderShow(val,selData){

            if(val.length>0){
                if(selData[selData.length-1]['__label'] == undefined){
                    this.formFr.adr=selData[selData.length-1]['label'];
                }else{
                    this.formFr.adr=selData[selData.length-1]['__label'];
                }
                this.selectedOrganizationId = selData[selData.length-1]['value'];
            }


        },
        delAdr(index){
            this.formFr.addressAll.splice(index,1);
        },
        cascarOk(){
            this.formFr.addressAll = [];
            this.formFr.addressAll.push(this.formFr.adr);
            this.orAds=false;
        },
        closeModal(name){
            this.$refs[name].resetFields();
        },
        handleReset(name){

        },
        del(index){
            this.modalSelectedId = this.data1[index]['id'];
            this.model3=true;
        },
        txtKeyup(name){
            var val=this.formFr.txtFr;
            this.formFr.descNm=val.length;
            this.formFr.descCount=this.formFr.descNm+'/'+this.ruleFr.descLength;
            if(val.length>=this.ruleFr.descLength){
                this.$refs[name].validate();
            }
        },
        refreshTable(){
            var detail = 'page='+ this.currentPage +'&size='+this.pageSize+'&systemId='+this.systemId+'&token='+this.token;
            this.loadPage(detail);
        },
        loadPage(detail){
            router.getRoleList(detail, this );
        },
        getRolelist(result){
            this.total = Math.ceil((result.total/this.pageSize));
            this.totalRecords= result.total;
            //this.currentPage = 1;
            this.data1=[];
            var list=result.list;
            if(list!=undefined){
                for(var l in list){
                    var arr={};
                    arr['id']=list[l].id;
                    arr['orgName']=list[l].orgName;
                    if(list[l].parentOrgName!=null && list[l].parentOrgName!=''){
                        arr['parentOrgName']=list[l].parentOrgName;
                    }else{
                       arr['parentOrgName']='无';
                    }
                    arr['name']=list[l].name;
                    arr['remarks']=list[l].remarks;
                    arr['isManager']=list[l].isManager;
                    this.data1.push(arr);
                }
            }

        },
        handleAdd(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(this.formFr.name!=this.formFr.oldName){
                        this.$refs.formFr.validateField('name');
                    }else{
                        return false;
                    }
                    var detail = {}
                    if(this.modalTitle=='修改'){
                        detail = {"id": this.modalSelectedId,"name": this.formFr.name,"remarks": this.formFr.txtFr}
                        router.updateRole(detail, this,'?token='+this.token);

                    }else {
                        if(this.formFr.addressAll.length<=0 || this.formFr.addressAll==undefined){
                            this.$refs.formFr.validateField('addressAll');
                        }else{
                            detail = {
                                "orgId": this.selectedOrganizationId,
                                "name":  this.formFr.name,
                                "remarks":  this.formFr.txtFr,
                                "systemId": this.systemId
                            }
                            router.addRole(detail, this,'?token='+this.token);
                        }
                    }
                    this.model1=false;
                }else{
                    this.modalLoading = false;
                    setTimeout(() => {
                        this.modalLoading = true;
                    }, 1000);
                    this.$Message.warning('验证失败');
                }
            })

        },
        deleteRole(){
            var detail = [this.modalSelectedId];

            router.deleteRole(detail, this,'?token='+this.token);
            this.model3 = false;
        },
        showPermission(index){
            //this.visible_page = 'pagehidden';
            //this.visible_permission = 'permissionhidden';

            this.modules = [];
            this.pages = [];
            this.permissions = []
            this.moduleList= [];
            this.pageList = [];
            this.permissionList = [];
            this.shownPageList = [];
            this.shownPermissionList = [];

            this.modalSelectedId = this.data1[index]['id'];
            var detail='systemId='+this.systemId+'&roleId='+this.data1[index]['id']+'&token='+this.token;
            router.listRoleAuthPermission(detail, this, this.data1[index]['id']);
        },
        listRoleAuthPermission(result, dataindexId){

            this.moduleList= [];
            this.pageList = [];
            this.permissionList = [];
            this.shownPageList = [];
            this.shownPermissionList = [];
            var resultArr = result.obj;

            for(var item in resultArr){
                if(resultArr[item].type == "memu" && resultArr[item].parentId == null){
                    this.moduleList.push(resultArr[item]);
                    this.moduleList[this.moduleList.length-1]['checked'] = false;
                }else if(resultArr[item].type == "memu" && resultArr[item].parentId != null ){
                    this.pageList.push(resultArr[item]);
                    this.pageList[this.pageList.length-1]['checked'] = false;
                }else if(resultArr[item].type == 'permission' && resultArr[item].parentId != null ){
                    this.permissionList.push(resultArr[item]);
                    this.permissionList[this.permissionList.length-1]['checked'] = false;
                }
            }
            
            var detail='systemId='+this.systemId+'&roleId='+dataindexId+'&token='+this.token;
            router.listRolePermission(detail, this);

            if(this.moduleList.length != 0 ){
                this.indeterminate = true;
                this.model2 = true;
            }else{
                this.$Message.warning('无可分配权限');
            }
            


        },
        listRolePermission(result){
            var resultArr = result.obj;
            this.module_indeterminate = false;
            this.modules = [];


            for(var item in resultArr) {
                if (resultArr[item].type == "memu" && resultArr[item].parentId == null) {
                    for (var m in this.moduleList) {
                        if (this.moduleList[m].id == resultArr[item].id) {
                            this.moduleList[m]['checked'] = true;
                            this.moduleList[m]['name'] = ' '+this.moduleList[m]['name'];
                        }
                    }
                }else if (resultArr[item].type == "memu" && resultArr[item].parentId != null) {
                    for (var p in this.pageList) {
                        if (this.pageList[p].id == resultArr[item].id) {
                            this.pageList[p]['checked'] = true;
                            this.pageList[p]['name'] = ' '+this.pageList[p]['name'];
                        }
                    }
                }else if (resultArr[item].type == "permission" && resultArr[item].parentId != null) {
                    for (var pp in this.permissionList) {
                        if (this.permissionList[pp].id == resultArr[item].id) {
                            this.permissionList[pp]['checked'] = true;
                            this.permissionList[pp]['name'] = ' '+this.permissionList[pp]['name'];
                        }
                    }
                }
            }
            for(var item in resultArr) {
                if (resultArr[item].type == "memu" && resultArr[item].parentId == null) {
                    this.modulesClicked(resultArr[item].id);
                }
            }
            if(this.pageWin>=768){
                var powershow = $('.powerShow').height();
                this.powerShowhei = 'height:' + powershow +'px';
            }
            


        },
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            for(var item in this.moduleList){
                this.moduleList[item]['checked'] = this.checkAll;
                this.modulesCheckboxClicked(this.moduleList[item].id);
            }

        },
        modulesCheckboxClicked(id){
            this.shownPageList = [];
            this.shownPermissionList = [];
            for(var item in this.moduleList){
                if(this.moduleList[item]['id'] == id){
                    //this.moduleList[item]['checked'] = !this.moduleList[item]['checked'];

                    for(var item1 in this.pageList){
                        if(this.pageList[item1]['parentId'] == id){
                            this.shownPageList.push(this.pageList[item1])
                            this.shownPageList[this.shownPageList.length-1]['checked'] = this.moduleList[item]['checked'];
                            for(var item2 in this.permissionList){
                                if(this.permissionList[item2]['parentId'] == this.pageList[item1].id){
                                    this.shownPermissionList.push(this.permissionList[item2])
                                    this.shownPermissionList[this.shownPermissionList.length-1]['checked'] = this.moduleList[item]['checked'];
                                }
                            }
                        }
                    }
                }
            }

        },
        modulesClicked(id){

            this.shownPageList = [];
            this.shownPermissionList = [];

            for(var item in this.moduleList){
                if(this.moduleList[item]['id'] == id){
                    for(var item1 in this.pageList){
                        if(this.pageList[item1]['parentId'] == id){

                            this.shownPageList.push(this.pageList[item1])
                            //this.shownPageList[this.shownPageList.length-1]['checked'] = this.modules[item]['checked'];
                            for(var item2 in this.permissionList){
                                if(this.permissionList[item2]['parentId'] == this.pageList[item1].id){
                                    this.shownPermissionList.push(this.permissionList[item2])
                                    //this.shownPermissionList[this.shownPermissionList.length-1]['checked'] = this.modules[item]['checked'];
                                }
                            }
                        }
                    }
                }
            }
        },
        pagesCheckboxClicked(id){
            for(var item in this.shownPageList){
                //console.log(item+'for: '+ this.shownPages[item].id)
                if(this.shownPageList[item].id == id){
                    //this.shownPageList[item]['checked'] = !this.shownPageList[item]['checked'];
                    this.shownPageList[item]['name'] = ' '+this.shownPageList[item]['name']

                    for(var item2 in this.shownPermissionList){
                        //console.log(item2+'for item2: '+this.shownPages[item]['checked'] + this.shownPermissions[item2].parentId)
                        if(this.shownPermissionList[item2]['parentId'] == this.shownPageList[item].id){
                            this.shownPermissionList[item2]['checked'] = this.shownPageList[item]['checked'];
                        }
                    }
                }
            }
            var parentidFlag = false;
            var parentID = 0;
            for(var item in this.shownPageList){
                parentID = this.shownPageList[item].parentId;
                for(var m in this.moduleList){
                    if(this.moduleList[m]['id'] == parentID && this.shownPageList[item]['checked'] == true){
                        this.moduleList[m]['checked'] = this.shownPageList[item]['checked']
                        parentidFlag = true;
                        break;
                    }/*else if( this.modules[m]['id'] == parentID && this.shownPages[item]['checked'] == false){
								this.modules[m]['checked'] = this.shownPages[item]['checked']
							}*/
                }

            }
            if(parentidFlag == false){
                for(var m in this.moduleList){
                    if(this.moduleList[m]['id'] == parentID){
                        this.moduleList[m]['checked'] = false
                        break;
                    }
                }
            }

        },
        permissionsCheckboxClicked(id){
            for(var item in this.shownPermissionList){
                //console.log(item+'for: '+ this.shownPages[item].id)
                if(this.shownPermissionList[item].id == id){
                    //this.shownPermissionList[item]['checked'] = !this.shownPermissionList[item]['checked'];
                    this.shownPermissionList[item]['name'] = ' '+this.shownPermissionList[item]['name']
                }
            }
            var parentidFlag = false;
            var parentID = 0;
            var pagesTrueObj = [];
            for(var item in this.shownPermissionList){
                parentID = this.shownPermissionList[item].parentId;
                for(var m in this.shownPageList){

                    if(this.shownPageList[m]['id'] == parentID && this.shownPermissionList[item]['checked'] == true){
                        //pagesTrueObj.push({id: parentID, value: this.shownPermissionList[item]['checked']});
                        /*this.shownPageList[m]['checked'] = this.shownPermissionList[item]['checked']
                        parentidFlag = true;
                        break;*/
                        pagesTrueObj.push({id: parentID, value: this.shownPermissionList[item]['checked']});


                    }/*else if( this.modules[m]['id'] == parentID && this.shownPages[item]['checked'] == false){
								this.modules[m]['checked'] = this.shownPages[item]['checked']
							}*/
                }

            }
            //console.log(pagesTrueObj)
            //this.checkArrDuplicate(pagesTrueObj);

            for(var m in this.shownPageList){
                this.shownPageList[m]['checked'] = false;
                for(var obj in pagesTrueObj ){
                    if(this.shownPageList[m]['id'] == pagesTrueObj[obj].id){
                        this.shownPageList[m]['checked'] = pagesTrueObj[obj].value;
                    }else{
                        //this.shownPageList[m]['checked'] = false;
                    }
                }
            }


            var parentidFlag = false;
            var parentID = 0;
            for(var item in this.shownPageList){
                parentID = this.shownPageList[item].parentId;
                for(var m in this.moduleList){
                    if(this.moduleList[m]['id'] == parentID && this.shownPageList[item]['checked'] == true){
                        this.moduleList[m]['checked'] = this.shownPageList[item]['checked']
                        parentidFlag = true;
                        break;
                    }/*else if( this.modules[m]['id'] == parentID && this.shownPages[item]['checked'] == false){
								this.modules[m]['checked'] = this.shownPages[item]['checked']
							}*/
                }

            }
            if(parentidFlag == false){
                for(var m in this.moduleList){
                    if(this.moduleList[m]['id'] == parentID){
                        this.moduleList[m]['checked'] = false
                        break;
                    }
                }
            }
        },

       updateRolePermission(){
            var params = {
                "roleId": this.modalSelectedId,
                "memuList":[],
                "permissionList":[]
           }
            var menuList = [];
            var permissionList1 = [];
            for(var item in this.moduleList){
                if(this.moduleList[item].checked == true){
                    menuList.push(this.moduleList[item].id);
                }
            }
            for(var item in this.pageList){
                if(this.pageList[item].checked == true) {
                    menuList.push(this.pageList[item].id);
                }
            }
            for(var item in this.permissionList){
                if(this.permissionList[item].checked == true) {
                    permissionList1.push(this.permissionList[item].id);
                }
            }
            params['memuList'] = menuList;
            params['permissionList'] = permissionList1;
            //console.log('ok clicked')
            router.updateRolePermission(params, this,'?token='+this.token);
            

        }
    }
}
</script>
