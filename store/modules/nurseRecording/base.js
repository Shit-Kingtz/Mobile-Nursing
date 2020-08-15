import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as nursingListMutationConstants from '../nursingList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/nursing/nurseRecording/api/base.js'

const state = {
	NurseRecordingThemeColor: '#32CD32',
	NurseRecordingPickerValueArray: [],
	NurseRecordingMode: '',
	NurseRecordingDeepLength: 1,
	NurseRecordingPickerValueDefault: [],
	
	NurseRecordingNotifyDoctor: 0,
	ConsciousnessTypeObj: {},
	ConsciousnessTypeOptions: [
		{ type:'ConsciousnessType', value: 1, label: '清晰'},
		{ type:'ConsciousnessType', value: 2, label: '嗜睡'},
		{ type:'ConsciousnessType', value: 3, label: '意识模糊'},
		{ type:'ConsciousnessType', value: 4, label: '昏睡'},
		{ type:'ConsciousnessType', value: 5, label: '浅昏迷'},
		{ type:'ConsciousnessType', value: 6, label: '深昏迷'},
		{ type:'ConsciousnessType', value: 7, label: '谵妄'},
	],
	GradingObj: {},
	GradingOptions: [
		{ type:'Grading', value: 1, label: 'Ⅰ级'},
		{ type:'Grading', value: 2, label: 'Ⅱ级'},
		{ type:'Grading', value: 3, label: 'Ⅲ级'},
	],
	BodyTemperature: '',
	Pulse: '',
	Breath: '',
	BloodPressure: '',
	Saturation: '',
	VASScore: '',
	MENurse: 0,
	OxygenCure: '',
	SkinStatusObj: {},
	SkinStatusOptions: [
		{ type:'SkinStatus', value: 1, label: '完整'},
		{ type:'SkinStatus', value: 2, label: '破损'},
	],
	UlcerNurseOptions: [
		{ type:'UlcerNurse', value: 1, label: '保持床单位干燥清洁'},
		{ type:'UlcerNurse', value: 2, label: '定时翻身'},
		{ type:'UlcerNurse', value: 3, label: '局部减压'},
		{ type:'UlcerNurse', value: 4, label: '压力性损伤处理'},
		{ type:'UlcerNurse', value: 5, label: '气垫床'},
		{ type:'UlcerNurse', value: 6, label: '教育指导'},
		{ type:'UlcerNurse', value: 7, label: '营养支持'},
		{ type:'UlcerNurse', value: 8, label: '其他'},
	],
	PositionObj: {},
	PositionOptions: [
		{ type:'Position', value: 1, label: '左侧'},
		{ type:'Position', value: 2, label: '平卧'},
		{ type:'Position', value: 3, label: '右侧'},
		{ type:'Position', value: 4, label: '半卧位'},
		{ type:'Position', value: 5, label: '保护软垫、枕'},
	],
	FallNurseObj: {},
	FallNurseOptions: [
		{ type:'FallNurse', value: 1, label: '一般防范措施'},
		{ type:'FallNurse', value: 2, label: '标准防范措施'},
		{ type:'FallNurse', value: 3, label: '高危患者防范措施'},
	],
	BloodSupplyOptions: [
		{ type:'BloodSupply', value: 1, label: '左上肢'},
		{ type:'BloodSupply', value: 2, label: '右上肢'},
		{ type:'BloodSupply', value: 3, label: '左下肢'},
		{ type:'BloodSupply', value: 4, label: '右下肢'},
		{ type:'BloodSupply', value: 5, label: '躯干'},
		{ type:'BloodSupply', value: 6, label: '其他'},
	],
	CatheterSafetyOptions: [
		{ type:'CatheterSafety', value: 1, label: '妥善固定'},
		{ type:'CatheterSafety', value: 2, label: '导管警示标识'},
		{ type:'CatheterSafety', value: 3, label: '患者及家属告知'},
		{ type:'CatheterSafety', value: 4, label: '加强巡视'},
		{ type:'CatheterSafety', value: 5, label: '床旁交接'},
		{ type:'CatheterSafety', value: 6, label: '适当约束'},
		{ type:'CatheterSafety', value: 7, label: '家属陪护'},
	],
	NurseRecordingDietObj: {},
	NurseRecordingDietOptions: [
		{ type:'Diet', value: 1, label: '普食'},
		{ type:'Diet', value: 2, label: '软食'},
		{ type:'Diet', value: 3, label: '半流质'},
		{ type:'Diet', value: 4, label: '流质'},
		{ type:'Diet', value: 5, label: '禁食'},
		{ type:'Diet', value: 6, label: '低盐'},
		{ type:'Diet', value: 7, label: '低脂'},
		{ type:'Diet', value: 8, label: '糖尿病饮食'},
		{ type:'Diet', value: 9, label: '低盐低脂'},
	],
	HeathEducationOptions: [
		{ type:'HeathEducation', value: 1, label: '入院介绍'},
		{ type:'HeathEducation', value: 2, label: '饮食指导'},
		{ type:'HeathEducation', value: 3, label: '药物指导'},
		{ type:'HeathEducation', value: 4, label: '特殊检查前指导'},
		{ type:'HeathEducation', value: 5, label: '特殊检查后指导'},
		{ type:'HeathEducation', value: 6, label: '疾病指导'},
		{ type:'HeathEducation', value: 7, label: '康复指导'},
		{ type:'HeathEducation', value: 8, label: '出院指导'},
		{ type:'HeathEducation', value: 9, label: '心理护理'},
	],
	Detail: '',
}

