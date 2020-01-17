<template>
  <div>
    <Header id="header"></Header>
    <Main id="main"></Main>
  </div>
</template>
<script>
import Header from '../../common/components/Header';
import Main from './components/Main'
export default {
  name: 'index',
  components: {
    Header,
    Main
  }
}
</script>
<style lang="stylus" scoped>
  #app div:first-child:hover + #main{
      top:105px;
      transition:0.5s;
  }
</style>