import kfsys from '../../../../common/kfsys.js'
import his from '../../../../common/his.js'
import kftools from '../../../../common/kftools.js'
import store from '../../../../store'
import uniRequest from 'uni-request'

// 跌倒ajax
let getFall = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesMonitorFall?HospitalizedHisID=' + params.ZYH)
let removeFall = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesMonitorFall?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// 跌倒预报ajax
let getFallSupervisor = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesSupervisorFall?HospitalizedHisID=' + params.ZYH)
let removeFallSupervisor = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesSupervisorFall?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// 压疮ajax
let getUlcer = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesMonitorUlcer?HospitalizedHisID=' + params.ZYH)
let removeUlcer = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesMonitorUlcer?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// 压疮预报ajax
let getUlcerSupervisor = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesSupervisorUlcer?HospitalizedHisID=' + params.ZYH)
let removeUlcerSupervisor = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssesSupervisorUlcer?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// 转运ajax
let getTransfer = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursStation/PatientTransferReceipt/GetList?HospitalizedHisID=' + params.ZYH)
let removeTransfer = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursStation/PatientTransferReceipt/Delete?id=' + id + '&UserID=' + userId + '&Status=100')

export default {
	init(params, callback) {
		return Promise.all([
			getFall(params), getFallSupervisor(params), getUlcer(params), getUlcerSupervisor(params), getTransfer(params)
		])
		.then(([list1, list2, list3, list4, list5]) => {
			let FallList 			= JSON.parse(list1.data),
				FallSupervisorList  = JSON.parse(list2.data),
				UlcerList			= JSON.parse(list3.data),
				UlcerSupervisorList	= JSON.parse(list4.data),
				TransferList 		= list5.data == '' ? [] : JSON.parse(list5.data)

			callback(FallList, FallSupervisorList, UlcerList, UlcerSupervisorList, TransferList)
		})
		.catch((err) => console.log(err))
	},
	
	remove(type, id, userId, callback) {
		switch (type){
			case 0:
				return Promise.all([
					removeFall(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
			case 1:
				return Promise.all([
					removeFallSupervisor(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
			case 2:
				return Promise.all([
					removeUlcer(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
			case 3:
				return Promise.all([
					removeUlcerSupervisor(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
			case 4:
				return Promise.all([
					removeTransfer(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
		}
	}
}