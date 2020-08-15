import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as nursingListMutationConstants from '../nursingList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/nursing/fallSupervisor/api/base.js'

const state = {
	FallSupervisorNow: '',
	FallSupervisorThemeColor: '#32CD32',
	FallSupervisorPickerValueArray: [],
	FallSupervisorMode: '',
	FallSupervisorDeepLength: 1,
	FallSupervisorPickerValueDefault: [],
	
	FallSupervisorAssessScoreResult: '',
	FallSupervisorHeadNurseNameObj: {},
	FallSupervisorHeadNurseNameOptions: [
		{ type: 'HeadNurseName', value: '刘霞', label: '刘霞' },
		{ type: 'HeadNurseName', value: '吴海燕', label: '吴海燕' },
		{ type: 'HeadNurseName', value: '邹庆霞', label: '邹庆霞' },
	],
	FallSupervisorTypeObj: {},
	FallSupervisorTypeOptions: [
		{ type: 'Type', value: 0, label: '首次' },
		{ type: 'Type', value: 1, label: '续报' },
	],
	FallSupervisorInterventionObj: {},
	FallSupervisorInterventionOptions: [
		{ type: 'Intervention', value: '落实', label: '落实' },
		{ type: 'Intervention', value: '未到位', label: '未到位' },
	],
	FallSupervisorFallObj: {
		Fall: 0
	},
	FallSupervisorFallNote: '',
	FallSupervisorOutcome2Obj: {},
	FallSupervisorOutcome2Options: [
		{ type: 'Outcome2', value: '', label: '请选择' },
		{ type: 'Outcome2', value: '出院', label: '出院' },
		{ type: 'Outcome2', value: '转院', label: '转院' },
		{ type: 'Outcome2', value: '转科', label: '转科' },
		{ type: 'Outcome2', value: '死亡', label: '死亡' },
		{ type: 'Outcome2', value: '评分≤45分', label: '评分≤45分' },
	],
	FallSupervisorOutcome2Date: '',
	FallSupervisorFollowName: '',
}

const getters = {
	FallSupervisorNow: state => state.FallSupervisorNow,
	FallSupervisorThemeColor: state => state.FallSupervisorThemeColor,
	FallSupervisorPickerValueArray: state => state.FallSupervisorPickerValueArray,
	FallSupervisorMode: state => state.FallSupervisorMode,
	FallSupervisorDeepLength: state => state.FallSupervisorDeepLength,
	FallSupervisorPickerValueDefault: state => state.FallSupervisorPickerValueDefault,
	
	FallSupervisorAssessScoreResult: state => state.FallSupervisorAssessScoreResult,
	FallSupervisorHeadNurseNameObj: state => state.FallSupervisorHeadNurseNameObj,
	FallSupervisorTypeObj: state => state.FallSupervisorTypeObj,
	FallSupervisorInterventionObj: state => state.FallSupervisorInterventionObj,
	FallSupervisorFallObj: state => state.FallSupervisorFallObj,
	FallSupervisorFallNote: state => state.FallSupervisorFallNote,
	FallSupervisorOutcome2Obj: state => state.FallSupervisorOutcome2Obj,
	FallSupervisorOutcome2Date: state => state.FallSupervisorOutcome2Date
}

