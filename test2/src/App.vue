<template>
  <div id="app">
    <el-container style="height: 750px; border: 1px solid #eee; background-color:#F5F6FA">
      <el-aside width="70px" id="l_aside">
        <img id="logo" src="./assets/logo.png" alt="实在是找不到图片了">
        <div id="nav">
          <div id="tab">
            <router-link v-show="this.$store.state.isLogin" active-class="onclick" to="/edit" tag="i" class="el-icon-edit-outline icons"></router-link>
            <router-link v-show="this.$store.state.isLogin" active-class="onclick" :to="chatName" tag="i" class="el-icon-chat-square icons"></router-link>
            <router-link exact-active-class="onclick" to="/" tag="i" class="el-icon-user icons"></router-link>
          </div>
          <i  v-show="this.$store.state.isLogin" class="el-icon-setting icons"></i>
        </div>
      </el-aside>
  
      <router-view>
      </router-view>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      chatName: "/chat"
    }
  }
}
</script>

<style>
*::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.onclick{
  color: #1F86FF;
}
i{
  color: #B1B7BD;
}
#tab{
  margin: 215px 0;
}
.icons{
  cursor: pointer;
  margin: 20px 0;
  font-size: 20px;
}
#nav{
  padding: 0 25px;
}
#logo{
  width: 40px;
  margin: 15px;
}
#l_aside{
  background-color: white;
}
#header{
  font-size: 12px;
  background-color: white;
}
#main{
  margin: 2px 0;
  background-color: white;
}
#footer{
  background-color: #fff;
}
</style>
