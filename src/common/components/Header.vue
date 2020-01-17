<template>
  <div class="header">
      <div class="header-left">
        <img src="~@/static/img/combinedShapeCopy.png"> 
        <span id="tilte">智慧消防云平台</span>
      </div>
      <div class="header-right">
        <span id="user_name">{{useName}}</span>
        <img  id="useNameIncon" src="~@/static/img/useNameIncon.png">
        <el-drawer
          title="更多操作"
          :visible.sync="drawer"
          :direction="direction"
          size="20%">
              <el-button type="primary" style="margin-left:20px;">火灾监控</el-button>
              <el-button type="primary">电气火灾</el-button>
              <el-button type="primary">消防用水</el-button>
        </el-drawer>
        <el-dialog title="事件详情" :visible.sync="dialogTableVisible" width="500px">
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
            <el-form-item label="设备编号" style="margin-bottom: 0px;">
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
      <div class="navigation">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#041B25"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">实时监控</el-menu-item>
        </el-menu>
      </div>
  </div>
</template>
  
<script>  
  export default {
      data(){
          return {
              useName: 'linchang',
              drawer: false,
              direction: 'ttb',
              activeIndex: '1',
              activeIndex2: '1',
              tableData:[],
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
              dialogTableVisible: false,
              dialogFormVisible: false,
              formLabelWidth: '120px'
          }
      },
      methods:{
        open(){},
        handleSelect(key, keyPath) {
          if(key==1){
            this.$router.push({
              path:'/home',
            })
          }else if(key==2){
            this.$router.push({
              path:'/Monitor',
            })
          }else if(key==3){
            this.$router.push({
              path:'/personnel',
            })
          }else if(key==4){
            this.$router.push({
              path:'/equipmentManage',
            })
          }
        }
      },
      props:['activeIndex123'],
      mounted(){
        this.activeIndex=this.activeIndex123;
      }
  }
</script>

<style lang="stylus" scoped>
.el-menu.el-menu--horizontal{
  border:none;
}

.header {
  width: 100%;
  height: 110px;
  background-color: #042939;
  .header-left {
    float left;
    width 350px;
    img {
      margin-top: 10px;
      width: 56px;
      height:42px;
      margin-left: 1%;
      color: rgba(255, 255, 255, 1);
      float: left;
    }

    #tilte{
      width:264px;
      height:38px;
      font-size:32px;
      font-family:Adobe Heiti Std;
      font-weight:bold;
      margin-left:17px;
      color:rgba(255,255,255,1);
    }
  }

  .header-right {
    float: right;

    span {
      margin-top: 20px;
    }

    #user_name {    
      position: relative;
      float: right;
      margin-top: 20px;
      font-size: 16px;
      font-family: Adobe Heiti Std R;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
      margin-right: 10px;
    }

    #useNameIncon{
      position: relative;
      float: right;
      margin-top: 15px;
      margin-right: 10px;
    }
  }

  .navigation{
    padding-top 60px;
  }
}
</style>