import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import base from '../../../pages/assessment/bladder/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'

const state = {
	BladderNow: '',
	BladderThemeColor: '#32CD32',
	BladderPickerValueArray: [],
	BladderMode: '',
	BladderDeepLength: 1,
	BladderPickerValueDefault: [],
	
	WaterIntakeObj: {},
	WaterIntakeNotes: '',
	WaterIntakeOptions: [
		{ type: 'WaterIntake', value: 1, label: '500ml以下' },
		{ type: 'WaterIntake', value: 2, label: '500-1000ml' },
		{ type: 'WaterIntake', value: 3, label: '1500-2000ml' },
		{ type: 'WaterIntake', value: 4, label: '2000ml以上' },
		{ type: 'WaterIntake', value: 5, label: '不定量' },
		{ type: 'WaterIntake', value: 6, label: '其他' },
	],
	DrinkingTimeObj: {},
	DrinkingTimeNotes: '',
	DrinkingTimeOptions: [
		{ type: 'DrinkingTime', value: 1, label: '餐前' },
		{ type: 'DrinkingTime', value: 2, label: '餐后' },
		{ type: 'DrinkingTime', value: 3, label: '三餐之间' },
		{ type: 'DrinkingTime', value: 4, label: '不定时' },
		{ type: 'DrinkingTime', value: 5, label: '其他' },
	],
	LastTimeOfDrinking: '',
	BladderUrinationOptions: [
		{ value: 1, label: '不确定', checked: false }
	],
	UrinationTimes: '',
	UrinationML: '',
	UrinationWaysObj: {},
	UrinationWaysNotes: '',
	UrinationWaysOptions: [
		{ type: 'UrinationWays', value: 1, label: '自解' },
		{ type: 'UrinationWays', value: 2, label: '腹压排尿' },
		{ type: 'UrinationWays', value: 3, label: '反射性排尿' },
		{ type: 'UrinationWays', value: 4, label: '留置导尿' },
		{ type: 'UrinationWays', value: 5, label: '间歇导尿' },
		{ type: 'UrinationWays', value: 6, label: '其他' },
	],
	IncontinenceObj: {},
	IncontinenceML: '',
	IncontinenceMLOptions: [
		{ value: 1, label: '不确定', checked: false }
	],
	IncontinenceOptions: [
		{ type: 'Incontinence', value: 1, label: '每天都有' },
		{ type: 'Incontinence', value: 2, label: '偶尔' },
		{ type: 'Incontinence', value: 3, label: '无' },
	],
	BladderInfectionObj: {},
	BladderInfection1: '',
	BladderInfection2: '',
	BladderInfection3: '',
	BladderInfection4: '',
	BladderInfectionOptions: [
		{ type: 'BladderInfection', value: 1, label: '无' },
		{ type: 'BladderInfection', value: 2, label: '有' },
	],
	TreatmentObj: {},
	TreatmentOptions: [
		{ type: 'Treatment', value: 1, label: '用药' },
		{ type: 'Treatment', value: 2, label: '膀胱冲洗' },
		{ type: 'Treatment', value: 3, label: '大量饮水' },
		{ type: 'Treatment', value: 4, label: '未处理' },
	],
	NervousDrugsObj: {},
	NervousDrugsOptions: [
		{ type: 'NervousDrugs', value: 1, label: '无' },
		{ type: 'NervousDrugs', value: 2, label: '有' },
	],
	DiureticsObj: {},
	DiureticsOptions: [
		{ type: 'Diuretics', value: 1, label: '无' },
		{ type: 'Diuretics', value: 2, label: '有' },
	],
	ResidualUrine: '',
	BladderCapacity: '',
}

