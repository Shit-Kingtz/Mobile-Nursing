import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/assessment/risk/api/base.js'

const state = {
	RiskNow: '',
	RiskThemeColor: '#32CD32',
	RiskPickerValueArray: [],
	RiskMode: '',
	RiskDeepLength: 1,
	RiskPickerValueDefault: [],
	
	RiskHeadNurseNameObj: {},
	RiskHeadNurseNameOptions: [
		{ type: 'HeadNurseName', value: '刘霞', label: '刘霞' },
		{ type: 'HeadNurseName', value: '吴海燕', label: '吴海燕' },
		{ type: 'HeadNurseName', value: '邹庆霞', label: '邹庆霞' },
	],
	
	// 病情风险
	ConditionConsciousnessObj: {},
	ConditionConsciousnessOptions: [
		{ type: 'Consciousness', value: 1, label: '清醒' },
		{ type: 'Consciousness', value: 2, label: '嗜睡' },
		{ type: 'Consciousness', value: 3, label: '模糊' },
		{ type: 'Consciousness', value: 4, label: '昏睡' },
		{ type: 'Consciousness', value: 5, label: '浅昏迷' },
		{ type: 'Consciousness', value: 6, label: '深昏迷' },
		{ type: 'Consciousness', value: 7, label: '遗忘' },
	],
	ConditionTemperatureObj: {},
	ConditionTemperatureOptions: [
		{ type: 'Temperature', value: 1, label: '正常' },
		{ type: 'Temperature', value: 2, label: '> 37.5℃' },
		{ type: 'Temperature', value: 3, label: '< 36.0℃' },
	],
	ConditionPulseObj: {},
	ConditionPulseOptions: [
		{ type: 'Pulse', value: 1, label: '正常' },
		{ type: 'Pulse', value: 2, label: '> 100次/分' },
		{ type: 'Pulse', value: 3, label: '< 60次/分' },
	],
	ConditionBreathingObj: {},
	ConditionBreathingOptions: [
		{ type: 'Breathing', value: 1, label: '正常' },
		{ type: 'Breathing', value: 2, label: '> 24次/分' },
		{ type: 'Breathing', value: 3, label: '< 12次/分' },
	],
	ConditionBloodPressureObj: {},
	ConditionBloodPressureOptions: [
		{ type: 'BloodPressure', value: 1, label: '正常' },
		{ type: 'BloodPressure', value: 2, label: '> 140/90mmHg' },
		{ type: 'BloodPressure', value: 3, label: '< 90/60mmHg' },
	],
	ConditionS02Obj: {},
	ConditionS02Options: [
		{ type: 'S02', value: 1, label: '正常' },
		{ type: 'S02', value: 2, label: '< 90%' },
	],
	ConditionCriticalValueReportObj: {},
	ConditionPrecautionsObj: {},
	ConditionPrecautionsOptions: [
		{ value: 1, label: '加强巡视、密切观察，发现异常及时汇报和处理' },
		{ value: 2, label: '根据疾病特点做好预见性护理' },
		{ value: 3, label: '准确设置参数，及时正确处理报警，保证使用中仪器功能正常' },
		{ value: 4, label: '常规抢救设备、药品呈备用状态，及时准确执行医嘱' },
		{ value: 5, label: '准备使用输液泵、微量泵、保持仪器正常运行' },
		{ value: 6, label: '运转前充分评估，备好急救仪器等，与转运科室做好联系和交接' },
	],
	
	// 安全风险
	RiskFactorCatheterSheddingObj: {},
	RiskFactorFallObj: {},
	RiskFactorPressureSoreObj: {},
	RiskFactorAspirationObj: {},
	RiskFactorAspirationOptions: [
		{ type: 'Aspiration', value: 1, label: '无' },
		{ type: 'Aspiration', value: 2, label: '有（发生）' },
		{ type: 'Aspiration', value: 3, label: '有（未发生）' },
	],
	RiskFactorUrinarySystemInfectionObj: {},
	RiskFactorUrinarySystemInfectionOptions: [
		{ type: 'UrinarySystemInfection', value: 1, label: '无' },
		{ type: 'UrinarySystemInfection', value: 2, label: '有（发生）' },
		{ type: 'UrinarySystemInfection', value: 3, label: '有（未发生）' },
	],
	RiskFactorPhlebitisObj: {},
	RiskFactorPhlebitisOptions: [
		{ type: 'Phlebitis', value: 1, label: '无' },
		{ type: 'Phlebitis', value: 2, label: '有（发生）' },
		{ type: 'Phlebitis', value: 3, label: '有（未发生）' },
	],
	RiskFactorSelfInjuryObj: {},
	RiskFactorSelfInjuryOptions: [
		{ type: 'SelfInjury', value: 1, label: '无' },
		{ type: 'SelfInjury', value: 2, label: '有（发生）' },
		{ type: 'SelfInjury', value: 3, label: '有（未发生）' },
	],
	RiskFactorScaldObj: {},
	RiskFactorScaldOptions: [
		{ type: 'Scald', value: 1, label: '无' },
		{ type: 'Scald', value: 2, label: '有（发生）' },
		{ type: 'Scald', value: 3, label: '有（未发生）' },
	],
	RiskFactorPrecautionOptions: [
		{ value: 1, label: '妥善固定导管，移动病人是注意导管位置，保持引流管道通畅' },
		{ value: 2, label: '防坠床/跌倒，拉窗栏，必要时实施保护性约束等安全防范措施' },
		{ value: 3, label: '卧位舒适，防止压疮，保持床单元平整干燥，定时翻身拍背' },
		{ value: 4, label: '昏迷、瘫痪等病人防止烫伤，保持肢体功能位置' },
		{ value: 5, label: '存在误吸危险病人，床头抬高＞30°，床边备吸引装置' },
		{ value: 6, label: '加强口腔清洁每日二次，给予口腔护理' },
		{ value: 7, label: '会阴清洁每日一次，留置导管病人导管护理每日二次' },
		{ value: 8, label: '严格遵守操作规程，确保各输液管道安全、通畅' },
		{ value: 9, label: '规范使用特殊药物如血管活性药物、抗凝药物、降血糖药物' },
		{ value: 10, label: '多与病员沟通，进行心理疏导，情绪明显异常要求家属陪护' },
	]
}

