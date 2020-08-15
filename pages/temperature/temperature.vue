<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<form @submit="submitForm" @reset="reset">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							录入时间
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ now }}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">基本体征</label>
				<view class="uni-list uni-input-group uni-common-mt">
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
							<label>体重（kg）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="Weight" type="digit" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="Weight"
									@focus="InputFocus" @blur="InputBlur" />								
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>药物过敏</label>
							<view class="list-cell-content">
								<input class="uni-input" name="Allergic" type="number" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="Allergic"
									@focus="InputFocus" @blur="InputBlur" />
							</view>
						</view>
					</view>
				</view>
				
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">排出量</label>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="list-cell-content">
						<view class="uni-list-cell uni-input-row">
							<label>大便（次）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="Shit" type="number" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="Shit"
									@focus="InputFocus" @blur="InputBlur" />								
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>小便（ml）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="Urine" type="digit" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="Urine"
									@focus="InputFocus" @blur="InputBlur" />								
							</view>
						</view>
						<view class="uni-list-cell uni-input-row">
							<label>其他排出（ml）</label>
							<view class="list-cell-content">
								<input class="uni-input" name="Other" type="digit" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="OutOther"
									@focus="InputFocus" @blur="InputBlur" />								
							</view>
						</view>
					</view>
				</view>
				
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">输入量</label>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>输入量（ml）</label>
						<view class="list-cell-content">
							<input class="uni-input" name="PhysicalActivityPart" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="InAmount"
								@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
				</view>
				
				<label class="uni-list-cell" style="padding: 50upx 30upx 0 30upx;font-size: large">其他</label>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea @focus="InputFocus" @blur="InputBlur" v-model="Other"/>
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
	import * as mutationConstants from '../../store/modules/temperature/mutations.js'
	import * as actionConstants from '../../store/modules/temperature/actions.js'
	
	export default {
		data() {
			return {
				title: '体温单录入',
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
			...mapGetters({
				now: 'TemperatureNow',
				BodyTemperature: 'TemperatureBodyTemperature',
				Pulse: 'TemperaturePulse', 
				Breath: 'TemperatureBreath', 
				BloodPressure: 'TemperatureBloodPressure', 
				Weight: 'TemperatureWeight',
				Allergic: 'TemperatureAllergic', 
				Shit: 'TemperatureShit', 
				Urine: 'TemperatureUrine', 
				OutOther: 'TemperatureOutOther', 
				InAmount: 'TemperatureInAmount', 
				Other: 'TemperatureOther',
			}),
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 = decodeURIComponent(event.type)
				this.patientInfo = JSON.parse(decodeURIComponent(event.info))
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.Id
				}
			} catch (error) {
				this.type 		 = event.type
				this.patientInfo = JSON.parse(event.info)
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.Id
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			this.$store.dispatch(actionConstants.TEMPERATURE_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			InputFocus() {
				this.inputFocus = !this.inputFocus
			},
			InputBlur() {
				this.inputFocus = !this.inputFocus
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.TEMPERATURE_SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo,
					formData: e.detail.value
				})
			},
		},
		onBackPress() {
			
		},
		// 监听页面卸载
		onUnload() {
			
		},
	}
</script>

<style>
	.content .list-cell-content { width: 100%; }
	.uni-list-cell > label { width: 60%; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
