import * as actionConstants from '../../../../store/modules/infusion/actions.js'
import * as mutationConstants from '../../../../store/modules/infusion/mutations.js'

import kfsys from '../../../../common/kfsys.js'
import his from '../../../../common/his.js'
import store from '../../../../store'
import uniRequest from 'uni-request'

// 服务器时间ajax
let getServerDate = () => uniRequest.get(kfsys.prefixUrl + 'api/v1/BasicBusiness/CommonItem/GetDate')

// 注射卡ajax
let getRecord = (date, params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/DoctorAdviceCard/GetDoctorAdviceCardList?Date=' + date + '&ZYH=' + params.ZYH)

export default {
	init(params, callback) {
		return Promise.all([getServerDate()])
				.then(([date]) => {
					callback(date.data)
				})
				.catch((err) => plus.nativeUI.alert(JSON.stringify(err)))
	},
	
	recordList(date, params, callback) {
		return Promise.all([getRecord(date, params)])
				.then(([res]) => {
					callback(res.data)
				})
				.catch((err) => plus.nativeUI.alert(JSON.stringify(err)))
	}
}