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
              
              <el-submenu :index="item.MenuCode" v-for="(item,index) in menuList" :key="item.Id">
                <template slot="title">
                  <i :class="item.Menu_Ico"></i>
                  <span slot="title">{{item.Menu_Name}}</span>
                </template> 
                <!--<el-menu-item-group>
                  <el-menu-item index="1-1" @click="test(1)">选项1</el-menu-item>
                  <el-menu-item index="1-2" @click="test(2)">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>-->
                <el-submenu :index="itemChildren.MenuCode" v-for="(itemChildren,index) in item.children" :key="itemChildren.Id">
                  <span slot="title">{{itemChildren.Menu_Name}}</span>
                  <el-menu-item :index="itemChildrent.MenuCode" v-for="itemChildrent in itemChildren.children" @click="test(itemChildrent.Memu_Url)">
                    {{itemChildrent.Menu_Name}}
                  </el-menu-item>
                  
                </el-submenu>
              </el-submenu>

              <!--<el-menu-item index="2">
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
              </el-menu-item>-->
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
import { GetMenuModels } from '../api/api'

export default {
  name: 'home',
  data () {
    return {
      menuList: [],
      userMessage: this.$store.state.userinfo,
      isCollapse: false
    }
  },
  methods: {
    test: function (url) {
      this.$router.push({ path: url })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    getMenuList (data, pid) {
      var result = []
      var temp
      for (var i in data) {
        if (data[i].Parent_Id === pid) {
          result.push(data[i])
          temp = this.getMenuList(data, data[i].Id)
          if (temp.length > 0) {
            data[i].children = temp
          }
        }
      }
      return result
    }
  },
  computed: {
    ...mapState(['userinfo'])
  },
  created: function () {
    var params = ''
    GetMenuModels(params).then(data => {
      if (data.status === 200) {
        this.menuList = this.getMenuList(data.data, null)
      }
    })
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
