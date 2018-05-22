<template>
 <div >
     <carousel-3d :controls-visible="true" :count="datavalue.length" :autoplay='true' :display="3" :autoplayTimeout='10000'>
         <slide v-for="(slide, i) in datavalue" :index="i">
             <h1>{{slide.val}}</h1>
         </slide>
     </carousel-3d>
</div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
//import { swiper, swiperSlide } from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
export default {
    name: 'carrousel',
    components: {
        Carousel3d,
        Slide
    },
    data() {
        return {
            datavalue: [],

        }
    },

 // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {


    },
    mounted() {

    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
    },
    created(){
        this.getSystemList()
    },
    methods:{
        getSystemList(){
            var self = this
            setTimeout(function() {
                self.datavalue.push({'val': 'slide 1'})
                self.datavalue.push({'val': 'slide 2'})
                self.datavalue.push({'val': 'slide 3'})
                self.datavalue.push({'val': 'slide 4'})
                self.datavalue.push({'val': 'slide 5'})

                console.log(self.datavalue)
            },2000)

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-container{
  height:200px;
  overflow: hidden;
  margin-top:88px;/*px*/
}
.swiper-wrapper{
  height:200px;
}
.swiper-slide{
  height:200px;
  float: left;
  /*background:red;*/
  width:300px;
}
 .systemShow{position: absolute;top: 50%;left: 50%;margin-top: -300px;margin-left: -500px;}

</style>