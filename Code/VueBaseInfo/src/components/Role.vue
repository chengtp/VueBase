<template>
  <div>
    test {{name}}
  </div>
</template>

<script>
import { getUserList } from '../api/api'

export default {
  name: 'Role',
  data () {
    return {
      name: '1角色管理'
    }
  },
  method: {
    test () {
      var params = null
      getUserList(params).then(data => {
        this.name = '角色管理2'
      })
    }
  },
  computed: {},
  created: function () {
    getUserList(null).then(data => {
      this.name = '角色管理3'
    })
  }
}

</script>

<style lang="css" scoped>
</style>
