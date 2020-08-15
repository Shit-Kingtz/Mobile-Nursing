import kfsys from '../../../common/kfsys.js'

export default {
	init(params, callback) {		
		uni.request({
			url: kfsys.prefixUrl + 'api/v1/Hospitalized/NursStation/NursesViewList',
			method: 'GET',
			data: params,
			success: (res) => {
				let rs = JSON.parse(res.data)
				if (rs.ResultType == 0) {
					callback(JSON.parse(rs.Message))
				}
			},
			fail: (err) => {
				console.log(JSON.stringify(err))
				uni.hideLoading()
				uni.showLoading({
					title: err.errMsg
				})
			},
		})
	}
}