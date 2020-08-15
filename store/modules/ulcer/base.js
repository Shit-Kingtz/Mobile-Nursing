import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as nursingListMutationConstants from '../nursingList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/nursing/ulcer/api/base.js'

const state = {
	UlcerNow: '',
	UlcerThemeColor: '#32CD32',
	UlcerPickerValueArray: [],
	UlcerMode: '',
	UlcerDeepLength: 1,
	UlcerPickerValueDefault: [],
	
	UlcerScore: {
		Assessment1: 0,
		Assessment2: 0,
		Assessment3: 0,
		Assessment4: 0,
		Assessment5: 0,
		Assessment6: 0,
	},
	UlcerBringIntoObj: {},
	UlcerBringIntoOptions: [
		{ type: 'BringInto', value: '', label: '请选择'},
		{ type: 'BringInto', value: '带入', label: '带入'},
		{ type: 'BringInto', value: '发生', label: '发生'},
	],
	UlcerIntervention: '',
	UlcerInterventionOptions: [
		{ type: 'Intervention', value: 1, label: '教育告知'},
		{ type: 'Intervention', value: 2, label: '定时更换体位'},
		{ type: 'Intervention', value: 3, label: '减压保护（A.气垫床/减压床垫 B. 减压敷料）'},
		{ type: 'Intervention', value: 4, label: '伤口处理'},
		{ type: 'Intervention', value: 5, label: '保持皮肤清洁'},
		{ type: 'Intervention', value: 6, label: '保持床位清洁'},
		{ type: 'Intervention', value: 7, label: '营养支持'},
		{ type: 'Intervention', value: 8, label: '理疗'},
	],
	UlcerHeadNurseNameObj: {},
	UlcerHeadNurseNameOptions: [
		{ type: 'HeadNurseName', value: '刘霞', label: '刘霞' },
		{ type: 'HeadNurseName', value: '吴海燕', label: '吴海燕' },
		{ type: 'HeadNurseName', value: '邹庆霞', label: '邹庆霞' },
	],
	UlcerAssessment1Obj: {},
	UlcerAssessment1Options: [
		{ type: 'Assessment1', value: 1, label: '完全受限（1分）' },
		{ type: 'Assessment1', value: 2, label: '非常受限（2分）' },
		{ type: 'Assessment1', value: 3, label: '轻度受限（3分）' },
		{ type: 'Assessment1', value: 4, label: '未受限（4分）' },
	],
	UlcerAssessment2Obj: {},
	UlcerAssessment2Options: [
		{ type: 'Assessment2', value: 1, label: '持续潮湿（1分）' },
		{ type: 'Assessment2', value: 2, label: '潮湿（2分）' },
		{ type: 'Assessment2', value: 3, label: '有时潮湿（3分）' },
		{ type: 'Assessment2', value: 4, label: '很少潮湿（4分）' },
	],
	UlcerAssessment3Obj: {},
	UlcerAssessment3Options: [
		{ type: 'Assessment3', value: 1, label: '限制卧床（1分）' },
		{ type: 'Assessment3', value: 2, label: '可以坐椅子（2分）' },
		{ type: 'Assessment3', value: 3, label: '偶尔行走（3分）' },
		{ type: 'Assessment3', value: 4, label: '经常行走（4分）' },
	],
	UlcerAssessment4Obj: {},
	UlcerAssessment4Options: [
		{ type: 'Assessment4', value: 1, label: '完全无法移动（1分）' },
		{ type: 'Assessment4', value: 2, label: '严重受限（2分）' },
		{ type: 'Assessment4', value: 3, label: '轻微受限（3分）' },
		{ type: 'Assessment4', value: 4, label: '未受限（4分）' },
	],
	UlcerAssessment5Obj: {},
	UlcerAssessment5Options: [
		{ type: 'Assessment5', value: 1, label: '非常差（1分）' },
		{ type: 'Assessment5', value: 2, label: '可能不足够（2分）' },
		{ type: 'Assessment5', value: 3, label: '足够（3分）' },
		{ type: 'Assessment5', value: 4, label: '非常好（4分）' },
	],
	UlcerAssessment6Obj: {},
	UlcerAssessment6Options: [
		{ type: 'Assessment6', value: 1, label: '有问题（1分）' },
		{ type: 'Assessment6', value: 2, label: '有潜在问题（2分）' },
		{ type: 'Assessment6', value: 3, label: '无明显问题（3分）' },
	],
	UlcerHaveSupervisor: 0,
	UlcerGoToSupervisor: false,
}

