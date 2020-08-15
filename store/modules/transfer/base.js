import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as nursingListMutationConstants from '../nursingList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/nursing/transfer/api/base.js'

const state = {
	TransferThemeColor: '#32CD32',
	TransferPickerValueArray: [],
	TransferMode: '',
	TransferDeepLength: 1,
	TransferPickerValueDefault: [],
	
	IdentityConfirmationTypeObj: {},
	IdentityConfirmationTypeOptions: [
		{ type: 'Type', value: 1, label: '腕带' },
		{ type: 'Type', value: 2, label: '病历' },
		{ type: 'Type', value: 3, label: '病家陈述' },
	],
	ConsciousnessStateObj: {},
	ConsciousnessStateOptions: [
		{ type: 'ConsciousnessState', value: 1, label: '清醒' },
		{ type: 'ConsciousnessState', value: 2, label: '模糊' },
		{ type: 'ConsciousnessState', value: 3, label: '嗜睡' },
		{ type: 'ConsciousnessState', value: 4, label: '浅昏迷' },
		{ type: 'ConsciousnessState', value: 5, label: '深昏迷' },
	],
	VSout: {
		T: '',
		P: '',
		R: '',
		BP: ''
	},
	ConduitConditionObj: {},
	ConduitConditionNote: '',
	SkinConditionObj: {},
	SkinConditionOptions: [
		{ type: 'SkinCondition', value: 1, label: '完整' },
		{ type: 'SkinCondition', value: 2, label: '破损' },
	],
	SkinConditionNote: '',
	CarryingDrugs: '',
	CarryingArticlesObj: {
		Option1: 0,
		Option2: 0,
		Option3: 0,
		CarryingArticlesImageNumber: 0,
		CarryingArticlesNote: '',
	},
	Note: '',
	ConfirmDepartOutObj: {},
	ConfirmDepartOutOptions: [
		{ type: 'ConfirmDepartOut', value: '', label: '请选择' },
		{ type: 'ConfirmDepartOut', value: '三病区', label: '三病区' },
		{ type: 'ConfirmDepartOut', value: '四病区', label: '四病区' },
		{ type: 'ConfirmDepartOut', value: '五病区', label: '五病区' },
	],
	ConfirmPersonOut: '',
	TurnOutTime: '',
	AboveIntoConfirm: 0,
	TransferTime: '',
	ConfirmDepartInObj: {},
	ConfirmDepartInOptions: [
		{ type: 'ConfirmDepartIn', value: '', label: '请选择' },
		{ type: 'ConfirmDepartIn', value: '三病区', label: '三病区' },
		{ type: 'ConfirmDepartIn', value: '四病区', label: '四病区' },
		{ type: 'ConfirmDepartIn', value: '五病区', label: '五病区' },
	],
	ConfirmPersonIn: '',
	VSin: {
		T: '',
		P: '',
		R: '',
		BP: ''
	},
	InDisabled: true,
	OutDisabled: false,
}

const getters = {
	TransferThemeColor: state => state.TransferThemeColor,
	TransferPickerValueArray: state => state.TransferPickerValueArray,
	TransferMode: state => state.TransferMode,
	TransferDeepLength: state => state.TransferDeepLength,
	TransferPickerValueDefault: state => state.TransferPickerValueDefault,
	
	IdentityConfirmationTypeObj: state => state.IdentityConfirmationTypeObj,
	IdentityConfirmationTypeOptions: state => state.IdentityConfirmationTypeOptions,
	ConsciousnessStateObj: state => state.ConsciousnessStateObj,
	VSout: state => state.VSout,
	ConduitConditionObj: state => state.ConduitConditionObj,
	ConduitConditionNote: state => state.ConduitConditionNote,
	SkinConditionObj: state => state.SkinConditionObj,
	SkinConditionNote: state => state.SkinConditionNote,
	CarryingDrugs: state => state.CarryingDrugs,
	CarryingArticlesObj: state => state.CarryingArticlesObj,
	Note: state => state.Note,
	ConfirmDepartOutObj: state => state.ConfirmDepartOutObj,
	ConfirmPersonOut: state => state.ConfirmPersonOut,
	TurnOutTime: state => state.TurnOutTime,
	AboveIntoConfirm: state => state.AboveIntoConfirm,
	TransferTime: state => state.TransferTime,
	ConfirmDepartInObj: state => state.ConfirmDepartInObj,
	ConfirmPersonIn: state => state.ConfirmPersonIn,
	VSin: state => state.VSin,
	InDisabled: state => state.InDisabled,
	OutDisabled: state => state.OutDisabled,

}

