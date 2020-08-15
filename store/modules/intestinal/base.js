import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import base from '../../../pages/assessment/intestinal/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	IntestinalNow: '',
	IntestinalThemeColor: '#32CD32',
	IntestinalPickerValueArray: [],
	IntestinalMode: '',
	IntestinalDeepLength: 1,
	IntestinalPickerValueDefault: [],
	
	FoodIntakeObj: {},
	FoodIntakeNotes: '',
	FoodIntakeOptions: [
		{ type: 'FoodIntake', value: 1, label: '正常' },
		{ type: 'FoodIntake', value: 2, label: '中等' },
		{ type: 'FoodIntake', value: 3, label: '少量' },
		{ type: 'FoodIntake', value: 4, label: '其他' },
	],
	FoodKindsObj: {},
	FoodKindsNotes: '',
	FoodKindsOptions: [
		{ type: 'FoodKinds', value: 1, label: '五谷类' },
		{ type: 'FoodKinds', value: 2, label: '肉类/蛋类和豆类' },
		{ type: 'FoodKinds', value: 3, label: '蔬果类' },
		{ type: 'FoodKinds', value: 4, label: '其他' },
	],
	IntestinalWaterIntakeObj: {},
	IntestinalWaterIntakeNotes: '',
	IntestinalWaterIntakeOptions: [
		{ type: 'WaterIntake', value: 1, label: '500ml以下' },
		{ type: 'WaterIntake', value: 2, label: '500-1000ml' },
		{ type: 'WaterIntake', value: 3, label: '1500-2000ml' },
		{ type: 'WaterIntake', value: 4, label: '2000ml以上' },
		{ type: 'WaterIntake', value: 5, label: '不定量' },
		{ type: 'WaterIntake', value: 6, label: '其他' },
	],
	IntestinalDrinkingTimeObj: {},
	IntestinalDrinkingTimeNotes: '',
	IntestinalDrinkingTimeOptions: [
		{ type: 'DrinkingTime', value: 1, label: '餐前' },
		{ type: 'DrinkingTime', value: 2, label: '餐后' },
		{ type: 'DrinkingTime', value: 3, label: '三餐之间' },
		{ type: 'DrinkingTime', value: 4, label: '不定时' },
		{ type: 'DrinkingTime', value: 5, label: '其他' },
	],
	FoodTypeObj: {},
	FoodTypeNotes: '',
	FoodTypeOptions: [
		{ type: 'FoodType', value: 1, label: '流质' },
		{ type: 'FoodType', value: 2, label: '半流质' },
		{ type: 'FoodType', value: 3, label: '普食' },
		{ type: 'FoodType', value: 4, label: '糖尿病饮食' },
		{ type: 'FoodType', value: 5, label: '其他' },
	],
	PastDefecationObj: {},
	PastDefecationNotes: '',
	PastDefecationOptions: [
		{ type: 'PastDefecation', value: 1, label: '正常' },
		{ type: 'PastDefecation', value: 2, label: '腹泻' },
		{ type: 'PastDefecation', value: 3, label: '便秘' },
		{ type: 'PastDefecation', value: 4, label: '失禁' },
		{ type: 'PastDefecation', value: 5, label: '其他' },
	],
	PastModeObj: {},
	PastModeNotes: '',
	PastModeOptions: [
		{ type: 'PastMode', value: 1, label: '正常' },
		{ type: 'PastMode', value: 2, label: '开塞露辅助' },
		{ type: 'PastMode', value: 3, label: '直肠刺激' },
		{ type: 'PastMode', value: 4, label: '口服泻药' },
		{ type: 'PastMode', value: 5, label: '灌肠' },
		{ type: 'PastMode', value: 6, label: '其他' },
	],
	PastTimes: '',
	PastDay: '',
	PastTimeObj: {},
	PastTimeOptions: [
		{ type: 'PastTime', value: 1, label: '早上' },
		{ type: 'PastTime', value: 2, label: '上午' },
		{ type: 'PastTime', value: 3, label: '中午' },
		{ type: 'PastTime', value: 4, label: '下午' },
		{ type: 'PastTime', value: 5, label: '晚上' },
		{ type: 'PastTime', value: 6, label: '无规律' },
	],
	NowModeObj: {},
	NowModeNotes1: '',
	NowModeNotes2: '',
	NowModeOptions: [
		{ type: 'NowMode', value: 1, label: '自解' },
		{ type: 'NowMode', value: 2, label: '反射性排便' },
		{ type: 'NowMode', value: 3, label: '腹部按摩' },
		{ type: 'NowMode', value: 4, label: '药物辅助' },
		{ type: 'NowMode', value: 5, label: '其他' },
	],
	NowFrequencyObj: {},
	NowFrequencyNotes: '',
	NowFrequencyOptions: [
		{ type: 'NowFrequency', value: 1, label: '每天一次' },
		{ type: 'NowFrequency', value: 2, label: '隔天一次' },
		{ type: 'NowFrequency', value: 3, label: '三天一次' },
		{ type: 'NowFrequency', value: 4, label: '不定时' },
		{ type: 'NowFrequency', value: 5, label: '其他' },
	],
	NowTimeObj: {},
	NowTimeOptions: [
		{ type: 'NowTime', value: 1, label: '上午' },
		{ type: 'NowTime', value: 2, label: '中午' },
		{ type: 'NowTime', value: 3, label: '下午' },
		{ type: 'NowTime', value: 4, label: '晚上' },
		{ type: 'NowTime', value: 5, label: '无规律' },
	],
	NowDefecationObj: {},
	NowDefecationOptions: [
		{ type: 'NowDefecation', value: 1, label: '成形软便' },
		{ type: 'NowDefecation', value: 2, label: '干结' },
		{ type: 'NowDefecation', value: 3, label: '稀薄' },
		{ type: 'NowDefecation', value: 4, label: '便秘' },
		{ type: 'NowDefecation', value: 5, label: '失禁' },
		{ type: 'NowDefecation', value: 6, label: '其他' },
	],
}

