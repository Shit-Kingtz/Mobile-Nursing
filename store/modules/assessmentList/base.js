import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/assessment/list/api/base.js'

const state = {
	assessmentList: [],
	tabBars: [
		{ name: '入院', id: 'inPatient' }, 
		{ name: '护理分级', id: 'grading' },
		{ name: 'PHQ9', id: 'PHQ9' }, 
		{ name: 'GAD7', id: 'GAD7' }, 
		{ name: '膀胱', id: 'bladder' }, 
		{ name: '肠道', id: 'intestinal' },
		{ name: '营养', id: 'nutrition' }, 
		{ name: '风险', id: 'risk' }, 
		{ name: 'MEWS', id: 'MEWS' }
	],
	isFromSubmit: false
}

const getters = {
	assessmentList: state => state.assessmentList,
	tabBars: state => state.tabBars,
	isFromSubmit: state => state.isFromSubmit,
}

const actions = {
	[actionConstants.ASSESSMENTLIST_INIT] ({commit}, payload) {
		commit(mutationConstants.SHOW_LOADING)
		base.init(payload.info, (list1, list2, list3, list4, list5, list6, list7, list8, list9) => {
			commit(mutationConstants.ASSESSMENTLIST_SHOW, {
				inPatient: list1,
				grading: list2,
				PHQ9: list3,
				GAD7: list4,
				bladder: list5,
				intestinal: list6,
				nutrition: list7,
				risk: list8,
				MEWS: list9
			})
			setTimeout(() => {
				commit(mutationConstants.CLOSE_LOADING)
			},1000)
		})
	},
	[actionConstants.ASSESSMENTLIST_DELETE] ({commit}, payload) {
		let userId = uni.getStorageSync('UserID'), id
		switch(payload.index1) {
			case 0:
				id = state.assessmentList[payload.index1].data[payload.index2].AdmissionID
				break
			case 1:
				id = state.assessmentList[payload.index1].data[payload.index2].AssessID
				break
			case 2:
				id = state.assessmentList[payload.index1].data[payload.index2].AssessID
				break
			case 3:
				id = state.assessmentList[payload.index1].data[payload.index2].AssessID
				break
			case 4:
				id = state.assessmentList[payload.index1].data[payload.index2].AssessID
				break
			case 5:
				id = state.assessmentList[payload.index1].data[payload.index2].AssessID
				break
			case 6:
				id = state.assessmentList[payload.index1].data[payload.index2].AssessID
				break
			case 7:
				id = state.assessmentList[payload.index1].data[payload.index2].ICUriskevaluationID
				break
			case 8:
				id = state.assessmentList[payload.index1].data[payload.index2].MEWSID
				break
		}
		base.remove(payload.index1, id, userId, (res) => {
			console.log(JSON.stringify(res))
			if (res.Message) {
				commit(mutationConstants.DELETE_SUCCESS)
				commit(mutationConstants.ASSESSMENTLIST_DELETE, payload)
			}
		})
		.catch((Error) => console.log(JSON.stringify(Error)))
	},
}

const mutations = {
	[mutationConstants.ASSESSMENTLIST_SHOW] (state, payload) {
		state.assessmentList = []
		for (let i in payload) {
			let noData = true
			if (payload[i].length) {
				noData = false
				payload[i].sort((a, b) => {
					if (i == 'risk') {
						return new Date(b.EvaluationDate.replace('T', ' ')) - new Date(a.EvaluationDate.replace('T', ' '))
					} else {
						return new Date(b.CollectionDate.replace('T', ' ')) - new Date(a.CollectionDate.replace('T', ' '))
					}
				})
			}
			state.assessmentList.push({
				type: i,
				data: payload[i],
				noData: noData
			})
		}
	},
	[mutationConstants.SET_IS_FROM_SUBMIT_TRUE] (state, payload) {
		state.isFromSubmit = true
	},
	[mutationConstants.SET_IS_FROM_SUBMIT_FALSE] (state, payload) {
		state.isFromSubmit = false
	},
	[mutationConstants.ASSESSMENTLIST_DELETE] (state, payload) {
		state.assessmentList[payload.index1].data.splice(payload.index2, 1)
		state.assessmentList[payload.index1].noData = state.assessmentList[payload.index1].data.length == 0 ? true : false
	},
	[mutationConstants.SHOW_LOADING] (state, payload) {
		uni.showLoading({
			title: '加载中...'
		})
	},
	[mutationConstants.CLOSE_LOADING] (state, payload) {
		uni.hideLoading()
	},
	[mutationConstants.DELETE_SUCCESS] (state, payload) {
		uni.showToast({
			title: '删除成功',
			duration: 2000
		});
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}