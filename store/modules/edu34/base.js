import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/edu/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as eduListMutationConstants from '../eduList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	Edu34Now: '',
	Edu34AdmissionEducationObj: {
		AdmissionEducation1: 0,
		AdmissionEducation2: 0,
		AdmissionEducation3: 0,
		AdmissionEducation4: 0
	},
	Edu34KnowledgeObj: {
		Knowledge: 0
	},
	Edu34NoticeObj: {
		Notice: 0
	},
	Edu34NoticeOption1Options: [
		{ type: 'NoticeOption1', value: 1, label: '化验' },
		{ type: 'NoticeOption1', value: 2, label: '放射检查' },
		{ type: 'NoticeOption1', value: 3, label: 'B超' },
	],
	Edu34NoticeOption2Options: [
		{ type: 'NoticeOption2', value: 1, label: '心电图' },
		{ type: 'NoticeOption2', value: 2, label: '动态心电图' },
		{ type: 'NoticeOption2', value: 3, label: '动态血压' },
		{ type: 'NoticeOption2', value: 4, label: '其他' },
	],
	Edu34DietsObj: {
		Diets1: 0,
		Diets2: 0
	},
	Edu34MedicineObj: {
		Medicine: 0,
	},
	Edu34MedicineOptions: [
		{ type: 'MedicineOption', value: 1, label: '自备药' },
		{ type: 'MedicineOption', value: 2, label: '医嘱药' },
	],
	Edu34GuidanceObj: {
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
		Guidance15: 0,
	},
	Edu34GuidanceTargetOption: [
		{ type: 'GuidanceTarget', value: 1, label: '患者' },
		{ type: 'GuidanceTarget', value: 2, label: '家属' },
		{ type: 'GuidanceTarget', value: 3, label: '陪护' },
	],
	Edu34DemandObj: {
		Demand: 0
	},
	Edu34EducationWaysOption: [
		{ type: 'EducationWay', value: 1, label: '讲解' },
		{ type: 'EducationWay', value: 2, label: '资料' },
		{ type: 'EducationWay', value: 3, label: '示范' },
		{ type: 'EducationWay', value: 4, label: '视频' },
	],
	Edu34EducationAssessObj: {
		EducationAssess1: 0,
		EducationAssess2: 0
	},
	Edu34ImplementerName: '',
	Edu34CollectionDate: '',
	Edu34EvaluateName: '',
}

const getters = {
	Edu34Now: state => state.Edu34Now,
	Edu34AdmissionEducationObj: state => state.Edu34AdmissionEducationObj,
	Edu34KnowledgeObj: state => state.Edu34KnowledgeObj,
	Edu34NoticeObj: state => state.Edu34NoticeObj,
	Edu34NoticeOption1Options: state => state.Edu34NoticeOption1Options,
	Edu34NoticeOption2Options: state => state.Edu34NoticeOption2Options,
	Edu34DietsObj: state => state.Edu34DietsObj,
	Edu34MedicineObj: state => state.Edu34MedicineObj,
	Edu34MedicineOptions: state => state.Edu34MedicineOptions,
	Edu34GuidanceObj: state => state.Edu34GuidanceObj,
	Edu34GuidanceTargetOption: state => state.Edu34GuidanceTargetOption,
	Edu34DemandObj: state => state.Edu34DemandObj,
	Edu34EducationWaysOption: state => state.Edu34EducationWaysOption,
	Edu34EducationAssessObj: state => state.Edu34EducationAssessObj,
	Edu34ImplementerName: state => state.Edu34ImplementerName,
	Edu34CollectionDate: state => state.Edu34CollectionDate,
	Edu34EvaluateName: state => state.Edu34EvaluateName,
}

