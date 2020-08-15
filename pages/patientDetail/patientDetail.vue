<template>
    <view class="page">
        <banner :patient="info"></banner>
		
        <view class="article-content">
			<view class="uni-grid-9 uni-common-mt">
				<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in grids" :key="index" @tap="GridClick(index, item.url)">
					<image class="uni-grid-9-image" :src="item.img"></image>
					<text class="uni-grid-9-text">{{ item.name }}</text>
				</view>
			</view>
		</view>
		
    </view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../store/modules/patientDetail/mutations.js'
	import * as actionConstants from '../../store/modules/patientDetail/actions.js'
	
    export default {
        data() {
            return {
				
            }
        },
		computed: {
			...mapGetters([
				'info', 'grids'
			])
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			let info
			try {
				info = JSON.parse(decodeURIComponent(event.detail));
			} catch (error) {
				info = JSON.parse(event.detail);
			}
			
			this.$store.commit(actionConstants.PATIENT_INIT, {info})
		},
		methods: {
			actionSheetTap(url) {
				uni.showActionSheet({
					itemList: ['长期医嘱', '临时医嘱'],
					success: (e) => {
						if (e.tapIndex == 0) {
							// 长期医嘱
							uni.navigateTo({ url: url + "?detail=" + encodeURIComponent(JSON.stringify(this.info)) + "&type=SO"	})
						} else {
							// 临时医嘱
							uni.navigateTo({ url: url + "?detail=" + encodeURIComponent(JSON.stringify(this.info)) + "&type=STAT" })
						}
						
					}
				})
			},
			GridClick(index, url) {
				if (index == 6) {
					this.actionSheetTap(url)
				} else {
					uni.navigateTo({ url: url + "?detail=" + encodeURIComponent(JSON.stringify(this.info)) })
				}
				
			}
		},
		onBackPress() {
			// 返回按钮监听
			
			// return true;
		}
    }
</script>

<style>
	.article-content { overflow: hidden; font-size: 30upx; margin-bottom: 30upx; }
</style>