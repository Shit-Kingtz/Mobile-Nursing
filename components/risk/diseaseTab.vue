<template>
	<view class="swiper-item uni-column">
		<view class="uni-list uni-input-group uni-common-mt">
			<view class="uni-list-cell uni-input-row">
				<label>意识</label>
				<view class="list-cell-content" @click="showConditionConsciousnessPicker">
					<view class="uni-input">{{ ConditionConsciousnessObj ? ConditionConsciousnessObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>体温</label>
				<view class="list-cell-content" @click="showConditionTemperaturePicker">
					<view class="uni-input">{{ ConditionTemperatureObj ? ConditionTemperatureObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>脉搏</label>
				<view class="list-cell-content" @click="showConditionPulsePicker">
					<view class="uni-input">{{ ConditionPulseObj ? ConditionPulseObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>呼吸</label>
				<view class="list-cell-content" @click="showConditionBreathingPicker">
					<view class="uni-input">{{ ConditionBreathingObj ? ConditionBreathingObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>血压</label>
				<view class="list-cell-content" @click="showConditionBloodPressurePicker">
					<view class="uni-input">{{ ConditionBloodPressureObj ? ConditionBloodPressureObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>S02</label>
				<view class="list-cell-content" @click="showConditionS02Picker">
					<view class="uni-input">{{ ConditionS02Obj ? ConditionS02Obj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>危急值报告</label>
				<view class="list-cell-content">
					<switch :checked="ConditionCriticalValueReportObj && ConditionCriticalValueReportObj.CriticalValueReport == 1" 
						color="#32CD32" @change="ConditionCriticalValueReportChange" />
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>防范措施</label>
				<view class="list-cell-content" style="width: 140%;">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="ConditionPrecautionsChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in ConditionPrecautionsOptions" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
								<view style="width: 250upx;">{{ item.label }}</view>
							</label>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../store/modules/risk/mutations.js'
	import * as actionConstants from '../../store/modules/risk/actions.js'

	export default {
		name: 'disease-tab',
		data() {
			return {};
		},
		computed: {
			...mapGetters([
				'ConditionConsciousnessObj', 'ConditionTemperatureObj', 'ConditionPulseObj', 'ConditionBreathingObj', 'ConditionBloodPressureObj',
				'ConditionS02Obj', 'ConditionCriticalValueReportObj', 'ConditionPrecautionsObj', 'ConditionPrecautionsOptions',
			]),
		},
		methods: {
			showConditionConsciousnessPicker() {
				this.$store.commit(mutationConstants.RISK_CONSCIOUSNESS_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showConditionTemperaturePicker() {
				this.$store.commit(mutationConstants.RISK_TEMPERATURE_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showConditionPulsePicker() {
				this.$store.commit(mutationConstants.RISK_PLUSE_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showConditionBreathingPicker() {
				this.$store.commit(mutationConstants.RISK_BREATHING_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showConditionBloodPressurePicker() {
				this.$store.commit(mutationConstants.RISK_BLOOD_PRESSURE_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showConditionS02Picker() {
				this.$store.commit(mutationConstants.RISK_S02_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			ConditionCriticalValueReportChange(e) {
				this.$store.commit(mutationConstants.RISK_CRITICAL_VALUE_REPORT_SWITCH_CHANGE, e);
			},
			ConditionPrecautionsChange(e) {
				this.$store.commit(mutationConstants.RISK_PRECAUTIONS_CHECKBOX_CHANGE, e);
			},
		},
	}
</script>

<style>
	
</style>
