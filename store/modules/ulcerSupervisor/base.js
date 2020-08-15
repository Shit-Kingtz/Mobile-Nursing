import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as nursingListMutationConstants from '../nursingList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/nursing/ulcerSupervisor/api/base.js'

const state = {
	UlcerSupervisorNow: '',
	UlcerSupervisorThemeColor: '#32CD32',
	UlcerSupervisorPickerValueArray: [],
	UlcerSupervisorMode: '',
	UlcerSupervisorDeepLength: 1,
	UlcerSupervisorPickerValueDefault: [],
	
	UlcerSupervisorAssessScore: '',
	UlcerSupervisorTypeObj: {},
	UlcerSupervisorTypeOptions: [
		{ type: 'Type', value: 0, label: '首次' },
		{ type: 'Type', value: 1, label: '续报' },
	],
	UlcerSupervisorHeadNurseNameObj: {},
	UlcerSupervisorHeadNurseNameOptions: [
		{ type: 'HeadNurseName', value: '刘霞', label: '刘霞' },
		{ type: 'HeadNurseName', value: '吴海燕', label: '吴海燕' },
		{ type: 'HeadNurseName', value: '邹庆霞', label: '邹庆霞' },
	],
	UlcerSupervisorInterventionObj: {},
	UlcerSupervisorInterventionOptions: [
		{ type: 'Intervention', value: '落实', label: '落实' },
		{ type: 'Intervention', value: '未到位', label: '未到位' },
	],
	UlcerSupervisorUlcerObj: {},
	UlcerSupervisorUlcerOptions: [
		{ type: 'Ulcer', value: 1, label: '无' },
		{ type: 'Ulcer', value: 2, label: '发生压疮' },
		{ type: 'Ulcer', value: 3, label: '带入压疮' },
		{ type: 'Ulcer', value: 4, label: '预报后发生压疮' },
	],
	UlcerSupervisorOutcomeSkinRadio1Obj: {
		Option1: 0,
		Option2: 0,
		Option3: 0
	},
	UlcerSupervisorOutcomeSkinRadio2Obj: {},
	OutcomeSkinRadio2Options: [
		{ type: 'OutcomeSkinRadio2', value: 1, label: '愈合' },
		{ type: 'OutcomeSkinRadio2', value: 2, label: '愈合中' },
		{ type: 'OutcomeSkinRadio2', value: 3, label: '面积扩大' },
	],
	UlcerSupervisorOutcomeSkinRadio3Obj: {},
	OutcomeSkinRadio3Options: [
		{ type: 'OutcomeSkinRadio3', value: 1, label: '愈合' },
		{ type: 'OutcomeSkinRadio3', value: 2, label: '愈合中' },
		{ type: 'OutcomeSkinRadio3', value: 3, label: '面积扩大' },
	],
	UlcerSupervisorOutcome2Obj: {},
	UlcerSupervisorOutcome2Options: [
		{ type: 'Outcome2', value: '', label: '请选择' },
		{ type: 'Outcome2', value: '出院', label: '出院' },
		{ type: 'Outcome2', value: '转院', label: '转院' },
		{ type: 'Outcome2', value: '转科', label: '转科' },
		{ type: 'Outcome2', value: '死亡', label: '死亡' },
		{ type: 'Outcome2', value: '评分≤45分', label: '评分≤45分' },
	],
	UlcerSupervisorOutcome2Date: '',
	UlcerSupervisorModifyDate: '',
	UlcerSupervisorFollowName: '',
	UlcerItemStageText: '',
	UlcerItemStageOptions: [
		{ type: 'Stage', value: '', label: '请选择'},
		{ type: 'Stage', value: '1期', label: '1期'},
		{ type: 'Stage', value: '2期', label: '2期'},
		{ type: 'Stage', value: '3期', label: '3期'},
		{ type: 'Stage', value: '4期', label: '4期'},
		{ type: 'Stage', value: '不可分期', label: '不可分期'},
		{ type: 'Stage', value: '深部组织损伤', label: '深部组织损伤'}
	],
	UlcerItem: {},
	UlcerItemList: [],
	UlcerDetails: [],
}

