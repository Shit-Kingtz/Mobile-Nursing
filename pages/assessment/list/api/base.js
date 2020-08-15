import * as actionConstants from '../../../../store/modules/assessmentList/actions.js'
import * as mutationConstants from '../../../../store/modules/assessmentList/mutations.js'

import kfsys from '../../../../common/kfsys.js'
import his from '../../../../common/his.js'
import kftools from '../../../../common/kftools.js'
import store from '../../../../store'
import uniRequest from 'uni-request'

// 入院评估单ajax
let getInPatient = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/NursAsstAdmission?HospitalizedHisID=' + params.ZYH)
let removeInPatient = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/NursAsstAdmission?AdmissionID=' + id + '&UserID=' + userId + '&Status=100')

// 护理评估单ajax
let getGrading = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessNurs?HospitalizedHisID=' + params.ZYH + '&AsstSort=1')
let removeGrading = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessNurs?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// PHQ9评估单ajax
let getPHQ9 = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessNurs?HospitalizedHisID=' + params.ZYH + '&AsstSort=2')
let removePHQ9 = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessNurs?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// GAD7评估单ajax
let getGAD7 = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessNurs?HospitalizedHisID=' + params.ZYH + '&AsstSort=3')
let removeGAD7 = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessNurs?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// 膀胱评估单ajax
let getBladder = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessBladder?HospitalizedHisID=' + params.ZYH)
let removeBladder = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessBladder?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// 肠道评估单ajax
let getIntestinal = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessIntestine?HospitalizedHisID=' + params.ZYH)
let removeIntestinal = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessIntestine?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// 营养评估单ajax
let getNutrition = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessNutritional?HospitalizedHisID=' + params.ZYH)
let removeNutrition = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/AssessNutritional?AssessID=' + id + '&UserID=' + userId + '&Status=100')

// 风险评估单ajax
let getRisk = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursStation/ICURiskEvaluation/GetList?HospitalizedHisID=' + params.ZYH)
let removeRisk = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursStation/ICURiskEvaluation/Delete?id=' + id + '&UserID=' + userId + '&Status=100')

// 预警评估单ajax
let getMEWS = (params) => uniRequest.get(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/PatientMEWS?HospitalizedHisID=' + params.ZYH)
let removeMEWS = (id, userId) => uniRequest.delete(kfsys.prefixUrl + 'api/v1/Hospitalized/NursingAssessment/PatientMEWS/Delete?MEWSID=' + id + '&UserID=' + userId + '&Status=100')

export default {
	init(params, callback) {
		return Promise.all([
			getInPatient(params), getGrading(params), getPHQ9(params), getGAD7(params), getBladder(params), 
			getIntestinal(params), getNutrition(params), getRisk(params), getMEWS(params)
		])
		.then(([list1, list2, list3, list4, list5, list6, list7, list8, list9]) => {
			let inPatientList  = JSON.parse(list1.data),
				gradingList    = JSON.parse(list2.data),
				PHQ9List	   = JSON.parse(list3.data),
				GAD7List	   = JSON.parse(list4.data),
				bladderList    = JSON.parse(list5.data),
				intestinalList = JSON.parse(list6.data),
				nutritionList  = JSON.parse(list7.data),
				riskList	   = list8.data == '' ? [] : list8.data,
				MEWSList 	   = JSON.parse(list9.data)

			callback(inPatientList, gradingList, PHQ9List, GAD7List, bladderList, intestinalList, nutritionList, riskList, MEWSList)
		})
		.catch((err) => plus.nativeUI.alert(JSON.stringify(err)))
	},
	
	remove(type, id, userId, callback) {
		switch (type){
			case 0:
				return Promise.all([
					removeInPatient(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
			case 1:
				return Promise.all([
					removeGrading(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
			case 2:
				return Promise.all([
					removePHQ9(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
			case 3:
				return Promise.all([
					removeGAD7(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
			case 4:
				return Promise.all([
					removeBladder(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
			case 5:
				return Promise.all([
					removeIntestinal(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
			case 6:
				return Promise.all([
					removeNutrition(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
			case 7:
				return Promise.all([
					removeRisk(id, userId)
				])
				.then(([res]) => {
					callback(res.data)
				})
				break
			case 8:
				return Promise.all([
					removeMEWS(id, userId)
				])
				.then(([res]) => {
					let rs = JSON.parse(res.data)
					callback(rs)
				})
				break
		}
	}
}