<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<form @submit="submitForm" @reset="reset">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							患者姓名
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ patientInfo.PaientName }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							诊断
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ patientInfo.MSZD }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							转出科室
						</view>
						<view class="list-cell-content" @click="showConfirmDepartOutPicker">
							<view class="uni-input" v-bind:disabled="OutDisabled">{{ ConfirmDepartOutObj ? ConfirmDepartOutObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							交班者签名
						</view>
						<view class="list-cell-content">
							<input class="uni-input" name="ConfirmPersonOut" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" 
								v-model="ConfirmPersonOut" @focus="InputFocus" @blur="InputBlur" v-bind:disabled="OutDisabled"/>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							转出时间
						</view>
						<view class="list-cell-content">
							<picker mode="time" :value="TurnOutTime" :start="'1970-01-01'" :end="'2021-12-31'" @change="bindTurnOutTimeChange" v-bind:disabled="OutDisabled">
								<view class="uni-input">{{ TurnOutTime }}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-column uni-padding-wrap">
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>身份确认</label>
						<view class="list-cell-content">
							<checkbox-group @change="IdentityConfirmationTypeChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in IdentityConfirmationTypeOptions" :key="item.value">
									<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" v-bind:disabled="OutDisabled"/></view>
									<view style="width: 250upx;">{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>意识形态</label>
						<view class="list-cell-content" @click="showConsciousnessStatePicker">
							<view class="uni-input" v-bind:disabled="OutDisabled">{{ ConsciousnessStateObj ? ConsciousnessStateObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>生命体征（转出）</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<label>T(℃)</label>
								<view class="list-cell-content">
									<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="VSout.T" v-bind:disabled="OutDisabled"></uni-number-box>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>P(次/分)</label>
								<view class="list-cell-content">
									<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="VSout.P" v-bind:disabled="OutDisabled"></uni-number-box>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>R(次/分)</label>
								<view class="list-cell-content">
									<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="VSout.R" v-bind:disabled="OutDisabled"></uni-number-box>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>BP(mmHg)</label>
								<view class="list-cell-content">
									<input class="uni-input" name="VSoutBP" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="VSout.BP"
										@focus="InputFocus" @blur="InputBlur" v-bind:disabled="OutDisabled" />
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>导管情况</label>
						<view class="list-cell-content">
							<switch color="#32CD32" @change="ConduitConditionChange" :checked="ConduitConditionObj && ConduitConditionObj.ConduitCondition == 2"
								v-bind:disabled="OutDisabled" />
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>导管情况备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="ConduitConditionNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" 
									v-model="ConduitConditionNote" @focus="InputFocus" @blur="InputBlur" v-bind:disabled="OutDisabled"/>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>皮肤状况</label>
						<view class="list-cell-content" @click="showSkinConditionPicker">
							<view class="uni-input" v-bind:disabled="OutDisabled" >{{ SkinConditionObj ? SkinConditionObj.label : '' }}</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>皮肤状况备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="SkinConditionNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" 
									v-model="SkinConditionNote" @focus="InputFocus" @blur="InputBlur" v-bind:disabled="OutDisabled" />
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>随带药品</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea @focus="InputFocus" @blur="InputBlur" v-model="CarryingDrugs" v-bind:disabled="OutDisabled" />
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>随带物品</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="Option1Change" :checked="CarryingArticlesObj.Option1" v-bind:disabled="OutDisabled"/>
								<view @click="Option1Click" style="width: 70%;">病历卡</view>
							</view>
							
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="Option2Change" :checked="CarryingArticlesObj.Option2" v-bind:disabled="OutDisabled"/>
								<view @click="Option2Click" style="width: 70%;">影像资料</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>数量（张）</label>
								<view class="list-cell-content">
									<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="CarryingArticlesObj.CarryingArticlesImageNumber"
										v-bind:disabled="OutDisabled"></uni-number-box>
								</view>
							</view>
							
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="Option3Change" :checked="CarryingArticlesObj.Option3" v-bind:disabled="OutDisabled" />
								<view @click="Option3Click" style="width: 70%;">其他</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>备注</label>
								<view class="list-cell-content">
									<input class="uni-input" name="CarryingArticlesNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" 
										v-model="CarryingArticlesObj.CarryingArticlesNote" @focus="InputFocus" @blur="InputBlur" v-bind:disabled="OutDisabled"/>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<view class="uni-textarea">
								<textarea @focus="InputFocus" @blur="InputBlur" v-model="Note" v-bind:disabled="OutDisabled" />
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-padding-wrap uni-common-mt">
				<label class="uni-list-cell uni-list-cell-pd" style="padding-top: 50upx;">
					<switch type="checkbox" color="#32CD32" @change="AboveIntoConfirmChange" :checked="AboveIntoConfirm" v-bind:disabled="InDisabled" />
					<view style="width: 580upx;">以上情况确认</view>
				</label>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							转入时间
						</view>
						<view class="list-cell-content">
							<picker mode="time" :value="TurnOutTime" :start="'1970-01-01'" :end="'2021-12-31'" @change="bindTurnOutTimeChange" v-bind:disabled="InDisabled">
								<view class="uni-input">{{ TransferTime }}</view>
							</picker>
							<!-- <view class="uni-input" v-bind:disabled="InDisabled">{{ TransferTime }}</view> -->
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							转入科室
						</view>
						<view class="list-cell-content" @click="showConfirmDepartInPicker">
							<view class="uni-input">{{ ConfirmDepartInObj ? ConfirmDepartInObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							接收者签名
						</view>
						<view class="list-cell-content">
							<input class="uni-input" name="ConfirmPersonIn" type="text" placeholder="请输入"  placeholder-style="color: #BEBEBE" 
								v-model="ConfirmPersonIn" @focus="InputFocus" @blur="InputBlur" v-bind:disabled="InDisabled" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>生命体征（转入）</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<label>T(℃)</label>
								<view class="list-cell-content">
									<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="VSin.T" v-bind:disabled="InDisabled" ></uni-number-box>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>P(次/分)</label>
								<view class="list-cell-content">
									<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="VSin.P" v-bind:disabled="InDisabled" ></uni-number-box>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>R(次/分)</label>
								<view class="list-cell-content">
									<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="VSin.R" v-bind:disabled="InDisabled" ></uni-number-box>
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label>BP(mmHg)</label>
								<view class="list-cell-content">
									<input class="uni-input" name="VSinBP" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="VSin.BP"
											@focus="InputFocus" @blur="InputBlur" v-bind:disabled="InDisabled" />
								</view>
							</view>
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
	import * as mutationConstants from '../../../store/modules/transfer/mutations.js'
	import * as actionConstants from '../../../store/modules/transfer/actions.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	import uniNumberBox from '../../../components/uni-number-box.vue'
	
	export default {
		components: {
			mpvuePicker,
			uniNumberBox
		},
		data() {
			return {
				title: '转运交接单',
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
			...mapGetters([
				'InDisabled', 'OutDisabled',
				'IdentityConfirmationTypeOptions', 'IdentityConfirmationTypeObj', 'ConsciousnessStateObj', 'VSout', 'ConduitConditionObj', 'ConduitConditionNote', 
				'SkinConditionObj', 'SkinConditionNote', 'CarryingDrugs', 'CarryingArticlesObj', 'Note', 'ConfirmDepartOutObj', 'ConfirmPersonOut', 'TurnOutTime',
				'AboveIntoConfirm', 'TransferTime', 'ConfirmDepartInObj', 'ConfirmPersonIn', 'VSin'
			]),
			...mapGetters({
				themeColor: 'TransferThemeColor',
				pickerValueArray: 'TransferPickerValueArray', 
				mode: 'TransferMode', 
				deepLength: 'TransferDeepLength', 
				pickerValueDefault: 'TransferPickerValueDefault'
			}),
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 	= decodeURIComponent(event.type)
				this.patientInfo 	= JSON.parse(decodeURIComponent(event.info))
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.Id
				}
			} catch (error) {
				this.type 		 	= event.type
				this.patientInfo 	= JSON.parse(event.info)
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.Id
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			if (this.type == 'edit') {
				this.$store.dispatch(actionConstants.TRANSFER_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
			}
		},
		methods: {
			InputFocus() {
				this.inputFocus = !this.inputFocus
			},
			InputBlur() {
				this.inputFocus = !this.inputFocus
			},
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			IdentityConfirmationTypeChange(e) {
				this.$store.commit(mutationConstants.TRANSFER_IDENTITY_CONFIRMATION_TYPE_CHECKBOX_CHANGE, e);
			},
			showConsciousnessStatePicker() {
				this.$store.commit(mutationConstants.TRANSFER_CONSCIOUSNESS_STATE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			ConduitConditionChange(e) {
				this.$store.commit(mutationConstants.TRANSFER_CONDUIT_CONDITION_CHECKBOX_CHANGE, e);
			},
			showSkinConditionPicker() {
				this.$store.commit(mutationConstants.TRANSFER_SKIN_CONDITION_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			Option1Change(e) {
				this.$store.commit(mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION1_CHECKBOX_CHANGE, e);
			},
			Option1Click() {
				this.$store.commit(mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION1_LABEL_CLICK);
			},
			Option2Change(e) {
				this.$store.commit(mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION2_CHECKBOX_CHANGE, e);
			},
			Option2Click() {
				this.$store.commit(mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION2_LABEL_CLICK);
			},
			Option3Change(e) {
				this.$store.commit(mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION3_CHECKBOX_CHANGE, e);
			},
			Option3Click() {
				this.$store.commit(mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION3_LABEL_CLICK);
			},
			showConfirmDepartOutPicker() {
				if (!this.OutDisabled) {
					this.$store.commit(mutationConstants.TRANSFER_CONFIRM_DEPART_OUT_PICKER_OPEN);
					this.$refs.mpvuePicker.show()
				}
			},
			bindTurnOutTimeChange(e) {
				this.$store.commit(mutationConstants.TRANSFER_TURN_OUT_TIME_CHANGE, e.target.value)
			},
			AboveIntoConfirmChange(e) {
				this.$store.commit(mutationConstants.TRANSFER_ABOVE_INTO_CONFIRM_SWITCH_CHANGE, e.target.value)
			},
			AboveIntoConfirmClick() {
				this.$store.commit(mutationConstants.TRANSFER_ABOVE_INTO_CONFIRM_LABEL_CLICK);
			},
			showConfirmDepartInPicker() {
				if (!this.InDisabled) {
					this.$store.commit(mutationConstants.TRANSFER_CONFRIM_DEPART_IN_PICKER_OPEN);
					this.$refs.mpvuePicker.show()
				}
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.TRANSFER_SUBMIT_BEFORE, {
					type: this.type, 
					id: this.assessmentID,
					info: this.patientInfo
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
	.content .list-cell-content { width: 100%; }
	.content_label { width: 35%; }
	.uni-list-cell > label { width: 60%; }
	.tips { padding: 0 30upx;color:#BEBEBE;height: 100upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
