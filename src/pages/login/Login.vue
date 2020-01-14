<template>
  <div>
    <div class="content">
      <img src="../../static/img/bg.png" class="bgImg">
      <div class="loginFrom">
        <img src="../../static/img/logo.png">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit" @click="submitForm()">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        pass: [{required: true,validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async submitForm() {
      var data = qs.stringify({'username':this.ruleForm.name,'password':this.ruleForm.pass});
      this.$http.post("http://192.168.2.103:8060/login",data).
      then(function (response) {
        console.log(response);

      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.content {
  width: 100%;
  height: 100%;
  min-height: 500px;
  margin: 0px auto;

  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .loginFrom {
    position: fixed;
    left: 18em;
    top: 5em;
    width: 60em;
    height: 37em;
    background: rgba(255, 255, 255, 0.8);

    img {
      position: relative;
      width: 230px;
      height: 121px;
      margin-left: 23em;
      margin-top: 4em;
    }

    .ruleForm {
      width: 20em;
      margin-left: 20em;
      margin-top: 2em;

      .submit {
        width: 150px;
        margin-left: 5em;
      }
    }
  }
}
</style>