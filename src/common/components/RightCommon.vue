<template>
    <div>
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
                @row-click="handleCurrentChange"
                style="width: 100%">
                <el-table-column
                    prop="eventTypeName"
                    label="事件名称"
                    sortable='true'>
                </el-table-column>
                <el-table-column
                    prop="eventTimeStr"
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
                    @row-click="deviceListSelect"
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
import qs from 'qs';
export default {
    data(){
        return {
            areaID:'',
            drawer: false,
            drawers:false,
            total:0,
            eventotal:0,
            direction: 'rtl',
            directions:'rtl',
            tableData:[],
            deviceTableData:[],
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
        }
    },
    methods:{
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
        initEven(){
            let this_=this;
            var currentData = qs.stringify({'pageSize':6,'areaId':this_.areaID});
            this.$http.post("http://srv.shine-iot.com:8060/event/area/evts",currentData).
            then(function (response) {
                this_.tableData=response.data.data.records;
                this_.eventotal=response.data.data.total;
            })
        },
        handleCurrentChange(val) {
            this.currentRow = val;
            this.dialogTableVisible=true;
            let this_=this;
            this.$http.get(`http://srv.shine-iot.com:8060/event/detail/${val.eventId}`).
            then(function (response) {
                response=response.data.data;
                this_.$parent.location(response.deviceGpsLong,response.deviceGpsLati);
                this_.form.evenname=response.eventTypeName;
                this_.form.evenData=val.eventTimeStr;
                this_.form.evenNum=response.eventId;
                this_.form.evenLeven=response.eventLevelName;
                this_.form.deviceType=response.dcTypeName;
                this_.form.innsertNum=response.installNumber;
                this_.form.deviceNum=response.deviceSN;
                this_.form.area=response.areaName;
                this_.form.address=response.areaLocCity+response.areaLocDist+response.areaName+response.deviceAddr;
            })
        },
        handlePaginCurrentEvenChange(pageNo){
            let this_=this;
            var currentData = qs.stringify({'pageSize':6,'pageNo':pageNo,'areaId':this_.areaID});
            this.$http.post("http://srv.shine-iot.com:8060/event/area/evts",currentData).
            then(function (response) {
                this_.tableData=response.data.data.records;
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
        deviceListSelect(val){
            this.equipmentDetails=true;
            this.currentRow = val;
            let this_=this;
            this.$http.get(`http://srv.shine-iot.com:8060/device/extval/${val.deviceId}`).
            then(function (response) {
                response=response.data.data;
                console.log("sss",response);
                this_.$parent.location(response.deviceGpsLong,response.deviceGpsLati);
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
            })
        }
    },
    mounted(){
        this.initDevice();
        this.initEven();
    }
}
</script>

<style lang="stylus" scoped>
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
</style>