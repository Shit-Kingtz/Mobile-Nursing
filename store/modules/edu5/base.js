import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/edu/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as eduListMutationConstants from '../eduList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	Edu5Now: '',
	Edu5AdmissionEducationObj: {
		AdmissionEducation1: 0,
		AdmissionEducation2: 0,
		AdmissionEducation3: 0,
		AdmissionEducation4: 0
	},
	Edu5KnowledgeObj: {
		Knowledge: 0,
		Knowledge1: 0
	},
	Edu5NoticeObj: {
		Notice: 0
	},
	Edu5NoticeOption1Options: [
		{ type: 'NoticeOption1', value: 1, label: '化验' },
		{ type: 'NoticeOption1', value: 2, label: '放射检查' },
		{ type: 'NoticeOption1', value: 3, label: 'B超' },
		{ type: 'NoticeOption1', value: 4, label: '心电图' },
	],
	Edu5NoticeOption2Options: [
		{ type: 'NoticeOption2', value: 1, label: '动态心电图' },
		{ type: 'NoticeOption2', value: 2, label: '动态血压' },
		{ type: 'NoticeOption2', value: 3, label: '其他' },
	],
	Edu5DietsObj: {
		Diets1: 0,
		Diets2: 0
	},
	Edu5MedicineObj: {
		Medicine: 0,
		Medicine1: 0
	},
	Edu5GuidanceObj: {
		Guidance1: 0,
		Guidance2: 0,
		Guidance3: 0,
		Guidance4: 0,
		Guidance5: 0,
		Guidance6: 0,
		Guidance7: 0,
		Guidance8: 0,
		Guidance9: 0,
		Guidance10: 0,
		Guidance11: 0,
		Guidance12: 0,
		Guidance13: 0,
		Guidance14: 0,
	},
	Edu5GuidanceTargetOption: [
		{ type: 'GuidanceTarget', value: 1, label: '患者' },
		{ type: 'GuidanceTarget', value: 2, label: '家属' },
		{ type: 'GuidanceTarget', value: 3, label: '陪护' },
	],
	Edu5DemandObj: {
		Demand: 0
	},
	Edu5EducationWaysOption: [
		{ type: 'EducationWay', value: 1, label: '讲解' },
		{ type: 'EducationWay', value: 2, label: '资料' },
		{ type: 'EducationWay', value: 3, label: '示范' },
		{ type: 'EducationWay', value: 4, label: '视频' },
	],
	Edu5EducationAssessObj: {
		EducationAssess1: 0,
		EducationAssess2: 0
	},
	Edu5ImplementerName: '',
	Edu5CollectionDate: '',
	Edu5EvaluateName: '',
}

const getters = {
	Edu5Now: state => state.Edu5Now,
	Edu5AdmissionEducationObj: state => state.Edu5AdmissionEducationObj,
	Edu5KnowledgeObj: state => state.Edu5KnowledgeObj,
	Edu5NoticeObj: state => state.Edu5NoticeObj,
	Edu5NoticeOption1Options: state => state.Edu5NoticeOption1Options,
	Edu5NoticeOption2Options: state => state.Edu5NoticeOption2Options,
	Edu5DietsObj: state => state.Edu5DietsObj,
	Edu5MedicineObj: state => state.Edu5MedicineObj,
	Edu5GuidanceObj: state => state.Edu5GuidanceObj,
	Edu5GuidanceTargetOption: state => state.Edu5GuidanceTargetOption,
	Edu5DemandObj: state => state.Edu5DemandObj,
	Edu5EducationWaysOption: state => state.Edu5EducationWaysOption,
	Edu5EducationAssessObj: state => state.Edu5EducationAssessObj,
	Edu5ImplementerName: state => state.Edu5ImplementerName,
	Edu5CollectionDate: state => state.Edu5CollectionDate,
	Edu5EvaluateName: state => state.Edu5EvaluateName,
}