const getters = {
	BladderNow: state => state.BladderNow,
	BladderThemeColor: state => state.BladderThemeColor,
	BladderPickerValueArray: state => state.BladderPickerValueArray,
	BladderMode: state => state.BladderMode,
	BladderDeepLength: state => state.BladderDeepLength,
	BladderPickerValueDefault: state => state.BladderPickerValueDefault,
	
	WaterIntakeObj: state => state.WaterIntakeObj,
	WaterIntakeNotes: state => state.WaterIntakeNotes,
	DrinkingTimeObj: state => state.DrinkingTimeObj,
	DrinkingTimeNotes: state => state.DrinkingTimeNotes,
	LastTimeOfDrinking: state => state.LastTimeOfDrinking,
	BladderUrinationOptions: state => state.BladderUrinationOptions,
	UrinationTimes: state => state.UrinationTimes,
	UrinationML: state => state.UrinationML,
	UrinationWaysObj: state => state.UrinationWaysObj,
	UrinationWaysNotes: state => state.UrinationWaysNotes,
	IncontinenceObj: state => state.IncontinenceObj,
	IncontinenceML: state => state.IncontinenceML,
	BladderInfectionObj: state => state.BladderInfectionObj,
	BladderInfection1: state => state.BladderInfection1,
	BladderInfection2: state => state.BladderInfection2,
	BladderInfection3: state => state.BladderInfection3,
	BladderInfection4: state => state.BladderInfection4,
	TreatmentObj: state => state.TreatmentObj,
	NervousDrugsObj: state => state.NervousDrugsObj,
	DiureticsObj: state => state.DiureticsObj,
	ResidualUrine: state => state.ResidualUrine,
	BladderCapacity: state => state.BladderCapacity,
	IncontinenceMLOptions: state => state.IncontinenceMLOptions,
}

