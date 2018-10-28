<template>
  <div>
    <div class="g-hd">
      <div class="g-hdName">欢迎您：chengtp 登录</div>
    </div>
    <div class="g-left">
      <div>
        <el-row class="tac">
          <el-col :span="24">
            <!--<div style="margin:14px auto;">我的导航目录</div>-->
            <el-radio-group v-model="isCollapse">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">分组一</span>
                  <el-menu-item index="1-1" @click="test(1)">选项1</el-menu-item>
                  <el-menu-item index="1-2" @click="test(2)">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <span slot="title">选项4</span>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="g-right">
      右边
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      userMessage: this.$store.state.userinfo,
      isCollapse: false
    }
  },
  methods: {
    test: function (num) {
      debugger
      if (num === 1) {
        this.$router.push({ path: '/home/test' })
      } else if (num === 2) {
        this.$router.push({ path: '/home/testt' })
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    ...mapState(['userinfo'])
  }
}

</script>

<style lang="css" scoped>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  html {
    _height: auto;
    _padding: 0;
  }

  .g-hd, .g-left, .g-right {
    position: absolute;
    left: 0;
  }

  .g-hd {
    width: 100%;
    text-align:right;
  }
    .g-hd .g-hdName {
     padding-right:50px;
    }
    .g-left, .g-right {
      top: 80px;
      bottom: 0px;
      _height: 100%;
      overflow: auto;
    }

  .g-hd {
    top: 0;
    height: 80px;
    background-color:burlywood;
  }

  .g-left {
    width: 250px;
    background-color:azure;
  }

  .g-right {
    _position: relative;
    left: 250px;
    right: 0;
    _top: 0;
    _left: 0;
    _margin-left: 250px;
    background-color: beige
  }
  /*.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
  }*/

</style>
