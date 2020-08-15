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
							总评分
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ AssessScore }}</view>
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
			<view class="uni-padding-wrap">
				<text class="tips">评估对象：病危、病重及病情有变化患者。\n</text>
				<text class="tips">评估要求：每日评估，病情有变化患者及时记录。\n</text>
				<text class="tips">工作要求：1.评分≥4分或5分：值班医生需评估病人情况，按需处理（30min内）。\n</text>
				<text class="tips">2.评分>6分：由部门内较有经验的医生做初步评估，必要时咨询其他临床部门。\n</text>
				<text class="tips">3.评分≥6分：护士须及时报告医生，护士增加巡视及观察病情的次数（15min左右）。</text>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>脉搏（/min）</label>
						<view class="list-cell-content" @click="showAssessment1Picker">
							<view class="uni-input">{{ Assessment1Obj ? Assessment1Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>呼吸（/min）</label>
						<view class="list-cell-content" @click="showAssessment2Picker">
							<view class="uni-input">{{ Assessment2Obj ? Assessment2Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>体温（℃）</label>
						<view class="list-cell-content" @click="showAssessment3Picker">
							<view class="uni-input">{{ Assessment3Obj ? Assessment3Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>清醒程度</label>
						<view class="list-cell-content" @click="showAssessment4Picker">
							<view class="uni-input">{{ Assessment4Obj ? Assessment4Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>收缩压</label>
						<view class="list-cell-content" @click="showAssessment5Picker">
							<view class="uni-input">{{ Assessment5Obj ? Assessment5Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>排尿（ml/h）</label>
						<view class="list-cell-content" @click="showAssessment6Picker">
							<view class="uni-input">{{ Assessment6Obj ? Assessment6Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>SaO2</label>
						<view class="list-cell-content" @click="showAssessment7Picker">
							<view class="uni-input">{{ Assessment7Obj ? Assessment7Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>血糖（mmol）</label>
						<view class="list-cell-content" @click="showAssessment8Picker">
							<view class="uni-input">{{ Assessment8Obj ? Assessment8Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>疼痛</label>
						<view class="list-cell-content" @click="showAssessment9Picker">
							<view class="uni-input">{{ Assessment9Obj ? Assessment9Obj.label : '' }}</view>
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
	import * as mutationConstants from '../../../store/modules/MEWS/mutations.js'
	import * as actionConstants from '../../../store/modules/MEWS/actions.js'
	
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				title: 'MEWS',
				ZYH: '',
				ZYHM: '',
				type: '',
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
			};
		},
		computed: {
			...mapGetters({
				now: 'MEWSNow',
				themeColor: 'MEWSThemeColor',
				pickerValueArray: 'MEWSPickerValueArray', 
				mode: 'MEWSMode', 
				deepLength: 'MEWSDeepLength', 
				pickerValueDefault: 'MEWSPickerValueDefault',
				
				Score: 'MEWSScore',
				Assessment1Obj: 'MEWSAssessment1Obj',
				Assessment2Obj: 'MEWSAssessment2Obj',
				Assessment3Obj: 'MEWSAssessment3Obj',
				Assessment4Obj: 'MEWSAssessment4Obj',
				Assessment5Obj: 'MEWSAssessment5Obj',
				Assessment6Obj: 'MEWSAssessment6Obj',
				Assessment7Obj: 'MEWSAssessment7Obj',
				Assessment8Obj: 'MEWSAssessment8Obj',
				Assessment9Obj: 'MEWSAssessment9Obj',
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
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 = decodeURIComponent(event.type)
				this.patientInfo = JSON.parse(decodeURIComponent(event.info))
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.MEWSID
				}
			} catch (error) {
				this.type 		 = event.type
				this.patientInfo = JSON.parse(event.info)
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.MEWSID
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			this.$store.dispatch(actionConstants.MEWS_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			showAssessment1Picker() {
				this.$store.commit(mutationConstants.MEWS_ASSESSMENT1_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment2Picker() {
				this.$store.commit(mutationConstants.MEWS_ASSESSMENT2_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment3Picker() {
				this.$store.commit(mutationConstants.MEWS_ASSESSMENT3_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment4Picker() {
				this.$store.commit(mutationConstants.MEWS_ASSESSMENT4_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment5Picker() {
				this.$store.commit(mutationConstants.MEWS_ASSESSMENT5_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment6Picker() {
				this.$store.commit(mutationConstants.MEWS_ASSESSMENT6_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment7Picker() {
				this.$store.commit(mutationConstants.MEWS_ASSESSMENT7_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment8Picker() {
				this.$store.commit(mutationConstants.MEWS_ASSESSMENT8_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment9Picker() {
				this.$store.commit(mutationConstants.MEWS_ASSESSMENT9_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.MEWS_SUBMIT_BEFORE, {
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
	.uni-list-cell > label { width: 60%; }
	.tips { padding: 0 30upx;color:#BEBEBE;height: 100upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
