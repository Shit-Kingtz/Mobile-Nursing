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
							总分
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ AssessScore }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left" :style="{ color: requiredColor }">
							等级评定
						</view>
						<view class="list-cell-content" @click="showIncidenceLevelPicker">
							<view class="uni-input" name="SelfCare">{{ IncidenceLevelObj ? IncidenceLevelObj.label : '' }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<text class="tips">评分规则：0~4分 - 没有焦虑；5~9分 - 轻度焦虑；</text>
				<text class="tips">10~14分 - 中度焦虑；15~21分 - 重度焦虑；</text>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>感觉紧张、焦虑或急切</label>
						<view class="list-cell-content" @click="showAssessment1Picker">
							<view class="uni-input">{{ Assessment1Obj ? Assessment1Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>不能够停止或控制担忧</label>
						<view class="list-cell-content" @click="showAssessment2Picker">
							<view class="uni-input">{{ Assessment2Obj ? Assessment2Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>对各种各样的事情担忧过多</label>
						<view class="list-cell-content" @click="showAssessment3Picker">
							<view class="uni-input">{{ Assessment3Obj ? Assessment3Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>很难放松下来</label>
						<view class="list-cell-content" @click="showAssessment4Picker">
							<view class="uni-input">{{ Assessment4Obj ? Assessment4Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>由于不安而无法静坐</label>
						<view class="list-cell-content" @click="showAssessment5Picker">
							<view class="uni-input">{{ Assessment5Obj ? Assessment5Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>变得容易烦躁或急躁</label>
						<view class="list-cell-content" @click="showAssessment6Picker">
							<view class="uni-input">{{ Assessment6Obj ? Assessment6Obj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>感觉似乎将有可怕的事情发生而害怕</label>
						<view class="list-cell-content" @click="showAssessment7Picker">
							<view class="uni-input">{{ Assessment7Obj ? Assessment7Obj.label : '' }}</view>
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
	import * as mutationConstants from '../../../store/modules/GAD7/mutations.js'
	import * as actionConstants from '../../../store/modules/GAD7/actions.js'
	
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				title: 'GAD-7',
				ZYH: '',
				ZYHM: '',
				type: '',
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
				requiredColor: ''
			};
		},
		computed: {
			...mapGetters({
				now: 'GAD7Now',
				themeColor: 'GAD7ThemeColor',
				pickerValueArray: 'GAD7PickerValueArray', 
				mode: 'GAD7Mode', 
				deepLength: 'GAD7DeepLength', 
				pickerValueDefault: 'GAD7PickerValueDefault',
				
				Score: 'GAD7Score',
				IncidenceLevelObj: 'GAD7LevelObj',
				Assessment1Obj: 'GAD7Assessment1Obj',
				Assessment2Obj: 'GAD7Assessment2Obj',
				Assessment3Obj: 'GAD7Assessment3Obj',
				Assessment4Obj: 'GAD7Assessment4Obj',
				Assessment5Obj: 'GAD7Assessment5Obj',
				Assessment6Obj: 'GAD7Assessment6Obj',
				Assessment7Obj: 'GAD7Assessment7Obj',
			}),
			AssessScore() {
				if (this.IncidenceLevelObj.IncidenceLevel == 5) {
					return ''
				}
				
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
			AssessScore (val) {
				let Level
				if (val) {
					if (val >= 0 && val <= 4) {
						Level = 1
					} else if (val >= 5 && val <= 9) {
						Level = 2
					} else if (val >= 10 && val <= 14) {
						Level = 3
					} else if (val >= 15 && val <= 21) {
						Level = 4
					}
					this.$store.commit(mutationConstants.SCORE_CHANGE, Level)
				}
				
			},
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 = decodeURIComponent(event.type)
				this.patientInfo = JSON.parse(decodeURIComponent(event.info))
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.AssessID
				}
			} catch (error) {
				this.type 		 = event.type
				this.patientInfo = JSON.parse(event.info)
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.AssessID
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			this.$store.dispatch(actionConstants.GAD7_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			showIncidenceLevelPicker() {
				this.$store.commit(mutationConstants.INCIDENCE_LEVEL_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showAssessment1Picker() {
				if (this.IncidenceLevelObj.IncidenceLevel == 5) {
					plus.nativeUI.alert('病人不愿配合，无法评定')
				} else {
					this.$store.commit(mutationConstants.ASSESSMENT1_PICKER_OPEN);
					this.$refs.mpvuePicker.show()
				}
			},
			showAssessment2Picker() {
				if (this.IncidenceLevelObj.IncidenceLevel == 5) {
					plus.nativeUI.alert('病人不愿配合，无法评定')
				} else {
					this.$store.commit(mutationConstants.ASSESSMENT2_PICKER_OPEN);
					this.$refs.mpvuePicker.show()
				}
			},
			showAssessment3Picker() {
				if (this.IncidenceLevelObj.IncidenceLevel == 5) {
					plus.nativeUI.alert('病人不愿配合，无法评定')
				} else {
					this.$store.commit(mutationConstants.ASSESSMENT3_PICKER_OPEN);
					this.$refs.mpvuePicker.show()
				}
			},
			showAssessment4Picker() {
				if (this.IncidenceLevelObj.IncidenceLevel == 5) {
					plus.nativeUI.alert('病人不愿配合，无法评定')
				} else {
					this.$store.commit(mutationConstants.ASSESSMENT4_PICKER_OPEN);
					this.$refs.mpvuePicker.show()
				}
			},
			showAssessment5Picker() {
				if (this.IncidenceLevelObj.IncidenceLevel == 5) {
					plus.nativeUI.alert('病人不愿配合，无法评定')
				} else {
					this.$store.commit(mutationConstants.ASSESSMENT5_PICKER_OPEN);
					this.$refs.mpvuePicker.show()
				}
			},
			showAssessment6Picker() {
				if (this.IncidenceLevelObj.IncidenceLevel == 5) {
					plus.nativeUI.alert('病人不愿配合，无法评定')
				} else {
					this.$store.commit(mutationConstants.ASSESSMENT6_PICKER_OPEN);
					this.$refs.mpvuePicker.show()
				}
			},
			showAssessment7Picker() {
				if (this.IncidenceLevelObj.IncidenceLevel == 5) {
					plus.nativeUI.alert('病人不愿配合，无法评定')
				} else {
					this.$store.commit(mutationConstants.ASSESSMENT7_PICKER_OPEN);
					this.$refs.mpvuePicker.show()
				}
			},
			submitForm(e) {
				if (!this.IncidenceLevelObj.IncidenceLevel) {
					uni.showToast({ title: '等级评定必填', icon: "none" })
					uni.pageScrollTo({ scrollTop: 0, duration: 300 })
					this.requiredColor = 'red'
					return false
				}
				
				this.$store.dispatch(actionConstants.GAD7_SUBMIT_BEFORE, {
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
