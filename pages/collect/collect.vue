<template>
	<view class="main">
		<view class="title">收藏题目</view>
		<view id="menu">
			<view class="item" @click="index=i" :class="{'active':index==i}" v-for="item,i in qts" :key="i">
				{{item.text}}
			</view>

		</view>
		<swiper id="view" :indicator-dots="false" :autoplay="false" :duration="500" :current="index" @change="change">
			<swiper-item class="item" v-for="item,i in qts" :key="i">
				<view class="swiper-item">
					<view class="ques" :style="{'height':quesi==i?k.h:''}" :id="'ques_'+k.id" @click="op(i)"
						v-for="k,i in quesdata[item.value]" :key="i">
						<view class="tit"><text>{{i+1}}、{{k.content}}</text></view>
						<view class="detail" :class="{'active':quesi==i}">
							<view class="content"><text>{{k.content}}</text></view>
							<view><text>{{k.answer}}</text></view>
							<view style="color: #0EA391;"><text>{{k.analysis}}</text></view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				quesi: -1,
				qts: [],
				quesdata: null

			};
		},
		onLoad(p) {
			this.update();
		},
		methods: {
			update() {
				uni.showLoading({
					title: '获取题目收藏夹',
					mask: true
				});
				var that = this;
				uni.request({
					method: 'GET',
					url: 'https://1312.aiepoch.cn/api/v1/juan/getcollect',
					data: {
						'openid': uni.getStorageSync('openid')
					},
					success(res) {
						console.log(res)
						if (res.statusCode == 200) {
							if (res.data.code == 1) {
								that.qts = res.data.data.qts;
								that.quesdata = res.data.data.quesdata;

							} else {
								uni.showModal({
									title: '获取收藏',
									content: res.data.message,
									showCancel: false,
									success() {
										uni.navigateBack({
											delta: 1
										})();
									}
								})

							}
						}
					},
					complete() {
						uni.hideLoading();
					}
				})
			},
			change(e) {
				this.index = e.detail.current;
				if (this.quesdata[this.qts[this.index]['value']]) {
					console.log(this.quesdata[this.qts[this.index]['value']])
				}
			},
			op(i) {
				if (this.quesi == i) {
					this.quesi = -1;
				} else {
					//var str=(/[]/g).exec()

					var tmp = this.quesdata[this.qts[this.index]['value']][i];
					const query = uni.createSelectorQuery().in(this);
					query.select('#ques_' + tmp.id + '>.detail').boundingClientRect(data => {
						console.log("得到布局位置信息" + JSON.stringify(data));
						console.log("节点离页面顶部的距离为" + data.top);
						tmp.h = uni.upx2px(125) + data.height + 'px';
						this.quesi = i
					}).exec();
					


				}

			}
		}
	}
</script>

<style lang="scss">
	
	#menu {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		padding: 20upx 0;
		width: 100%;
		overflow-x: scroll;
-webkit-overflow-scrolling: touch;
		.item {
			color: #888;
			margin: 0 20upx;
			padding: 10upx 15upx;

			&.active {

				color: $uni-color-primary;
			}
		}

	}

	#view {
		width: 100%;
		height: calc(100vh - 370upx);

		.item {
			overflow-y: scroll;
			padding: 20upx;
			box-sizing: border-box;
			font-size: 35upx;
-webkit-overflow-scrolling: touch;
			.ques {
				height: 115upx;
				overflow: hidden;
				transition: .5s;
			}
		}

		.tit {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 700upx;
			height: 75upx;
			border-radius: 20upx;
			// box-shadow: -200upx -5upx 50upx 0 rgba($color: #eee, $alpha: 0.5), 300upx -5upx 50upx 0 rgba($color: #c8eaf8, $alpha: 0.8);
			box-shadow: 0 0 50upx 0 rgba($color: #ccc, $alpha: .3);
			background-color: #fff;
			margin: 20upx 0;
			position: relative;
			padding: 20upx;
			box-sizing: border-box;

		}

		.detail {
			&>.content {
				font-weight: 700;
			}

			width: 700upx;
			word-break: break-all;

			user-select:text;
			white-space: pre-wrap;
			padding: 0 20upx;
			box-sizing: border-box;
			width: 700upx;

			&.active {
				overflow-y: scroll;
				-webkit-overflow-scrolling: touch
			}
		}
	}
</style>
