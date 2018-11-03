<template>
  <div>
    <el-container>
   content
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Main',
  data () {
    return {
    }
  },
  methods: {
    test () {
      return ''
    }
  },
  computed: {
  }
}

</script>

<style lang="css" scoped>
  * {
    margin: 0;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 80%;
    height: 80%;
  }

  body > .el-container {
    margin-bottom: 0;
  }
</style>
