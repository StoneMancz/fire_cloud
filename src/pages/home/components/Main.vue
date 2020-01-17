<template>
  <div class="content">
    <LeftCommon></LeftCommon>  
    <div id="mapContent"></div>
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
  </div>
</template>
<script>
import warn2  from '../../../static/warn2.mp3'
import {mapState,mapGetters} from 'vuex';
import $ from 'jquery';
import MapLoader from '@/assets/js/AMap.js';
import QRCode  from "qrcodejs2";
import LeftCommon from '../../../common/components/LeftCommon';
import RightCommon from '../../../common/components/RightCommon';
const wsUrl = 'ws://srv.shine-iot.com:8060/websocket';//web_socket相关的URL;
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
      }
    }
  },
  components:{
    LeftCommon,
    RightCommon
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
    handleClose(done){
      var audio = document.getElementById('vd');
      audio.pause();
      done();
    },
    open1(area,addr,deviceNum,deviceType,evenType) {
        this.$notify({
          title: '通知',
          message:`位于 ${area}-${addr}，编号为 ${deviceNum} 的${deviceType}，发生 ${evenType}！`,
          type: 'warning',
          duration: 0
        });
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
              console.log("msgobj",msgobj);
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
    equipmentQrcode(text){
        let that = this;
        let qrcode1 = new QRCode('deviceQrcode',{
            width:170,
            height:170,
            text:text
        })
    },
    formatDate(timestamp){ 
      var date = new Date(parseInt(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	    var D = date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m ="";
      var s = date.getSeconds();
      if(date.getMinutes()<10){
          m="0"+date.getMinutes()+":";
      }else{
         m=date.getMinutes() + ':'
      }

      if(s<10){
        s='0'+s;
      }
	    return Y + M + D + h + m + s;
    },
    fatherClickFn(data){
        this.areaID=data.id;
        this.$refs.child.areaID=data.id;
        this.$refs.child.initDevice();
        this.$refs.child.initEven();
        this.location(data.areaLong,data.areaLat);
    },
    location(areaLong,areaLat){
        this.map.setZoomAndCenter(15,[areaLong,areaLat]);
    }
  },
  mounted() {
    this.estabConnectWithWS(wsUrl);
    let that = this;
    MapLoader().then(
      AMap => {
        this.map = new AMap.Map('mapContent',{
          center: [121.203894,31.083081],
          zoom: 12,
          mapStyle:'amap://styles/c6256c6eb832024319be6c13fd549b52'
        })
        this.$http.post("http://srv.shine-iot.com:8060/device/area/devgps").then(data => { 
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
    console.log("执行----");
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
</style>