<template>
  <div class="sections page_tab">
    <!-- <h1>组织管理</h1> -->
    <div class="pl_body">
    <div class="">
        <Tabs class="tabs" :size="tabSize" v-model="tabVal">
            <TabPane v-for="s in showSystem" :label="s.remarks" :name="s.id.toString()">
                <div class="creditUser">
                    <Row class="form_row">
                        <Col :sm="20" :xs="24">
                                <Form :model="formSel" class="downMenu">
                                    <FormItem>
                                        <Input style="display:none;"></Input>
                                        <Input v-model="formSel.input" icon="ios-search" placeholder="组织名称/管理员姓名/手机号码" @on-enter="loadData"></Input>
                                        <Button type="warning" @click="loadData">查询</Button>

                                        <!-- <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                                            <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                                                组织层级<span v-text="formSel.typePd"></span>
                                                <Icon type="arrow-down-b"></Icon>
                                            </Button>
                                            <DropdownMenu slot="list">
                                                <DropdownItem name="全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>
                                                <DropdownItem name="一级" :selected="formSel.typePd.indexOf('一级')>-1">一级</DropdownItem>
                                                <DropdownItem name="二级" :selected="formSel.typePd.indexOf('二级')>-1">二级</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown> -->
                                        
                                        <Button @click="reset" v-if="formSel.input!=''">重置</Button>
                                    </FormItem>
                                </Form></Col>
                                <Col :sm="4" :xs="24"><div class="float_right">
                                <Button type="ghost" v-if="orSuper" @click="showOrg">查看组织架构</Button>
                                <Button type="warning" :disabled="opArr.indexOf('add')<0" @click="show">新增</Button>
                            </div></Col>
                        </Row>
                        <div class="table_show">
                            <zk-table
                            ref="table" 
                            index-text="#"
                            :border="props.border" 
                            :show-header="props.showHeader"
                            :show-summary="props.showSummary"
                            :show-row-hover="props.showRowHover"
                            :show-index="props.showIndex"
                            :is-fold="props.isFold"
                            :tree-type="props.treeType" 
                            :data="data1"
                            :columns="columns1"
                            :expand-type="props.expandType"
                            :selection-type="props.selectionType"
                            >
                            <template slot="action" scope="scope">
                                <div v-if = "scope.row.canEdit" :class="scope.row.selAlct">
                                    <Button type="warning" size="small" @click="getPower(scope.row)">分配权限</Button>
                                    <Button type="warning" size="small" :disabled="opArr.indexOf('update')<0" @click="show(scope.row,'upd')">修改</Button>
                                    <Button type="ghost" class="btnAP" :disabled="opArr.indexOf('delete')<0" size="small" @click="del(scope.row)">删除</Button>
                                </div>
                            </template>
                            <!-- <template slot="$expand" scope="scope"> 
                                {{ selectedOrgId=`${scope.row.id}`}}
                                {{ `${scope.rowIndex}` }}
                              <div v-for="o in orgList" v-if="o.parentId==`${scope.row.id}`"></div>
                             </template>  -->
                            <!-- 
                            :stripe="props.stripe"
                            :border="props.border"
                            :show-header="props.showHeader"
                            :show-summary="props.showSummary"
                            :show-row-hover="props.showRowHover"
                            :show-index="props.showIndex"
                            :tree-type="props.treeType"
                            :is-fold="props.isFold"
                            :expand-type="props.expandType"
                            :selection-type="props.selectionType" 

                                -->
                            </zk-table>
                        <!-- <Table border :columns="columns1" :data="data1" ref="table"></Table> --></div>
                        <Row :gutter="16" v-if="pageWin>=768">
                            <Col :sm="5" :xs="24">
                                <div class="total">共{{total}}页</div>
                            </Col>
                            <Col :sm="19" :xs="24" class="txt_right">
                                <Page :total="totalRecords" :page-size="pageSize" show-elevator @on-change="changePage"></Page>
                            </Col>
                        </Row>
                        <Page v-else :total="totalRecords" :page-size="pageSize" simple @on-change="changePage"></Page>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>

    <Modal v-model="model1" class="noFooter minModal" :title="modalTitle" width="600">
         <Form ref="formFr" :model="formFr" :rules="ruleFr" :label-width="90">
            <FormItem label="组织名称" prop="name">
                <Input v-model="formFr.name" placeholder="输入组织名称"></Input>
            </FormItem>
            <FormItem label="组织层级" prop="userNo" class="ivu-form-item-required">
                <Select v-model="formFr.userNo" :disabled="modalTitle=='修改'" @on-change="selChange">
                    <Option value="1" v-if="orSuper">一级</Option>
                    <Option value="2">二级</Option>
                </Select>
            </FormItem>
            
            <FormItem label="上一级组织" prop="upOrganiza" v-if="formFr.userNo=='2'">
                <Select v-model="formFr.upOrganiza" :disabled="modalTitle=='修改'">
                    <Option v-for="list in formFr.upOrganizaList" :key="list.id" :value="list.id">{{list.name}}</Option>
                </Select>
            </FormItem>
            <div class="float_right">
                <Button type="ghost" @click="closeModal('formFr')">取消</Button>
                <Button type="warning" @click="handleAdd('formFr',modalTitle)">确定</Button>
            </div>
         </Form>
        <div slot="footer"></div>
    </Modal>

    <Modal v-model="model2" title="分配权限" width="900"  @on-ok="updateOrgPermission">
        <Checkbox class="chkAll" :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
        <Row class="powerShow">
            <Col :sm="8" :xs="24" :style="powerShowhei">
                <h3>一级菜单</h3>
                <!--<ul>
                    <CheckboxGroup @on-change="checkAllGoupChange">
                        <li v-for="(p,i) in powerArr" key="p.id" :class="{'active':powerChk[i]}" @click="shownexMenu(i)"><Checkbox v-model="data">&nbsp;</Checkbox>{{p.name}}</li>
                    </CheckboxGroup>
                </ul>-->
                <div v-for="(a, index) in moduleList" :key="index">
                  <Checkbox v-model="a.checked"
                            @on-change="modulesCheckboxClicked(a.id)">

                  </Checkbox>
                  <div style="    display: inline-block;cursor:pointer;" @click="modulesClicked(a.id)">{{a.name}}
                  </div>
              </div>

            </Col>
            <Col :sm="8" :xs="24" :style="powerShowhei">
                <h3>二级菜单</h3>
                <!--<ul v-if="menuChld.length>0">
                    <CheckboxGroup @on-change="checkAllGoupChange">
                        <li v-for="(m,i) in menuChld" key="m.id" @click=""><Checkbox v-model="data">&nbsp;</Checkbox>{{m.name}}</li>
                    </CheckboxGroup>
                </ul>-->
                <div v-if="shownPageList.length != 0">
                    <div  v-for="(a, index) in shownPageList" :key="index">

                      <Checkbox v-model="a.checked"
                                @on-change="pagesCheckboxClicked(a.id)">
                          {{a.name}}
                      </Checkbox>
                     </div>
                 </div>

                <p style="text-align:center;padding-top:10px;" v-else>暂无二级菜单</p>
            </Col>
            <Col :sm="8" :xs="24" :style="powerShowhei">
                <h3>功能</h3>
                <!--<ul v-if="menuOp.length>0">
                    <CheckboxGroup @on-change="checkAllGoupChange">
                        <li v-for="(o,i) in menuOp" key="o.id"><Checkbox v-model="data">&nbsp;</Checkbox>{{o.name}}</li>
                    </CheckboxGroup>
                </ul>-->
                <div v-if="shownPermissionList.length != 0">
                <div  v-for="(a, index) in shownPermissionList" :key="index">
                  <Checkbox v-model="a.checked"
                            @on-change="permissionsCheckboxClicked(a.id)">
                      {{a.name}}
                  </Checkbox>
                </div>
                </div>

                <p style="text-align:center;padding-top:10px;" v-else>暂无功能</p>
            </Col>
        </Row>
    </Modal>


    <Modal v-model="model3" width="360">
        <div style="text-align:center;margin-top:20px;">
            <p>确定要删除该成员吗？</p>
        </div>
            <Row :gutter="16" slot="footer"><Col span="12"><Button type="ghost" long @click="model3=false">取消</Button></Col>
            <Col span="12"><Button type="warning" long @click="delOrg">确定</Button></Col>
            </Row>
    </Modal>


    <Modal v-model="model4" class="noFooter showOrg" width="900">
        <Row class="powerShow menuShow" style="margin-top:20px;">
            <Col :sm="12" :xs="24" :style="powerShowhei1">
                <h3>一级组织</h3>
                <ul v-if="orgData.length>0">
                    <li v-for="(o,index) in orgData" :key="o.id" v-text="o.name" :class="{'active':chdrShow[index]}" @click="showChildren(index)"></li>
                </ul>
                <p style="text-align:center;padding-top:10px;" v-else>暂无一级组织</p>
            </Col>
            <Col :sm="12" :xs="24" :style="powerShowhei1">
                <h3>二级组织</h3>
                <ul v-if="chdrArr.length>0">
                    <li v-for="c in chdrArr" :key="c.id" v-text="c.name"></li>
                </ul>
                <p style="text-align:center;padding-top:10px;" v-else>暂无二级组织</p>
            </Col>
        </Row>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import showData from '../router/teamSystem.js';
