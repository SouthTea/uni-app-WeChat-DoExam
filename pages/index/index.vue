<style lang="scss">
	$main_top:60upx;
	$headimg_h:120upx;

	.msg {

		width: 80%;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;

		.headimg {
			width: $headimg_h;
			height: $headimg_h;
			border-radius: 50%;
			border: 2px solid #eee;

		}

		.name {
			padding-left: 20upx;
			font-size: 45upx;
		}

		.loginbtn {
			border: none;
			outline: none;
			padding: 0;
			margin: 0;
			margin-left: auto;
			color: #0078f1;
			font-size: 30upx;
		}

	}

	.login {
		display: flex;
		text-align: center;
		width: 100%;
		height: 100vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		text {
			margin: 20upx;
		}

		.loginbtn {
			background-color: #52b4ff;
			color: #fff;

		}

	}


	.operate {
		height: calc(100vh - #{$headimg_h+$main_top + 130upx});
		margin-top: 20upx;
		overflow: scroll;
		-webkit-overflow-scrolling: touch
	}

	.info {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-evenly;
		text-align: center;
		align-items: center;

		&>.hr {
			width: 1px;
			height: 70upx;
			background-color: #aaa;

		}

		&>view {
			.num {
				font-size: 60upx;
				display: block;
				text-align: center;
			}

			.des {
				color: $uni-text-color-grey;
				display: block;
				font-size: 27upx;
				// margin-top: -10upx;
			}
		}

	}

	.sel_qt {
		display: flex;
		padding: 20upx 40upx;

		.qt {
			width: 100%;
		}

		.radio {
			border: 1px solid #ccc;
			margin: 10upx 5upx;
			padding: 10upx 15upx;
			display: block;
			border-radius: 10upx;
			font-size: 35upx;
			color: #888;
		}

		.sel {
			background-color: $uni-color-primary;
			color: #fff;
		}

		.item {
			display: flex;

			.tit {
				display: block;
				width: 150upx;
				padding-top: 15upx;
				text-align: right;
			}
		}

		.qtnum {
			width: 150upx;
			border: 1px solid #ccc;
			margin: 10upx 5upx;
			padding: 10upx 15upx;
			border-radius: 10upx;
		}

		.sumbit {
			display: block;
			margin: 20upx auto;
			color: #fff;
			background-color: $uni-color-primary;
		}

		.mode .radio {
			display: inline-block;
		}

		// .qt{
		// 	width: 600upx;
		// }
	}

	.record {
		&>.main_tit {
			font-weight: bold;
			padding: 20upx;
			align-self: flex-start;
			font-size: 40upx;
		}

		.card {
			width: 100%;
			border-radius: 20upx;
			padding: 20upx 30upx;
		}

		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		align-items: center;

		.item {
			display: flex;
			// background-color: #fdfdfd;
			flex-wrap: nowrap;
			box-shadow: 0 0 20upx 0 rgba($color: #ccc, $alpha: .7);
			width: 640upx;
			justify-content: flex-start;
			padding: 20upx;
			margin: 15upx 0;
			align-items: center;
			position: relative;
			&>.del{
				position: absolute;
				top: 0;left: 0;
				width: 100%;height: 100%;
				background-color: #ea0000;
				display: flex;
				color: #fff;
				font-size: 40upx;
				justify-content: center;
				align-items: center;
				transition: .5s;
				z-index: 10;
				border-radius: 20upx;
			}
			.tit {
				font-weight: bold;
				font-size: 35upx;
			}

			.des {
				color: $uni-text-color-grey;
				font-size: 30upx;
				
				&>.tag {
					color: #007aff;
					position: relative;
					top: -1px;
				}

				&>.tag_icon {
					padding-left: 10upx;
					position: relative;
					top: -5upx;
				}
			}

			.grade {
				color: #1AAD19;
				font-style: italic;
			}

			.rate {
				// margin-top: 2px;
				margin-right: 10px;
				position: relative;
				// top:15px;
				// right: 10px;
				transform: rotateZ(180deg);
				// transform-origin: 20px 20px;
			}

			.right {
				margin-left: auto;
			}
		}

		#collect {
			font-size: 30upx;
			font-weight: 100;
			position: absolute;
			top: 45upx;
			right: 40upx;
		}
	}
</style>


<template>
	<view class="main">
		<view class="title">我的题卡</view>
		<view v-if="islogin" class="msg" @click="getuserinfo(true);">
			<image class="headimg" :src="userinfo.avatarUrl" mode=""></image>
			<text class="name">{{userinfo.nickName}}</text>

		</view>
		<view v-if="!islogin" class="login">
			<text>请先授权登录以获取用户及题库等信息</text>
			<!-- <button type="default" :disabled="dbloginbtn" class="loginbtn" open-type="getPhoneNumber"
				@getphonenumber="getPhone">{{loginbtn}}</button> -->
			<button :disabled="dbloginbtn" class="loginbtn" @click="getuserinfo">{{loginbtn}}</button>
		</view>

		<view v-if="islogin" class="operate">

			<view class="panel card info">
				<view><text class="num">{{qts.length}}</text>
					<text class="des">题库总数</text>
				</view>
				<!-- <view class="hr"></view> -->
				<view><text class="num">{{record.length}}</text>
					<text class="des">累计抽题</text>
				</view>
				<!-- <view class="hr"></view> -->
				<view><text class="num">{{user.studyscore}}</text>
					<text class="des">卷王指数</text>
				</view>
				<view v-if="user.studyranking"><text class="num">{{user.studyranking}}</text>
					<text class="des">指数排名</text>
				</view>
			</view>
			<view class="sel_qt card">

				<view class="qt">

					<radio-group name="qt" @change="qt_change">
						<view class="item">
							<text class="tit">题库：</text>
							<view>
								<label v-for="item,i in qts" :key="i" class="radio"
									:class="{'sel':qt_formdata.qt==item.value}">
									<radio hidden :value="item.value" /><text>{{item.text}}({{item.count}}道)</text>
								</label>
							</view>
						</view>

					</radio-group>
					<radio-group name="mode" @change="qtmode_change">
						<view class="item">
							<text class="tit">模式：</text>
							<view class="mode">
								<label v-for="item,i in qt_modes" :key="i" class="radio"
									:class="{'sel':qt_formdata.mode==item.value}">
									<radio hidden :value="item.value" /><text>{{item.text}}</text>
								</label>
							</view>
						</view>

					</radio-group>
					<view class="item">
						<text class="tit">题数：</text>
						<input class="qtnum" type="number" v-model="qt_formdata.num" />
					</view>
					<view class="item">
						<button class="sumbit" type="default" size="mini" @click="addtopic">抽题</button>
					</view>
					<view style="text-align: center;"><text
							style="color: #888; font-size: 25upx;">{{user.appinfo}}</text></view>
				</view>
				<!-- <view class="qt">
					<uni-forms ref="form" :modelValue="qt_formdata">
						<uni-forms-item label="题库" required>
							<uni-data-checkbox mode="tag" v-model="qt_formdata.qt" :localdata="qts" />
						</uni-forms-item>
						<uni-forms-item label="数量" required>
							<uni-easyinput v-model="qt_formdata.num" placeholder="请输入要抽取的题目数量" />
						</uni-forms-item>
						
					</uni-forms>
				</view> -->


			</view>

			<view class="record card">
				<view class="main_tit" > <text>抽题记录</text>
					<view id="collect" @click="opencollect">
						<uni-icons type="star-filled" color="#f9d000"></uni-icons><text>收藏夹</text>
					</view>
				</view>

				<view class="item card" :id="i" v-for="item,i in record" :key="i" 
					@touchstart="record_t($event,i)" @touchmove="record_move" @touchend="record_t">
					<view class="del" @click="c_topic(item,i)" :style="{'opacity':record_i==i?record_op:0}">删除</view>
					<view class="rate">
						<view
							style="position: absolute;transform: rotateZ(180deg);top:16upx;left:0upx;text-align: center;width: 70upx;">
							<text style="color: #888; font-size: 30upx; font-weight: 100;">{{item.qtcount}}</text>
						</view>
						<cmd-progress :cid="circle" type="circle" :percent="item.answercount / item.qtcount * 100"
							:showInfo="false" font-color="#000" :width="ratew" :font-size="3" stroke-width="14"
							stroke-color="#3da5ff"></cmd-progress>
					</view>
					<view class="left">

						<view class="tit"><text>{{item.title}} </text></view>
						<view class="des"><text>{{item.createdate}}</text>
							<uni-icons class="tag_icon" type="circle-filled" size="10"
								:color="['#41ba55','#007aff'][item.mode]"></uni-icons><text class="tag"
								:style="{'color':['#41ba55','#007aff'][item.mode]}">{{['练习','测验'][item.mode]}}</text>
						</view>
					</view>
					<view class="right">
						<view class="grade" :style="{'Color':item.answercount==0?'#888':''}">
							<text>{{item.answercount==0?'未作答':item.grade}}</text>
						</view>
					</view>

				</view>
			</view>


		</view>

	</view>
</template>

<script>
	var record_rect=null;
	export default {
		data() {
			return {
				//基本信息
				ratew: 71,
				record_i: -1,
				record_op: 0,
				userinfo: {
					'nickName': '用户名',
					'avatarUrl': ''
				},
				user: {
					'questioncount': 0,
					'studyscore': 0
				},
				dbloginbtn: false,
				loginbtn: '登录',
				islogin: false,
				//抽题
				qt_formdata: {
					openid: '',
					qt: 1,
					mode: 0,
					num: 50,
				},
				qts: [{
					text: '移动互联应用概论',
					count: 100,
					value: 0,
				}, {
					text: '电子技术基础',
					count: 200,
					value: 1
				}],
				qt_modes: [{
					text: '练习(可看答案)',
					value: 0,
				}, {
					text: '测验',
					value: 1
				}],
				//答题记录
				record: [{
					id: 0,
					title: '电子技术基础',
					mode: 0,
					createdate: '2020/06/09 15:00',
					grade: -1,
					qtcount: 20,
					answercount: 2,
					status: 0
				}]
			}
		},
		onLoad() {
			this.ratew = uni.upx2px(this.ratew)
			this.getuserinfo();
			// uni.navigateTo({
			// 	url: '../exam/exam'
			// })
		},
		onShow() {
			this.updateindex();
			
			// var logindata = uni.getStorageSync('logindata');
			// if (logindata) {
			// 	this.userinfo = logindata.userInfo
			// 	this.islogin = true
			// }
			// uni.navigateTo({
			// 	url: '../exam/exam'
			// })
		},

		methods: {
			c_topic(item,i){
				if(this.record_op){
					this.deltopic(item,i);
				}else{
					this.opentopic(item);
				}
			},
			record_move(e) {
				let tm = e.changedTouches[0];
				var w = record_rect.clientX - tm.clientX;
				var dp=uni.upx2px(1);
				w=w/dp;
				if (w > 0&& this.record_op<1) {
					
					this.record_op=w/150
				}
			},
			record_t(e, i) {
				let tm = e.changedTouches[0];
				if (e.type == "touchstart") {
					
					if(this.record_i != i){
						this.record_op=0;
						this.record_i = i;
					}
					
					record_rect = tm;
				} else {
					let w = tm.clientX - record_rect.clientX;
					let h = tm.clientY - record_rect.clientY;
					if (w <= 0 && this.record_op>0.4) {
						this.record_op=1;
						//this.record_op=w;
					}else{
						this.record_op=0;
					}
				}
				//record_i

			},
			qt_change(e) {
				this.qt_formdata.qt = parseInt(e.detail.value);
			},
			qtmode_change(e) {
				this.qt_formdata.mode = parseInt(e.detail.value);
			},
			getPhone(e) {
				this.dbloginbtn = true;
				console.log(e);
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					uni.showModal({
						title: '提示',
						content: '授权失败，可能无法获取用户答题记录等信息',
						showCancel: false
					})
					this.dbloginbtn = false;
				} else {
					// 登录并获取信息
					this.getuserinfo(true);

				}
			},
			addtopic() {
				//抽题
				uni.showLoading({
					title: '抽取题目并创建答卷',
					mask: true
				});
				var that = this;
				uni.request({
					method: 'POST',
					url: 'https://1312.aiepoch.cn/api/v1/juan/addtopic',
					data: that.qt_formdata,
					success(res) {
						console.log(res)
						if (res.statusCode == 200) {
							if (res.data.code == 1) {
								uni.showModal({
									title: '提示',
									content: res.data.message + '，是否现在开始答题（若取消，可在抽题记录内重新进入）',
									success(r) {
										if (r.confirm) {
											//进入答卷
											that.opentopic(res.data.data);
										} else {
											that.updateindex();
										}
									}
								})
							} else {
								uni.showModal({
									title: '提示',
									content: res.data.message,
									showCancel: false
								})
							}
						}
					},
					complete() {
						uni.hideLoading();
					}
				})
			},
			deltopic(item,i) {
				//删除记录
				this.record_op=0;
				uni.showLoading({
					title: '正在删除',
					mask: true
				});
				var that = this;
				uni.request({
					method: 'POST',
					url: 'https://1312.aiepoch.cn/api/v1/juan/deltopic',
					data: {
						'openid': uni.getStorageSync('openid'),
						'recordid': item.id
					},
					success(res) {
						console.log(res)
						if (res.statusCode == 200) {
							if (res.data.code == 1) {
								that.record.splice(i,1);
							} else {
								uni.showModal({
									title: '提示',
									content: res.data.message,
									showCancel: false
								})
							}
						}
					},
					complete() {
						uni.hideLoading();
					}
				})
			},
			opencollect() {
				uni.navigateTo({
					url: '../collect/collect'
				})
			},
			opentopic(item) {
				uni.showLoading({
					title: '正在打开',
					mask: true
				});
				uni.request({
					method: 'GET',
					url: 'https://1312.aiepoch.cn/api/v1/juan/getqtcard',
					data: {
						'openid': uni.getStorageSync('openid'),
						'recordid': item.id
					},
					success(res) {

						console.log(res, item)
						if (res.statusCode == 200) {
							if (res.data.code == 1) {
								getApp().globalData.topiccard = res.data.data;
								uni.navigateTo({
									url: '../exam/exam?title=' + item.title + '&id=' + item.id + '&mode=' +
										item.mode + '&status=' + item.status
								})
							} else {
								uni.showModal({
									title: '打开失败',
									content: res.data.message,
									showCancel: false
								})
							}
						}
					},
					complete() {
						uni.hideLoading();
					}
				})

			},
			//更新首页数据
			updateindex() {
				this.record_i=-1;
				uni.showLoading({
					title: '更新用户信息',
					mask: true
				});
				var openid = uni.getStorageSync('openid');
				this.qt_formdata.openid = openid;
				var that = this;
				uni.request({
					method: 'GET',
					url: 'https://1312.aiepoch.cn/api/v1/juan/getindexdata',
					data: {
						'openid': openid
					},
					success(res) {
						console.log(res)
						if (res.statusCode == 200 && res.data.code == 1) {
							that.user = res.data.data.user;
							that.qts = res.data.data.qts;
							that.qt_mode = res.data.data.qt_modes;
							that.record = res.data.data.record;
						}
					},
					complete() {
						uni.hideLoading();

					}
				})
			},
			//获取用户信息
			getuserinfo(relogin = false) {
				this.dbloginbtn = true;
				var that = this;
				var logindata = uni.getStorageSync('logindata');

				if (!logindata || relogin) {
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
							if (~res.provider.indexOf('weixin')) {
								uni.login({
									provider: 'weixin',
									success: function(loginRes) {
										console.log(loginRes.code)
										uni.setStorageSync('usercode', loginRes.code)
										uni.showModal({
											title: '登录',
											content: relogin ? '是否重新登录' : '将获取你的昵称，头像',
											showCancel: relogin,
											success(r) {
												if (r.confirm) {
													uni.getUserProfile({
														desc: '获取你的昵称，头像',
														success(re) {

															that.userinfo = re
																.userInfo;

															//登录成功
															uni.request({
																method: 'POST',
																url: 'https://1312.aiepoch.cn/api/v1/juan/wxlogin',
																data: {
																	'code': uni
																		.getStorageSync(
																			'usercode'
																		),
																	'nickName': re
																		.userInfo
																		.nickName,
																	'gender': re
																		.userInfo
																		.gender,
																	'avatarUrl': re
																		.userInfo
																		.avatarUrl,
																},
																success(
																	res) {
																	console
																		.log(
																			res
																		)
																	if (res
																		.statusCode ==
																		200 &&
																		res
																		.data
																		.code ==
																		1 &&
																		res
																		.data
																		.data
																		.openid
																	) {

																		uni.setStorageSync(
																			'openid',
																			res
																			.data
																			.data
																			.openid
																		);
																		uni.setStorageSync(
																			'logindata',
																			re
																		);
																		that.islogin =
																			true
																		that.updateindex()

																	}
																}
															})
														},
														fail(e) {
															console.log(e)
														},
														complete() {
															that.dbloginbtn =
																false;
														}
													})
												}

											}
										})
										// uni.getUserInfo({
										// 	provider: 'weixin',
										// 	withCredentials: true,
										// 	success(res) {
										// 		uni.setStorageSync('userinfo', res
										// 			.userInfo)
										// 		that.userinfo = res.userInfo;
										// 		console.log(res)
										// 	}
										// })
									},
									fail() {
										that.dbloginbtn = false;
									}
								});
							} else {
								that.dbloginbtn = false;

							}
						}
					});
				} else {
					// 无登录状态
					this.userinfo = logindata.userInfo
					this.islogin = true
				}
			}
		}
	}
</script>
