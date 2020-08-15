import kfsys from '../../../common/kfsys.js'
import his from '../../../common/his.js'
import kftools from '../../../common/kftools.js'
import store from '../../../store'
import uniRequest from 'uni-request'

// 康复宣教列表ajax
let getEduList = (params) => uniRequest.get(kfsys.prefixUrl + '/api/v1/Hospitalized/NursingAssessment/AssessEducation?HospitalizedHisID=' + params.ZYH)
let remove = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessEducation?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// 服务器时间ajax
let getServerDate = () => uniRequest.get(kfsys.prefixUrl + 'api/v1/BasicBusiness/CommonItem/GetDate')

// 详情ajax
let getAssessmentInfo = (id) => uniRequest.get(kfsys.prefixUrl + "api/v1/Hospitalized/NursingAssessment/AssessEducation?AssessID=" + id)

// 提交ajax
let saveAssessment = (params, type, callback) => uni.request({
	url: kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessEducation',
	method: type,
	data: JSON.stringify(params),
	header: { 'content-type': 'application/json' },
	success: (res) => {
		let result = JSON.parse(res.data)
		callback(result)
	}
})

export default {
	initList(params, callback) {
		return Promise.all([
			getEduList(params)
		])
		.then(([res]) => {
			let json = JSON.parse(res.data),
				list = []
			if (json.length) {
				json.sort((a, b) => new Date(b.EducationDate.replace('T', ' ')) - new Date(a.EducationDate.replace('T', ' ')))
				for(let i in json) {
					list.push({
						Id: json[i].AssessID,
						ImplementerName: json[i].ImplementerName,                  				  // 宣教护士
						EducationDate: kftools.formatDate(json[i].EducationDate, "yyyy-MM-dd"),   // 宣教时间
						EvaluateName: json[i].EvaluateName,						    			  // 评估护士
						CollectionDate: kftools.formatDate(json[i].CollectionDate, "yyyy-MM-dd"), // 评估时间
					})
				}
			}
			
			console.log(JSON.stringify(list))
			callback(list)
		})
		.catch((err) => plus.nativeUI.alert(JSON.stringify(err)))
	},
	
	initInfo(params, id, type, callback) {
		if (type == 'create') {
			return Promise.all([
				getServerDate()
			])
			.then(([date]) => {
				callback(date.data, {})
			})
			.catch((err) => plus.nativeUI.alert(JSON.stringify(err)))
		} else {
			return Promise.all([
				getServerDate(), getAssessmentInfo(id)
			])
			.then(([date, info]) => {
				callback(date.data, info.data)
			})
			.catch((err) => plus.nativeUI.alert(err))
		}
		
	},
	
	submit(params, id, type, callback) {
		let ajaxType = type == 'create' ? 'POST' : 'PUT',
			ajaxParams = type == 'create' ? params : {'AssessID': id, ...params}
		
		return new Promise((resolve, reject) => {
			saveAssessment(ajaxParams, ajaxType, (result) => {
				console.log(JSON.stringify(result))
				if (result.ResultType == 0) {
					resolve(result.Message)
				} else {
					reject(result.Message)
				}
			})
		})
	},
	
	remove(id, userId, callback) {
		return Promise.all([
			remove(id, userId)
		])
		.then(([res]) => {
			let rs = JSON.parse(res.data)
			callback(rs)
		})
	}
}