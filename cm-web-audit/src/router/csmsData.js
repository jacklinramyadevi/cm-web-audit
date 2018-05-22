import axios from 'axios';
import Vuex from 'vuex';
import cookie from '../router/cookie.js';

export default{

    loginAuth(detail,thisval,type){//登陆
        axios.get(thisval.$store.getters.login+'?'+detail, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/json',
                    //'accessToken': 'f735a285-f996-40db-aa06-8d0e90103c7b'
                }
            }).then(function(resp){
            if(resp.data.resCode.toString() == '1' )  {
                //console.log(resp.data.resCode)
                //console.log(resp.data.result.perm)
                thisval.getMenu(resp.data.result.perm);
                thisval.getuserInfo(resp.data.result.userInfo);
                if(type=='menu'){
                    thisval.getSystem(resp.data.result.systems);
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('登录异常');
        });
    },
    /*loginOut(detail,thisval,logoutHref){//退出登录
        axios.get('/credit-mg/oauth2/logout'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() === '200' ) {
                cookie.clearCookie('accessToken');
                thisval.$store.dispatch('delete_accessToken');
                thisval.$store.dispatch('delete_userInfo');
                window.location.href=logoutHref;
            }else {
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('退出登录异常');
        });
    },*/
    getuserInfo(detail,thisval){//基本信息
        axios({
            method: 'post',
            url:thisval.$store.getters.info,
            data:detail,
            headers:{'Content-Type':'application/json'},
            withCredentials: true
        }).then(function (res) {
            if(res.data.code.toString() === '0' ) {
                thisval.getuserInfo(res.data.data);
            }else {
                thisval.$Message.warning(res.data.msg);
            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    getsmsList(detail,thisval){//短信列表
        axios({
            method: 'post',
            url:thisval.$store.getters.smsList,
            data:detail,
            withCredentials: true
        }).then(function (res) {
            if(res.data.code.toString() === '0' ) {
                thisval.getsmsList(res.data.data);
            }else {
                thisval.$Message.warning(res.data.msg);
            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    getRecords(detail,thisval){//支付记录查询
        axios({
            method: 'post',
            url:thisval.$store.getters.records,
            data:detail,
            withCredentials: true
        }).then(function (res) {
            if(res.data.code.toString() === '0' ) {
                thisval.getRecords(res.data.data);
            }else {
                thisval.$Message.warning(res.data.msg);
            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    getOrderList(detail,thisval){//订单信息查询
        //var params={"data":{"value":"030003"}};
        thisval.axios.post(thisval.$store.getters.list, detail,
              {
                  headers:{'Content-Type':'application/json'}
              }).then(function (res) {
            if(res.data.code.toString() === '0' ) {
                thisval.getOrderList(res.data.data);
            }else {
                thisval.$Message.warning(res.data.msg);
            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    getRepayDetail(detail,thisval){//还款明细
        thisval.axios.post(thisval.$store.getters.repayDetailQuery, detail,
              {
                  headers:{'Content-Type':'application/json'}
              }).then(function (res) {
            if(res.data.code.toString() === '0' ) {
                thisval.getRepayDetail(res.data.data);
            }else {
                thisval.$Message.warning(res.data.msg);
            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    getRepayPlan(detail,thisval){//还款计划
        thisval.axios.post(thisval.$store.getters.repayPlanQuery, detail,
              {
                  headers:{'Content-Type':'application/json'}
              }).then(function (res) {
            if(res.data.code.toString() === '0' ) {
                thisval.getRepayPlan(res.data.data);
            }else {
                thisval.$Message.warning(res.data.msg);
            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    systemWithhold(detail,thisval){//后台系统代扣
        thisval.axios.post(thisval.$store.getters.systemWithholdRepay, detail,
              {
                  headers:{'Content-Type':'application/json'}
              }).then(function (res) {
            if(res.data.code.toString() === '0' ) {
                thisval.$Message.success('扣款成功');
            }else {
                thisval.$Message.warning(res.data.msg);
            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    getTreatedRecordInfo(detail,thisval){//线下还款
        thisval.axios.post(
            thisval.$store.getters.queryTreatedRecordInfo, detail, 
            {headers:{'Content-Type':'application/json'} }
        ).then(function(res){
            if(res.data.code.toString() === '0'){
                thisval.getTreatedRecordInfo(res.data.data);
            }else{
                thisval.$Message.warning(res.data.msg);
            }
        }).catch(function(error){
            thisval.$Message.warning('线下还款信息查询异常');
        });
    },
    saveLineRepRecord(detail,thisval){//新增线下还款
        thisval.axios.post(
            thisval.$store.getters.saveLineRepRecord, detail, 
            {headers:{'Content-Type':'application/json'} }
        ).then(function(res){
            if(res.data.code.toString() === '0'){
                thisval.model1=false;
                thisval.$Message.warning('线下还款成功');
            }else{
                thisval.$Message.warning(res.data.msg);
            }
        }).catch(function(error){
            thisval.$Message.warning('新增线下还款异常');
        });
    },
    getComplaintRecordInfo(detail,thisval){//查询客户投诉记录
        thisval.axios.post(
            thisval.$store.getters.queryComplaintRecordInfo, detail, 
            {headers:{'Content-Type':'application/json'} }
        ).then(function(res){
            if(res.data.code.toString() === '0'){
                thisval.getComplaintRecordInfo(res.data.data);
            }else{
                thisval.$Message.warning(res.data.msg);
            }
        }).catch(function(error){
            thisval.$Message.warning('客户投诉记录查询异常');
        });
    },
    saveComplaintRecord(detail,thisval){//新增客户投诉记录
        thisval.axios.post(
            thisval.$store.getters.saveComplaintRecord, detail, 
            {headers:{'Content-Type':'application/json'} }
        ).then(function(res){
            if(res.data.code.toString() === '0'){
                thisval.$Message.warning('新增投诉记录成功');
                thisval.model2=false;
            }else{
                thisval.$Message.warning(res.data.msg);
            }
        }).catch(function(error){
            thisval.$Message.warning('新增投诉记录异常');
        });
    },
    getHandleRecordInfo(detail,thisval){//查询投诉跟进记录
        thisval.axios.post(
            thisval.$store.getters.queryHandleRecordInfo, detail, 
            {headers:{'Content-Type':'application/json'} }
        ).then(function(res){
            if(res.data.code.toString() === '0'){
                thisval.getHandleRecordInfo(res.data.data);
            }else{
                thisval.$Message.warning(res.data.msg);
            }
        }).catch(function(error){
            thisval.$Message.warning('投诉跟进记录查询异常');
        });
    },
    saveHandleRecord(detail,thisval){//新增投诉跟进记录
        thisval.axios.post(
            thisval.$store.getters.saveHandleRecord, detail, 
            {headers:{'Content-Type':'application/json'} }
        ).then(function(res){
            if(res.data.code.toString() === '0'){
                thisval.model2=false;
                thisval.getHandleRecord(1);
                thisval.cpltData.hanCount=parseInt(thisval.cpltData.hanCount)+1;
                thisval.$Message.warning('新增投诉跟进记录成功');
            }else{
                thisval.$Message.warning(res.data.msg);
            }
        }).catch(function(error){
            thisval.$Message.warning('新增投诉跟进记录异常');
        });
    },
    getRepayStatusAndClrAmount(detail,thisval){//获取剩余还款总额
        thisval.axios.post(
            thisval.$store.getters.getRepayStatusAndClrAmount, detail, 
            {headers:{'Content-Type':'application/json'} }
        ).then(function(res){
            if(res.data.code.toString() === '0'){
                thisval.getRepayData=res.data.data;
            }else{
                thisval.$Message.warning(res.data.msg);
            }
        }).catch(function(error){
            thisval.$Message.warning('获取剩余还款总额异常');
        });
    }
}