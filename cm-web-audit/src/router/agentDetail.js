import axios from 'axios';
export default{

	//渠道管理
	
	showAgent(detail, thisval){//代理商查询
        var list={};
        axios.post('/audit/agents/agentList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showresult(result);
                    return result;
                }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showMerchant(detail, thisval){//商户列表
        var list={};
        axios.post('/audit/merchant/merchantList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
            if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showresult(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showSalesPerson(detail, thisval){//业务员列表
        var list={};
        axios.post('/audit/salesMan/salesManList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showresult(result);
                    return result;
                }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showClerk(detail, thisval){//店员列表
        var list={};
        axios.post('/audit/clerk/clerkList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showresult(result);
                    return result;
                }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showCount(detail, thisval){//各角色统计
        var list={};
        axios.post('/audit/common/roleCount',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showResultCount(result);
                    return result;
                }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showProvince(detail, thisval){//省份
        var list={};
        axios.post('/audit/common/selectAuditProvinceList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showResultProvice(result);
                    return result;
                }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showCity(detail,thisval, item, callback){//市
        var list={};
        axios.post('/audit/common/selectAuditCityList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showCityRt(result, item, callback);
                    return result;
                }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showDistrict(detail,thisval, item, callback){//区县
        var list={};
        axios.post('/audit/common/selectAuditDistrictList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showDistrictRt(result, item, callback);
                    return result;
                }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    detailAgent(detail, thisval){//代理商详情
        var list={};
        axios.post('/audit/agents/agentDetailedInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showresult(result);
                    return result;
                }
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    detailMerchant(detail, thisval){//商户详情
        var list={};
        axios.post('/audit/merchant/merchantetailedInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showresult(result);
                    return result;
                }
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    detailSalesPerson(detail, thisval){//业务员详情
        var list={};
        axios.post('/audit/salesMan/salesManDetailedInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showresult(result);
                    return result;
                }
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    detailClerk(detail, thisval){//店员详情
        var list={};
        axios.post('/audit/clerk/clerkDetailedInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showresult(result);
                    return result;
                }
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showImages(detail, thisval , imgIndex){//获取图片/文件二进制流
        var result={};
        axios.post('/audit/file/downDocInfoNew',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data){
                    result=resp.data.result;
                    thisval.showImage(result, imgIndex);
                    return result;
                }
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showProduct(thisval){//产品列表
        var list={};
        axios.post('/audit/common/queryProductInfoFromConsume',
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showProductRt(result);
                    return result;
                }
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getMerchantProductList(detail, thisval){//商户产品
        axios.post('/audit/common/merchantProductList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.showProductRt(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    auditAgent(detail, thisval){//审核代理商
        var list={};
        axios.post('/audit/agents/auditAgentApprove',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showAudit(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    auditMerchant(detail, thisval){//审核商户
        var list={};
        axios.post('/audit/merchant/auditMerchantApprove',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showAudit(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    auditSalesPerson(detail, thisval){//审核业务员
        var list={};
        axios.post('/audit/salesMan/auditSalesManApprove',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showAudit(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    auditClerk(detail, thisval){//审核店员
        var list={};
        axios.post('/audit/clerk/auditClerkApprove',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
        }).then(function(resp){
        	if(resp.data.resCode==1){
                if(!!resp.data.result){
                    var result=resp.data.result;
                    thisval.showAudit(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    typeApprove(detail, type, thisval){//分配代理商，分配商户，分配业务员，分配店员
        //console.log(detail)
        var list={};
        var typepath = ''
        if( type == 'agents') {
            typepath = 'agents/distributionAgentApprove'
        }else if( type == 'merchant') {
            typepath = 'merchant/distributionMerchantApprove'
        }else if( type == 'salesman') {
            typepath = 'salesMan/distributionSalesManApprove'
        }else if( type == 'clerk') {
            typepath = 'clerk/distributionClerkApprove'
        }
        axios.post('/audit/'+typepath, JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            	if(resp.data.resCode==="1"){
            		thisval.approveResult();
            	}
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getAuditAgentProduct(detail, thisval){//代理商配置查询接口
        axios.post('/audit/agents/getAuditAgentProductCfgInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode==1) {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.getAuditAgent(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getMerchantProduct(detail, thisval){//商户配置查询接口
        axios.post('/audit/merchant/getMerchantProductCfgInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.getMerchant(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getAuditSalesMan(detail, thisval){//业务员配置查询接口
        axios.post('/audit/salesMan/getAuditSalesManCfgInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.getSalesMan(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getAuditClerk(detail, thisval){//店员配置查询接口
        axios.post('/audit/clerk/getAuditClerkCfgInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.getClerkProd(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    updateProductCfgInfo(detail, tabs, thisval){ //代理商配置更新接口, 商户配置更新接口, 业务员配置更新接口, 店员配置更新接口
        var tabpath = ''
        if(tabs=='tab1'){
            tabpath = 'agents/uptAuditAgentProductCfgInfo'
        }else if(tabs=='tab2'){
            tabpath = 'merchant/uptMerchantProductCfgInfo'
        }else if(tabs=='tab3'){
            tabpath = 'salesMan/uptAuditSalesManCfgInfo'
        }else if(tabs=='tab4'){
            tabpath = 'clerk/uptAuditClerkCfgInfo'
        }
        axios.post('/audit/'+tabpath,JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.refreshTableResult(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getGoodList(detail, thisval){//商户商品信息
        axios.post('/audit/merchant/getMerchantGoodsList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.getGood(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    showGoodList(detail, thisval){//商品信息详情
        axios.post('/audit/merchant/getMerchantGoodsInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.showGoodInfo(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    updGoodList(detail, thisval){//修改商品
        axios.post('/audit/merchant/uptMerchantGoodsInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.resultGood('upd');
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    delGoodList(detail, thisval){//删除商品
        axios.post('/audit/merchant/delMerchantGoodsInfo',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.resultGood('del');
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getLevelList(detail, thisval){//查询等级
        axios.post('/audit/common/levelList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.getLevel(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
                return {}
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getInvestList(detail, thisval){//商户尽调详情列表
        axios.post('/audit/merchant/merchantInvestigaList',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.getInvest(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getInvestInfoList(detail, thisval){//商户尽调信息新增
        axios.post('/audit/merchant/addMerchantInvestiga',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {
                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.getInvestInfo(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    getInvestInfoDoc(detail, thisval){//商户尽调查看
        axios.post('/audit/merchant/merchantInvestigaDoc',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode=="1") {                if (!!resp.data.result) {
                    var result = resp.data.result;
                    thisval.getInvestDoc(result);
                    return result;
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    }
}
