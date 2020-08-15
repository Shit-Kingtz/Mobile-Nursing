<template>
	<view class="uni-steps" style="margin-top: 30upx;padding-bottom: 0;" :style="{ height: componentHeight }">
		<view v-for="(item, i) in stepName" :key="i" :class="['step', tabIndex == i ? 'current' : '', i < stepName.length - 1 ? '' : 'last']" @click="tapTab(i)" >
			<view class="step-circle">{{ i + 1 }}</view>
			<view class="step-content">
				<view class="step-title">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "step",
		props: {
			tabIndex: {
				type: Number,
				default: 0
			},
			stepName: {
				type: Array,
				default: function(e) {
					return []
				}
			}
		},
		computed: {
			componentHeight() {
				let length = this.stepName.length,
					singleHeight = uni.upx2px(60)
				return length % 3 === 0 ? singleHeight * (length / 3) : singleHeight * (length / 3 + 1) + 'px'
			}
		},
		methods: {
			tapTab(index) {
				if (this.tabIndex === index) {
					return false
				} else {
					this.tabIndex = index
				}
				
				this.$emit('updateTabIndex', this.tabIndex)
			}
		}
	}
</script>

<style>
	.uni-steps .step-circle{width:50upx; height:50upx; border-radius:50upx; background:#BEBEBE; justify-content:center; line-height:50upx; flex-shrink:0; margin-right:15upx; color:#fff; font-size:28upx;}
	.uni-steps .step-content{width:100%; height:22upx;border-bottom:1px solid #BEBEBE;}
	.uni-steps .last > .step-content{border-bottom:1px solid #efeff4;}
	.uni-steps .step-title{line-height:50upx; height:50upx; background:#efeff4; width:auto; overflow:hidden; padding-right:8upx;}
	.uni-steps .current .step-circle{background:#32CD32; color:#FFFFFF;}
	.uni-steps .current .step-title{color:#32CD32;}
</style>
