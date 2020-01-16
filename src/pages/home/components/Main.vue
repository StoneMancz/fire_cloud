<template>
  <div class="content">
    <LeftCommon></LeftCommon>  
    <div id="mapContent"></div>
    <RightCommon ref="child"></RightCommon>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex';
import $ from 'jquery';
import MapLoader from '@/assets/js/AMap.js';
import QRCode  from "qrcodejs2";
import LeftCommon from '../../../common/components/LeftCommon';
import RightCommon from '../../../common/components/RightCommon';
export default {
  data() {
    return {
      cluster:[],
      map:'',
      areaID:'',
      markers: [],
      equipmentDetails:false
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
    equipmentQrcode(text){
        let that = this;
        let qrcode1 = new QRCode('deviceQrcode',{
            width:170,
            height:170,
            text:text
        })
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