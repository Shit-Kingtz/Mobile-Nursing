import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import * as nursingListMutationConstants from '../nursingList/mutations.js'
import * as inPatientMutationConstants from '../inPatient/mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/nursing/fall/api/base.js'

const state = {
	FallNow: '',
	FallThemeColor: '#32CD32',
	FallPickerValueArray: [],
	FallMode: '',
	FallDeepLength: 1,
	FallPickerValueDefault: [],
	
	FallScore: {
		Assessment1: 0,
		Assessment2: 0,
		Assessment3: 0,
		Assessment4: 0,
		Assessment5: 0,
		Assessment6: 0,
	},
	FallSpeciallyMonitorObj: {},
	FallIntervention: '',
	FallInterventionOptions: [
		{ type: 'Intervention', value: 1, label: 'YB'},
		{ type: 'Intervention', value: 2, label: 'BZ'},
		{ type: 'Intervention', value: 3, label: 'GW'},
	],
	FallHeadNurseNameObj: {},
	FallHeadNurseNameOptions: [
		{ type: 'HeadNurseName', value: '刘霞', label: '刘霞' },
		{ type: 'HeadNurseName', value: '吴海燕', label: '吴海燕' },
		{ type: 'HeadNurseName', value: '邹庆霞', label: '邹庆霞' },
	],
	FallAssessmentObj: {
		Assessment1: '',
		Assessment2: 0,
		Assessment3: 0,
		Assessment4: '',
		Assessment5: '',
		Assessment6: '',
	},
	FallAssessment1Options: [
		{ type: 'Assessment1', value: '0', label: '无（0分）' },
		{ type: 'Assessment1', value: '25_0', label: '曾跌倒（25分）' },
		{ type: 'Assessment1', value: '25_1', label: '头晕（25分）' },
		{ type: 'Assessment1', value: '25_2', label: '视觉障碍（25分）' },
	],
	FallAssessment4Options: [
		{ type: 'Assessment4', value: '0_0', label: '否（0分）' },
		{ type: 'Assessment4', value: '0_1', label: '轮椅、平车（0分）' },
		{ type: 'Assessment4', value: '15', label: '拐杖、助步器、手杖、搀扶（15分）' },
	],
	FallAssessment5Options: [
		{ type: 'Assessment5', value: '0', label: '正常、卧床不能移动（0分）' },
		{ type: 'Assessment5', value: '10', label: '虚弱（10分）' },
		{ type: 'Assessment5', value: '20', label: '严重虚弱（20分）' },
	],
	FallAssessment6Options: [
		{ type: 'Assessment6', value: '0', label: '自主行动能力（0分）' },
		{ type: 'Assessment6', value: '15', label: '无控制能力（15分）' },
	],
	FallHaveSupervisor: 0,
	FallGoToSupervisor: false,
}

const getters = {
	FallNow: state => state.FallNow,
	FallThemeColor: state => state.FallThemeColor,
	FallPickerValueArray: state => state.FallPickerValueArray,
	FallMode: state => state.FallMode,
	FallDeepLength: state => state.FallDeepLength,
	FallPickerValueDefault: state => state.FallPickerValueDefault,
	
	FallScore: state => state.FallScore,
	FallSpeciallyMonitorObj: state => state.FallSpeciallyMonitorObj,
	FallIntervention: state => state.FallIntervention,
	FallInterventionOptions:state => state.FallInterventionOptions,
	FallHeadNurseNameObj: state => state.FallHeadNurseNameObj,
	FallAssessmentObj: state => state.FallAssessmentObj,
	FallAssessment1Options: state => state.FallAssessment1Options,
	FallAssessment4Options: state => state.FallAssessment4Options,
	FallAssessment5Options: state => state.FallAssessment5Options,
	FallAssessment6Options: state => state.FallAssessment6Options,
	FallHaveSupervisor: state => state.FallHaveSupervisor,
	FallGoToSupervisor: state => state.FallGoToSupervisor,
}

