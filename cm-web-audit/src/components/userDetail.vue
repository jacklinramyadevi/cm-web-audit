
<style scope>
    @import '../css/viewer.min.css'
</style>
<template>
    <div class="creditUser">
        <div class="table_show">
            <table class="headerTb" border="0" cellpadding="0" cellspacing="0">
                <tr v-for="i in tbData.info">
                    <td class="txt_center" v-html="i[0].title"></td><td v-if="i[0].btn!=undefined"><Row><Col :sm="20" :xs="24"><p v-html="i[0].val"></p></Col><Col :sm="4" :xs="24"><!-- <Button type="ghost" @click="" size="small" v-text="i[0].btn"></Button> --></Col></Row></td><td v-else v-html="i[0].val"></td>
                    <td class="txt_center" v-html="i[1].title"></td><td v-html="i[1].val"></td>
                </tr>
                <tr>
                    <td colspan="4"><h3>实名信息</h3></td>
                </tr>
                <tr v-for="c in tbData.credit">
                    <td class="txt_center" v-html="c[0].title"></td><td v-html="c[0].val"></td>
                    <td class="txt_center" v-html="c[1].title"></td><td v-html="c[1].val"></td>
                </tr>
                <!-- <tr><td colspan="4">
                    <h3>证件照片</h3>
                    <Row class="photoShow docs-pictures">
                        <Col :sm="10" :xs="24">
                            <Row :gutter="16">
                                <Col :sm="8" :xs="12" v-for="item in uploadList">
                                    <img src="../assets/login_bg.png"/><Button type="text" class="updImg" @click="" size="small">修改</Button>
                                    <div class="demo-upload-list">
                                        <template v-if="item.status === 'finished'">
                                            <img :src="item.url">
                                            <div class="demo-upload-list-cover">
                                                <Upload
                                                    ref="upload1"
                                                    :show-upload-list="false"
                                                    :default-file-list="defaultList"
                                                    :on-format-error="handleFormatError"
                                                    :on-success="handleSuccess"
                                                    :format="['jpg','jpeg','png']"
                                                    :max-size="2048"
                                                    :before-upload="handleBeforeUpload"
                                                    multiple
                                                    action="//jsonplaceholder.typicode.com/posts">
                                                    <Icon type="camera" @click.native="handleUpdate(item)"></Icon>
                                                </Upload>
                                                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                
                                            </div>
                                        </template>
                                        <template v-else>
                                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                        </template>
                                    </div>
                                    <p v-text="item.name"></p>
                                </Col>
                                <Upload style=" display: none;"
                                    ref="upload"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList"
                                    :on-format-error="handleFormatError"
                                    :on-success="handleSuccess"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="2048"
                                    :before-upload="handleBeforeUpload"
                                    multiple
                                    action="//jsonplaceholder.typicode.com/posts/">
                                    <Icon type="edit" @click.native="handleUpdate(item)"></Icon>
                                </Upload>
                                <Col :sm="8" :xs="12">
                                    <img src="../assets/login_bg.png"/><Button type="text" class="updImg" @click="" size="small">修改</Button>
                                    <p>身份证反面</p>
                                </Col>
                                <Col :sm="8" :xs="12">
                                    <img src="../assets/login_bg.png"/><Button type="text" class="updImg" @click="" size="small">修改</Button>
                                    <p>银行卡</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </td></tr> -->
            </table>
        </div>
        <Modal :title="imgTitle" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
import '../router/dateFormat.js';
import showData from '../router/csmsData.js';
import cookie from '../router/cookie.js'
import viewer from '../router/viewer.min.js'

