<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<form @submit="submitForm" @reset="reset">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							宣教时间
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
						<label>入院宣教</label>
						
						<view class="list-cell-content">
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="AdmissionEducationObj && AdmissionEducationObj.AdmissionEducation1 == 1" 
										type="checkbox" color="#32CD32" @change="AdmissionEducation1Change" /></view>
								<view class="labelText">住院环境、制度、住院须知</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="AdmissionEducationObj && AdmissionEducationObj.AdmissionEducation2 == 1" 
										type="checkbox" color="#32CD32" @change="AdmissionEducation2Change" /></view>
								<view class="labelText">介绍责任医生、护士及病区联系方式</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="AdmissionEducationObj && AdmissionEducationObj.AdmissionEducation3 == 1" 
										type="checkbox" color="#32CD32" @change="AdmissionEducation3Change" /></view>
								<view class="labelText">患者的权力和义务</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="AdmissionEducationObj && AdmissionEducationObj.AdmissionEducation4 == 1" 
										type="checkbox" color="#32CD32" @change="AdmissionEducation4Change" /></view>
								<view class="labelText">信息卡的作用和重要性</view>
							</label>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>疾病知识</label>
						<view class="list-cell-content">
							<label class="uni-list-cell uni-list-cell-pd">
								<view><switch :checked="KnowledgeObj && KnowledgeObj.Knowledge == 1" 
										type="checkbox" color="#32CD32" @change="KnowledgeChange" /></view>
								<view class="labelText">介绍疾病的相关知识、治疗及预防</view>
							</label>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>检查须知</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<checkbox-group @change="NoticeOption1Change">
									<label class="uni-list-cell uni-list-cell-pd" v-for="item in NoticeOption1Options" :key="item.value">
										<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
										<view style="width: 250upx;">{{ item.label }}</view>
									</label>
								</checkbox-group>
							</view>
							<view class="uni-list-cell uni-input-row">
								<checkbox-group @change="NoticeOption2Change">
									<label class="uni-list-cell uni-list-cell-pd" v-for="item in NoticeOption2Options" :key="item.value">
										<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
										<view style="width: 250upx;">{{ item.label }}</view>
									</label>
								</checkbox-group>
							</view>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="NoticeObj && NoticeObj.Notice == 1" 
										type="checkbox" color="#32CD32" @change="NoticeChange" /></view>
								<view class="labelText">检查项目的时间、目的及注意事项</view>
							</label>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>饮食</label>
						<view class="list-cell-content">
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="DietsObj && DietsObj.Diets1 == 1" 
										type="checkbox" color="#32CD32" @change="Diets1Change" /></view>
								<view class="labelText">饮食的种类</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="DietsObj && DietsObj.Diets2 == 1" 
										type="checkbox" color="#32CD32" @change="Diets2Change" /></view>
								<view class="labelText">相关知识宣教</view>
							</label>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>药物</label>
						<view class="list-cell-content">
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="MedicineObj && MedicineObj.Medicine == 1" 
										type="checkbox" color="#32CD32" @change="MedicineChange" /></view>
								<view class="labelText">所用药物的名称、作用及方法</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<label style="width: 40%;">注意事项</label>
								<view class="list-cell-content">
									<checkbox-group @change="MedicineOptionChange">
										<label class="uni-list-cell uni-list-cell-pd" v-for="item in MedicineOptions" :key="item.value">
											<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
											<view>{{ item.label }}</view>
										</label>
									</checkbox-group>
								</view>
							</label>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>康复护理技术指导</label>
						<view class="list-cell-content">
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance1 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance1Change" /></view>
								<view class="labelText">心理指导</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance2 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance2Change" /></view>
								<view class="labelText">良肢位摆放</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance3 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance3Change" /></view>
								<view class="labelText">主、被动运动指导</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance4 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance4Change" /></view>
								<view class="labelText">体味转移</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance5 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance5Change" /></view>
								<view class="labelText">步行指导</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance6 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance6Change" /></view>
								<view class="labelText">有效咳嗽、咳痰及呼吸训练指导</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance7 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance7Change" /></view>
								<view class="labelText">语言及认知交流</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance8 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance8Change" /></view>
								<view class="labelText">ADL指导</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance9 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance9Change" /></view>
								<view class="labelText">皮肤护理</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance10 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance10Change" /></view>
								<view class="labelText">摄食营养指导</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance11 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance11Change" /></view>
								<view class="labelText">膀胱功能训练指导</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance12 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance12Change" /></view>
								<view class="labelText">排便指导</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance13 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance13Change" /></view>
								<view class="labelText">相关并发症的宣教</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance14 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance14Change" /></view>
								<view class="labelText">辅助器具使用及保养</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="GuidanceObj && GuidanceObj.Guidance15 == 1" 
										type="checkbox" color="#32CD32" @change="Guidance15Change" /></view>
								<view class="labelText">安全防护</view>
							</label>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>指导对象</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<checkbox-group @change="GuidanceTargetChange">
									<label class="uni-list-cell uni-list-cell-pd" v-for="item in GuidanceTargetOption" :key="item.value">
										<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
										<view style="width: 250upx;">{{ item.label }}</view>
									</label>
								</checkbox-group>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label style="width: 35%;">患者、家属和陪护的需求</label>
						<view class="list-cell-content">
							<label class="uni-list-cell uni-input-row">
								<label>进一步宣教的需求</label>
								<view class="list-cell-content" style="padding-left: 50upx;">
									<switch color="#32CD32" @change="DemandChange" :checked="DemandObj && DemandObj.Demand == 1"/>
								</view>
							</label>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>宣教方法</label>
						<view class="list-cell-content">
							<view class="uni-list-cell uni-input-row">
								<checkbox-group @change="EducationWaysChange">
									<label class="uni-list-cell uni-list-cell-pd" v-for="item in EducationWaysOption" :key="item.value">
										<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
										<view style="width: 250upx;">{{ item.label }}</view>
									</label>
								</checkbox-group>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label style="width: 40%;">实施者签名</label>
								<view class="list-cell-content">
									<input class="uni-input" name="ImplementerName" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="ImplementerName"
											@focus="InputFocus" @blur="InputBlur" />
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list uni-input-group uni-common-mt">
					<view class="uni-list-cell uni-input-row">
						<label>宣教评价</label>
						<view class="list-cell-content">
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="EducationAssessObj && EducationAssessObj.EducationAssess1 == 1" 
										type="checkbox" color="#32CD32" @change="EducationAssess1Change" /></view>
								<view class="labelText">已掌握</view>
							</label>
							<label class="uni-list-cell uni-input-row">
								<view><switch :checked="EducationAssessObj && EducationAssessObj.EducationAssess2 == 1" 
										type="checkbox" color="#32CD32" @change="EducationAssess2Change" /></view>
								<view class="labelText">再需要进一步指导</view>
							</label>
							<view class="uni-list-cell uni-input-row">
								<label style="width: 40%;">评价时间</label>
								<view class="list-cell-content">
									<input class="uni-input" name="CollectionDate" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="CollectionDate"
											@focus="InputFocus" @blur="InputBlur" />
								</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<label style="width: 40%;">评价者签名</label>
								<view class="list-cell-content">
									<input class="uni-input" name="EvaluateName" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="EvaluateName"
											@focus="InputFocus" @blur="InputBlur" />
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
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../store/modules/edu34/mutations.js'
	import * as actionConstants from '../../store/modules/edu34/actions.js'
	
	export default {
		data() {
			return {
				title: '康复宣教',
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
				now: 'Edu34Now',
				AdmissionEducationObj: 'Edu34AdmissionEducationObj', 
				KnowledgeObj: 'Edu34KnowledgeObj', 
				NoticeOption1Options: 'Edu34NoticeOption1Options', 
				NoticeOption2Options: 'Edu34NoticeOption2Options',
				NoticeObj: 'Edu34NoticeObj', 
				DietsObj: 'Edu34DietsObj', 
				MedicineObj: 'Edu34MedicineObj', 
				MedicineOptions: 'Edu34MedicineOptions',
				GuidanceObj: 'Edu34GuidanceObj', 
				GuidanceTargetOption: 'Edu34GuidanceTargetOption', 
				DemandObj: 'Edu34DemandObj', 
				EducationWaysOption: 'Edu34EducationWaysOption', 
				EducationAssessObj: 'Edu34EducationAssessObj',
				ImplementerName: 'Edu34ImplementerName', 
				CollectionDate: 'Edu34CollectionDate', 
				EvaluateName: 'Edu34EvaluateName'
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
			
			this.$store.dispatch(actionConstants.EDU34_INIT, { info: this.patientInfo, type: this.type, id: this.assessmentID })
		},
		methods: {
			InputFocus() {
				this.inputFocus = !this.inputFocus
			},
			InputBlur() {
				this.inputFocus = !this.inputFocus
			},
			AdmissionEducation1Change(e){
				this.$store.commit(mutationConstants.EDU34_ADMISSION_EDUCATION1_SWITCH_CHANGE, e);
			},
			AdmissionEducation2Change(e){
				this.$store.commit(mutationConstants.EDU34_ADMISSION_EDUCATION2_SWITCH_CHANGE, e);
			},
			AdmissionEducation3Change(e){
				this.$store.commit(mutationConstants.EDU34_ADMISSION_EDUCATION3_SWITCH_CHANGE, e);
			},
			AdmissionEducation4Change(e){
				this.$store.commit(mutationConstants.EDU34_ADMISSION_EDUCATION4_SWITCH_CHANGE, e);
			},
			KnowledgeChange(e){
				this.$store.commit(mutationConstants.EDU34_KNOWLEDGE_SWITCH_CHANGE, e);
			},
			NoticeChange(e){
				this.$store.commit(mutationConstants.EDU34_NOTICE_SWITCH_CHANGE, e);
			},
			Diets1Change(e){
				this.$store.commit(mutationConstants.EDU34_DIETS1_SWITCH_CHANGE, e);
			},
			Diets2Change(e){
				this.$store.commit(mutationConstants.EDU34_DIETS2_SWITCH_CHANGE, e);
			},
			MedicineChange(e){
				this.$store.commit(mutationConstants.EDU34_MEDICINE_SWITCH_CHANGE, e);
			},
			Guidance1Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE1_SWITCH_CHANGE, e);
			},
			Guidance2Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE2_SWITCH_CHANGE, e);
			},
			Guidance3Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE3_SWITCH_CHANGE, e);
			},
			Guidance4Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE4_SWITCH_CHANGE, e);
			},
			Guidance5Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE5_SWITCH_CHANGE, e);
			},
			Guidance6Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE6_SWITCH_CHANGE, e);
			},
			Guidance7Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE7_SWITCH_CHANGE, e);
			},
			Guidance8Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE8_SWITCH_CHANGE, e);
			},
			Guidance9Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE9_SWITCH_CHANGE, e);
			},
			Guidance10Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE10_SWITCH_CHANGE, e);
			},
			Guidance11Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE11_SWITCH_CHANGE, e);
			},
			Guidance12Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE12_SWITCH_CHANGE, e);
			},
			Guidance13Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE13_SWITCH_CHANGE, e);
			},
			Guidance14Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE14_SWITCH_CHANGE, e);
			},
			Guidance15Change(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE15_SWITCH_CHANGE, e);
			},
			DemandChange(e){
				this.$store.commit(mutationConstants.EDU34_DEMAND_SWITCH_CHANGE, e);
			},
			EducationAssess1Change(e){
				this.$store.commit(mutationConstants.EDU34_EDUCATION_ASSESS1_SWITCH_CHANGE, e);
			},
			EducationAssess2Change(e){
				this.$store.commit(mutationConstants.EDU34_EDUCATION_ASSESS2_SWITCH_CHANGE, e);
			},
			NoticeOption1Change(e){
				this.$store.commit(mutationConstants.EDU34_NOTICE_OPTION1_CHECKBOX_CHANGE, e);
			},
			NoticeOption2Change(e){
				this.$store.commit(mutationConstants.EDU34_NOTICE_OPTION2_CHECKBOX_CHANGE, e);
			},
			MedicineOptionChange(e){
				this.$store.commit(mutationConstants.EDU34_MEDICINE_OPTION_CHECKBOX_CHANGE, e);
			},
			GuidanceTargetChange(e){
				this.$store.commit(mutationConstants.EDU34_GUIDANCE_TARGET_CHECKBOX_CHANGE, e);
			},
			EducationWaysChange(e){
				this.$store.commit(mutationConstants.EDU34_EDUCATION_WAYS_CHECKBOX_CHANGE, e);
			},
			submitForm(e) {
				this.$store.dispatch(actionConstants.EDU34_SUBMIT_BEFORE, {
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
			
		}
	}
</script>

<style>
	.list-cell-content { width: 75%; }
	.labelText { padding-left: 40upx; }
	.buttonFixed { position: fixed;bottom: 0;left: 30upx; z-index: 100; }
</style>
