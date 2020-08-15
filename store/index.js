import Vue from 'vue'
import Vuex from 'vuex'
import patientList from './modules/patientList/base.js'
import patientInfo from './modules/patientDetail/base.js'
import infusion from './modules/infusion/base.js'
import infusionRecord from './modules/infusionRecord/base.js'
import adviceList from './modules/adviceList/base.js'
import eduList from './modules/eduList/base.js'
import edu34 from './modules/edu34/base.js'
import edu5 from './modules/edu5/base.js'
import assessmentList from './modules/assessmentList/base.js'
import inPatient from './modules/inPatient/base.js'
import grading from './modules/grading/base.js'
import PHQ9 from './modules/PHQ9/base.js'
import GAD7 from './modules/GAD7/base.js'
import bladder from './modules/bladder/base.js'
import intestinal from './modules/intestinal/base.js'
import nutrition from './modules/nutrition/base.js'
import risk from './modules/risk/base.js'
import MEWS from './modules/MEWS/base.js'
import nursingList from './modules/nursingList/base.js'
import nurseRecording from './modules/nurseRecording/base.js'
import fall from './modules/fall/base.js'
import fallSupervisor from './modules/fallSupervisor/base.js'
import ulcer from './modules/ulcer/base.js'
import ulcerSupervisor from './modules/ulcerSupervisor/base.js'
import transfer from './modules/transfer/base.js'
import temperatureList from './modules/temperatureList/base.js'
import temperature from './modules/temperature/base.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		patientList,
		patientInfo,
		infusion,
		infusionRecord,
		adviceList,
		eduList,
		edu34,
		edu5,
		assessmentList,
		inPatient,
		grading,
		PHQ9,
		GAD7,
		// bladder,
		intestinal,
		nutrition,
		risk,
		MEWS,
		nursingList,
		nurseRecording,
		fall,
		fallSupervisor,
		ulcer,
		ulcerSupervisor,
		transfer,
		temperatureList,
		temperature,
	},
	state: {
		hasLogin: false,
		loginProvider: "",
		openid: null
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		}
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
