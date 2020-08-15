import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import base from '../../../pages/assessment/PHQ9/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	PHQ9Now: '',
	PHQ9ThemeColor: '#32CD32',
	PHQ9PickerValueArray: [],
	PHQ9Mode: '',
	PHQ9DeepLength: 1,
	PHQ9PickerValueDefault: [],
	
	PHQ9Assessment1Options: [
		{ type: 'Assessment1', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment1', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment1', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment1', value: 3, label: '几乎每天（3分）' },
	],
	PHQ9Assessment2Options: [
		{ type: 'Assessment2', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment2', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment2', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment2', value: 3, label: '几乎每天（3分）' },
	],
	PHQ9Assessment3Options: [
		{ type: 'Assessment3', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment3', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment3', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment3', value: 3, label: '几乎每天（3分）' },
	],
	PHQ9Assessment4Options: [
		{ type: 'Assessment4', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment4', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment4', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment4', value: 3, label: '几乎每天（3分）' },
	],
	PHQ9Assessment5Options: [
		{ type: 'Assessment5', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment5', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment5', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment5', value: 3, label: '几乎每天（3分）' },
	],
	PHQ9Assessment6Options: [
		{ type: 'Assessment6', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment6', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment6', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment6', value: 3, label: '几乎每天（3分）' },
	],
	PHQ9Assessment7Options: [
		{ type: 'Assessment7', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment7', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment7', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment7', value: 3, label: '几乎每天（3分）' },
	],
	PHQ9Assessment8Options: [
		{ type: 'Assessment8', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment8', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment8', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment8', value: 3, label: '几乎每天（3分）' },
	],
	PHQ9Assessment9Options: [
		{ type: 'Assessment9', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment9', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment9', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment9', value: 3, label: '几乎每天（3分）' },
	],
	PHQ9LevelObj: {},
	PHQ9LevelOptions: [
		{ type: 'IncidenceLevel', value: '', label: '请选择' },
		{ type: 'IncidenceLevel', value: 1, label: '没有抑郁' },
		{ type: 'IncidenceLevel', value: 2, label: '轻度抑郁' },
		{ type: 'IncidenceLevel', value: 3, label: '中度抑郁' },
		{ type: 'IncidenceLevel', value: 4, label: '中重度抑郁' },
		{ type: 'IncidenceLevel', value: 5, label: '重度抑郁' },
		{ type: 'IncidenceLevel', value: 6, label: '病人不愿配合，无法评定' },
	],
	PHQ9Score: {
		Assessment1: 0,
		Assessment2: 0,
		Assessment3: 0,
		Assessment4: 0,
		Assessment5: 0,
		Assessment6: 0,
		Assessment7: 0,
		Assessment8: 0,
		Assessment9: 0,
	},
	
	PHQ9Assessment1Obj: {},
	PHQ9Assessment2Obj: {},
	PHQ9Assessment3Obj: {},
	PHQ9Assessment4Obj: {},
	PHQ9Assessment5Obj: {},
	PHQ9Assessment6Obj: {},
	PHQ9Assessment7Obj: {},
	PHQ9Assessment8Obj: {},
	PHQ9Assessment9Obj: {},
}

const getters = {
	PHQ9Now: state => state.PHQ9Now,
	PHQ9ThemeColor: state => state.PHQ9ThemeColor,
	PHQ9PickerValueArray: state => state.PHQ9PickerValueArray,
	PHQ9Mode: state => state.PHQ9Mode,
	PHQ9DeepLength: state => state.PHQ9DeepLength,
	PHQ9PickerValueDefault: state => state.PHQ9PickerValueDefault,
	PHQ9LevelObj: state => state.PHQ9LevelObj,
	PHQ9Score: state => state.PHQ9Score,
	PHQ9Assessment1Obj: state => state.PHQ9Assessment1Obj,
	PHQ9Assessment2Obj: state => state.PHQ9Assessment2Obj,
	PHQ9Assessment3Obj: state => state.PHQ9Assessment3Obj,
	PHQ9Assessment4Obj: state => state.PHQ9Assessment4Obj,
	PHQ9Assessment5Obj: state => state.PHQ9Assessment5Obj,
	PHQ9Assessment6Obj: state => state.PHQ9Assessment6Obj,
	PHQ9Assessment7Obj: state => state.PHQ9Assessment7Obj,
	PHQ9Assessment8Obj: state => state.PHQ9Assessment8Obj,
	PHQ9Assessment9Obj: state => state.PHQ9Assessment9Obj,
}

const actions = {
	[actionConstants.PHQ9_INIT] ({ commit }, payload) {
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_PHQ9_CONTENT, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
	},
	[actionConstants.PHQ9_SUBMIT_BEFORE] ({ commit }, payload) {
		let params = {
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			AsstSort: 2,								// 护理分类
			Assessment1: isNaN(parseInt(state.PHQ9Assessment1Obj.Assessment1)) ? -1 : parseInt(state.PHQ9Assessment1Obj.Assessment1),
			Assessment2: isNaN(parseInt(state.PHQ9Assessment2Obj.Assessment2)) ? -1 : parseInt(state.PHQ9Assessment2Obj.Assessment2),
			Assessment3: isNaN(parseInt(state.PHQ9Assessment3Obj.Assessment3)) ? -1 : parseInt(state.PHQ9Assessment3Obj.Assessment3),
			Assessment4: isNaN(parseInt(state.PHQ9Assessment4Obj.Assessment4)) ? -1 : parseInt(state.PHQ9Assessment4Obj.Assessment4),
			Assessment5: isNaN(parseInt(state.PHQ9Assessment5Obj.Assessment5)) ? -1 : parseInt(state.PHQ9Assessment5Obj.Assessment5),
			Assessment6: isNaN(parseInt(state.PHQ9Assessment6Obj.Assessment6)) ? -1 : parseInt(state.PHQ9Assessment6Obj.Assessment6),
			Assessment7: isNaN(parseInt(state.PHQ9Assessment7Obj.Assessment7)) ? -1 : parseInt(state.PHQ9Assessment7Obj.Assessment7),
			Assessment8: isNaN(parseInt(state.PHQ9Assessment8Obj.Assessment8)) ? -1 : parseInt(state.PHQ9Assessment8Obj.Assessment8),
			Assessment9: isNaN(parseInt(state.PHQ9Assessment9Obj.Assessment9)) ? -1 : parseInt(state.PHQ9Assessment9Obj.Assessment9),
			AssessScore: isNaN(parseInt(payload.AssessScore)) ? '' : parseInt(payload.AssessScore),
			IncidenceLevel: parseInt(state.PHQ9LevelObj.IncidenceLevel),
			IncidenceLevelT: state.PHQ9LevelObj.label,
			CollectionDate: state.PHQ9Now,
			
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
		state.PHQ9Now = payload
	},
	[mutationConstants.SET_PHQ9_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.PHQ9Now = payload.type == 'create' ? state.PHQ9Now : assessmentInfo.CollectionDate.replace('T', ' ')
		state.PHQ9LevelObj = payload.type == 'create' ? {} : {
			IncidenceLevel: assessmentInfo.IncidenceLevel,
			label: state.PHQ9LevelOptions[assessmentInfo.IncidenceLevel].label
		}
		state.PHQ9Assessment1Obj = payload.type == 'create' ? {} : {
			Assessment1: assessmentInfo.Assessment1,
			label: assessmentInfo.Assessment1 == -1 ? '' : state.PHQ9Assessment1Options[assessmentInfo.Assessment1].label
		}
		state.PHQ9Assessment2Obj = payload.type == 'create' ? {} : {
			Assessment2: assessmentInfo.Assessment2,
			label: assessmentInfo.Assessment2 == -1 ? '' : state.PHQ9Assessment2Options[assessmentInfo.Assessment2].label
		}
		state.PHQ9Assessment3Obj = payload.type == 'create' ? {} : {
			Assessment3: assessmentInfo.Assessment3,
			label: assessmentInfo.Assessment3 == -1 ? '' : state.PHQ9Assessment3Options[assessmentInfo.Assessment3].label
		}
		state.PHQ9Assessment4Obj = payload.type == 'create' ? {} : {
			Assessment4: assessmentInfo.Assessment4,
			label: assessmentInfo.Assessment4 == -1 ? '' : state.PHQ9Assessment4Options[assessmentInfo.Assessment4].label
		}
		state.PHQ9Assessment5Obj = payload.type == 'create' ? {} : {
			Assessment5: assessmentInfo.Assessment5,
			label: assessmentInfo.Assessment5 == -1 ? '' : state.PHQ9Assessment5Options[assessmentInfo.Assessment5].label
		}
		state.PHQ9Assessment6Obj = payload.type == 'create' ? {} : {
			Assessment6: assessmentInfo.Assessment6,
			label: assessmentInfo.Assessment6 == -1 ? '' : state.PHQ9Assessment6Options[assessmentInfo.Assessment6].label
		}
		state.PHQ9Assessment7Obj = payload.type == 'create' ? {} : {
			Assessment7: assessmentInfo.Assessment7,
			label: assessmentInfo.Assessment7 == -1 ? '' : state.PHQ9Assessment7Options[assessmentInfo.Assessment7].label
		}
		state.PHQ9Assessment8Obj = payload.type == 'create' ? {} : {
			Assessment8: assessmentInfo.Assessment8,
			label: assessmentInfo.Assessment8 == -1 ? '' : state.PHQ9Assessment8Options[assessmentInfo.Assessment8].label
		}
		state.PHQ9Assessment9Obj = payload.type == 'create' ? {} : {
			Assessment9: assessmentInfo.Assessment9,
			label: assessmentInfo.Assessment9 == -1 ? '' : state.PHQ9Assessment9Options[assessmentInfo.Assessment9].label
		},
		
		console.log(JSON.stringify(state.PHQ9Assessment8Obj))
		console.log(JSON.stringify(state.PHQ9Assessment9Obj))

		
		state.PHQ9Score.Assessment1 = payload.type == 'create' ? 0 : assessmentInfo.Assessment1
		state.PHQ9Score.Assessment2 = payload.type == 'create' ? 0 : assessmentInfo.Assessment2
		state.PHQ9Score.Assessment3 = payload.type == 'create' ? 0 : assessmentInfo.Assessment3
		state.PHQ9Score.Assessment4 = payload.type == 'create' ? 0 : assessmentInfo.Assessment4
		state.PHQ9Score.Assessment5 = payload.type == 'create' ? 0 : assessmentInfo.Assessment5
		state.PHQ9Score.Assessment6 = payload.type == 'create' ? 0 : assessmentInfo.Assessment6
		state.PHQ9Score.Assessment7 = payload.type == 'create' ? 0 : assessmentInfo.Assessment7
		state.PHQ9Score.Assessment8 = payload.type == 'create' ? 0 : assessmentInfo.Assessment8
		state.PHQ9Score.Assessment9 = payload.type == 'create' ? 0 : assessmentInfo.Assessment9
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch (payload.type){
			case 'IncidenceLevel':
				state.PHQ9LevelObj = {
					IncidenceLevel: payload.value[0],
					label: payload.label
				}
				if (payload.value[0] == 6) {
					state.PHQ9Assessment1Obj = {}
					state.PHQ9Assessment2Obj = {}
					state.PHQ9Assessment3Obj = {}
					state.PHQ9Assessment4Obj = {}
					state.PHQ9Assessment5Obj = {}
					state.PHQ9Assessment6Obj = {}
					state.PHQ9Assessment7Obj = {}
					state.PHQ9Assessment8Obj = {}
					state.PHQ9Assessment9Obj = {}
				}
				break
			case 'Assessment1':
				state.PHQ9Assessment1Obj = {
					Assessment1: payload.value[0],
					label: payload.label
				}
				state.PHQ9Score.Assessment1 = payload.value[0]
				break
			case 'Assessment2':
				state.PHQ9Assessment2Obj = {
					Assessment2: payload.value[0],
					label: payload.label
				}
				state.PHQ9Score.Assessment2 = payload.value[0]
				break
			case 'Assessment3':
				state.PHQ9Assessment3Obj = {
					Assessment3: payload.value[0],
					label: payload.label
				}
				state.PHQ9Score.Assessment3 = payload.value[0]
				break
			case 'Assessment4':
				state.PHQ9Assessment4Obj = {
					Assessment4: payload.value[0],
					label: payload.label
				}
				state.PHQ9Score.Assessment4 = payload.value[0]
				break
			case 'Assessment5':
				state.PHQ9Assessment5Obj = {
					Assessment5: payload.value[0],
					label: payload.label
				}
				state.PHQ9Score.Assessment5 = payload.value[0]
				break
			case 'Assessment6':
				state.PHQ9Assessment6Obj = {
					Assessment6: payload.value[0],
					label: payload.label
				}
				state.PHQ9Score.Assessment6 = payload.value[0]
				break
			case 'Assessment7':
				state.PHQ9Assessment7Obj = {
					Assessment7: payload.value[0],
					label: payload.label
				}
				state.PHQ9Score.Assessment7 = payload.value[0]
				break
			case 'Assessment8':
				state.PHQ9Assessment8Obj = {
					Assessment8: payload.value[0],
					label: payload.label
				}
				state.PHQ9Score.Assessment8 = payload.value[0]
				break
			case 'Assessment9':
				state.PHQ9Assessment9Obj = {
					Assessment9: payload.value[0],
					label: payload.label
				}
				state.PHQ9Score.Assessment9 = payload.value[0]
				break
		}
	},
	
	[mutationConstants.INCIDENCE_LEVEL_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9LevelOptions
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT1_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9Assessment1Options
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT2_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9Assessment2Options
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT3_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9Assessment3Options
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT4_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9Assessment4Options
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT5_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9Assessment5Options
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT6_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9Assessment6Options
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT7_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9Assessment7Options
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT8_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9Assessment8Options
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT9_PICKER_OPEN] (state, payload) {
		state.PHQ9PickerValueArray = state.PHQ9Assessment9Options
		state.PHQ9Mode = 'selector'
		state.PHQ9DeepLength = 1
		state.PHQ9PickerValueDefault = [0]
	},
	[mutationConstants.SCORE_CHANGE] (state, payload) {
		state.PHQ9LevelObj = {
			IncidenceLevel: payload,
			label: state.PHQ9LevelOptions[payload].label
		}
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}