const getters = {
	UlcerSupervisorNow: state => state.UlcerSupervisorNow,
	UlcerSupervisorThemeColor: state => state.UlcerSupervisorThemeColor,
	UlcerSupervisorPickerValueArray: state => state.UlcerSupervisorPickerValueArray,
	UlcerSupervisorMode: state => state.UlcerSupervisorMode,
	UlcerSupervisorDeepLength: state => state.UlcerSupervisorDeepLength,
	UlcerSupervisorPickerValueDefault: state => state.UlcerSupervisorPickerValueDefault,
	
	UlcerSupervisorAssessScore: state => state.UlcerSupervisorAssessScore,
	UlcerSupervisorHeadNurseNameObj: state => state.UlcerSupervisorHeadNurseNameObj,
	UlcerSupervisorTypeObj: state => state.UlcerSupervisorTypeObj,
	UlcerSupervisorInterventionObj: state => state.UlcerSupervisorInterventionObj,
	UlcerSupervisorUlcerObj: state => state.UlcerSupervisorUlcerObj,
	UlcerSupervisorOutcomeSkinRadio1Obj: state => state.UlcerSupervisorOutcomeSkinRadio1Obj,
	UlcerSupervisorOutcomeSkinRadio2Obj: state => state.UlcerSupervisorOutcomeSkinRadio2Obj,
	UlcerSupervisorOutcomeSkinRadio3Obj: state => state.UlcerSupervisorOutcomeSkinRadio3Obj,
	UlcerSupervisorOutcome2Obj: state => state.UlcerSupervisorOutcome2Obj,
	UlcerSupervisorOutcome2Date: state => state.UlcerSupervisorOutcome2Date,
	UlcerSupervisorModifyDate: state => state.UlcerSupervisorModifyDate,
	UlcerItemStageText: state => state.UlcerItemStageText,
	UlcerItemStageOptions: state => state.UlcerItemStageOptions,
	UlcerItem: state => state.UlcerItem,
	UlcerItemList: state => state.UlcerItemList,
	UlcerDetails: state => state.UlcerDetails,
}

