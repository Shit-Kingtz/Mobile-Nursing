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
						<label>每日最后一次饮水时间</label>
						<!-- <picker mode="time" start="09:01" end="21:01" @change="bindTimeChange">
							<view class="uni-input">111</view>
						</picker> -->
						<!-- <view class="list-cell-content" @click="showLastTimeOfDrinkingPicker">
							<view class="uni-input">111</view>
							<input type="text" name="LastTimeOfDrinking" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="LastTimeOfDrinking"
								@focus="InputFocus" @blur="InputBlur" />
						</view> -->
						<view class="list-cell-content">
							<input type="text" name="LastTimeOfDrinking" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="LastTimeOfDrinking"
								@focus="InputFocus" @blur="InputBlur" />
						</view>
						
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往每日排尿</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<label>次/天</label>
								<view class="list-cell-content">
									<input type="number" name="UrinationTimes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="UrinationTimes"
										@focus="InputFocus" @blur="InputBlur" />
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>mL/次</label>
								<view class="list-cell-content">
									<input type="number" name="UrinationML" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="UrinationML"
										@focus="InputFocus" @blur="InputBlur"/>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="UrinationOptionChange" :checked="UrinationOptions[0].checked"/>
								<view class="uni-list-cell-db">不确定</view>
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>目前排尿方式</label>
						<view class="list-cell-content" @click="showUrinationWaysPicker">
							<view class="uni-input">{{ UrinationWaysObj ? UrinationWaysObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>排尿方式备注</label>
						<view class="list-cell-content">
							<input type="text" name="UrinationWaysNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="UrinationWaysNotes"
								@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>尿失禁</label>
						<view class="list-cell-content" @click="showIncontinencePicker">
							<view class="uni-input">{{ IncontinenceObj ? IncontinenceObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>每次尿失禁量</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<label>mL</label>
								<view class="list-cell-content">
									<input type="number" name="IncontinenceML" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="IncontinenceML"
										@focus="InputFocus" @blur="InputBlur"/>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="IncontinenceOptionChange" :checked="IncontinenceMLOptions[0].checked"/>
								<view class="uni-list-cell-db">不确定</view>
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往膀胱感染</label>
						<view class="list-cell-content">
							<switch color="#32CD32" @change="BladderInfectionChange" :checked="BladderInfectionObj && BladderInfectionObj.BladderInfection == 2"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="BladderInfectionObj && BladderInfectionObj.BladderInfection == 2">
						<label>感染频次</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<label>次/月</label>
								<view class="list-cell-content">
									<input type="number" name="BladderInfection1" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="BladderInfection1"
										@focus="InputFocus" @blur="InputBlur"/>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>次/年</label>
								<view class="list-cell-content">
									<input type="number" name="BladderInfection2" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="BladderInfection2"
										@focus="InputFocus" @blur="InputBlur" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="BladderInfectionObj && BladderInfectionObj.BladderInfection == 2">
						<label>既往膀胱感染次数</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<label>次</label>
								<view class="list-cell-content">
									<input type="number" name="BladderInfection3" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="BladderInfection3"
										 @focus="InputFocus" @blur="InputBlur"/>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>月</label>
								<view class="list-cell-content">
									<input type="number" name="BladderInfection4" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="BladderInfection4"
										@focus="InputFocus" @blur="InputBlur"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往膀胱感染处理方式</label>
						<view class="list-cell-content" @click="showTreatmentPicker">
							<view class="uni-input">{{ TreatmentObj ? TreatmentObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往有无使用改善膀胱功能的神经药物</label>
						<view class="list-cell-content">
							<switch color="#32CD32" @change="NervousDrugsChange" :checked="NervousDrugsObj && NervousDrugsObj.NervousDrugs == 2"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="NervousDrugsObj && NervousDrugsObj.NervousDrugs == 2">
						<label>神经药物备注</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea v-model="NervousDrugsObj.NervousDrugsNotes" name="NervousDrugsNotes" placeholder="请输入" placeholder-style="color: #BEBEBE"
									@focus="InputFocus" @blur="InputBlur"/>
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>既往有无使用利尿药物</label>
						<view class="list-cell-content">
							<switch color="#32CD32" @change="DiureticsChange" :checked="DiureticsObj && DiureticsObj.Diuretics == 2"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="DiureticsObj && DiureticsObj.Diuretics == 2">
						<label>利尿药物备注</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea v-model="DiureticsObj.DiureticsNotes" name="DiureticsNotes" placeholder="请输入" placeholder-style="color: #BEBEBE" 
									@focus="InputFocus" @blur="InputBlur" />
							</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>首次残余尿量（mL）</label>
						<view class="list-cell-content">
							<input type="number" name="ResidualUrine" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="ResidualUrine"
								@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>首次膀胱容量（mL）</label>
						<view class="list-cell-content">
							<input type="number" name="BladderCapacity" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="BladderCapacity"
								@focus="InputFocus" @blur="InputBlur" />
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
	import * as mutationConstants from '../../../store/modules/bladder/mutations.js'
	import * as actionConstants from '../../../store/modules/bladder/actions.js'
	
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				title: '膀胱评估',
				ZYH: '',
				ZYHM: '',
				type: '',
				checkboxValue: '不确定',
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
				inputFocus: false,
				requiredColor: ''
				
			};
		},
		computed: {
			...mapGetters([
				'WaterIntakeObj', 'WaterIntakeNotes', 'DrinkingTimeObj', 'DrinkingTimeNotes', 'LastTimeOfDrinking', 'UrinationTimes', 'UrinationML', 'UrinationWaysObj', 'UrinationWaysNotes', 
				'IncontinenceObj', 'IncontinenceML', 'BladderInfectionObj', 'BladderInfection1', 'BladderInfection2', 'BladderInfection3', 'BladderInfection4', 'TreatmentObj', 
				'NervousDrugsObj', 'DiureticsObj', 'ResidualUrine', 'BladderCapacity', 'IncontinenceMLOptions'
			]),
			...mapGetters({
				now: 'BladderNow',
				themeColor: 'BladderThemeColor',
				pickerValueArray: 'BladderPickerValueArray', 
				mode: 'BladderMode', 
				deepLength: 'BladderDeepLength', 
				pickerValueDefault: 'BladderPickerValueDefault',
				
				UrinationOptions: 'BladderUrinationOptions',
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
			
			this.$store.dispatch(actionConstants.BLADDER_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			showLastTimeOfDrinkingPicker() {
				this.$store.commit(mutationConstants.LAST_TIME_OF_DRINKING_PICKER_OPEN);
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
			showUrinationWaysPicker() {
				this.$store.commit(mutationConstants.URINATION_WAYS_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			showIncontinencePicker() {
				this.$store.commit(mutationConstants.INCONTINENCE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			BladderInfectionChange(e) {
				this.$store.commit(mutationConstants.BLADDER_INFECTION_SWITCH_CHANGE, e);
			},
			showTreatmentPicker() {
				this.$store.commit(mutationConstants.TREATMENT_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			NervousDrugsChange(e) {
				this.$store.commit(mutationConstants.NERVOUS_DRUGS_SWITCH_CHANGE, e);
			},
			DiureticsChange(e) {
				this.$store.commit(mutationConstants.DIURETICS_SWITCH_CHANGE, e);
			},
			UrinationOptionChange(e) {
				this.$store.commit(mutationConstants.URINATION_OPTION_SWITCH_CHANGE, e)
			},
			IncontinenceOptionChange(e) {
				this.$store.commit(mutationConstants.INCONTINENCE_OPTION_SWITCH_CHANGE, e)
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.BLADDER_SUBMIT_BEFORE, {
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
	.uni-list-cell > label { width: 60%; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
