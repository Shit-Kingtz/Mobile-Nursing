import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/edu/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as temperatureListMutationConstants from '../temperatureList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	TemperatureNow: '',
	TemperatureBodyTemperature: '',
	TemperaturePulse: '',
	TemperatureBreath: '',
	TemperatureBloodPressure: '',
	TemperatureWeight: '',
	TemperatureAllergic: '',
	TemperatureShit: '',
	TemperatureUrine: '',
	TemperatureOutOther: '',
	TemperatureInAmount: '',
	TemperatureOther: '',
}

const getters = {
	TemperatureNow: state => state.TemperatureNow,
	TemperatureBodyTemperature: state => state.TemperatureBodyTemperature,
	TemperaturePulse: state => state.TemperaturePulse,
	TemperatureBreath: state => state.TemperatureBreath,
	TemperatureBloodPressure: state => state.TemperatureBloodPressure,
	TemperatureWeight: state => state.TemperatureWeight,
	TemperatureAllergic: state => state.TemperatureAllergic,
	TemperatureShit: state => state.TemperatureShit,
	TemperatureUrine: state => state.TemperatureUrine,
	TemperatureOutOther: state => state.TemperatureOutOther,
	TemperatureInAmount: state => state.TemperatureInAmount,
	TemperatureOther: state => state.TemperatureOther,
}

const actions = {
	[actionConstants.TEMPERATURE_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.initInfo(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_TEMPERATURE_CONTENT, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},1000)
		})
	},
	[actionConstants.TEMPERATURE_SUBMIT_BEFORE] ({commit}, payload) {
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
				commit(temperatureListMutationConstants.SET_IS_FROM_SUBMIT_TRUE)
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
	[mutationConstants.SET_TEMPERATURE_CONTENT] (state, payload) {
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
		state.Edu5ImplementerName = payload.type == 'create' ? uni.getStorageSync('EmployeeName') : assessmentInfo.ImplementerName
		state.Edu5CollectionDate = (payload.type == 'create' || !assessmentInfo.CollectionDate) ? '' : assessmentInfo.CollectionDate.replace('T', ' ')
		state.Edu5EvaluateName = payload.type == 'create' ? '' : assessmentInfo.EvaluateName
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}