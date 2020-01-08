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
      <div style="width: 100%;margin-left:10px;margin-top:300px;" id="qrcode"></div>
    </div>
    <div id="mapContent"></div>
    <div id="rightWrap">
        //报警事件列表
        <label id="event"  @click="drawer = true"></label>
        //设备列表
        <label id="deviceList" @click="drawers = true"></label>
    </div>
    <el-drawer
      title="事件列表"
      :visible.sync="drawer"
      :direction="direction"
      size="45%">
        <el-table
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            prop="number"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="deviceName"
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="eventTyle"
            label="事件类型"
            sortable='true'>
          </el-table-column>
          <el-table-column
            prop="date"
            sortable
            label="时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="180">
          </el-table-column>
        </el-table>
    </el-drawer>
    <el-drawer
      title="设备列表"
      :visible.sync="drawers"
      :direction="directions"
      size="45%">
      <el-table
        :data="deviceTableData"
        highlight-current-row
      @current-change="deviceListSelect"
        style="width: 100%">
        <el-table-column
          prop="deviceNumber"
          label="设备编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="currentStatus"
          sortable
          label="当前状态">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="180">
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-button type="button" @click="dialogTableVisible = true">报警提示</el-button>
    <el-dialog title="报警详情" :visible.sync="dialogTableVisible" width="500px">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="事件名称" style="margin-bottom: 0px;">
          <span style="margin-left:50px;">设备结束自检</span>
        </el-form-item>
        <el-form-item label="发生时间" style="margin-bottom: 0px;">
          <span style="margin-left:50px;">2019-12-24 10:39:00</span>
        </el-form-item>
        <el-form-item label="事件编号" style="margin-bottom: 0px;">
          <span style="margin-left:50px;">419</span>
        </el-form-item>
        <el-form-item label="事件等级" style="margin-bottom: 0px;">
          <span style="margin-left:50px;">一般</span>
        </el-form-item>
        <el-form-item label="设备类型" style="margin-bottom: 0px;">
          <span style="margin-left:50px;">点型感烟火灾探测器</span>
        </el-form-item>
        <el-form-item label="安装编号" style="margin-bottom: 0px;">
          <span style="margin-left:50px;">8694050300464338</span>
        </el-form-item>
        <el-form-item label="所属区域" style="margin-bottom: 0px;">
          <span style="margin-left:50px;">测试区域-2</span>
        </el-form-item>
        <el-form-item label="详细地址" style="margin-bottom: 0px;">
          <span style="margin-left:50px;">时亦大厦#9值班室</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex';