const actions = {
	[actionConstants.TRANSFER_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.init(payload.info, payload.id, payload.type, (now, content, followName) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.SET_TRANSFER_CONTENT, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
		.catch((err) => plus.nativeUI.alert(err))
	},
	[actionConstants.TRANSFER_SUBMIT_BEFORE] ({commit}, payload) {
		console.log(JSON.stringify(payload))
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
	[mutationConstants.SET_TRANSFER_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.ConfirmDepartOutObj = payload.type == 'create' ? {} : {
			ConfirmDepartOut: assessmentInfo.ConfirmDepartOut,
			label: assessmentInfo.ConfirmDepartOut == '请选择' || assessmentInfo.ConfirmDepartOut == '' ? '' : assessmentInfo.ConfirmDepartOut
		}
		state.ConfirmPersonOut = payload.type == 'create' ? '' : assessmentInfo.ConfirmPersonOut
		state.TurnOutTime = payload.type == 'create' ? '' : assessmentInfo.TurnOutTime
		state.ConsciousnessStateObj = payload.type == 'create' ? {} : {
			ConsciousnessState: assessmentInfo.ConsciousnessState,
			label: assessmentInfo.ConsciousnessState ? '' : state.ConsciousnessStateOptions[assessmentInfo.ConsciousnessState].label
		}
		// state.VSout = payload.type == 'create' ? 
	},
	[mutationConstants.SET_TRANSFER_CHECKBOX] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		if (payload.type == 'create') {
			state.IdentityConfirmationTypeOptions.forEach((item) => item.checked = false)
		} else {
			kftools.checkBoxValueInit(assessmentInfo.IdentityConfirmationType).forEach((item, index) => state.IdentityConfirmationTypeOptions[index].checked = item)
		}
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch(payload.type) {
			case 'ConsciousnessState':
				state.ConsciousnessStateObj = {
					ConsciousnessState: payload.value[0],
					label: payload.label
				}
				break;
			case 'SkinCondition':
				state.SkinConditionObj = {
					SkinCondition: payload.value[0],
					label: payload.label
				}
				break;
			case 'ConfirmDepartOut':
				state.ConfirmDepartOutObj = {
					ConfirmDepartOut: payload.value[0],
					label: payload.label
				}
				break;
			case 'ConfirmDepartIn':
				state.ConfirmDepartInObj = {
					ConfirmDepartIn: payload.value[0],
					label: payload.label
				}
				break;
		}
	},
	[mutationConstants.TRANSFER_IDENTITY_CONFIRMATION_TYPE_CHECKBOX_CHANGE] (state, payload) {
		let items = state.IdentityConfirmationTypeOptions,
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
	[mutationConstants.TRANSFER_CONSCIOUSNESS_STATE_PICKER_OPEN] (state, payload) {
		state.TransferPickerValueArray = state.ConsciousnessStateOptions
		state.TransferMode = 'selector'
		state.TransferDeepLength = 1
		state.TransferPickerValueDefault = [0]
	},
	[mutationConstants.TRANSFER_SKIN_CONDITION_PICKER_OPEN] (state, payload) {
		state.TransferPickerValueArray = state.SkinConditionOptions
		state.TransferMode = 'selector'
		state.TransferDeepLength = 1
		state.TransferPickerValueDefault = [0]
	},
	[mutationConstants.TRANSFER_CONFIRM_DEPART_OUT_PICKER_OPEN] (state, payload) {
		state.TransferPickerValueArray = state.ConfirmDepartOutOptions
		state.TransferMode = 'selector'
		state.TransferDeepLength = 1
		state.TransferPickerValueDefault = [0]
	},
	[mutationConstants.TRANSFER_CONFRIM_DEPART_IN_PICKER_OPEN] (state, payload) {
		state.TransferPickerValueArray = state.ConfirmDepartInOptions
		state.TransferMode = 'selector'
		state.TransferDeepLength = 1
		state.TransferPickerValueDefault = [0]
	},
	[mutationConstants.TRANSFER_CONDUIT_CONDITION_CHECKBOX_CHANGE] (state, payload) {
		state.ConduitConditionObj.ConduitCondition = payload.target.value ? 2 : 1
	},
	[mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION1_CHECKBOX_CHANGE] (state, payload) {
		state.CarryingArticlesObj.Option1 = payload.target.value ? 1 : 0
	},
	[mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION1_LABEL_CLICK] (state, payload) {
		state.CarryingArticlesObj.Option1 = state.CarryingArticlesObj.Option1 ? 0 : 1
	},
	[mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION2_CHECKBOX_CHANGE] (state, payload) {
		state.CarryingArticlesObj.Option2 = payload.target.value ? 1 : 0
	},
	[mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION2_LABEL_CLICK] (state, payload) {
		state.CarryingArticlesObj.Option2 = state.CarryingArticlesObj.Option2 ? 0 : 1
	},
	[mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION3_CHECKBOX_CHANGE] (state, payload) {
		state.CarryingArticlesObj.Option3 = payload.target.value ? 1 : 0
	},
	[mutationConstants.TRANSFER_CARRYING_ARTICLES_OPTION3_LABEL_CLICK] (state, payload) {
		state.CarryingArticlesObj.Option3 = state.CarryingArticlesObj.Option3 ? 0 : 1
	},
	[mutationConstants.TRANSFER_TURN_OUT_TIME_CHANGE] (state, payload) {
		state.TurnOutTime = payload
	},
	[mutationConstants.TRANSFER_ABOVE_INTO_CONFIRM_SWITCH_CHANGE] (state, payload) {
		state.AboveIntoConfirm = payload ? 1 : 0
	},
	[mutationConstants.TRANSFER_ABOVE_INTO_CONFIRM_LABEL_CLICK] (state, payload) {
		state.AboveIntoConfirm = state.AboveIntoConfirm ? 0 : 1
	},
	[mutationConstants.TRANSFER_CONFRIM_DEPART_IN_PICKER_OPEN] (state, payload) {
		state.TransferPickerValueArray = state.ConfirmDepartInOptions
		state.TransferMode = 'selector'
		state.TransferDeepLength = 1
		state.TransferPickerValueDefault = [0]
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}