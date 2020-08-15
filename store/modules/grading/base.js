import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import base from '../../../pages/assessment/grading/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	gradingNow: '',
	gradingThemeColor: '#32CD32',
	gradingPickerValueArray: [],
	gradingMode: '',
	gradingDeepLength: 1,
	gradingPickerValueDefault: [],
	
	SelfCareObj: {},
	SelfCareOptions: [
		{ type: 'SelfCare', value: 1, label: '重度依赖（0 ~ 40分），全部需要他人照护' },
		{ type: 'SelfCare', value: 2, label: '中度依赖（41 ~ 60分），大部分需要他人照护' },
		{ type: 'SelfCare', value: 3, label: '轻度依赖（61 ~ 99分），少部分需要他人照护' },
		{ type: 'SelfCare', value: 4, label: '无需依赖（100分），无需他人照护' },
	],
	IncidenceLevelObj: {},
	IncidenceLevelOptions: [
		{ type: 'IncidenceLevel', value: 1, label: '病危/抢救' },
		{ type: 'IncidenceLevel', value: 2, label: '病重/病情不稳定' },
		{ type: 'IncidenceLevel', value: 3, label: '病情稳定/康复期' },
	],
	NursingLevelObj: {},
	NursingLevelOptions: [
		{ type: 'NursingLevel', value: 1, label: '特级护理' },
		{ type: 'NursingLevel', value: 2, label: '一级护理' },
		{ type: 'NursingLevel', value: 3, label: '二级护理' },
		{ type: 'NursingLevel', value: 4, label: '三级护理' },
	],
	FoodObj: {},
	FoodOptions: [
		{ type: 'Food', value: 0, label: '需极大帮助（0分）' },
		{ type: 'Food', value: 5, label: '需部分帮助（5分）' },
		{ type: 'Food', value: 10, label: '完全独立（10分）' },
	],
	ShowerObj: {},
	ShowerOptions: [
		{ type: 'Shower', value: 0, label: '需部分帮助（0分）' },
		{ type: 'Shower', value: 5, label: '完全独立（5分）' },
	],
	BeautifyObj: {},
	BeautifyOptions: [
		{ type: 'Beautify', value: 0, label: '需部分帮助（0分）' },
		{ type: 'Beautify', value: 5, label: '完全独立（5分）' },
	],
	ClothObj: {},
	ClothOptions: [
		{ type: 'Cloth', value: 0, label: '需极大帮助（0分）' },
		{ type: 'Cloth', value: 5, label: '需部分帮助（5分）' },
		{ type: 'Cloth', value: 10, label: '完全独立（10分）' },
	],
	ShitControlObj: {},
	ShitControlOptions: [
		{ type: 'ShitControl', value: 0, label: '需极大帮助（0分）' },
		{ type: 'ShitControl', value: 5, label: '需部分帮助（5分）' },
		{ type: 'ShitControl', value: 10, label: '完全独立（10分）' },
	],
	UrineControlObj: {},
	UrineControlOptions: [
		{ type: 'UrineControl', value: 0, label: '需极大帮助（0分）' },
		{ type: 'UrineControl', value: 5, label: '需部分帮助（5分）' },
		{ type: 'UrineControl', value: 10, label: '完全独立（10分）' },
	],
	ToiletObj: {},
	ToiletOptions: [
		{ type: 'Toilet', value: 0, label: '需极大帮助（0分）' },
		{ type: 'Toilet', value: 5, label: '需部分帮助（5分）' },
		{ type: 'Toilet', value: 10, label: '完全独立（10分）' },
	],
	MovementObj: {},
	MovementOptions: [
		{ type: 'Movement', value: 0, label: '完全依赖（0分）' },
		{ type: 'Movement', value: 5, label: '需极大帮助（5分）' },
		{ type: 'Movement', value: 10, label: '需部分帮助（10分）' },
		{ type: 'Movement', value: 15, label: '完全独立（15分）' },
	],
	WalkObj: {},
	WalkOptions: [
		{ type: 'Walk', value: 0, label: '完全依赖（0分）' },
		{ type: 'Walk', value: 5, label: '需极大帮助（5分）' },
		{ type: 'Walk', value: 10, label: '需部分帮助（10分）' },
		{ type: 'Walk', value: 15, label: '完全独立（15分）' },
	],
	StairObj: {},
	StairOptions: [
		{ type: 'Stair', value: 0, label: '需极大帮助（0分）' },
		{ type: 'Stair', value: 5, label: '需部分帮助（5分）' },
		{ type: 'Stair', value: 10, label: '完全独立（10分）' },
	],
	
	Score: {
		Assessment1: 0,
		Assessment2: 0,
		Assessment3: 0,
		Assessment4: 0,
		Assessment5: 0,
		Assessment6: 0,
		Assessment7: 0,
		Assessment8: 0,
		Assessment9: 0,
		Assessment10: 0,
	}
}

