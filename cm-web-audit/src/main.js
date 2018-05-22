// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store/store'

axios.defaults.baseURL = store.getters.httpUrl;
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

// http response 拦截器
axios.interceptors.response.use(
  response => {
  	if (response) {
	    if ((response.data.code).toString() === '401') {
	        store.dispatch('delete_token');
	        router.replace({
	            path: 'login',
	            //query: {redirect: router.currentRoute.fullPath}
	        });
	    }
	    else{
            var temp = response.data + "";
            //console.log(temp.indexOf('loginGo'))
		    if (temp.indexOf('loginGo') > -1) {
		       router.go(0);
		    }
	    }
	    return response;
    	//return Promise.reject(response.data.msg)  // 返回接口返回的错误信息
    }
    
  },
  error => {
    if (error.response) {
        if (error.response.status === 401) {
      		store.dispatch('delete_token');
            router.replace({
	            path: 'login',
	            query: {redirect: router.currentRoute.fullPath}
            })
        }
    }
    //return Promise.reject(error.response.data)  // 返回接口返回的错误信息
  }
);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
