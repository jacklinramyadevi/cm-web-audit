
<template>
  <div class="sections page_tab">
    <!-- <h1>系统菜单设置</h1> -->
    <div class="pl_body">
        <div class="">
            <Tabs class="tabs" :size="tabSize" v-model="tabVal">
                <TabPane v-for="s in showSystem" :label="s.remarks" :name="s.id.toString()">
                    <div class="creditUser">
                        <Row class="form_row">
                            <Col :sm="21" :xs="24">
            <!-- <Form :model="formSel" class="downMenu">
                <FormItem>
                    <Input v-model="formSel.input" icon="ios-search" placeholder="请输入菜单名称"></Input>
                    <Button type="success" @click="">查询</Button>
            
                    <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                        <Button type="ghost" :class="{active:vs,chk:formSel.typeChn!=''}">
                            层级 <span v-text="formSel.typeChn"></span>
                            <Icon type="arrow-down-b"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="全部" :selected="formSel.typeChn=='全部'">全部</DropdownItem>
                            <DropdownItem name="一级" :selected="formSel.typeChn.indexOf('一级')>-1">一级</DropdownItem>
                            <DropdownItem name="二级" :selected="formSel.typeChn.indexOf('二级')>-1">二级</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button @click="reset">重置</Button>
                </FormItem>
                </Form> --></Col>
                        <Col :sm="3" :xs="24" class="float_right"><div class="float_right">
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
                                <div>
                                    <Button type="warning" size="small" :disabled="opArr.indexOf('update')<0" @click="show(scope.row,'upd')">修改</Button>
                                    <Button type="ghost" size="small" :disabled="opArr.indexOf('delete')<0 || scope.row.unauth" @click="del(scope.row)">删除</Button>

                                    <Button type="text" class="opIcon" v-if="scope.row._normalIndex!=1" size="small" @click="order(scope.row,'up', data1[scope.row.parentIndex])"><Icon type="arrow-up-a" size="small"></Icon></Button>
                                    
                                    <Button type="text" class="opIcon" :disabled="opArr.indexOf('exchange')<0" v-if="scope.row._normalIndex!=total && scope.row._normalIndex!=data1[scope.row.parentIndex].children.length " size="small" @click="order(scope.row,'down', data1[scope.row.parentIndex])"><Icon type="arrow-down-a" size="small"></Icon></Button>
                                    <Button type="text" class="opIcon" :disabled="opArr.indexOf('exchange')<0"
                                     v-else-if="scope.row._normalIndex!=data1[scope.row.parentIndex].children.length && scope.row._level!=1" size="small" @click="order(scope.row,'down', data1[scope.row.parentIndex])"><Icon type="arrow-down-a" size="small"></Icon></Button>

                                    <Button type="text" class="opIcon" :disabled="opArr.indexOf('exchange')<0" v-else-if="scope.row._normalIndex!=total && scope.row._childrenLen!=0" size="small" @click="order(scope.row,'down', data1[scope.row.parentIndex])"><Icon type="arrow-down-a" size="small"></Icon></Button>

                                    
                                </div>
                            </template>
                        </zk-table>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>

    </div>

    <Modal v-model="model1" class="noFooter minModal" :title="modalTitle" width="600">
         <Form ref="formFr" :model="formFr" :rules="ruleFr" :label-width="80">
            <FormItem label="菜单名称" prop="name">
                <Input v-model="formFr.name" placeholder="输入菜单名称"></Input>
            </FormItem>
            <FormItem label="层级" prop="sel" class="ivu-form-item-required">
                <Select v-model="formFr.level" @on-change="selChange" :disabled="modalTitle=='修改'">
                    <Option value="1">一级</Option>
                    <Option value="2">二级</Option>
                </Select>
            </FormItem>
            <FormItem label="上级菜单" prop="upmenu" class="ivu-form-item-required" v-if="formFr.level!='1'">
                <Select v-model="formFr.upmenu" placeholder="请选择上级菜单" :disabled="modalTitle=='修改'">
                    <Option :value="m.id" v-for="m in formFr.upmenuList" :key="m.id">{{m.name}}</Option>
                </Select>
            </FormItem>
            <!-- <FormItem label="排序码" prop="sort">
                <Select v-model="formFr.sort" placeholder="请选择排序码">
                    <Option :value="s" v-for="s in formFr.sortList">{{s}}</Option>
                </Select>
            </FormItem> -->
            <FormItem label="链接URL" prop="url">
                <Input v-model="formFr.url" placeholder="粘贴链接URL" :disabled="modalTitle=='修改'"></Input>
            </FormItem>
            <div class="float_right">
                <Button type="ghost" @click="handleReset('formFr')">取消</Button>
                <Button type="warning" @click="handleAdd('formFr')">确定</Button>
            </div>
        </Form>
        <div slot="footer"></div>
    </Modal>


    <Modal v-model="model3" width="360">
        <div style="text-align:center;margin-top:20px;">
            <p>确定要删除该菜单吗？</p>
            <p v-if="delTxt">（删除一级菜单会同时删除下属所有二级菜单）</p>
        </div>
            <Row :gutter="16" slot="footer"><Col span="12"><Button type="ghost" long @click="model3=false">取消</Button></Col>
            <Col span="12"><Button type="warning" long @click="delOk">确定</Button></Col>
            </Row>
    </Modal>
  </div>
