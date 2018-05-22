import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import Vuex from 'vuex'
import ZkTable from 'vue-table-with-tree-grid'
import VueSession from 'vue-sessionstorage'
import store from '../store/store'

Vue.use(Router)
Vue.use(iview)
Vue.prototype.axios = axios
Vue.use(Vuex)
Vue.use(ZkTable)
Vue.use(VueSession)

const router = new Router({
  mode:'history',
  routes:[
            {
              path:'/',
              redirect:'/index',
              component:resolve => require(['../views/headers.vue'],resolve),
              children:[{
                path:'/index',
                name:'61',
                component:resolve => require(['../views/index.vue'],resolve)
              }]
            },
            {
              path:'/systemSelect',
              component:resolve => require(['../views/systemSelect.vue'],resolve)
            },
            {
              path:'/swiper',
              component:resolve => require(['../views/swiperex.vue'],resolve)
            },
            {
              path:'/secondLogin',
              component:resolve => require(['../views/secondLogin.vue'],resolve)
            },
            {
              path: '/login',
              component: resolve => require(['../views/login.vue'],resolve)
            },
            {
              path: '/logout',
              component: resolve => require(['../views/logout.vue'],resolve)
            }/*,{
              path: '*',
              redirect:'/login'
            }*/
          ]
});

if(store.getters.menuList!='' && store.getters.menuList!=null){
  let menuList=JSON.parse(store.getters.menuList);
  //router.options.routes[0].children=[];
  var counter = menuList.length - 1;

  function myFunction() {
      
      var menu = {};
      var filename = menuList[counter].url;
      menu = {path:menuList[counter].url,name:(menuList[counter].name).toString(),component:resolve => require(['../views'+filename+'.vue'],resolve)};
      var newmenu = []
      newmenu.push(menu)
      router.options.routes[0].children.push(menu);
      
      router.addRoutes(router.options.routes);



      counter--;
      if (counter >= 0) {
          setTimeout(myFunction, 100);    
      }else{

        router.options.routes.push({
          path: '*',
          redirect:'/index'
        });

      router.addRoutes(router.options.routes);

      }
  }

  myFunction();
}

router.beforeEach((to, from, next) => {
  if(to.path!='/login'){
      
    //if (to.matched.some(res => res.meta.requireLogin)) {
      
      if(store!=undefined){
        if(store.getters.token===null || store.getters.token===''){
          store.dispatch('delete_menuList');
          next({
            path: "/login"
          });
        }else{
          next();
        }
      }else{
        next({
          path: "/login"
        });
      }
  }else{
    next();
  }
});



export default router;