const getters = {
	RiskNow: state => state.RiskNow,
	RiskThemeColor: state => state.RiskThemeColor,
	RiskPickerValueArray: state => state.RiskPickerValueArray,
	RiskMode: state => state.RiskMode,
	RiskDeepLength: state => state.RiskDeepLength,
	RiskPickerValueDefault: state => state.RiskPickerValueDefault,
	RiskHeadNurseNameObj: state => state.RiskHeadNurseNameObj,
	
	// 病情风险
	ConditionConsciousnessObj: state => state.ConditionConsciousnessObj,
	ConditionTemperatureObj: state => state.ConditionTemperatureObj,
	ConditionPulseObj: state => state.ConditionPulseObj,
	ConditionBreathingObj: state => state.ConditionBreathingObj,
	ConditionBloodPressureObj: state => state.ConditionBloodPressureObj,
	ConditionS02Obj: state => state.ConditionS02Obj,
	ConditionCriticalValueReportObj: state => state.ConditionCriticalValueReportObj,
	ConditionPrecautionsObj: state => state.ConditionPrecautionsObj,
	ConditionPrecautionsOptions: state => state.ConditionPrecautionsOptions,
	
	// 安全风险
	RiskFactorCatheterSheddingObj: state => state.RiskFactorCatheterSheddingObj,
	RiskFactorFallObj: state => state.RiskFactorFallObj,
	RiskFactorPressureSoreObj: state => state.RiskFactorPressureSoreObj,
	RiskFactorAspirationObj: state => state.RiskFactorAspirationObj,
	RiskFactorUrinarySystemInfectionObj: state => state.RiskFactorUrinarySystemInfectionObj,
	RiskFactorPhlebitisObj: state => state.RiskFactorPhlebitisObj,
	RiskFactorSelfInjuryObj: state => state.RiskFactorSelfInjuryObj,
	RiskFactorScaldObj: state => state.RiskFactorScaldObj,
	RiskFactorPrecautionOptions: state => state.RiskFactorPrecautionOptions,
}

