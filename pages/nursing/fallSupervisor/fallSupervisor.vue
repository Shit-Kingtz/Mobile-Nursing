<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<form @submit="submitForm" @reset="reset">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							预报时间
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ now }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							预报者
						</view>
						<view class="list-cell-content">
							<input class="uni-input" type="text" v-model="EmployeeName" disabled />
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							病区护士长
						</view>
						<view class="list-cell-content" @click="showHeadNurseNamePicker">
							<view class="uni-input" name="HeadNurseName">{{ HeadNurseNameObj ? HeadNurseNameObj.label : '' }}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>诊断</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<text>{{ patientInfo.MSZD }}</text>
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>预报类型</label>
						<view class="list-cell-content" @click="showSupervisorTypePicker">
							<view class="uni-input">{{ SupervisorTypeObj ? SupervisorTypeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>评估分值</label>
						<view class="list-cell-content">
							<view class="uni-input">
								<input @focus="InputFocus" @blur="InputBlur" v-model="scoreRs" name="AssessScoreResult" />
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>护理措施（见护理记录单）</label>
						<view class="list-cell-content" @click="showInterventionPicker">
							<view class="uni-input">{{ InterventionObj ? InterventionObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>有无发生跌倒</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<switch :checked="FallObj.Fall == 1" color="#32CD32" @change="FallChange" />
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<view class="uni-input">
								<input @focus="InputFocus" @blur="InputBlur" name="FallNote" v-model="FallNote" />
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>病人转归</label>
						<view class="list-cell-content" @click="showOutcome2Picker">
							<view class="uni-input">{{ Outcome2Obj ? Outcome2Obj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>转归日期</label>
						<view class="list-cell-content">
							<picker mode="date" :value="Outcome2Date" :start="'1970-01-01'" :end="'2021-12-31'" @change="bindDateChange">
								<view class="uni-input">{{ Outcome2Date }}</view>
							</picker>
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
	import * as mutationConstants from '../../../store/modules/fallSupervisor/mutations.js'
	import * as actionConstants from '../../../store/modules/fallSupervisor/actions.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				title: '跌倒预报',
				ZYH: '',
				ZYHM: '',
				type: '',
				speciallyMonitor: '',
				rs: '',
				fromAssess: 0,
				inputFocus: false,
				
				patientInfo: {},
				assessmentID: '',
				score: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
			};
		},
		computed: {
			...mapGetters({
				now: 'FallSupervisorNow',
				themeColor: 'FallSupervisorThemeColor',
				pickerValueArray: 'FallSupervisorPickerValueArray', 
				mode: 'FallSupervisorMode', 
				deepLength: 'FallSupervisorDeepLength', 
				pickerValueDefault: 'FallSupervisorPickerValueDefault',
				
				AssessScoreResult: 'FallSupervisorAssessScoreResult',
				HeadNurseNameObj: 'FallSupervisorHeadNurseNameObj',
				SupervisorTypeObj: 'FallSupervisorTypeObj',
				InterventionObj: 'FallSupervisorInterventionObj',
				FallObj: 'FallSupervisorFallObj',
				FallNote: 'FallSupervisorFallNote',
				Outcome2Obj: 'FallSupervisorOutcome2Obj',
				Outcome2Date: 'FallSupervisorOutcome2Date'
			}),
			scoreRs() {
				if (this.type == 'create') {
					if (parseInt(this.fromAssess)) {
						let sm = this.speciallyMonitor == '' ? '' : '重点监控'
						let r1 = this.rs.split(',')[0] == 0 ? 'BZ' : ''
						let r2 = this.rs.split(',')[1] == 0 ? 'GW' : ''
						return [this.score, sm, r1, r2].join(' ')
					} else {
						return ''
					}
				} else {
					return this.AssessScoreResult
				}
			},
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 = decodeURIComponent(event.type)
				this.patientInfo = JSON.parse(decodeURIComponent(event.info))
				this.score 			  = event.score ? decodeURIComponent(event.score) : ''
				this.speciallyMonitor = event.sm ? decodeURIComponent(event.sm) : ''
				this.rs 			  = event.rs ? decodeURIComponent(event.rs) : ''
				this.fromAssess		  = event.fromAssess ? decodeURIComponent(event.fromAssess) : 0
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.Id
				}
			} catch (error) {
				this.type 		 = event.type
				this.patientInfo = JSON.parse(event.info)
				this.score 			  = event.score ? event.score : ''
				this.speciallyMonitor = event.sm ? event.sm : ''
				this.rs 			  = event.rs ? event.rs : ''
				this.fromAssess		  = event.fromAssess ? event.fromAssess : 0
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.Id
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			this.$store.dispatch(actionConstants.FALL_SUPERVISOR_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
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
			showSupervisorTypePicker() {
				this.$store.commit(mutationConstants.FALL_SUPERVISOR_TYPE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showInterventionPicker() {
				this.$store.commit(mutationConstants.FALL_SUPERVISOR_INTERVENTION_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showOutcome2Picker() {
				this.$store.commit(mutationConstants.FALL_SUPERVISOR_OUTCOME2_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			FallChange(e) {
				this.$store.commit(mutationConstants.FALL_SUPERVISOR_FALL_SWITCH_CHANGE, e);
			},
			bindDateChange(e) {
				this.$store.commit(mutationConstants.FALL_SUPERVISOR_OUTCOME2_DATE_CHANGE, e.target.value)
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.FALL_SUPERVISOR_SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo, 
					formData: e.detail.value,
					speciallyMonitor: this.speciallyMonitor,
					score: this.score,
					fromAssess: this.fromAssess
				})
			},
			InputFocus() {
				this.inputFocus = !this.inputFocus
			},
			InputBlur() {
				this.inputFocus = !this.inputFocus
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
	.tips { padding: 0 30upx;color:#BEBEBE;height: 100upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
