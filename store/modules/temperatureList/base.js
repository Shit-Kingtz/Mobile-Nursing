import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/temperature/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'

const state = {
	TemperatureList: [],
	TemperatureIsFromSubmit: false,
}

const getters = {
	TemperatureList: state => state.TemperatureList,
	TemperatureIsFromSubmit: state => state.TemperatureIsFromSubmit,
}

const actions = {
	[actionConstants.TEMPERATURE_LIST_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.initList(payload.info, (list) => {
			commit(mutationConstants.GET_TEMPERATURE_LIST, list)
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},1000)
		})
	},
	[actionConstants.TEMPERATURE_LIST_DELETE] ({commit}, payload) {
		let userId = uni.getStorageSync('UserID'), 
			id = state.TemperatureList[payload].Id
		base.remove(id, userId, (res) => {
			console.log(JSON.stringify(res))
			if (res.Message) {
				commit(listMutationConstants.DELETE_SUCCESS)
				commit(mutationConstants.TEMPERATURE_LIST_DELETE, payload)
			}
		})
		.catch((Error) => console.log(JSON.stringify(Error)))
	},
}

const mutations = {
	[mutationConstants.GET_TEMPERATURE_LIST] (state, payload) {
		state.TemperatureList = payload
	},
	[mutationConstants.TEMPERATURE_LIST_DELETE] (state, payload) {
		state.TemperatureList.splice(payload, 1)
	},
	[mutationConstants.SET_IS_FROM_SUBMIT_TRUE] (state, payload) {
		state.TEMPERATUREIsFromSubmit = true
	},
	[mutationConstants.SET_IS_FROM_SUBMIT_FALSE] (state, payload) {
		state.TEMPERATUREIsFromSubmit = false
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}