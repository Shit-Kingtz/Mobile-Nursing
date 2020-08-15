import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/nursing/list/api/base.js'

const state = {
	NursingList: [],
	NursingTabBars: [
		{ name: '护理记录', id: 'nurseRecording' }, 
		{ name: '跌倒', id: 'fall' }, 
		{ name: '跌倒预报', id: 'fallSupervisor' },
		{ name: '压疮', id: 'ulcer' }, 
		{ name: '压疮预报', id: 'ulcerSupervisor' }, 
		{ name: '转运交接', id: 'transfer' }
	],
	NursingIsFromSubmit: false,
}

const getters = {
	NursingList: state => state.NursingList,
	NursingTabBars: state => state.NursingTabBars,
	NursingIsFromSubmit: state => state.NursingIsFromSubmit
}

const actions = {
	[actionConstants.NURSINGLIST_INIT] ({commit}, payload) {
		commit(listMutationConstants.SHOW_LOADING)
		base.init(payload.info, (list1, list2, list3, list4, list5) => {
			commit(mutationConstants.NURSINGLIST_SHOW, {
				nurseRecording: [],
				fall: list1,
				fallSupervisor: list2,
				ulcer: list3,
				ulcerSupervisor: list4,
				transfer: list5
			})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},1000)
		})
	},
	[actionConstants.NURSINGLIST_DELETE] ({commit}, payload) {
		let userId = uni.getStorageSync('UserID'), id
		switch(payload.index1) {
			case 0:
				id = state.NursingList[payload.index1].data[payload.index2].Id
				break
			case 1:
				id = state.NursingList[payload.index1].data[payload.index2].Id
				break
			case 2:
				id = state.NursingList[payload.index1].data[payload.index2].Id
				break
			case 3:
				id = state.NursingList[payload.index1].data[payload.index2].Id
				break
			case 4:
				id = state.NursingList[payload.index1].data[payload.index2].Id
				break
		}
		base.remove(payload.index1, id, userId, (res) => {
			console.log(JSON.stringify(res))
			if (res.Message) {
				commit(listMutationConstants.DELETE_SUCCESS)
				commit(mutationConstants.NURSINGLIST_DELETE, payload)
			}
		})
		.catch((Error) => console.log(JSON.stringify(Error)))
	},
}

const mutations = {
	[mutationConstants.NURSINGLIST_SHOW] (state, payload) {
		state.NursingList = []
		for (let i in payload) {
			let noData = true,
				list = []
			if (payload[i].length) {
				noData = false
				switch (i) {
					case 'nurseRecording':
						payload[i].sort((a, b) => new Date(b.CollectionDate.replace('T', ' ')) - new Date(a.CollectionDate.replace('T', ' ')))
						payload[i].forEach((item) => {
							list.push({
								Id: item.AssessID,
								Score: item.AssessScore,
								EmployeeName: item.EmployeeName,
								CollectionDate: kftools.formatDate(item.CollectionDate, "yyyy-MM-dd")
							})
						})
						break;
					case 'fall':
						payload[i].sort((a, b) => new Date(b.CollectionDate.replace('T', ' ')) - new Date(a.CollectionDate.replace('T', ' ')))
						payload[i].forEach((item) => {
							list.push({
								Id: item.AssessID,
								Score: item.AssessScore,
								EmployeeName: item.EmployeeName,
								CollectionDate: kftools.formatDate(item.CollectionDate, "yyyy-MM-dd")
							})
						})
						break;
					case 'ulcer':
						payload[i].sort((a, b) => new Date(b.CollectionDate.replace('T', ' ')) - new Date(a.CollectionDate.replace('T', ' ')))
						payload[i].forEach((item) => {
							list.push({
								Id: item.AssessID,
								Score: item.AssessScore,
								EmployeeName: item.EmployeeName,
								CollectionDate: kftools.formatDate(item.CollectionDate, "yyyy-MM-dd")
							})
						})
						break;
					case 'transfer':
						payload[i].forEach((item) => {
							let IdentityConfirmationStrArr = kftools.GetIdentityConfirmationStrArr(item.IdentityConfirmationType),
								ConsciousnessState = kftools.GetConsciousnessStr(parseInt(item.ConsciousnessState))
							list.push({
								Id: item.PatientTransferReceiptID,
								TransferTime: kftools.formatDate(item.TransferTime,"yyyy-MM-dd"),
								ConfirmDepartIn: item.ConfirmDepartIn,
								ConfirmPersonIn: item.ConfirmPersonIn,
								ConfirmDepartOut: item.ConfirmDepartOut,
								ConfirmPersonOut: item.ConfirmPersonOut,
								Diagnosis: item.Diagnosis,
								IdentityConfirmationStrArr: IdentityConfirmationStrArr,
								ConsciousnessState: ConsciousnessState,
							})
						})
						break;
					case 'fallSupervisor':
						payload[i].forEach((item) => {
							list.push({
								Id: item.AssessID,
								Score: isNaN(parseInt(item.AssessScore)) ? '' : parseInt(item.AssessScore),
								Intervention: item.Intervention,
								EmployeeName: item.EmployeeName
							})
						})
						break;
					case 'ulcerSupervisor':
						payload[i].forEach((item) => {
							list.push({
								Id: item.AssessID,
								Score: item.AssessScore,
								Intervention: item.Intervention,
								EmployeeName: item.EmployeeName
							})
						})
						break;
				}
			}
			state.NursingList.push({
				type: i,
				data: list,
				noData: noData
			})
		}
		
		console.log(JSON.stringify(state.NursingList))
	},
	[mutationConstants.NURSINGLIST_DELETE] (state, payload) {
		state.NursingList[payload.index1].data.splice(payload.index2, 1)
		state.NursingList[payload.index1].noData = state.NursingList[payload.index1].data.length == 0
	},
	[mutationConstants.SET_IS_FROM_SUBMIT_TRUE] (state, payload) {
		state.NursingIsFromSubmit = true
	},
	[mutationConstants.SET_IS_FROM_SUBMIT_FALSE] (state, payload) {
		state.NursingIsFromSubmit = false
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}