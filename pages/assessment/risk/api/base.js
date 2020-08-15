import * as actionConstants from '../../../../store/modules/risk/actions.js'
import * as mutationConstants from '../../../../store/modules/risk/mutations.js'

import kfsys from '../../../../common/kfsys.js'
import his from '../../../../common/his.js'
import kftools from '../../../../common/kftools.js'
import store from '../../../../store'
import uniRequest from 'uni-request'

// 服务器时间ajax
let getServerDate = () => uniRequest.get(kfsys.prefixUrl + 'api/v1/BasicBusiness/CommonItem/GetDate')

// 详情ajax
let getAssessmentInfo = (id) => uniRequest.get(kfsys.prefixUrl + "api/v1/Hospitalized/NursStation/ICURiskEvaluation/GetSingle?ICURiskEvaluationID=" + id)

// 提交ajax
let saveAssessment = (params, type, callback) => uni.request({
	url: kfsys.prefixUrl + 'api/v1/Hospitalized/NursStation/ICURiskEvaluation/Save',
	method: type,
	data: JSON.stringify(params),
	header: { 'content-type': 'application/json' },
	success: (res) => callback(res.data)
})


export default {
	init(params, id, type, callback) {
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
			.catch((err) => plus.nativeUI.alert(JSON.stringify(err)))
		}
		
	},
	
	submit(params, id, type, callback) {
		let ajaxType = type == 'create' ? 'POST' : 'PUT',
			ajaxParams = type == 'create' ? params : {'ICUriskevaluationID': id, ...params}
			
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
}