<template>
	<view class="swiper-item uni-column">
		<view class="uni-list uni-input-group uni-common-mt">
			<view class="uni-list-cell uni-input-row">
				<label>导管脱落</label>
				<view class="list-cell-content">
					<switch :checked="RiskFactorCatheterSheddingObj && RiskFactorCatheterSheddingObj.RiskFactorCatheterShedding == 1" 
						color="#32CD32" @change="RiskFactorCatheterSheddingChange" />
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>坠床/跌倒</label>
				<view class="list-cell-content">
					<switch :checked="RiskFactorFallObj && RiskFactorFallObj.RiskFactorFall == 1" 
						color="#32CD32" @change="RiskFactorFallChange" />
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>压疮</label>
				<view class="list-cell-content">
					<switch :checked="RiskFactorPressureSoreObj && RiskFactorPressureSoreObj.RiskFactorPressureSore == 1" 
						color="#32CD32" @change="RiskFactorPressureSoreChange" />
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>误吸（肺部感染）</label>
				<view class="list-cell-content" @click="showRiskFactorAspirationPicker">
					<view class="uni-input">{{ RiskFactorAspirationObj ? RiskFactorAspirationObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>泌尿系统感染</label>
				<view class="list-cell-content" @click="showRiskFactorUrinarySystemInfectionPicker">
					<view class="uni-input">{{ RiskFactorUrinarySystemInfectionObj ? RiskFactorUrinarySystemInfectionObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>静脉炎</label>
				<view class="list-cell-content" @click="showRiskFactorPhlebitisPicker">
					<view class="uni-input">{{ RiskFactorPhlebitisObj ? RiskFactorPhlebitisObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>自伤</label>
				<view class="list-cell-content" @click="showRiskFactorSelfInjuryPicker">
					<view class="uni-input">{{ RiskFactorSelfInjuryObj ? RiskFactorSelfInjuryObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>烫伤</label>
				<view class="list-cell-content" @click="showRiskFactorScaldPicker">
					<view class="uni-input">{{ RiskFactorScaldObj ? RiskFactorScaldObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>防范措施</label>
				<view class="list-cell-content" style="width: 140%;">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="RiskFactorPrecautionChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in RiskFactorPrecautionOptions" :key="item.value">
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
		name: 'safe-tab',
		data() {
			return {};
		},
		computed: {
			...mapGetters([
				'RiskFactorCatheterSheddingObj', 'RiskFactorFallObj', 'RiskFactorPressureSoreObj', 'RiskFactorAspirationObj', 'RiskFactorUrinarySystemInfectionObj', 
				'RiskFactorPhlebitisObj', 'RiskFactorSelfInjuryObj', 'RiskFactorScaldObj', 'RiskFactorPrecautionOptions'
			]),
		},
		methods: {
			RiskFactorCatheterSheddingChange(e) {
				this.$store.commit(mutationConstants.RISK_FACTOR_CATHETER_SHEDDING_SWITCH_CHANGE, e);
			},
			RiskFactorFallChange(e) {
				this.$store.commit(mutationConstants.RISK_FACTOR_FALL_SWITCH_CHANGE, e);
			},
			RiskFactorPressureSoreChange(e) {
				this.$store.commit(mutationConstants.RISK_FACTOR_PRESSURE_SORE_SWITCH_CHANGE, e);
			},
			showRiskFactorAspirationPicker() {
				this.$store.commit(mutationConstants.RISK_FACTOR_ASPIRATION_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showRiskFactorUrinarySystemInfectionPicker() {
				this.$store.commit(mutationConstants.RISK_FACTOR_URINARY_SYSTEM_INFECTION_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showRiskFactorPhlebitisPicker() {
				this.$store.commit(mutationConstants.RISK_FACTOR_PHLEBITIS_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showRiskFactorSelfInjuryPicker() {
				this.$store.commit(mutationConstants.RISK_FACTOR_SELF_INJURY_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showRiskFactorScaldPicker() {
				this.$store.commit(mutationConstants.RISK_FACTOR_SCALD_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			RiskFactorPrecautionChange(e) {
				this.$store.commit(mutationConstants.RISK_FACTOR_PRECAUTION_CHECKBOX_CHANGE, e);
			},
		},
	}
</script>

<style>
	.list-cell-content { width: 60%; }
	.list-cell-content .uni-textarea { width: 90%; margin-left: 15upx; }
</style>