const actions = {
	[actionConstants.RISK_INIT] ({ commit }, payload) {
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_RISK_CONTENT, {info: content, type: payload.type})
			commit(mutationConstants.SET_RISK_CHECKBOX, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
	},
	[actionConstants.RISK_SUBMIT_BEFORE] ({ commit }, payload) {
		console.log(JSON.stringify(payload.info));
		let params = {
			ConditionS02: isNaN(parseInt(state.ConditionS02Obj.S02)) ? 0 : parseInt(state.ConditionS02Obj.S02),
			ConditionPrecautions: kftools.getCheckBoxStr(state.ConditionPrecautionsOptions),
			ConditionBreathing: isNaN(parseInt(state.ConditionBreathingObj.Breathing)) ? 0 : parseInt(state.ConditionBreathingObj.Breathing),
			ConditionPulse: isNaN(parseInt(state.ConditionPulseObj.Pulse)) ? 0 : parseInt(state.ConditionPulseObj.Pulse),
			ConditionTemperature: isNaN(parseInt(state.ConditionTemperatureObj.Temperature)) ? 0 : parseInt(state.ConditionTemperatureObj.Temperature),
			ConditionCriticalValueReport: state.ConditionCriticalValueReportObj.ConditionCriticalValueReport,
			ConditionBloodPressure: isNaN(parseInt(state.ConditionBloodPressureObj.BloodPressure)) ? 0 : parseInt(state.ConditionBloodPressureObj.BloodPressure),
			ConditionConsciousness: isNaN(parseInt(state.ConditionConsciousnessObj.Consciousness)) ? 0 : parseInt(state.ConditionConsciousnessObj.Consciousness),
			RiskFactorPrecautions: kftools.getCheckBoxStr(state.RiskFactorPrecautionOptions),
			EvaluationDate: state.RiskNow,
			Ward: payload.info.DeptID,
			PatientName: payload.info.PaientName,
			BedNumber: payload.info.BedNO,
			RiskFactorSelfInjury: isNaN(parseInt(state.RiskFactorSelfInjuryObj.RiskFactorSelfInjury)) ? 0 : parseInt(state.RiskFactorSelfInjuryObj.RiskFactorSelfInjury),
			RiskFactorCatheterShedding: isNaN(parseInt(state.RiskFactorCatheterSheddingObj.RiskFactorCatheterShedding)) ? 0 : parseInt(state.RiskFactorCatheterSheddingObj.RiskFactorCatheterShedding),
			RiskFactorPhlebitis: isNaN(parseInt(state.RiskFactorPhlebitisObj.RiskFactorPhlebitis)) ? 0 : parseInt(state.RiskFactorPhlebitisObj.RiskFactorPhlebitis),
			RiskFactorUrinarySystemInfection: isNaN(parseInt(state.RiskFactorUrinarySystemInfectionObj.RiskFactorUrinarySystemInfection)) ? 0 : parseInt(state.RiskFactorUrinarySystemInfectionObj.RiskFactorUrinarySystemInfection),
			RiskFactorScald: isNaN(parseInt(state.RiskFactorScaldObj.RiskFactorScald)) ? 0 : parseInt(state.RiskFactorScaldObj.RiskFactorScald),
			RiskFactorAspiration: isNaN(parseInt(state.RiskFactorAspirationObj.RiskFactorAspiration)) ? 0 : parseInt(state.RiskFactorAspirationObj.RiskFactorAspiration),
			RiskFactorPressureSore: isNaN(parseInt(state.RiskFactorPressureSoreObj.RiskFactorPressureSore)) ? 0 : parseInt(state.RiskFactorPressureSoreObj.RiskFactorPressureSore),
			RiskFactorFall: isNaN(parseInt(state.RiskFactorFallObj.RiskFactorFall)) ? 0 : parseInt(state.RiskFactorFallObj.RiskFactorFall),
			PatientHisID: payload.info.ZYHM,
			HospitalizedHisID: payload.info.ZYH,
			HeadNurseName: state.RiskHeadNurseNameObj.HeadNurseName,
			
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
		state.RiskNow = payload
	},
	[mutationConstants.SET_RISK_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : payload.info
		
		state.RiskNow = payload.type == 'create' ? state.RiskNow : assessmentInfo.EvaluationDate.replace('T', ' ')
		state.RiskHeadNurseNameObj = payload.type == 'create' ? {} : {
			HeadNurseName: assessmentInfo.HeadNurseName,
			label: assessmentInfo.HeadNurseName
		}
		state.ConditionConsciousnessObj = payload.type == 'create' ? {} : {
			Consciousness: assessmentInfo.ConditionConsciousness,
			label: assessmentInfo.ConditionConsciousness == 0 ? '' : state.ConditionConsciousnessOptions[assessmentInfo.ConditionConsciousness - 1].label
		}
		state.ConditionTemperatureObj = payload.type == 'create' ? {} : {
			Temperature: assessmentInfo.ConditionTemperature,
			label: assessmentInfo.ConditionTemperature == 0 ? '' : state.ConditionTemperatureOptions[assessmentInfo.ConditionTemperature - 1].label
		}
		state.ConditionPulseObj = payload.type == 'create' ? {} : {
			Pulse: assessmentInfo.ConditionPulse,
			label: assessmentInfo.ConditionPulse == 0 ? '' : state.ConditionPulseOptions[assessmentInfo.ConditionPulse - 1].label
		}
		state.ConditionBreathingObj = payload.type == 'create' ? {} : {
			Breathing: assessmentInfo.ConditionBreathing,
			label: assessmentInfo.ConditionBreathing == 0 ? '' : state.ConditionBreathingOptions[assessmentInfo.ConditionBreathing - 1].label
		}
		state.ConditionBloodPressureObj = payload.type == 'create' ? {} : {
			BloodPressure: assessmentInfo.ConditionBloodPressure,
			label: assessmentInfo.ConditionBloodPressure == 0 ? '' : state.ConditionBloodPressureOptions[assessmentInfo.ConditionBloodPressure - 1].label
		}
		state.ConditionS02Obj = payload.type == 'create' ? {} : {
			S02: assessmentInfo.ConditionS02,
			label: assessmentInfo.ConditionS02 == 0 ? '' : state.ConditionS02Options[assessmentInfo.ConditionS02 - 1].label
		}
		state.ConditionCriticalValueReportObj = payload.type == 'create' ? {} : {
			CriticalValueReport: assessmentInfo.ConditionCriticalValueReport
		}
		state.RiskFactorCatheterSheddingObj = payload.type == 'create' ? {} : {
			RiskFactorCatheterShedding: assessmentInfo.RiskFactorCatheterShedding
		}
		state.RiskFactorFallObj = payload.type == 'create' ? {} : {
			RiskFactorFall: assessmentInfo.RiskFactorFall
		}
		state.RiskFactorPressureSoreObj = payload.type == 'create' ? {} : {
			RiskFactorPressureSore: assessmentInfo.RiskFactorPressureSore
		}
		state.RiskFactorAspirationObj = payload.type == 'create' ? {} : {
			RiskFactorAspiration: assessmentInfo.RiskFactorAspiration,
			label: assessmentInfo.RiskFactorAspiration == 0 ? '' : state.RiskFactorAspirationOptions[assessmentInfo.RiskFactorAspiration - 1].label
		}
		state.RiskFactorUrinarySystemInfectionObj = payload.type == 'create' ? {} : {
			RiskFactorUrinarySystemInfection: assessmentInfo.RiskFactorUrinarySystemInfection,
			label: assessmentInfo.RiskFactorUrinarySystemInfection == 0 ? '' : state.RiskFactorUrinarySystemInfectionOptions[assessmentInfo.RiskFactorUrinarySystemInfection - 1].label
		}
		state.RiskFactorPhlebitisObj = payload.type == 'create' ? {} : {
			RiskFactorPhlebitis: assessmentInfo.RiskFactorPhlebitis,
			label: assessmentInfo.RiskFactorPhlebitis == 0 ? '' : state.RiskFactorPhlebitisOptions[assessmentInfo.RiskFactorPhlebitis - 1].label
		}
		state.RiskFactorSelfInjuryObj = payload.type == 'create' ? {} : {
			RiskFactorSelfInjury: assessmentInfo.RiskFactorSelfInjury,
			label: assessmentInfo.RiskFactorSelfInjury == 0 ? '' : state.RiskFactorSelfInjuryOptions[assessmentInfo.RiskFactorSelfInjury - 1].label
		}
		state.RiskFactorScaldObj = payload.type == 'create' ? {} : {
			RiskFactorScald: assessmentInfo.RiskFactorScald,
			label: assessmentInfo.RiskFactorScald == 0 ? '' : state.RiskFactorScaldOptions[assessmentInfo.RiskFactorScald - 1].label
		}
	},
	[mutationConstants.SET_RISK_CHECKBOX] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : payload.info
		if (payload.type == 'create') {
			state.ConditionPrecautionsOptions.forEach((item) => item.checked = false)
			state.RiskFactorPrecautionOptions.forEach((item) => item.checked = false)
		} else {
			kftools.checkBoxValueInit(assessmentInfo.ConditionPrecautions).forEach((item, index) => state.ConditionPrecautionsOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.RiskFactorPrecautions).forEach((item, index) => state.RiskFactorPrecautionOptions[index].checked = item)
		}
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch(payload.type) {
			case 'HeadNurseName':
				state.RiskHeadNurseNameObj = {
					HeadNurseName: payload.value[0],
					label: payload.label
				}
				break;
			case 'Consciousness':
				state.ConditionConsciousnessObj = {
					Consciousness: payload.value[0],
					label: payload.label
				}
				break;
			case 'Temperature':
				state.ConditionTemperatureObj = {
					Temperature: payload.value[0],
					label: payload.label
				}
				break;
			case 'Pulse':
				state.ConditionPulseObj = {
					Pulse: payload.value[0],
					label: payload.label
				}
				break;
			case 'Breathing':
				state.ConditionBreathingObj = {
					Breathing: payload.value[0],
					label: payload.label
				}
				break;
			case 'BloodPressure':
				state.ConditionBloodPressureObj = {
					BloodPressure: payload.value[0],
					label: payload.label
				}
				break;
			case 'S02':
				state.ConditionS02Obj = {
					S02: payload.value[0],
					label: payload.label
				}
				break;
			case 'Aspiration':
				state.RiskFactorAspirationObj = {
					RiskFactorAspiration: payload.value[0],
					label: payload.label
				}
				break;
			case 'UrinarySystemInfection':
				state.RiskFactorUrinarySystemInfectionObj = {
					RiskFactorUrinarySystemInfection: payload.value[0],
					label: payload.label
				}
				break;
			case 'Phlebitis':
				state.RiskFactorPhlebitisObj = {
					RiskFactorPhlebitis: payload.value[0],
					label: payload.label
				}
				break;
			case 'SelfInjury':
				state.RiskFactorSelfInjuryObj = {
					RiskFactorSelfInjury: payload.value[0],
					label: payload.label
				}
				break;
			case 'Scald':
				state.RiskFactorScaldObj = {
					RiskFactorScald: payload.value[0],
					label: payload.label
				}
				break;
		}
	},
	[mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.RiskHeadNurseNameOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_CONSCIOUSNESS_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.ConditionConsciousnessOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_TEMPERATURE_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.ConditionTemperatureOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_PLUSE_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.ConditionPulseOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_BREATHING_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.ConditionBreathingOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_BLOOD_PRESSURE_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.ConditionBloodPressureOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_S02_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.ConditionS02Options
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_FACTOR_ASPIRATION_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.RiskFactorAspirationOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_FACTOR_URINARY_SYSTEM_INFECTION_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.RiskFactorUrinarySystemInfectionOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_FACTOR_PHLEBITIS_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.RiskFactorPhlebitisOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_FACTOR_SELF_INJURY_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.RiskFactorSelfInjuryOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_FACTOR_SCALD_PICKER_OPEN] (state, payload) {
		state.RiskPickerValueArray = state.RiskFactorScaldOptions
		state.RiskMode = 'selector'
		state.RiskDeepLength = 1
		state.RiskPickerValueDefault = [0]
	},
	[mutationConstants.RISK_CRITICAL_VALUE_REPORT_SWITCH_CHANGE] (state, payload) {
		state.ConditionCriticalValueReportObj = {
			CriticalValueReport: payload.target.value ? 1 : 0
		}
	},
	[mutationConstants.RISK_FACTOR_CATHETER_SHEDDING_SWITCH_CHANGE] (state, payload) {
		state.RiskFactorCatheterSheddingObj = {
			RiskFactorCatheterShedding: payload.target.value ? 1 : 0
		}
	},
	[mutationConstants.RISK_FACTOR_FALL_SWITCH_CHANGE] (state, payload) {
		state.RiskFactorFallObj = {
			RiskFactorFall: payload.target.value ? 1 : 0
		}
	},
	[mutationConstants.RISK_FACTOR_PRESSURE_SORE_SWITCH_CHANGE] (state, payload) {
		state.RiskFactorPressureSoreObj = {
			RiskFactorPressureSore: payload.target.value ? 1 : 0
		}
	},
	[mutationConstants.RISK_PRECAUTIONS_CHECKBOX_CHANGE] (state, payload) {
		let items = state.ConditionPrecautionsOptions,
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
	[mutationConstants.RISK_FACTOR_PRECAUTION_CHECKBOX_CHANGE] (state, payload) {
		let items = state.RiskFactorPrecautionOptions,
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
}

export default {
    state,
    getters,
    actions,
    mutations
}