const getters = {
	NurseRecordingThemeColor: state => state.NurseRecordingThemeColor,
	NurseRecordingPickerValueArray: state => state.NurseRecordingPickerValueArray,
	NurseRecordingMode: state => state.NurseRecordingMode,
	NurseRecordingDeepLength: state => state.NurseRecordingDeepLength,
	NurseRecordingPickerValueDefault: state => state.NurseRecordingPickerValueDefault,
	
	NurseRecordingNotifyDoctor: state => state.NurseRecordingNotifyDoctor,
	ConsciousnessTypeObj: state => state.ConsciousnessTypeObj,
	ConsciousnessTypeOptions: state => state.ConsciousnessTypeOptions,
	GradingObj: state => state.GradingObj,
	GradingOptions: state => state.GradingOptions,
	BodyTemperature: state => state.BodyTemperature,
	Pulse: state => state.Pulse,
	Breath: state => state.Breath,
	BloodPressure: state => state.BloodPressure,
	Saturation: state => state.Saturation,
	VASScore: state => state.VASScore,
	MENurse: state => state.MENurse,
	OxygenCure: state => state.OxygenCure,
	SkinStatusObj: state => state.SkinStatusObj,
	SkinStatusOptions: state => state.SkinStatusOptions,
	UlcerNurseOptions: state => state.UlcerNurseOptions,
	PositionObj: state => state.PositionObj,
	PositionOptions: state => state.PositionOptions,
	FallNurseObj: state => state.FallNurseObj,
	FallNurseOptions: state => state.FallNurseOptions,
	BloodSupplyOptions: state => state.BloodSupplyOptions,
	CatheterSafetyOptions: state => state.CatheterSafetyOptions,
	NurseRecordingDietObj: state => state.NurseRecordingDietObj,
	NurseRecordingDietOptions: state => state.NurseRecordingDietOptions,
	HeathEducationOptions: state => state.HeathEducationOptions,
	Detail: state => state.Detail,

}

