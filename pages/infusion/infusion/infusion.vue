<template>
	<view>
		<banner :patient="info"></banner>
		
		<view class="content">
			<view class="uni-flex uni-row">
				<view class="infusion-label" style="color: orange;">● 未输液</view>
				<view class="infusion-label" style="color: red;">● 正在输液</view>
				<view class="infusion-label" style="color: #777;">● 完成输液</view>
			</view>
			
			<view class="no-data" v-if="hasCard">
				暂无内容
			</view>
					
			<view class="uni-flex uni-column Card-item" v-for="(item, i) in CardList" :key="i">
				<view class="flex-item flex-item-V uni-flex uni-row">
					<view class="text" style="width: 450upx; font-weight: bold;">名称</view>
					<view class="text" style="flex: 1; font-weight: bold">用法</view>
					<view class="text" style="flex: 1; font-weight: bold">用量</view>
				</view>
				<view class="flex-item flex-item-V uni-flex uni-row" v-for="(data, j) in item.Content" :key="j">
					<view class="text" style="width: 450upx;" :style="{ color: item.StatusColor }">{{ data.name }}</view>
					<view class="text" style="flex: 1;" :style="{ color: item.StatusColor }">{{ data.method }}</view>
					<view class="text" style="flex: 1;" :style="{ color: item.StatusColor }">{{ data.dosage }}</view>
				</view>
				<view class="flex-item flex-item-V uni-flex uni-row">
					<view class="text" style="width: 150upx; font-weight: bold">扫描时间</view>
					<view class="text" style="width: 300upx;" :style="{ color: item.StatusColor }">{{ item.ScanTime }}</view>
					<view class="text" style="flex: 1; font-weight: bold">频次</view>
					<view class="text" style="flex: 1;" :style="{ color: item.StatusColor }">{{ item.SYPC }}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../../store/modules/infusion/mutations.js'
	import * as actionConstants from '../../../store/modules/infusion/actions.js'
	
	
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			hasCard() {
				return this.CardList.length == 0
			},
			...mapGetters([
				'info', 'Today', 'CardList', 'ListAfterSearch',
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
			console.log(JSON.stringify(info))
			this.$store.dispatch(actionConstants.CARD_INIT, {info})
		},
		methods: {
			
		},
		onBackPress() {
			// 返回按钮监听
			
			// return true;
		}
	}
</script>

<style>
	.content { margin-bottom: 50upx; height: 500upx;}
	.infusion-label { padding: 20upx; }
	.Card-item { background-color: #FFFFFF; padding: 20upx; }
	.flex-item { width: 33.3%; text-align: center; }
	.flex-item-V { width: 100%; text-align: center; }
	.text{ padding: 0 20upx; height: 70upx; line-height: 70upx; text-align: center; color: #777; font-size: 26upx; box-sizing: border-box; border: 2upx solid #ebebeb; }
</style>
