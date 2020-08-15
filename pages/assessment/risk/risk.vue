<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<form @submit="submitForm" @reset="reset">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							采集时间
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ now }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							护士签名
						</view>
						<view class="list-cell-content">
							<input class="uni-input" type="text" v-model="EmployeeName" disabled />
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left" :style="{ color: requiredColor }">
							护士长签名
						</view>
						<view class="list-cell-content" @click="showHeadNurseNamePicker">
							<view class="uni-input" name="HeadNurseName">{{ HeadNurseNameObj ? HeadNurseNameObj.label : '' }}</view>
						</view>
					</view>
				</view>
				
				<step :tabIndex="tabIndex" :stepName="stepName" @updateTabIndex="updateTabIndex"></step>
				
				<swiper :current="tabIndex" class="swiper-box" :duration="300" skip-hidden-item-layout
					@change="changeTab" style="height: 3500upx">
					<swiper-item>
						<disease-tab ref="disease" @showPicker="showPicker" @InputFocusOrBlur="InputFocusOrBlur"></disease-tab>
					</swiper-item>
					<swiper-item>
						<safe-tab ref="safe" @showPicker="showPicker" @InputFocusOrBlur="InputFocusOrBlur"></safe-tab>
					</swiper-item>
				</swiper>
			</view>
		
			<view class="uni-btn-v page uni-padding-wrap buttonFixed" v-if="!inputFocus">
				<button formType="submit" class="submitBtn">提交</button>
			</view>
		</form>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" 
			@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../../store/modules/risk/mutations.js'
	import * as actionConstants from '../../../store/modules/risk/actions.js'
	import Step from '../../../components/step.vue'
	import diseaseTab from '../../../components/risk/diseaseTab.vue'
	import SafeTab from '../../../components/risk/safeTab.vue'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'

	export default {
		components: {
			Step,
			diseaseTab,
			SafeTab,
			mpvuePicker,
		},
		data() {
			return {
				title: '风险评估',
				ZYH: '',
				ZYHM: '',
				type: '',
				stepName: ['病情风险', '安全风险'],
				tabIndex: 0,
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
				inputFocus: false,
				requiredColor: ''
			};
		},
		computed: {
			...mapGetters({
				now: 'RiskNow',
				themeColor: 'RiskThemeColor',
				pickerValueArray: 'RiskPickerValueArray', 
				mode: 'RiskMode', 
				deepLength: 'RiskDeepLength', 
				pickerValueDefault: 'RiskPickerValueDefault',
				
				HeadNurseNameObj: 'RiskHeadNurseNameObj', 
			}),
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 = decodeURIComponent(event.type)
				this.patientInfo = JSON.parse(decodeURIComponent(event.info))
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.ICUriskevaluationID
				}
			} catch (error) {
				this.type 		 = event.type
				this.patientInfo = JSON.parse(event.info)
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.ICUriskevaluationID
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			this.$store.dispatch(actionConstants.RISK_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			InputFocusOrBlur() {
				this.inputFocus = !this.inputFocus
			},
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			updateTabIndex(index) { 	// 更新step组件传来的数据
				this.tabIndex = index
			},
			changeTab(e) {
				this.tabIndex = e.detail.current
			},
			showPicker(data) {
				this.themeColor = data.RiskThemeColor
				this.pickerValueArray = data.RiskPickerValueArray
				this.mode = data.RiskMode
				this.deepLength = data.RiskDeepLength
				this.pickerValueDefault = data.RiskPickerValueDefault
				
				this.$refs.mpvuePicker.show()
			},
			showHeadNurseNamePicker() {
				this.$store.commit(mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			submitForm(e) {
				if (!this.HeadNurseNameObj.HeadNurseName) {
					uni.showToast({ title: '护士长签名必填', icon: "none" })
					uni.pageScrollTo({ scrollTop: 0, duration: 300 })
					this.requiredColor = 'red'
					return false
				}
				
				this.$store.dispatch(actionConstants.RISK_SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo
				})
			},
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
				return true
			}
		},
		// 监听页面卸载
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
				return true
			}
		}
	}
</script>

<style>
	.uni-list-cell > label { width: 60%; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
