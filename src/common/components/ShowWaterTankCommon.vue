<template>
    <div :id="this.id" class="showWaterTank"></div>
</template>
<script>
import $ from 'jquery';
import 'echarts-liquidfill/src/liquidFill.js';
export default {
    data(){
        return {
           id:'waterTank'
        }
    },
    methods:{
      showWaterTank(id,item){
        var myChart = this.$echarts.init(document.getElementById(id));
        console.log(item);
        let tank=item.mainSensor/item.buildRange;
        myChart.setOption({series: [{
              type:'liquidFill',
              data:[tank],
              label:{
                  normal:{
                      textStyle:{
                          fontSize:20  // 修改字体大小
                      }
                  }
              }
        }]});
       },
       initWaterTank(){
           this.showWaterTank(this.id,this.item);
       }
    },
    props:['deviceId12','item'],
    mounted(){
        this.initWaterTank();
    },
    updated(){
        this.id=this.deviceId12+"wt";
        this.showWaterTank(this.id,this.item);
    }
}
</script>
<style lang="stylus" scoped>
    .showWaterTank{
        width:230px;
        height:210px;
    }
</style>