const actions = {
	[actionConstants.FALL_SUPERVISOR_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.init(payload.info, payload.id, payload.type, (now, content, followName) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_FALL_SUPERVISOR_FOLLOW_NAME, followName)
			commit(mutationConstants.SET_FALL_SUPERVISOR_CONTENT, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
		.catch((err) => plus.nativeUI.alert(err))
	},
	[actionConstants.FALL_SUPERVISOR_SUBMIT_BEFORE] ({commit}, payload) {
		let params = {
			Age: parseInt(payload.info.age),
			AssessScore: parseInt(payload.formData.AssessScoreResult.split(' ')[0]),
			AssessScoreResult: payload.formData.AssessScoreResult,
			BedNumber: payload.info.BedNO,
			Diagnosis: payload.info.MSZD,
			Fall: state.FallSupervisorFallObj.Fall,
			FallNote: payload.formData.FallNote,
			FollowName: payload.type == 'create' ? '' : state.FallSupervisorFollowName,
			HeadNurseName: state.FallSupervisorHeadNurseNameObj.HeadNurseName,
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			Intervention: state.FallSupervisorInterventionObj.Intervention,
			Outcome1: 0,
			Outcome2: state.FallSupervisorOutcome2Obj.Outcome2,
			Outcome2Date: state.FallSupervisorOutcome2Date,
			Sex: payload.info.Sex,
			SupervisorTime: state.FallSupervisorNow,
			SupervisorType: state.FallSupervisorTypeObj.SupervisorType == undefined ? 0 : parseInt(state.FallSupervisorTypeObj.SupervisorType),
			Ward: payload.info.DeptID,
			
			EmployeeID: uni.getStorageSync('EmployeeID'),
			EmployeeName: uni.getStorageSync('EmployeeName'),
			UserID: uni.getStorageSync('UserID'),
		}
		console.log(JSON.stringify(params))
		
		commit(inPatientMutationConstants.SUBMIT_START)
		base.submit(params, payload.id, payload.type, payload.speciallyMonitor, payload.score, (finalModel) => {
			console.log(JSON.stringify(finalModel))
			base.saveBasicInfoModel(payload.type, finalModel, state.FallHaveSupervisor, params)
			.then((msg) => {
				commit(inPatientMutationConstants.SUBMIT_DONE)
				commit(inPatientMutationConstants.SHOW_MESSAGE, msg)
				commit(nursingListMutationConstants.SET_IS_FROM_SUBMIT_TRUE)
				setTimeout(() => {
					uni.navigateBack({ delta: parseInt(payload.fromAssess) == 1 ? 2 : 1 })
				},500)
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
		state.FallSupervisorNow = payload
	},
	[mutationConstants.SET_FALL_SUPERVISOR_FOLLOW_NAME] (state, payload) {
		state.FallSupervisorFollowName = payload
	},
	[mutationConstants.SET_FALL_SUPERVISOR_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.FallSupervisorNow = payload.type == 'create' ? state.FallSupervisorNow : assessmentInfo.CollectionDate.replace('T', ' ')
		state.FallSupervisorHeadNurseNameObj = payload.type == 'create' ? {} : { 
			HeadNurseName: assessmentInfo.HeadNurseName ? assessmentInfo.HeadNurseName : '', 
			label: assessmentInfo.HeadNurseName ? assessmentInfo.HeadNurseName : ''
		}
		state.FallSupervisorTypeObj = payload.type == 'create' ? {} : {
			SupervisorType: assessmentInfo.SupervisorType,
			label: state.FallSupervisorTypeOptions[assessmentInfo.SupervisorType].label
		}
		state.FallSupervisorAssessScoreResult = assessmentInfo.AssessScoreResult
		state.FallSupervisorInterventionObj = payload.type == 'create' ? {} : {
			Intervention: assessmentInfo.Intervention,
			label: assessmentInfo.Intervention
		}
		state.FallSupervisorFallObj = payload.type == 'create' ? {} : { Fall: assessmentInfo.Fall }
		state.FallSupervisorOutcome2Obj = payload.type == 'create' ? {} : {
			Outcome2: assessmentInfo.Outcome2,
			label: assessmentInfo.Outcome2 == '请选择' || assessmentInfo.Outcome2 == '' ? '' : assessmentInfo.Outcome2
		}
		state.FallSupervisorOutcome2Date = payload.type == 'create' ? '' : assessmentInfo.Outcome2Date
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch(payload.type) {
			case 'HeadNurseName':
				state.FallSupervisorHeadNurseNameObj = {
					HeadNurseName: payload.value[0],
					label: payload.label
				}
				break;
			case 'Type':
				state.FallSupervisorTypeObj = {
					SupervisorType: payload.value[0],
					label: payload.label
				}
				break;
			case 'Intervention':
				state.FallSupervisorInterventionObj = {
					Intervention: payload.value[0],
					label: payload.label
				}
				break;
			case 'Outcome2':
				state.FallSupervisorOutcome2Obj = {
					Outcome2: payload.value[0],
					label: payload.label
				}
				break;
		}
	},
	[mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN] (state, payload) {
		state.FallSupervisorPickerValueArray = state.FallSupervisorHeadNurseNameOptions
		state.FallSupervisorMode = 'selector'
		state.FallSupervisorDeepLength = 1
		state.FallSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.FALL_SUPERVISOR_TYPE_PICKER_OPEN] (state, payload) {
		state.FallSupervisorPickerValueArray = state.FallSupervisorTypeOptions
		state.FallSupervisorMode = 'selector'
		state.FallSupervisorDeepLength = 1
		state.FallSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.FALL_SUPERVISOR_INTERVENTION_PICKER_OPEN] (state, payload) {
		state.FallSupervisorPickerValueArray = state.FallSupervisorInterventionOptions
		state.FallSupervisorMode = 'selector'
		state.FallSupervisorDeepLength = 1
		state.FallSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.FALL_SUPERVISOR_OUTCOME2_PICKER_OPEN] (state, payload) {
		state.FallSupervisorPickerValueArray = state.FallSupervisorOutcome2Options
		state.FallSupervisorMode = 'selector'
		state.FallSupervisorDeepLength = 1
		state.FallSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.FALL_SUPERVISOR_FALL_SWITCH_CHANGE] (state, payload) {
		state.FallSupervisorFallObj.Fall = payload.target.value ? 1 : 0
	},
	[mutationConstants.FALL_SUPERVISOR_OUTCOME2_DATE_CHANGE] (state, payload) {
		state.FallSupervisorOutcome2Date = payload
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}