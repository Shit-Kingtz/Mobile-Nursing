<template>
	<view>
		<form @submit="submitSkin" @reset="reset">
			<view class="uni-list uni-input-group uni-common-mt">
				<view class="uni-list-cell uni-input-row">
					<label>部位</label>
					<view class="list-cell-content">
						<input class="uni-input" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="SkinItem.SkinPart"/>
					</view>
				</view>
				<view class="uni-list-cell uni-input-row">
					<label>面积</label>
					<view class="list-cell-content">
						<view class="uni-list-cell uni-input-row">
							<label>cm²</label>
							<view class="list-cell-content">
								<input class="uni-input" name="" type="number" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="SkinItem.SkinArea"/>
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>cm</label>
							<view class="list-cell-content">
								<input class="uni-input" type="number" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="SkinItem.SkinArea1"/>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list-cell uni-input-row">
					<label>分期</label>
					<view class="list-cell-content" @click="showStagePicker">
						<view class="uni-input">{{ StageText }}</view>
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
	import * as mutationConstants from '../../../store/modules/inPatient/mutations.js'
	import * as actionConstants from '../../../store/modules/inPatient/actions.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				skinList: [],
			};
		},
		computed: {
			...mapGetters([
				'themeColor','pickerValueArray', 'mode', 'deepLength', 'pickerValueDefault',
				'StageText', 'StageOptions', 'SkinItem'
			])
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.skinList = JSON.parse(decodeURIComponent(event.skinList));
			} catch (error) {
				this.skinList = JSON.parse(event.skinList);
			}
			
			this.$store.commit(mutationConstants.SKIN_ITEM_FORM_RESET)
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
				this.$store.commit(mutationConstants.SKIN_ITEM_STAGE_PICKER_OPEN)
				this.$refs.mpvuePicker.show()
			},
			submitSkin() {
				let self = this
				uni.showModal({
					content: '确认提交该皮肤状况？',
					success: (res) => {
						if (res.confirm) {
							self.$store.commit(mutationConstants.SKIN_ITEM_SUBMIT, self.SkinItem)
							self.skinList.push(self.SkinItem)
							self.$store.commit(mutationConstants.SKIN_ITEM_RETURN_SKINLIST, self.skinList)
							uni.navigateBack({ delta: 1 })
						}
					}
				})
			},
			reset() {
				this.$store.commit(mutationConstants.SKIN_ITEM_FORM_RESET)
			}
		},
	}
</script>

<style>
	.list-cell-content { width: 60%; }
	.list-cell-content .uni-textarea { width: 90%; margin-left: 15upx; }
</style>
