<template>
  <div class="sections">
    <h1>排班管理</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="19" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                       <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy-MM-dd" placeholder="日期" @on-change="dateChange"></DatePicker>

                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                                审核人员<span v-text="formSel.typePd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>
                                <DropdownItem name="张三" :selected="formSel.typePd.indexOf('张三')>-1">张三</DropdownItem>
                                <DropdownItem name="李四" :selected="formSel.typePd.indexOf('李四')>-1">李四</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="5" :xs="24"><div class="float_right">
                <Badge dot><Button type="ghost" @click="model1=!model1">换班记录</Button></Badge>
                <Dropdown trigger="click" class="workTime" placement="bottom-right">
                    <Button type="warning">设置工作时间</Button>
                    <DropdownMenu slot="list">
                        <h1 class="title">设置工作时间</h1>
                        <div class="modelBody">
                            <Row :gutter="16">
                                <Col :sm="12" :xs="24">
                                    <div class="borderShow"><h2>早班</h2>
                                    <p>（09:00-18:00）</p>
                                    <div class="btnBottom"><Button class="btnOrange">修改</Button>
                                    <Button>删除</Button></div></div>
                                </Col>
                                <Col :sm="12" :xs="24">
                                    <div class="borderShow"><h2>中班</h2>
                                    <p>（12:00 - 20:00）</p>
                                    <div class="btnBottom"><Button class="btnOrange">修改</Button>
                                    <Button>删除</Button></div></div>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                <Col :sm="12" :xs="24">
                                    <div class="borderShow"><h2>晚班</h2>
                                    <p>（12:00 - 22:00）</p>
                                    <div class="btnBottom"><Button class="btnOrange">修改</Button>
                                    <Button>删除</Button></div></div>
                                </Col>
                                <Col :sm="12" :xs="24">
                                    <!-- <div class="btnEmpty"><p>+添加</p></div> -->
                                    <div class="btnEmpty btnAdd">
                                        <Input class="relname" placeholder="点击输入名称"></Input>
                                        <TimePicker format="HH:mm" type="timerange" :open="open" :value="timeVal" confirm @on-change="handleChange" @on-clear="handleClear" @on-ok="handleOk" placeholder="选择时间">
                                            <Button style="background-color:#fff;"  @click="handleClick">
                                                <Icon type="ios-clock-outline"></Icon>
                                                <template v-if="timeVal===''">选择时间</template>
                                                <template v-else>{{ timeVal[0] }} - {{ timeVal[1] }}</template>
                                                <Icon type="arrow-down-b"></Icon>
                                            </Button>
                                        </TimePicker>
                                        <div class="btnBottom"><Button class="btnOrange">修改</Button>
                                        <Button>删除</Button></div>
                                    </div>
                                </Col>
                            </Row>
                            <div class="btnOk float_right"><Button type="warning">确定</Button>
                                <Button type="ghost">取消</Button></div>
                            <div class="clear"></div>
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </div></Col>
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

    <Modal v-model="model1" class="noFooter" title="换班记录" width="600">
         <dl class="changeDetail">
            <dt><span>2017-08-08 12:12:31</span><p>“张三”申请与我换班</p><div class="float_right btnAll"><Button type="warning" @click="">通过</Button>
        <Button type="ghost" @click="">拒绝</Button></div></dt>
            <dd><div class="clear"></div>
            <p><label>2017-08-05  <span class="powerTitle">早班(09:00-14:00)</span></label><Icon type="around"></Icon> 2017-08-05   <span class="powerTitle">中班(10:00-18:00)</span></p>
            </dd>
            <dt><span>2017-08-08 12:12:31</span><p>我申请与“张三”换班 <span class="float_right">等待对方同意</span></p></dt>
            <dd><div class="clear"></div>
            <p v-html=""><label>2017-08-05  <span class="powerTitle">早班(09:00-14:00)</span></label><Icon type="around"></Icon> 2017-08-05   <span class="powerTitle">中班(10:00-18:00)</span></p>
            </dd>
         </dl>
         <div class="moneyCt"><Button type="ghost" style="margin-bottom:20px;" @click="model3=!model3"><返回</Button></div>
         <div slot="footer"></div>
    </Modal>

  </div>
</template>

<script>
import staffShow from '../components/staffs.vue'

export default {
  name: 'sections',
  components:{ staffShow },
  data () {
    return {
        vs:false,
        open:false,
        model1:false,
        model2:false,
        tbWidth:100,
        total:100,
        timeVal:'',
        formSel:{
            selectTm:[],
            typePd:''
        },
        columns1: [{
            title: '日期',
            key: 'date'
        },
        {
            title: '早班（09:00 - 18:00）',
            key: 'morning',
            render: (h,params) => {
                return h('div',[
                    h(staffShow,{
                        props:{
                            row:params.row
                        }
                    }),
                    h('span',params.row.morning)
                ])
            }
        },
        {
            title: '中班（12:00 - 20:00）',
            key: 'afternoon',
            render: (h,params) => {
                return h('div',[
                    h(staffShow,{
                        props:{
                            row:params.row
                        }
                    }),
                    h('span',params.row.afternoon)
                ])
            }
        },
        {
            title: '晚班（12:00 - 22:00）',
            key: 'evening',
            render: (h,params) => {
                return h('div',[
                    h(staffShow,{
                        props:{
                            row:params.row
                        }
                    }),
                    h('span',params.row.evening)
                ])
            }
        }],
        data1: [{
                date: '2017-05-08（周一）',
                morning: '张一河 | 刘敏 | 王五 | 李四',
                afternoon: '+添加',
                evening: '刘星',
                cellClassName:{
                    morning:'green',
                    evening:'green'
                },
                staff:['张一河','刘敏']
            },
            {
                date: '2017-05-09（周二）',
                morning: '+添加',
                afternoon: '+添加',
                evening: '+添加'
            },
            {
                date: '2017-05-10（周三）',
                morning: '+添加',
                afternoon: '+添加',
                evening: '+添加'
            },
            {
                date: '2017-05-11（周四）',
                morning: '+添加',
                afternoon: '+添加',
                evening: '+添加'
            },
            {
                date: '2017-05-12（周五）',
                morning: '+添加',
                afternoon: '+添加',
                evening: '+添加'
            },
            {
                date: '2017-05-13（周六）',
                morning: '+添加',
                afternoon: '+添加',
                evening: '+添加'
            }]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[0]['width']=90;
            arr[0]['fixed']='left';
            this.columns1=arr;
        }
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        dateChange(date){
            this.formSel.selectTm=date;
        },
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typePd=' : '+val;
            }else{
                this.formSel.typePd='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        changePage(){
            /*this.data1=this.*/
        },
        show(index){
            /*alert(index)*/
        },
        changeOk(){

        },
        handleClick (){
            this.open=!this.open;
        },
        handleChange (time){
            this.timeVal=time;
        },
        handleClear (){
            this.timeVal='';
            this.open=false;
        },
        handleOk (){
            this.open=false;
        },
        reset(){
            this.formSel.typePd='';
            this.formSel.selectTm=[];
        }
    }
}
</script>
