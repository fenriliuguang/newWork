<template>
    <el-container id="chat">
        <el-container>
        <el-header class="pad" height="70px" id="header">
          <div id="c-avatar">
            <div style="width:40px;height:40px;float:left">
              <el-avatar :size="40" :src="'http://118.126.104.223'+this.$store.state.roomIn.face"></el-avatar>
            </div>
            <div id="int">
              <div style="margin:2px 0;font-size:13px">{{this.$store.state.roomIn.name}}</div>
              <div style="color:#BEC2C8;">{{this.$store.state.roomIn.info}}</div>
            </div>
            <div id="c-icons">
              <em @click="search_show" class="el-icon-search" :class="{ onc : search, c_ic : !search}"></em>
              <em @click="share_show" class="el-icon-user c_ic"></em>
              <el-dropdown @command="handleCommand" trigger="click">
                <em class="el-dropdown-link el-icon-more c_ic"></em>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="open">
                    Mute
                    <em class="el-icon-s-operation ctp"></em></el-dropdown-item>
                  <el-dropdown-item command="delete">
                    Delete
                    <em class="el-icon-delete ctc"></em>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          
        </el-header>
        <el-header v-show="search" class="pad" height="70px" id="search">
          <div style="margin:15px 0;">
            <el-input v-model="input" placeholder="Search this chat" class="c-i"></el-input>
          </div>
        </el-header>
        <el-main class="pad" id="main">
          <div id="m-m-c">
            <div id="loading">
              <div id="l-m">
                <em class="el-icon-loading"></em>加载中
              </div>
            </div>
            <div id="main-chat">
              <div class="zs" style="overflow:hidden" v-for="(site,index) in messages"
                :key="index">
                <el-avatar :class="{'me':site.isMe,'him':!site.isMe}" :src="'http://118.126.104.223/static/upload/'+ site.face +'.jpg'"></el-avatar>
                <div :class="{'myChat':site.isMe,'hisChat':!site.isMe}">{{site.message}}</div>
              </div>
            </div>
          </div>
        </el-main>
        <el-footer class="pad" height="70px" id="footer">
          <div id="f-i">
            <el-input
              placeholder="Type your message..."
              v-model="message"></el-input>
          </div>
          <div id="f-p">
            <img id="f-img" src="../assets/biaoqing.png">
            <em @click="send" class="el-icon-s-promotion f-icon"></em>
          </div>
        </el-footer>
      </el-container>
      <el-aside 
        v-if="aside"
        width="300px"
        class="information">
        <div class="aside-h">
          <em @click="closeE" class="el-icon-arrow-left iiii"></em>
        </div>
        <div id="aside-a">
          <div id="aside-a-a">
            <el-avatar id="avaI" :size="70" :src="'http://118.126.104.223'+this.$store.state.roomIn.face"></el-avatar>
          </div>
          <div id="g-name">{{this.$store.state.roomIn.name}}</div>
          <div id="g-intro">{{this.$store.state.roomIn.info}}</div>
        </div>
        <div id="c-up">
                <div class="c-kk">Photo</div>
                <el-upload
                    class="c-up"
                    :action="'http://118.126.104.223' + ':81/admin/upload_room'"
                    drag
                    :limit="1"
                    :data="data"
                    ref="cUpload"
                    :auto-upload="false">
                    <div class="c-upload">
                                    <i 
                                    class="pppc el-icon-picture-outline"></i>
                                    <div class="tx">You can upload jpg,gif or png files.</div>
                                    <div class="tx">Max file size 3mb</div>
                                </div>
                </el-upload>
                <div class="c-kk">Name</div>
                <el-input  class="i" v-model="NameP" placeholder="Group Name"></el-input>
                <div class="c-kk">Topic (optional)</div>
                <el-input  class="i" v-model="toP" placeholder="Group Topic"></el-input>
                <div class="c-kk">Description</div>
                <el-input  class="i" v-model="deP" placeholder="Group Description"></el-input>
                <div  style="margin:10px 70px;">
                    <el-button @click="c_put" type="primary"><div style="margin:0 40px;font-size:13px">Change</div></el-button>
                </div>
            </div>
      </el-aside>
      <el-aside
        v-if="asideS"
        class="information"
        width="360px">
        <div class="aside-h">
          <em @click="closeS" class="el-icon-arrow-left iiii"></em>
        </div>
        <div id="s-m">
          <div id="s-m-a">
            <el-avatar id="s-a" :src="'http://118.126.104.223'+this.$store.state.roomIn.face"></el-avatar>
            <div id="s-n-n">
              <div id="s-n">{{this.$store.state.roomIn.name}}</div>
              <div id="s-s"><span id="link">{{link}}</span>&nbsp;
                <el-tooltip class="item" effect="light" content="Click to copy the link" placement="bottom-start">
                  <em @click="copy" class="el-icon-link copy"></em>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div id="s-m-i">
           {{this.$store.state.roomIn.info}}
          </div>
        </div>
        <div id="share">
          <div @click="QQ" class="s-item s__i">QQ
            <img class="s-img" src="../assets/QQ.png">
          </div>
          <div @click="Qzone" class="s-item s__i">QZone
            <img class="s-img" src="../assets/Qzone.png">
          </div>
          <div @click="Weibo" class="s-item">Weibo
            <img class="s-img" src="../assets/xinlang.png">
          </div>
        </div>
      </el-aside>
    </el-container>
