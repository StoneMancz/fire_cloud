<template>
  <div class="content">
    <LeftCommon></LeftCommon>
    <div id="mapContent">
      <div id="mapContent-header">
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('all')">所有</el-button>
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('smoke')">点型感烟火灾探测器</el-button>
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('doorSensor')">门磁开关探测器</el-button>
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('Level')">液位计</el-button>
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('Hydraulic')">压力计</el-button>
      </div>

      <div id="mapContent-content">
        <div class="device-item" 
          v-for="item in deviceList" v-bind:key="item.deviceId">
          <span style="color:white;font-size:12px;">{{item.installNumber}}</span>
          <button id="status"></button>
          <img src="../../../static/img/smokeDevice.jpg" style="width:100px;height:100px;
          margin-left:75px;margin-top:45px;"  v-if="item.shortTypeName=='烟感'">
          <img src="../../../static/img/Gate.jpg" style="width:100px;height:100px;
          margin-left:75px;margin-top:45px;"  v-if="item.shortTypeName=='门磁开关探测器'">
          <div class="showWaterTank" v-if="item.shortTypeName=='液位计'" id="showWaterTank"></div>
          <div class="Hydraulic" v-if="item.shortTypeName=='压力计'"></div>
          <div class="adds">{{item.areaName}}-{{item.deviceAddr}}</div>
        </div>
      </div>
      <div style="right: 0;position: fixed;bottom: 0;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="eventotal"
          @current-change="handlePaginCurrentChange">
        </el-pagination>
      </div>
    </div>
    <RightCommon ref="child"></RightCommon>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex';
import $ from 'jquery';
import qs from 'qs';
import 'echarts-liquidfill/src/liquidFill.js';
import QRCode  from "qrcodejs2";
import LeftCommon from '../../../common/components/LeftCommon';
import RightCommon from '../../../common/components/RightCommon';
export default {
  data() {
    return {
      areaID:'',
      deviceList:[],
      newDeviceList:[],
      eventotal:0,
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  components:{
    LeftCommon,
    RightCommon
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    showWaterTank(){
      var myChart = this.$echarts.init(document.getElementById("showWaterTank"));
      myChart.setOption({series: [{
            type:'liquidFill',
            data:[0.56],
            label:{
                normal:{
                    textStyle:{
                        fontSize:20  // 修改字体大小
                    }
                }
            }
      }]});
    },
    hydraulicFn(){},
    location(areaLong,areaLat){
      console.log(areaLong);
    },
    initDevceList(){
      let this_=this;
      var currentData = qs.stringify({'areaId':this_.areaID,'pageSize':10});
      this.$http.post("http://srv.shine-iot.com:8060/device/area/devs",currentData).
      then(function (response) {
          console.log("设备列表",response);
          let deviceTableData=response.data.data.records;
          this_.eventotal=response.data.data.total;
          this_.deviceList=deviceTableData;
      })
    },
    handlePaginCurrentChange(data){
        let this_=this;
        var currentData = qs.stringify({'areaId':this_.areaID,'pageSize':10,'pageNo':data});
        this.$http.post("http://srv.shine-iot.com:8060/device/area/devs",currentData).
        then(function(response){
            let deviceTableData=response.data.data.records;
            this_.deviceList=deviceTableData;
        })
    },
    fatherClickFn(data){
      this.areaID=data.id;
      this.$refs.child.areaID=data.id;
      this.$refs.child.initDevice();
      this.$refs.child.initEven();
      this.initDevceList();
    }
  },
  updated(){
    this.hydraulicFn();
    this.showWaterTank();
  },
  computed: {
    ...mapGetters({
      api: 'api'
    })
  },
  mounted(){
    this.initDevceList();
  }
}
</script>
<style lang="stylus" scoped>
.content{
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #ccc;
    top: 50px;
    bottom: 0;
}

#mapContent {
  position: relative;
  top: 2%;
  height:100%;
  border-left: 1px solid #1E2538;
  overflow: hidden;
  background:#042939;
  
  #mapContent-header{ 
    width 100%;
    padding-top 10px;
    padding-left 10px;
    padding-bottom 10px;
    background:#041B25;
  }

  #mapContent-content{
    width 100%;
    margin-left 0px;
    .device-item{
      margin-left 10px;
      margin-top 20px;
      width:250px;
      height:250px;
      float left;
      border-radius: 10px;
      background:#041B25;
      cursor: pointer;
      .adds{
        color:white;
        font-size:12px;
        margin-top: 60px;
      }
      #status{
        width:25px;
        height:25px;
        border-radius:100%;
        background:green;
        float right;
      }
      .showWaterTank{
        width:230px;
        height:210px;
        margin-left:10px;
      }

      .Hydraulic{
        width:180px;
        height:165px;
        margin-left:35px;
        margin-top:30px;
      }
    }

    .device-item:hover{
       transform:scale(1.05);
       transition: all .3s ease;
    }
  }
}
</style>