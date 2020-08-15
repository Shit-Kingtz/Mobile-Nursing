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
							B1总分
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ AssessScore }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							自理能力分级
						</view>
						<view class="list-cell-content" @click="showSelfCarePicker">
							<view class="uni-input" name="SelfCare">{{ SelfCareObj ? SelfCareObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							病情等级
						</view>
						<view class="list-cell-content" @click="showIncidenceLevelPicker">
							<view class="uni-input" name="IncidenceLevel">{{ IncidenceLevelObj ? IncidenceLevelObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							护理分级
						</view>
						<view class="list-cell-content" @click="showNursingLevelPicker">
							<view class="uni-input" name="NursingLevel">{{ NursingLevelObj ? NursingLevelObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							责任护士签名
						</view>
						<view class="list-cell-content">
							<input class="uni-input" type="text" v-model="EmployeeName" disabled />
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>进食</label>
						<view class="list-cell-content" @click="showFoodPicker">
							<view class="uni-input">{{ FoodObj ? FoodObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>洗澡</label>
						<view class="list-cell-content" @click="showShowerPicker">
							<view class="uni-input">{{ ShowerObj ? ShowerObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>修饰</label>
						<view class="list-cell-content" @click="showBeautifyPicker">
							<view class="uni-input">{{ BeautifyObj ? BeautifyObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>穿衣</label>
						<view class="list-cell-content" @click="showClothPicker">
							<view class="uni-input">{{ ClothObj ? ClothObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>控制大便</label>
						<view class="list-cell-content" @click="showShitControlPicker">
							<view class="uni-input">{{ ShitControlObj ? ShitControlObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>控制小便</label>
						<view class="list-cell-content" @click="showUrineControlPicker">
							<view class="uni-input">{{ UrineControlObj ? UrineControlObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>如厕</label>
						<view class="list-cell-content" @click="showToiletPicker">
							<view class="uni-input">{{ ToiletObj ? ToiletObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>床椅转移</label>
						<view class="list-cell-content" @click="showMovementPicker">
							<view class="uni-input">{{ MovementObj ? MovementObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>平地行走</label>
						<view class="list-cell-content" @click="showWalkPicker">
							<view class="uni-input">{{ WalkObj ? WalkObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>上下楼梯</label>
						<view class="list-cell-content" @click="showStairPicker">
							<view class="uni-input">{{ StairObj ? StairObj.label : '' }}</view>
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
	import * as mutationConstants from '../../../store/modules/grading/mutations.js'
	import * as actionConstants from '../../../store/modules/grading/actions.js'
	
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				title: '护理分级',
				ZYH: '',
				ZYHM: '',
				type: '',
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
			};
		},
		computed: {
			...mapGetters([
				'Score', 'SelfCareObj', 'SelfCareOptions', 'IncidenceLevelObj', 'IncidenceLevelOptions', 'NursingLevelObj', 'NursingLevelOptions',
				'FoodObj', 'FoodOptions', 'ShowerObj', 'ShowerOptions', 'BeautifyObj', 'BeautifyOptions', 'ClothObj', 'ClothOptions', 'ShitControlObj', 'ShitControlOptions',
				'UrineControlObj', 'UrineControlOptions', 'ToiletObj', 'ToiletOptions', 'MovementObj', 'MovementOptions', 'WalkObj', 'WalkOptions', 'StairObj', 'StairOptions',
			]),
			...mapGetters({
				now: 'gradingNow',
				themeColor: 'gradingThemeColor',
				pickerValueArray: 'gradingPickerValueArray', 
				mode: 'gradingMode', 
				deepLength: 'gradingDeepLength', 
				pickerValueDefault: 'gradingPickerValueDefault',
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
			AssessScore(val){
				let SelfCare
				if(val >= 0 && val <= 40) {
					SelfCare = 1
				} else if (val >= 41 && val <= 60) {
					SelfCare = 2
				} else if (val >= 61 && val <= 99) {
					SelfCare = 3
				} else if (val == 100) {
					SelfCare = 4
				}
				
				this.$store.commit(mutationConstants.SCORE_CHANGE, SelfCare)
			}
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
			
			this.$store.dispatch(actionConstants.GRADING_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			showSelfCarePicker() {
				this.$store.commit(mutationConstants.SELF_CARE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showIncidenceLevelPicker() {
				this.$store.commit(mutationConstants.INCIDENCE_LEVEL_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showNursingLevelPicker() {
				this.$store.commit(mutationConstants.NURSING_LEVEL_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showFoodPicker() {
				this.$store.commit(mutationConstants.FOOD_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showShowerPicker() {
				this.$store.commit(mutationConstants.SHOWER_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showBeautifyPicker() {
				this.$store.commit(mutationConstants.BEAUTIFY_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showClothPicker() {
				this.$store.commit(mutationConstants.CLOTH_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showShitControlPicker() {
				this.$store.commit(mutationConstants.SHIT_CONTROL_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showUrineControlPicker() {
				this.$store.commit(mutationConstants.URINE_CONTROL_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showToiletPicker() {
				this.$store.commit(mutationConstants.TOILET_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showMovementPicker() {
				this.$store.commit(mutationConstants.MOVEMENT_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showWalkPicker() {
				this.$store.commit(mutationConstants.WALK_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showStairPicker() {
				this.$store.commit(mutationConstants.STAIR_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.GRADING_SUBMIT_BEFORE, {
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
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
