<template>
  <div>
    test {{name}}
  </div>
</template>

<script>
import { getUserList } from '../api/api'

export default {
  name: 'test',
  data () {
    return {
      name: '123'
    }
  },
  method: {
    test () {
      var params = null
      getUserList(params).then(data => {
        debugger
        this.name = 'aaaaa'
      })
    }
  },
  computed: {},
  created: function () {
    getUserList(null).then(data => {
      debugger
      this.name = '3434234'
    })
  }
}

</script>

<style lang="css" scoped>
</style>