const actions = {
	[actionConstants.EDU5_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.initInfo(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_EDU5_CONTENT, {info: content, type: payload.type})
			commit(mutationConstants.SET_EDU5_CHECKBOX, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},1000)
		})
	},
	[actionConstants.EDU5_SUBMIT_BEFORE] ({commit}, payload) {
		let params = {
			AdmissionEducation1: state.Edu5AdmissionEducationObj.AdmissionEducation1,
			AdmissionEducation2: state.Edu5AdmissionEducationObj.AdmissionEducation2,
			AdmissionEducation3: state.Edu5AdmissionEducationObj.AdmissionEducation3,
			AdmissionEducation4: state.Edu5AdmissionEducationObj.AdmissionEducation4,
			CollectionDate: payload.formData.CollectionDate,
			Demand: state.Edu5DemandObj.Demand,
			Diets1: state.Edu5DietsObj.Diets1,
			Diets2: state.Edu5DietsObj.Diets2,
			EducationAssess1: state.Edu5EducationAssessObj.EducationAssess1,
			EducationAssess2: state.Edu5EducationAssessObj.EducationAssess2,
			EducationDate: state.Edu5Now,
			EducationWays: kftools.getCheckBoxStr(state.Edu5EducationWaysOption),
			EvaluateName: payload.formData.EvaluateName,
			Guidance1: state.Edu5GuidanceObj.Guidance1,
			Guidance2: state.Edu5GuidanceObj.Guidance2,
			Guidance3: state.Edu5GuidanceObj.Guidance3,
			Guidance4: state.Edu5GuidanceObj.Guidance4,
			Guidance5: state.Edu5GuidanceObj.Guidance5,
			Guidance6: state.Edu5GuidanceObj.Guidance6,
			Guidance7: state.Edu5GuidanceObj.Guidance7,
			Guidance8: state.Edu5GuidanceObj.Guidance8,
			Guidance9: state.Edu5GuidanceObj.Guidance9,
			Guidance10: state.Edu5GuidanceObj.Guidance10,
			Guidance11: state.Edu5GuidanceObj.Guidance11,
			Guidance12: state.Edu5GuidanceObj.Guidance12,
			Guidance13: state.Edu5GuidanceObj.Guidance13,
			Guidance14: state.Edu5GuidanceObj.Guidance14,
			Guidance15: 0,
			GuidanceTarget: kftools.getCheckBoxStr(state.Edu5GuidanceTargetOption),
			HospitalizedHisID: payload.info.ZYH,
			HospitalizedID: '',
			ImplementerName: payload.formData.ImplementerName,
			Knowledge: state.Edu5KnowledgeObj.Knowledge,
			Knowledge1: state.Edu5KnowledgeObj.Knowledge1,
			Medicine: state.Edu5MedicineObj.Medicine,
			Medicine1: state.Edu5MedicineObj.Medicine1,
			MedicineOption: '',
			Notice: state.Edu5NoticeObj.Notice,
			NoticeOption1: kftools.getCheckBoxStr(state.Edu5NoticeOption1Options),
			NoticeOption2: kftools.getCheckBoxStr(state.Edu5NoticeOption2Options),
			PatientHisID: payload.info.ZYHM,
			PatientID: '',
			PatientName: payload.info.PaientName,
			
			EmployeeID: uni.getStorageSync('EmployeeID'),
			UserID: uni.getStorageSync('UserID'),
		}
		console.log(JSON.stringify(params))
		
		commit(inPatientMutationConstants.SUBMIT_START)
		base.submit(params, payload.id, payload.type)
			.then((msg) => {
				commit(inPatientMutationConstants.SUBMIT_DONE)
				commit(inPatientMutationConstants.SHOW_MESSAGE, msg)
				commit(eduListMutationConstants.SET_IS_FROM_SUBMIT_TRUE)
				setTimeout(() => {
					uni.navigateBack({ delta: 1 })
				},500)
			})
			.catch((msg) => {
				commit(inPatientMutationConstants.SUBMIT_DONE)
				commit(inPatientMutationConstants.SHOW_MESSAGE, msg)
			})
	},
}