const getters = {
	UlcerNow: state => state.UlcerNow,
	UlcerThemeColor: state => state.UlcerThemeColor,
	UlcerPickerValueArray: state => state.UlcerPickerValueArray,
	UlcerMode: state => state.UlcerMode,
	UlcerDeepLength: state => state.UlcerDeepLength,
	UlcerPickerValueDefault: state => state.UlcerPickerValueDefault,
	
	UlcerScore: state => state.UlcerScore,
	UlcerBringIntoObj: state => state.UlcerBringIntoObj,
	UlcerIntervention: state => state.UlcerIntervention,
	UlcerInterventionOptions: state => state.UlcerInterventionOptions,
	UlcerHeadNurseNameObj: state => state.UlcerHeadNurseNameObj,
	UlcerAssessment1Obj: state => state.UlcerAssessment1Obj,
	UlcerAssessment2Obj: state => state.UlcerAssessment2Obj,
	UlcerAssessment3Obj: state => state.UlcerAssessment3Obj,
	UlcerAssessment4Obj: state => state.UlcerAssessment4Obj,
	UlcerAssessment5Obj: state => state.UlcerAssessment5Obj,
	UlcerAssessment6Obj: state => state.UlcerAssessment6Obj,
	UlcerHaveSupervisor: state => state.UlcerHaveSupervisor,
	UlcerGoToSupervisor: state => state.UlcerGoToSupervisor,
}

const actions = {
	[actionConstants.ULCER_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_ULCER_CONTENT, {info: content, type: payload.type})
			commit(mutationConstants.SET_ULCER_CHECKBOX, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},1000)
		})
		.catch((err) => plus.nativeUI.alert(err))
	},
	[actionConstants.ULCER_SUBMIT_BEFORE] ({commit}, payload) {
		console.log(JSON.stringify(payload))
		let params = {
			AssessScore: parseInt(payload.AssessScore),
			Assessment1: state.UlcerScore.Assessment1,
			Assessment2: state.UlcerScore.Assessment2,
			Assessment3: state.UlcerScore.Assessment3,
			Assessment4: state.UlcerScore.Assessment4,
			Assessment5: state.UlcerScore.Assessment5,
			Assessment6: state.UlcerScore.Assessment6,
			BringInto: state.UlcerBringIntoObj.BringInto ? state.UlcerBringIntoObj.BringInto : '',
			CollectionDate: state.UlcerNow,
			HeadNurseName: state.UlcerHeadNurseNameObj.HeadNurseName,
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			Intervention: kftools.getCheckBoxStr(state.UlcerInterventionOptions),
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			
			EmployeeID: uni.getStorageSync('EmployeeID'),
			EmployeeName: uni.getStorageSync('EmployeeName'),
			UserID: uni.getStorageSync('UserID'),
		}
		console.log(JSON.stringify(params))
		
		commit(inPatientMutationConstants.SUBMIT_START)
		base.submit(params, payload.id, payload.type, (finalModel) => {
			console.log(JSON.stringify(finalModel))
			base.saveBasicInfoModel(payload.type, finalModel, state.UlcerHaveSupervisor, params)
			.then(([msg, goToSupervisor]) => {
				commit(inPatientMutationConstants.SUBMIT_DONE)
				commit(inPatientMutationConstants.SHOW_MESSAGE, msg)
				commit(nursingListMutationConstants.SET_IS_FROM_SUBMIT_TRUE)
				if (goToSupervisor) {
					state.UlcerGoToSupervisor = goToSupervisor
				} else {
					setTimeout(() => {
						uni.navigateBack({ delta: 1 })
					},500)
				}
			})
		})
		.catch((msg) => {
			commit(inPatientMutationConstants.SUBMIT_DONE)
			commit(inPatientMutationConstants.SHOW_MESSAGE, msg)
		})
	},
}

