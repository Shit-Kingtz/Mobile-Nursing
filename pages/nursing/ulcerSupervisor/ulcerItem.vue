<template>
	<view>
		<form @submit="submitUlcerItem" @reset="reset">
			<view class="uni-list uni-input-group uni-common-mt">
				<view class="uni-list-cell uni-input-row">
					<label>日期</label>
					<view class="list-cell-content">
						<picker mode="date" :value="Date" :start="'1970-01-01'" :end="'2021-12-31'" @change="bindUlcerItemDateChange">
							<view class="uni-input">{{ Date }}</view>
						</picker>
					</view>
				</view>
				<view class="uni-list-cell uni-input-row">
					<label>压疮部位</label>
					<view class="list-cell-content">
						<input class="uni-input" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="UlcerItem.UlcerPart"/>
					</view>
				</view>
				<view class="uni-list-cell uni-input-row">
					<label>压疮面积（cm）</label>
					<view class="list-cell-content">
						<input class="uni-input" type="number" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="UlcerItem.UlcerArea"/>
					</view>
				</view>
				<view class="uni-list-cell uni-input-row">
					<label>压疮分期</label>
					<view class="list-cell-content" @click="showStagePicker">
						<view class="uni-input">{{ StageText }}</view>
					</view>
				</view>
				<view class="uni-list-cell uni-input-row">
					<label>分泌物</label>
					<view class="list-cell-content">
						<input class="uni-input" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="UlcerItem.Secretion"/>
					</view>
				</view>
				<view class="uni-btn-v" style="padding: 100upx 30upx 0 30upx;">
					<button formType="reset" type="default">重置</button>
					<button formType="submit" class="submitBtn">提交</button>
				</view>
			</view>
		</form>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" 
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../../store/modules/ulcerSupervisor/mutations.js'
	import * as actionConstants from '../../../store/modules/ulcerSupervisor/actions.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	import kftools from '../../../common/kftools.js'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				UlcerItemList: [],
			};
		},
		computed: {
			...mapGetters({
				themeColor: 'UlcerSupervisorThemeColor',
				pickerValueArray: 'UlcerSupervisorPickerValueArray', 
				mode: 'UlcerSupervisorMode', 
				deepLength: 'UlcerSupervisorDeepLength', 
				pickerValueDefault: 'UlcerSupervisorPickerValueDefault',
				
				StageText: 'UlcerItemStageText',
				StageOptions: 'UlcerItemStageOptions',
				
			}),
			...mapGetters([
				'UlcerSupervisorNow', 'UlcerItem'
			]),
			Date() {
				return kftools.formatDate(this.UlcerSupervisorNow, 'yyyy-MM-dd')
			}
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.UlcerItemList = JSON.parse(decodeURIComponent(event.UlcerItemList));
			} catch (error) {
				this.UlcerItemList = JSON.parse(event.UlcerItemList);
			}
			
			this.$store.commit(mutationConstants.ULCER_ITEM_FORM_RESET)
		},
		methods: {
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			showStagePicker(e) {
				this.$store.commit(mutationConstants.ULCER_ITEM_STAGE_PICKER_OPEN)
				this.$refs.mpvuePicker.show()
			},
			submitUlcerItem() {
				let self = this
				uni.showModal({
					content: '确认提交该压疮描述？',
					success: (res) => {
						if (res.confirm) {
							self.$store.commit(mutationConstants.ULCER_ITEM_SUBMIT, { date: self.Date, item: self.UlcerItem })
							self.UlcerItemList.push(self.UlcerItem)
							self.$store.commit(mutationConstants.ULCER_ITEM_RETURN_SKINLIST, self.UlcerItemList)
							uni.navigateBack({ delta: 1 })
						}
					}
				})
			},
			reset() {
				this.$store.commit(mutationConstants.ULCER_ITEM_FORM_RESET)
			}
		},
	}
</script>

<style>
	.list-cell-content { width: 60%; }
	.list-cell-content .uni-textarea { width: 90%; margin-left: 15upx; }
</style>
