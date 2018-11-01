<template>
  <div>
    用户 {{name}}
  </div>
</template>

<script>
import { getUserList } from '../api/api'

export default {
  name: 'test',
  data () {
    return {
      name: 'test'
    }
  },
  method: {
    test () {
      var params = null
      getUserList(params).then(data => {
        this.name = 'test1111'
      })
    }
  },
  computed: {},
  created: function () {
    getUserList(null).then(data => {
      this.name = 'test11'
    })
  }
}

</script>

<style lang="css" scoped>
</style>
