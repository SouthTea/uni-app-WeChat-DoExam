(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0b53":function(t,e,o){"use strict";var n=o("49b1"),a=o.n(n);a.a},"2be6":function(t,e,o){"use strict";o.r(e);var n=o("c20d"),a=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e["default"]=a.a},"49b1":function(t,e,o){},"6cac":function(t,e,o){"use strict";o.r(e);var n=o("bfe2"),a=o("2be6");for(var i in a)"default"!==i&&function(t){o.d(e,t,(function(){return a[t]}))}(i);o("0b53");var c,d=o("f0c5"),s=Object(d["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=s.exports},bfe2:function(t,e,o){"use strict";o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return n}));var n={uniIcons:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(o.bind(null,"7df4"))},cmdProgress:function(){return o.e("components/cmd-progress/cmd-progress").then(o.bind(null,"9f9d"))}},a=function(){var t=this,e=t.$createElement;t._self._c},i=[]},c20d:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=null,n={data:function(){return{ratew:71,record_i:-1,record_op:0,userinfo:{nickName:"用户名",avatarUrl:""},user:{questioncount:0,studyscore:0},dbloginbtn:!1,loginbtn:"登录",islogin:!1,qt_formdata:{openid:"",qt:1,mode:0,num:50},qts:[{text:"移动互联应用概论",count:100,value:0},{text:"电子技术基础",count:200,value:1}],qt_modes:[{text:"练习(可看答案)",value:0},{text:"测验",value:1}],record:[{id:0,title:"电子技术基础",mode:0,createdate:"2020/06/09 15:00",grade:-1,qtcount:20,answercount:2,status:0}]}},onLoad:function(){this.ratew=t.upx2px(this.ratew),this.getuserinfo()},onShow:function(){this.updateindex()},methods:{c_topic:function(t,e){this.record_op?this.deltopic(t,e):this.opentopic(t)},record_move:function(e){var n=e.changedTouches[0],a=o.clientX-n.clientX,i=t.upx2px(1);a/=i,a>0&&this.record_op<1&&(this.record_op=a/150)},record_t:function(t,e){var n=t.changedTouches[0];if("touchstart"==t.type)this.record_i!=e&&(this.record_op=0,this.record_i=e),o=n;else{var a=n.clientX-o.clientX;n.clientY,o.clientY;a<=0&&this.record_op>.4?this.record_op=1:this.record_op=0}},qt_change:function(t){this.qt_formdata.qt=parseInt(t.detail.value)},qtmode_change:function(t){this.qt_formdata.mode=parseInt(t.detail.value)},getPhone:function(e){this.dbloginbtn=!0,console.log(e),"getPhoneNumber:fail user deny"==e.detail.errMsg?(t.showModal({title:"提示",content:"授权失败，可能无法获取用户答题记录等信息",showCancel:!1}),this.dbloginbtn=!1):this.getuserinfo(!0)},addtopic:function(){t.showLoading({title:"抽取题目并创建答卷",mask:!0});var e=this;t.request({method:"POST",url:"https://1312.aiepoch.cn/api/v1/juan/addtopic",data:e.qt_formdata,success:function(o){console.log(o),200==o.statusCode&&(1==o.data.code?t.showModal({title:"提示",content:o.data.message+"，是否现在开始答题（若取消，可在抽题记录内重新进入）",success:function(t){t.confirm?e.opentopic(o.data.data):e.updateindex()}}):t.showModal({title:"提示",content:o.data.message,showCancel:!1}))},complete:function(){t.hideLoading()}})},deltopic:function(e,o){this.record_op=0,t.showLoading({title:"正在删除",mask:!0});var n=this;t.request({method:"POST",url:"https://1312.aiepoch.cn/api/v1/juan/deltopic",data:{openid:t.getStorageSync("openid"),recordid:e.id},success:function(e){console.log(e),200==e.statusCode&&(1==e.data.code?n.record.splice(o,1):t.showModal({title:"提示",content:e.data.message,showCancel:!1}))},complete:function(){t.hideLoading()}})},opencollect:function(){t.navigateTo({url:"../collect/collect"})},opentopic:function(e){t.showLoading({title:"正在打开",mask:!0}),t.request({method:"GET",url:"https://1312.aiepoch.cn/api/v1/juan/getqtcard",data:{openid:t.getStorageSync("openid"),recordid:e.id},success:function(o){console.log(o,e),200==o.statusCode&&(1==o.data.code?(getApp().globalData.topiccard=o.data.data,t.navigateTo({url:"../exam/exam?title="+e.title+"&id="+e.id+"&mode="+e.mode+"&status="+e.status})):t.showModal({title:"打开失败",content:o.data.message,showCancel:!1}))},complete:function(){t.hideLoading()}})},updateindex:function(){this.record_i=-1,t.showLoading({title:"更新用户信息",mask:!0});var e=t.getStorageSync("openid");this.qt_formdata.openid=e;var o=this;t.request({method:"GET",url:"https://1312.aiepoch.cn/api/v1/juan/getindexdata",data:{openid:e},success:function(t){console.log(t),200==t.statusCode&&1==t.data.code&&(o.user=t.data.data.user,o.qts=t.data.data.qts,o.qt_mode=t.data.data.qt_modes,o.record=t.data.data.record)},complete:function(){t.hideLoading()}})},getuserinfo:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.dbloginbtn=!0;var o=this,n=t.getStorageSync("logindata");!n||e?t.getProvider({service:"oauth",success:function(n){~n.provider.indexOf("weixin")?t.login({provider:"weixin",success:function(n){console.log(n.code),t.setStorageSync("usercode",n.code),t.showModal({title:"登录",content:e?"是否重新登录":"将获取你的昵称，头像",showCancel:e,success:function(e){e.confirm&&t.getUserProfile({desc:"获取你的昵称，头像",success:function(e){o.userinfo=e.userInfo,t.request({method:"POST",url:"https://1312.aiepoch.cn/api/v1/juan/wxlogin",data:{code:t.getStorageSync("usercode"),nickName:e.userInfo.nickName,gender:e.userInfo.gender,avatarUrl:e.userInfo.avatarUrl},success:function(n){console.log(n),200==n.statusCode&&1==n.data.code&&n.data.data.openid&&(t.setStorageSync("openid",n.data.data.openid),t.setStorageSync("logindata",e),o.islogin=!0,o.updateindex())}})},fail:function(t){console.log(t)},complete:function(){o.dbloginbtn=!1}})}})},fail:function(){o.dbloginbtn=!1}}):o.dbloginbtn=!1}}):(this.userinfo=n.userInfo,this.islogin=!0)}}};e.default=n}).call(this,o("543d")["default"])},f4f9:function(t,e,o){"use strict";(function(t){o("efe7");n(o("66fd"));var e=n(o("6cac"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=o,t(e.default)}).call(this,o("543d")["createPage"])}},[["f4f9","common/runtime","common/vendor"]]]);