</template>

<script>
 
export default {
  data () {
    return {
     data: {
        room_id: this.$store.state.room,
      },
      haveHistory: true,
      messages:[
      //   npm
      ],
      page:1,
      protocol:location.protocol,
      room_num: '0',  //当前在线人数，由于设计稿上没体现哪里显示就不具体设置了
      message: '',
      link: 'http://118.126.104.223:8080/room/'+ this.$store.state.room,
      input : '',
      asideS: false,
      search: false,
      aside: false,
      NameP : '',
      idP: 0,
      toP: '',
      deP: ''
    }
  },
  mounted () {
    this.$socket.emit('connect',{
      username: this.$store.state.name,
      roomid: this.$store.state.room
    })
    let chat = document.getElementById("main")
    let mc = document.getElementById("main-chat")
    console.log(mc)
    mc.style.margin = '1000px 0 0 0'
    console.log(chat.scrollTop + '///' + chat.scrollHeight)
    chat.scrollTop = chat.scrollHeight
    console.log(chat.scrollTop + '///' + chat.scrollHeight)
    chat.onscroll = () => {
      if(chat.scrollTop === 0 && this.haveHistory){
        console.log('loading...')
        this.$axios
        .get(
          location.protocol + '//' + '118.126.104.223' + ':80/admin/history',
          {
            params:{
              token:this.$store.state.token,
              room_id:this.$store.state.room,
              page:this.page
            }
          }
        )
        .then((res)=>{
          if( res.data.status != 4002){
            console.log(res.data)
            let heightMax = 0
            let len = res.data.history.length
            for(var i = 0 ; i < len ; i++){
              this.messages.unshift({
                'message' : res.data.history[i].content,
                'isMe' : res.data.history[i].sender == this.$store.state.name,
                'face' : res.data.history[i].face,
                'time' : {
                  'day': res.data.history[i].addtime.day,
                  'hour': res.data.history[i].addtime.hour,
                  'minute' : res.data.history[i].addtime.minute
                }
              })
              setTimeout(() => {
                let mc = document.getElementById("main-chat")
                let dc = document.getElementsByClassName("zs")
                let height = dc[0].offsetHeight
                heightMax += height
                let margin = parseInt(mc.style.marginTop)
                if(margin > height){
                  margin -= height
                }else{
                  margin = 0
                }
                mc.style.marginTop = margin + 'px'
              },1)
            }
            let mChat = document.getElementById("main")
            setTimeout(()=>{
              mChat.scrollTop = heightMax
              this.page++
            },200)
          }else{
            this.$message({
              message : 'No more history',
              duration : 4000
            })
            let load = document.getElementById('loading')
            load.style.display = 'none'
          }
        })
      }
    }
  },
  methods: {
    search_show () {
      this.search = !this.search
    },
    handleCommand (c) {
      if(c === 'open'){
        console.log(this.$store.state.roomIn.creator)
        console.log(this.$store.state.name)
        if(this.$store.state.roomIn.creator == this.$store.state.name){
          this.asideS = false
          this.aside = true
        }else{
          alert("You do not have administrator privileges")
        }
      }
      if(c === 'delete'){
        console.log(this.$store.state.roomIn)
        console.log(this.$store.state.name)
        if(this.$store.state.roomIn.creator == this.$store.state.name){
          this.$axios
          .post(
            location.protocol + '//' + '118.126.104.223' + ':80/admin/room_del',
            {
              room_id : this.$store.state.room
            }
          )
          .then((res) => {
            if(res.data.status == 2000){
              alert('Deleted successfully')
            }else{
              alert('failed')
            }
          })
        }else{
          alert("You do not have administrator privileges")
        }
      }
    },
    c_put () {
      console.log(this.$refs.cUpload.uploadFiles.length)
      this.$axios
      .post(
        location.protocol + '//' + '118.126.104.223' + ':80/admin/edit_room',
        {
          token: this.$store.state.token,
          id: this.$store.state.room,
          name: this.NameP,
          info: 'Topic: ' + this.toP + 'Description: ' + this.deP
        }
      )
      .then((res) => {
        if(res.data.status === 2000){
          if(this.$refs.cUpload.uploadFiles.length != 0){
            this.$refs.cUpload.submit()
          }
          alert("Change successfully")
          this.$store.commit('putRoom',res.data.room.id)
          this.$store.commit('putIn',res.data.room)
        }
      })
    },
    closeE () {
      this.aside = false
    },
    closeS () {
      this.asideS = false
    },
    share_show () {
      this.asideS = true
      this.aside = false
    },
    copy () {
      //不会操作剪贴板
    },
    QQ () {
      let Qshare = "http://connect.qq.com/widget/shareqq/index.html?" +
                   'url=' + this.link +
                   '&title=' + 'Welcome to ' + this.$store.state.roomIn.name
      window.open(Qshare)
    },
    Qzone () {
      let QZshare = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" +
                   'url=' + this.link +
                   '&title=' + 'Welcome to ' + this.$store.state.roomIn.name
      window.open(QZshare)
    },
    Weibo () {
      let Wshare = "http://service.weibo.com/share/mobile.php?" +
                   'url=' + this.link +
                   '&title=' + 'Welcome to ' + this.$store.state.roomIn.name
      window.open(Wshare)
    },
    send (){
      this.$socket.emit('my_event',{
        username:this.$store.state.name,
        userid:this.$store.state.id,
        roomid:this.$store.state.room,
        content:this.message
      })
      let mChat = document.getElementById("main")
      // this.messages.push(
      //   {
      //     'message':this.message,
      //     'name':this.$store.state.name,
      //     'isMe':true
      //   }
      // )
      // setTimeout(() =>{
      //   mChat.scrollTop = mChat.scrollHeight
      // },500)
      this.message = ''
    }
  },
  sockets: {
    connect (data) {
      console.log('ok')
    },
    new_user (data) {
      this.room_num = data.num
      console.log(data)
    },
    leave_user (data) {
      this.room_num = data.num
      console.log(data)
    },
    response (data) {
      console.log(data)
      let mChat = document.getElementById("main")
      this.messages.push(
        {
          'message':data.content,
          'name':data.sender,
          'isMe':data.sender ==this.$store.state.name,
          'face':data.face
        }
      )
      setTimeout(() =>{
        let mc = document.getElementById("main-chat")
        let dc = document.getElementsByClassName("zs")
        console.log(dc)
        console.log(mc.style.marginTop)
        let height = dc[dc.length - 1].offsetHeight
        let margin = parseInt(mc.style.marginTop)
        console.log(margin)
        if(margin > height + 20){
          margin -= height
        }
        mc.style.marginTop = margin + 'px'
        mChat.scrollTop = mChat.scrollHeight
      },500)
    }
  }
}
</script>

