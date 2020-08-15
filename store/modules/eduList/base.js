import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/edu/api/base.js'
import * as listMutationConstants from '../assessmentList/mutations.js'

const state = {
	EduList: [],
	EduIsFromSubmit: false,
}

const getters = {
	EduList: state => state.EduList,
	EduIsFromSubmit: state => state.EduIsFromSubmit,
}

const actions = {
	[actionConstants.EDU_LIST_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.initList(payload.info, (list) => {
			commit(mutationConstants.GET_EDU_LIST, list)
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},1000)
		})
	},
	[actionConstants.EDU_LIST_DELETE] ({commit}, payload) {
		let userId = uni.getStorageSync('UserID'), 
			id = state.EduList[payload].Id
		base.remove(id, userId, (res) => {
			console.log(JSON.stringify(res))
			if (res.Message) {
				commit(listMutationConstants.DELETE_SUCCESS)
				commit(mutationConstants.EDU_LIST_DELETE, payload)
			}
		})
		.catch((Error) => console.log(JSON.stringify(Error)))
	},
}

const mutations = {
	[mutationConstants.GET_EDU_LIST] (state, payload) {
		state.EduList = payload
	},
	[mutationConstants.EDU_LIST_DELETE] (state, payload) {
		state.EduList.splice(payload, 1)
	},
	[mutationConstants.SET_IS_FROM_SUBMIT_TRUE] (state, payload) {
		state.EduIsFromSubmit = true
	},
	[mutationConstants.SET_IS_FROM_SUBMIT_FALSE] (state, payload) {
		state.EduIsFromSubmit = false
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}