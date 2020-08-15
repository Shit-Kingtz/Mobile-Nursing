import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import base from '../../../pages/assessment/MEWS/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	MEWSNow: '',
	MEWSThemeColor: '#32CD32',
	MEWSPickerValueArray: [],
	MEWSMode: '',
	MEWSDeepLength: 1,
	MEWSPickerValueDefault: [],
	
	MEWSAssessment1Obj: {},
	MEWSAssessment1Options: [
		{ type:'Assessment1', value: 0, label: '50 ~ 100（0分）'},
		{ type:'Assessment1', value: 1, label: '41 ~ 50或101 ~ 110（1分）'},
		{ type:'Assessment1', value: 2, label: '≤ 40或111 ~ 129（2分）'},
		{ type:'Assessment1', value: 3, label: '≥ 130（3分）'},
	],
	MEWSAssessment2Obj: {},
	MEWSAssessment2Options: [
		{ type:'Assessment2', value: 2, label: '21 ~ 29（2分）'},
		{ type:'Assessment2', value: 3, label: '≥ 30（3分）'},
	],
	MEWSAssessment3Obj: {},
	MEWSAssessment3Options: [
		{ type:'Assessment3', value: 0, label: '36.1 ~ 38（0分）'},
		{ type:'Assessment3', value: 1, label: '35.1 ~ 36或38.1 ~ 38.5（1分）'},
		{ type:'Assessment3', value: 2, label: '≤ 35.0或 > 38.6（2分）'},
	],
	MEWSAssessment4Obj: {},
	MEWSAssessment4Options: [
		{ type:'Assessment4', value: 0, label: '完全清醒（0分）'},
		{ type:'Assessment4', value: 1, label: '对声音有反应（1分）'},
		{ type:'Assessment4', value: 2, label: '对痛楚有反应（2分）'},
		{ type:'Assessment4', value: 3, label: '无反应（3分）'},
	],
	MEWSAssessment5Obj: {},
	MEWSAssessment5Options: [
		{ type:'Assessment5', value: 0, label: '101 ~ 149（0分）'},
		{ type:'Assessment5', value: 1, label: '81 ~ 100或150 ~ 199（1分）'},
		{ type:'Assessment5', value: 2, label: '≥ 200（2分）'},
		{ type:'Assessment5', value: 3, label: '≤ 60（3分）'},
	],
	MEWSAssessment6Obj: {},
	MEWSAssessment6Options: [
		{ type:'Assessment6', value: 2, label: '< 30（2分）'},
		{ type:'Assessment6', value: 3, label: '无（3分）'},
	],
	MEWSAssessment7Obj: {},
	MEWSAssessment7Options: [
		{ type:'Assessment7', value: 0, label: '96 ~ 100（0分）'},
		{ type:'Assessment7', value: 1, label: '90 ~ 95（1分）'},
		{ type:'Assessment7', value: 2, label: '85 ~ 89（2分）'},
		{ type:'Assessment7', value: 3, label: '≤ 84（3分）'},
	],
	MEWSAssessment8Obj: {},	
	MEWSAssessment8Options: [
		{ type:'Assessment8', value: 0, label: '3.9 ~ 6.1（0分）'},
		{ type:'Assessment8', value: 1, label: '3.4 ~ 3.8（1分）'},
		{ type:'Assessment8', value: 2, label: '2.9 ~ 3.3（2分）'},
		{ type:'Assessment8', value: 3, label: '≤ 2.8（3分）'},
	],
	MEWSAssessment9Obj: {},
	MEWSAssessment9Options: [
		{ type:'Assessment9', value: 0, label: '0 ~ 1（0分）'},
		{ type:'Assessment9', value: 1, label: '2 ~ 3（1分）'},
		{ type:'Assessment9', value: 2, label: '4 ~ 6（2分）'},
		{ type:'Assessment9', value: 3, label: '≥ 7（3分）'},
	],
	
	MEWSScore: {
		Assessment1: 0,
		Assessment2: 0,
		Assessment3: 0,
		Assessment4: 0,
		Assessment5: 0,
		Assessment6: 0,
		Assessment7: 0,
		Assessment8: 0,
		Assessment9: 0,
	}
}

