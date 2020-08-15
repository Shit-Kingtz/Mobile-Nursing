import kfsys from '../../../common/kfsys.js'
import his from '../../../common/his.js'
import kftools from '../../../common/kftools.js'
import uniRequest from 'uni-request'

// 服务器时间ajax
let getServerDate = () => uniRequest.get(kfsys.prefixUrl + 'api/v1/BasicBusiness/CommonItem/GetDate')

// 医嘱列表ajax
let getAdviceList = (params) => uniRequest.get(his.formalUrl + "api/v1/HospitalizedDoctor/MedicalOrders/GetMedicalOrders?ZYH=" + params.ZYH + "&YZQX=" + params.YZQX + "&beginTime=&endTime=")


export default {
	init(params, type, callback) {
		params.YZQX = type == 'SO' ? 1 : 2
		return Promise.all([
			getServerDate(), getAdviceList(params)
		])
		.then(([date, result]) => {
			let list = [],
				rs = JSON.parse(result.data.msg)

			if (result.data.status == 'OK') {
				if (rs.length) {
					rs.sort((a, b) => new Date(b.KZSJ.replace('T', ' ')) - new Date(a.KZSJ.replace('T', ' ')))
					for (let i in rs) {
						// 筛选有效医嘱 status=5(复核通)或停嘱时间<今天
						if (rs[i].YZZT == 5) {
							list.push({
								YZMC: rs[i].YZMC,
								KZSJ: kftools.formatDate(rs[i].KZSJ, 'YYYY-MM-dd hh:mm'),
								TZSJ: kftools.formatDate(rs[i].TZSJ, 'YYYY-MM-dd hh:mm'),
								YCJL: rs[i].YCJL,
								SYPC: rs[i].SYPC,
								ZLDW: rs[i].ZLDW,
								DW: rs[i].DW,
								YZZT: rs[i].YZZT,
								className: kftools.getClassName(rs[i].XMLB)
							})
						}
						if (rs[i].YZZT == 4 && new Date(kftools.formatDate(rs[i].TZSJ, 'YYYY-MM-dd')) >= new Date(date.data)) {
							list.push({
								YZMC: rs[i].YZMC,
								KZSJ: kftools.formatDate(rs[i].KZSJ, 'YYYY-MM-dd hh:mm'),
								TZSJ: kftools.formatDate(rs[i].TZSJ, 'YYYY-MM-dd hh:mm'),
								YCJL: rs[i].YCJL,
								SYPC: rs[i].SYPC,
								ZLDW: rs[i].ZLDW,
								DW: rs[i].DW,
								YZZT: rs[i].YZZT,
								className: kftools.getClassName(rs[i].XMLB)
							})
						}
					}

				} else {
					let str = type == 'SO' ? '长期医嘱' : '临时医嘱'
					plus.nativeUI.alert('该病人无此类型的' + str)
				}
			}
			callback(list)
		})
		.catch((err) => plus.nativeUI.alert(JSON.stringify(err)))
		
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
		ajaxParams = type == 'create' ? params : {'AdmissionID': id, ...params},
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
				basicInfoModel.Sex = rs.Sex
				basicInfoModel.PatientName = rs.PatientName
				
			}
			
			finalModel = getFinalModel(params, basicInfoModel)
			callback(finalModel)
		})
	},
	
	saveBasicInfoModel(type, model, callback) {
		let ajaxType = type == 'create' ? 'POST' : 'PUT'
		return new Promise((resolve, reject) => {
			saveBasicInfoModel(model, ajaxType, (result) => {
				console.log(JSON.stringify(result))
				if (result.ResultType !== 0) {
					reject(result.Message)
				} else {
					resolve(result.Message)
				}
			})
		})
	}
}