import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import base from '../../../pages/assessment/nutrition/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	NutritionNow: '',
	NutritionHeight: '',
	NutritionWeight: '',
	NutritionAssessment1Obj: {},
	NutritionAssessment2Obj: {},
	NutritionAssessment3Obj: {},
	NutritionAssessment4Obj: {},
	NutritionAssessment5Obj: {},
	NutritionAssessment6Obj: {},
	NutritionalLevelObj: {},
	NutritionalLevelOptions: [
		{ value: 1, label: '好(0分)'},
		{ value: 2, label: '中(1-2分)'},
		{ value: 3, label: '差(≥3分)'},
	],
	NutritionScore: {
		Assessment1: 0,
		Assessment2: 0,
		Assessment3: 0,
		Assessment4: 0,
		Assessment5: 0,
		Assessment6: 0,
	}
}

const getters = {
	NutritionNow: state => state.NutritionNow,
	NutritionHeight: state => state.NutritionHeight,
	NutritionWeight: state => state.NutritionWeight,
	NutritionAssessment1Obj: state => state.NutritionAssessment1Obj,
	NutritionAssessment2Obj: state => state.NutritionAssessment2Obj,
	NutritionAssessment3Obj: state => state.NutritionAssessment3Obj,
	NutritionAssessment4Obj: state => state.NutritionAssessment4Obj,
	NutritionAssessment5Obj: state => state.NutritionAssessment5Obj,
	NutritionAssessment6Obj: state => state.NutritionAssessment6Obj,
	NutritionalLevelObj: state => state.NutritionalLevelObj,
	NutritionScore: state => state.NutritionScore
}

const actions = {
	[actionConstants.NUTRITION_INIT] ({ commit }, payload) {
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_NUTRITION_CONTENT, {info: content, type: payload.type}),
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
	},
	[actionConstants.NUTRITION_SUBMIT_BEFORE] ({ commit }, payload) {
		let params = {
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			Height: state.NutritionHeight,
			Weight: state.NutritionWeight,
			BMI: payload.BMI,
			BMIResult: payload.BMIResult,
			Assessment1: isNaN(parseInt(state.NutritionAssessment1Obj.Assessment1)) ? 0 : parseInt(state.NutritionAssessment1Obj.Assessment1),
			Assessment2: isNaN(parseInt(state.NutritionAssessment2Obj.Assessment2)) ? 0 : parseInt(state.NutritionAssessment2Obj.Assessment2),
			Assessment3: isNaN(parseInt(state.NutritionAssessment3Obj.Assessment3)) ? 0 : parseInt(state.NutritionAssessment3Obj.Assessment3),
			Assessment4: isNaN(parseInt(state.NutritionAssessment4Obj.Assessment4)) ? 0 : parseInt(state.NutritionAssessment4Obj.Assessment4),
			Assessment5: isNaN(parseInt(state.NutritionAssessment5Obj.Assessment5)) ? 0 : parseInt(state.NutritionAssessment5Obj.Assessment5),
			Assessment6: isNaN(parseInt(state.NutritionAssessment6Obj.Assessment6)) ? 0 : parseInt(state.NutritionAssessment6Obj.Assessment6),
			AssessSoruce: parseInt(payload.AssessScore),
			NutritionalLevel: parseInt(state.NutritionalLevelObj.NutritionalLevel),
			CollectionDate: state.NutritionNow,
			
			EmployeeID: uni.getStorageSync('EmployeeID'),
			NurseName: uni.getStorageSync('EmployeeName'),
			UserID: uni.getStorageSync('UserID'),
		}
		console.log(JSON.stringify(params))
		
		commit(inPatientMutationConstants.SUBMIT_START)
		base.submit(params, payload.id, payload.type)
			.then((msg) => {
				commit(inPatientMutationConstants.SUBMIT_DONE)
				commit(inPatientMutationConstants.SHOW_MESSAGE, msg)
				commit(listMutationConstants.SET_IS_FROM_SUBMIT_TRUE)
				setTimeout(() => {
					uni.navigateBack({ delta: 1 })
				},500)
			})
			.catch((msg) => {
				commit(inPatientMutationConstants.SUBMIT_DONE)
				commit(inPatientMutationConstants.SHOW_MESSAGE, msg)
			})
	}
}

