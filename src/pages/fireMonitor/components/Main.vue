<template>
  <div class="content">
    <LeftCommon></LeftCommon>
    <div id="mapContent">
      <div id="mapContent-header">
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('')">所有</el-button>
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('1')">点型感烟火灾探测器</el-button>
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('7')">门磁开关探测器</el-button>
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('16')">液位计</el-button>
        <el-button type="primary" style="background:#083F72"  v-on:click="deviceSwitch('17')">压力计</el-button>
      </div>
      <div id="mapContent-content">
        <div class="device-item" 
          v-for="item in deviceList" v-bind:key="item.deviceId" v-on:click="equipmentDetailsFn(item.deviceId)">
          <span style="color:white;font-size:12px;width:105px;">{{item.installNumber}}</span>
          <button class="status" v-if="item.runStatusName=='门关闭'"></button>
          <button class="status" v-if="item.runStatusName=='正常'"></button>
          <button class="alarm"  v-if="item.runStatusName=='高液位报警'"></button>
          <button class="alarm"  v-if="item.runStatusName=='设备开始自检'"></button>
          <button class="alarm"  v-if="item.runStatusName=='低压报警'"></button>
          <img src="../../../static/img/smokeDevice.jpg" style="width:100px;height:100px;
          margin-left:75px;margin-top:45px;"  v-if="item.shortTypeName=='烟感'">
          <img src="../../../static/img/Gate.jpg" style="width:100px;height:100px;
          margin-left:75px;margin-top:45px;"  v-if="item.shortTypeName=='门磁开关探测器'">
          <WaterTank v-if="item.shortTypeName=='液位计'"  v-bind:deviceId12="item.deviceId" v-bind:item="item"></WaterTank>
          <HydraulicFn v-if="item.shortTypeName=='压力计'" v-bind:deviceId13="item.deviceId" v-bind:item="item"></HydraulicFn>
          <div class="adds" v-if="item.shortTypeName=='烟感'">{{item.areaName}}-{{item.deviceAddr}}</div>
          <div class="adds" v-if="item.shortTypeName=='门磁开关探测器'">{{item.areaName}}-{{item.deviceAddr}}</div>
          <div class="adds" style="margin-top: 0px;" v-if="item.shortTypeName=='液位计'" >{{item.areaName}}-{{item.deviceAddr}}</div>
          <div class="adds" style="margin-top: 0px;" v-if="item.shortTypeName=='压力计'" >{{item.areaName}}-{{item.deviceAddr}}</div>
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
    <div>
      <audio src="../../../static/warn2.mp3"
        controls  style="display:none;" id="vd"></audio>
        <el-dialog title="警报信息" :visible.sync="dialogTableVisible" width="500px" :before-close="handleClose">
              <el-form ref="form" :model="form" label-width="100px">
                  <el-form-item label="事件名称" style="margin-bottom: 0px;">
                  <span style="margin-left:50px;">{{this.form.evenname}}</span>
                  </el-form-item>
                  <el-form-item label="发生时间" style="margin-bottom: 0px;">
                  <span style="margin-left:50px;">{{this.form.evenData}}</span>
                  </el-form-item>
                  <el-form-item label="事件编号" style="margin-bottom: 0px;">
                  <span style="margin-left:50px;">{{this.form.evenNum}}</span>
                  </el-form-item>
                  <el-form-item label="事件等级" style="margin-bottom: 0px;">
                    <span style="margin-left:50px;">{{this.form.evenLeven}}</span>
                  </el-form-item>
                  <el-form-item label="设备类型" style="margin-bottom: 0px;">
                  <span style="margin-left:50px;">{{this.form.deviceType}}</span>
                  </el-form-item>
                  <el-form-item label="设备编号" style="margin-bottom: 0px;">
                  <span style="margin-left:50px;">{{this.form.deviceNum}}</span>
                  </el-form-item>
                  <el-form-item label="所属区域" style="margin-bottom: 0px;">
                  <span style="margin-left:50px;">{{this.form.area}}</span>
                  </el-form-item>
                  <el-form-item label="详细地址" style="margin-bottom: 0px;">
                  <span style="margin-left:50px;">{{this.form.address}}</span>
                  </el-form-item>
              </el-form>
          </el-dialog> 
        </div>
    <el-dialog title="设备详情" :visible.sync="equipmentDetails"  width="450px">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="设备类型" style="margin-bottom: 0px;">
            <span style="margin-left:50px;">{{this.deviceForm.deviceType}}</span>
            </el-form-item>
            <el-form-item label="安装编号" style="margin-bottom: 0px;">
            <span style="margin-left:50px;">{{this.deviceForm.insertNum}}</span>
            </el-form-item>
            <el-form-item label="设备编号" style="margin-bottom: 0px;">
            <span style="margin-left:50px;">{{this.deviceForm.deviceSn}}</span>
            </el-form-item>
            <el-form-item label="运行状态" style="margin-bottom: 0px;">
            <span style="margin-left:50px;">{{this.deviceForm.runSatus}}</span>
            </el-form-item>
            <el-form-item label="电池电量" style="margin-bottom: 0px;">
            <span style="margin-left:50px;">{{this.deviceForm.batteryPower}}</span>
            </el-form-item>
            <el-form-item label="所属区域" style="margin-bottom: 0px;">
            <span style="margin-left:50px;">{{this.deviceForm.area}}</span>
            </el-form-item>
            <el-form-item label="详细地址" style="margin-bottom: 0px;">
            <span style="margin-left:50px;">{{this.deviceForm.adress}}</span>
            </el-form-item>
            <el-form-item label="当前值" style="margin-bottom: 0px;" v-if="this.deviceForm.deviceType=='压力计' || this.deviceForm.deviceType=='液位计'">
            <span style="margin-left:50px;">{{this.deviceForm.currentValue}}</span>
            </el-form-item>
            <el-form-item label="上限报警值" style="margin-bottom: 0px;" v-if="this.deviceForm.deviceType=='压力计' || this.deviceForm.deviceType=='液位计'">
            <span style="margin-left:50px;">{{this.deviceForm.upAlarm}}</span>
            </el-form-item>
            <el-form-item label="上限预警值" style="margin-bottom: 0px;" v-if="this.deviceForm.deviceType=='压力计' || this.deviceForm.deviceType=='液位计'">
            <span style="margin-left:50px;">{{this.deviceForm.upWarn}}</span>
            </el-form-item>
            <el-form-item label="下限预警值" style="margin-bottom: 0px;" v-if="this.deviceForm.deviceType=='压力计' || this.deviceForm.deviceType=='液位计'">
            <span style="margin-left:50px;">{{this.deviceForm.lowWarn}}</span>
            </el-form-item>
            <el-form-item label="下限报警值" style="margin-bottom: 0px;" v-if="this.deviceForm.deviceType=='压力计' || this.deviceForm.deviceType=='液位计'">
            <span style="margin-left:50px;">{{this.deviceForm.lowAlarm}}</span>
            </el-form-item>
            <!-- <div id="deviceQrcode" style="width:100%;height:180px;margin-left:20px;"></div> -->
            <div id="waterWave" style="margin-left:20px;width:400px;height:200px;margin-top:-40px;" v-if="this.deviceForm.deviceType=='压力计' || this.deviceForm.deviceType=='液位计'"></div>
        </el-form>
      </el-dialog>
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
import WaterTank from '../../../common/components/ShowWaterTankCommon';
import HydraulicFn from '../../../common/components/HydraulicFn';
const wsUrl = 'ws://srv.shine-iot.com:8060/websocket';//web_socket相关的URL;
export default {
  data() {
    return {
      areaID:'',
      deviceList:[],
      newDeviceList:[],
      eventotal:0,
      showWaterTankId:[],
      equipmentDetails:false,
      deviceForm:{
          deviceType:"",
          insertNum:"",
          deviceSn:"",
          runSatus:"",
          batteryPower:"",
          area:"",
          adress:"",
          currentValue:"",
          upAlarm:"",
          lowAlarm:"",
          upWarn:"",
          lowWarn:""
      },
      dialogTableVisible:false,
      form: {
          evenname: '',
          evenData: '',
          evenNum: '',
          evenLeven: '',
          deviceType:'',
          innsertNum:'',
          deviceNum:'',
          area: '',
          address:''
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  components:{
    LeftCommon,
    RightCommon,
    WaterTank,
    HydraulicFn
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    addShowWaterTankId(id){
      this.showWaterTankId.push(id);
    },
    location(areaLong,areaLat){
      console.log(areaLong);
    },
    initDevceList(){
      let this_=this;
      var currentData = qs.stringify({'areaId':this_.areaID,'pageSize':10});
      this.$http.post("http://srv.shine-iot.com:8060/device/area/devs",currentData).
      then(function (response) {
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
    },
    deviceSwitch(data){
      let this_=this;
      var currentData = qs.stringify({'areaId':this_.areaID,'pageSize':10,'devType':data});
      this.$http.post("http://srv.shine-iot.com:8060/device/area/devs",currentData).
      then(function (response) {
          let deviceTableData=response.data.data.records;
          this_.eventotal=response.data.data.total;
          this_.deviceList=deviceTableData;
      })
    },
    equipmentDetailsFn(deviceId){
      this.equipmentDetails=true;
      let this_=this;
      this.$http.get(`http://srv.shine-iot.com:8060/device/extval/${deviceId}`).
      then(function (response) {
          response=response.data.data;
          this_.deviceForm.deviceType=response.dcTypeName
          this_.deviceForm.insertNum=response.installNumber;
          this_.deviceForm.deviceSn=response.deviceSN;
          this_.deviceForm.runSatus=response.runStatusName;
          this_.deviceForm.batteryPower=response.batteryLevel+response.batteryLevelUnitName;
          this_.deviceForm.area=response.areaName;
          this_.deviceForm.adress=response.deviceAddr;
          this_.deviceForm.currentValue=response.mainSensor+response.mainSensorUnitName;
          this_.deviceForm.upAlarm=response.upAlarm+response.mainSensorUnitName;
          this_.deviceForm.lowAlarm=response.lowAlarm+response.mainSensorUnitName;
          this_.deviceForm.upWarn=response.upWarn+response.mainSensorUnitName;
          this_.deviceForm.lowWarn=response.lowWarn+response.mainSensorUnitName;
          this_.equipmentTrend(deviceId);
      })
    },
    equipmentTrend(deviceId){
      let this_=this;
      var data = qs.stringify({'id':deviceId});
      let dataTime=[];
      let dataCount=[];
      this.$http.post("http://srv.shine-iot.com:8060/dev/msg/press/chart",data).
      then(function (response) {
        response.data.data.forEach(element => {
            dataTime.push(this_.formatDate(element[0]));
            dataCount.push(element[1]);
        });
         var myChart = this_.$echarts.init(document.getElementById("waterWave"));
         myChart.setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:dataTime,
                axisLine:{
                  lineStyle:{
                    color:'#041B25',
                    width:2,//这里是为了突出显示加上的
                  }
                }},
            yAxis:{
              type: 'value',
              axisLine:{
                lineStyle:{
                  color:'#041B25',
                  width:2,//这里是为了突出显示加上的
                }
              }},
            series: [{
              data:dataCount,
              type: 'line',
              smooth: true,
              areaStyle: {
                  normal: {
                      color:"#115F6C"
                  }
              }
            }]});
      })
     
    },
    formatDate(timestamp) { 
      var date = new Date(parseInt(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	    var D = date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
	    var s = date.getSeconds();
	    return Y + M + D + h + m + s;
    },
    estabConnectWithWS(wsUrl) {
        const ws = new WebSocket(wsUrl);
        ws.onopen = function (e) {
          console.log('连接上 ws 服务端了');
          ws.send(JSON.stringify({ flag: wsUrl, data: "Hello WebSocket!" }));
        }
        
        ws.onmessage = (msg)=> { 
            var music = document.getElementById("vd");//获取ID  
            if(typeof JSON.parse(msg.data) == "object"){
              let msgobj=JSON.parse(msg.data);
              if(msgobj.eventLevel=="0"){
                this.open1(msgobj.areaName,msgobj.deviceAddr,msgobj.deviceSN,msgobj.deviceTypeName,msgobj.eventTypeName);
              }else{
                music.play();
                this.dialogTableVisible=true;
                this.form.evenname=msgobj.eventTypeName;
                this.form.evenData=this.formatDate(msgobj.eventTime);
                this.form.evenNum=msgobj.eventId;
                this.form.deviceType=msgobj.deviceTypeName;
                this.form.deviceNum=msgobj.deviceSN;
                this.form.area=msgobj.areaName;
                this.form.evenLeven=msgobj.eventLevelName;
                this.form.address=msgobj.deviceAddr;
              }
              this.$refs.child.initDevice();
              this.$refs.child.initEven();
            }
        };

        ws.onclose = function (e) {
            console.log('ws 连接关闭了');
        }
    },
    handleClose(done){
      var audio = document.getElementById('vd');
      audio.pause();
      done();
    }
  },
  updated(){
    console.log(this.showWaterTankId);
  },
  computed: {
    ...mapGetters({
      api: 'api'
    })
  },
  mounted(){
    this.initDevceList();
    this.estabConnectWithWS(wsUrl);
    this.$parent.activeIndex2="2";
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
      .status{
        width:25px;
        height:25px;
        border-radius:100%;
        background:green;
        float right;
      }
      .alarm{
        width:25px;
        height:25px;
        border-radius:100%;
        background:red;
        float right;
      }
    }
    .device-item:hover{
       transform:scale(1.05);
       transition: all .3s ease;
    }
  }
}
</style>