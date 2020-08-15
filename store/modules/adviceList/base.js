import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/advice/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'

const state = {
	AdviceTemeColor: '#32CD32',
	AdvicePickerValueArray: [], 
	AdviceMode: '', 
	AdviceDeepLength: 1, 
	AdvicePickerValueDefault: [],
	
	AdviceTypeObj: {},
	AdviceTypeOptions: [
		{ type: 'AdviceType', value: -1, label: '全部' },
		{ type: 'AdviceType', value: 1, label: '药物医嘱' },
		{ type: 'AdviceType', value: 2, label: '诊疗医嘱' },
		{ type: 'AdviceType', value: 9, label: '其他医嘱' },
	],
	showList: [],
	adviceList: [],
}

const getters = {
	AdviceTemeColor: state => state.AdviceTemeColor,
	AdvicePickerValueArray: state => state.AdvicePickerValueArray, 
	AdviceMode: state => state.AdviceMode, 
	AdviceDeepLength: state => state.AdviceDeepLength, 
	AdvicePickerValueDefault: state => state.AdvicePickerValueDefault,
	AdviceTypeObj: state => state.AdviceTypeObj,
	showList: state => state.showList,
	adviceList: state => state.adviceList,
}

const actions = {
	[actionConstants.ADVICE_INIT] ({commit}, payload) {
		state.showList = []
		state.adviceList = []
		state.AdviceTypeObj = { label: '全部' }
		commit(listMutationConstants.SHOW_LOADING)
		base.init(payload.info, payload.type, (list) => {
			commit(mutationConstants.GET_ADVICE_LIST, list)
			commit(mutationConstants.ADVICE_LIST_SHOW, list)
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},1000)
		})
	},
}

const mutations = {
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		state.showList = []
		switch (payload.type){
			case 'AdviceType':
				state.AdviceTypeObj = {
					AdviceType: payload.value[0],
					label: payload.label
				}
				break
		}
		
		switch (payload.value[0]){
			// 全部
			case -1:
				state.showList = state.adviceList
				break
			// 药物
			case 1:
				state.adviceList.forEach((item) => {
					if (item.className == 'drug') {
						state.showList.push(item)
					}
				})
				break
			// 诊疗
			case 2:
				state.adviceList.forEach((item) => {
					if (item.className == 'treatment') {
						state.showList.push(item)
					}
				})
				break
			// 其他
			case 9:
				state.adviceList.forEach((item) => {
					if (item.className == 'other') {
						state.showList.push(item)
					}
				})
				break
		}
	},
	[mutationConstants.ADVICE_TYPE_PICKER_OPEN] (state, payload) {
		state.AdvicePickerValueArray = state.AdviceTypeOptions
		state.AdviceMode = 'selector'
		state.AdviceDeepLength = 1
		state.AdvicePickerValueDefault = [0]
	},
	[mutationConstants.GET_ADVICE_LIST] (state, payload) {
		state.adviceList = payload
	},
	[mutationConstants.ADVICE_LIST_SHOW] (state, payload) {
		state.showList = payload
		console.log(JSON.stringify(state.showList))
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}