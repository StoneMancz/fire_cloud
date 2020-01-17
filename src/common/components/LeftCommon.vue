<template>
    <renderless-component-example>
        <input type='checkbox' id='sidemenu'>
        <div class="code_area">
            <div id='wrap'>
                <label id='sideMenuControl' for='sidemenu'></label>
            </div>
            <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText" style="margin-top:20px;">
            </el-input>
            <el-tree
                class="filter-tree" 
                :data="data"
                :props="defaultProps"
                default-expand-all
                highlight-current
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
    </renderless-component-example>
</template>
<script>
import QRCode  from "qrcodejs2";
import qs from 'qs';
export default {
    data(){
      return {
        areaID:'',
        data:[],
        filterText:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods:{
        clickFn(data){
            document.getElementById('qrcode').innerHTML="";
            this.qrcode(data.areaQRCode);
            this.$parent.fatherClickFn(data);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        qrcode(text){
            let that = this;
            let qrcode = new QRCode('qrcode',{
                width:160,
                height:160,
                text:text
            })
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
        initArea(){
            let this_=this;
            this.$http.post("http://srv.shine-iot.com:8060/area/org/areas").
            then(function (response) {
                let areaData=response.data.data;  
                this_.data=this_.toTree(areaData);
            })
        }
    },
    watch:{
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    mounted(){
        this.qrcode("area-22e214823b294d57b1ffd5e557b325ad");
        this.initArea();
    }
}
</script>
<style lang="stylus" scoped>
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