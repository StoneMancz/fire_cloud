<template>
  <div>
    <Header></Header>
    <Aside></Aside>
    <Main></Main>
  </div>
</template>
<script>
import Header from '../../common/components/Header';
import Aside from '../../common/components/Aside';
import Main from './components/Main';
export default {
  name: 'index',
  components: {
    Header,
    Aside,
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
</style>