const actions = {
	[actionConstants.FALL_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
			commit(mutationConstants.SET_FALL_CONTENT, {info: content, type: payload.type})
			commit(mutationConstants.SET_FALL_CHECKBOX, {info: content, type: payload.type})
		}).then(() => {
			commit(mutationConstants.SET_FALL_SCORE, {type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},1000)
		})
		.catch((err) => plus.nativeUI.alert(err))
	},
	[actionConstants.FALL_SUBMIT_BEFORE] ({commit}, payload) {
		console.log(JSON.stringify(payload))
		let params = {
			AssessScore: parseInt(payload.AssessScore),
			Assessment1: kftools.getCheckBoxStr(state.FallAssessment1Options),
			Assessment2: kftools.getFallSwitchStr(state.FallAssessmentObj.Assessment2),
			Assessment3: kftools.getFallSwitchStr(state.FallAssessmentObj.Assessment3),
			Assessment4: kftools.getCheckBoxStr(state.FallAssessment4Options),
			Assessment5: kftools.getCheckBoxStr(state.FallAssessment5Options),
			Assessment6: kftools.getCheckBoxStr(state.FallAssessment6Options),
			CollectionDate: state.FallNow,
			HeadNurseName: state.FallHeadNurseNameObj.HeadNurseName,
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			Intervention: kftools.getCheckBoxStr(state.FallInterventionOptions),
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			PatientName: payload.info.PaientName,
			SpeciallyMonitor: state.FallSpeciallyMonitorObj.SpeciallyMonitor,
			
			EmployeeID: uni.getStorageSync('EmployeeID'),
			EmployeeName: uni.getStorageSync('EmployeeName'),
			UserID: uni.getStorageSync('UserID'),
		}
		console.log(JSON.stringify(params))
		
		commit(inPatientMutationConstants.SUBMIT_START)
		base.submit(params, payload.id, payload.type, (finalModel) => {
			console.log(JSON.stringify(finalModel))
			base.saveBasicInfoModel(payload.type, finalModel, state.FallHaveSupervisor, params)
			.then(([msg, goToSupervisor]) => {
				commit(inPatientMutationConstants.SUBMIT_DONE)
				commit(inPatientMutationConstants.SHOW_MESSAGE, msg)
				commit(nursingListMutationConstants.SET_IS_FROM_SUBMIT_TRUE)
				commit(mutationConstants.SET_FALL_INTERVENTION, params.Intervention)
				if (goToSupervisor) {
					state.FallGoToSupervisor = goToSupervisor
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
		state.FallNow = payload
	},
	[mutationConstants.SET_FALL_CONTENT] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		
		state.FallNow = payload.type == 'create' ? state.FallNow : assessmentInfo.CollectionDate.replace('T', ' ')
		state.FallSpeciallyMonitorObj = payload.type == 'create' ? {} : { SpeciallyMonitor: assessmentInfo.SpeciallyMonitor }
		state.FallHeadNurseNameObj = payload.type == 'create' ? {} : { 
			HeadNurseName: assessmentInfo.HeadNurseName ? assessmentInfo.HeadNurseName : '', 
			label: assessmentInfo.HeadNurseName ? assessmentInfo.HeadNurseName : ''
		}
		state.FallAssessmentObj.Assessment1 = payload.type == 'create' ? '' : assessmentInfo.Assessment1
		state.FallAssessmentObj.Assessment2 = payload.type == 'create' ? 0 : kftools.getFallAssessmentRadio(assessmentInfo.Assessment2)
		state.FallAssessmentObj.Assessment3 = payload.type == 'create' ? 0 : kftools.getFallAssessmentRadio(assessmentInfo.Assessment3)
		state.FallAssessmentObj.Assessment4 = payload.type == 'create' ? '' : assessmentInfo.Assessment4
		state.FallAssessmentObj.Assessment5 = payload.type == 'create' ? '' : assessmentInfo.Assessment5
		state.FallAssessmentObj.Assessment6 = payload.type == 'create' ? '' : assessmentInfo.Assessment6
	},
	[mutationConstants.SET_FALL_SCORE] (state, payload) {
		state.FallScore = payload.type == 'create' ? { Assessment1: 0, Assessment2: 0, Assessment3: 0, Assessment4: 0, Assessment5: 0, Assessment6: 0 } : { 
			Assessment1: kftools.calculateFallScore(state.FallAssessmentObj.Assessment1, state.FallAssessment1Options), 
			Assessment2: state.FallAssessmentObj.Assessment2 == 1 ? 15 : 0, 
			Assessment3: state.FallAssessmentObj.Assessment3 == 1 ? 15 : 0, 
			Assessment4: kftools.calculateFallScore(state.FallAssessmentObj.Assessment4, state.FallAssessment4Options), 
			Assessment5: kftools.calculateFallScore(state.FallAssessmentObj.Assessment5, state.FallAssessment5Options), 
			Assessment6: kftools.calculateFallScore(state.FallAssessmentObj.Assessment6, state.FallAssessment6Options) 
		}
	},
	[mutationConstants.SET_FALL_CHECKBOX] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		if (payload.type == 'create') {
			state.FallInterventionOptions.forEach((item) => item.checked = false)
			state.FallAssessment1Options.forEach((item) => item.checked = false)
			state.FallAssessment4Options.forEach((item) => item.checked = false)
			state.FallAssessment5Options.forEach((item) => item.checked = false)
			state.FallAssessment6Options.forEach((item) => item.checked = false)
		} else {
			kftools.checkBoxValueInit(assessmentInfo.Intervention).forEach((item, index) => state.FallInterventionOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.Assessment1).forEach((item, index) => state.FallAssessment1Options[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.Assessment4).forEach((item, index) => state.FallAssessment4Options[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.Assessment5).forEach((item, index) => state.FallAssessment5Options[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.Assessment6).forEach((item, index) => state.FallAssessment6Options[index].checked = item)
		}
	},
	[mutationConstants.SET_FALL_INTERVENTION] (state, payload) {
		state.FallIntervention = payload
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch(payload.type) {
			case 'HeadNurseName':
				state.FallHeadNurseNameObj = {
					HeadNurseName: payload.value[0],
					label: payload.label
				}
				break;
		}
	},
	[mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN] (state, payload) {
		state.FallPickerValueArray = state.FallHeadNurseNameOptions
		state.FallMode = 'selector'
		state.FallDeepLength = 1
		state.FallPickerValueDefault = [0]
	},
	[mutationConstants.FALL_INTERVENTION_CHECKBOX_CHANGE] (state, payload) {
		let items = state.FallInterventionOptions,
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
	[mutationConstants.FALL_ASSESSMENT1_CHECKBOX_CHANGE] (state, payload) {
		let items = state.FallAssessment1Options,
			values = payload.detail.value,
			scoreValue = values.map((item) => item.split('_')[0])

		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
		state.FallScore.Assessment1 = Math.max.apply(null, scoreValue)
	},
	[mutationConstants.FALL_SPECIALLY_MONITOR_SWITCH_CHANGE] (state, payload) {
		state.FallSpeciallyMonitorObj.SpeciallyMonitor = payload.target.value ? 1 : 0
	},
	[mutationConstants.FALL_ASSESSMENT2_SWITCH_CHANGE] (state, payload) {
		state.FallAssessmentObj.Assessment2 = payload.target.value ? 1 : 0
		state.FallScore.Assessment2 = payload.target.value ? 15 : 0
	},
	[mutationConstants.FALL_ASSESSMENT3_SWITCH_CHANGE] (state, payload) {
		state.FallAssessmentObj.Assessment3 = payload.target.value ? 1 : 0
		state.FallScore.Assessment3 = payload.target.value ? 15 : 0
	},
	[mutationConstants.FALL_ASSESSMENT4_CHECKBOX_CHANGE] (state, payload) {
		let items = state.FallAssessment4Options,
			values = payload.detail.value,
			scoreValue = values.map((item) => item.split('_')[0])
		
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
		state.FallScore.Assessment4 = Math.max.apply(null, scoreValue)
	},
	[mutationConstants.FALL_ASSESSMENT5_CHECKBOX_CHANGE] (state, payload) {
		let items = state.FallAssessment5Options,
			values = payload.detail.value,
			scoreValue = values.map((item) => item.split('_')[0])
		
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
		state.FallScore.Assessment5 = Math.max.apply(null, scoreValue)
	},
	[mutationConstants.FALL_ASSESSMENT6_CHECKBOX_CHANGE] (state, payload) {
		let items = state.FallAssessment6Options,
			values = payload.detail.value,
			scoreValue = values.map((item) => item.split('_')[0])
		
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
		state.FallScore.Assessment6 = Math.max.apply(null, scoreValue)
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}