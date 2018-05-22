export default{
     data () {
	    return { 
			state : {
			    login:'/users',//登录
            	logout:'/logout',//退出登录
	            info:'/custs/info',//基本信息 
	            smsList:'/msgs/smsList',//短信列表
	            records:'/pay/records',//支付记录查询
	            list:'/orders/list',//订单信息查询
	            repayDetailQuery:'/repay/repayDetailQuery',//还款明细
	            repayPlanQuery:'/repay/repayPlanQuery',//还款计划
	            systemWithholdRepay:'/repay/systemWithholdRepay',//后台系统代扣
	            creditInfo:'/credit/info',// 授信信息
	            queryTreatedRecordInfo:'/linepay/queryTreatedRecordInfo',//线下还款
	            saveLineRepRecord:'linepay/saveLineRepRecord',//新增线下还款
	            uploadFile:'/file/uploadFile',//上传文件
	            esDownDocInfoNew:'/file/esDownDocInfoNew',//查看文件
	            queryComplaintRecordInfo:'/comp/queryComplaintRecordInfo',//查询客户投诉记录信息
	            saveComplaintRecord:'/comp/saveComplaintRecord',//新增客户投诉记录信息
	            queryHandleRecordInfo:'/handle/queryHandleRecordInfo',//查询投诉跟进记录信息
	            saveHandleRecord:'/handle/saveHandleRecord',//新增投诉跟进记录信息
	            excelRepayPlanStatInfo:'/comp/excelRepayPlanStatInfo',//导出投诉内容
	            getRepayStatusAndClrAmount:'repay/getRepayStatusAndClrAmount'//获取剩余还款总额
			},
			gets : {
			    login: (state) => state.login,
          logout:(state) => state.logout,
			    info: (state) => state.info,
			    smsList: (state) => state.smsList,
			    records: (state) => state.records,
			    list: (state) => state.list,
			    repayDetailQuery: (state) => state.repayDetailQuery,
			    repayPlanQuery: (state) => state.repayPlanQuery,
			    systemWithholdRepay: (state) => state.systemWithholdRepay,
			    creditInfo: (state) => state.creditInfo,
			    queryTreatedRecordInfo: (state) => state.queryTreatedRecordInfo,
			    uploadFile: (state) => state.uploadFile,
			    esDownDocInfoNew: (state) => state.esDownDocInfoNew,
			    queryComplaintRecordInfo: (state) => state.queryComplaintRecordInfo,
			    saveComplaintRecord: (state) => state.saveComplaintRecord,
			    queryHandleRecordInfo: (state) => state.queryHandleRecordInfo,
			    saveHandleRecord: (state) => state.saveHandleRecord,
			    excelRepayPlanStatInfo: (state) => state.excelRepayPlanStatInfo,
			    saveLineRepRecord: (state) => state.saveLineRepRecord,
			    getRepayStatusAndClrAmount: (state) => state.getRepayStatusAndClrAmount
			}
		}
	}
}