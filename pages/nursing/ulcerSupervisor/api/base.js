import kfsys from '../../../../common/kfsys.js'
import his from '../../../../common/his.js'
import kftools from '../../../../common/kftools.js'
import store from '../../../../store'
import uniRequest from 'uni-request'

// 服务器时间ajax
let getServerDate = () => uniRequest.get(kfsys.prefixUrl + 'api/v1/BasicBusiness/CommonItem/GetDate')

// 详情ajax
let getAssessmentInfo = (params) => uniRequest.get(kfsys.prefixUrl + "api/v1/Hospitalized/NursingAssessment/AssesSupervisorUlcer?AssessID=" + params.ZYH + "&PatientHisID=" + params.ZYHM)

// FollowName ajax
let getFollowName = (id) => uniRequest.get(kfsys.prefixUrl + "api/v1/Hospitalized/NursingAssessment/AssesSupervisorFollowUp?SupervisorID=" + id)

// 业务跟踪model ajax
let getBasicInfoModel  = (ZYH) => uniRequest.get(kfsys.prefixUrl + "api/v1/BasicBusiness/HospitalizedPaientBusInfo?HospitalizedHisID=" + ZYH)
let saveBasicInfoModel = (finalModel, type, callback) => uni.request({
	url: kfsys.prefixUrl + "api/v1/BasicBusiness/HospitalizedPaientBusInfo",
	method: type,
	data: JSON.stringify(finalModel),
	header: { 'content-type': 'application/json' },
	success: (res) => {
		let result = JSON.parse(res.data)
		callback(result)
	}
})

// 提交ajax
let saveAssessment = (params, type, callback) => uni.request({
	url: kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesSupervisorUlcer',
	method: type,
	data: JSON.stringify(params),
	header: { 'content-type': 'application/json' },
	success: (res) => {
		let result = JSON.parse(res.data)
		callback(result)
	}
})

// let saveDetail = (params, type, callback) => uni.request({
// 	url: kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesSupervisorUlcer',
// 	method: type,
// 	data: JSON.stringify(params),
// 	header: { 'content-type': 'application/json' },
// 	success: (res) => {
// 		let result = JSON.parse(res.data)
// 		callback(result)
// 	}
// })

let getFinalModel = (params, model, score) => {
	if (score > 18) {
		model.MonitorUlcer = 0
	} 
	if (score >= 15 && score <= 18) {
		model.MonitorUlcer = 1
	} 
	if (score < 15) {
		model.MonitorUlcer = 1
	}
	model.UserID = params.UserID
	return model
}

export default {
	init(params, id, type, callback) {
		if (type == 'create') {
			return Promise.all([
				getServerDate()
			])
			.then(([date]) => {
				callback(date.data, {})
			})
			
		} else {
			return Promise.all([
				getServerDate(), getAssessmentInfo(id), getFollowName()
			])
			.then(([date, info, FollowNameObj]) => {
				let json = JSON.parse(FollowNameObj.data),
					FollowName = json.length > 0 ? json[0].EmployeeName : ''
				
				callback(date.data, info.data, FollowName)
			})
		}
		
	},
	
	submit(params, type, detailList, score, callback) {
		let basicInfoModel = {
			BusInfoID: '',
			HospitalizedID: '',
			HospitalizedHisID: params.HospitalizedHisID,
			MonitorFall: speciallyMonitor,
			MonitorCatheter: 0,
			MonitorUlcer: 0,
			MonitorSwallow: 0,
			leaveState: 0,
			SuggestionState: 0,
			AnomalyState: 0,
			HighRiskState: 0,
		}, 
		finalModel,
		ajaxType = type == 'create' ? 'POST' : 'PUT',
		ajaxParams = params,
		savePromise = new Promise((resolve, reject) => {
			saveAssessment(ajaxParams, ajaxType, (result) => {
				console.log(JSON.stringify(result))
				if (result.ResultType == 0) {
					resolve(ajaxParams.AssessID)
				} else {
					reject(result.Message)
				}
			})
		})
		.then((id) => {
			if (type == 'create') {
				let list = []
				for (let i in detailList) {
					list.push({
						AssessID: id,
						CatheterDetailID: kftools.guid(),
						Secretion: detailList[i].Secretion,
						UlcerArea: detailList[i].UlcerArea,
						UlcerPart: detailList[i].UlcerPart,
						Ulcerstage: detailList[i].Ulcerstage,
						Uloccutime: detailList[i].Uloccutime,
						UserID: uni.getStorageSync('UserID')
					})
				}
				console.log(JSON.stringify(list))
				// todo ... 保存
			} else {
				
			}
		})
		
		return Promise.all([
			getBasicInfoModel(params.HospitalizedHisID), savePromise
		])
		.then(([model, res]) => {
			let rs = JSON.parse(model.data)
			console.log(model.data)

			if (rs !== null) {
				if (rs.BusInfoID == '' || rs.BusInfoID == null) {
					reject('获取业务跟踪ID出错了！')
				}
				
				basicInfoModel.BusInfoID = rs.BusInfoID
				basicInfoModel.HospitalizedID = rs.HospitalizedID
				basicInfoModel.HospitalizedHisID = rs.HospitalizedHisID
				basicInfoModel.MonitorFall = rs.MonitorFall
				basicInfoModel.MonitorCatheter = rs.MonitorCatheter
				basicInfoModel.MonitorUlcer = rs.MonitorUlcer
				basicInfoModel.MonitorSwallow = rs.MonitorSwallow
				basicInfoModel.leaveState = rs.leaveState
				basicInfoModel.SuggestionState = rs.SuggestionState
				basicInfoModel.AnomalyState = rs.AnomalyState
				basicInfoModel.HighRiskState = rs.HighRiskState
			}
			
			finalModel = getFinalModel(params, basicInfoModel, score)
			callback(finalModel)
		})
	},
	
	saveBasicInfoModel(type, model, haveSupervisor, params, callback) {
		let ajaxType = type == 'create' ? 'POST' : 'PUT'
		return new Promise((resolve, reject) => {
			saveBasicInfoModel(model, ajaxType, (result) => {
				console.log(JSON.stringify(result))
				if (result.ResultType !== 0) {
					reject('resultType不等于0！')
				} else {
					resolve(result.Message)
				}
			})
		})
	}
}