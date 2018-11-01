<template>
  <div>
    <div class="g-hd">
      <div class="g-hdName">
        <div>
          <ul>
            <li class="hdNameLi"><span><a href="#" title="注销登录" @click="logout">退出</a></span></li>
            <li class="hdNameLi"><span>欢迎您：</span><strong :title="userinfo.User_Name">{{userinfo.User_Name}}</strong></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="g-left">
      <div>
        <el-row class="tac">
          <el-col :span="24">
            <!--<div style="margin:14px auto;">我的导航目录</div>-->
            <el-radio-group v-model="isCollapse" style="width:100%">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true" style="float:right">收起</el-radio-button>
            </el-radio-group>
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
              <el-submenu :index="item.MenuCode" v-for="item in menuList" :key="item.Id">
                <template slot="title">
                  <i :class="item.Menu_Ico"></i>
                  <span slot="title">{{item.Menu_Name}}</span>
                </template>
                <el-menu-item-group v-if="itemChildren.isLast" :index="itemChildren.MenuCode" v-for="itemChildren in item.children" :key="itemChildren.Id">
                  <el-menu-item :index="itemChildren.MenuCode" @click="clickUrl(itemChildren.Memu_Url)">{{itemChildren.Menu_Name}}</el-menu-item>
                </el-menu-item-group>
                <el-submenu v-if="!itemChildren.isLast" :index="itemChildren.MenuCode" v-for="itemChildren in item.children" :key="itemChildren.Id">
                  <span slot="title">{{itemChildren.Menu_Name}}</span>
                  <el-menu-item :index="itemChildrent.MenuCode" v-for="itemChildrent in itemChildren.children" :key="itemChildrent.Id" @click="clickUrl(itemChildrent.Memu_Url)">
                    {{itemChildrent.Menu_Name}}
                  </el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="g-right">
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
    logout: function () {
      sessionStorage.clear()
      this.$router.push({ path: '/login' })
    },
    clickUrl: function (url) {
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

  a {
    text-decoration: none;
    list-style: none;
  }

  .g-hd .g-hdName {
    padding-right: 50px;
  }

    .g-hd .g-hdName a {
      color: white;
    }

  .g-hdName .hdNameLi {
    float: right;
    list-style: none;
    color: white;
  }

    .g-hdName .hdNameLi:first-child {
      padding-left: 16px;
    }

  .g-hdName ul, li strong {
    color: #FFCC00;
  }

  .g-hd, .g-left, .g-right {
    position: absolute;
    left: 0;
  }

  .g-left, .g-right {
    top: 60px;
    bottom: 0px;
    _height: 100%;
    overflow: auto;
  }

  .g-hd {
    width: 100%;
    text-align: right;
    top: 0;
    height: 60px;
    background-color: #005FAA;
    color: white;
  }

  .g-left {
    width: 250px;
    background-color: #B7DEF7;
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
</style>