const getters = {
	IntestinalNow: state => state.IntestinalNow,
	IntestinalThemeColor: state => state.IntestinalThemeColor,
	IntestinalPickerValueArray: state => state.IntestinalPickerValueArray,
	IntestinalMode: state => state.IntestinalMode,
	IntestinalDeepLength: state => state.IntestinalDeepLength,
	IntestinalPickerValueDefault: state => state.IntestinalPickerValueDefault,
	
	FoodIntakeObj: state => state.FoodIntakeObj,
	FoodIntakeNotes: state => state.FoodIntakeNotes,
	FoodKindsObj: state => state.FoodKindsObj,
	FoodKindsNotes: state => state.FoodKindsNotes,
	IntestinalWaterIntakeObj: state => state.IntestinalWaterIntakeObj,
	IntestinalWaterIntakeNotes: state => state.IntestinalWaterIntakeNotes,
	IntestinalDrinkingTimeObj: state => state.IntestinalDrinkingTimeObj,
	IntestinalDrinkingTimeNotes: state => state.IntestinalDrinkingTimeNotes,
	FoodTypeObj: state => state.FoodTypeObj,
	FoodTypeNotes: state => state.FoodTypeNotes,
	PastDefecationObj: state => state.PastDefecationObj,
	PastDefecationNotes: state => state.PastDefecationNotes,
	PastModeObj: state => state.PastModeObj,
	PastModeNotes: state => state.PastModeNotes,
	PastTimes: state => state.PastTimes,
	PastDay: state => state.PastDay,
	PastTimeObj: state => state.PastTimeObj,
	NowModeObj: state => state.NowModeObj,
	NowModeNotes1: state => state.NowModeNotes1,
	NowModeNotes2: state => state.NowModeNotes2,
	NowFrequencyObj: state => state.NowFrequencyObj,
	NowFrequencyNotes: state => state.NowFrequencyNotes,
	NowTimeObj: state => state.NowTimeObj,
	NowDefecationObj: state => state.NowDefecationObj,
}

