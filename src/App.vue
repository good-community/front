<template>
  <div id="app">
     <router-view v-if="isShow"></router-view>    
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    reload () {
      this.isShow= false
      this.$nextTick(function () {
        this.isShow= true
      })
    }
  }

}
</script>


<style lang="scss">
.root{
  margin: 50px 25px 0px 25px
}
.my-flex{
  display: flex;
}
</style>
