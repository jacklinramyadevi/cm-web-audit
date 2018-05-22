<template>
  <div class="creditUser tbCredit">
    <div class="table_show" v-for="t in tbData1" :key="t">
      <table class="headerTb" border="0" cellpadding="0" cellspacing="0" :class="{orderFinish:t.finish}">
        <tr><td colspan="4"><h3>申请信息</h3></td></tr>
        <tr v-for="a in t.apply" :key="a">
          <td class="txt_center" v-html="a[0].title"></td><td v-html="a[0].val"></td>
          <td class="txt_center" v-html="a[1].title"></td><td v-html="a[1].val"></td>
        </tr>
        <tr><td colspan="4"><h3>审核信息</h3></td></tr>
        <tr v-for="c in t.credit" :key="c">
          <td class="txt_center" v-html="c[0].title"></td><td v-html="c[0].val"></td>
          <td class="txt_center" v-html="c[1].title"></td><td v-html="c[1].val"></td>
        </tr>
        <tr><td colspan="4">
           <h3>审核历史</h3> 
           <Form v-for="(h,k) in t.hirstory" :key="k" :class="{bd_bottom:t.hirstory.length>=2 && k!=t.hirstory.length-1}" :label-width="96">
             <Row>
               <Col :sm="12" :xs="24" v-for="i in h" :key="i">
                 <FormItem :label="i.title" :key="i">
                    <span v-html="i.val"></span>
                 </FormItem>
               </Col>     
            </Row>
          </Form>
        </td></tr>
      </table>
    </div>     
  </div>
</template>

<script>
import showDate from '../router/dateFormat.js';

export default {
    props:['tabMsg','selPhone'],
    data(){
        return{
            tbWidth:100,
            total:0,
            totalRecords:0,
            pageStart:0,
            pageSize:10,
            vs:false,
            vs2:false,
            formSel:{
                input:'',
                typeChn:'',
                selectTm:[]
            },
            tbData1: [
                    
                ]
        }
    },
    created:function(){
        /*this.columns=this.columns1;
        this.pageStart=0;
        this.loadPage();*/
    },
    watch:{
        tabMsg:function(val){
            this.tbData1=[];
            if(val=='tab3'){
                this.creditInfo();
            }
        },
    	selPhone:function(val){
            this.selPhone=val;
            this.creditInfo();
    	}
    },
    methods: {
        creditInfo() {
            var that = this;
            var params = {
                'data':{
                    'mobile': that.selPhone
                }
            };

            this.axios.post(that.$store.getters.creditInfo, params,
            {
                headers:{'Content-Type':'application/json'}
            }) 
            .then(function(respon){
                if(!!respon.data && respon.data.code == '0') {
                    var contents = respon.data.data;
                    var data = [];
                    for(var i = 0 ; i < contents.length; i++) {
                        var content = contents[i];

                        var hirstoryHtml = [];
                        var auditDetails = content.auditDetail;
                        for(var l = 0 ; l < auditDetails.length ; l++) {
                            var auditDetail = auditDetails[l];
                            hirstoryHtml[l]=[
                                                {title:'提交人员',val:auditDetail.applyNm + '/' + auditDetail.applyPhone + '/' + auditDetail.applyRole},
                                                {title:'提交时间',val:auditDetail.auditTm!=null ? new Date(auditDetail.auditTm).Format('yyyy-MM-dd HH:mm:ss'):'无'},
                                                {title:'审核结果',val: that.reliveStatusTxt(auditDetail.status , content.credit.isAssign , auditDetail.isSubmit)},
                                                {title:'审核人员',val:auditDetail.auditNm},
                                                {title:'审核描述',val:auditDetail.remark}]
                            
                        }

                        //是否大于次数
                        var finish = false;
                        if(i > 0) {
                            finish = true;
                        }

                        var dataHtml = 
                            {
                                'finish':finish,
                                'apply':[
                                            [
                                                {title:'产品名称',val:content.credit.approveProduct},
                                                {title:'申请时间',val: content.credit.crtTm!=null ? new Date(content.credit.crtTm).Format('yyyy-MM-dd HH:mm:ss'):'无'}
                                            ],
                                            [
                                                {title:'申请额度',val:content.credit.applyQuota!=null ? '￥' + content.credit.applyQuota:'无'},
                                                {title:'代理商账号',val: content.credit.agentAcct + '（' + content.credit.agentName + '）'}
                                            ]
                                        ],
                                'credit':[
                                            [
                                                {title:'提交人员',val: content.audit.applyNm + '/' + content.audit.applyPhone + '/' + content.audit.applyRole},
                                                {title:'提交时间',val: content.audit.auditTm!=null ? new Date(content.audit.auditTm).Format('yyyy-MM-dd HH:mm:ss'):'无'}
                                            ],
                                            [
                                                {title:'审核结果',val: that.reliveStatusTxt(content.audit.status , content.credit.isAssign , content.audit.isSubmit)},
                                                {title:'审核金额',val:content.audit.auditScore!=null ? '￥' + content.audit.auditScore:'无'}
                                            ],
                                            [
                                                {title:'审核人员',val: content.audit.auditNm},
                                                {title:'审核时间',val:content.audit.applyTm!=null ? new Date(content.audit.applyTm).Format('yyyy-MM-dd HH:mm:ss'):'无'}
                                            ],
                                            [
                                                {title:'审核描述',val:content.audit.remark!=null ? content.audit.remark:'无'},
                                                {title:'',val:''}
                                            ]
                                ],

                                'hirstory': hirstoryHtml
                                           
                            };
                        data.push(dataHtml);
                    }

                    that.tbData1 = data;
                }
            }).catch(function(resp){
                that.$Message.warning('加载授信信息异常');
            });
        },
        reliveStatusTxt(status , isAssign , isSubmit) {
            var statusTxt = '未知';
            if(isAssign == 0) {
                statusTxt = '待分配';
            }else {
                if(isSubmit == 0) {
                    if(status != null) {
                        if(status == 0 ) {
                            statusTxt = "待审核";
                        } else if (status == 1) {
                            statusTxt = "挂起";
                        } else if(status == 2) {
                            statusTxt = '审核通过';
                        } else if(status == -4) {
                            statusTxt = '审核拒绝';
                        } else if(status == 3) {
                            statusTxt = '退回客户补充资料';
                        } else if(status == 4) {
                            statusTxt = '退回业务员补充资料';
                        }
                    }
                }else if(isSubmit == 1) {
                    if(status == 1) {
                        statusTxt = '审核通过';
                    } else if(status == -1) {
                        statusTxt = '审核拒绝';
                    } else if(status == 0) {
                        statusTxt = '待审核';
                    }
                }
            }

            return statusTxt;
        }
    }
}
</script>