const mutations = {
	[mutationConstants.NOW_INIT] (state, payload) {
		state.Edu5Now = payload
	},
	[mutationConstants.SET_EDU5_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.Edu5Now = payload.type == 'create' ? state.Edu5Now : assessmentInfo.EducationDate.replace('T', ' ')
		state.Edu5AdmissionEducationObj = payload.type == 'create' ? { AdmissionEducation1: 0, AdmissionEducation2: 0, AdmissionEducation3: 0, AdmissionEducation4: 0, } : 
		  { AdmissionEducation1: assessmentInfo.AdmissionEducation1, AdmissionEducation2: assessmentInfo.AdmissionEducation2,
			AdmissionEducation3: assessmentInfo.AdmissionEducation3, AdmissionEducation4: assessmentInfo.AdmissionEducation4 }
		state.Edu5KnowledgeObj = payload.type == 'create' ? { Knowledge: 0, Knowledge1: 0 } : { Knowledge: assessmentInfo.Knowledge, Knowledge1: assessmentInfo.Knowledge1 }
		state.Edu5NoticeObj = payload.type == 'create' ? { Notice: 0 } : { Notice: assessmentInfo.Notice }
		state.Edu5DietsObj = payload.type == 'create' ? { Diets1: 0, Diets2: 0 } : { Diets1: assessmentInfo.Diets1, Diets2: assessmentInfo.Diets2 }
		state.Edu5MedicineObj = payload.type == 'create' ? { Medicine: 0, Medicine1: 0 } : { Medicine: assessmentInfo.Medicine, Medicine1: assessmentInfo.Medicine1 }
		state.Edu5GuidanceObj = payload.type == 'create' ? { Guidance1: 0, Guidance2: 0, Guidance3: 0, Guidance4: 0, Guidance5: 0, Guidance6: 0, Guidance7: 0,
			Guidance8: 0, Guidance9: 0, Guidance10: 0, Guidance11: 0, Guidance12: 0, Guidance13: 0, Guidance14: 0 } : 
		  { Guidance1: assessmentInfo.Guidance1, Guidance2: assessmentInfo.Guidance2, Guidance3: assessmentInfo.Guidance3, Guidance4: assessmentInfo.Guidance4,
			Guidance5: assessmentInfo.Guidance5, Guidance6: assessmentInfo.Guidance6, Guidance7: assessmentInfo.Guidance7, Guidance8: assessmentInfo.Guidance8,
			Guidance9: assessmentInfo.Guidance9, Guidance10: assessmentInfo.Guidance10, Guidance11: assessmentInfo.Guidance11, Guidance12: assessmentInfo.Guidance12,
			Guidance13: assessmentInfo.Guidance13, Guidance14: assessmentInfo.Guidance14 }
		state.Edu5DemandObj = payload.type == 'create' ? { Demand: 0 } : { Demand: assessmentInfo.Demand }
		state.Edu5EducationAssessObj = payload.type == 'create' ? { EducationAssess1: 0, EducationAssess2: 0 } : 
			{ EducationAssess1: assessmentInfo.EducationAssess1, EducationAssess2: assessmentInfo.EducationAssess2 }
		state.Edu5ImplementerName = payload.type == 'create' ? uni.getStorageSync('EmployeeName') : assessmentInfo.ImplementerName,
		state.Edu5CollectionDate = (payload.type == 'create' || !assessmentInfo.CollectionDate) ? '' : assessmentInfo.CollectionDate.replace('T', ' ')
		state.Edu5EvaluateName = payload.type == 'create' ? '' : assessmentInfo.EvaluateName
	},
	[mutationConstants.SET_EDU5_CHECKBOX] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		if (payload.type == 'create') {
			state.Edu5NoticeOption1Options.forEach((item) => item.checked = false)
			state.Edu5NoticeOption2Options.forEach((item) => item.checked = false)
			state.Edu5GuidanceTargetOption.forEach((item) => item.checked = false)
			state.Edu5EducationWaysOption.forEach((item) => item.checked = false)
		} else {
			kftools.checkBoxValueInit(assessmentInfo.NoticeOption1).forEach((item, index) => state.Edu5NoticeOption1Options[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.NoticeOption2).forEach((item, index) => state.Edu5NoticeOption2Options[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.GuidanceTarget).forEach((item, index) => state.Edu5GuidanceTargetOption[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.EducationWays).forEach((item, index) => state.Edu5EducationWaysOption[index].checked = item)
		}
	},
	[mutationConstants.EDU5_ADMISSION_EDUCATION1_SWITCH_CHANGE] (state, payload) {
		state.Edu5AdmissionEducationObj.AdmissionEducation1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_ADMISSION_EDUCATION2_SWITCH_CHANGE] (state, payload) {
		state.Edu5AdmissionEducationObj.AdmissionEducation2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_ADMISSION_EDUCATION3_SWITCH_CHANGE] (state, payload) {
		state.Edu5AdmissionEducationObj.AdmissionEducation3 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_ADMISSION_EDUCATION4_SWITCH_CHANGE] (state, payload) {
		state.Edu5AdmissionEducationObj.AdmissionEducation4 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_KNOWLEDGE_SWITCH_CHANGE] (state, payload) {
		state.Edu5KnowledgeObj.Knowledge = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_KNOWLEDGE1_SWITCH_CHANGE] (state, payload) {
		state.Edu5KnowledgeObj.Knowledge1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_NOTICE_SWITCH_CHANGE] (state, payload) {
		state.Edu5NoticeObj.Notice = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_DIETS1_SWITCH_CHANGE] (state, payload) {
		state.Edu5DietsObj.Diets1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_DIETS2_SWITCH_CHANGE] (state, payload) {
		state.Edu5DietsObj.Diets2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_MEDICINE_SWITCH_CHANGE] (state, payload) {
		state.Edu5MedicineObj.Medicine = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_MEDICINE1_SWITCH_CHANGE] (state, payload) {
		state.Edu5MedicineObj.Medicine1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE1_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE2_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE3_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance3 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE4_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance4 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE5_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance5 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE6_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance6 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE7_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance7 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE8_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance8 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE9_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance9 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE10_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance10 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE11_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance11 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE12_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance12 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE13_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance13 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_GUIDANCE14_SWITCH_CHANGE] (state, payload) {
		state.Edu5GuidanceObj.Guidance14 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_DEMAND_SWITCH_CHANGE] (state, payload) {
		state.Edu5DemandObj.Demand = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_EDUCATION_ASSESS1_SWITCH_CHANGE] (state, payload) {
		state.Edu5EducationAssessObj.EducationAssess1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_EDUCATION_ASSESS2_SWITCH_CHANGE] (state, payload) {
		state.Edu5EducationAssessObj.EducationAssess2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU5_NOTICE_OPTION1_CHECKBOX_CHANGE] (state, payload) {
		let items = state.Edu5NoticeOption1Options,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.EDU5_NOTICE_OPTION2_CHECKBOX_CHANGE] (state, payload) {
		let items = state.Edu5NoticeOption2Options,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.EDU5_GUIDANCE_TARGET_CHECKBOX_CHANGE] (state, payload) {
		let items = state.Edu5GuidanceTargetOption,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.EDU5_EDUCATION_WAYS_CHECKBOX_CHANGE] (state, payload) {
		let items = state.Edu5EducationWaysOption,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}