const actions = {
	[actionConstants.NurseRecording_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.init(payload.info, payload.id, payload.type, (now, content, followName) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.SET_NurseRecording_CONTENT, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
		.catch((err) => plus.nativeUI.alert(err))
	},
	[actionConstants.NurseRecording_SUBMIT_BEFORE] ({commit}, payload) {
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
	[mutationConstants.SET_NurseRecording_CONTENT] (state, payload) {
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
	[mutationConstants.SET_NurseRecording_CHECKBOX] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		if (payload.type == 'create') {
			state.IdentityConfirmationTypeOptions.forEach((item) => item.checked = false)
		} else {
			kftools.checkBoxValueInit(assessmentInfo.IdentityConfirmationType).forEach((item, index) => state.IdentityConfirmationTypeOptions[index].checked = item)
		}
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch(payload.type) {
			case 'ConsciousnessType':
				state.ConsciousnessTypeObj = {
					ConsciousnessType: payload.value[0],
					label: payload.label
				}
				break;
			case 'Grading':
				state.GradingObj = {
					GradingObj: payload.value[0],
					label: payload.label
				}
				break;
			case 'SkinStatus':
				state.SkinStatusObj = {
					SkinStatus: payload.value[0],
					label: payload.label
				}
				break;
			case 'Position':
				state.PositionObj = {
					Position: payload.value[0],
					label: payload.label
				}
				break;
			case 'FallNurse':
				state.FallNurseObj = {
					FallNurse: payload.value[0],
					label: payload.label
				}
				break;
			case 'Diet':
				state.NurseRecordingDietObj = {
					Diet: payload.value[0],
					label: payload.label
				}
				break;
		}
	},
	[mutationConstants.NURSE_RECORDING_NOTIFY_DOCTOR_SWITCH_CHANGE] (state, payload) {
		state.NurseRecordingNotifyDoctor = payload.target.value ? 1 : 0
	},
	[mutationConstants.NURSE_RECORDING_CONSCIOUSNESS_TYPE_PICKER_OPEN] (state, payload) {
		state.NurseRecordingPickerValueArray = state.ConsciousnessTypeOptions
		state.NurseRecordingMode = 'selector'
		state.NurseRecordingDeepLength = 1
		state.NurseRecordingPickerValueDefault = [0]
	},
	[mutationConstants.NURSE_RECORDING_GRADING_PICKER_OPEN] (state, payload) {
		state.NurseRecordingPickerValueArray = state.GradingOptions
		state.NurseRecordingMode = 'selector'
		state.NurseRecordingDeepLength = 1
		state.NurseRecordingPickerValueDefault = [0]
	},
	[mutationConstants.NURSE_RECORDING_MENURSE_SWITCH_CHANGE] (state, payload) {
		state.MENurse = payload.target.value ? 1 : 0
	},
	[mutationConstants.NURSE_RECORDING_SKIN_STATUS_PICKER_OPEN] (state, payload) {
		state.NurseRecordingPickerValueArray = state.SkinStatusOptions
		state.NurseRecordingMode = 'selector'
		state.NurseRecordingDeepLength = 1
		state.NurseRecordingPickerValueDefault = [0]
	},
	[mutationConstants.NURSE_RECORDING_ULCER_NURSE_CHECKBOX_CHANGE] (state, payload) {
		let items = state.UlcerNurseOptions,
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
	[mutationConstants.NURSE_RECORDING_POSITION_PICKER_OPEN] (state, payload) {
		state.NurseRecordingPickerValueArray = state.PositionOptions
		state.NurseRecordingMode = 'selector'
		state.NurseRecordingDeepLength = 1
		state.NurseRecordingPickerValueDefault = [0]
	},
	[mutationConstants.NURSE_RECORDING_FALL_NURSE_PICKER_OPEN] (state, payload) {
		state.NurseRecordingPickerValueArray = state.FallNurseOptions
		state.NurseRecordingMode = 'selector'
		state.NurseRecordingDeepLength = 1
		state.NurseRecordingPickerValueDefault = [0]
	},
	[mutationConstants.NURSE_RECORDING_BLOOD_SUPPLY_CHECKBOX_CHANGE] (state, payload) {
		let items = state.BloodSupplyOptions,
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
	[mutationConstants.NURSE_RECORDING_CATHETER_SAFETY_CHECKBOX_CHANGE] (state, payload) {
		let items = state.CatheterSafetyOptions,
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
	[mutationConstants.NURSE_RECORDING_DIET_PICKER_OPEN] (state, payload) {
		state.NurseRecordingPickerValueArray = state.NurseRecordingDietOptions
		state.NurseRecordingMode = 'selector'
		state.NurseRecordingDeepLength = 1
		state.NurseRecordingPickerValueDefault = [0]
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}