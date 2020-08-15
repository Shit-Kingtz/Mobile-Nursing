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
							合计得分
						</view>
						<view class="list-cell-content">
							<view class="uni-input" name="AssessScore">{{ AssessScore }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							营养良好
						</view>
						<view class="list-cell-content">
							<view class="uni-input" name="NutritionalLevel">{{ NutritionalLevelObj ? NutritionalLevelObj.label : '' }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<text class="tips">≥3分：报告医生，请营养科会诊作进一步评估，</text>
				<text class="tips">营养指导</text>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>身高（cm）</label>
						<uni-number-box @focus="InputFocus" @blur="InputBlur" v-model="Height" @change="HeightNumberBoxChange"></uni-number-box>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>体重（kg）</label>
						<uni-number-box @focus="InputFocus" @blur="InputBlur" v-model="Weight" @change="WeightNumberBoxChange"></uni-number-box>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							BMI指数
						</view>
						<view class="list-cell-content">
							<view class="uni-input" name="BMI">{{ BMI }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							BMI结果
						</view>
						<view class="list-cell-content">
							<view class="uni-input" name="BMIResult">{{ BMIResult }}</view>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="uni-list uni-input-group uni-common-mt">
						<view class="uni-list-cell uni-input-row">
							<label>体重指数BMI小于18.5kg/m² (BMI=体重/身高²)</label>
							<view class="list-cell-content">
								<switch color="#32CD32" @change="Assessment1Change" :checked="Assessment1Obj && Assessment1Obj.Assessment1 == 1"/>
							</view>
						</view>
					</view>
					<view class="uni-list uni-input-group uni-common-mt">
						<view class="uni-list-cell uni-input-row">
							<label>过去一个月体重是否下降</label>
							<view class="list-cell-content">
								<switch color="#32CD32" @change="Assessment2Change" :checked="Assessment2Obj && Assessment2Obj.Assessment2 == 1"/>
							</view>
						</view>
					</view>
					<view class="uni-list uni-input-group uni-common-mt">
						<view class="uni-list-cell uni-input-row">
							<label>不能进食或过去一周摄入量不及日常摄入量一半</label>
							<view class="list-cell-content">
								<switch color="#32CD32" @change="Assessment3Change" :checked="Assessment3Obj && Assessment3Obj.Assessment3 == 1"/>
							</view>
						</view>
					</view>
					<view class="uni-list uni-input-group uni-common-mt">
						<view class="uni-list-cell uni-input-row">
							<label>严重的恶心、呕吐、腹胀或腹泻 > 3次/日</label>
							<view class="list-cell-content">
								<switch color="#32CD32" @change="Assessment4Change" :checked="Assessment4Obj && Assessment4Obj.Assessment4 == 1"/>
							</view>
						</view>
					</view>
					<view class="uni-list uni-input-group uni-common-mt">
						<view class="uni-list-cell uni-input-row">
							<label>年龄 > 70岁</label>
							<view class="list-cell-content">
								<switch color="#32CD32" @change="Assessment5Change" :checked="Assessment5Obj && Assessment5Obj.Assessment5 == 1"/>
							</view>
						</view>
					</view>
					<view class="uni-list uni-input-group uni-common-mt">
						<view class="uni-list-cell uni-input-row">
							<label>卧床</label>
							<view class="list-cell-content">
								<switch color="#32CD32" @change="Assessment6Change" :checked="Assessment6Obj && Assessment6Obj.Assessment6 == 1"/>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-btn-v page uni-padding-wrap buttonFixed" v-if="!inputFocus">
				<button formType="submit" class="submitBtn">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../../store/modules/nutrition/mutations.js'
	import * as actionConstants from '../../../store/modules/nutrition/actions.js'
	import uniNumberBox from '../../../components/uni-number-box.vue'
	
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				title: '营养评估',
				ZYH: '',
				ZYHM: '',
				type: '',
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
				inputFocus: false
			};
		},
		computed: {
			...mapGetters([
				'NutritionalLevelObj'
			]),
			...mapGetters({
				now: 'NutritionNow',
				Height: 'NutritionHeight',
				Weight: 'NutritionWeight',
				Assessment1Obj: 'NutritionAssessment1Obj',
				Assessment2Obj: 'NutritionAssessment2Obj',
				Assessment3Obj: 'NutritionAssessment3Obj',
				Assessment4Obj: 'NutritionAssessment4Obj',
				Assessment5Obj: 'NutritionAssessment5Obj',
				Assessment6Obj: 'NutritionAssessment6Obj',
				Score: 'NutritionScore'
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
			BMI() {
				let rs = this.Weight / ((this.Height / 100)*(this.Height / 100))
				return isNaN(rs) ? '' : rs.toFixed(1)
			},
			BMIResult() {
				if (this.BMI == '') {
					return ''
				} else if (this.BMI >= 18.5 && this.BMI <= 23.9) {
					return '正常'
				} else if (this.BMI >= 17 && this.BMI <= 18.4) {
					return '轻度消瘦'
				} else if (this.BMI >= 16 && this.BMI <= 16.9) {
					return '中度消瘦'
				} else if (this.BMI >= 0 && this.BMI <= 16) {
					return '重度消瘦'
				} else if (this.BMI >= 24 && this.BMI <= 27.9) {
					return '超重'
				} else if (this.BMI >= 28) {
					return '肥胖'
				}
			}
		},
		watch: {
			AssessScore(val){
				this.$store.commit(mutationConstants.NUTRITION_SCORE_CHANGE, val)
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
			
			this.$store.dispatch(actionConstants.NUTRITION_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			HeightNumberBoxChange(value) {
				this.$store.commit(mutationConstants.NUTRITION_HEIGHT_CHANGE, value);
			},
			WeightNumberBoxChange(value) {
				this.$store.commit(mutationConstants.NUTRITION_WEIGHT_CHANGE, value);
			},
			Assessment1Change(e) {
				this.$store.commit(mutationConstants.NUTRITION_ASSESSMENT1_SWITCH_CHANGE, e);
			},
			Assessment2Change(e) {
				this.$store.commit(mutationConstants.NUTRITION_ASSESSMENT2_SWITCH_CHANGE, e);
			},
			Assessment3Change(e) {
				this.$store.commit(mutationConstants.NUTRITION_ASSESSMENT3_SWITCH_CHANGE, e);
			},
			Assessment4Change(e) {
				this.$store.commit(mutationConstants.NUTRITION_ASSESSMENT4_SWITCH_CHANGE, e);
			},
			Assessment5Change(e) {
				this.$store.commit(mutationConstants.NUTRITION_ASSESSMENT5_SWITCH_CHANGE, e);
			},
			Assessment6Change(e) {
				this.$store.commit(mutationConstants.NUTRITION_ASSESSMENT6_SWITCH_CHANGE, e);
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.NUTRITION_SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo, 
					BMI: this.BMI,
					BMIResult: this.BMIResult,
					AssessScore: this.AssessScore
				})
			},
			InputFocus() {
				this.inputFocus = !this.inputFocus
			},
			InputBlur() {
				this.inputFocus = !this.inputFocus
			},
		},
		onBackPress() {
			
		},
		// 监听页面卸载
		onUnload() {
			
		}
	}
</script>

<style>
	.list-cell-content { width: 60%; }
	.content .list-cell-content { width: 30%; }
	.uni-list-cell > label { width: 60%; }
	.tips { padding: 0 30upx;color:#BEBEBE;height: 100upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