import $ from 'jquery';
import MapLoader from '@/assets/js/AMap.js';
import QRCode  from "qrcodejs2"
export default {
  data() {
    return {
      cluster:[],
      map:'',
      markers: [],
      dialogTableVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      link: 'https://baidu.com',
      filterText: '',
        data: [{
          id: 1,
          label: '松江林场',
          children: [{
            id: 4,
            label: '东佘山'
          },{
            id: 5,
            label: '西佘山'
          },{
            id: 6,
            label: '小昆山'
          },{
            id: 7,
            label: '天马山'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        drawer: false,
        drawers:false,
        direction: 'rtl',
        directions:'rtl',
        tableData:[{
            number: '865820030763135',
            deviceName: '液压计',
            address: '西佘山-山顶消防水库',
            eventTyle:'正常',
            date:'2019-12-27 12:00:00'
          }, {
            number: '865820030763135',
            deviceName: '液压计',
            address: '东佘山-山顶消防水库',
            eventTyle:'低压报警',
            date:'2019-12-28 12:00:00'
          }, {
            number: '865820030763135',
            deviceName: '液压计',
            address: '小昆山-山顶消防水库',
            eventTyle:'高压预警',
            date:'2019-12-29 12:00:00'
          }, {
            number: '865820030763135',
            deviceName: '液压计',
            address: '天马山-山顶消防水库',
            eventTyle:'报警',
            date:'2019-12-30 12:00:00'
          }],
        deviceTableData:[{
        deviceNumber: '865820030763135',
        deviceName: '液压计',
        currentStatus: '正常',
        address:'西佘山-山顶消防水库'
      }, {
        deviceNumber: '865820030763135',
        deviceName: '液压计',
        currentStatus: '正常',
        address:'东佘山-山顶消防水库'
      }, {
        deviceNumber: '865820030763135',
        deviceName: '液压计',
        currentStatus: '正常',
        address:'小昆山-山顶消防水库'
      }, {
        deviceNumber: '865820030763135',
        deviceName: '液压计',
        currentStatus: '正常',
        address:'天马山-山顶消防水库'
      }]
    }
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
          }
        ]
        cluster = new AMap.MarkerClusterer(this.map, this.markers, {
          styles: sts,
          gridSize: 2
        })
      } else {
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    clickFn(data){
      document.getElementById('qrcode').innerHTML="";
      this.qrcode(data.label);
      if(data.id==4){
        this.map.setZoomAndCenter(30,[121.1960382200,31.0941724300]);		
      }else if(data.id==5){
        this.map.setZoomAndCenter(30,[121.1907584800,31.0944413200]);
      }else if(data.id==6){
        this.map.setZoomAndCenter(30,[121.1324798600,31.0293597400]);
      }else if(data.id==7){
        this.map.setZoomAndCenter(30,[121.1528971300,31.0758027600]);
      }
     			
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.dialogTableVisible=true;
      if(val.address=="西佘山-山顶消防水库"){
         this.map.setZoomAndCenter(30,[121.1907584800,31.0944413200]);
      }else if(val.address=="东佘山-山顶消防水库"){
         this.map.setZoomAndCenter(30,[121.1960382200,31.0941724300]);	
      }else if(val.address=="小昆山-山顶消防水库"){
         this.map.setZoomAndCenter(30,[121.1324798600,31.0293597400]);
      }else if(val.address=="天马山-山顶消防水库"){
         this.map.setZoomAndCenter(30,[121.1528971300,31.0758027600]);
      }
    },
    deviceListSelect(val){
      this.currentRow = val;
      if(val.address=="西佘山-山顶消防水库"){
         this.map.setZoomAndCenter(30,[121.1907584800,31.0944413200]);
      }else if(val.address=="东佘山-山顶消防水库"){
         this.map.setZoomAndCenter(30,[121.1960382200,31.0941724300]);	
      }else if(val.address=="小昆山-山顶消防水库"){
         this.map.setZoomAndCenter(30,[121.1324798600,31.0293597400]);
      }else if(val.address=="天马山-山顶消防水库"){
         this.map.setZoomAndCenter(30,[121.1528971300,31.0758027600]);
      }
    },
    qrcode(text){
        let that = this;
        let qrcode = new QRCode('qrcode',{
            width:170,
            height:170,
            text:text
        })
    }
  },
  mounted() {
    this.qrcode("aaaa");
    let that = this;
    MapLoader().then(
      AMap => {
        this.map = new AMap.Map('mapContent', {
          center: [121.49917, 31.276063],
          zoom: 9,
          mapStyle:'amap://styles/c6256c6eb832024319be6c13fd549b52'
        })
        const api = this.api + '/qeuryOrgAddressInfo';
        var geocoder = new AMap.Geocoder();
        const MapData = this.$http.get(api).then(data => {
          data.data.rsData.forEach((obj, index) => {
            geocoder.getLocation(obj.orgCityName + obj.address, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                //result为对应的地理位置详细信息
                const lnglat = []
                lnglat.push('' + result.geocodes[0].location.lng + '')
                lnglat.push('' + result.geocodes[0].location.lat + '')
                that.markers.push(
                  new AMap.Marker({
                    position: lnglat,
                    offset: new AMap.Pixel(-15, -15)
                  })
                )
              }
              if (index == data.data.rsData.length - 1) {
                that.addCluster(1)
              }
            })
          })
        })
      },
      e => {
        console.log('地图加载失败', e)
      }
    )
  },
  computed: {
    ...mapGetters({
      api: 'api'
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