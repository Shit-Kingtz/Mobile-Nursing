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
							入本科室日期
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ now }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							提供资料者
						</view>
						<view class="list-cell-content">
							<input class="uni-input" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" @focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell" style="padding: 22upx 0;">
						<view class="uni-list-cell-left">
							通知医生
						</view>
						<view class="list-cell-content">
							<switch :checked="NotifyDoctor" color="#32CD32" @change="NotifyDoctorChange" />
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
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">护理体检</label>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>神志</label>
						<view class="list-cell-content" @click="showConsciousnessPicker">
							<view class="uni-input">{{ ConsciousnessObj ? ConsciousnessObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>沟通</label>
						<view class="list-cell-content" @click="showCommunicationPicker">
							<view class="uni-input">{{ CommunicationObj ? CommunicationObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>肢体活动</label>
						<view class="list-cell-content" @click="showPhysicalActivityPicker">
							<view class="uni-input">{{ PhysicalActivityObj ? PhysicalActivityObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="PhysicalActivityObj && PhysicalActivityObj.PhysicalActivity == 3">
						<label>肢体活动其他备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="PhysicalActivityPart" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="PhysicalActivityObj.PhysicalActivityNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>吞咽</label>
						<view class="list-cell-content" @click="showSwallowingPicker">
							<view class="uni-input">{{ SwallowingObj ? SwallowingObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>视力</label>
						<view class="list-cell-content" @click="showVisionPicker">
							<view class="uni-input">{{ VisionObj ? VisionObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="VisionObj && VisionObj.Vision == 2">
						<label>视力异常备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="VisionNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="VisionObj.VisionNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>听力</label>
						<view class="list-cell-content" @click="showHearingPicker">
							<view class="uni-input">{{ HearingObj ? HearingObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="HearingObj && HearingObj.Hearing == 2">
						<label>听力异常备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="HearingNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="HearingObj.HearingNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>皮肤</label>
						<view class="list-cell-content" @click="showSkinPicker">
							<view class="uni-input">{{ SkinObj ? SkinObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="SkinObj && SkinObj.Skin == 3">
						<label>皮肤异常备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="SkinNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="SkinObj.SkinNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>导管</label>
						<view class="list-cell-content">
							<switch :checked="CatheterObj && CatheterObj.Catheter == 2" color="#32CD32" @change="CatheterChange" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="CatheterObj && CatheterObj.Catheter == 2">
						<label>导管备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="CatheterNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="CatheterObj.CatheterNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>过敏史</label>
						<view class="list-cell-content">
							<switch :checked="AllergicObj && AllergicObj.Allergic == 2" color="#32CD32" @change="AllergicChange" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="AllergicObj && AllergicObj.Allergic == 2">
						<label>过敏史备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="AllergicNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="AllergicObj.AllergicNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
				</view>
				
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">生活状态</label>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>入院方式</label>
						<view class="list-cell-content" @click="showHospitalizedTypePicker">
							<view class="uni-input">{{ HospitalizedTypeObj ? HospitalizedTypeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>嗜好</label>
						<view class="list-cell-content" @click="showHobbyPicker">
							<view class="uni-input">{{ HobbyObj ? HobbyObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>饮食</label>
						<view class="list-cell-content" @click="showDietPicker">
							<view class="uni-input">{{ DietObj ? DietObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="DietObj && DietObj.Diet == 7">
						<label>饮食其他备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="DietNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="DietObj.DietNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>排尿方式</label>
						<view class="list-cell-content" @click="showUrinationWaysPicker">
							<view class="uni-input">{{ UrinationWaysObj ? UrinationWaysObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>排便方式</label>
						<view class="list-cell-content" @click="showDefecationWaysPicker">
							<view class="uni-input">{{ DefecationWaysObj ? DefecationWaysObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>生活自理</label>
						<view class="list-cell-content" @click="showSelfCarePicker">
							<view class="uni-input">{{ SelfHelpObj ? SelfHelpObj.label : '' }}</view>
						</view>
					</view>
				</view>
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
	import * as mutationConstants from '../../../store/modules/inPatient/mutations.js'
	import * as actionConstants from '../../../store/modules/inPatient/actions.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker,
		},
		data() {
			return {
				title: '入院护理',
				ZYH: '',
				ZYHM: '',
				type: '',
				stepName: ['护理体检', '生活状态'],
				tabIndex: 0,
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
				
				inputFocus: false,
				requiredColor: ''
			};
		},
		computed: {
			...mapGetters([
				'ConsciousnessObj', 'ConsciousnessOptions', 'CommunicationObj', 'CommunicationOptions', 'PhysicalActivityObj', 'PhysicalActivityOptions', 'SwallowingObj', 'SwallowingOptions', 
				'VisionObj', 'VisionOptions', 'HearingObj', 'HearingOptions', 'SkinObj', 'SkinOptions', 'CatheterObj', 'AllergicObj',
				'HospitalizedTypeObj', 'HospitalizedTypeOptions', 'HobbyObj', 'HobbyOptions', 'DietObj', 'DietOptions', 'UrinationWaysObj', 'UrinationWaysOptions', 
				'DefecationWaysObj', 'DefecationWaysOptions', 'SelfHelpObj', 'SelfHelpOptions',
			]),
			...mapGetters({
				now: 'now',
				HeadNurseNameObj: 'HeadNurseNameObj', 
				themeColor: 'themeColor',
				pickerValueArray: 'pickerValueArray', 
				mode: 'mode', 
				deepLength: 'deepLength', 
				pickerValueDefault: 'pickerValueDefault',
				
				NotifyDoctor: 'NotifyDoctor',
			})
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 = decodeURIComponent(event.type)
				this.patientInfo = JSON.parse(decodeURIComponent(event.info))
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.AdmissionID
				}
			} catch (error) {
				this.type 		 = event.type
				this.patientInfo = JSON.parse(event.info)
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.AdmissionID
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			this.$store.dispatch(actionConstants.INPATIENT_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			InputFocus() {
				this.inputFocus = !this.inputFocus
			},
			InputBlur() {
				this.inputFocus = !this.inputFocus
			},
			NotifyDoctorChange(e) {
				this.$store.commit(mutationConstants.INPATIENT_NOTIFY_DOCTOR_SWITCH_CHANGE, e);
			},
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			showHeadNurseNamePicker() {
				this.$store.commit(mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showConsciousnessPicker() {
				this.$store.commit(mutationConstants.INPATIENT_CONSCIOUSNESS_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showCommunicationPicker() {
				this.$store.commit(mutationConstants.INPATIENT_COMMUNICATION_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showPhysicalActivityPicker() {
				this.$store.commit(mutationConstants.INPATIENT_PHYSICAL_ACTIVITY_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showSwallowingPicker() {
				this.$store.commit(mutationConstants.INPATIENT_SWALLOWING_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showVisionPicker() {
				this.$store.commit(mutationConstants.INPATIENT_VISION_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showHearingPicker() {
				this.$store.commit(mutationConstants.INPATIENT_HEARING_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showSkinPicker() {
				this.$store.commit(mutationConstants.INPATIENT_SKIN_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			CatheterChange(e) {
				this.$store.commit(mutationConstants.INPATIENT_CATHETER_SWITCH_CHANGE, e);
			},
			AllergicChange(e) {
				this.$store.commit(mutationConstants.INPATIENT_ALLERGIC_SWITCH_CHANGE, e);
			},
			showHospitalizedTypePicker() {
				this.$store.commit(mutationConstants.INPATIENT_HOSPITALIZED_TYPE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showHobbyPicker() {
				this.$store.commit(mutationConstants.INPATIENT_HOBBY_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showDietPicker() {
				this.$store.commit(mutationConstants.INPATIENT_DIET_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showUrinationWaysPicker() {
				this.$store.commit(mutationConstants.INPATIENT_URINATION_WAYS_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showDefecationWaysPicker() {
				this.$store.commit(mutationConstants.INPATIENT_DEFECATION_WAYS_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showSelfCarePicker() {
				this.$store.commit(mutationConstants.INPATIENT_SELF_CARE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			submitForm(e) {
				if (!this.HeadNurseNameObj.HeadNurseName) {
					uni.showToast({ title: '护士长签名必填', icon: "none" })
					uni.pageScrollTo({ scrollTop: 0, duration: 300 })
					this.requiredColor = 'red'
					return false
				}
				
				this.$store.dispatch(actionConstants.SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo, 
					formData: e.detail.value,
					BMI: this.$refs.selfHelp.BMI, 
					BMIResult: this.$refs.selfHelp.BMIResult,
				})
			},
		},
		onBackPress(options) {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
				return true
			}
// 			if (this.$refs.mpvuePicker.showPicker) {
// 				this.$refs.mpvuePicker.pickerCancel()
// 				return true				// 阻止返回
// 			} else if (this.showMask) {
// 				this.showMask = false
// 				return true
// 			} else {
// 				uni.showModal({
// 					content: '确定离开页面？',
// 					success: (res) => {
// 						if (res.confirm) {
// 							console.log('用户点击确定')
// 							return false
// 						} else if (res.cancel) {
// 							console.log('用户点击取消')
// 						}
// 					}
// 				})
// 				
// 				return true
// 			}
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
	.list-cell-content { width: 60%; }
	.content .list-cell-content { width: 100%; }
	.content_label { width: 35%; }
	.uni-list-cell > label { width: 60%; }
	.tips { padding: 0 30upx;color:#BEBEBE;height: 100upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