const actions = {
	[actionConstants.EDU34_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.initInfo(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_EDU34_CONTENT, {info: content, type: payload.type})
			commit(mutationConstants.SET_EDU34_CHECKBOX, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},1000)
		})
	},
	[actionConstants.EDU34_SUBMIT_BEFORE] ({commit}, payload) {
		let params = {
			AdmissionEducation1: state.Edu34AdmissionEducationObj.AdmissionEducation1,
			AdmissionEducation2: state.Edu34AdmissionEducationObj.AdmissionEducation2,
			AdmissionEducation3: state.Edu34AdmissionEducationObj.AdmissionEducation3,
			AdmissionEducation4: state.Edu34AdmissionEducationObj.AdmissionEducation4,
			CollectionDate: payload.formData.CollectionDate,
			Demand: state.Edu34DemandObj.Demand,
			Diets1: state.Edu34DietsObj.Diets1,
			Diets2: state.Edu34DietsObj.Diets2,
			EducationAssess1: state.Edu34EducationAssessObj.EducationAssess1,
			EducationAssess2: state.Edu34EducationAssessObj.EducationAssess2,
			EducationDate: state.Edu34Now,
			EducationWays: kftools.getCheckBoxStr(state.Edu34EducationWaysOption),
			EvaluateName: payload.formData.EvaluateName,
			Guidance1: state.Edu34GuidanceObj.Guidance1,
			Guidance2: state.Edu34GuidanceObj.Guidance2,
			Guidance3: state.Edu34GuidanceObj.Guidance3,
			Guidance4: state.Edu34GuidanceObj.Guidance4,
			Guidance5: state.Edu34GuidanceObj.Guidance5,
			Guidance6: state.Edu34GuidanceObj.Guidance6,
			Guidance7: state.Edu34GuidanceObj.Guidance7,
			Guidance8: state.Edu34GuidanceObj.Guidance8,
			Guidance9: state.Edu34GuidanceObj.Guidance9,
			Guidance10: state.Edu34GuidanceObj.Guidance10,
			Guidance11: state.Edu34GuidanceObj.Guidance11,
			Guidance12: state.Edu34GuidanceObj.Guidance12,
			Guidance13: state.Edu34GuidanceObj.Guidance13,
			Guidance14: state.Edu34GuidanceObj.Guidance14,
			Guidance15: state.Edu34GuidanceObj.Guidance15,
			GuidanceTarget: kftools.getCheckBoxStr(state.Edu34GuidanceTargetOption),
			HospitalizedHisID: payload.info.ZYH,
			HospitalizedID: '',
			ImplementerName: payload.formData.ImplementerName,
			Knowledge: state.Edu34KnowledgeObj.Knowledge,
			Medicine: state.Edu34MedicineObj.Medicine,
			MedicineOption: kftools.getCheckBoxStr(state.Edu34MedicineOptions),
			Notice: state.Edu34NoticeObj.Notice,
			NoticeOption1: kftools.getCheckBoxStr(state.Edu34NoticeOption1Options),
			NoticeOption2: kftools.getCheckBoxStr(state.Edu34NoticeOption2Options),
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
		state.Edu34Now = payload
	},
	[mutationConstants.SET_EDU34_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.Edu34Now = payload.type == 'create' ? state.Edu34Now : assessmentInfo.EducationDate.replace('T', ' ')
		state.Edu34AdmissionEducationObj = payload.type == 'create' ? { AdmissionEducation1: 0, AdmissionEducation2: 0, AdmissionEducation3: 0, AdmissionEducation4: 0, } : 
		  { AdmissionEducation1: assessmentInfo.AdmissionEducation1, AdmissionEducation2: assessmentInfo.AdmissionEducation2,
			AdmissionEducation3: assessmentInfo.AdmissionEducation3, AdmissionEducation4: assessmentInfo.AdmissionEducation4 }
		state.Edu34KnowledgeObj = payload.type == 'create' ? { Knowledge: 0 } : { Knowledge: assessmentInfo.Knowledge }
		state.Edu34NoticeObj = payload.type == 'create' ? { Notice: 0 } : { Notice: assessmentInfo.Notice }
		state.Edu34DietsObj = payload.type == 'create' ? { Diets1: 0, Diets2: 0 } : { Diets1: assessmentInfo.Diets1, Diets2: assessmentInfo.Diets2 }
		state.Edu34MedicineObj = payload.type == 'create' ? { Medicine: 0 } : { Medicine: assessmentInfo.Medicine }
		state.Edu34GuidanceObj = payload.type == 'create' ? { Guidance1: 0, Guidance2: 0, Guidance3: 0, Guidance4: 0, Guidance5: 0, Guidance6: 0, Guidance7: 0,
			Guidance8: 0, Guidance9: 0, Guidance10: 0, Guidance11: 0, Guidance12: 0, Guidance13: 0, Guidance14: 0, Guidance15: 0 } : 
		  { Guidance1: assessmentInfo.Guidance1, Guidance2: assessmentInfo.Guidance2, Guidance3: assessmentInfo.Guidance3, Guidance4: assessmentInfo.Guidance4,
			Guidance5: assessmentInfo.Guidance5, Guidance6: assessmentInfo.Guidance6, Guidance7: assessmentInfo.Guidance7, Guidance8: assessmentInfo.Guidance8,
			Guidance9: assessmentInfo.Guidance9, Guidance10: assessmentInfo.Guidance10, Guidance11: assessmentInfo.Guidance11, Guidance12: assessmentInfo.Guidance12,
			Guidance13: assessmentInfo.Guidance13, Guidance14: assessmentInfo.Guidance14, Guidance15: assessmentInfo.Guidance15 }
		state.Edu34DemandObj = payload.type == 'create' ? { Demand: 0 } : { Demand: assessmentInfo.Demand }
		state.Edu34EducationAssessObj = payload.type == 'create' ? { EducationAssess1: 0, EducationAssess2: 0 } : 
			{ EducationAssess1: assessmentInfo.EducationAssess1, EducationAssess2: assessmentInfo.EducationAssess2 }
		state.Edu34ImplementerName = payload.type == 'create' ? '' : assessmentInfo.ImplementerName
		state.Edu34CollectionDate = (payload.type == 'create' || !assessmentInfo.CollectionDate) ? '' : assessmentInfo.CollectionDate.replace('T', ' ')
		state.Edu34EvaluateName = payload.type == 'create' ? '' : assessmentInfo.EvaluateName
	},
	[mutationConstants.SET_EDU34_CHECKBOX] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)

		if (payload.type == 'create') {
			state.Edu34NoticeOption1Options.forEach((item) => item.checked = false)
			state.Edu34NoticeOption2Options.forEach((item) => item.checked = false)
			state.Edu34MedicineOptions.forEach((item) => item.checked = false)
			state.Edu34GuidanceTargetOption.forEach((item) => item.checked = false)
			state.Edu34EducationWaysOption.forEach((item) => item.checked = false)
		} else {
			kftools.checkBoxValueInit(assessmentInfo.NoticeOption1).forEach((item, index) => state.Edu34NoticeOption1Options[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.NoticeOption2).forEach((item, index) => state.Edu34NoticeOption2Options[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.MedicineOption).forEach((item, index) => state.Edu34MedicineOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.GuidanceTarget).forEach((item, index) => state.Edu34GuidanceTargetOption[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.EducationWays).forEach((item, index) => state.Edu34EducationWaysOption[index].checked = item)
		}
	},
	[mutationConstants.EDU34_ADMISSION_EDUCATION1_SWITCH_CHANGE] (state, payload) {
		state.Edu34AdmissionEducationObj.AdmissionEducation1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_ADMISSION_EDUCATION2_SWITCH_CHANGE] (state, payload) {
		state.Edu34AdmissionEducationObj.AdmissionEducation2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_ADMISSION_EDUCATION3_SWITCH_CHANGE] (state, payload) {
		state.Edu34AdmissionEducationObj.AdmissionEducation3 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_ADMISSION_EDUCATION4_SWITCH_CHANGE] (state, payload) {
		state.Edu34AdmissionEducationObj.AdmissionEducation4 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_KNOWLEDGE_SWITCH_CHANGE] (state, payload) {
		state.Edu34KnowledgeObj.Knowledge = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_NOTICE_SWITCH_CHANGE] (state, payload) {
		state.Edu34NoticeObj.Notice = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_DIETS1_SWITCH_CHANGE] (state, payload) {
		state.Edu34DietsObj.Diets1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_DIETS2_SWITCH_CHANGE] (state, payload) {
		state.Edu34DietsObj.Diets2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_MEDICINE_SWITCH_CHANGE] (state, payload) {
		state.Edu34MedicineObj.Medicine = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE1_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE2_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE3_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance3 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE4_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance4 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE5_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance5 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE6_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance6 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE7_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance7 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE8_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance8 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE9_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance9 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE10_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance10 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE11_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance11 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE12_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance12 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE13_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance13 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE14_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance14 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_GUIDANCE15_SWITCH_CHANGE] (state, payload) {
		state.Edu34GuidanceObj.Guidance15 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_DEMAND_SWITCH_CHANGE] (state, payload) {
		state.Edu34DemandObj.Demand = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_EDUCATION_ASSESS1_SWITCH_CHANGE] (state, payload) {
		state.Edu34EducationAssessObj.EducationAssess1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_EDUCATION_ASSESS2_SWITCH_CHANGE] (state, payload) {
		state.Edu34EducationAssessObj.EducationAssess2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.EDU34_NOTICE_OPTION1_CHECKBOX_CHANGE] (state, payload) {
		let items = state.Edu34NoticeOption1Options,
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
	[mutationConstants.EDU34_NOTICE_OPTION2_CHECKBOX_CHANGE] (state, payload) {
		let items = state.Edu34NoticeOption2Options,
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
	[mutationConstants.EDU34_MEDICINE_OPTION_CHECKBOX_CHANGE] (state, payload) {
		let items = state.Edu34MedicineOptions,
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
	[mutationConstants.EDU34_GUIDANCE_TARGET_CHECKBOX_CHANGE] (state, payload) {
		let items = state.Edu34GuidanceTargetOption,
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
	[mutationConstants.EDU34_EDUCATION_WAYS_CHECKBOX_CHANGE] (state, payload) {
		let items = state.Edu34EducationWaysOption,
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