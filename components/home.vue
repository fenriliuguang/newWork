<template>
    <el-container>
        <el-main v-show="!this.$store.state.isLogin">
            <div id="login">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="register" name="first">
                        <el-form :model="ruleForm" status-icon :rules="rules"
                        ref="ruleForm"
                        label-width="200px"
                        class="Form">
                            <el-form-item 
                            label="Nickname"
                            prop="name">
                                <el-input type="text"
                                v-model="ruleForm.name"
                                autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item 
                            label="Password"
                            prop="password">
                                <el-input type="text"
                                v-model="ruleForm.password"
                                autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item 
                            label="Confirm Password"
                            prop="CPassword">
                                <el-input type="text"
                                v-model="ruleForm.CPassword"
                                autocomplete="off">
                                </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">Sumbit</el-button>
                            <el-button @click="resetForm('ruleForm')">Reset</el-button>
                        </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="login" name="second">
                        <el-form :model="l_ruleForm" status-icon :rules="l_rules"
                            ref="l_ruleForm"
                            label-width="200px"
                            class="Form">
                                <el-form-item 
                                label="Nickname"
                                prop="name">
                                    <el-input type="text"
                                    v-model="l_ruleForm.name"
                                    autocomplete="off">
                                    </el-input>
                                </el-form-item>
                                <el-form-item 
                                label="Password"
                                prop="password">
                                    <el-input type="text"
                                    v-model="l_ruleForm.password"
                                    autocomplete="off">
                                    </el-input>
                                </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="l_submitForm('l_ruleForm')">Sumbit</el-button>
                                <el-button @click="resetForm('l_ruleForm')">Reset</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-main>
        <el-container v-show="this.$store.state.isLogin"
        id="home"
        dir="horizontal">
            <el-aside width="350px" id="user">
                <div id="pro">Profile</div>
                <el-input size="large" id="i" placeholder="Search for messages or users..."
                suffix-icon="el-icon-search"></el-input>
                <div id="my">
                    <div id="avatar">
                        <el-avatar v-if="this.$store.state.face == ''" :size="70" :fit="'cover'" style="font-size:40px" icon="el-icon-user-solid"></el-avatar>
                        <el-avatar v-else :src="'http://118.126.104.223'+this.$store.state.face" :size="70" :fit="'cover'"></el-avatar>
                    </div>
                    <div id="name">{{this.$store.state.name}}</div>
                    <div id="intro">{{this.$store.state.intro}}</div>
                </div>
                <div style="padding:15px 10px;background-color:white">
                    <div class="bo">
                        <div class="co">Country<span style="float:right;" class="el-icon-map-location"></span></div>
                        <div class="do">{{this.$store.state.cou}}</div>
                    </div>
                    <div class="bo">
                        <div class="co">Phone<span style="float:right;" class="el-icon-phone-outline"></span></div>
                        <div class="do">{{this.$store.state.phone}}</div>
                    </div>
                    <div class="bo">
                        <div class="co">E-mail<span style="float:right;" class="el-icon-message"></span></div>
                        <div class="do">{{this.$store.state.em}}</div>
                    </div>
                    <div style="padding-top:17px">
                        <div class="co">Time<span style="float:right;" class="el-icon-time"></span></div>
                        <div class="do">time</div>
                    </div>
                </div>
            </el-aside>
            <el-container>
                <el-header id="he" height="80px">
                    Settings
                    <div class="Breadcrumb">Update your profile details</div>
                </el-header>
                <el-main>
                     <div  id="detail">
                        <div id="d-h">
                            <div style="float:left">
                                <div style="font-weight: 600;font-size: 14px;">Account</div>
                                <div class="Breadcrumb">Update your profile details</div>
                            </div>
                            <div class="tt"><span class="el-icon-user"></span></div>
                        </div>
                        <div id="d-main">
                            <div class="c">Avatar</div>
                            <el-upload
                                drag
                                :data="data"
                                :action="protocol + '//' + '118.126.104.223' + ':80/admin/upload_user'">
                                <div class="upload">
                                    <i 
                                    class="pppc el-icon-picture-outline"></i>
                                    <div class="tx">You can upload jpg,gif or png files.</div>
                                    <div class="tx">Max file size 3mb</div>
                                </div>
                            </el-upload>
                            <div class="c">Name</div>
                            <el-input id="i" v-model="name"></el-input>
                            <div class="c">Phone</div>
                            <el-input id="i" v-model="phone"></el-input>
                            <div class="c">Email</div>
                            <el-input id="i" v-model="em"></el-input>
                            <div class="c">Country</div>
                            <el-input id="i" v-model="cou"></el-input>
                            <div class="c">Introduction</div>
                            <el-input id="i" v-model="intro"></el-input>
                            <div style="margin:10px 55px;">
                                <el-button @click="upload" type="primary">
                                    <div style="margin:0 40px;font-size:13px">Save Preferences</div>
                                </el-button>
                            </div>
                        </div>
                     </div>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>

