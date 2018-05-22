<template>
  <div class="sections">
    <div class="demo-tabs-style2">
        <Tabs type="card" class="tabs" v-model="cardType" :size="tabSize">
            <TabPane :label="agentCount" name="tab1">
                <detail v-bind:tabMsg="'tab1'" v-bind:userInfo="userInfo" ref="tabChild" v-on:listenTo="showDetail"></detail>
            </TabPane>
            <TabPane :label="merchantCount" name="tab2">
                <detail v-bind:tabMsg="'tab2'" v-bind:userInfo="userInfo" ref="tabChild2" v-on:listenTo="showDetail"></detail>
            </TabPane>
            <TabPane :label="salesManCount" name="tab3">
                <detail v-bind:tabMsg="'tab3'" v-bind:userInfo="userInfo" ref="tabChild3" v-on:listenTo="showDetail"></detail>
            </TabPane>
            <TabPane :label="clerkCount" name="tab4">
                <detail v-bind:tabMsg="'tab4'" v-bind:userInfo="userInfo" ref="tabChild4" v-on:listenTo="showDetail"></detail>
            </TabPane>
        </Tabs>
    </div>
        
    <Modal v-model="model1" @on-ok="changeOk" title="选择审核人员">
         <Form :model="formChange">
             <FormItem>
                <Select v-model="formChange.name" placeholder="选择审核人员">
                    <Option value="1">xxx</Option>
                </Select>
            </FormItem>
         </Form>
    </Modal>
  </div>
</template>

<script>
import detail from '../components/agentDetail.vue'
import showData from '../router/agentDetail.js';
export default {
    name: 'sections',
    components:{ detail },
    data () {
        return {
            cardType:'tab1',
            tabSize:'default',
            closetab:false,
            model1:false,
            formChange:{name:'1'},
            selectedData : {},
            tabMsg: '',
            agentCount:'',
            merchantCount:'',
            salesManCount:'',
            clerkCount:'',
            userInfo:{}
        }
    },
    created:function(){
        this.userInfo=this.$store.getters.userInfo;
        var detail = {"custId":this.userInfo.id , "custName":this.userInfo.name , "content":{"operationType":1}};
        let resultCount=showData.showCount(detail,this);
        if($(window).width()<768){
            this.tabSize='small';
        }
    },
    methods:{
        changeOk(){
            var apporveObj = {}
            var idval = ''

            if( this.selectedData.id != undefined) {
                idval = this.selectedData.id;
            }else{
                for (var i=0; i< this.selectedData.length; i++){
                    if(this.selectedData[i].auditStatus=='未分配'){
                        if( i == this.selectedData.length - 1){
                            idval += this.selectedData[i].id
                        }else{
                                idval += this.selectedData[i].id + ','
                        }
                    }
                }
            }
            apporveObj = {
                "custId": this.userInfo.id,
                "custName": this.userInfo.name,
                "content": {
                    "auditCutsId":  this.formChange.name,//分配人ID,
                    "auditCutsName": 'xxx',//"分配人姓名",
                    "ids": idval,//代理ID,批量分配用逗号隔开,
                    "auditStatus": '1'//状态 1已分配待审核,
                }
            }
            
            var type = ''
            if( this.cardType == 'tab1') {
                type = 'agents'
            }else if( this.cardType == 'tab2') {
                type = 'merchant'
            }else if( this.cardType == 'tab3') {
                type = 'salesman'
            }else if( this.cardType == 'tab4') {
                type = 'clerk'
            }

            var result=showData.typeApprove(apporveObj, type, this);
        },
        showDetail(arr){
            
            if(arr!='' || arr!=undefined){
                this.selectedData = arr
                this.model1=true;
            }
        },
        approveResult(){
            this.$Message.success('分配成功');
            if(this.cardType == 'tab1'){
                this.$refs.tabChild.loadData();
            }else if(this.cardType == 'tab2'){
                this.$refs.tabChild2.loadData();
            }else if(this.cardType == 'tab3'){
                this.$refs.tabChild3.loadData();
            }else if(this.cardType == 'tab4'){
                this.$refs.tabChild4.loadData();
            }
            this.model1=false;
        },
        showResultCount(resultCount){
            var result=resultCount;
            if(result!=null || result!=undefined){
                this.agentCount='代理商('+result.agentCount+')';
                this.merchantCount='商户('+result.merchantCount+')';
                this.salesManCount='业务员('+result.salesManCount+')';
                this.clerkCount='店员('+result.clerkCount+')';
            }
        },
    }
}
</script>
