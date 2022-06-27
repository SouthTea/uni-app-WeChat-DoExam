<style lang="scss">
	$main_top:60upx;
	$headimg_h:120upx;

	.main {
		padding: 0 30upx;
		font-size: 35upx;
	}

	.topic {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;

		.type {
			width: 750upx;
			color: $uni-color-primary;
			margin-bottom: 20upx;
		}

		.content {
			width: 750upx;
		}

	}

	.topic,
	.options {
		width: 100%;
		color: #888;
		box-sizing: border-box;
	}

	.options {
		padding: 20upx 20upx;
		box-sizing: border-box;

		.option {
			padding: 10upx 0;
			width: 630upx;
			display: flex;
			align-items: center;

			&.select {
				color: $uni-color-primary;
				font-weight: bold;

			}

			&.success {
				color: $uni-color-success;
				font-weight: bold;
				position: relative;

				&::after {
					content: '√';
					display: block;
					position: absolute;
					right: -20upx;
					font-size: 50upx;
					//top: -10upx;

				}
			}

			&.error {
				color: $uni-color-error;
				font-weight: bold;
				position: relative;

				&::after {
					content: '×';
					display: block;
					position: absolute;
					right: -30upx;
					font-size: 70upx;
					//top: -20upx;
				}
			}
		}
	}

	.answer {
		max-height: 500upx;
		overflow-y: scroll;
		padding: 10px 15px;
		-webkit-overflow-scrolling: touch;

		.item {
			margin: 10upx 0;
		}

		.tit {
			width: 100%;
			padding: 10upx 0;
			border-bottom: 1px solid #ccc;
		}
	}

	.console {
		display: flex;
		position: fixed;
		bottom: 0;
		flex-wrap: wrap;
		justify-content: center;

		&>.autonext {
			width: 100%;
			text-align: center;
		}

		&>button {
			margin: 10upx;
		}

	}

	.topiccard {
		width: 100%;
		height: 500upx;
		// background-color: transparent;
		position: fixed;
		bottom: 90upx;
		padding: 20upx;
		background-color: rgba($color: #fff, $alpha: .8);
		animation: danru2 .5s linear forwards;
		// .back,.list{
		// 	width: 100%;height: 100%;
		// 	position: absolute;
		// 	top: 0;left: 0;

		// }
		// .back{
		// 	background-color: rgba($color: #fff, $alpha: .8);
		// 	filter: blur(15px);
		// 	border-radius: 40upx;

		// }
		.list {
			box-sizing: border-box;
			padding: 0 21upx;
			height: 370upx;
			overflow-y: scroll;
			overflow-x: hidden;
			-webkit-overflow-scrolling: touch;

			.item {
				width: 700upx;
				border-bottom: 1px solid #ccc;
				word-spacing: normal;
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				margin: 0 auto;
				padding: 10upx 0;
				font-size: 35upx;
				line-height: 50upx;
				color: $uni-text-color-grey;

				&:nth-last-child(1) {
					//border-bottom: none;
				}

				&.error {
					color: $uni-color-error;
				}

				&.select {
					color: #000;
				}

				&.active {
					color: $uni-color-primary;
					border-bottom-color: $uni-color-primary;
				}

			}
		}
	}

	#collect {
		//width: 100%;
		padding: 0 20upx;
		text-align: right;
		box-sizing: border-box;
		animation: ic 1s forwards linear;
		margin-left: auto;

		@keyframes ic {
			from {
				transform: scale(1);

			}

			30% {
				transform: scale(1.1) rotateZ(20deg);
			}

			50% {
				transform: scale(.9);
			}

			to {
				transform: scale(1);
			}
		}

		@keyframes ic2 {
			from {
				transform: scale(1);

			}

			30% {
				transform: scale(1.1) rotateZ(20deg);
			}

			50% {
				transform: scale(.9);
			}

			to {
				transform: scale(1);
			}
		}

		&.active {
			animation: ic2 1s forwards linear;
		}
	}
</style>

