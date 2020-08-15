import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/infusion/infusion/api/base.js'

const state = {
	Today: '',
	CardList: [],
	InfusionCards: [],
	InjectionCards: [],
	ListAfterSearch: [],
}

const getters = {
	Today: state => state.Today,
	CardList: state => state.CardList,
	ListAfterSearch: state => state.ListAfterSearch,
}

const actions = {
	[actionConstants.CARD_INIT] ({ dispatch, commit }, payload) {
		base.init(payload.info, (today, injectionCards, infusionCards) => {
			commit(mutationConstants.TODAY_INIT, today)
			commit(mutationConstants.CARD_INIT, {injectionCards, infusionCards})
		}).then(() => {
			return new Promise((resolve, reject) => {
				commit(mutationConstants.CARD_FINAL)
				resolve([state.CardList, state.Today])
			})
		}).then(([list, today]) => {
			base.showCardsColor(today, list, payload.info, (cardList, isDone) => {
				commit(mutationConstants.SHOW_COLOR, {list: cardList, isDone: isDone})
			})
			
		})
	},
}

const mutations = {
	[mutationConstants.TODAY_INIT] (state, payload) {
		state.Today = kftools.formatDate(payload, 'YYYY-MM-dd')
	},
	[mutationConstants.CARD_INIT] (state, payload) {
		state.ListAfterSearch = payload.injectionCards.concat(payload.infusionCards)
	},
	// 整理数据并显示所有卡片
	[mutationConstants.CARD_FINAL] (state, payload) {
		// 查询出所有组号，用于显示相应的卡片
		let GroupNOs = []
		for (let i in state.ListAfterSearch) {
			let hasData = false
			for (let j in GroupNOs) {
				if (state.ListAfterSearch[i].YZZH == GroupNOs[j].GroupNO) {
					hasData = true
				}
			}
			if (!hasData) {
				GroupNOs.push({ GroupNO: state.ListAfterSearch[i].YZZH, Number: state.ListAfterSearch[i].MRCS })
			}
		}
		
		// 收集卡片数据逻辑
		for (let i in GroupNOs) {
			let Content = []
			let BaseInfo = {}
			for (let j in state.ListAfterSearch) {
				if (state.ListAfterSearch[j].YZZH == GroupNOs[i].GroupNO) {
					// 在这里放置每组的医嘱信息
					Content.push({ 
						name: state.ListAfterSearch[j].YZMC, 
						dosage: (state.ListAfterSearch[j].YCJL*100 * state.ListAfterSearch[j].YCSL/100) + state.ListAfterSearch[j].JLDW, 
						method: state.ListAfterSearch[j].use_name == '静脉点滴' ? '静滴' : state.ListAfterSearch[j].use_name,
					}),
					
					// 在这边设置病人数据
					BaseInfo = {
						GroupNO: GroupNOs[i].GroupNO,
						ZYH: state.ListAfterSearch[j].ZYH,
						Name: state.ListAfterSearch[j].PaientName,
						BedNO: state.ListAfterSearch[j].BedNumber,
						Sex: state.ListAfterSearch[j].Sex == 1 ? '男' : '女',
						Time: state.ListAfterSearch[j].SYPC,
						YZMC: state.ListAfterSearch[j].YZMC,
						SLJL: state.ListAfterSearch[j].YZSL + '/' + state.ListAfterSearch[j].YZJL,
						SYPC: state.ListAfterSearch[j].SYPC,
						ZXSJ: state.ListAfterSearch[j].ZXSJ,
						UseName: state.ListAfterSearch[j].use_name,
						Date: '',
						StatusColor: '',
						ScanTime: '',
						ScanTimeColor: '',
						User01: '',
						User02: '',
						User03: ''
					}
				}
			}
			Content.sort((a, b) => a.name.indexOf('ml') <= 0 && b.name.indexOf('ml') > 0 ? 1 : -1)
			
			let num = parseInt(GroupNOs[i].Number)
			for (let x = 0; x < num; x++) {
				let CardNO = BaseInfo.GroupNO + '' + x
				state.CardList.push({
					CardNO: CardNO,
					GroupNO: BaseInfo.GroupNO,
					ZYH: BaseInfo.ZYH,
					Name: BaseInfo.Name,
					BedNO: BaseInfo.BedNO,
					Sex: BaseInfo.Sex,
					Time: BaseInfo.Time,
					YZMC: BaseInfo.YZMC,
					method: BaseInfo.method,
					dosage: BaseInfo.dosage,
					Content: Content,
					Date: BaseInfo.Date,
					SLJL: BaseInfo.SLJL,
					SYPC: BaseInfo.SYPC, // 时间
					ZXSJ: BaseInfo.ZXSJ,                              
					ScanTime: '',//测试
					UseName: BaseInfo.UseName,
					User01: BaseInfo.User01,
					User02: BaseInfo.User02,
					User03: BaseInfo.User03,
					StatusColor: '',
					ScanTimeColor: '',
				});
			}

		}
		console.log(JSON.stringify(state.CardList))
	},
	[mutationConstants.SHOW_COLOR] (state, payload) {
		state.CardList = payload.list
		if (payload.isDone) {
			plus.nativeUI.alert('今日输液已完成')
		}
	},
}

export default {
    state,
    getters,
    actions,
    mutations
}