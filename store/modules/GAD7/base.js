import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import base from '../../../pages/assessment/GAD7/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	GAD7Now: '',
	GAD7ThemeColor: '#32CD32',
	GAD7PickerValueArray: [],
	GAD7Mode: '',
	GAD7DeepLength: 1,
	GAD7PickerValueDefault: [],
	
	GAD7Assessment1Options: [
		{ type: 'Assessment1', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment1', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment1', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment1', value: 3, label: '几乎每天（3分）' },
	],
	GAD7Assessment2Options: [
		{ type: 'Assessment2', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment2', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment2', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment2', value: 3, label: '几乎每天（3分）' },
	],
	GAD7Assessment3Options: [
		{ type: 'Assessment3', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment3', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment3', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment3', value: 3, label: '几乎每天（3分）' },
	],
	GAD7Assessment4Options: [
		{ type: 'Assessment4', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment4', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment4', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment4', value: 3, label: '几乎每天（3分）' },
	],
	GAD7Assessment5Options: [
		{ type: 'Assessment5', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment5', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment5', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment5', value: 3, label: '几乎每天（3分）' },
	],
	GAD7Assessment6Options: [
		{ type: 'Assessment6', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment6', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment6', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment6', value: 3, label: '几乎每天（3分）' },
	],
	GAD7Assessment7Options: [
		{ type: 'Assessment7', value: 0, label: '完全不会（0分）' },
		{ type: 'Assessment7', value: 1, label: '好几天（1分）' },
		{ type: 'Assessment7', value: 2, label: '超过一周（2分）' },
		{ type: 'Assessment7', value: 3, label: '几乎每天（3分）' },
	],
	GAD7LevelObj: {},
	GAD7LevelOptions: [
		{ type: 'IncidenceLevel', value: '', label: '请选择' },
		{ type: 'IncidenceLevel', value: 1, label: '没有焦虑' },
		{ type: 'IncidenceLevel', value: 2, label: '轻度焦虑' },
		{ type: 'IncidenceLevel', value: 3, label: '中度焦虑' },
		{ type: 'IncidenceLevel', value: 4, label: '重度焦虑' },
		{ type: 'IncidenceLevel', value: 5, label: '病人不愿配合，无法评定' },
	],
	GAD7Score: {
		Assessment1: 0,
		Assessment2: 0,
		Assessment3: 0,
		Assessment4: 0,
		Assessment5: 0,
		Assessment6: 0,
		Assessment7: 0,
	},
	
	GAD7Assessment1Obj: {},
	GAD7Assessment2Obj: {},
	GAD7Assessment3Obj: {},
	GAD7Assessment4Obj: {},
	GAD7Assessment5Obj: {},
	GAD7Assessment6Obj: {},
	GAD7Assessment7Obj: {},
}

const getters = {
	GAD7Now: state => state.GAD7Now,
	GAD7ThemeColor: state => state.GAD7ThemeColor,
	GAD7PickerValueArray: state => state.GAD7PickerValueArray,
	GAD7Mode: state => state.GAD7Mode,
	GAD7DeepLength: state => state.GAD7DeepLength,
	GAD7PickerValueDefault: state => state.GAD7PickerValueDefault,
	GAD7LevelObj: state => state.GAD7LevelObj,
	GAD7Score: state => state.GAD7Score,
	GAD7Assessment1Obj: state => state.GAD7Assessment1Obj,
	GAD7Assessment2Obj: state => state.GAD7Assessment2Obj,
	GAD7Assessment3Obj: state => state.GAD7Assessment3Obj,
	GAD7Assessment4Obj: state => state.GAD7Assessment4Obj,
	GAD7Assessment5Obj: state => state.GAD7Assessment5Obj,
	GAD7Assessment6Obj: state => state.GAD7Assessment6Obj,
	GAD7Assessment7Obj: state => state.GAD7Assessment7Obj,
}

const actions = {
	[actionConstants.GAD7_INIT] ({ commit }, payload) {
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_GAD7_CONTENT, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
	},
	[actionConstants.GAD7_SUBMIT_BEFORE] ({ commit }, payload) {
		let params = {
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			AsstSort: 3,								// 护理分类
			Assessment1: isNaN(parseInt(state.GAD7Assessment1Obj.Assessment1)) ? -1 : parseInt(state.GAD7Assessment1Obj.Assessment1),
			Assessment2: isNaN(parseInt(state.GAD7Assessment2Obj.Assessment2)) ? -1 : parseInt(state.GAD7Assessment2Obj.Assessment2),
			Assessment3: isNaN(parseInt(state.GAD7Assessment3Obj.Assessment3)) ? -1 : parseInt(state.GAD7Assessment3Obj.Assessment3),
			Assessment4: isNaN(parseInt(state.GAD7Assessment4Obj.Assessment4)) ? -1 : parseInt(state.GAD7Assessment4Obj.Assessment4),
			Assessment5: isNaN(parseInt(state.GAD7Assessment5Obj.Assessment5)) ? -1 : parseInt(state.GAD7Assessment5Obj.Assessment5),
			Assessment6: isNaN(parseInt(state.GAD7Assessment6Obj.Assessment6)) ? -1 : parseInt(state.GAD7Assessment6Obj.Assessment6),
			Assessment7: isNaN(parseInt(state.GAD7Assessment7Obj.Assessment7)) ? -1 : parseInt(state.GAD7Assessment7Obj.Assessment7),
			Assessment8: isNaN(parseInt(state.GAD7Assessment6Obj.Assessment8)) ? -1 : parseInt(state.GAD7Assessment6Obj.Assessment8),
			Assessment9: isNaN(parseInt(state.GAD7Assessment7Obj.Assessment9)) ? -1 : parseInt(state.GAD7Assessment7Obj.Assessment9),
			AssessScore: isNaN(parseInt(payload.AssessScore)) ? '' : parseInt(payload.AssessScore),
			IncidenceLevel: parseInt(state.GAD7LevelObj.IncidenceLevel),
			IncidenceLevelT: state.GAD7LevelObj.label,
			CollectionDate: state.GAD7Now,
			
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
		state.GAD7Now = payload
	},
	[mutationConstants.SET_GAD7_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.GAD7Now = payload.type == 'create' ? state.GAD7Now : assessmentInfo.CollectionDate.replace('T', ' ')
		state.GAD7LevelObj = payload.type == 'create' ? {} : {
			IncidenceLevel: assessmentInfo.IncidenceLevel,
			label: state.GAD7LevelOptions[assessmentInfo.IncidenceLevel].label
		}
		state.GAD7Assessment1Obj = payload.type == 'create' ? {} : {
			Assessment1: assessmentInfo.Assessment1,
			label: assessmentInfo.Assessment1 == -1 ? '' : state.GAD7Assessment1Options[assessmentInfo.Assessment1].label
		}
		state.GAD7Assessment2Obj = payload.type == 'create' ? {} : {
			Assessment2: assessmentInfo.Assessment2,
			label: assessmentInfo.Assessment2 == -1 ? '' : state.GAD7Assessment2Options[assessmentInfo.Assessment2].label
		}
		state.GAD7Assessment3Obj = payload.type == 'create' ? {} : {
			Assessment3: assessmentInfo.Assessment3,
			label: assessmentInfo.Assessment3 == -1 ? '' : state.GAD7Assessment3Options[assessmentInfo.Assessment3].label
		}
		state.GAD7Assessment4Obj = payload.type == 'create' ? {} : {
			Assessment4: assessmentInfo.Assessment4,
			label: assessmentInfo.Assessment4 == -1 ? '' : state.GAD7Assessment4Options[assessmentInfo.Assessment4].label
		}
		state.GAD7Assessment5Obj = payload.type == 'create' ? {} : {
			Assessment5: assessmentInfo.Assessment5,
			label: assessmentInfo.Assessment5 == -1 ? '' : state.GAD7Assessment5Options[assessmentInfo.Assessment5].label
		}
		state.GAD7Assessment6Obj = payload.type == 'create' ? {} : {
			Assessment6: assessmentInfo.Assessment6,
			label: assessmentInfo.Assessment6 == -1 ? '' : state.GAD7Assessment6Options[assessmentInfo.Assessment6].label
		}
		state.GAD7Assessment7Obj = payload.type == 'create' ? {} : {
			Assessment7: assessmentInfo.Assessment7,
			label: assessmentInfo.Assessment7 == -1 ? '' : state.GAD7Assessment7Options[assessmentInfo.Assessment7].label
		}
		
		state.GAD7Score.Assessment1 = payload.type == 'create' ? 0 : assessmentInfo.Assessment1
		state.GAD7Score.Assessment2 = payload.type == 'create' ? 0 : assessmentInfo.Assessment2
		state.GAD7Score.Assessment3 = payload.type == 'create' ? 0 : assessmentInfo.Assessment3
		state.GAD7Score.Assessment4 = payload.type == 'create' ? 0 : assessmentInfo.Assessment4
		state.GAD7Score.Assessment5 = payload.type == 'create' ? 0 : assessmentInfo.Assessment5
		state.GAD7Score.Assessment6 = payload.type == 'create' ? 0 : assessmentInfo.Assessment6
		state.GAD7Score.Assessment7 = payload.type == 'create' ? 0 : assessmentInfo.Assessment7
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch (payload.type){
			case 'IncidenceLevel':
				state.GAD7LevelObj = {
					IncidenceLevel: payload.value[0],
					label: payload.label
				}
				if (payload.value[0] == 5) {
					state.GAD7Assessment1Obj = {}
					state.GAD7Assessment2Obj = {}
					state.GAD7Assessment3Obj = {}
					state.GAD7Assessment4Obj = {}
					state.GAD7Assessment5Obj = {}
					state.GAD7Assessment6Obj = {}
					state.GAD7Assessment7Obj = {}
				}
				break
			case 'Assessment1':
				state.GAD7Assessment1Obj = {
					Assessment1: payload.value[0],
					label: payload.label
				}
				state.GAD7Score.Assessment1 = payload.value[0]
				break
			case 'Assessment2':
				state.GAD7Assessment2Obj = {
					Assessment2: payload.value[0],
					label: payload.label
				}
				state.GAD7Score.Assessment2 = payload.value[0]
				break
			case 'Assessment3':
				state.GAD7Assessment3Obj = {
					Assessment3: payload.value[0],
					label: payload.label
				}
				state.GAD7Score.Assessment3 = payload.value[0]
				break
			case 'Assessment4':
				state.GAD7Assessment4Obj = {
					Assessment4: payload.value[0],
					label: payload.label
				}
				state.GAD7Score.Assessment4 = payload.value[0]
				break
			case 'Assessment5':
				state.GAD7Assessment5Obj = {
					Assessment5: payload.value[0],
					label: payload.label
				}
				state.GAD7Score.Assessment5 = payload.value[0]
				break
			case 'Assessment6':
				state.GAD7Assessment6Obj = {
					Assessment6: payload.value[0],
					label: payload.label
				}
				state.GAD7Score.Assessment6 = payload.value[0]
				break
			case 'Assessment7':
				state.GAD7Assessment7Obj = {
					Assessment7: payload.value[0],
					label: payload.label
				}
				state.GAD7Score.Assessment7 = payload.value[0]
				break
		}
	},
	
	[mutationConstants.INCIDENCE_LEVEL_PICKER_OPEN] (state, payload) {
		state.GAD7PickerValueArray = state.GAD7LevelOptions
		state.GAD7Mode = 'selector'
		state.GAD7DeepLength = 1
		state.GAD7PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT1_PICKER_OPEN] (state, payload) {
		state.GAD7PickerValueArray = state.GAD7Assessment1Options
		state.GAD7Mode = 'selector'
		state.GAD7DeepLength = 1
		state.GAD7PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT2_PICKER_OPEN] (state, payload) {
		state.GAD7PickerValueArray = state.GAD7Assessment2Options
		state.GAD7Mode = 'selector'
		state.GAD7DeepLength = 1
		state.GAD7PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT3_PICKER_OPEN] (state, payload) {
		state.GAD7PickerValueArray = state.GAD7Assessment3Options
		state.GAD7Mode = 'selector'
		state.GAD7DeepLength = 1
		state.GAD7PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT4_PICKER_OPEN] (state, payload) {
		state.GAD7PickerValueArray = state.GAD7Assessment4Options
		state.GAD7Mode = 'selector'
		state.GAD7DeepLength = 1
		state.GAD7PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT5_PICKER_OPEN] (state, payload) {
		state.GAD7PickerValueArray = state.GAD7Assessment5Options
		state.GAD7Mode = 'selector'
		state.GAD7DeepLength = 1
		state.GAD7PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT6_PICKER_OPEN] (state, payload) {
		state.GAD7PickerValueArray = state.GAD7Assessment6Options
		state.GAD7Mode = 'selector'
		state.GAD7DeepLength = 1
		state.GAD7PickerValueDefault = [0]
	},
	[mutationConstants.ASSESSMENT7_PICKER_OPEN] (state, payload) {
		state.GAD7PickerValueArray = state.GAD7Assessment7Options
		state.GAD7Mode = 'selector'
		state.GAD7DeepLength = 1
		state.GAD7PickerValueDefault = [0]
	},
	[mutationConstants.SCORE_CHANGE] (state, payload) {
		state.GAD7LevelObj = {
			IncidenceLevel: payload,
			label: state.GAD7LevelOptions[payload].label
		}
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}