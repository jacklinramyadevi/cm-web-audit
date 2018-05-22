<style scoped>
.index img{width:100%;height:auto;}
</style>

<template>
  <div class="index">
    <img v-if="pageWin>=768" src="../assets/login_huanyingye.png"/>
    <img v-else src="../assets/login_huanyingye1.png"/>
  </div>
</template>

<script>
export default {
    name: 'index',
    props:['systemId'],
    data () {
        return {
        }
    },
    created:function(){
        //this.systemId=showData.getCookie('systemId');
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    }
}
</script>