const actions = {
	[actionConstants.BLADDER_INIT] ({ commit }, payload) {
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_BLADDER_CONTENT, {info: content, type: payload.type}),
			commit(mutationConstants.SET_BLADDER_CHECKBOX, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},500)
		})
	},
	[actionConstants.BLADDER_SUBMIT_BEFORE] ({ commit }, payload) {
		let params = {
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			WaterIntake: isNaN(parseInt(state.WaterIntakeObj.WaterIntake)) ? 0 : parseInt(state.WaterIntakeObj.WaterIntake),
			WaterIntakeNotes: payload.formData.WaterIntakeNotes,
			DrinkingTime: isNaN(parseInt(state.DrinkingTimeObj.DrinkingTime)) ? 0: parseInt(state.DrinkingTimeObj.DrinkingTime),
			DrinkingTimeNotes: payload.formData.DrinkingTimeNotes,
			LastTimeOfDrinking: payload.formData.LastTimeOfDrinking,
			UrinationTimes: payload.formData.UrinationTimes,
			UrinationML: payload.formData.UrinationML,
			UrinationOption: state.BladderUrinationOptions[0].checked ? 1 : 0,
			UrinationWays: isNaN(parseInt(state.UrinationWaysObj.UrinationWays)) ? 0 : parseInt(state.UrinationWaysObj.UrinationWays),
			UrinationWaysNotes: payload.formData.UrinationWaysNotes,
			Incontinence: isNaN(parseInt(state.IncontinenceObj.Incontinence)) ? 0 : parseInt(state.IncontinenceObj.Incontinence),
			IncontinenceML: payload.formData.IncontinenceML,
			IncontinenceOption: state.IncontinenceMLOptions[0].checked ? 1 : 0,
			BladderInfection: isNaN(parseInt(state.BladderInfectionObj.BladderInfection)) ? 0 : parseInt(state.BladderInfectionObj.BladderInfection),
			BladderInfection1: payload.formData.BladderInfection1,
			BladderInfection2: payload.formData.BladderInfection2,
			BladderInfection3: payload.formData.BladderInfection3,
			BladderInfection4: payload.formData.BladderInfection4,
			Treatment: isNaN(parseInt(state.TreatmentObj.Treatment)) ? 0 : parseInt(state.TreatmentObj.Treatment),
			NervousDrugs: isNaN(parseInt(state.NervousDrugsObj.NervousDrugs)) ? 0 : parseInt(state.NervousDrugsObj.NervousDrugs),
			NervousDrugsNotes: payload.formData.NervousDrugsNotes,
			Diuretics1: isNaN(parseInt(state.DiureticsObj.Diuretics)) ? 0 : parseInt(state.DiureticsObj.Diuretics),
			DiureticsNotes: payload.formData.DiureticsNotes,
			ResidualUrine: payload.formData.ResidualUrine,
			BladderCapacity: payload.formData.BladderCapacity,
			CollectionDate: state.BladderNow,
			
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
		state.BladderNow = payload
	},
	[mutationConstants.SET_BLADDER_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.BladderNow = payload.type == 'create' ? state.BladderNow : assessmentInfo.CollectionDate.replace('T', ' ')
		state.WaterIntakeObj = payload.type == 'create' ? {} : {
			WaterIntake: assessmentInfo.WaterIntake,
			label: assessmentInfo.WaterIntake == 0 ? '' : state.WaterIntakeOptions[assessmentInfo.WaterIntake - 1].label,
		}
		state.WaterIntakeNotes = payload.type == 'create' ? '' : assessmentInfo.WaterIntakeNotes
		state.DrinkingTimeObj = payload.type == 'create' ? {} : {
			DrinkingTime: assessmentInfo.DrinkingTime,
			label: assessmentInfo.DrinkingTime == 0 ? '' : state.DrinkingTimeOptions[assessmentInfo.DrinkingTime - 1].label,
		}
		state.DrinkingTimeNotes = payload.type == 'create' ? '' : assessmentInfo.DrinkingTimeNotes
		state.LastTimeOfDrinking = payload.type == 'create' ? '' : assessmentInfo.LastTimeOfDrinking
		state.UrinationTimes = payload.type == 'create' ? '' : assessmentInfo.UrinationTimes
		state.UrinationML = payload.type == 'create' ? '' : assessmentInfo.UrinationML
		state.UrinationWaysObj = payload.type == 'create' ? {} : {
			UrinationWays: assessmentInfo.UrinationWays,
			label: assessmentInfo.UrinationWays == 0 ? '' : state.UrinationWaysOptions[assessmentInfo.UrinationWays - 1].label,
		}
		state.UrinationWaysNotes = payload.type == 'create' ? '' : assessmentInfo.UrinationWaysNotes
		state.IncontinenceObj = payload.type == 'create' ? {} : {
			Incontinence: assessmentInfo.Incontinence,
			label: assessmentInfo.Incontinence == 0 ? '' : state.IncontinenceOptions[assessmentInfo.Incontinence - 1].label,
		}
		state.IncontinenceML = payload.type == 'create' ? '' : assessmentInfo.IncontinenceML

		state.BladderInfectionObj = payload.type == 'create' ? {} : {
			BladderInfection: assessmentInfo.BladderInfection,
			label: assessmentInfo.BladderInfection == 0 ? '' : state.BladderInfectionOptions[assessmentInfo.BladderInfection - 1].label,
		}
		state.BladderInfection1 = payload.type == 'create' ? '' : assessmentInfo.BladderInfection1
		state.BladderInfection2 = payload.type == 'create' ? '' : assessmentInfo.BladderInfection2
		state.BladderInfection3 = payload.type == 'create' ? '' : assessmentInfo.BladderInfection3
		state.BladderInfection4 = payload.type == 'create' ? '' : assessmentInfo.BladderInfection4
		state.TreatmentObj = payload.type == 'create' ? {} : {
			Treatment: assessmentInfo.Treatment,
			label: assessmentInfo.Treatment == 0 ? '' : state.TreatmentOptions[assessmentInfo.Treatment - 1].label
		}
		state.NervousDrugsObj = payload.type == 'create' ? {} : {
			NervousDrugs: assessmentInfo.NervousDrugs,
			label: assessmentInfo.NervousDrugs == 0 ? '' : state.NervousDrugsOptions[assessmentInfo.NervousDrugs - 1].label,
			NervousDrugsNotes: assessmentInfo.NervousDrugsNotes
		}
		state.DiureticsObj = payload.type == 'create' ? {} : {
			Diuretics: assessmentInfo.Diuretics1,
			label: assessmentInfo.Diuretics1 == 0 ? '' : state.DiureticsOptions[assessmentInfo.Diuretics1 - 1].label,
			DiureticsNotes: assessmentInfo.DiureticsNotes
		}
		state.ResidualUrine = payload.type == 'create' ? '' : assessmentInfo.ResidualUrine
		state.BladderCapacity = payload.type == 'create' ? '' : assessmentInfo.BladderCapacity
	},
	[mutationConstants.SET_BLADDER_CHECKBOX] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.BladderUrinationOptions[0].checked = payload.type == 'create' ? false : parseInt(assessmentInfo.UrinationOption)
		state.IncontinenceMLOptions[0].checked = payload.type == 'create' ? false : parseInt(assessmentInfo.IncontinenceOption)
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch (payload.type){
			case 'WaterIntake':
				state.WaterIntakeObj = {
					WaterIntake: payload.value[0],
					label: payload.label,
					WaterIntakeNotes: ''
				}
				break
			case 'DrinkingTime':
				state.DrinkingTimeObj = {
					DrinkingTime: payload.value[0],
					label: payload.label,
					DrinkingTimeNotes: ''
				}
				break
			case 'UrinationWays':
				state.UrinationWaysObj = {
					UrinationWays: payload.value[0],
					label: payload.label,
					UrinationWaysNotes: ''
				}
				break
			case 'Incontinence':
				state.IncontinenceObj = {
					Incontinence: payload.value[0],
					label: payload.label,
					IncontinenceML: ''
				}
				break
			case 'BladderInfection':
				state.BladderInfectionObj = {
					BladderInfection: payload.value[0],
					label: payload.label,
				}
				break
			case 'Treatment':
				state.TreatmentObj = {
					Treatment: payload.value[0],
					label: payload.label
				}
				break
			case 'NervousDrugs':
				state.NervousDrugsObj = {
					NervousDrugs: payload.value[0],
					label: payload.label,
					NervousDrugsNotes: ''
				}
				break
			case 'Diuretics':
				state.DiureticsObj = {
					Diuretics: payload.value[0],
					label: payload.label,
					DiureticsNotes: ''
				}
				break
		}
	},
	[mutationConstants.LAST_TIME_OF_DRINKING_PICKER_OPEN] (state, payload) {
		// state.BladderPickerValueArray = state.WaterIntakeOptions
		state.BladderMode = 'timeSelector'
		state.BladderDeepLength = 1
		state.BladderPickerValueDefault = [0]
	},
	[mutationConstants.WATER_INTAKE_PICKER_OPEN] (state, payload) {
		state.BladderPickerValueArray = state.WaterIntakeOptions
		state.BladderMode = 'selector'
		state.BladderDeepLength = 1
		state.BladderPickerValueDefault = [0]
	},
	[mutationConstants.DRINKING_TIME_PICKER_OPEN] (state, payload) {
		state.BladderPickerValueArray = state.DrinkingTimeOptions
		state.BladderMode = 'selector'
		state.BladderDeepLength = 1
		state.BladderPickerValueDefault = [0]
	},
	[mutationConstants.URINATION_WAYS_PICKER_OPEN] (state, payload) {
		state.BladderPickerValueArray = state.UrinationWaysOptions
		state.BladderMode = 'selector'
		state.BladderDeepLength = 1
		state.BladderPickerValueDefault = [0]
	},
	[mutationConstants.INCONTINENCE_PICKER_OPEN] (state, payload) {
		state.BladderPickerValueArray = state.IncontinenceOptions
		state.BladderMode = 'selector'
		state.BladderDeepLength = 1
		state.BladderPickerValueDefault = [0]
	},
	[mutationConstants.TREATMENT_PICKER_OPEN] (state, payload) {
		state.BladderPickerValueArray = state.TreatmentOptions
		state.BladderMode = 'selector'
		state.BladderDeepLength = 1
		state.BladderPickerValueDefault = [0]
	},
	[mutationConstants.URINATION_OPTION_SWITCH_CHANGE] (state, payload) {
		state.BladderUrinationOptions[0].checked = payload.target.value
	},
	[mutationConstants.INCONTINENCE_OPTION_SWITCH_CHANGE] (state, payload) {
		state.IncontinenceMLOptions[0].checked = payload.target.value
	},
	[mutationConstants.BLADDER_INFECTION_SWITCH_CHANGE] (state, payload) {
		state.BladderInfectionObj = {
			BladderInfection: payload.target.value ? 2 : 1
		}
	},
	[mutationConstants.NERVOUS_DRUGS_SWITCH_CHANGE] (state, payload) {
		state.NervousDrugsObj = {
			NervousDrugs: payload.target.value ? 2 : 1,
			NervousDrugsNotes: ''
		}
	},
	[mutationConstants.DIURETICS_SWITCH_CHANGE] (state, payload) {
		state.DiureticsObj = {
			Diuretics: payload.target.value ? 2 : 1,
			DiureticsNotes: ''
		}
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}