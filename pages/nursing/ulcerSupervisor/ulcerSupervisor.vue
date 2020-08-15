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
								<input @focus="InputFocus" @blur="InputBlur" v-model="scoreRs" />
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
						<label>压疮性质</label>
						<view class="list-cell-content" @click="showUlcerPicker">
							<view class="uni-input">{{ UlcerObj ? UlcerObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>压疮描述</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row" v-for="(item, i) in UlcerDetails" :key="i">
								<view>
									<view class="uni-input" v-for="(content, j) in item" :key="j" style="display: inline-block;">{{ content }}</view>
								</view>
								<view class="uni-icon uni-icon-clear" style="color: #BEBEBE" @click="deleteItem(i)"></view>
							</view>
							<button class="mini-btn addBtn" size="mini" @click="insertItem">添加</button>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>皮肤转归</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="Option1Change" :checked="OutcomeSkinRadio1Obj.Option1"/>
								<view @click="Option1Click" style="width: 70%;">无压疮发生</view>
							</view>
							
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="Option2Change" :checked="OutcomeSkinRadio1Obj.Option2"/>
								<view @click="Option2Click" style="width: 70%;">有压疮发生</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>类型</label>
								<view class="list-cell-content" @click="showOutcomeSkinRadio2Picker">
									<view class="uni-input">{{ OutcomeSkinRadio2Obj ? OutcomeSkinRadio2Obj.label : '' }}</view>
								</view>
							</view>
							
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="Option3Change" :checked="OutcomeSkinRadio1Obj.Option3"/>
								<view @click="Option3Click" style="width: 70%;">带入压疮</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>类型</label>
								<view class="list-cell-content" @click="showOutcomeSkinRadio3Picker">
									<view class="uni-input">{{ OutcomeSkinRadio3Obj ? OutcomeSkinRadio3Obj.label : '' }}</view>
								</view>
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
							<picker mode="date" :value="Outcome2Date" :start="'1970-01-01'" :end="'2021-12-31'" @change="bindOutcome2DateChange">
								<view class="uni-input">{{ Outcome2Date }}</view>
							</picker>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>更正日期</label>
						<view class="list-cell-content">
							<picker mode="date" :value="ModifyDate" :start="'1970-01-01'" :end="'2021-12-31'" @change="bindModifyDateChange">
								<view class="uni-input">{{ ModifyDate }}</view>
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
	import * as mutationConstants from '../../../store/modules/ulcerSupervisor/mutations.js'
	import * as actionConstants from '../../../store/modules/ulcerSupervisor/actions.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				title: '压疮预报',
				ZYH: '',
				ZYHM: '',
				type: '',
				score: '',
				// rs: '',
				fromAssess: 0,
				inputFocus: false,
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
			};
		},
		computed: {
			...mapGetters([
				'UlcerDetails',
			]),
			...mapGetters({
				now: 'UlcerSupervisorNow',
				themeColor: 'UlcerSupervisorThemeColor',
				pickerValueArray: 'UlcerSupervisorPickerValueArray', 
				mode: 'UlcerSupervisorMode', 
				deepLength: 'UlcerSupervisorDeepLength', 
				pickerValueDefault: 'UlcerSupervisorPickerValueDefault',
				
				AssessScore: 'UlcerSupervisorAssessScore',
				HeadNurseNameObj: 'UlcerSupervisorHeadNurseNameObj',
				SupervisorTypeObj: 'UlcerSupervisorTypeObj',
				InterventionObj: 'UlcerSupervisorInterventionObj',
				UlcerObj: 'UlcerSupervisorUlcerObj',
				OutcomeSkinRadio1Obj: 'UlcerSupervisorOutcomeSkinRadio1Obj',
				OutcomeSkinRadio2Obj: 'UlcerSupervisorOutcomeSkinRadio2Obj',
				OutcomeSkinRadio3Obj: 'UlcerSupervisorOutcomeSkinRadio3Obj',
				Outcome2Obj: 'UlcerSupervisorOutcome2Obj',
				Outcome2Date: 'UlcerSupervisorOutcome2Date',
				ModifyDate: 'UlcerSupervisorModifyDate',
				UlcerItemList: 'UlcerItemList'
			}),
			scoreRs() {
				if (this.type == 'create') {
					return this.fromAssess ? this.score : ''
				} else {
					return this.AssessScore
				}
			}
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 = decodeURIComponent(event.type)
				this.patientInfo = JSON.parse(decodeURIComponent(event.info))
				this.score 		 = event.score ? decodeURIComponent(event.score) : ''
				this.fromAssess  = event.fromAssess ? parseInt(decodeURIComponent(event.fromAssess)) : 0
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.Id
				}
			} catch (error) {
				this.type 		 = event.type
				this.patientInfo = JSON.parse(event.info)
				this.score 		 = event.score ? event.score : ''
				this.fromAssess  = event.fromAssess ? event.fromAssess : 0
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.Id
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			this.$store.dispatch(actionConstants.ULCER_SUPERVISOR_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			insertItem() {
				uni.navigateTo({
					url: "./ulcerItem?UlcerItemList=" + encodeURIComponent(JSON.stringify(this.UlcerItemList))
				})
			},
			deleteItem(index) {
				let self = this
				console.log(index)
				uni.showModal({
					content: '确定删除该压疮描述？',
					success: (res) => {
						if (res.confirm) {
							self.$store.commit(mutationConstants.ULCER_SUPERVISOR_DELETE_ULCER_ITEM, index)
						}
					}
				})
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
			showSupervisorTypePicker() {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_TYPE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showInterventionPicker() {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_INTERVENTION_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showUlcerPicker() {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_ULCER_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			Option1Change(e) {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OPTION1_CHECKBOX_CHANGE, e);
			},
			Option1Click() {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OPTION1_LABEL_CLICK);
			},
			Option2Change(e) {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OPTION2_CHECKBOX_CHANGE, e);
			},
			Option2Click() {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OPTION2_LABEL_CLICK);
			},
			Option3Change(e) {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OPTION3_CHECKBOX_CHANGE, e);
			},
			Option3Click() {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OPTION3_LABEL_CLICK);
			},
			showOutcomeSkinRadio2Picker(){
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OUTCOME_SKIN_RADIO2_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showOutcomeSkinRadio3Picker(){
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OUTCOME_SKIN_RADIO3_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showOutcome2Picker(){
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OUTCOME2_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			bindOutcome2DateChange(e) {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_OUTCOME2_DATE_CHANGE, e.target.value)
			},
			bindModifyDateChange(e) {
				this.$store.commit(mutationConstants.ULCER_SUPERVISOR_MODIFY_DATE_CHANGE, e.target.value)
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.ULCER_SUPERVISOR_SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo, 
					formData: e.detail.value,
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
	.addBtn { background: #32CD32; color: #FFFFFF; margin: 15upx 0 0 20upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
