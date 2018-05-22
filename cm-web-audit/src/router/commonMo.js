import axios from 'axios';
import Vuex from 'vuex';
import cookie from '../router/cookie.js';
export default{
    loginAuth(detail,thisval,type){//登陆
        axios.get(thisval.$store.getters.login+'?'+detail,
            {
                withCredentials: true,
                xsrfCookieName: 'SESSION',
                headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '0' )  {
                //console.log(resp.data.code)
                //console.log(resp.data.result.perm)
                thisval.getMenu(resp.data.data.perm);
                thisval.getuserInfo(resp.data.data.userInfo);
                if(type=='menu'){
                    thisval.getSystem(resp.data.data.systems);
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('登录异常');
        });
    },
    loginOut(detail,thisval,logoutHref){//退出登录
        axios.get(thisval.$store.getters.logout+'?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() === '0' ) {
                thisval.$store.dispatch('delete_accessToken');
                thisval.$store.dispatch('delete_userInfo');
                window.location.href=logoutHref;
            }else {
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('退出登录异常');
        });
    },
    getuserInfo(detail,thisval){//个人信息
        axios.get('/credit-mg/oauth2/getUserInfo?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){

            if(resp.data.code.toString() == '200' )  {
                thisval.getuserInfo(resp.data.obj);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('获取数据异常');
        });
    },
    updPassword(detail,thisval,token){//修改密码
        axios({
            method: 'post',
            url:   '/credit-mg/oauth2/changePasswordWithPassword'+token,
            data:detail,
            withCredentials: true
        }).then(function (response) {
            if(response.data.code.toString() == '200' ) {
                thisval.$Message.success(response.data.msg);
            }else {
                thisval.$Message.warning(response.data.msg);
            }
        }.bind(this)).catch(function (error) {
            // Wu oh! Something went wrong
            thisval.$Message.warning('修改异常');
        });
    },
    /*changeAline(detail,thisval){//更改在线状态
        axios.put('/credit-mg/oauth2/changeIsAline?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.$Message.success('修改状态成功');
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('更改在线状态数据异常');
        });
    },*/
}