<template>
	<view class="main">
		<view class="title">{{title}}</view>

		<view class="topic">
			<view class="type">{{['单选题','多选题','判断题'][topic.type]}}</view>
			<view class="content" @touchend="click2"><text>{{topic.content}}</text></view>
			<view id="collect" :class="[topic.collect?'active':'']" @click="collect">
				<uni-icons v-show="topic.collect" class="icon" size="20" type="star-filled" color="#f9d000"></uni-icons>
				<uni-icons v-show="!topic.collect" class="icon" size="20" type="star" color="#888"></uni-icons>
			</view>
		</view>

		<view class="options">
			<view @click="option_sel(i)" class="option"
				:class="options_sel[i]?mode==0||(mode==1&&status==1)?k.correct?'success':'error':'select':'' "
				v-for="k,i in topic.options" :key="i">
				<text>{{tip[i]}}、{{k.text}}</text>
			</view>
		</view>
		<view class="answer card" v-show="showanswer">
			<view class="tit">
				<text style="font-weight: bold;font-size: 40upx;">答案</text>
			</view>

			<view class="item" v-if="k.correct" v-for="k,i in topic.options" :key="i">
				<text>{{k.text}}</text>
			</view>
			<text style="color: #0EA391;">{{topic.analysis}}</text>
		</view>
		<view class="console">
			<view class="autonext">
				<label v-if="mode!=1" @click="setautonext">
					<checkbox :checked="autonext" /><text>答对自动下一题</text>
				</label>
			</view>
			<button type="default" :disabled="topic.id==0" @click="to(topic.id-1)">上一题</button>
			<button type="default" @click="showcard=!showcard">
				<uni-icons type="list"></uni-icons>
			</button>
			<button type="default" :disabled="topic.id==topiccard.length-1" @click="to(topic.id+1)">下一题</button>
		</view>
		<view class="topiccard card" v-show="showcard">
			<!-- <view class="back"></view> -->
			<view>
				<button type="default" @click="sumbit">{{mode==1&&status==0?'提交':'返回题卡查看分数'}}</button>
			</view>
			<view class="list">
				<view class="item" :class="[{'active':topic.id==k.id},k.class]" v-for="k,i in topiccard" :key="i"
					@click="to(k.id)">
					<text>{{k.id+1}}. {{k.content}}</text>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	var c_time = 0;
	var options_sels = [];
	var topics = [];
	var recordid = 0;
	export default {
		data() {
			return {
				title: null,

				tip: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
				mode: 0,
				status: 0,
				autonext: true,
				topic: {
					id: 0,
					type: 1,
					content: '',
					collect: false,
					options: [{
						text: '',

						correct: true
					}, {
						text: '',

						correct: true
					}, {
						text: '',

						correct: false
					}, {
						text: '',
						correct: false
					}],
					analysis: ''
				},
				options_sel: [0, 0, 0, 0],

				topiccard: [{
						id: 0,
						content: '测试题目测试题目测试题目测试题目测试题目测试题目'
					},
					{
						id: 1,
						content: '测试题目2测试题目2测试题目2测试题目2测试题目2测试题目'
					}
				],

				showanswer: false,
				showcard: false,
			};
		},
		onLoad(p) {
			this.title = p.title;
			recordid = p.id;
			this.mode = p.mode;
			this.status = p.status;
			this.gettopics(0, true);

			this.topiccard = getApp().globalData.topiccard;
			if (this.mode == 1 && this.status == 1) {
				this.showanswer = true;
			}
			// console.log(getCurrentPages()[0].$vm.loginbtn)
		},
		onShow() {
			this.autonext = uni.getStorageSync('autonext');
		},
		methods: {
			setautonext() {
				this.autonext = !this.autonext;
				uni.setStorageSync('autonext', this.autonext);
			},
			click2(e) {
				var time = e.timeStamp
				if (time - c_time < 350) {
					this.collect();
				}
				c_time = time;


			},
			collect() {
				var that = this;
				uni.request({
					method: 'POST',
					url: 'https://1312.aiepoch.cn/api/v1/juan/addcollect',
					data: {
						'openid': uni.getStorageSync('openid'),
						'quesdataid': that.topic.qdid,
						'iscollect': !this.topic.collect
					},
					success(res) {
						console.log(res)
						if (res.statusCode == 200) {
							if (res.data.code == 1) {
								that.topic.collect = res.data.data;

							}
						}
					}
				})
			},
			gettopics(i, isjmp = false) {
				//TODO: 获取三组题目 i-1,i,i+1
				//isjmp是否跳转
				var that = this;
				uni.request({
					method: 'GET',
					url: 'https://1312.aiepoch.cn/api/v1/juan/gettopics',
					data: {
						'openid': uni.getStorageSync('openid'),
						'recordid': recordid,
						'i': i
					},
					success(res) {
						console.log(res)
						if (res.statusCode == 200) {
							if (res.data.code == 1) {
								topics = res.data.data.topics;
								options_sels = res.data.data.options_sels;
								if (isjmp) {

									that.topic = topics[1];
									that.options_sel = options_sels[1];
								}

							} else {
								uni.showModal({
									title: '获取题目',
									content: res.data.message,
									showCancel: false
								})
							}
						}
					}
				})
			},
			to(i) {
				//跳转题目
				if (i == this.topic.id) return;
				this.answercount = 0;
				if (this.mode == 0) this.showanswer = false;
				if (i + 1 == this.topic.id) {
					this.tolast();
				} else if (i - 1 == this.topic.id) {
					this.tonext()
				} else {
					this.gettopics(i, true);
				}
			},
			tolast() {
				this.topic = topics[0];
				this.options_sel = options_sels[0];
				this.gettopics(this.topic.id)
			},
			tonext() {
				this.topic = topics[2];
				this.options_sel = options_sels[2];
				this.gettopics(this.topic.id)
			},
			option_sel(i) {
				if (this.mode == 1 && this.status == 1) return;
				var old = this.options_sel[i];
				if (this.topic.type == 1) {
					//多选
					this.options_sel[i] = this.options_sel[i] ? 0 : 1;
				} else {
					for (let j = 0; j < this.topic.options.length; j++) {
						this.options_sel[j] = 0;

					}

					this.options_sel[i] = 1;
				}

				if (this.mode == 0 && this.topic.type != 1 && !this.showanswer) {
					this.showanswer = true;

				}
				if (old == this.options_sel[i]) return;
				var n = 0;
				var str = '';
				var that = this;
				for (let j = 0; j < this.options_sel.length; j++) {
					n += this.options_sel[j];
					str += this.options_sel[j] ? '1' : '0';
				}

				this.options_sel.push(0);
				this.options_sel.pop();
				if (n == 0) {
					str = 'NULL';
					this.topiccard[this.topic.id].class = '';
				} else {
					this.topiccard[this.topic.id].class = 'select';
				}

				uni.request({
					method: 'GET',
					url: 'https://1312.aiepoch.cn/api/v1/juan/updatesel',
					data: {
						'openid': uni.getStorageSync('openid'),
						'recordid': recordid,
						'index': that.topic.id,
						'options': str
					},
					success(res) {
						console.log(res)
						if (res.statusCode == 200) {
							if (res.data.code == -1) {
								uni.showModal({
									title: '系统繁忙',
									content: res.data.message,
									showCancel: false
								})
							} else {
								if (that.mode == 0 && !res.data.data) {
									that.topiccard[that.topic.id].class = 'error';

								} else if (that.mode == 0 && res.data.data && that.autonext && that.topic.id < that
									.topiccard.length - 1) {
									that.tonext();
								} else if (that.mode != 1) {
									that.showanswer = true;
								}

							}
						}
					}
				})
				//TODO: 提交选项
			},
			sumbit() {
				//TODO: 提交答案
				//返回状态及是否可提交
				if (this.mode == 1 && this.status == 0) {
					var that = this;
					uni.request({
						method: 'POST',
						url: 'https://1312.aiepoch.cn/api/v1/juan/sumbit',
						data: {
							'openid': uni.getStorageSync('openid'),
							'recordid': recordid
						}
					})
				}
				uni.navigateBack()
			}

		}
	}
</script>