const mutations = {
	[mutationConstants.NOW_INIT] (state, payload) {
		state.UlcerNow = payload
	},
	[mutationConstants.SET_ULCER_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.UlcerNow = payload.type == 'create' ? state.UlcerNow : assessmentInfo.CollectionDate.replace('T', ' ')
		state.UlcerScore = payload.type == 'create' ? { Assessment1: 0, Assessment2: 0, Assessment3: 0, Assessment4: 0, Assessment5: 0, Assessment6: 0 } : 
			{ Assessment1: assessmentInfo.Assessment1, Assessment2: assessmentInfo.Assessment2, Assessment3: assessmentInfo.Assessment3, 
			  Assessment4: assessmentInfo.Assessment4, Assessment5: assessmentInfo.Assessment5, Assessment6: assessmentInfo.Assessment6 }
		state.UlcerBringIntoObj = payload.type == 'create' ? {} : { BringInto: assessmentInfo.BringInto, label: assessmentInfo.BringInto }
		state.UlcerHeadNurseNameObj = payload.type == 'create' ? {} : { 
			HeadNurseName: assessmentInfo.HeadNurseName ? assessmentInfo.HeadNurseName : '', 
			label: assessmentInfo.HeadNurseName ? assessmentInfo.HeadNurseName : ''
		}
		state.UlcerAssessment1Obj = payload.type == 'create' ? {} : { 
			Assessment1: assessmentInfo.Assessment1, 
			label: assessmentInfo.Assessment1 == 0 ? '' : state.UlcerAssessment1Options[assessmentInfo.Assessment1 - 1].label
		}
		state.UlcerAssessment2Obj = payload.type == 'create' ? {} : { 
			Assessment2: assessmentInfo.Assessment2, 
			label: assessmentInfo.Assessment2 == 0 ? '' : state.UlcerAssessment2Options[assessmentInfo.Assessment2 - 1].label
		}
		state.UlcerAssessment3Obj = payload.type == 'create' ? {} : { 
			Assessment3: assessmentInfo.Assessment3, 
			label: assessmentInfo.Assessment3 == 0 ? '' : state.UlcerAssessment3Options[assessmentInfo.Assessment3 - 1].label
		}
		state.UlcerAssessment4Obj = payload.type == 'create' ? {} : { 
			Assessment4: assessmentInfo.Assessment4, 
			label: assessmentInfo.Assessment4 == 0 ? '' : state.UlcerAssessment4Options[assessmentInfo.Assessment4 - 1].label ,
		}
		state.UlcerAssessment5Obj = payload.type == 'create' ? {} : { 
			Assessment5: assessmentInfo.Assessment5, 
			label: assessmentInfo.Assessment5 == 0 ? '' : state.UlcerAssessment5Options[assessmentInfo.Assessment5 - 1].label ,
		}
		state.UlcerAssessment6Obj = payload.type == 'create' ? {} : { 
			Assessment6: assessmentInfo.Assessment6, 
			label: assessmentInfo.Assessment6 == 0 ? '' : state.UlcerAssessment6Options[assessmentInfo.Assessment6 - 1].label ,
		}
	},
	[mutationConstants.SET_ULCER_CHECKBOX] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		if (payload.type == 'create') {
			state.UlcerInterventionOptions.forEach((item) => item.checked = false)
		} else {
			kftools.checkBoxValueInit(assessmentInfo.Intervention).forEach((item, index) => state.UlcerInterventionOptions[index].checked = item)
		}
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch(payload.type) {
			case 'BringInto':
				state.UlcerBringIntoObj = {
					BringInto: payload.value[0],
					label: payload.label
				}
				break;
			case 'HeadNurseName':
				state.UlcerHeadNurseNameObj = {
					HeadNurseName: payload.value[0],
					label: payload.label
				}
				break;
			case 'Assessment1':
				state.UlcerAssessment1Obj = {
					Assessment1: payload.value[0],
					label: payload.label
				}
				state.UlcerScore.Assessment1 = payload.value[0]
				break;
			case 'Assessment2':
				state.UlcerAssessment2Obj = {
					Assessment2: payload.value[0],
					label: payload.label
				}
				state.UlcerScore.Assessment2 = payload.value[0]
				break;
			case 'Assessment3':
				state.UlcerAssessment3Obj = {
					Assessment3: payload.value[0],
					label: payload.label
				}
				state.UlcerScore.Assessment3 = payload.value[0]
				break;
			case 'Assessment4':
				state.UlcerAssessment4Obj = {
					Assessment4: payload.value[0],
					label: payload.label
				}
				state.UlcerScore.Assessment4 = payload.value[0]
				break;
			case 'Assessment5':
				state.UlcerAssessment5Obj = {
					Assessment5: payload.value[0],
					label: payload.label
				}
				state.UlcerScore.Assessment5 = payload.value[0]
				break;
			case 'Assessment6':
				state.UlcerAssessment6Obj = {
					Assessment6: payload.value[0],
					label: payload.label
				}
				state.UlcerScore.Assessment6 = payload.value[0]
				break;
		}
	},
	[mutationConstants.ULCER_BRING_INTO_PICKER_OPEN] (state, payload) {
		state.UlcerPickerValueArray = state.UlcerBringIntoOptions
		state.UlcerMode = 'selector'
		state.UlcerDeepLength = 1
		state.UlcerPickerValueDefault = [0]
	},
	[mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN] (state, payload) {
		state.UlcerPickerValueArray = state.UlcerHeadNurseNameOptions
		state.UlcerMode = 'selector'
		state.UlcerDeepLength = 1
		state.UlcerPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_INTERVENTION_CHECKBOX_CHANGE] (state, payload) {
		let items = state.UlcerInterventionOptions,
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
	[mutationConstants.ULCER_ASSESSMENT1_PICKER_OPEN] (state, payload) {
		state.UlcerPickerValueArray = state.UlcerAssessment1Options
		state.UlcerMode = 'selector'
		state.UlcerDeepLength = 1
		state.UlcerPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_ASSESSMENT2_PICKER_OPEN] (state, payload) {
		state.UlcerPickerValueArray = state.UlcerAssessment2Options
		state.UlcerMode = 'selector'
		state.UlcerDeepLength = 1
		state.UlcerPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_ASSESSMENT3_PICKER_OPEN] (state, payload) {
		state.UlcerPickerValueArray = state.UlcerAssessment3Options
		state.UlcerMode = 'selector'
		state.UlcerDeepLength = 1
		state.UlcerPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_ASSESSMENT4_PICKER_OPEN] (state, payload) {
		state.UlcerPickerValueArray = state.UlcerAssessment4Options
		state.UlcerMode = 'selector'
		state.UlcerDeepLength = 1
		state.UlcerPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_ASSESSMENT5_PICKER_OPEN] (state, payload) {
		state.UlcerPickerValueArray = state.UlcerAssessment5Options
		state.UlcerMode = 'selector'
		state.UlcerDeepLength = 1
		state.UlcerPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_ASSESSMENT6_PICKER_OPEN] (state, payload) {
		state.UlcerPickerValueArray = state.UlcerAssessment6Options
		state.UlcerMode = 'selector'
		state.UlcerDeepLength = 1
		state.UlcerPickerValueDefault = [0]
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}