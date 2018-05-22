import axios from 'axios';
import Vuex from 'vuex';

export default{
    loginAuth(detail, thisval){//登录
        axios({
            method: 'post',
            url:   '/credit-mg/auth/login',
            data: detail,
            withCredentials: true
        }).then(function (response) {
            if(response.data.code.toString() == '200' ) {
                /*if(this.getCookie('account')!=='' || this.getCookie('account')!==null){
                    this.clearCookie('account');
                }*/
                thisval.loginOk(response.data.obj);
                response.data.rows='loginGo';
            }else {
                thisval.$Message.warning(response.data.msg);
            }
        }.bind(this)).catch(function (error) {
            thisval.$Message.warning('登录异常');
        });
    },
    secondLogin(detail, thisval){//单点登录
        axios.get('/credit-mg/oauth2/getAccessToken?'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
                if(resp.data.code.toString()=='200'){
                    var result=resp.data.obj;
                    window.location.href=result.redirectUrl+'?accessToken='+result.accessToken+'&expire='+result.expire;
                }
        }).catch(function(resp){
            thisval.$Message.warning('单点登录失败');
        });
    },
    loginOut(detail,thisval){//退出登录
        let that=this;
        axios({
            method: 'post',
            url:   '/credit-mg/auth/logout'+detail,
            withCredentials: true
        }).then(function (response) {
            if(response.data.code.toString() === '200' ) {
                that.lostToken(thisval);
            }else {
                thisval.$Message.warning(response.data.msg);
            }
        }).catch(function (resp) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('退出登录异常');
        });
    },
    getMenu(detail,thisval){//菜单
        axios.get('/credit-mg/permission/listUserPermission'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.getMenu(resp.data.obj);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('获取菜单异常');
        });
    },
    getSystemList(detail,thisval){//所有系统
        axios.get('/credit-mg/system/listUserSystem'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() === '200' )  {
                thisval.getSystemList(resp.data.obj);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('获取所有系统异常');
        });
    },
    getTabSystemList(detail,thisval){//选择tab系统
        axios.get('/credit-mg/system/listUserManagerSystem'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() === '200' )  {
                thisval.getTabSystemList(resp.data.obj);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('获取所有系统异常');
        });
    },


    //团队管理
    getOrganizationList(detail, thisval){
        axios.get('/credit-mg/common/user/getManagerOrg?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() === '200' )  {
                thisval.getOrganizationList(resp.data, detail);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('获取组织列表异常');
        });
    },
    getRoleById(detail, thisval, item, callback, returnFn){
        //http://192.168.100.31:8080/credit-mg/common/user/getRoleByOrgId?orgId=1
            axios.get('/credit-mg/common/user/getRoleByOrgId?'+ detail,
                {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
                }).then(function(resp){
                if(resp.data.code.toString() === '200' )  {
                    thisval.getRole(resp.data, item, callback, returnFn);

                    //thisval.$Message.success(resp.data.msg);
                }else{
                        thisval.$Message.warning(resp.data.msg);
                }
            }).catch(function(resp){
                thisval.$Message.warning('获取角色id异常');
            });
    },
    getRoleList(detail,thisval){
        axios({
            method: 'get',
            url:   '/credit-mg/role/list?' + detail,
            withCredentials: true,
            xsrfCookieName: 'SESSION'
        }).then(function (response) {
            //var resultval = JSON.parse(response.data.toString());
            if(response.data.code.toString() == '200' ) {
                thisval.getRolelist(response.data['obj'])

            }else{
                thisval.$Message.warning(response.data.msg);
            }

        }.bind(this)) .catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('获取角色异常');
        });
    },
    checkRoleName(detail, thisval,callback){
        axios.get('/credit-mg/common/role/checkRoleName?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                if(resp.data.obj.result){
                    callback();
                }else{
                    return callback(new Error('该角色名称已存在'));
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('检查角色名称异常');
        });
    },
    addRole(detail, thisval,token){
        axios.post('/credit-mg/role'+token,JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable();
                thisval.$Message.success(resp.data.msg);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('添加角色异常');
        });
    },
    updateRole(detail, thisval,token){
        axios.put('/credit-mg/role/update'+token,JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable(detail);
                thisval.$Message.success(resp.data.msg);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('修改角色异常');
        });
    },
    deleteRole(detail, thisval,token){
        axios.put('/credit-mg/role/delete'+token,JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable(detail);
                thisval.$Message.success('删除成功');
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('删除角色异常');
        });
    },
    getUserList(detail, thisval){
        axios({
            method: 'get',
            url:   '/credit-mg/user/list?' + detail,
            withCredentials: true,
            xsrfCookieName: 'SESSION'
        }).then(function (response) {
            //var resultval = JSON.parse(response.data.toString());
            if(response.data.code.toString() == '200' ) {
                thisval.getUserList(response.data['obj'])
            }else{
                thisval.$Message.warning(response.data.msg);
            }

        }.bind(this)) .catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('获取成员列表异常');
        });
    },
    addUser(detail, thisval,token){
        axios.post('/credit-mg/user/add'+token,JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable();
                thisval.$Message.success(resp.data.msg);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('添加成员异常');
        });
    },
    updateUser(detail, thisval,token){
        axios.put('/credit-mg/user/update'+token,JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable();
                thisval.$Message.success(resp.data.msg);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('修改成员异常');
        });
    },
    deleteUser(detail, thisval,token){
        axios.put('/credit-mg/user/delete'+token,JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable();
                thisval.$Message.success(resp.data.msg);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('删除成员异常');
        });
    },
    resetUserPassword(detail, thisval,token){
        axios.put('/credit-mg/user/initPassword'+token,JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable();

                thisval.$Message.success('重置成功');
                thisval.$Notice.success({
                    title: '重置成功',
                    desc: '密码为：888888',
                    duration: 5
                });
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('重置密码异常');
        });
    },
    userActive_inActive(status, detail, thisval){
        axios.put('/credit-mg/user/'+ status,JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable();
                thisval.$Message.success(resp.data.msg);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('禁用解禁操作异常');
        });
    },
    listRoleAuthPermission(detail, thisval, roleid){
        axios.get('/credit-mg/permission/listRoleAuthPermission?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
                
            if(resp.data.code.toString() == '200' )  {

                thisval.listRoleAuthPermission(resp.data, roleid);

                //thisval.$Message.success(resp.data.msg);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    listRolePermission(detail, thisval){
        axios.get('/credit-mg/permission/listRolePermission?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.listRolePermission(resp.data);

                //thisval.$Message.success(resp.data.msg);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    updateRolePermission(params, thisval,token){
        axios.post('/credit-mg/permission/updateRolePermission'+token,JSON.stringify(params),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable();
                thisval.$Message.success(resp.data.msg);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
	showPerson(detail, thisval){//成员查询
        axios.get('/credit-mg/user/list?'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.showresult(result);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('获取成员异常');
        });
    },
    showOrganize(detail, thisval){//组织查询
        axios.get('/credit-mg/org/list?'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.showresult(result);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    addOrganize(detail, thisval,token){//添加组织
        axios({
            method:'post',
            url:'/credit-mg/org/add'+token,
            data:detail,
            withCredentials: true
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.addOrg('true');
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    delOrganize(detail, thisval,token){//删除组织
        axios({
            method:'put',
            url:'/credit-mg/org/delete'+token,
            data:detail,
            withCredentials: true
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.delResult('true');
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    updOrganize(detail, thisval,token){//更新组织
        axios({
            method:'put',
            url:'/credit-mg/org/update'+token,
            data:detail,
            withCredentials: true
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.addOrg('true');
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    selOrganize(detail, thisval){//组织详情
        axios.get('/credit-mg/org/detail/'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.selResult(result);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    chkOrganize(detail, thisval){//组织名校验
        axios.get('/credit-mg/common/org/checkOrgName?'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.showChkOrg(result);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    getOrganize(detail, thisval){//获取组织管理员的一级组织
        axios.get('/credit-mg/common/org/getManagerOrgLevelOne?'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.showOrganize(result);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    getMenuList(detail, thisval,level){//菜单列表
        axios.get('/credit-mg/memu/list?'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.showresult(result,level);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    getMenuDetail(detail, thisval){//菜单详情
        axios.get('/credit-mg/memu/detail/'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.showDetail(result);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    addMenu(detail, thisval,token){//添加菜单
        axios({
            method:'post',
            url:'/credit-mg/memu/add'+token,
            data:detail,
            withCredentials: true,
            xsrfCookieName: 'SESSION'
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.addResult('true');
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    updMenu(detail, thisval,token){//修改菜单
        axios({
            method:'put',
            url:'/credit-mg/memu/update'+token,
            data:detail,
            withCredentials: true,
            xsrfCookieName: 'SESSION'
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.addResult('true');
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    delMenu(detail, thisval,token){//删除菜单
        axios({
            method:'put',
            url:'/credit-mg/memu/delete'+token,
            data:detail,
            withCredentials: true,
            xsrfCookieName: 'SESSION'
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.delResult('true');
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    changeMenu(detail, thisval,token){//菜单排序
        axios({
            method:'put',
            url:'/credit-mg/memu/exchange'+token,
            data:detail,
            withCredentials: true,
            xsrfCookieName: 'SESSION'
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                //console.log(result)
                thisval.changeResult('true');
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('排序失败');
        });
    },
    getOrgList(detail, thisval){//组织机构查询
        axios.get('/credit-mg/org/listAll?'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.showOrgData(result);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    getPermission(detail, thisval){//查询可授权给组织的权限
        axios.get('/credit-mg/permission/listAuthPermission?'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.showpsmData(result,detail);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    listOrgPermission(detail, thisval){//查询组织的权限
        axios.get('/credit-mg/permission/listOrgPermission?'+detail,
            {headers:{'Content-Type':'application/json',withCredentials: true,xsrfCookieName: 'SESSION'}
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.obj;
                thisval.listOrgPermission(result);
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });
    },
    updateOrgPermission(detail, thisval,token){
        axios({
            method:'post',
            url:'/credit-mg/permission/updateOrgPermission'+token,
            data:detail,
            withCredentials: true
        }).then(function(resp){
            if(resp.data.code===200){
                var result=resp.data.msg;
                thisval.$Message.success( result );
            }else{
                    thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('加载失败');
        });

    },
    getuserInfo(thisval,token){//个人信息
        axios.get('/credit-mg/auth/getMyInfo'+token,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.getuserInfo(resp.data.obj);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('获取个人信息异常');
        });
    },
    updPassword(detail,thisval,token){//修改密码
        axios({
            method: 'post',
            url:   '/credit-mg/auth/changePasswordWithPassword'+token,
            data:detail,
            withCredentials: true
        }).then(function (response) {
            if(response.data.code.toString() == '200' ) {
                thisval.$Message.success(response.data.msg);
            }else{
                thisval.$Message.warning(response.data.msg);
            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('修改密码异常');
        });
    },

    //设置cookie
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        //console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        //console.info(document.cookie);
    },
    //获取cookie
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    //清除cookie
    clearCookie(name) {
        this.setCookie(name, "", -1);

    },


    subArr(str){
        var s=str;
        if(str.length>6){
            s=str.substring(0,6);
        }
        return s;
    },
    //退出登录销毁cookie
    lostToken(thisval){
        //this.clearCookie('token');
        thisval.$store.dispatch('delete_token');
        thisval.$router.push({path:'/login'});
    }
}