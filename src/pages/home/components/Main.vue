<template>
  <div class="content">
    <input type='checkbox' id='sidemenu'>
    <div class="code_area">
      <div id='wrap'>
          <label id='sideMenuControl' for='sidemenu'></label>
      </div>
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree" 
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="clickFn">
      </el-tree>
      <div style="position: fixed;bottom: 0;">
        <div>
          <span style="color:white;font-size:14px;margin-top:10px;">关注微信公众号"智慧消防服务"</span>
        </div>
        <div style="width: 100%;margin-top:15px;" align="center" id="qrcode"></div>
        <div style="margin-top:10px;">
          <span style="color:white;font-size:14px;margin-top:10px;margin-left: 20px;">
            扫描二维码关注此区域
          </span>
        </div>
      </div>
    </div>   
    <div id="mapContent"></div>
    <div id="rightWrap">
        //报警事件列表
        <label id="event"  @click="drawer = true"></label>
        //设备列表
        <label id="deviceList" @click="drawers = true"></label>
    </div>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false"
      size="45%">
        <div style="font-size:16px;font-size:16px;font-weight:600;margin-top:10px;
        margin-left:10px;color:#72767B">事件列表</div>
        <el-table
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            prop="eventTypeName"
            label="事件名称"
            sortable='true'>
          </el-table-column>
          <el-table-column
            prop="eventTime"
            sortable
            label="发生时间">
          </el-table-column>
          <el-table-column
            prop="installNumber"
            label="安装编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="shortTypeName"
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="areaName"
            label="所属区域">
          </el-table-column>
          <el-table-column
            prop="deviceAddr"
            label="详细地址">
          </el-table-column>
        </el-table>
        <el-pagination
          background
          style="float:right;margin-top:10px;"
          layout="prev, pager, next"
          :total="eventotal"
          @current-change="handlePaginCurrentEvenChange">
        </el-pagination>
    </el-drawer>

    <el-drawer
       title="设备列表"
      :visible.sync="drawers"
      :direction="directions"
      :with-header="false"
      size="45%">
      <div style="font-size:16px;font-size:16px;font-weight:600;margin-top:10px;
        margin-left:10px;color:#72767B">设备列表</div>
      <el-table
        :data="deviceTableData"
        highlight-current-row
        @current-change="deviceListSelect"
        style="width: 100%">
        <el-table-column
          prop="installNumber"
          label="安装编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shortTypeName"
          label="设备名称"
          sortable>
        </el-table-column>
        <el-table-column
          prop="runStatusName"
          sortable
          label="当前状态">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属区域">
        </el-table-column>
        <el-table-column
          prop="deviceAddr"
          label="详细地址"
          width="160">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="float:right;margin-top:10px;"
        layout="prev, pager, next"
        @current-change="handlePaginCurrentChange" 
        :total="total">
      </el-pagination>
    </el-drawer>

    <el-button type="button" @click="dialogTableVisible=true">事件</el-button>
    <el-dialog title="事件详情" :visible.sync="dialogTableVisible" width="500px">
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
        <el-form-item label="安装编号" style="margin-bottom: 0px;">
          <span style="margin-left:50px;">{{this.form.innsertNum}}</span>
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
        <!-- <div id="deviceQrcode" style="width:100%;height:180px;margin-left:20px;"></div>
        <div id="waterWave" style="margin-left:20px;width:400px;height:200px;margin-top:-40px;"></div> -->
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex';
import $ from 'jquery';
import MapLoader from '@/assets/js/AMap.js';
import QRCode  from "qrcodejs2";
import qs from 'qs';
export default {
  data() {
    return {
      cluster:[],
      map:'',
      areaID:'',
      markers: [],
      dialogTableVisible: false,
      equipmentDetails:false,
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
      },
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
      filterText:'',
      data:[],
      total:0,
      eventotal:0,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      drawer: false,
      drawers:false,
      direction: 'rtl',
      directions:'rtl',
      tableData:[],
      deviceTableData:[]
    }
  },
  components:{
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    addCluster(tag) {
      var cluster = this.cluster
      if (tag == 2) {
        //完全自定义
        cluster = new AMap.MarkerClusterer(map, markers, {
          gridSize: 80,
          renderClusterMarker: _renderClusterMarker
        })
      } else if (tag == 1) {
        //自定义图标
        var sts = [
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
            size: new AMap.Size(36, 36),
            offset: new AMap.Pixel(-18, -18)
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
          }];
          let this_=this;
          this.map.plugin(["AMap.MarkerClusterer"],function() {
          cluster = new AMap.MarkerClusterer(this_.map,this_.markers,
              {styles:sts}
          )})
      } else {
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    clickFn(data){
      this.areaID=data.id;
      document.getElementById('qrcode').innerHTML="";
      this.qrcode(data.areaQRCode);
      this.initEven();
      this.initDevice();
      this.map.setZoomAndCenter(15,[data.areaLong,data.areaLat]);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.dialogTableVisible=true;
      let this_=this;
      this.$http.get(`http://srv.shine-iot.com:8060/event/detail/${val.eventId}`).
      then(function (response) {
        response=response.data.data;
        this_.form.evenname=response.eventDealStatusName;
        this_.form.evenData=response.eventTime;
        this_.form.evenNum=response.eventId;
        this_.form.evenLeven=response.eventLevelName;
        this_.form.deviceType=response.dcTypeName;
        this_.form.innsertNum=response.installNumber;
        this_.form.deviceNum=response.deviceSN;
        this_.form.area=response.areaName;
        this_.form.address=response.areaLocCity+response.areaLocDist+response.areaName+response.deviceAddr;
      })
    },
    deviceListSelect(val){
      this.equipmentDetails=true;
      this.currentRow = val;
      let this_=this;
      this.$http.get(`http://srv.shine-iot.com:8060/device/extval/${val.deviceId}`).
      then(function (response) {
        console.log(response);
        response=response.data.data;
        this_.deviceForm.deviceType=response.dcTypeName
        this_.deviceForm.insertNum=response.installNumber;
        this_.deviceForm.deviceSn=response.deviceSN;
        this_.deviceForm.runSatus=response.runStatusName;
        this_.deviceForm.batteryPower=response.batteryLevel+response.mainSensorUnitName;
        this_.deviceForm.area=response.areaName;
        this_.deviceForm.adress=response.deviceAddr;
        this_.deviceForm.currentValue=response.mainSensor;
        this_.deviceForm.upAlarm=response.upAlarm;
        this_.deviceForm.lowAlarm=response.lowAlarm;
        this_.deviceForm.upWarn=response.upWarn;
        this_.deviceForm.lowWarn=response.lowWarn;
      })
    },
    qrcode(text){
        let that = this;
        let qrcode = new QRCode('qrcode',{
            width:160,
            height:160,
            text:text
        })
    },
    equipmentQrcode(text){
        let that = this;
        let qrcode1 = new QRCode('deviceQrcode',{
            width:170,
            height:170,
            text:text
        })
    },
    equipmentTrend(){
      var myChart = this.$echarts.init(document.getElementById("waterWave"));
      myChart.setOption({
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["2019-12-31 17:13:0", "2019-12-31 17:43:0", "2019-12-31 18:13:0", "2019-12-31 18:45:0", "2019-12-31 19:14:0", "2019-12-31 19:44:0", "2019-12-31 20:15:0", "2019-12-31 20:45:0", "2020-01-2 10:56:0", "2020-01-2 11:28:0", "2020-01-2 11:57:0", "2020-01-2 12:27:0", "2020-01-2 12:59:0", "2020-01-2 13:28:0", "2020-01-2 14:0:0", "2020-01-2 14:29:0", "2020-01-2 15:0:0", "2020-01-2 15:30:0", "2020-01-2 16:0:0", "2020-01-2 16:30:0", "2020-01-2 17:0:0", "2020-01-2 17:32:0"],
            axisLine:{
              lineStyle:{
                color:'#CCCCCC',
                width:2,//这里是为了突出显示加上的
              }
            }},
        yAxis:{
          type: 'value',
          axisLine:{
            lineStyle:{
              color:'#CCCCCC',
              width:2,//这里是为了突出显示加上的
            }
          }},
        series: [{
	        data: ["2.4574", "2.4566", "2.4558", "2.4552", "2.4546", "2.4539", "2.4533", "2.4525", "2.4017", "2.4011", "2.4003", "2.3998", "2.3992", "2.3984", "2.3978", "2.3970", "2.3964", "2.3957", "2.3951", "2.3943", "2.3935", "2.3931"],
	        type: 'line',
			    smooth: true,
	        areaStyle: {
	            normal: {
	                color:"#115F6C"
	            }
          }
        }]});
    },
    initData(){
      //初始化区域
      this.initArea();
      //初始化设备列表
      this.initDevice();
      //初始化事件
      this.initEven();
    },
    toTree(data) {
      let result = [];
      if(!Array.isArray(data)) {
          return result
      }
      data.forEach(item => {
          delete item.children;
      });
      let map = {};
      data.forEach(item => {
          map[item.id] = item;
      });
      data.forEach(item => {
          let parent = map[item.parentAreaID];
          if(parent) {
              (parent.children || (parent.children = [])).push(item);
          } else {
              result.push(item);
          }
      });
      return result;
    },
    initEven(){
      let this_=this;
      var currentData = qs.stringify({'pageSize':6,'areaId':this_.areaID});
      this.$http.post("http://srv.shine-iot.com:8060/event/area/evts",currentData).
      then(function (response) {
        console.log("事件",response);
        this_.tableData=response.data.data.records;
        this_.eventotal=response.data.data.total;
      })
    },
    initArea(){
      let this_=this;
      this.$http.post("http://srv.shine-iot.com:8060/area/org/areas").
      then(function (response) {
        let areaData=response.data.data;  
        this_.data=this_.toTree(areaData);
      })
    },
    initDevice(){
      let this_=this;
      var currentData = qs.stringify({'areaId':this_.areaID});
      this.$http.post("http://srv.shine-iot.com:8060/device/area/devs",currentData).
      then(function (response) {
        let deviceTableData=response.data.data.records;
        this_.deviceTableData=deviceTableData;
        this_.total=response.data.data.total;
      })
    },
    handlePaginCurrentChange(data){
      let this_=this;
      var currentData = qs.stringify({'pageNo':data,'areaId':this_.areaID});
      this.$http.post("http://srv.shine-iot.com:8060/device/area/devs",currentData).
      then(function(response){
        this_.deviceTableData=response.data.data.records;
      })
    },
    handlePaginCurrentEvenChange(pageNo){
      let this_=this;
      var currentData = qs.stringify({'pageSize':6,'pageNo':pageNo,'areaId':this_.areaID});
      this.$http.post("http://srv.shine-iot.com:8060/event/area/evts",currentData).
      then(function (response) {
        this_.tableData=response.data.data.records;
      })
    }
  },
  mounted() {
    this.qrcode("aaaa");
    let that = this;
    MapLoader().then(
      AMap => {
        this.map = new AMap.Map('mapContent',{
          center: [121.203894,31.083081],
          zoom: 12,
          mapStyle:'amap://styles/c6256c6eb832024319be6c13fd549b52'
        })
        this.$http.post("http://srv.shine-iot.com:8060/device/area/devgps").then(data => { 
          console.log(data);
          data.data.data.forEach((obj, index) => {
              const lnglat = [obj.deviceGpsLong,obj.deviceGpsLati];
              that.markers.push(
                new AMap.Marker({
                  position: lnglat,
                  offset: new AMap.Pixel(-15, -15)
                })
              )
              that.addCluster(1);
          });
        })
      },
      e => {
        console.log('地图加载失败', e)
      }
    );
    this.initData();
  },
  computed: {
    ...mapGetters({
      api: 'api',
      token:'token'
    })
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
    background: rgba(9, 25, 58, 1);
  }

  .code_area{
    position: relative;
    top:2%;
    width: 200px;
    float: left;
    height:98%;
    z-index: 999;
    background-color:#042939;
    box-shadow: 3px 0px 6px #1E2538;
  }

  #rightWrap{
    width 14px;
    float right
    #event{
      background: url('~@/static/img/result.png') no-repeat 0 -142px;;
      width: 14px;
      height: 90px;
      position: absolute;
      z-index: 2;
      top: 50%;
      margin-top: -45px;
    }

    #deviceList{
      background: url('~@/static/img/result.png') no-repeat 0 -142px;;
      width: 14px;
      height: 90px;
      position: absolute;
      z-index: 2;
      top: 50%;
      margin-top: 80px;
    }
  }

  .el-tree {
      background:#042939;
      color: #A7B1C2;
  }

  #sidemenu{
      display: none;
  }

  #sidemenu:checked + .code_area{
      width:0px;
      left :-200px;
      #sideMenuControl{
          background: url('~@/static/img/result.png') no-repeat 0 -242px;
      }
  }

  #wrap {
      margin-left:200px;
      transition: 0.2s ease-out;
      #sideMenuControl{
          background: url('~@/static/img/result.png') no-repeat 0 -142px;
          width: 14px;
          height: 90px;
          position: absolute;
          z-index: 9999;
          top: 50%;
          margin-top: -45px;
      }
  }
</style>