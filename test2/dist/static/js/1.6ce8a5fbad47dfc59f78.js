webpackJsonp([1],{b3iN:function(t,e){},mvHQ:function(t,e,s){t.exports={default:s("qkKv"),__esModule:!0}},qkKv:function(t,e,s){var a=s("FeBl"),r=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}},wUZA:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),r=s.n(a),i={data:function(){var t=this,e=function(t,e,s){if(!e)return s(new Error("Nickname cannot be null"));s()},s=function(t,e,s){""===e?s(new Error("Please enter your password")):s()};return{protocol:location.protocol,activeName:"first",ruleForm:{password:"",CPassword:"",name:""},l_ruleForm:{password:"",name:""},rules:{password:[{validator:s,trigger:"blur"}],CPassword:[{validator:function(e,s,a){""===s?a(new Error("Please enter your password again")):s!==t.ruleForm.password?a(new Error("The passwords entered are inconsistent")):a()},trigger:"blur"}],name:[{validator:e,trigger:"blur"}]},l_rules:{password:[{validator:s,trigger:"blur"}],name:[{validator:e,trigger:"blur"}]},cou:this.$store.state.cou,name:this.$store.state.name,intro:this.$store.state.intro,em:this.$store.state.em,phone:this.$store.state.phone,data:{user_id:this.$store.state.id}}},methods:{submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;e.$axios.post(location.protocol+"//118.126.104.223/admin/user_regist",{name:e.ruleForm.name,pwd:e.ruleForm.password}).then(function(t){if(2e3===t.data.status){alert("Registered Successfully");var s=e.ruleForm.name,a={token:t.data.token,id:t.data.userid,name:s};e.$store.commit("registered"),e.$store.commit("load",a)}4003===t.data.status&&alert("User name duplication")})})},l_submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;e.$axios.post(location.protocol+"//118.126.104.223:80/admin/user",{name:e.l_ruleForm.name,pwd:e.l_ruleForm.password}).then(function(t){if(2e3===t.data.status){alert("Login Successful");var s=e.l_ruleForm.name,a={token:t.data.token,id:t.data.userid,name:s};e.$store.commit("registered"),e.$store.commit("load",a),e.$store.commit("getUser")}4002===t.data.status&&alert("The user is not registerde!"),4106===t.data.status&&alert("Wrong password")})})},resetForm:function(t){this.$refs[t].resetFields()},upload:function(){var t=this,e={cou:this.cou,name:this.name,intro:this.intro,em:this.em,phone:this.phone};e=r()(e),console.log(this.$store.state.id),this.$axios.post(location.protocol+"//118.126.104.223:80/admin/edit_user",{token:this.$store.state.token,id:this.$store.state.id,name:this.name,info:e}).then(function(e){2e3===e.data.status&&(alert("Edit Successfully"),t.$store.commit("getUser"))})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",[s("el-main",{directives:[{name:"show",rawName:"v-show",value:!this.$store.state.isLogin,expression:"!this.$store.state.isLogin"}]},[s("div",{attrs:{id:"login"}},[s("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[s("el-tab-pane",{attrs:{label:"register",name:"first"}},[s("el-form",{ref:"ruleForm",staticClass:"Form",attrs:{model:t.ruleForm,"status-icon":"",rules:t.rules,"label-width":"200px"}},[s("el-form-item",{attrs:{label:"Nickname",prop:"name"}},[s("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.ruleForm.name,callback:function(e){t.$set(t.ruleForm,"name",e)},expression:"ruleForm.name"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"Password",prop:"password"}},[s("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.ruleForm.password,callback:function(e){t.$set(t.ruleForm,"password",e)},expression:"ruleForm.password"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"Confirm Password",prop:"CPassword"}},[s("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.ruleForm.CPassword,callback:function(e){t.$set(t.ruleForm,"CPassword",e)},expression:"ruleForm.CPassword"}})],1),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("Sumbit")]),t._v(" "),s("el-button",{on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("Reset")])],1)],1)],1),t._v(" "),s("el-tab-pane",{attrs:{label:"login",name:"second"}},[s("el-form",{ref:"l_ruleForm",staticClass:"Form",attrs:{model:t.l_ruleForm,"status-icon":"",rules:t.l_rules,"label-width":"200px"}},[s("el-form-item",{attrs:{label:"Nickname",prop:"name"}},[s("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.l_ruleForm.name,callback:function(e){t.$set(t.l_ruleForm,"name",e)},expression:"l_ruleForm.name"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"Password",prop:"password"}},[s("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.l_ruleForm.password,callback:function(e){t.$set(t.l_ruleForm,"password",e)},expression:"l_ruleForm.password"}})],1),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.l_submitForm("l_ruleForm")}}},[t._v("Sumbit")]),t._v(" "),s("el-button",{on:{click:function(e){return t.resetForm("l_ruleForm")}}},[t._v("Reset")])],1)],1)],1)],1)],1)]),t._v(" "),s("el-container",{directives:[{name:"show",rawName:"v-show",value:this.$store.state.isLogin,expression:"this.$store.state.isLogin"}],attrs:{id:"home",dir:"horizontal"}},[s("el-aside",{attrs:{width:"350px",id:"user"}},[s("div",{attrs:{id:"pro"}},[t._v("Profile")]),t._v(" "),s("el-input",{attrs:{size:"large",id:"i",placeholder:"Search for messages or users...","suffix-icon":"el-icon-search"}}),t._v(" "),s("div",{attrs:{id:"my"}},[s("div",{attrs:{id:"avatar"}},[""==this.$store.state.face?s("el-avatar",{staticStyle:{"font-size":"40px"},attrs:{size:70,fit:"cover",icon:"el-icon-user-solid"}}):s("el-avatar",{attrs:{src:"http://118.126.104.223"+this.$store.state.face,size:70,fit:"cover"}})],1),t._v(" "),s("div",{attrs:{id:"name"}},[t._v(t._s(this.$store.state.name))]),t._v(" "),s("div",{attrs:{id:"intro"}},[t._v(t._s(this.$store.state.intro))])]),t._v(" "),s("div",{staticStyle:{padding:"15px 10px","background-color":"white"}},[s("div",{staticClass:"bo"},[s("div",{staticClass:"co"},[t._v("Country"),s("span",{staticClass:"el-icon-map-location",staticStyle:{float:"right"}})]),t._v(" "),s("div",{staticClass:"do"},[t._v(t._s(this.$store.state.cou))])]),t._v(" "),s("div",{staticClass:"bo"},[s("div",{staticClass:"co"},[t._v("Phone"),s("span",{staticClass:"el-icon-phone-outline",staticStyle:{float:"right"}})]),t._v(" "),s("div",{staticClass:"do"},[t._v(t._s(this.$store.state.phone))])]),t._v(" "),s("div",{staticClass:"bo"},[s("div",{staticClass:"co"},[t._v("E-mail"),s("span",{staticClass:"el-icon-message",staticStyle:{float:"right"}})]),t._v(" "),s("div",{staticClass:"do"},[t._v(t._s(this.$store.state.em))])]),t._v(" "),s("div",{staticStyle:{"padding-top":"17px"}},[s("div",{staticClass:"co"},[t._v("Time"),s("span",{staticClass:"el-icon-time",staticStyle:{float:"right"}})]),t._v(" "),s("div",{staticClass:"do"},[t._v("time")])])])],1),t._v(" "),s("el-container",[s("el-header",{attrs:{id:"he",height:"80px"}},[t._v("\n                Settings\n                "),s("div",{staticClass:"Breadcrumb"},[t._v("Update your profile details")])]),t._v(" "),s("el-main",[s("div",{attrs:{id:"detail"}},[s("div",{attrs:{id:"d-h"}},[s("div",{staticStyle:{float:"left"}},[s("div",{staticStyle:{"font-weight":"600","font-size":"14px"}},[t._v("Account")]),t._v(" "),s("div",{staticClass:"Breadcrumb"},[t._v("Update your profile details")])]),t._v(" "),s("div",{staticClass:"tt"},[s("span",{staticClass:"el-icon-user"})])]),t._v(" "),s("div",{attrs:{id:"d-main"}},[s("div",{staticClass:"c"},[t._v("Avatar")]),t._v(" "),s("el-upload",{attrs:{drag:"",data:t.data,action:t.protocol+"//118.126.104.223:80/admin/upload_user"}},[s("div",{staticClass:"upload"},[s("i",{staticClass:"pppc el-icon-picture-outline"}),t._v(" "),s("div",{staticClass:"tx"},[t._v("You can upload jpg,gif or png files.")]),t._v(" "),s("div",{staticClass:"tx"},[t._v("Max file size 3mb")])])]),t._v(" "),s("div",{staticClass:"c"},[t._v("Name")]),t._v(" "),s("el-input",{staticClass:"i",model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),s("div",{staticClass:"c"},[t._v("Phone")]),t._v(" "),s("el-input",{staticClass:"i",model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),t._v(" "),s("div",{staticClass:"c"},[t._v("Email")]),t._v(" "),s("el-input",{staticClass:"i",model:{value:t.em,callback:function(e){t.em=e},expression:"em"}}),t._v(" "),s("div",{staticClass:"c"},[t._v("Country")]),t._v(" "),s("el-input",{staticClass:"i",model:{value:t.cou,callback:function(e){t.cou=e},expression:"cou"}}),t._v(" "),s("div",{staticClass:"c"},[t._v("Introduction")]),t._v(" "),s("el-input",{staticClass:"i",model:{value:t.intro,callback:function(e){t.intro=e},expression:"intro"}}),t._v(" "),s("div",{staticStyle:{margin:"10px 55px"}},[s("el-button",{attrs:{type:"primary"},on:{click:t.upload}},[s("div",{staticStyle:{margin:"0 40px","font-size":"13px"}},[t._v("Save Preferences")])])],1)],1)])])],1)],1)],1)},staticRenderFns:[]};var l=s("VU/8")(i,o,!1,function(t){s("b3iN")},null,null);e.default=l.exports}});
//# sourceMappingURL=1.6ce8a5fbad47dfc59f78.js.map