export default {
    data () {
        var checkName = (rule, value, callback) => {
            if(!value) {
                return callback(new Error('Nickname cannot be null'))
            }else callback()
        }
        var validatePass = (rule, value, callback) =>{
            if (value === '') {
                callback(new Error('Please enter your password'))
            } else callback()
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'))
            } else if (value !== this.ruleForm.password) {
                callback(new Error('The passwords entered are inconsistent'))
            }else callback()
        }
        return {
            protocol:location.protocol,
            activeName: 'first',
            ruleForm: {
                password: '',
                CPassword: '',
                name: ''
            },
            l_ruleForm: {
                password: '',
                //CPassword: '',
                name: ''
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur'}
                ],
                CPassword: [
                    { validator: validatePass2, trigger: 'blur'}
                ],
                name: [
                    { validator: checkName, trigger: 'blur'}
                ]
            },
            l_rules: {
                password: [
                    { validator: validatePass, trigger: 'blur'}
                ],
                /*CPassword: [
                    { validator: validatePass2, trigger: 'blur'}
                ],*/
                name: [
                    { validator: checkName, trigger: 'blur'}
                ]
            },
            cou : this.$store.state.cou,
            name : this.$store.state.name,
            intro: this.$store.state.intro,
            em : this.$store.state.em,
            phone : this.$store.state.phone,
            data: {
                user_id: this.$store.state.id
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post(
                            location.protocol + '//' + '118.126.104.223' + '/admin/user_regist',
                            {
                                name: this.ruleForm.name,
                                pwd: this.ruleForm.password
                            }
                        )
                        .then((res) => {
                            if(res.data.status === 2000){
                                alert("Registered Successfully")
                                let name = this.ruleForm.name
                                let payload = {
                                    token: res.data.token,
                                    id: res.data.userid,
                                    name: name
                                }
                                this.$store.commit('registered')
                                this.$store.commit('load',payload)
                            }
                            if(res.data.status === 4003){
                                alert('User name duplication')
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        l_submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post(
                            location.protocol + '//' + '118.126.104.223' + ':80/admin/user',
                            {
                                name: this.l_ruleForm.name,
                                pwd: this.l_ruleForm.password
                            }
                        )
                        .then((res) => {
                            if(res.data.status === 2000){
                                alert("Login Successful")
                                let name = this.l_ruleForm.name
                                let payload = {
                                    token: res.data.token,
                                    id: res.data.userid,
                                    name: name
                                }
                                this.$store.commit('registered')
                                this.$store.commit('load',payload)
                                this.$store.commit('getUser')
                            }
                            if(res.data.status === 4002){
                                alert('The user is not registerde!')
                            }
                            if(res.data.status === 4106){
                                alert('Wrong password')
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        upload(){
            let text = {
                cou:this.cou,
                name:this.name,
                intro:this.intro,
                em:this.em,
                phone:this.phone
            }
            text = JSON.stringify(text)
            console.log(this.$store.state.id)
            this.$axios
                .post(
                    location.protocol + '//' + '118.126.104.223' + ':80/admin/edit_user',
                    {
                        token:this.$store.state.token,
                        id:this.$store.state.id,
                        name:this.name,
                        info:text
                    }
                )
                .then((res) => {
                    if(res.data.status === 2000){
                        alert('Edit Successfully')
                        this.$store.commit('getUser')
                    }
                })
        }
    }
}
</script>

<style>
.tx{
    color: #BDC1C9;
    font-size: 13px;
}
.pppc{
    margin: 25px 0;
    padding: 15px;
    font-size: 20px;
    border-radius: 100%;
    color: white;
    background-color: #0176FF;
}
.i{
    background-color: #EDEEF6;
}
.c{
    font-size: 10px;
    color: #9596A0;
    margin: 2px 0;
}
.upload{
    width: 100%;
    height: 100%;
    background-color: #EDEEF6;
}

#d-main{
    padding: 10px 30px;
}
.tt{
    margin: 10px 0;
    width: 16px;
    height: 16px;
    font-size:16px;
    float: right;
}
#d-h{
    height: 40px;
    padding: 20px 30px;
    border-bottom: solid #F7F7FB 2px;
}
#detail{
    width: 420px;
    height: 640px;
    border: solid #F7F7FB 2px;
    border-radius: 2px;
    position: relative;
    left: calc(50% - 420px/2);
}
.Breadcrumb{
    margin-top: 3px;
    font-size: 13px;
    font-weight: 500;
    color: #BBC0C6;
}
#he{
    padding-left: 40px;
    padding-top: 20px;
    font-weight: 600;
    font-size: 14px;
    border-bottom: solid 2px #F7F7FB;
}
.do{
    color: #9E9FA7;
}
.co{
    color: #BEC2C8;
}
.bo{
    border-bottom: 1px solid #F9F9FC;
    padding: 17px 0;
}
#intro{
    color: #B4B9BF;
    word-break: normal;
    text-align: center;
    overflow-wrap: normal;
    overflow: hidden;
}
#name{
    margin: 8px 0;
    font-size: 25px;
    text-align: center;
}
#avatar{
    
    position: relative;
    left: calc(50% - 70px/2);
}
#my{
    padding: 30px;
    height: 180px;
    margin: 25px 0;
    border-radius: 3px;
    background-color: #fff;
}
#i{
    background-color: #EDEEF6;
    border: none;
}
#pro{
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
}
#user{
    padding: 20px;
    margin: 4px;
    border-radius: 2px;
    background-color: #F5F6FA;
}
#home{
    width: 100%;
    height: 100%;
    background: white;
}
#login{
    width: 700px;
    height: 500px;
    position: relative;
    left: calc(50% - 700px/2);
    top: calc(50% - 500px/2);
}
.Form{
    margin-top: 50px;
    width: 500px;
}
</style>