const actions = {
	[actionConstants.INTESTINAL_INIT] ({ commit }, payload) {
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_INTESTINAL_CONTENT, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
	},
	[actionConstants.INTESTINAL_SUBMIT_BEFORE] ({ commit }, payload) {
		let params = {
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			FoodIntake: isNaN(parseInt(state.FoodIntakeObj.FoodIntake)) ? 0 : parseInt(state.FoodIntakeObj.FoodIntake),
			FoodIntakeNotes: payload.formData.FoodIntakeNotes,
			FoodKinds: isNaN(parseInt(state.FoodKindsObj.FoodKinds)) ? 0 : parseInt(state.FoodKindsObj.FoodKinds),
			FoodKindsNotes: payload.formData.FoodKindsNotes,
			WaterIntake: isNaN(parseInt(state.IntestinalWaterIntakeObj.WaterIntake)) ? 0 : parseInt(state.IntestinalWaterIntakeObj.WaterIntake),
			WaterIntakeNotes: payload.formData.WaterIntakeNotes,
			DrinkingTime: isNaN(parseInt(state.IntestinalDrinkingTimeObj.DrinkingTime)) ? 0: parseInt(state.IntestinalDrinkingTimeObj.DrinkingTime),
			DrinkingTimeNotes: payload.formData.DrinkingTimeNotes,
			FoodType: isNaN(parseInt(state.FoodTypeObj.FoodType)) ? 0 : parseInt(state.FoodTypeObj.FoodType),
			FoodTypeNotes: payload.formData.FoodTypeNotes,
			PastDefecation: isNaN(parseInt(state.PastDefecationObj.PastDefecation)) ? 0 : parseInt(state.PastDefecationObj.PastDefecation),
			PastDefecationNotes: payload.formData.PastDefecationNotes,
			PastMode: isNaN(parseInt(state.PastModeObj.PastMode)) ? 0 : parseInt(state.PastModeObj.PastMode),
			PastModeNotes: payload.formData.PastModeNotes,
			PastTimes: payload.formData.PastTimes,
			PastDay: payload.formData.PastDay,
			PastTime: isNaN(parseInt(state.PastTimeObj.PastTime)) ? 0 : parseInt(state.PastTimeObj.PastTime),
			NowMode: isNaN(parseInt(state.NowModeObj.NowMode)) ? 0 : parseInt(state.NowModeObj.NowMode),
			NowModeNotes1: payload.formData.NowModeNotes1,
			NowModeNotes2: payload.formData.NowModeNotes2,
			NowFrequency: isNaN(parseInt(state.NowFrequencyObj.NowFrequency)) ? 0 : parseInt(state.NowFrequencyObj.NowFrequency),
			NowFrequencyNotes: payload.formData.NowFrequencyNotes,
			NowTime: isNaN(parseInt(state.NowTimeObj.NowTime)) ? 0 : parseInt(state.NowTimeObj.NowTime),
			NowDefecation: isNaN(parseInt(state.NowDefecationObj.NowDefecation)) ? 0 : parseInt(state.NowDefecationObj.NowDefecation),
			CollectionDate: state.IntestinalNow,
			
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
		state.IntestinalNow = payload
	},
	[mutationConstants.SET_INTESTINAL_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.IntestinalNow = payload.type == 'create' ? state.IntestinalNow : assessmentInfo.CollectionDate.replace('T', ' ')
		state.FoodIntakeObj = payload.type == 'create' ? {} : {
			FoodIntake: assessmentInfo.FoodIntake,
			label: assessmentInfo.FoodIntake == 0 ? '' : state.FoodIntakeOptions[assessmentInfo.FoodIntake - 1].label,
		}
		state.FoodIntakeNotes = payload.type == 'create' ? '' : assessmentInfo.FoodIntakeNotes
		state.FoodKindsObj = payload.type == 'create' ? {} : {
			FoodKinds: assessmentInfo.FoodKinds,
			label: assessmentInfo.FoodKinds == 0 ? '' : state.FoodKindsOptions[assessmentInfo.FoodKinds - 1].label,
		}
		state.FoodKindsNotes = payload.type == 'create' ? '' : assessmentInfo.FoodKindsNotes
		state.IntestinalWaterIntakeObj = payload.type == 'create' ? {} : {
			WaterIntake: assessmentInfo.WaterIntake,
			label: assessmentInfo.WaterIntake == 0 ? '' : state.IntestinalWaterIntakeOptions[assessmentInfo.WaterIntake - 1].label,
		}
		state.IntestinalWaterIntakeNotes = payload.type == 'create' ? '' : assessmentInfo.WaterIntakeNotes
		state.IntestinalDrinkingTimeObj = payload.type == 'create' ? {} : {
			DrinkingTime: assessmentInfo.DrinkingTime,
			label: assessmentInfo.DrinkingTime == 0 ? '' : state.IntestinalDrinkingTimeOptions[assessmentInfo.DrinkingTime - 1].label,
		}
		state.IntestinalDrinkingTimeNotes = payload.type == 'create' ? '' : assessmentInfo.DrinkingTimeNotes
		state.FoodTypeObj = payload.type == 'create' ? {} : {
			FoodType: assessmentInfo.FoodType,
			label: assessmentInfo.FoodType == 0 ? '' : state.FoodTypeOptions[assessmentInfo.FoodType - 1].label,
		}
		state.FoodTypeNotes = payload.type == 'create' ? '' : assessmentInfo.FoodTypeNotes
		state.PastDefecationObj = payload.type == 'create' ? {} : {
			PastDefecation: assessmentInfo.PastDefecation,
			label: assessmentInfo.PastDefecation == 0 ? '' : state.PastDefecationOptions[assessmentInfo.PastDefecation - 1].label,
		}
		state.PastDefecationNotes = payload.type == 'create' ? '' : assessmentInfo.PastDefecationNotes
		state.PastModeObj = payload.type == 'create' ? {} : {
			PastMode: assessmentInfo.PastMode,
			label: assessmentInfo.PastMode == 0 ? '' : state.PastModeOptions[assessmentInfo.PastMode - 1].label,
		}
		state.PastModeNotes = payload.type == 'create' ? '' : assessmentInfo.PastModeNotes
		state.PastTimes = payload.type == 'create' ? '' : assessmentInfo.PastTimes
		state.PastDay = payload.type == 'create' ? '' : assessmentInfo.PastDay
		state.PastTimeObj = payload.type == 'create' ? {} : {
			PastTime: assessmentInfo.PastTime,
			label: assessmentInfo.PastTime == 0 ? '' : state.PastTimeOptions[assessmentInfo.PastTime - 1].label
		}
		state.NowModeObj = payload.type == 'create' ? {} : {
			NowMode: assessmentInfo.NowMode,
			label: assessmentInfo.NowMode == 0 ? '' : state.NowModeOptions[assessmentInfo.NowMode - 1].label
		}
		state.NowModeNotes1 = payload.type == 'create' ? '' : assessmentInfo.NowModeNotes1
		state.NowModeNotes2 = payload.type == 'create' ? '' : assessmentInfo.NowModeNotes2
		state.NowFrequencyObj = payload.type == 'create' ? {} : {
			NowFrequency: assessmentInfo.NowFrequency,
			label: assessmentInfo.NowFrequency == 0 ? '' : state.NowFrequencyOptions[assessmentInfo.NowFrequency - 1].label,
		}
		state.NowFrequencyNotes = payload.type == 'create' ? '' : assessmentInfo.NowFrequencyNotes
		state.NowTimeObj = payload.type == 'create' ? {} : {
			NowTime: assessmentInfo.NowTime,
			label: assessmentInfo.NowTime == 0 ? '' : state.NowTimeOptions[assessmentInfo.NowTime - 1].label,
		}
		state.NowDefecationObj = payload.type == 'create' ? {} : {
			NowDefecation: assessmentInfo.NowDefecation,
			label: assessmentInfo.NowDefecation == 0 ? '' : state.NowDefecationOptions[assessmentInfo.NowDefecation - 1].label,
		}
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch (payload.type){
			case 'FoodIntake':
				state.FoodIntakeObj = {
					FoodIntake: payload.value[0],
					label: payload.label,
				}
				break
			case 'FoodKinds':
				state.FoodKindsObj = {
					FoodKinds: payload.value[0],
					label: payload.label,
				}
				break
			case 'WaterIntake':
				state.IntestinalWaterIntakeObj = {
					WaterIntake: payload.value[0],
					label: payload.label,
				}
				break
			case 'DrinkingTime':
				state.IntestinalDrinkingTimeObj = {
					DrinkingTime: payload.value[0],
					label: payload.label,
				}
				break
			case 'FoodType':
				state.FoodTypeObj = {
					FoodType: payload.value[0],
					label: payload.label,
				}
				break
			case 'PastDefecation':
				state.PastDefecationObj = {
					PastDefecation: payload.value[0],
					label: payload.label,
				}
				break
			case 'PastMode':
				state.PastModeObj = {
					PastMode: payload.value[0],
					label: payload.label,
				}
				break
			case 'PastTime':
				state.PastTimeObj = {
					PastTime: payload.value[0],
					label: payload.label
				}
				break
			case 'NowMode':
				state.NowModeObj = {
					NowMode: payload.value[0],
					label: payload.label,
				}
				break
			case 'NowFrequency':
				state.NowFrequencyObj = {
					NowFrequency: payload.value[0],
					label: payload.label,
				}
				break
			case 'NowTime':
				state.NowTimeObj = {
					NowTime: payload.value[0],
					label: payload.label,
				}
				break
			case 'NowDefecation':
				state.NowDefecationObj = {
					NowDefecation: payload.value[0],
					label: payload.label,
				}
				break
		}
	},
	[mutationConstants.FOOD_INTAKE_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.FoodIntakeOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.FOOD_KINDS_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.FoodKindsOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.WATER_INTAKE_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.IntestinalWaterIntakeOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.DRINKING_TIME_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.IntestinalDrinkingTimeOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.FOOD_TYPE_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.FoodTypeOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.PAST_DEFECATION_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.PastDefecationOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.PAST_MODE_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.PastModeOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.PAST_TIME_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.PastTimeOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.NOW_MODE_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.NowModeOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.NOW_FREQUENCY_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.NowFrequencyOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.NOW_TIME_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.NowTimeOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
	[mutationConstants.NOW_DEFECATION_PICKER_OPEN] (state, payload) {
		state.IntestinalPickerValueArray = state.NowDefecationOptions
		state.IntestinalMode = 'selector'
		state.IntestinalDeepLength = 1
		state.IntestinalPickerValueDefault = [0]
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}