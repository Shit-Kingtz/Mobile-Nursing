import * as actionConstants from '../../../../store/modules/infusion/actions.js'
import * as mutationConstants from '../../../../store/modules/infusion/mutations.js'

import kfsys from '../../../../common/kfsys.js'
import his from '../../../../common/his.js'
import store from '../../../../store'
import uniRequest from 'uni-request'

// 服务器时间ajax
let getServerDate = () => uniRequest.get(kfsys.prefixUrl + 'api/v1/BasicBusiness/CommonItem/GetDate')

// 注射卡ajax
let getInjectionCard = (params) => uniRequest.get(his.formalUrl + 'api/v1/Busi/InfusionInfo/GetInjectionCard?ZYH=' + params.ZYH)

// 静滴卡ajax
let getInfusionCard = (params) => uniRequest.get(his.formalUrl + 'api/InfusionInfo?ZYH=' + params.ZYH)

// 卡片颜色
let getCardColor = (today) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/DoctorAdviceCard?Date=' + today)

export default {
	init(params, callback) {
		return Promise.all([getServerDate(), getInjectionCard(params), getInfusionCard(params)])
				.then(([date, list1, list2]) => {
					let length1 = JSON.parse(list1.data.msg).length,
						length2 = JSON.parse(list2.data.msg).length,
						InjectionCards = [],
						InfusionCards = []
					if (length1 > 0) {
						let obj = JSON.parse(list1.data.msg)
						for (let i in obj) {
							InjectionCards.push(obj[i])
						}
					}
					if (length2 > 0) {
						let obj = JSON.parse(list2.data.msg)
						for (let i in obj) {
							InfusionCards.push(obj[i])
						}
					}
					callback(date.data, InjectionCards, InfusionCards)
				})
				.catch((err) => plus.nativeUI.alert(JSON.stringify(err)))
	},
	
	// 显示卡片颜色 黑色为输液完成 红色为正在输液 橙色为未开始输液
	showCardsColor(date, cardList, params, callback) {
		return Promise.all([getCardColor(date)])
				.then(([res]) => {
					let json = JSON.parse(res.data),
						arr = [],
						nowsum = 0,
						nowsums = 0
						
					for(let i in json) {
						if (json[i].ZYH == params.ZYH) {
							arr.push(json[i])
						}
					}
					console.log(JSON.stringify(arr))
					for(let x in cardList) {
						let ScanTime = '',
							Scantype1 = '',
							Scantype2 = '',
							Scantype3 = ''
						
						nowsum++
						for(let y in arr) {
							let CardNO = arr[y].CardNO.split('-')[0]
							if (cardList[x].CardNO == CardNO) {
								ScanTime = arr[y].ScanTime
								if (arr[y].ScanType == "扫描") {
									Scantype1 = "扫描"
								}
								if (arr[y].ScanType == "结束" || arr[y].ScanType == "注射") {
									Scantype2 = "结束"
								}
							}
						}
						console.log(ScanTime)
						console.log(Scantype1)
						console.log(Scantype2)

						if (ScanTime) {
							if (Scantype1 == "扫描") {
								cardList[x].ScanType = '扫描'
								cardList[x].StatusColor = 'red'
							}
							if (Scantype2 == "结束") {
								cardList[x].StatusColor = '#777'
								cardList[x].ScanTimeColor = '#777'
								nowsums++
							}
							cardList[x].ScanTime = ScanTime;
						} else {
							cardList[x].StatusColor = 'orange'
						}
					}
					console.log(JSON.stringify(cardList))
					
					let isDone = nowsum && nowsums && nowsum == nowsums
					callback(cardList, isDone)
				})
				.catch((err) => plus.nativeUI.alert(JSON.stringify(err)))
	}
}