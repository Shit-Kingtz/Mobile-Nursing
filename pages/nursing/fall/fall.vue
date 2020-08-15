<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<form @submit="submitForm" @reset="reset">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-list">
					<!-- <view class="uni-list-cell">
						<view class="uni-list-cell-left">
							评估时间
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ now }}</view>
						</view>
					</view> -->
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							总分
						</view>
						<view class="list-cell-content">
							<view class="uni-input">{{ AssessScore }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							防范措施
						</view>
						<view class="list-cell-content">
							<checkbox-group @change="InterventionChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in InterventionOptions" :key="item.value">
									<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
									<view style="width: 250upx;">{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							护士签名
						</view>
						<view class="list-cell-content">
							<input class="uni-input" type="text" v-model="EmployeeName" disabled />
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							护士长签名
						</view>
						<view class="list-cell-content" @click="showHeadNurseNamePicker">
							<view class="uni-input" name="HeadNurseName">{{ HeadNurseNameObj ? HeadNurseNameObj.label : '' }}</view>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							总护士长签名
						</view>
						<view class="list-cell-content" @click="showHeadNurseNamePicker">
							<view class="uni-input" name="HeadNurseName">{{ HeadNurseNameObj ? HeadNurseNameObj.label : '' }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<text class="tips">备注：根据评分，护士采取相对应防范措施，用字母表示；对大于45分高风险者予以预报监控。\n</text>
				<text class="tips">零危险（0-24分）一般措施（YB）；低度危险（25-45分）标准防止跌倒措施（BZ）；高度危险（＞45分）高危险防止跌倒措施（GW）；\n</text>
				<text class="tips" style="font-weight: bold;">A.一般防范措施（0-24分）：\n</text>
				<text class="tips">1.入院时向患者介绍医院环境，嘱患者穿防滑鞋。\n</text>
				<text class="tips">2.病房、走廊无障碍，照明适度。\n</text>
				<text class="tips">3.卫生间设置扶手、紧急呼叫铃等辅助设施。\n</text>
				<text class="tips">4.将水、眼镜、手机等生活物品放在床头柜上，保证患者可及。\n</text>
				<text class="tips">5.病床、轮椅、平车使用安全。\n</text>
				<text class="tips" style="font-weight: bold;">B.标准防止跌倒/坠床措施（25-45分）：</text><text class="tips">除一般防范措施外还应包括：\n</text>
				<text class="tips">1.提供足够的灯光，清除病房、床旁及通道障碍。\n</text>
				<text class="tips">2.保持病区地面清洁干燥，告知卫生间防滑措施（淋浴时有人陪伴）。\n</text>
				<text class="tips">3.将日常用品放于患者易取处。\n</text>
				<text class="tips">4.教会患者使用床头灯及呼叫器，放于可及处。\n</text>
				<text class="tips">5.指导患者逐渐坐起、逐渐下床的方法。\n</text>
				<text class="tips">6.专人陪住，患者活动时有人陪伴。\n</text>
				<text class="tips">7.穿舒适的鞋及衣裤。\n</text>
				<text class="tips" style="font-weight: bold;">C.高危险防止跌倒/坠床措施（＞45分）：</text><text class="tips">除一般及标准防范措施外还应包括：\n</text>
				<text class="tips">1.在床尾挂警示标志。\n</text>
				<text class="tips">2.尽量将患者安置距离护士站较近的病房。\n</text>
				<text class="tips">3.告知家属应有专人陪护患者。\n</text>
				<text class="tips">4.通知医生患者的高危情况并进行有针对性的治疗。\n</text>
				<text class="tips">5.加强对患者夜间巡视。\n</text>
				<text class="tips">6.将两侧床栏抬起。\n</text>
				<text class="tips">7.必要时限制患者活动，适当约束。\n</text>
			</view>
			
			<view class="uni-column uni-padding-wrap" style="padding-bottom: 300upx;">
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>近三个月有无跌倒</label>
						<view class="list-cell-content">
							<switch :checked="AssessmentObj && AssessmentObj.Assessment1 == 1" color="#32CD32" @change="Assessment1Change" />
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>多于一个疾病诊断</label>
						<view class="list-cell-content">
							<switch :checked="AssessmentObj && AssessmentObj.Assessment2 == 1" color="#32CD32" @change="Assessment2Change" />
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>步行需要帮助</label>
						<view class="list-cell-content">
							<checkbox-group @change="Assessment4Change">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in Assessment4Options" :key="item.value">
									<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
									<view style="width: 250upx;">{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>接受药物治疗</label>
						<view class="list-cell-content">
							<switch :checked="AssessmentObj && AssessmentObj.Assessment3 == 1" color="#32CD32" @change="Assessment3Change" />
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>步态/移动</label>
						<view class="list-cell-content">
							<checkbox-group @change="Assessment5Change">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in Assessment5Options" :key="item.value">
									<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
									<view style="width: 250upx;">{{ item.label }}</view>
								</label>
							</checkbox-group>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt content">
					<view class="uni-list-cell uni-input-row">
						<label>精神状态</label>
						<view class="list-cell-content">
							<checkbox-group @change="Assessment6Change">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in Assessment6Options" :key="item.value">
									<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
									<view style="width: 250upx;">{{ item.label }}</view>
								</label>
							</checkbox-group>
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
	import * as mutationConstants from '../../../store/modules/fall/mutations.js'
	import * as actionConstants from '../../../store/modules/fall/actions.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
	
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				title: '跌倒评估',
				ZYH: '',
				ZYHM: '',
				type: '',
				sm: 0,
				rs: '',
				
				patientInfo: {},
				assessmentID: '',
				EmployeeName: uni.getStorageSync('EmployeeName'),
			};
		},
		computed: {
			...mapGetters({
				now: 'FallNow',
				themeColor: 'FallThemeColor',
				pickerValueArray: 'FallPickerValueArray', 
				mode: 'FallMode', 
				deepLength: 'FallDeepLength', 
				pickerValueDefault: 'FallPickerValueDefault',
				
				Score: 'FallScore',
				SpeciallyMonitorObj: 'FallSpeciallyMonitorObj',
				InterventionOptions: 'FallInterventionOptions',
				HeadNurseNameObj: 'FallHeadNurseNameObj',
				Assessment1Options: 'FallAssessment1Options',
				AssessmentObj: 'FallAssessmentObj',
				Assessment4Options: 'FallAssessment4Options',
				Assessment5Options: 'FallAssessment5Options',
				Assessment6Options: 'FallAssessment6Options',
				haveSupervisor: 'FallHaveSupervisor',
				goToSupervisor: 'FallGoToSupervisor',
				Intervention: 'FallIntervention',
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
			goToSupervisor(val) {
				if (val) {
					uni.navigateTo({ 
						url: "../fallSupervisor/fallSupervisor?type=create&info=" + encodeURIComponent(JSON.stringify(this.patientInfo)) + "&fromAssess=1" +
							"&score=" + this.AssessScore + "&sm=" + this.sm + "&rs=" + this.Intervention
					 })
				}
			},
			'SpeciallyMonitorObj.SpeciallyMonitor'(val) {
				this.sm = val
			}
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type 		 	= decodeURIComponent(event.type)
				this.haveSupervisor = decodeURIComponent(event.haveSupervisor)
				this.patientInfo 	= JSON.parse(decodeURIComponent(event.info))
				if (this.type == 'edit') {
					let content  = JSON.parse(decodeURIComponent(event.content))
					this.assessmentID = content.Id
				}
			} catch (error) {
				this.type 		 	= event.type
				this.patientInfo 	= JSON.parse(event.info)
				this.haveSupervisor = event.haveSupervisor
				if (this.type == 'edit') {
					let content  = JSON.parse(event.content)
					this.assessmentID = content.Id
				}
			}
			this.ZYH  = this.patientInfo.ZYH
			this.ZYHM = this.patientInfo.ZYHM
			console.log(JSON.stringify(this.patientInfo))
			
			this.$store.dispatch(actionConstants.FALL_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			InterventionChange(e) {
				this.$store.commit(mutationConstants.FALL_INTERVENTION_CHECKBOX_CHANGE, e);
			},
			SpeciallyMonitorChange(e) {
				this.$store.commit(mutationConstants.FALL_SPECIALLY_MONITOR_SWITCH_CHANGE, e);
			},
			showHeadNurseNamePicker() {
				this.$store.commit(mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			},
			Assessment1Change(e) {
				this.$store.commit(mutationConstants.FALL_ASSESSMENT1_CHECKBOX_CHANGE, e);
			},
			Assessment2Change(e) {
				this.$store.commit(mutationConstants.FALL_ASSESSMENT2_SWITCH_CHANGE, e);
			},
			Assessment3Change(e) {
				this.$store.commit(mutationConstants.FALL_ASSESSMENT3_SWITCH_CHANGE, e);
			},
			Assessment4Change(e) {
				this.$store.commit(mutationConstants.FALL_ASSESSMENT4_CHECKBOX_CHANGE, e);
			},
			Assessment5Change(e) {
				this.$store.commit(mutationConstants.FALL_ASSESSMENT5_CHECKBOX_CHANGE, e);
			},
			Assessment6Change(e) {
				this.$store.commit(mutationConstants.FALL_ASSESSMENT6_CHECKBOX_CHANGE, e);
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.FALL_SUBMIT_BEFORE, {
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
	.content .list-cell-content { width: 100%; }
	.content_label { width: 35%; }
	.uni-list-cell > label { width: 60%; }
	.tips { padding: 0 30upx;color:#BEBEBE;height: 100upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