</template>

<script>
import showData from '../router/teamSystem.js';
import '../router/dateFormat.js';

var validateLen=function(rule,value,callback){
    if(!value){
        return callback(new Error('备注不能为空'));
    }else if(value.length>=200){
        return callback(new Error('备注至多为200字'));
    }else{
        callback();
    }
}

export default {
  name: 'sections',
  props:['showSystem'],
  data () {
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
          selectionType: false,
        },
        tabSize:'default',
        tabVal:'1',
        systemId:'1',
        model1:false,
        model2:false,
        model3:false,
        vs:false,
        tbWidth:100,
        selectedMenuId: 0,
        total:0,
        valShow:0,
        modalTitle:'新增',
        delId:-1,
        formSel:{
            input:''
            /*typeChn:'',*/
        },
        formFr:{
            id:-1,
            name:'',
            level:'1',
            upmenuList:[],
            upmenu:'',
            /*sortList:[1,2,3],
            sort:'',*/
            url:''
        },
        ruleFr:{
            name:[{required:true,message:'菜单名称不能为空',trigger:'blur'}],
            level:[{required:true,message:'请选择层级',trigger:'change'}],
            /*upmenu:[{required:true,message:'请选择上级菜单',trigger:'change'}],*/
            /*sort:[{required:true,message:'请选择排序码',trigger:'change'}],*/
            url:[{required:true,message:'链接不能为空',trigger:'blur'}]
        },
        columns1: [{
            label: '菜单名称',
            prop: 'name'
        },
        {
            label: '层级',
            prop: 'level'
        },
        /*{
            label: '上级菜单',
            key: 'upmenu'
        },*/
        {
            label: '修改时间',
            prop: 'updateTime',
            width:92
        },{
            label: '创建时间',
            prop: 'createTime',
            width:92
        },
        {
            label: '操作',
            prop: 'action',
            width: 200,
            type: 'template',
            template: 'action',
            align: 'left'
        }],
        data1: [],
        menuDetail:{},
        delTxt:false,
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
        this.loadData();
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
            this.loadData();
        }
    },
    methods: {
        loadData(){
            var detail='systemId='+this.systemId+'&token='+this.token;
            let data=showData.getMenuList(detail,this,0,'');
        },
        showresult(result,level){
            var list=result;
            if(list.length>0 || list!=undefined){
                if(level!='' && level=='1'){
                    this.formFr.upmenuList = [];
                    for(var l in list){
                        var datas={};
                        datas['id']=list[l].id;
                        datas['name']=list[l].name;
                        
                        this.formFr.upmenuList.push(datas);
                        
                    }
                    if(this.selectedMenuId != 0){
                        this.formFr.upmenu = parseInt(this.selectedMenuId);
                    }else{
                        this.formFr.upmenu = this.formFr.upmenuList[0].id;
                    }
                    
                    
                }else{
                    this.data1=[];
                    this.total = 0;
                    for(var l in list){
                        if(list[l].level===1 && list[l].parentId==0){
                            var datas={};
                            datas['id']=list[l].id;
                            datas['name']=list[l].name;
                            datas['level']=list[l].level==1?'一级':'二级';
                            datas['upmenu']='无';
                            datas['unauth']=list[l].unauth;
                            datas['updateTime']=new Date(list[l].updateTime).Format('yyyy-MM-dd HH:mm:ss');
                            datas['createTime']=new Date(list[l].createTime).Format('yyyy-MM-dd HH:mm:ss');
                            datas['children']=[];
                            datas['parentIndex'] = l;
                            this.total+=1;

                            for(var i in list){
                                if(list[i].level!=1 && list[i].parentId==list[l].id){
                                    var children={};
                                    children['id']=list[i].id;
                                    children['name']=list[i].name;
                                    children['level']=list[i].level==1?'一级':'二级';
                                    children['upmenu']=list[l].name;
                                    children['unauth']=list[i].unauth;
                                    children['updateTime']=new Date(list[i].updateTime).Format('yyyy-MM-dd HH:mm:ss');
                                    children['createTime']=new Date(list[i].createTime).Format('yyyy-MM-dd HH:mm:ss');
                                    children['parentIndex']=l;
                                    datas['children'].push(children);
                                }
                            }
                            this.data1.push(datas);
                        }
                    }
                }
            }
        },
        showDetail(result){
            if(result!=null || result!=undefined){
                this.selectedMenuId = result.parentId.toString();
                this.formFr={'id':result.id,'name':result.name,'level':result.level.toString(),'upmenu':result.parentId.toString(),'url':result.url};
            }
        },
        /*showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typeChn=' : '+val;
            }else{
                this.formSel.typeChn='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },*/
        show(row,op){
            if(op!='upd'){
                this.modalTitle='新增';
                this.formFr.name='';
                this.formFr.url='';
                this.formFr.level='1';
                this.selectedMenuId = 0;
                this.formFr.upmenu='';
            }else{
                var detail='systemId='+this.systemId+'&level=1&token='+this.token;
                let data=showData.getMenuList(detail,this,'1','');
                this.modalTitle='修改';
                var updDetail=row.id+'?token='+this.token;
                showData.getMenuDetail(updDetail,this);
            }
            this.model1=true;
        },
        selChange(){
            if(this.formFr.level!='1'){
                var detail='systemId='+this.systemId+'&level=1&token='+this.token;
                let data=showData.getMenuList(detail,this,'1');
                
            }
        },
        del(row){
            if(row.level=='一级' && row.children.length>0){
                this.delTxt=true;
            }else{
                this.delTxt=false;
            }
            this.delId=row.id;
            this.model3=true;
        },
        delOk(){
            var detail=[];
            detail[0]=this.delId;
            let data=showData.delMenu(detail,this,'?token='+this.token);
        },
        delResult(result){
            if(result){
                this.loadData();
                this.model3=false;
                this.$Message.success('删除成功');
            }else{
                this.$Message.error('删除失败');
            }
        },
        handleReset(name){
            this.model1=false;
            this.$refs[name].resetFields();
        },
        handleAdd(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(this.modalTitle=='新增'){
                        var detail={"systemId":parseInt(this.systemId),"name":this.formFr.name,"level":parseInt(this.formFr.level)};
                        if(this.formFr.upmenu!=undefined && this.formFr.upmenu!='')
                            detail['parentId']=this.formFr.upmenu;
                        else
                            detail['parentId']=null;
                        if(this.formFr.url!=undefined && this.formFr.url!='')
                            detail['url']=this.formFr.url;
                        else
                            detail['url']=null;
                        showData.addMenu(detail,this,'?token='+this.token);
                    }else{
                        var detail={"id":this.formFr.id,"name":this.formFr.name};
                        showData.updMenu(detail,this,'?token='+this.token);
                    }
                }else{
                    this.$Message.error('验证失败');
                }
            });
        },
        addResult(result){
            if(result){
                this.loadData();
                this.$Message.success(this.modalTitle+'成功');
            }else{
                this.$Message.error(this.modalTitle+'失败');
            }
            this.model1=false;
        },
        order(row,ord, parentObj){
            var index,firstId,id;

            if(ord=='up'){
                if(row._normalIndex!=1){
                    index=parseInt(row._normalIndex)-2;
                    if(row.level!='一级' && parentObj.children.length>1){
                        firstId=parentObj.children[index+1].id;
                        id=parentObj.children[index].id;
                    }
                }
            }else if(ord=='down'){
                if(row._normalIndex!=this.total && row._normalIndex!=parentObj.children.length){
                    index=parseInt(row._normalIndex);
                    if(row.level!='一级' && parentObj.children.length>1){
                        firstId=parentObj.children[index-1].id;
                        id=parentObj.children[index].id;
                    }
                }
            }
            if(firstId=='' || firstId==null || id==''){
                firstId=row.id;
                id=this.data1[index].id;
            }
            var detail={'fromId':firstId,'toId':id};
            showData.changeMenu(detail,this,'?token='+this.token);
        },
        changeResult(result){
            if(result){
                this.loadData();
            }else{
                this.$Message.error('修改排序失败');
            }
        }
    }
}
</script>

