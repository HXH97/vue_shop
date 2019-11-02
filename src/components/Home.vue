<template>
  <el-container class="home_container">
    <el-header>
      <div class="left">
        <img src="../assets/heima.png" alt />
        <span>黑马电商系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏菜单 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#FFC0CB">
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="subItem.id + ''"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created () {
    this.getMenuList()
  },
  data () {
    return {
      // 数据不初始化就不是响应式的
      menuList: []
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      let { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('数据获取失败')
      this.menuList = res.data
      console.log(this.menuList)
    }
  }
}
</script>
<style scoped lang="less">
.home_container {
  height: 100%;
  .el-header {
    background: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
        font-size: 20px;
        color: white;
      }
    }
  }
  .el-aside {
    background: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
