import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/infusion/record/api/base.js'

const state = {
	date: '',
	RecordList: [],
	noData: false,
}

const getters = {
	date: state => state.date,
	RecordList: state => state.RecordList,
	noData: state => state.noData,
}

const actions = {
	[actionConstants.RECORD_INIT] ({commit}, payload) {
		uni.showLoading({
			title: '加载中...'
		})
		base.init(payload.info, (date) => {
			commit(mutationConstants.DATE_INIT, date)
		}).then(() => {
			base.recordList(state.date, payload.info, (list) => {
				commit(mutationConstants.RECORD_FINAL, list)
			})
		})
	},
	[actionConstants.DATE_CHANGE] ({commit}, payload) {
		uni.showLoading({
			title: '加载中...'
		})
		base.recordList(payload.date, payload.params, (list) => {
			commit(mutationConstants.RECORD_FINAL, list)
		})
	},
}

const mutations = {
	[mutationConstants.DATE_INIT] (state, payload) {
		state.date = kftools.formatDate(payload, 'YYYY-MM-dd')
	},
	[mutationConstants.DATE_CHANGE] (state, payload) {
		state.date = payload
	},
	[mutationConstants.RECORD_FINAL] (state, payload) {
		let list = []
		if (payload.length) {
			state.noData = false
			payload.sort((a, b) => new Date(b.ScanTime.replace('T', ' ')) - new Date(b.CreateTime.replace('T', ' ')))
			
			for(let key in payload) {
				let drugList = kftools.formatRecord(payload[key].RehydrationPrescriptionRecord),
					type = ''
				switch (payload[key].ScanType){
					case '扫描':
						type = '输液开始'
						break;
					case '巡视':
						type = '巡视'
						break;
					case '结束':
						type = '输液结束'
						break;
					case '注射':
						type = '注射'
						break;
				}
				
				list.push({
					CardNO: payload[key].CardNO,
					Time: payload[key].ScanTime,
					Type: type,							// 操作
					DrugList: drugList, 				// 显示内容
					NurseName: payload[key].WorkerNO,
				})
			}
			state.RecordList = list
		} else {
			state.noData = true
		}
		
		uni.hideLoading()
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}