<template>
  <div>
    <Header id="header"></Header>
    <Main id="main"></Main>
  </div>
</template>
<script>
import Header from '../../common/components/Header';
import Main from './components/Main';
export default {
  name: 'index',
  components: {
    Header,
    Main
  }
}
</script>
<style lang="stylus" scoped>
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    overflow: hidden;
}

  #app div:first-child:hover + #main{
      top:110px;
      transition:1s;
  }
</style>