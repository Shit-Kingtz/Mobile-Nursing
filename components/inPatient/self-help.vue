<template>
	<view class="swiper-item uni-column">
		<view class="uni-list uni-input-group uni-common-mt">
			<view class="uni-list-cell uni-input-row">
				<label>营养状况</label>
				<view class="list-cell-content" @click="showNutritionPicker">
					<view class="uni-input">{{ NutritionObj ? NutritionObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>身高（cm）</label>
				<uni-number-box @focus="InputFocus" @blur="InputBlur" v-model="Height" @change="HeightNumberBoxChange"></uni-number-box>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>体重（kg）</label>
				<uni-number-box @focus="InputFocus" @blur="InputBlur" v-model="Weight" @change="WeightNumberBoxChange"></uni-number-box>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>体质指数</label>
				<view class="list-cell-content">
					<view class="uni-input">{{ BMI }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>体质结果</label>
				<view class="list-cell-content">
					<view class="uni-input">{{ BMIResult }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>饮食</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="DietChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in DietOptions" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
								<view>{{ item.label }}</view>
							</label>
						</checkbox-group>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea @focus="InputFocus" @blur="InputBlur" v-model="DietNote"/>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>偏好</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="PreferenceChange" :checked="PreferenceObj && PreferenceObj.Preference == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="PreferenceObj && PreferenceObj.Preference == 2">
				<label>偏好内容</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="PreferenceObj.PreferenceNote"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>进食方式</label>
				<view class="list-cell-content" @click="showDietingModePicker">
					<view class="uni-input">{{ DietingModeObj ? DietingModeObj.DietingModeText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>进食方式备注</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="DietingModeObj.DietingModeNote"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>吞咽功能</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="SwallowingChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in SwallowingOptions" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
								<view>{{ item.label }}</view>
							</label>
						</checkbox-group>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea @focus="InputFocus" @blur="InputBlur" v-model="SwallowingNote"/>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-list-cell uni-input-row">
				<label>嗜好</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<label>吸烟</label>
						<view class="list-cell-content" @click="showSmokePicker">
							<view class="uni-input">{{ SmokeObj ? SmokeObj.SmokeText : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="SmokeObj && (SmokeObj.Smoke == 2 || SmokeObj.Smoke == 3)">
						<label>每日吸烟量（支/天）</label>
						<view class="list-cell-content">
							<input class="uni-input" type="number" name="SmokeOfDay" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="SmokeObj.SmokeOfDay"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>饮酒</label>
						<view class="list-cell-content" @click="showDrinkPicker">
							<view class="uni-input">{{ DrinkObj ? DrinkObj.DrinkText : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="DrinkObj && (DrinkObj.Drink == 2 || DrinkObj.Drink == 3)">
						<label>每日饮酒量（两/天）</label>
						<view class="list-cell-content">
							<input class="uni-input" type="number" name="DrinkOfDay" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="DrinkObj.DrinkOfDay"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>睡眠障碍</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="DyssomniaExistChange" :checked="DyssomniaObj && DyssomniaObj.Dyssomnia == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="DyssomniaObj && DyssomniaObj.Dyssomnia == 2">
				<label>睡眠障碍详情</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="DyssomniaChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in DyssomniaOptions" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
								<view>{{ item.label }}</view>
							</label>
						</checkbox-group>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea @focus="InputFocus" @blur="InputBlur" v-model="DyssomniaObj.DyssomniaNote"/>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>辅助睡眠</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<label>方法</label>
						<view class="list-cell-content">
							<switch color="#32CD32" @change="SleepAidChange" :checked="SleepAidObj && SleepAidObj.SleepAid == 2"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="SleepAidObj && SleepAidObj.SleepAid == 2">
						<label>描述</label>
						<view class="list-cell-content">
							<input class="uni-input" name="SleepAidMethods" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="SleepAidObj.SleepAidMethods"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="SleepAidObj && SleepAidObj.SleepAid == 2">
						<label>效果</label>
						<view class="list-cell-content">
							<input class="uni-input" name="SleepAidEffect" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="SleepAidObj.SleepAidEffect"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>排尿状况</label>
				<view class="list-cell-content" @click="showUrinationPicker">
					<view class="uni-input">{{ UrinationObj ? UrinationObj.UrinationText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>排尿状况备注</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="UrinationObj.UrinationNote"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>尿液性状</label>
				<view class="list-cell-content" @click="showUrinePicker">
					<view class="uni-input">{{ UrineObj ? UrineObj.UrineText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>尿液性状备注</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="UrineObj.UrineNote"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>辅助排尿</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="AssitanceChange" :checked="AssitanceObj && AssitanceObj.Assitance == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="AssitanceObj && AssitanceObj.Assitance == 2">
				<label>辅助排尿工具</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="AssitanceToolChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in AssitanceToolOptions" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
								<view>{{ item.label }}</view>
							</label>
						</checkbox-group>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea @focus="InputFocus" @blur="InputBlur" v-model="AssitanceObj.AssitanceNote"/>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>排便状况</label>
				<view class="list-cell-content" @click="showDefecatePicker">
					<view class="uni-input">{{ DefecateObj ? DefecateObj.DefecateText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>药物介助</label>
				<view class="list-cell-content" @click="showDefecateDrugPicker">
					<view class="uni-input">{{  DefecateDrugObj ? DefecateDrugObj.DefecateDrugText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="DefecateDrugObj && DefecateDrugObj.DefecateDrug == 2">
				<label>药物介助备注</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="DefecateDrugObj.DefecateDrugNote"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="DefecateDrugObj && DefecateDrugObj.DefecateDrug == 3">
				<label>药物介助备注</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="DefecateDrugObj.DefecateDrugNote1"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>大便性状</label>
				<view class="list-cell-content" @click="showStoolConsistencyPicker">
					<view class="uni-input">{{ StoolConsistencyObj ? StoolConsistencyObj.StoolConsistencyText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>大便性状备注</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="StoolConsistencyObj.StoolConsistencyNote"/>
					</view>
				</view>
			</view>
		</view>
	 </view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../store/modules/inPatient/mutations.js'
	import * as actionConstants from '../../store/modules/inPatient/actions.js'
	
	import uniNumberBox from '../uni-number-box.vue'

	export default {
		name: 'self-help-tab',
		components: {
			uniNumberBox
		},
		data() {
			return {};
		},
		computed: {
			...mapGetters([
				'NutritionObj','NutritionOptions', 'DietNote', 'DietOptions', 'PreferenceObj', 'PreferenceOptions', 'DietingModeObj', 'DietingModeOptions', 'SwallowingNote',
				'SwallowingOptions', 'SmokeObj', 'SmokeOptions', 'DrinkObj', 'DrinkOptions', 'DyssomniaObj', 'DyssomniaExistOptions', 'DyssomniaOptions', 'SleepAidObj', 
				'SleepAidOptions', 'UrinationObj', 'UrinationOptions', 'UrineObj', 'UrineOptions', 'AssitanceObj', 'AssitanceOptions', 'AssitanceToolOptions', 'DefecateObj',
				'DefecateOptions', 'DefecateDrugObj', 'DefecateDrugOptions', 'StoolConsistencyObj', 'StoolConsistencyOptions',
				'Height', 'Weight'
			]),
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
		methods: {
			showNutritionPicker() {
				this.$store.commit(mutationConstants.SELF_HELP_NUTRITION_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			PreferenceChange(e) {
				this.$store.commit(mutationConstants.SELF_HELP_PREFERENCE_SWITCH_CHANGE, e);
			},
			showDietingModePicker() {
				this.$store.commit(mutationConstants.SELF_HELP_DIETING_MODE_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showSmokePicker() {
				this.$store.commit(mutationConstants.SELF_HELP_SMOKE_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showDrinkPicker() {
				this.$store.commit(mutationConstants.SELF_HELP_DRINK_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			DyssomniaExistChange(e) {
				this.$store.commit(mutationConstants.SELF_HELP_DYSSOMNIA_SWITCH_CHANGE, e);
			},
			SleepAidChange(e) {
				this.$store.commit(mutationConstants.SELF_HELP_SLEEP_AID_SWITCH_CHANGE, e);
			},
			showUrinationPicker() {
				this.$store.commit(mutationConstants.SELF_HELP_URINATION_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showUrinePicker() {
				this.$store.commit(mutationConstants.SELF_HELP_URINE_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			AssitanceChange(e) {
				this.$store.commit(mutationConstants.SELF_HELP_ASSITANCE_SWITCH_CHANGE, e);
			},
			showDefecatePicker() {
				this.$store.commit(mutationConstants.SELF_HELP_DEFECATE_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showDefecateDrugPicker() {
				this.$store.commit(mutationConstants.SELF_HELP_DEFECATE_DRUG_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showStoolConsistencyPicker() {
				this.$store.commit(mutationConstants.SELF_HELP_STOOL_CONSISTENCY_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			DietChange(e) {
				this.$store.commit(mutationConstants.SELF_HELP_DIET_CHECKBOX_CHANGE, e);
			},
			SwallowingChange(e) {
				this.$store.commit(mutationConstants.SELF_HELP_SWALLOWING_CHECKBOX_CHANGE, e);
			},
			DyssomniaChange(e) {
				this.$store.commit(mutationConstants.SELF_HELP_DYSSOMNIA_CHECKBOX_CHANGE, e);
			},
			AssitanceToolChange(e) {
				this.$store.commit(mutationConstants.SELF_HELP_ASSITANCE_TOOL_CHECKBOX_CHANGE, e);
			},
			HeightNumberBoxChange(value) {
				this.$store.commit(mutationConstants.SELF_HELP_HEIGHT_CHANGE, value);
			},
			WeightNumberBoxChange(value) {
				this.$store.commit(mutationConstants.SELF_HELP_WEIGHT_CHANGE, value);
			},
			InputFocus() {
				this.$emit('InputFocusOrBlur')
			},
			InputBlur() {
				this.$emit('InputFocusOrBlur')
			},
		},
	}
</script>

<style>
	.list-cell-content { width: 60%; }
	.list-cell-content .uni-textarea { width: 90%; margin-left: 15upx; }
</style>