<style>
.zs{
  position: relative;
}
.him{
  position: absolute;
  left: 0;
  bottom: 0;
  
}
.me{
  position: absolute;
  right: 0;
  bottom: 0;
}
.hisChat{
  margin: 10px 0 10px 50px;
  border-radius: 20px 20px 20px 2px;
  line-height: 23px;
  padding: 20px;
  font-size: 14px;
  color: rgb(255, 255, 255);
  background-color: rgb(138, 138, 248);
  max-width: 500px;
  float: left;
}
.myChat{
  margin: 10px 50px 10px 0;
  border-radius: 20px 20px 2px 20px;
  line-height: 23px;
  padding: 20px;
  font-size: 14px;
  color: rgb(255, 255, 255);
  background-color: rgb(138, 138, 248);
  max-width: 500px;
  float: right;
}

#l-m{
  width: 200px;
  margin: 20px;
  color: rgb(73, 73, 255);
  text-align: center;
  position: relative;
  left: calc(50% - 200px/2);
}
.f-icon{
  margin-left: 30px;
  color: rgb(138, 138, 248);
  font-size: 40px;
}
.f-icon:hover{
  color: rgb(73, 73, 255);
}
#f-img{
  opacity: 0.4;
  width: 20px;
  height: 20px;
}
#f-img:hover{
  opacity: 1;
}
#footer{
  padding-top: 15px;
}
#f-p{
  float: right;
}
#f-i{
  width: 400px;
  float: left;
}
.s__i{
  border-bottom: 1px solid rgb(219, 219, 219);
}
.s-item{
  padding: 30px 0;
}
.s-item:hover{
  background-color: whitesmoke;
}
#share{
  color: rgb(116, 116, 116);
  line-height: 20px;
  font-size: 15px;
  padding: 10px 20px;
  margin: 10px;
  background-color: #fff;
}
.s-img{
  float: right;
  height: 20px;
  width: 20px;
}
#s-m-i{
    padding: 0 20px;
    word-break: normal;
    text-align: center;
    overflow-wrap: normal;
    overflow: hidden;
}
.copy{
  cursor: pointer;
}
.copy:hover{
  color: #000;
}
#s-s{
  color: rgb(172, 172, 172);
  font-size: 12px;
}
#s-n{
  font-size: 20px;
}
#s-a{
  float: left;
}
#s-n-n{
  margin-left: 20px;
  float: left;
}
#s-m-a{
  padding: 60px 25px;
}
#s-m{
  height: 300px;
  background-color: #fff;
}
.iiii{
  cursor: pointer;
  margin: 20px;
  font-size: 30px;
}
.c-up .el-upload-dragger{
  height: 150px;
  width: 297px;
  background-color: #EDEEF6;
}
#c-up{
  width: 297px;
}
#g-name{
  margin: 8px 0;
  font-size: 20px;
  text-align: center;
}
#g-intro{
  color: #B4B9BF;
  word-break: normal;
  text-align: center;
  overflow-wrap: normal;
  overflow: hidden;
}
#avaI{
  position: relative;
  left: calc(50% - 70px/2);
}
#aside-a-a{
  padding-top: 40px;
  height: 70px;
}
#aside-a{
  background-color: white;
  height: 255px;
}
.aside-h{
  margin-bottom: 2px;
  height:70px;
  background-color:white;
}
.information{
  border-left: 2px solid #F5F6FA;
}
.ctc{
  margin: 0 0 0 22px;
}
.ctp{
  margin: 0 0 0 30px;
}
.onc{
  cursor: pointer;
  margin: 0 0 0 30px;
  font-size: 15px;
  color: rgb(2, 2, 2);
}
.c_ic{
  font-size: 15px;
  color: rgb(180, 180, 180);
  cursor: pointer;
  margin: 0 0 0 30px;
}
#c-icons{
  margin: 10px 0;
  float: right;
  font-size: 0;
}
#int{
  margin: 0 20px;
  float: left;
}
.pad{
  padding: 0 70px;
}
#c-avatar{
  height: 40px;
  position: relative;
  top: calc(50% - 40px/2);
}
.c-i .el-input__inner{
  background-color: #EDEEF6;
}
#chat{
  margin-left: 5px;
}
#search{
  margin: 2px 0 0 0;
  background-color: #fff;
}
</style>