export default {
    props:['tabMsg','selPhone'],
    data:function(){
        return{
            tbWidth:100,
            total:0,
            totalRecords:0,
            pageStart:0,
            pageSize:10,
            vs:false,
            vs2:false,
            visible:false,
            //uploadList:[],
            defaultList:[{name:'身份证正面',url:'../assets/login_bg.png'},
            {name:'身份证反面',url:'../assets/login_bg.png'},
            {name:'银行卡',url:'../assets/login_bg.png'}],
            imgTitle:'',
            imgName:'',
            tbData:{/*'info':[
                [{title:'手机号',val:'13566665555',btn:'拨号'},
                {title:'来源',val:'消费版APP'}],
                [{title:'所属代理商',val:'13655552222<br/>深圳市福田电子旗下商户'},
                {title:'状态',val:'正常还款中'}],
                [{title:'推荐人',val:'13655552222<br/>深圳市福田电子旗下商户'},
                {title:'最后操作时间',val:'2017-08-08 12:12:35'}]
            ],
                'credit':[
                [{title:'姓名',val:'张三'},
                {title:'性别',val:'已通过'}],
                [{title:'出生日期',val:'1988-09-09'},
                {title:'身份证地址',val:'已通过'}],
                [{title:'身份证',val:' ************085432'},
                {title:'身份证有效期',val:'13655552222<br/>深圳市福田电子旗下商户'}],
                [{title:'签发机关',val:'深圳福田区派出所'},
                {title:'银行卡所属银行',val:'13655552222<br/>深圳市福田电子旗下商户'}],
                [{title:'民族',val:'汉族'},
                {title:'银行卡号',val:'6253 **** **** 3563'}],
                [{title:'状态',val:'认证成功'},
                {title:'认证时间',val:'1988-09-09'}]
                ]*/
            },
            selection:[],
        }
    },
    created:function(){
        let loadData = {data:{"mobile":this.selPhone }};
        showData.getuserInfo(loadData,this);
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    watch:{
        selPhone:function(val){
            let loadData = {data:{"mobile":val }};
            showData.getuserInfo(loadData,this);
        }
    },
    methods: {
        getuserInfo(result){
            this.tbData={};
            var list=result.cust;
            var info=[[{title:'手机号',val:list.mobile,btn:'拨号'},
                {title:'来源',val:'消费版APP'}],
                [{title:'所属代理商',val:'13655552222<br/>深圳市福田电子旗下商户'},
                {title:'状态',val:'正常还款中'}],
                [{title:'推荐人',val:'13655552222<br/>深圳市福田电子旗下商户'},
                {title:'',val:''}]];
            var credit=[[{title:'姓名',val:list.acctName},
                {title:'性别',val:list.gender==1?'男':'女'}],
                [{title:'出生日期',val:list.acctName},
                {title:'身份证地址',val:list.address}],
                [{title:'身份证',val:list.acctIdNo},
                {title:'身份证有效期',val:list.acctName}],
                [{title:'签发机关',val:list.visaName},
                {title:'银行卡所属银行',val:list.bankBranch}],
                [{title:'民族',val:list.nation},
                {title:'银行卡号',val:list.acctCard}],
                [{title:'状态',val:list.acctName},
                {title:'认证时间',val:new Date(list.realNameTm).Format('yyyy-MM-dd HH:mm:ss')}]];
                cookie.setCookie('acctName',list.acctName,2);
            this.tbData['info']=info;
            this.tbData['credit']=credit;
        },
        /*handleFormatError(file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleSuccess(res, file){
            file.url = '../assets/login_bg.png';
            file.name = '身份证反面';
        },*/
        handleBeforeUpload(){
            /*this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });*/
        },
        handleView(item) {
          this.imgTitle = item.name;
          this.imgName = item.url;
          this.visible = true;
        },
        // 上传
        handleUpdate(item) {
          this.imageItem = item
          // if(type==="upload") {
          //   this.uploadList[item].url = this.esDownDocInfoNew +res.
          // }
        },
        // 拨号
        handleDialing() {
          var that = this;
          this.axios.post(that.$store.getters.dialing);
        },
        // 下载图片
        // handleDown(id, index) {
        //   var that = this;
        //   this.axios
        //     .get(that.$store.getters.downInfo, {
        //       //   params: { objId: id }
        //       params: { objId: 2208 },
        //       responsetype: 'blob'
        //     })
        //     .then(res => {
        //       if (res.status === 201) {
        //         var blob = new Blob(res.data, '')
        //         var read = new FileReader();
        //         read.readAsDataURL(blob);
        //         read.onload = function(e) {
        //           var src = e.target.result;
        //           debugger
        //           that.uploadList[index].url = src
        //         };
        //       }
        //     })
        //     .catch(err => {
        //       console.log(err);
        //     });
        // }
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    }
};

</script>