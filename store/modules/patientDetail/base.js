import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'

const state = {
	info: {},
	grids: [
		{ "img": "../../static/icon-19.png", "name": "输液执行", "url": "../infusion/infusion/infusion" },
		{ "img": "../../static/icon-16.png", "name": "输液查询", "url": "../infusion/record/record" },
		{ "img": "../../static/icon-17.png", "name": "评估单管理", "url": "../assessment/list/list" },
		{ "img": "../../static/icon-16.png", "name": "护理单管理", "url": "../nursing/list/list" },
		{ "img": "../../static/icon-17.png", "name": "体温单管理", "url": "../temperature/list" },
		{ "img": "../../static/icon-18.png", "name": "康复宣教", "url": "../edu/list" },
		{ "img": "../../static/icon-17.png", "name": "医嘱查询", "url": "../advice/list" },
	],
}

const getters = {
	info: state => state.info,
	grids: state => state.grids,
}

const actions = {
	[actionConstants.PATIENT_INIT] ({commit}) {
		commit(mutationConstants.PATIENT_INIT, {info})
	},
}

const mutations = {
	[mutationConstants.PATIENT_INIT] (state, payload) {
		state.info = payload.info
	}
}

export default {
    state,
    getters,
    actions,
    mutations
}