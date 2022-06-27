<script>
	export default {
		globalData: {
			topiccard:[]
		},
		onLaunch: function() {
			console.log('App Launch')

		},
		onShow: function() {
			console.log('App Show')

		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* @import '@/uni_modules/uni-scss'; */
	$main_top:60upx;
	$headimg_h:120upx;
	view{
		font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
	}
	.title {
		margin-top: $main_top;
		height: 150upx;
		font-size: 40upx;
		display: flex;
		align-items: center;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		//justify-content: center;

		background-image: linear-gradient(135deg, #fff, #eee, #ccc);
		// background-color: rgba($color: #ccc, $alpha: .1);
		height: 100vh;

	}

	@keyframes danru {
		from {
			opacity: 0;
			top: -20upx;
		}

		to {
			opacity: 1;
			top: 0upx;
		}
	}
@keyframes danru2 {
		from {
			opacity: 0;
			margin-bottom: 40upx;
		}

		to {
			opacity: 1;
			margin-bottom: 20upx;
		}
	}
	.card {
		animation: danru .5s linear forwards;
		border-radius: 40upx;
		// box-shadow: -200upx -5upx 50upx 0 rgba($color: #eee, $alpha: 0.5), 300upx -5upx 50upx 0 rgba($color: #c8eaf8, $alpha: 0.8);
		box-shadow: 0 0 50upx 0 rgba($color: #ccc, $alpha: .3);
		background-color: #fff;
		width: 700upx;
		margin: 20upx 0;
		position: relative;
		opacity: 0;
		padding: 20upx;
		box-sizing: border-box;
	}
</style>
