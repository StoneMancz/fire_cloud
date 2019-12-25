<template>
  <div>
    <div class="leftNavigation">
        <div class="AreaBlock"></div>
        <div class="AreaBlock"></div>
        <div class="AreaBlock"></div>
        <div class="AreaBlock"></div>
        <div class="AreaBlock"></div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="stylus" scoped>
.leftNavigation {
  position: absolute;
  width: 7%;
  height: 88.6%;
  top: 9.63%;
  left: 0.5%;
  opacity: 0.8;
  z-index: 9999;
  background: #676E85;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  -webkit-background-size: 100% 100%;
  background-image: url('~@/static/img/left.png');

  .AreaBlock {
    width: 100%;
    height: 16%;
    cursor: pointer;

    #realTimeMonitoringImg {
      position: absolute;
      left: 30%;
      top: 3%;
      width: 44px;
      height: 44px;
    }

    #fireAlarmController {
      position: absolute;
      width: 51px;
      height: 50px;
      left: 27%;
      top: 66%;
    }

    #waterfireFighting {
      position: absolute;
      width: 34px;
      height: 50px;
      left: 33%;
      top: 50.08%;
    }

    #realTimeMonitoringImgText {
      position: absolute;
      top: 11%;
      left: 23%;
      width: 70px;
      height: 17px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      opacity: 0.5;
    }

    #fireMonitoringText {
      position: absolute;
      top: 28%;
      left: 23%;
      width: 70px;
      height: 17px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      opacity: 0.5;
    }

    #smartElectricityConsumption {
      position: absolute;
      left: 34%;
      top: 35%;
      width: 34px;
      height: 50px;
    }

    #fireMonitoring {
      position: absolute;
      left: 31%;
      top: 19%;
      width: 41px;
      height: 48px;
    }

    #waterfireFightingFont {
      position: absolute;
      width: 75px;
      height: 17px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      opacity: 0.5;
      left: 22%;
      top: 59.5%;
    }

    #fireAlarmControllerText {
      position: absolute;
      top: 75%;
      width: 100%;
      height: 17px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      opacity: 0.5;
    }

    #smartElectricityConsumptionText {
      position: absolute;
      width: 75px;
      height: 17px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      opacity: 0.5;
      left: 23%;
      top: 44%;
    }
  }
}
</style>