import '../router/dateFormat.js';

export default {
  name: 'sections',
  //components:{ TreeGrid },
  props:['showSystem'],
  data () {
    const validateRole = (rule, value, callback) => {

        if (value.length == 0) {
            callback(new Error('上一级组织不能为空'));
        }else {
            callback();
        }
    };
    return {
        props: {
          border: false,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: false
        },
        tabSize:'default',
        tabVal:'1',
        systemId:'1',
        powerShowhei: '',
        powerShowhei1: '',
        data:false,
        selAlct:'',
        model1:false,
        model2:false,
        model3:false,
        model4:false,
        moduleList: [],
        modules:[],
        pages:[],
        permissions:[],
        pageList: [],
        shownPageList:[],
        shownPermissionList:[],
        permissionList : [],
        vs:false,
        vs2:false,
        orAds:false,
        tbWidth:100,
        orSuper:false,//是否为超级管理员
        /*systemId:1,*///系统号
        page:0,
        pageSize:10,
        total:0,//页数
        totalRecords:0,//总条数
        modalTitle:'新增',
        checkAll:'',
        indeterminate:'',
        delId:-1,
        delTrue:true,
        formSel:{
            input:'',
            /*typePd:'',*/
        },
        formFr:{
            oldName:'',
            name:'',
            userNo:'2',
            upOrganizaList:[],
            upOrganiza:-1
        },
        ruleFr:{
            name:[{required:true,message:'组织名称不能为空',trigger:'blur'}],
            upOrganiza : [
            //{ required: true, message: 'Please select the city', trigger: 'change' } ,
            { required: true,validator: validateRole, trigger: 'change' }]
        },
        orgList:[],
        columns1: [
        {
            label: '组织名称',
            prop: 'name'
        },
        {
            label: '层级',
            prop: 'level'
        },
        {
            label: '管理员/手机号码',
            prop: 'managerMobile'
        },/*{
            label: '上一级组织',
            prop: 'managerName'
        },*/
        {
            label: '员工人数',
            prop: 'userSum'
        },
        {
            label: '创建时间',
            prop: 'createTime',
            width:92
        },
        {
            label: '操作',
            align: 'center',
            prop: 'action',
            width: 200,
            type: 'template',
            template: 'action'
        }],
        data1: [],
        orgData:[],
        chdrShow:[],
        chdrArr:[],
        powerArr:[],
        powerChk:[],
        menuChld:[],
        menuOp:[],
        modalSelectedId: -1,
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
        this.loadData();
        if(showData.getCookie('account')=='admin'){
            this.orSuper=true;
        }else{
            this.orSuper=false;
        }
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
            this.data1=[];
            this.systemId=val;
            this.page=1;
            this.loadData();
            this.formSel.input='';
        }
    },
    methods: {
        loadData(){
            var detail='systemId='+this.systemId+'&page='+this.page+'&size='+this.pageSize+'&token='+this.token;
            if(this.formSel.input!='' || this.formSel.input!=null){
                detail+='&keyword='+this.formSel.input;
            }
            let data=showData.showOrganize(detail,this);
        },
        showresult(result){
            this.data1=[];
            var list=result.list;
            if(list.length>0 || list!=undefined){
                this.total=Math.ceil((result.total/this.pageSize));
                this.totalRecords = result.total;
                for(var l in list){
                    if(list[l].level===1 && list[l].parentId==null){
                        var datas={};
                        datas['id']=list[l].id;
                        datas['name']=showData.subArr(list[l].name);
                        datas['level']=list[l].level==1?'一级':'二级';
                        datas['managerMobile']=list[l].managerMobile;
                        /*datas['managerName']=list[l].managerName;*/
                        datas['userSum']=list[l].userSum;
                        datas['canEdit']=list[l].canEdit;
                        datas['createTime']=new Date(list[l].createTime).Format('yyyy-MM-dd HH:mm:ss');
                        datas['children']=[];

                        for(var i in list){
                            if(list[i].level!=1 && list[i].parentId==list[l].id){
                                var children={};
                                children['id']=list[i].id;
                                children['name']=showData.subArr(list[i].name);
                                children['level']=list[i].level==1?'一级':'二级';
                                children['managerMobile']=list[i].managerMobile;
                                /*children['managerName']=list[i].managerName;*/
                                children['userSum']=list[i].userSum;
                                children['canEdit']=list[i].canEdit;
                                children['createTime']=new Date(list[i].createTime).Format('yyyy-MM-dd HH:mm:ss');
                                datas['children'].push(children);
                            }
                        }
                        if(datas.children!='' || datas.children.length>0){
                            datas['selAlct'] = 'selAlct';
                        }else{
                            datas['selAlct'] = '';
                        }
                        this.data1.push(datas);
                    }
                }
            }
        },
        /*showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typePd=' : '+val;
            }else{
                this.formSel.typePd='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },*/
        changePage(pageNum){
            this.page=(pageNum - 1) * this.pageSize;
            this.loadData();
        },
        show(row,title){
            this.formFr.oldName='';
            this.formFr.name='';
            this.formFr.userNo='';
            this.formFr.upOrganiza=-1;
            this.delId=-1;
            if(title=='upd'){
                this.modalTitle='修改';
                var detail=row.id+'?token='+this.token;
                this.delId=row.id;
                showData.selOrganize(detail, this);
            }else{
                this.modalTitle='新增';
                if(this.orSuper){
                    this.formFr.userNo='1';
                }else{
                    this.formFr.userNo='2';
                }
                this.model1=true;
                /*var detail='systemId='+this.systemId;
                let levelList=showData.getOrganize(detail, this);*/
            }
        },
        showOrganize(result){
            if(result.length>0 || result!=null){
                this.formFr.upOrganizaList=result;
            }
            else
                this.$Message.warning('数据加载失败');
        },
        selResult(result){
            if(result!=undefined){
                this.formFr.oldName=result.name;
                this.formFr.name=result.name;
                this.formFr.userNo=(result.level).toString();
                if(result.parentId!=null)
                    this.formFr.upOrganiza=result.parentId;
                this.model1=true;
            }else
                this.$Message.warning('数据加载失败');
        },
        selChange(val){
            if(val=='2'){
                var detail='systemId='+this.systemId+'&token='+this.token;
                let levelList=showData.getOrganize(detail, this);
            }
        },
        getPower(row){
            var detail='systemId='+this.systemId+'&orgId='+row.id+'&token='+this.token;
            this.modalSelectedId = row.id;
            showData.getPermission(detail,this);
            this.model2=true;
        },
        showpsmData(result, detail){
            this.moduleList= [];
            this.pageList = [];
            this.permissionList = [];
            this.shownPageList = [];
            this.shownPermissionList = [];


            if(result.length>0 || result!=undefined){
                this.powerArr=[];
                
                var resultArr = result;
                
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

            }
            //var detail='systemId='+this.systemId+'&orgId='+row.id;
            showData.listOrgPermission(detail,this)
        },
        listOrgPermission(result){
            var resultArr = result;
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
                if(this.shownPageList[item].id == id){
                    this.shownPageList[item]['name'] = ' '+this.shownPageList[item]['name']

                    for(var item2 in this.shownPermissionList){
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
                if(this.shownPermissionList[item].id == id){
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

       updateOrgPermission(){
            var params = {
                "orgId": this.modalSelectedId,
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
            showData.updateOrgPermission(params, this,'?token='+this.token);


        },


        shownexMenu(index){
            this.menuChld=[];
            this.menuOp=[];
            for(var s=0;s<this.powerArr.length;s++){
                this.powerChk[s]=false;
            }
            this.powerChk[index]=true;
            this.menuChld=this.powerArr[index].menuChld;
            this.menuOp=this.powerArr[index].menuOp;
        },
        reset(){
            if(this.formSel.input!=''){
                this.formSel.input='';
                /*this.formSel.typePd='';*/
                this.loadData();
            }
        },
        handleAdd(name,title){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    if(title=='新增' || this.formFr.name!=this.formFr.oldName){
                        let detail='level='+this.formFr.userNo+'&systemId='+this.systemId+'&name='+this.formFr.name+'&token='+this.token;
                        showData.chkOrganize(detail,this);
                    }
                }else{
                    this.$Message.error('验证失败');
                }
            })
        },
        showChkOrg(result){
            if(result.result){
                let detail={};
                var name=this.formFr.name;
                var level=this.formFr.userNo;
                if(this.modalTitle=='新增'){
                    let detail={'level':level,'systemId':this.systemId,'name':name};
                    if(this.formFr.upOrganiza!=-1){
                        detail['parentId']=parseInt(this.formFr.upOrganiza);
                    }
                    else{
                        detail['parentId']=-1;
                    }
                    showData.addOrganize(detail,this,'?token='+this.token);
                }else{
                    let detail={'id':this.delId,'name':name};
                    showData.updOrganize(detail,this,'?token='+this.token);
                }
            }else{
                this.$Message.warning('该组织已存在');
            }
        },
        addOrg(result){
            if(result){
                this.$Message.success(this.modalTitle+'成功');
                this.$refs['formFr'].resetFields();
                this.model1=false;
                this.loadData();
            }else{
                this.$Message.error(this.modalTitle+'失败');
            }
        },
        closeModal(name){
            this.model1=false;
            this.$refs[name].resetFields();
        },
        del(row){
            this.delId=-1;
            if(row._childrenLen!==0){
                //this.$Message.warning('该组织存在子组织，不能删除');
                return false;
            }else{
                this.delId=row.id;
                this.model3=true;
            }
        },
        delOrg(){
            if(this.delId!=undefined || this.delId!=-1){
                var detail={'id':this.delId};
                showData.delOrganize(detail, this,'?token='+this.token);
            }
        },
        delResult(result){
            if(result){
                this.$Message.success('删除成功');
                this.delId=-1;
                this.model3=false;
                this.loadData();
            }else{
                this.$Message.error('删除失败');
            }
        },
        showOrg(){
            var detail='systemId='+this.systemId+'&token='+this.token;
            showData.getOrgList(detail,this);
        },
        showOrgData(result){
            if(result.length>0 && result!=undefined){
                this.orgData=[];
                this.model4=true;
                for(var r in result){
                    if(result[r].parentId==null || result[r].parentId==''){
                        var datas={};
                        datas['id']=result[r].id;
                        datas['name']=result[r].name;
                        datas['children']=[];

                        for(var i in result){
                            if(result[i].parentId==result[r].id){
                                var d={};
                                d['id']=result[i].id;
                                d['name']=result[i].name;
                                datas['children'].push(d);
                            }
                        }
                        this.orgData.push(datas);
                    }
                }
                if(this.orgData[0].children!=undefined){
                    this.showChildren(0);
                }

                if(this.pageWin>=768){
                    this.$nextTick(function(){
                        var powershow = $('.menuShow').height();
                        this.powerShowhei1 = 'height:' + powershow +'px';
                    });
                }
            }else{
                this.$Message.warning('暂无组织数据');
            }
        },
        showChildren(index){
            this.chdrArr=[];
            for(var s=0;s<this.orgData.length;s++){
                this.chdrShow[s]=false;
            }
            this.chdrShow[index]=true;
            this.chdrArr=this.orgData[index].children;
        },
    }
}
</script>