const actions = {
	[actionConstants.ULCER_SUPERVISOR_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.init(payload.info, payload.id, payload.type, (now, content, followName) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_ULCER_SUPERVISOR_FOLLOW_NAME, followName)
			commit(mutationConstants.SET_ULCER_SUPERVISOR_CONTENT, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
		.catch((err) => plus.nativeUI.alert(err))
	},
	[actionConstants.ULCER_SUPERVISOR_SUBMIT_BEFORE] ({commit}, payload) {
		console.log(JSON.stringify(state.UlcerItemList))
		let params = {
			Age: parseInt(payload.info.age),
			AssessScore: isNaN(parseInt(payload.score)) ? '' : parseInt(payload.score),
			BedNumber: payload.info.BedNO,
			Diagnosis: payload.info.MSZD,
			FollowName: payload.type == 'create' ? '' : state.UlcerSupervisorFollowName,
			HeadNurseName: state.UlcerSupervisorHeadNurseNameObj.HeadNurseName,
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			Intervention: state.UlcerSupervisorInterventionObj.Intervention,
			Ulcer: state.UlcerSupervisorUlcerObj.Ulcer,
			ModifyDate: state.UlcerSupervisorModifyDate,
			Outcome1: 0,
			Outcome2: state.UlcerSupervisorOutcome2Obj.Outcome2,
			Outcome2Date: state.UlcerSupervisorOutcome2Date,
			OutcomeSkinRadio1: kftools.getOutcomeSkinRadio1Str(state.UlcerSupervisorOutcomeSkinRadio1Obj),
			OutcomeSkinRadio2: state.UlcerSupervisorOutcomeSkinRadio2Obj.OutcomeSkinRadio2 ? parseInt(state.UlcerSupervisorOutcomeSkinRadio2Obj.OutcomeSkinRadio2) : 0,
			OutcomeSkinRadio3: state.UlcerSupervisorOutcomeSkinRadio3Obj.OutcomeSkinRadio3 ? parseInt(state.UlcerSupervisorOutcomeSkinRadio3Obj.OutcomeSkinRadio3) : 0,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			Sex: payload.info.Sex,
			SupervisorTime: state.UlcerSupervisorNow,
			SupervisorType: state.UlcerSupervisorTypeObj.SupervisorType == undefined ? 0 : parseInt(state.UlcerSupervisorTypeObj.SupervisorType),
			Ward: payload.info.DeptID,
			
			EmployeeID: uni.getStorageSync('EmployeeID'),
			EmployeeName: uni.getStorageSync('EmployeeName'),
			UserID: uni.getStorageSync('UserID'),
		}
		params.AssessID = payload.type == 'create' ? kftools.guid() : payload.id
		console.log(JSON.stringify(params));return false
		
		commit(inPatientMutationConstants.SUBMIT_START)
		base.submit(params, payload.type, state.UlcerItemList, payload.score, (finalModel) => {
			console.log(JSON.stringify(finalModel))
			base.saveBasicInfoModel(payload.type, finalModel, state.UlcerHaveSupervisor, params)
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
		state.UlcerSupervisorNow = payload
	},
	[mutationConstants.SET_ULCER_SUPERVISOR_FOLLOW_NAME] (state, payload) {
		state.UlcerSupervisorFollowName = payload
	},
	[mutationConstants.SET_ULCER_SUPERVISOR_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.UlcerSupervisorNow = payload.type == 'create' ? state.UlcerSupervisorNow : assessmentInfo.CollectionDate.replace('T', ' ')
		state.UlcerSupervisorAssessScore = payload.type == 'create' ? '' : assessmentInfo.AssessScore
		state.UlcerSupervisorHeadNurseNameObj = payload.type == 'create' ? {} : { 
			HeadNurseName: assessmentInfo.HeadNurseName ? assessmentInfo.HeadNurseName : '', 
			label: assessmentInfo.HeadNurseName ? assessmentInfo.HeadNurseName : ''
		}
		state.UlcerSupervisorTypeObj = payload.type == 'create' ? {} : {
			SupervisorType: assessmentInfo.SupervisorType,
			label: state.UlcerSupervisorTypeOptions[assessmentInfo.SupervisorType].label
		}
		state.UlcerSupervisorInterventionObj = payload.type == 'create' ? {} : {
			Intervention: assessmentInfo.Intervention,
			label: assessmentInfo.Intervention
		}
		state.UlcerSupervisorUlcerObj = payload.type == 'create' ? {} : { 
			Ulcer: assessmentInfo.Ulcer, 
			label: assessmentInfo.Ulcer == 0 ? '' : state.UlcerSupervisorUlcerOptions[assessmentInfo.Ulcer - 1].label
		}
		let values = payload.type == 'create' ? [0,0,0] : kftools.checkBoxValueInit(assessmentInfo.OutcomeSkinRadio1)
		state.UlcerSupervisorOutcomeSkinRadio1Obj = { Option1: values[0], Option2: values[1], Option3: values[2] }
		state.UlcerSupervisorOutcomeSkinRadio2Obj = payload.type == 'create' ? {} : { 
			OutcomeSkinRadio2: assessmentInfo.OutcomeSkinRadio2, 
			label: assessmentInfo.OutcomeSkinRadio2 == 0 ? '' : state.OutcomeSkinRadio2Options[assessmentInfo.OutcomeSkinRadio2 - 1].label, 
		}
		state.UlcerSupervisorOutcomeSkinRadio3Obj = payload.type == 'create' ? {} : { 
			OutcomeSkinRadio3: assessmentInfo.OutcomeSkinRadio3, 
			label: assessmentInfo.OutcomeSkinRadio3 == 0 ? '' : state.OutcomeSkinRadio3Options[assessmentInfo.OutcomeSkinRadio3 - 1].label, 
		}
		state.UlcerSupervisorOutcome2Obj = payload.type == 'create' ? {} : {
			Outcome2: assessmentInfo.Outcome2,
			label: assessmentInfo.Outcome2 == '请选择' || assessmentInfo.Outcome2 == '' ? '' : assessmentInfo.Outcome2
		}
		state.UlcerSupervisorOutcome2Date = payload.type == 'create' ? '' : assessmentInfo.Outcome2Date
		state.UlcerSupervisorModifyDate = payload.type == 'create' ? '' : assessmentInfo.ModifyDate
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch(payload.type) {
			case 'HeadNurseName':
				state.UlcerSupervisorHeadNurseNameObj = {
					HeadNurseName: payload.value[0],
					label: payload.label
				}
				break;
			case 'Type':
				state.UlcerSupervisorTypeObj = {
					SupervisorType: payload.value[0],
					label: payload.label
				}
				break;
			case 'Intervention':
				state.UlcerSupervisorInterventionObj = {
					Intervention: payload.value[0],
					label: payload.label
				}
				break;
			case 'Ulcer':
				state.UlcerSupervisorUlcerObj = {
					Ulcer: payload.value[0],
					label: payload.label
				}
				break;
			case 'OutcomeSkinRadio2':
				state.UlcerSupervisorOutcomeSkinRadio2Obj = {
					OutcomeSkinRadio2: payload.value[0],
					label: payload.label
				}
				state.UlcerSupervisorOutcomeSkinRadio1Obj.Option2 = 1
				break;
			case 'OutcomeSkinRadio3':
				state.UlcerSupervisorOutcomeSkinRadio3Obj = {
					OutcomeSkinRadio3: payload.value[0],
					label: payload.label
				}
				state.UlcerSupervisorOutcomeSkinRadio1Obj.Option3 = 1
				break;
			case 'Outcome2':
				state.UlcerSupervisorOutcome2Obj = {
					Outcome2: payload.value[0],
					label: payload.label
				}
				break;
			case 'Stage':
				state.UlcerItemStageText = payload.label
				state.UlcerItem.Ulcerstage = payload.value[0]
				break;
		}
	},
	[mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN] (state, payload) {
		state.UlcerSupervisorPickerValueArray = state.UlcerSupervisorHeadNurseNameOptions
		state.UlcerSupervisorMode = 'selector'
		state.UlcerSupervisorDeepLength = 1
		state.UlcerSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_SUPERVISOR_TYPE_PICKER_OPEN] (state, payload) {
		state.UlcerSupervisorPickerValueArray = state.UlcerSupervisorTypeOptions
		state.UlcerSupervisorMode = 'selector'
		state.UlcerSupervisorDeepLength = 1
		state.UlcerSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_SUPERVISOR_INTERVENTION_PICKER_OPEN] (state, payload) {
		state.UlcerSupervisorPickerValueArray = state.UlcerSupervisorInterventionOptions
		state.UlcerSupervisorMode = 'selector'
		state.UlcerSupervisorDeepLength = 1
		state.UlcerSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_SUPERVISOR_ULCER_PICKER_OPEN] (state, payload) {
		state.UlcerSupervisorPickerValueArray = state.UlcerSupervisorUlcerOptions
		state.UlcerSupervisorMode = 'selector'
		state.UlcerSupervisorDeepLength = 1
		state.UlcerSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_SUPERVISOR_OUTCOME_SKIN_RADIO2_PICKER_OPEN] (state, payload) {
		state.UlcerSupervisorPickerValueArray = state.OutcomeSkinRadio2Options
		state.UlcerSupervisorMode = 'selector'
		state.UlcerSupervisorDeepLength = 1
		state.UlcerSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_SUPERVISOR_OUTCOME_SKIN_RADIO3_PICKER_OPEN] (state, payload) {
		state.UlcerSupervisorPickerValueArray = state.OutcomeSkinRadio3Options
		state.UlcerSupervisorMode = 'selector'
		state.UlcerSupervisorDeepLength = 1
		state.UlcerSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_SUPERVISOR_OUTCOME2_PICKER_OPEN] (state, payload) {
		state.UlcerSupervisorPickerValueArray = state.UlcerSupervisorOutcome2Options
		state.UlcerSupervisorMode = 'selector'
		state.UlcerSupervisorDeepLength = 1
		state.UlcerSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_SUPERVISOR_OPTION1_CHECKBOX_CHANGE] (state, payload) {
		state.UlcerSupervisorOutcomeSkinRadio1Obj.Option1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.ULCER_SUPERVISOR_OPTION1_LABEL_CLICK] (state, payload) {
		state.UlcerSupervisorOutcomeSkinRadio1Obj.Option1 = state.UlcerSupervisorOutcomeSkinRadio1Obj.Option1 ? 0 : 1
	},
	[mutationConstants.ULCER_SUPERVISOR_OPTION2_CHECKBOX_CHANGE] (state, payload) {
		state.UlcerSupervisorOutcomeSkinRadio1Obj.Option2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.ULCER_SUPERVISOR_OPTION2_LABEL_CLICK] (state, payload) {
		state.UlcerSupervisorOutcomeSkinRadio1Obj.Option2 = state.UlcerSupervisorOutcomeSkinRadio1Obj.Option2 ? 0 : 1
	},
	[mutationConstants.ULCER_SUPERVISOR_OPTION3_CHECKBOX_CHANGE] (state, payload) {
		state.UlcerSupervisorOutcomeSkinRadio1Obj.Option3 = payload.target.value ? 1 : 0
	},
	[mutationConstants.ULCER_SUPERVISOR_OPTION3_LABEL_CLICK] (state, payload) {
		state.UlcerSupervisorOutcomeSkinRadio1Obj.Option3 = state.UlcerSupervisorOutcomeSkinRadio1Obj.Option3 ? 0 : 1
	},
	[mutationConstants.ULCER_SUPERVISOR_OUTCOME2_DATE_CHANGE] (state, payload) {
		state.UlcerSupervisorOutcome2Date = payload
	},
	[mutationConstants.ULCER_SUPERVISOR_MODIFY_DATE_CHANGE] (state, payload) {
		state.UlcerSupervisorModifyDate = payload
	},
	[mutationConstants.ULCER_ITEM_FORM_RESET] (state, payload) {
		state.UlcerItem = {}
		state.UlcerItemStageText = ''
	},
	[mutationConstants.ULCER_ITEM_STAGE_PICKER_OPEN] (state, payload) {
		state.UlcerSupervisorPickerValueArray = state.UlcerItemStageOptions
		state.UlcerSupervisorMode = 'selector'
		state.UlcerSupervisorDeepLength = 1
		state.UlcerSupervisorPickerValueDefault = [0]
	},
	[mutationConstants.ULCER_ITEM_SUBMIT] (state, payload) {
		state.UlcerItem = { Uloccutime: payload.date, ...payload.item }
	},
	[mutationConstants.ULCER_ITEM_RETURN_SKINLIST] (state, payload) {
		state.UlcerItemList = payload
		state.UlcerDetails = kftools.getUlcerDetails(state.UlcerItemList)
	},
	[mutationConstants.ULCER_SUPERVISOR_DELETE_ULCER_ITEM] (state, payload) {
		console.log(payload)
		state.UlcerItemList.splice(payload, 1)
		state.UlcerDetails = kftools.getUlcerDetails(state.UlcerItemList)
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}