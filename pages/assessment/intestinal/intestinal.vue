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
				</view>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>诊断</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<text>{{ patientInfo.MSZD }}</text>
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>每日进食量</label>
						<view class="list-cell-content" @click="showFoodIntakePicker">
							<view class="uni-input">{{ FoodIntakeObj ? FoodIntakeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>进食量备注</label>
						<view class="list-cell-content">
							<input type="text" name="FoodIntakeNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="FoodIntakeNotes"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>每日进食种类</label>
						<view class="list-cell-content" @click="showFoodKindsPicker">
							<view class="uni-input">{{ FoodKindsObj ? FoodKindsObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>进食种类备注</label>
						<view class="list-cell-content">
							<input type="text" name="FoodKindsNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="FoodKindsNotes"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>每日饮水量</label>
						<view class="list-cell-content" @click="showWaterIntakePicker">
							<view class="uni-input">{{ WaterIntakeObj ? WaterIntakeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>饮水量备注</label>
						<view class="list-cell-content">
							<input type="text" name="WaterIntakeNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="WaterIntakeNotes"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>饮水时间</label>
						<view class="list-cell-content" @click="showDrinkingTimePicker">
							<view class="uni-input">{{ DrinkingTimeObj ? DrinkingTimeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>饮水时间备注</label>
						<view class="list-cell-content">
							<input type="text" name="DrinkingTimeNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="DrinkingTimeNotes"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>饮食种类</label>
						<view class="list-cell-content" @click="showFoodTypePicker">
							<view class="uni-input">{{ FoodTypeObj ? FoodTypeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>饮食种类备注</label>
						<view class="list-cell-content">
							<input type="text" name="FoodTypeNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="FoodTypeNotes"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往排便情况</label>
						<view class="list-cell-content" @click="showPastDefecationPicker">
							<view class="uni-input">{{ PastDefecationObj ? PastDefecationObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>排便情况备注</label>
						<view class="list-cell-content">
							<input type="text" name="PastDefecationNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="PastDefecationNotes"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往排便方式</label>
						<view class="list-cell-content" @click="showPastModePicker">
							<view class="uni-input">{{ PastModeObj ? PastModeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往排便方式备注</label>
						<view class="list-cell-content">
							<input type="text" name="PastModeNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="PastModeNotes"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往排便次数</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<label>次</label>
								<view class="list-cell-content">
									<input type="number" name="PastTimes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="PastTimes"
										@focus="InputFocus" @blur="InputBlur" />
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>天</label>
								<view class="list-cell-content">
									<input type="number" name="PastDay" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="PastDay"
										@focus="InputFocus" @blur="InputBlur"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往排便时间</label>
						<view class="list-cell-content" @click="showPastTimePicker">
							<view class="uni-input">{{ PastTimeObj ? PastTimeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>目前排便方式</label>
						<view class="list-cell-content" @click="showNowModePicker">
							<view class="uni-input">{{ NowModeObj ? NowModeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="NowModeObj && NowModeObj.NowMode == 4">
						<label>药物辅助备注</label>
						<view class="list-cell-content">
							<input type="text" name="NowModeNotes1" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="NowModeNotes1"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="NowModeObj && NowModeObj.NowMode == 5">
						<label>其他备注</label>
						<view class="list-cell-content">
							<input type="text" name="NowModeNotes2" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="NowModeNotes2"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>目前排便频次</label>
						<view class="list-cell-content" @click="showNowFrequencyPicker">
							<view class="uni-input">{{ NowFrequencyObj ? NowFrequencyObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>排便频次备注</label>
						<view class="list-cell-content">
							<input type="text" name="NowFrequencyNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="NowFrequencyNotes"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>目前排便时间</label>
						<view class="list-cell-content" @click="showNowTimePicker">
							<view class="uni-input">{{ NowTimeObj ? NowTimeObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>目前排便情况</label>
						<view class="list-cell-content" @click="showNowDefecationPicker">
							<view class="uni-input">{{ NowDefecationObj ? NowDefecationObj.label : '' }}</view>
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
	import * as mutationConstants from '../../../store/modules/intestinal/mutations.js'
	import * as actionConstants from '../../../store/modules/intestinal/actions.js'
	
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				title: '肠道评估',
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
				'FoodIntakeObj', 'FoodIntakeNotes', 'FoodKindsObj', 'FoodKindsNotes', 'FoodTypeObj', 'FoodTypeNotes', 'PastDefecationObj', 'PastDefecationNotes', 
				'PastModeObj', 'PastModeNotes', 'PastTimes', 'PastDay', 'PastTimeObj', 'NowModeObj', 'NowModeNotes1', 'NowModeNotes2', 'NowFrequencyObj', 'NowFrequencyNotes', 
				'NowTimeObj', 'NowDefecationObj'
			]),
			...mapGetters({
				now: 'IntestinalNow',
				themeColor: 'IntestinalThemeColor',
				pickerValueArray: 'IntestinalPickerValueArray', 
				mode: 'IntestinalMode', 
				deepLength: 'IntestinalDeepLength', 
				pickerValueDefault: 'IntestinalPickerValueDefault',
				
				WaterIntakeObj: 'IntestinalWaterIntakeObj',
				WaterIntakeNotes: 'IntestinalWaterIntakeNotes',
				DrinkingTimeObj: 'IntestinalDrinkingTimeObj',
				DrinkingTimeNotes: 'IntestinalDrinkingTimeNotes'
			}),
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
			
			this.$store.dispatch(actionConstants.INTESTINAL_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			showFoodIntakePicker() {
				this.$store.commit(mutationConstants.FOOD_INTAKE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showFoodKindsPicker() {
				this.$store.commit(mutationConstants.FOOD_KINDS_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showWaterIntakePicker() {
				this.$store.commit(mutationConstants.WATER_INTAKE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showDrinkingTimePicker() {
				this.$store.commit(mutationConstants.DRINKING_TIME_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showFoodTypePicker() {
				this.$store.commit(mutationConstants.FOOD_TYPE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showPastDefecationPicker() {
				this.$store.commit(mutationConstants.PAST_DEFECATION_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showPastModePicker() {
				this.$store.commit(mutationConstants.PAST_MODE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showPastTimePicker() {
				this.$store.commit(mutationConstants.PAST_TIME_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showNowModePicker() {
				this.$store.commit(mutationConstants.NOW_MODE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showNowFrequencyPicker() {
				this.$store.commit(mutationConstants.NOW_FREQUENCY_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showNowTimePicker(e) {
				this.$store.commit(mutationConstants.NOW_TIME_PICKER_OPEN)
				this.$refs.mpvuePicker.show()
			},
			showNowDefecationPicker(e) {
				this.$store.commit(mutationConstants.NOW_DEFECATION_PICKER_OPEN)
				this.$refs.mpvuePicker.show()
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.INTESTINAL_SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo, 
					formData: e.detail.value
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
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
