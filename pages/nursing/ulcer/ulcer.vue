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
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							评估得分
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ AssessScore }}</view>
						</view>
					</view>
					<!-- <view class="uni-list-cell">
						<view class="uni-list-cell-left">
							带入/发生压疮
						</view>
						<view class="list-cell-content" @click="showBringIntoPicker">
							<view class="uni-input">{{ BringIntoObj ? BringIntoObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							护理措施
						</view>
						<view class="list-cell-content">
							<checkbox-group @change="InterventionChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in InterventionOptions" :key="item.value">
									<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
									<view style="width: 250upx;">{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
					</view> -->
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							护士签名
						</view>
						<view class="list-cell-content">
							<input class="uni-input" type="text" v-model="EmployeeName" disabled />
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							护士长签名
						</view>
						<view class="list-cell-content" @click="showHeadNurseNamePicker">
							<view class="uni-input" name="HeadNurseName">{{ HeadNurseNameObj ? HeadNurseNameObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							总护士长签名
						</view>
						<view class="list-cell-content" @click="showHeadNurseNamePicker">
							<view class="uni-input" name="HeadNurseName">{{ HeadNurseNameObj ? HeadNurseNameObj.label : '' }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<text class="tips">备注：1.参考分值：轻度危险19-23分，中度危险13-18分，高度危险6-12分。\n</text>
				<text class="tips">≤18分，提示病人有发生压力性损伤的危险，建议采取预防措施；≤12分达到高危的病人需按流程预报。\n</text>
				<text class="tips">2.评分：首次入院（或转入）、术后当日、病危、严重营养不良（如极度消瘦、恶液质）、局部循环不良（如长期卧床、长时间固定受压、截瘫）、组织修复功能欠佳（如低蛋白血症）。\n</text>
				<text class="tips">3.不评分：发生压力性损伤、带入压力性损伤。\n</text>
				<text class="tips">4.评分：≤18分，记录相应预防护理措施在《护理记录单》，发生或带入压力性损伤者，填写《压力性损伤报告单B》及《压力性损伤评估处理随访单C》，压力性损伤愈合转《压力性损伤危险因素评估单A》。\n</text>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>感觉</label>
						<view class="list-cell-content" @click="showAssessment1Picker">
							<view class="uni-input">{{ Assessment1Obj ? Assessment1Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>潮湿</label>
						<view class="list-cell-content" @click="showAssessment2Picker">
							<view class="uni-input">{{ Assessment2Obj ? Assessment2Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>活动能力</label>
						<view class="list-cell-content" @click="showAssessment3Picker">
							<view class="uni-input">{{ Assessment3Obj ? Assessment3Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>移动力</label>
						<view class="list-cell-content" @click="showAssessment4Picker">
							<view class="uni-input">{{ Assessment4Obj ? Assessment4Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>营养</label>
						<view class="list-cell-content" @click="showAssessment5Picker">
							<view class="uni-input">{{ Assessment5Obj ? Assessment5Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>摩擦力和剪切力</label>
						<view class="list-cell-content" @click="showAssessment6Picker">
							<view class="uni-input">{{ Assessment6Obj ? Assessment6Obj.label : '' }}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-btn-v page uni-padding-wrap buttonFixed">
				<button formType="submit" class="submitBtn">提交</button>
			</view>
		</form>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" 
			@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../../store/modules/ulcer/mutations.js'
	import * as actionConstants from '../../../store/modules/ulcer/actions.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				title: '压疮评估',
				ZYH: '',
				ZYHM: '',
				type: '',
				sm: 0,
				rs: '',
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
			};
		},
		computed: {
			...mapGetters({
				now: 'UlcerNow',
				themeColor: 'UlcerThemeColor',
				pickerValueArray: 'UlcerPickerValueArray', 
				mode: 'UlcerMode', 
				deepLength: 'UlcerDeepLength', 
				pickerValueDefault: 'UlcerPickerValueDefault',
				
				Score: 'UlcerScore',
				BringIntoObj: 'UlcerBringIntoObj',
				InterventionOptions: 'UlcerInterventionOptions',
				HeadNurseNameObj: 'UlcerHeadNurseNameObj',
				Assessment1Obj: 'UlcerAssessment1Obj',
				Assessment2Obj: 'UlcerAssessment2Obj',
				Assessment3Obj: 'UlcerAssessment3Obj',
				Assessment4Obj: 'UlcerAssessment4Obj',
				Assessment5Obj: 'UlcerAssessment5Obj',
				Assessment6Obj: 'UlcerAssessment6Obj',
				haveSupervisor: 'UlcerHaveSupervisor',
				goToSupervisor: 'UlcerGoToSupervisor',
				Intervention: 'UlcerIntervention',
			}),
			AssessScore() {
				let sum = 0
				for (let i in this.Score) {
					if (parseInt(this.Score[i]) !== -1) {
						sum += parseInt(this.Score[i])
					}
				}
				return sum
			},
		},
		watch: {
			goToSupervisor(val) {
				if (val) {
					uni.navigateTo({ 
						url: "../ulcerSupervisor/ulcerSupervisor?type=create&info=" + encodeURIComponent(JSON.stringify(this.patientInfo)) + "&fromAssess=1" +
							"&score=" + this.AssessScore + "&sm=" + this.sm + "&rs=" + this.Intervention
					 })
				}
			},
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 	= decodeURIComponent(event.type)
				this.haveSupervisor = decodeURIComponent(event.haveSupervisor)
				this.patientInfo 	= JSON.parse(decodeURIComponent(event.info))
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.Id
				}
			} catch (error) {
				this.type 		 	= event.type
				this.patientInfo 	= JSON.parse(event.info)
				this.haveSupervisor = event.haveSupervisor
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.Id
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			this.$store.dispatch(actionConstants.ULCER_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			showBringIntoPicker() {
				this.$store.commit(mutationConstants.ULCER_BRING_INTO_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			InterventionChange(e) {
				this.$store.commit(mutationConstants.ULCER_INTERVENTION_CHECKBOX_CHANGE, e);
			},
			showHeadNurseNamePicker() {
				this.$store.commit(mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment1Picker(e) {
				this.$store.commit(mutationConstants.ULCER_ASSESSMENT1_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment2Picker(e) {
				this.$store.commit(mutationConstants.ULCER_ASSESSMENT2_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment3Picker(e) {
				this.$store.commit(mutationConstants.ULCER_ASSESSMENT3_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment4Picker(e) {
				this.$store.commit(mutationConstants.ULCER_ASSESSMENT4_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment5Picker(e) {
				this.$store.commit(mutationConstants.ULCER_ASSESSMENT5_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment6Picker(e) {
				this.$store.commit(mutationConstants.ULCER_ASSESSMENT6_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.ULCER_SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo, 
					AssessScore: this.AssessScore
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
	.tips { padding: 0 30upx;color:#BEBEBE;height: 100upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
