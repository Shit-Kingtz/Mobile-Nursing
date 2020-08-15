import base from '../../../pages/patientList/api/base.js'
import kftools from '../../../common/kftools.js'
import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'

const state = {
	patients: [],
}

const getters = {
	patients: state => state.patients,
}

const actions = {
	[actionConstants.PAGE_INIT] ({commit}) {
		return new Promise((resolve, reject) => {
			base.init({
				ZYH: uni.getStorageSync('DepartmentName'),
				type: 2
			}, (patients) => {
				patients.forEach((item) => {
					item.age = kftools.Ages(item.DateOfBirth.replace('T00:00:00', ''))
					item.inTime = kftools.formatDate(item.InTime, 'yyyy-MM-dd')
				})
				commit(mutationConstants.PATIENTS_INIT, {patients})
				resolve()
			})
		})
	},
}

const mutations = {
	[mutationConstants.PATIENTS_INIT] (state, payload) {
		state.patients = payload.patients
	}
}

export default {
    state,
    getters,
    actions,
    mutations
}