const getters = {
	gradingNow: state => state.gradingNow,
	gradingThemeColor: state => state.gradingThemeColor,
	gradingPickerValueArray: state => state.gradingPickerValueArray,
	gradingMode: state => state.gradingMode,
	gradingDeepLength: state => state.gradingDeepLength,
	gradingPickerValueDefault: state => state.gradingPickerValueDefault,
	
	SelfCareObj: state => state.SelfCareObj,
	SelfCareOptions: state => state.SelfCareOptions,
	IncidenceLevelObj: state => state.IncidenceLevelObj,
	IncidenceLevelOptions: state => state.IncidenceLevelOptions,
	NursingLevelObj: state => state.NursingLevelObj,
	NursingLevelOptions: state => state.NursingLevelOptions,
	FoodObj: state => state.FoodObj,
	FoodOptions: state => state.FoodOptions,
	ShowerObj: state => state.ShowerObj,
	ShowerOptions: state => state.ShowerOptions,
	BeautifyObj: state => state.BeautifyObj,
	BeautifyOptions: state => state.BeautifyOptions,
	ClothObj: state => state.ClothObj,
	ClothOptions: state => state.ClothOptions,
	ShitControlObj: state => state.ShitControlObj,
	ShitControlOptions: state => state.ShitControlOptions,
	UrineControlObj: state => state.UrineControlObj,
	UrineControlOptions: state => state.UrineControlOptions,
	ToiletObj: state => state.ToiletObj,
	ToiletOptions: state => state.ToiletOptions,
	MovementObj: state => state.MovementObj,
	MovementOptions: state => state.MovementOptions,
	WalkObj: state => state.WalkObj,
	WalkOptions: state => state.WalkOptions,
	StairObj: state => state.StairObj,
	StairOptions: state => state.StairOptions,
	Score: state => state.Score,
}