const getters = {
	MEWSNow: state => state.MEWSNow,
	MEWSThemeColor: state => state.MEWSThemeColor,
	MEWSPickerValueArray: state => state.MEWSPickerValueArray,
	MEWSMode: state => state.MEWSMode,
	MEWSDeepLength: state => state.MEWSDeepLength,
	MEWSPickerValueDefault: state => state.MEWSPickerValueDefault,
	
	MEWSAssessment1Obj: state => state.MEWSAssessment1Obj,
	MEWSAssessment2Obj: state => state.MEWSAssessment2Obj,
	MEWSAssessment3Obj: state => state.MEWSAssessment3Obj,
	MEWSAssessment4Obj: state => state.MEWSAssessment4Obj,
	MEWSAssessment5Obj: state => state.MEWSAssessment5Obj,
	MEWSAssessment6Obj: state => state.MEWSAssessment6Obj,
	MEWSAssessment7Obj: state => state.MEWSAssessment7Obj,
	MEWSAssessment8Obj: state => state.MEWSAssessment8Obj,
	MEWSAssessment9Obj: state => state.MEWSAssessment9Obj,
	MEWSScore: state => state.MEWSScore
}

const actions = {
	[actionConstants.MEWS_INIT] ({ commit }, payload) {
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_MEWS_CONTENT, {info: content, type: payload.type}),
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
	},
	[actionConstants.MEWS_SUBMIT_BEFORE] ({ commit }, payload) {
		let params = {
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			AsstSort: 0,							// 护理分类
			Assessment1: isNaN(parseInt(state.MEWSAssessment1Obj.Assessment1)) ? -1 : parseInt(state.MEWSAssessment1Obj.Assessment1),
			Assessment2: isNaN(parseInt(state.MEWSAssessment2Obj.Assessment2)) ? -1 : parseInt(state.MEWSAssessment2Obj.Assessment2),
			Assessment3: isNaN(parseInt(state.MEWSAssessment3Obj.Assessment3)) ? -1 : parseInt(state.MEWSAssessment3Obj.Assessment3),
			Assessment4: isNaN(parseInt(state.MEWSAssessment4Obj.Assessment4)) ? -1 : parseInt(state.MEWSAssessment4Obj.Assessment4),
			Assessment5: isNaN(parseInt(state.MEWSAssessment5Obj.Assessment5)) ? -1 : parseInt(state.MEWSAssessment5Obj.Assessment5),
			Assessment6: isNaN(parseInt(state.MEWSAssessment6Obj.Assessment6)) ? -1 : parseInt(state.MEWSAssessment6Obj.Assessment6),
			Assessment7: isNaN(parseInt(state.MEWSAssessment7Obj.Assessment7)) ? -1 : parseInt(state.MEWSAssessment7Obj.Assessment7),
			Assessment8: isNaN(parseInt(state.MEWSAssessment8Obj.Assessment8)) ? -1 : parseInt(state.MEWSAssessment8Obj.Assessment8),
			Assessment9: isNaN(parseInt(state.MEWSAssessment9Obj.Assessment9)) ? -1 : parseInt(state.MEWSAssessment9Obj.Assessment9),
			AssessScore: parseInt(payload.AssessScore) == 0 ? '' : parseInt(payload.AssessScore),
			CollectionDate: state.MEWSNow,
			
			EmployeeID: uni.getStorageSync('EmployeeID'),
			EmployeeName: uni.getStorageSync('EmployeeName'),
			UserID: uni.getStorageSync('UserID')
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
		state.MEWSNow = payload
	},
	[mutationConstants.SET_MEWS_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.MEWSNow = payload.type == 'create' ? state.MEWSNow : assessmentInfo.CollectionDate.replace('T', ' ')
		state.MEWSAssessment1Obj = payload.type == 'create' ? {} : {
			Assessment1: assessmentInfo.Assessment1,
			label: assessmentInfo.Assessment1 == -1 ? '' : state.MEWSAssessment1Options[assessmentInfo.Assessment1].label.split('（')[0]
		}
		state.MEWSAssessment2Obj = payload.type == 'create' ? {} : {
			Assessment2: assessmentInfo.Assessment2,
			label: assessmentInfo.Assessment2 == -1 ? '' : state.MEWSAssessment2Options[assessmentInfo.Assessment2 - 2].label.split('（')[0]
		}
		state.MEWSAssessment3Obj = payload.type == 'create' ? {} : {
			Assessment3: assessmentInfo.Assessment3,
			label: assessmentInfo.Assessment3 == -1 ? '' : state.MEWSAssessment3Options[assessmentInfo.Assessment3].label.split('（')[0]
		}
		state.MEWSAssessment4Obj = payload.type == 'create' ? {} : {
			Assessment4: assessmentInfo.Assessment4,
			label: assessmentInfo.Assessment4 == -1 ? '' : state.MEWSAssessment4Options[assessmentInfo.Assessment4].label.split('（')[0]
		}
		state.MEWSAssessment5Obj = payload.type == 'create' ? {} : {
			Assessment5: assessmentInfo.Assessment5,
			label: assessmentInfo.Assessment5 == -1 ? '' : state.MEWSAssessment5Options[assessmentInfo.Assessment5].label.split('（')[0]
		}
		state.MEWSAssessment6Obj = payload.type == 'create' ? {} : {
			Assessment6: assessmentInfo.Assessment6,
			label: assessmentInfo.Assessment6 == -1 ? '' : state.MEWSAssessment6Options[assessmentInfo.Assessment6 - 2].label.split('（')[0]
		}
		state.MEWSAssessment7Obj = payload.type == 'create' ? {} : {
			Assessment7: assessmentInfo.Assessment7,
			label: assessmentInfo.Assessment7 == -1 ? '' : state.MEWSAssessment7Options[assessmentInfo.Assessment7].label.split('（')[0]
		}
		state.MEWSAssessment8Obj = payload.type == 'create' ? {} : {
			Assessment8: assessmentInfo.Assessment8,
			label: assessmentInfo.Assessment8 == -1 ? '' : state.MEWSAssessment8Options[assessmentInfo.Assessment8].label.split('（')[0]
		}
		state.MEWSAssessment9Obj = payload.type == 'create' ? {} : {
			Assessment9: assessmentInfo.Assessment9,
			label: assessmentInfo.Assessment9 == -1 ? '' : state.MEWSAssessment9Options[assessmentInfo.Assessment9].label.split('（')[0]
		}
		state.MEWSScore.Assessment1 = payload.type == 'create' ? -1 : assessmentInfo.Assessment1
		state.MEWSScore.Assessment2 = payload.type == 'create' ? -1 : assessmentInfo.Assessment2
		state.MEWSScore.Assessment3 = payload.type == 'create' ? -1 : assessmentInfo.Assessment3
		state.MEWSScore.Assessment4 = payload.type == 'create' ? -1 : assessmentInfo.Assessment4
		state.MEWSScore.Assessment5 = payload.type == 'create' ? -1 : assessmentInfo.Assessment5
		state.MEWSScore.Assessment6 = payload.type == 'create' ? -1 : assessmentInfo.Assessment6
		state.MEWSScore.Assessment7 = payload.type == 'create' ? -1 : assessmentInfo.Assessment7
		state.MEWSScore.Assessment8 = payload.type == 'create' ? -1 : assessmentInfo.Assessment8
		state.MEWSScore.Assessment9 = payload.type == 'create' ? -1 : assessmentInfo.Assessment9
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch(payload.type) {
			case 'Assessment1':
				state.MEWSAssessment1Obj = {
					Assessment1: payload.value[0],
					label: payload.label.split('（')[0]
				}
				state.MEWSScore.Assessment1 = payload.value[0]
				break;
			case 'Assessment2':
				state.MEWSAssessment2Obj = {
					Assessment2: payload.value[0],
					label: payload.label.split('（')[0]
				}
				state.MEWSScore.Assessment2 = payload.value[0]
				break;
			case 'Assessment3':
				state.MEWSAssessment3Obj = {
					Assessment3: payload.value[0],
					label: payload.label.split('（')[0]
				}
				state.MEWSScore.Assessment3 = payload.value[0]
				break;
			case 'Assessment4':
				state.MEWSAssessment4Obj = {
					Assessment4: payload.value[0],
					label: payload.label.split('（')[0]
				}
				state.MEWSScore.Assessment4 = payload.value[0]
				break;
			case 'Assessment5':
				state.MEWSAssessment5Obj = {
					Assessment5: payload.value[0],
					label: payload.label.split('（')[0]
				}
				state.MEWSScore.Assessment5 = payload.value[0]
				break;
			case 'Assessment6':
				state.MEWSAssessment6Obj = {
					Assessment6: payload.value[0],
					label: payload.label.split('（')[0]
				}
				state.MEWSScore.Assessment6 = payload.value[0]
				break;
			case 'Assessment7':
				state.MEWSAssessment7Obj = {
					Assessment7: payload.value[0],
					label: payload.label.split('（')[0]
				}
				state.MEWSScore.Assessment7 = payload.value[0]
				break;
			case 'Assessment8':
				state.MEWSAssessment8Obj = {
					Assessment8: payload.value[0],
					label: payload.label.split('（')[0]
				}
				state.MEWSScore.Assessment8 = payload.value[0]
				break;
			case 'Assessment9':
				state.MEWSAssessment9Obj = {
					Assessment9: payload.value[0],
					label: payload.label.split('（')[0]
				}
				state.MEWSScore.Assessment9 = payload.value[0]
				break;
		}
	},
	[mutationConstants.MEWS_ASSESSMENT1_PICKER_OPEN] (state, payload) {
		state.MEWSPickerValueArray = state.MEWSAssessment1Options
		state.MEWSMode = 'selector'
		state.MEWSDeepLength = 1
		state.MEWSPickerValueDefault = [0]
	},
	[mutationConstants.MEWS_ASSESSMENT2_PICKER_OPEN] (state, payload) {
		state.MEWSPickerValueArray = state.MEWSAssessment2Options
		state.MEWSMode = 'selector'
		state.MEWSDeepLength = 1
		state.MEWSPickerValueDefault = [0]
	},
	[mutationConstants.MEWS_ASSESSMENT3_PICKER_OPEN] (state, payload) {
		state.MEWSPickerValueArray = state.MEWSAssessment3Options
		state.MEWSMode = 'selector'
		state.MEWSDeepLength = 1
		state.MEWSPickerValueDefault = [0]
	},
	[mutationConstants.MEWS_ASSESSMENT4_PICKER_OPEN] (state, payload) {
		state.MEWSPickerValueArray = state.MEWSAssessment4Options
		state.MEWSMode = 'selector'
		state.MEWSDeepLength = 1
		state.MEWSPickerValueDefault = [0]
	},
	[mutationConstants.MEWS_ASSESSMENT5_PICKER_OPEN] (state, payload) {
		state.MEWSPickerValueArray = state.MEWSAssessment5Options
		state.MEWSMode = 'selector'
		state.MEWSDeepLength = 1
		state.MEWSPickerValueDefault = [0]
	},
	[mutationConstants.MEWS_ASSESSMENT6_PICKER_OPEN] (state, payload) {
		state.MEWSPickerValueArray = state.MEWSAssessment6Options
		state.MEWSMode = 'selector'
		state.MEWSDeepLength = 1
		state.MEWSPickerValueDefault = [0]
	},
	[mutationConstants.MEWS_ASSESSMENT7_PICKER_OPEN] (state, payload) {
		state.MEWSPickerValueArray = state.MEWSAssessment7Options
		state.MEWSMode = 'selector'
		state.MEWSDeepLength = 1
		state.MEWSPickerValueDefault = [0]
	},
	[mutationConstants.MEWS_ASSESSMENT8_PICKER_OPEN] (state, payload) {
		state.MEWSPickerValueArray = state.MEWSAssessment8Options
		state.MEWSMode = 'selector'
		state.MEWSDeepLength = 1
		state.MEWSPickerValueDefault = [0]
	},
	[mutationConstants.MEWS_ASSESSMENT9_PICKER_OPEN] (state, payload) {
		state.MEWSPickerValueArray = state.MEWSAssessment9Options
		state.MEWSMode = 'selector'
		state.MEWSDeepLength = 1
		state.MEWSPickerValueDefault = [0]
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}