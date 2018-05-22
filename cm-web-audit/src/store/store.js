import Vue from 'vue'
import Vuex from 'vuex'
import showData from '../router/teamSystem.js'

Vue.use(Vuex)

const state = {
    httpUrl:'http://test.mng.creditmate.cn',
    token: showData.getCookie("token"),
    menuList: showData.getCookie("menuList")
}

const getters = {
    httpUrl:(state) => state.httpUrl,
    token: (state) => state.token,
    menuList: (state) => state.menuList
}

const actions = {
    add_token({commit}) {
        return commit('ADD_TOKEN');
    },
    delete_token({commit}) {
        return commit('DELETE_TOKEN');
    },
    edit_token({commit}, token) {
        return commit('EDIT_TOKEN', token);
    },


    add_menuList({commit}) {
        return commit('ADD_MENULIST');
    },
    delete_menuList({commit}) {
        return commit('DELETE_MENULIST');
    },
    edit_menuList({commit}, menuList) {
        return commit('EDIT_MENULIST', menuList);
    }
}

const mutations = {
    ADD_TOKEN(state) {
        //根据id判断是否为同一个note
        /*const noteid = Math.round(Math.random()*10000);
        const note = {
            id: noteid,
            token: '',
        }*/
        state.token=showData.getCookie("token");
        /*if(state.notes.length == 1) {
            state.activeNote = state.notes[0];
        }*/
        //console.log(state.token);
    },
    DELETE_TOKEN(state) {
        showData.clearCookie("token");
        state.token = '';
        mutations.DELETE_MENULIST(state);
        /*for(let key in notes) {
            if(notes[key].id == state.activeNote.id) {
                state.notes.splice(key, 1);
            }
        }
        if(state.notes.length != 0)
            state.activeNote = state.notes[0];
        else
            state.activeNote = {}*/
    },
    EDIT_TOKEN(state, token) {
        /*state.activeNote.token = token;
        for(let i in state.notes) {
            if(i == state.activeNote) {
                i.token = token;
            }
        }*/
        showData.setCookie("token",token,20);
        state.token=token
    },/*,
    SET_ACTIVENOTE(state, item) {
        state.activeNote = item;
    }*/

    ADD_MENULIST(state) {
        state.menuList=showData.getCookie("menuList");
    },
    DELETE_MENULIST(state) {
        showData.clearCookie("menuList");
        state.menuList = '';
    },
    EDIT_MENULIST(state, menuList) {
        showData.setCookie("menuList",menuList,20);
        state.menuList=menuList
    },
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})