const actions = {
	[actionConstants.GRADING_INIT] ({ commit }, payload) {
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_GRADING_CONTENT, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
	},
	[actionConstants.GRADING_SUBMIT_BEFORE] ({ commit }, payload) {
		let params = {
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			AsstSort: 1,								// 护理分类
			Assessment1: isNaN(parseInt(state.FoodObj.Food)) ? -1 : parseInt(state.FoodObj.Food),
			Assessment2: isNaN(parseInt(state.ShowerObj.Shower)) ? -1 : parseInt(state.ShowerObj.Shower),
			Assessment3: isNaN(parseInt(state.BeautifyObj.Beautify)) ? -1 : parseInt(state.BeautifyObj.Beautify),
			Assessment4: isNaN(parseInt(state.ClothObj.Cloth)) ? -1 : parseInt(state.ClothObj.Cloth),
			Assessment5: isNaN(parseInt(state.ShitControlObj.ShitControl)) ? -1 : parseInt(state.ShitControlObj.ShitControl),
			Assessment6: isNaN(parseInt(state.UrineControlObj.UrineControl)) ? -1 : parseInt(state.UrineControlObj.UrineControl),
			Assessment7: isNaN(parseInt(state.ToiletObj.Toilet)) ? -1 : parseInt(state.ToiletObj.Toilet),
			Assessment8: isNaN(parseInt(state.MovementObj.Movement)) ? -1 : parseInt(state.MovementObj.Movement),
			Assessment9: isNaN(parseInt(state.WalkObj.Walk)) ? -1 : parseInt(state.WalkObj.Walk),
			Assessment10: isNaN(parseInt(state.StairObj.Stair)) ? -1 : parseInt(state.StairObj.Stair),
			AssessScore: isNaN(parseInt(payload.AssessScore)) ? '' : parseInt(payload.AssessScore),
			IncidenceLevel: isNaN(parseInt(state.IncidenceLevelObj.IncidenceLevel)) ? -1 : parseInt(state.IncidenceLevelObj.IncidenceLevel),
			NursingLevel: isNaN(parseInt(state.NursingLevelObj.NursingLevel)) ? -1 : parseInt(state.NursingLevelObj.NursingLevel),
			SelfCare: isNaN(parseInt(state.SelfCareObj.SelfCare)) ? -1 : parseInt(state.SelfCareObj.SelfCare),
			CollectionDate: state.gradingNow,
			
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
		state.gradingNow = payload
	},
	[mutationConstants.SET_GRADING_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.gradingNow = payload.type == 'create' ? state.gradingNow : assessmentInfo.CollectionDate.replace('T', ' ')
		state.SelfCareObj = payload.type == 'create' ? {} : {
			SelfCare: assessmentInfo.SelfCare,
			label: assessmentInfo.SelfCare == -1 ? state.SelfCareOptions[0].label : state.SelfCareOptions[assessmentInfo.SelfCare].label
		}
		state.IncidenceLevelObj = payload.type == 'create' ? {} : {
			IncidenceLevel: assessmentInfo.IncidenceLevel,
			label: assessmentInfo.IncidenceLevel == -1 ? state.IncidenceLevelOptions[0].label : state.IncidenceLevelOptions[assessmentInfo.IncidenceLevel].label
		}
		state.NursingLevelObj = payload.type == 'create' ? {} : {
			NursingLevel: assessmentInfo.NursingLevel,
			label: assessmentInfo.NursingLevel == -1 ? state.NursingLevelOptions[0].label : state.NursingLevelOptions[assessmentInfo.NursingLevel].label
		}
		state.FoodObj = payload.type == 'create' ? {} : {
			Food: assessmentInfo.Assessment1,
			label: assessmentInfo.Assessment1 == -1 ? state.FoodOptions[0].label.split('（')[0] : state.FoodOptions[assessmentInfo.Assessment1 / 5].label.split('（')[0]
		}
		state.ShowerObj = payload.type == 'create' ? {} : {
			Shower: assessmentInfo.Assessment2,
			label: assessmentInfo.Assessment2 == -1 ? state.ShowerOptions[0].label.split('（')[0] : state.ShowerOptions[assessmentInfo.Assessment2 / 5].label.split('（')[0]
		}
		state.BeautifyObj = payload.type == 'create' ? {} : {
			Beautify: assessmentInfo.Assessment3,
			label: assessmentInfo.Assessment3 == -1 ? state.BeautifyOptions[0].label.split('（')[0] : state.BeautifyOptions[assessmentInfo.Assessment3 / 5].label.split('（')[0]
		}
		state.ClothObj = payload.type == 'create' ? {} : {
			Cloth: assessmentInfo.Assessment4,
			label: assessmentInfo.Assessment4 == -1 ? state.ClothOptions[0].label.split('（')[0] : state.ClothOptions[assessmentInfo.Assessment4 / 5].label.split('（')[0]
		}
		state.ShitControlObj = payload.type == 'create' ? {} : {
			ShitControl: assessmentInfo.Assessment5,
			label: assessmentInfo.Assessment5 == -1 ? state.ShitControlOptions[0].label.split('（')[0] : state.ShitControlOptions[assessmentInfo.Assessment5 / 5].label.split('（')[0]
		}
		state.UrineControlObj = payload.type == 'create' ? {} : {
			UrineControl: assessmentInfo.Assessment6,
			label: assessmentInfo.Assessment6 == -1 ? state.UrineControlOptions[0].label.split('（')[0] : state.UrineControlOptions[assessmentInfo.Assessment6 / 5].label.split('（')[0]
		}
		state.ToiletObj = payload.type == 'create' ? {} : {
			Toilet: assessmentInfo.Assessment7,
			label: assessmentInfo.Assessment7 == -1 ? state.ToiletOptions[0].label.split('（')[0] : state.ToiletOptions[assessmentInfo.Assessment7 / 5].label.split('（')[0]
		}
		state.MovementObj = payload.type == 'create' ? {} : {
			Movement: assessmentInfo.Assessment8,
			label: assessmentInfo.Assessment8 == -1 ? state.MovementOptions[0].label.split('（')[0] : state.MovementOptions[assessmentInfo.Assessment8 / 5].label.split('（')[0]
		}
		state.WalkObj = payload.type == 'create' ? {} : {
			Walk: assessmentInfo.Assessment9,
			label: assessmentInfo.Assessment9 == -1 ? state.WalkOptions[0].label.split('（')[0] : state.WalkOptions[assessmentInfo.Assessment9 / 5].label.split('（')[0]
		}
		state.StairObj = payload.type == 'create' ? {} : {
			Stair: assessmentInfo.Assessment10,
			label: assessmentInfo.Assessment10 == -1 ? state.StairOptions[0].label.split('（')[0] : state.StairOptions[assessmentInfo.Assessment10 / 5].label.split('（')[0]
		}
		
		state.Score.Assessment1 = payload.type == 'create' ? 0 : assessmentInfo.Assessment1
		state.Score.Assessment2 = payload.type == 'create' ? 0 : assessmentInfo.Assessment2
		state.Score.Assessment3 = payload.type == 'create' ? 0 : assessmentInfo.Assessment3
		state.Score.Assessment4 = payload.type == 'create' ? 0 : assessmentInfo.Assessment4
		state.Score.Assessment5 = payload.type == 'create' ? 0 : assessmentInfo.Assessment5
		state.Score.Assessment6 = payload.type == 'create' ? 0 : assessmentInfo.Assessment6
		state.Score.Assessment7 = payload.type == 'create' ? 0 : assessmentInfo.Assessment7
		state.Score.Assessment8 = payload.type == 'create' ? 0 : assessmentInfo.Assessment8
		state.Score.Assessment9 = payload.type == 'create' ? 0 : assessmentInfo.Assessment9
		state.Score.Assessment10 = payload.type == 'create' ? 0 : assessmentInfo.Assessment10
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch (payload.type){
			case 'SelfCare':
				state.SelfCareObj = {
					SelfCare: payload.value[0],
					label: payload.label
				}
				break
			case 'IncidenceLevel':
				state.IncidenceLevelObj = {
					IncidenceLevel: payload.value[0],
					label: payload.label
				}
				break
			case 'NursingLevel':
				state.NursingLevelObj = {
					SelfCare: payload.value[0],
					label: payload.label
				}
				break
			case 'Food':
				state.FoodObj = {
					Food: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment1 = payload.value[0]
				break
			case 'Shower':
				state.ShowerObj = {
					Shower: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment2 = payload.value[0]
				break
			case 'Beautify':
				state.BeautifyObj = {
					Beautify: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment3 = payload.value[0]
				break
			case 'Cloth':
				state.ClothObj = {
					Cloth: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment4 = payload.value[0]
				break
			case 'ShitControl':
				state.ShitControlObj = {
					ShitControl: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment5 = payload.value[0]
				break
			case 'UrineControl':
				state.UrineControlObj = {
					UrineControl: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment6 = payload.value[0]
				break
			case 'Toilet':
				state.ToiletObj = {
					Toilet: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment7 = payload.value[0]
				break
			case 'Movement':
				state.MovementObj = {
					Movement: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment8 = payload.value[0]
				break
			case 'Walk':
				state.WalkObj = {
					Walk: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment9 = payload.value[0]
				break
			case 'Stair':
				state.StairObj = {
					Stair: payload.value[0],
					label: payload.label.split('（')[0],
				}
				state.Score.Assessment10 = payload.value[0]
				break
		}
	},
	
	[mutationConstants.SELF_CARE_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.SelfCareOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.INCIDENCE_LEVEL_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.IncidenceLevelOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.NURSING_LEVEL_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.NursingLevelOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.FOOD_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.FoodOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.SHOWER_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.ShowerOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.BEAUTIFY_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.BeautifyOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.CLOTH_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.ClothOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.SHIT_CONTROL_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.ShitControlOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.URINE_CONTROL_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.UrineControlOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.TOILET_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.ToiletOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.MOVEMENT_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.MovementOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.WALK_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.WalkOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.STAIR_PICKER_OPEN] (state, payload) {
		state.gradingPickerValueArray = state.StairOptions
		state.gradingMode = 'selector'
		state.gradingDeepLength = 1
		state.gradingPickerValueDefault = [0]
	},
	[mutationConstants.SCORE_CHANGE] (state, payload) {
		state.SelfCareObj = {
			SelfCare: payload,
			label: state.SelfCareOptions[payload].label
		}
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}