const mutations = {
	[mutationConstants.NOW_INIT] (state, payload) {
		state.NutritionNow = payload
	},
	[mutationConstants.SET_NUTRITION_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.NutritionNow = payload.type == 'create' ? state.NutritionNow : assessmentInfo.CollectionDate.replace('T', ' ')
		state.NutritionHeight = (payload.type == 'create'||assessmentInfo.Height == '') ? '' : assessmentInfo.Height
		state.NutritionWeight = (payload.type == 'create'||assessmentInfo.Height == '') ? '' : assessmentInfo.Weight
		state.NutritionAssessment1Obj = payload.type == 'create' ? {} : {
			Assessment1: assessmentInfo.Assessment1
		}
		state.NutritionAssessment2Obj = payload.type == 'create' ? {} : {
			Assessment2: assessmentInfo.Assessment2
		}
		state.NutritionAssessment3Obj = payload.type == 'create' ? {} : {
			Assessment3: assessmentInfo.Assessment3
		}
		state.NutritionAssessment4Obj = payload.type == 'create' ? {} : {
			Assessment4: assessmentInfo.Assessment4
		}
		state.NutritionAssessment5Obj = payload.type == 'create' ? {} : {
			Assessment5: assessmentInfo.Assessment5
		}
		state.NutritionAssessment6Obj = payload.type == 'create' ? {} : {
			Assessment6: assessmentInfo.Assessment6
		},
		state.NutritionScore.Assessment1 = payload.type == 'create' ? 0 : assessmentInfo.Assessment1
		state.NutritionScore.Assessment2 = payload.type == 'create' ? 0 : assessmentInfo.Assessment2
		state.NutritionScore.Assessment3 = payload.type == 'create' ? 0 : assessmentInfo.Assessment3
		state.NutritionScore.Assessment4 = payload.type == 'create' ? 0 : assessmentInfo.Assessment4
		state.NutritionScore.Assessment5 = payload.type == 'create' ? 0 : assessmentInfo.Assessment5
		state.NutritionScore.Assessment6 = payload.type == 'create' ? 0 : assessmentInfo.Assessment6
		state.NutritionalLevelObj = {
			NutritionalLevel: payload.type == 'create' ? 1 : assessmentInfo.NutritionalLevel,
			label: payload.type == 'create' ? state.NutritionalLevelOptions[0].label : state.NutritionalLevelOptions[assessmentInfo.NutritionalLevel - 1].label
		}
	},
	[mutationConstants.NUTRITION_SCORE_CHANGE] (state, payload) {
		if (payload == 0) {
			state.NutritionalLevelObj = {
				NutritionalLevel: 1,
				label: state.NutritionalLevelOptions[0].label
			}
		} else if (payload == 1 || payload == 2) {
			state.NutritionalLevelObj = {
				NutritionalLevel: 2,
				label: state.NutritionalLevelOptions[1].label
			}
		} else if (payload >= 3) {
			state.NutritionalLevelObj = {
				NutritionalLevel: 3,
				label: state.NutritionalLevelOptions[2].label
			}
		} else {
			state.NutritionalLevelObj = {
				NutritionalLevel: 0,
				label: ''
			}
		}
	},
	[mutationConstants.NUTRITION_HEIGHT_CHANGE] (state, payload) {
		state.NutritionHeight = payload
	},
	[mutationConstants.NUTRITION_WEIGHT_CHANGE] (state, payload) {
		state.NutritionWeight = payload
	},
	[mutationConstants.NUTRITION_ASSESSMENT1_SWITCH_CHANGE] (state, payload) {
		state.NutritionAssessment1Obj = {
			Assessment1: payload.target.value ? 1 : 0
		}
		state.NutritionScore.Assessment1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.NUTRITION_ASSESSMENT2_SWITCH_CHANGE] (state, payload) {
		state.NutritionAssessment2Obj = {
			Assessment2: payload.target.value ? 1 : 0
		}
		state.NutritionScore.Assessment2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.NUTRITION_ASSESSMENT3_SWITCH_CHANGE] (state, payload) {
		state.NutritionAssessment3Obj = {
			Assessment3: payload.target.value ? 1 : 0
		}
		state.NutritionScore.Assessment3 = payload.target.value ? 1 : 0
	},
	[mutationConstants.NUTRITION_ASSESSMENT4_SWITCH_CHANGE] (state, payload) {
		state.NutritionAssessment4Obj = {
			Assessment4: payload.target.value ? 1 : 0
		}
		state.NutritionScore.Assessment4 = payload.target.value ? 1 : 0
	},
	[mutationConstants.NUTRITION_ASSESSMENT5_SWITCH_CHANGE] (state, payload) {
		state.NutritionAssessment5Obj = {
			Assessment5: payload.target.value ? 1 : 0
		}
		state.NutritionScore.Assessment5 = payload.target.value ? 1 : 0	
	},
	[mutationConstants.NUTRITION_ASSESSMENT6_SWITCH_CHANGE] (state, payload) {
		state.NutritionAssessment6Obj = {
			Assessment6: payload.target.value ? 1 : 0
		}
		state.NutritionScore.Assessment6 = payload.target.value ? 1 : 0
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}