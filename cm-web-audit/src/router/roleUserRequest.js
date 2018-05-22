import axios from 'axios';
export default{
    loginAuth(detail, thisval){
        axios({
            method: 'post',
            url:   '/credit-mg/auth/login',
            data: {
                account: 'admin',
                password:  '888888'
            },
            withCredentials: true
        }).then(function (response) {
            //var resultval = JSON.parse(response.data.toString());
            //console.log(resultval.msg)
            if(response.data.code.toString() == '200' ) {
                thisval.loginSuccess()

            }else {
                thisval.$Message.warning('系统异常');

            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    getOrganizationList(detail, thisval){

            axios.get('/credit-mg/common/user/getManagerOrg?systemId=1',
                {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
                }).then(function(resp){
                if(resp.data.code.toString() == '200' )  {
                    thisval.getOrganizationList(resp.data, detail);

                    thisval.$Message.success(resp.data.msg);
                }else{
                    thisval.$Message.warning(resp.data.msg);
                }
            }).catch(function(resp){
                thisval.$Message.warning('系统异常');
            });
    },
    getRoleById(detail, thisval, item, callback, returnFn){
        //http://192.168.100.31:8080/credit-mg/common/user/getRoleByOrgId?orgId=1
            axios.get('/credit-mg/common/user/getRoleByOrgId?'+ detail,
                {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
                }).then(function(resp){
                if(resp.data.code.toString() == '200' )  {
                    thisval.getRole(resp.data, item, callback, returnFn);

                    //thisval.$Message.success(resp.data.msg);
                }else{
                    thisval.$Message.warning(resp.data.msg);
                }
            }).catch(function(resp){
                thisval.$Message.warning('系统异常');
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

            }else {
                thisval.$Message.warning('系统异常');
            }

        }.bind(this)) .catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    addRole(detail, thisval){
        axios.post('/credit-mg/role',JSON.stringify(detail),
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
    updateRole(detail, thisval){
        axios.put('/credit-mg/role/update',JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable(detail);
                thisval.$Message.success(resp.data.msg);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
        });
    },
    deleteRole(detail, thisval){
        axios.put('/credit-mg/role/delete',JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable(detail);
                thisval.$Message.success(resp.data.msg);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
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

            }else {
                thisval.$Message.warning('系统异常');
            }

        }.bind(this)) .catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('系统异常');
        });
    },
    addUser(detail, thisval){
        axios.post('/credit-mg/user/add',JSON.stringify(detail),
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
    updateUser(detail, thisval){
        axios.put('/credit-mg/user/update',JSON.stringify(detail),
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
    deleteUser(detail, thisval){
        axios.put('/credit-mg/user/delete',JSON.stringify(detail),
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
    resetUserPassword(detail, thisval){
        axios.put('/credit-mg/user/initPassword',JSON.stringify(detail),
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.refreshTable();

                thisval.$Message.success('重置成功');
                thisval.$Notice.success({
                    title: '重置成功',
                    desc: '密码为：009999',
                    duration: 5
                });
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('系统异常');
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
            thisval.$Message.warning('系统异常');
        });
    },
    listRoleAuthPermission(roleid, thisval){
        axios.get('/credit-mg/permission/listRoleAuthPermission?systemId=1&roleId='+roleid,
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
    listRolePermission(roleid, thisval){
        axios.get('/credit-mg/permission/listRolePermission?systemId=1&roleId='+roleid,
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
    updateRolePermission(params, thisval){

        axios.post('/cmbms/permission/updateRolePermission',JSON.stringify(params),
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
    }
}