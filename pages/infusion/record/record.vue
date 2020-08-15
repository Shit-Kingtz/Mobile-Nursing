<template>
	<view class="page">
		<banner :patient="info"></banner>
		
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left" style="font-size: larger;">
					当前日期
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="'1970-01-01'" :end="'2021-12-31'" @change="bindDateChange">
						<view class="uni-input" style="font-size: larger;">{{ date }}</view>
					</picker>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="no-data" v-if="noData" style="line-height: 640upx;">
				暂无内容
			</view>
			
			<view class="uni-flex uni-column Record-item" v-for="(line, i) in RecordList" :key="i">
				<view class="flex-item flex-item-V uni-flex uni-row" v-for="(drug, j) in line.DrugList" :key="j">
					<view class="text" style="font-weight: bold;">{{ drug }}</view>
				</view>
				<view class="flex-item flex-item-V uni-flex uni-row">
					<view class="text" style="flex: 5;color: red;">[{{ line.Time }}]</view>
					<view class="text" style="flex: 3;color: red;">{{ line.Type }}</view>
					<view class="text" style="flex: 4;">操作人：{{ line.NurseName }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../../store/modules/infusionRecord/mutations.js'
	import * as actionConstants from '../../../store/modules/infusionRecord/actions.js'
	
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters([
				'info', 'date', 'RecordList', 'noData'
			]),
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
			this.$store.dispatch(actionConstants.RECORD_INIT, {info})
		},
		methods: {
			bindDateChange: function(e) {
				this.$store.commit(mutationConstants.DATE_CHANGE, e.target.value)
				this.$store.dispatch(actionConstants.DATE_CHANGE, {date: e.target.value, params: this.info})
			},
		},
		onBackPress() {
			// 返回按钮监听
			
			// return true;
		}
	}
</script>

<style>
	.content { margin-top: 40upx; }
	.Record-item { background-color: #FFFFFF; padding: 20upx; border-bottom: 1upx solid #d6d6d6 }
	.flex-item { width: 33.3%; text-align: center; }
	.flex-item-V { width: 100%; text-align: center; }
	.text{ padding: 0 20upx; height: 70upx; line-height: 70upx; text-align: center; color: #777; font-size: 26upx; }
</style>
