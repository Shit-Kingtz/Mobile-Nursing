import kfsys from '../../../../common/kfsys.js'
import his from '../../../../common/his.js'
import kftools from '../../../../common/kftools.js'
import store from '../../../../store'
import uniRequest from 'uni-request'

// 服务器时间ajax
let getServerDate = () => uniRequest.get(kfsys.prefixUrl + 'api/v1/BasicBusiness/CommonItem/GetDate')

// 详情ajax
let getAssessmentInfo = (id) => uniRequest.get(kfsys.prefixUrl + "api/v1/Hospitalized/NursingAssessment/AssesMonitorUlcer?AssessID=" + id)

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
	url: kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesMonitorUlcer',
	method: type,
	data: JSON.stringify(params),
	header: { 'content-type': 'application/json' },
	success: (res) => {
		let result = JSON.parse(res.data)
		callback(result)
	}
})

let getFinalModel = (params, model) => {
	if (params.AssessScore < 15) {
		model.MonitorUlcer = 2
	} else if (params.AssessScore > 18) {
		model.MonitorUlcer = 0
	} else {
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
				getServerDate(), getAssessmentInfo(id)
			])
			.then(([date, info]) => {
				callback(date.data, info.data)
			})
		}
		
	},
	
	submit(params, id, type, callback) {
		let basicInfoModel = {
			BusInfoID: '',
			HospitalizedID: '',
			HospitalizedHisID: params.HospitalizedHisID,
			MonitorFall: 0,
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
		ajaxParams = type == 'create' ? params : {'AssessID': id, ...params},
		savePromise = new Promise((resolve, reject) => {
			saveAssessment(ajaxParams, ajaxType, (result) => {
				console.log(JSON.stringify(result))
				if (result.ResultType == 0) {
					resolve(result.Message)
				} else {
					reject(result.Message)
				}
			})
		})
		
		return Promise.all([
			getBasicInfoModel(params.HospitalizedHisID), savePromise
		])
		.then(([model, res]) => {
			let rs = JSON.parse(model.data)
			console.log(model.data)

			if (rs !== null) {
				console.log(111)
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
				basicInfoModel.Sex = rs.Sex
				basicInfoModel.PatientName = rs.PatientName
				
			}
			
			finalModel = getFinalModel(params, basicInfoModel)
			callback(finalModel)
		})
	},
	
	saveBasicInfoModel(type, model, haveSupervisor, params, callback) {
		let ajaxType = type == 'create' ? 'POST' : 'PUT'
		return new Promise((resolve, reject) => {
			saveBasicInfoModel(model, ajaxType, (result) => {
				console.log(JSON.stringify(model))
				if (result.ResultType !== 0) {
					reject(result.Message)
				} else {
					let goToSupervisor = false
					if (!haveSupervisor) {
						goToSupervisor = params.BringInto !== '' || params.AssessScore < 15
					}
					console.log('goToSupervisor: ' + goToSupervisor)
					resolve([result.Message, goToSupervisor])
				}
			})
		})
	}
}