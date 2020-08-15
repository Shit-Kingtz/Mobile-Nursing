<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<form @submit="submitForm" @reset="reset">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							评估时间
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ now }}</view>
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
				</view>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>神志</label>
						<view class="list-cell-content" @click="showConsciousnessTypePicker">
							<view class="uni-input">{{ ConsciousnessTypeObj ? ConsciousnessTypeObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>护理级别</label>
						<view class="list-cell-content" @click="showGradingPicker">
							<view class="uni-input">{{ GradingObj ? GradingObj.label : '' }}</view>
						</view>
					</view>
				</view>
				
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">生命体征</label>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="list-cell-content">
						<view class="uni-list-cell uni-input-row">
							<label>体温（℃）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="BodyTemperature" type="digit" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="BodyTemperature"
									@focus="InputFocus" @blur="InputBlur" />								
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>脉搏（次/分）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="Pulse" type="digit" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="Pulse"
									@focus="InputFocus" @blur="InputBlur" />								
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>呼吸（次/分）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="Breath" type="number" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="Breath"
									@focus="InputFocus" @blur="InputBlur" />								
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>血压（mmHg）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="BloodPressure" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="BloodPressure"
									@focus="InputFocus" @blur="InputBlur" />								
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>血氧饱和度（%）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="Saturation" type="digit" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="Saturation"
									@focus="InputFocus" @blur="InputBlur" />								
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>疼痛评分</label>
							<view class="list-cell-content">
								<input class="uni-input" name="VASScore" type="number" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="VASScore"
									@focus="InputFocus" @blur="InputBlur" />
							</view>
						</view>
					</view>
				</view>
				<view class="uni-padding-wrap">
					<text class="tips">备注：0分（无痛）；1-3分（轻微痛）；4-6分（比较痛）；7-9分（非常痛）；10分（剧痛）\n</text>
				</view>
				
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">基础护理措施</label>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="list-cell-content">
						<view class="uni-list-cell uni-input-row">
							<label>晨晚护理</label>
							<view class="list-cell-content">
								<switch :checked="MENurse" color="#32CD32" @change="MENurseChange" />
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>吸氧（升/分）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="OxygenCure" type="digit" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="OxygenCure"
									@focus="InputFocus" @blur="InputBlur" />
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>皮肤</label>
							<view class="list-cell-content" @click="showSkinStatusPicker">
								<view class="uni-input">{{ SkinStatusObj ? SkinStatusObj.label : '' }}</view>
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>防压伤护理</label>
							<view class="list-cell-content">
								<checkbox-group @change="UlcerNurseChange">
									<label class="uni-list-cell uni-list-cell-pd" v-for="item in UlcerNurseOptions" :key="item.value">
										<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
										<view style="width: 250upx;">{{ item.label }}</view>
									</label>
								</checkbox-group>
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>体位</label>
							<view class="list-cell-content" @click="showPositionPicker">
								<view class="uni-input">{{ PositionObj ? PositionObj.label : '' }}</view>
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>防跌倒护理</label>
							<view class="list-cell-content" @click="showFallNursePicker">
								<view class="uni-input">{{ FallNurseObj ? FallNurseObj.label : '' }}</view>
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>约束肢端血运</label>
							<view class="list-cell-content">
								<checkbox-group @change="BloodSupplyChange">
									<label class="uni-list-cell uni-list-cell-pd" v-for="item in BloodSupplyOptions" :key="item.value">
										<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
										<view style="width: 250upx;">{{ item.label }}</view>
									</label>
								</checkbox-group>
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>导管安全措施</label>
							<view class="list-cell-content">
								<checkbox-group @change="CatheterSafetyChange">
									<label class="uni-list-cell uni-list-cell-pd" v-for="item in CatheterSafetyOptions" :key="item.value">
										<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
										<view style="width: 250upx;">{{ item.label }}</view>
									</label>
								</checkbox-group>
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>饮食</label>
							<view class="list-cell-content" @click="showDietPicker">
								<view class="uni-input">{{ DietObj ? DietObj.label : '' }}</view>
							</view>
						</view>
					</view>
				</view>
				
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">健康指导</label>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<view class="list-cell-content">
							<checkbox-group @change="HeathEducationChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in HeathEducationOptions" :key="item.value">
									<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
									<view style="width: 250upx;">{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
					</view>
				</view>
				
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">治疗及病情观察护理措施效果评价</label>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea @focus="InputFocus" @blur="InputBlur" v-model="Detail"/>
							</view>
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
	import * as mutationConstants from '../../../store/modules/nurseRecording/mutations.js'
	import * as actionConstants from '../../../store/modules/nurseRecording/actions.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker,
		},
		data() {
			return {
				title: '护理记录单',
				ZYH: '',
				ZYHM: '',
				type: '',
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
				inputFocus: false,
			};
		},
		computed: {
			...mapGetters([
				'ConsciousnessTypeObj', 'ConsciousnessTypeOptions', 'GradingObj', 'GradingOptions', 'BodyTemperature', 'Pulse', 'Breath', 'BloodPressure', 'Saturation', 'VASScore',
				'MENurse', 'OxygenCure', 'SkinStatusObj', 'SkinStatusOptions', 'UlcerNurseOptions', 'PositionObj', 'PositionOptions', 'FallNurseObj', 'FallNurseOptions',
				'BloodSupplyOptions', 'CatheterSafetyOptions', 'HeathEducationOptions', 'Detail',
			]),
			...mapGetters({
				themeColor: 'NurseRecordingThemeColor',
				pickerValueArray: 'NurseRecordingPickerValueArray', 
				mode: 'NurseRecordingMode', 
				deepLength: 'NurseRecordingDeepLength', 
				pickerValueDefault: 'NurseRecordingPickerValueDefault',
				NotifyDoctor: 'NurseRecordingNotifyDoctor',
				DietObj: 'NurseRecordingDietObj', 
				DietOptions: 'NurseRecordingDietOptions',
			}),
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 	= decodeURIComponent(event.type)
				this.patientInfo 	= JSON.parse(decodeURIComponent(event.info))
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.Id
				}
			} catch (error) {
				this.type 		 	= event.type
				this.patientInfo 	= JSON.parse(event.info)
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.Id
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			if (this.type == 'edit') {
				this.$store.dispatch(actionConstants.NURSE_RECORDING_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
			}
		},
		methods: {
			InputFocus() {
				this.inputFocus = !this.inputFocus
			},
			InputBlur() {
				this.inputFocus = !this.inputFocus
			},
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			NotifyDoctorChange(e) {
				this.$store.commit(mutationConstants.NURSE_RECORDING_NOTIFY_DOCTOR_SWITCH_CHANGE, e);
			},
			showConsciousnessTypePicker() {
				this.$store.commit(mutationConstants.NURSE_RECORDING_CONSCIOUSNESS_TYPE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showGradingPicker() {
				this.$store.commit(mutationConstants.NURSE_RECORDING_GRADING_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			MENurseChange(e) {
				this.$store.commit(mutationConstants.NURSE_RECORDING_MENURSE_SWITCH_CHANGE, e);
			},
			showSkinStatusPicker() {
				this.$store.commit(mutationConstants.NURSE_RECORDING_SKIN_STATUS_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			UlcerNurseChange(e) {
				this.$store.commit(mutationConstants.NURSE_RECORDING_ULCER_NURSE_CHECKBOX_CHANGE, e);
			},
			showPositionPicker() {
				this.$store.commit(mutationConstants.NURSE_RECORDING_POSITION_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showFallNursePicker() {
				this.$store.commit(mutationConstants.NURSE_RECORDING_FALL_NURSE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			BloodSupplyChange(e) {
				this.$store.commit(mutationConstants.NURSE_RECORDING_BLOOD_SUPPLY_CHECKBOX_CHANGE, e)
			},
			CatheterSafetyChange(e) {
				this.$store.commit(mutationConstants.NURSE_RECORDING_CATHETER_SAFETY_CHECKBOX_CHANGE, e)
			},
			showDietPicker() {
				this.$store.commit(mutationConstants.NURSE_RECORDING_DIET_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.TRANSFER_SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo
				})
			},
		},
		onBackPress(options) {
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
	.list-cell-content { width: 60%; }
	.content .list-cell-content { width: 100%; }
	.content_label { width: 35%; }
	.uni-list-cell > label { width: 60%; }
	.tips { color:#BEBEBE;height: 100upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
