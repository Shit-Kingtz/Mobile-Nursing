<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="login">
				<view class="uni-form-item uni-row">
					<view class="title">账号</view>
					<input class="uni-input" type="number" placeholder="输入账号" placeholder-style="color: #BEBEBE" v-model="userName"/>
				</view>
				<view class="uni-form-item uni-row">
					<view class="title">密码</view>
					<view class="with-fun">
						<input class="uni-input" placeholder="输入密码" placeholder-style="color: #BEBEBE" :password="showPassword" v-model="pwd"/>
						<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword" :style="!showPassword ? 'color: #32CD32' : ''"></view>
					</view>
				</view>
				<view class="uni-btn-v" style="padding-top: 100upx;">
					<button formType="submit" class="loginBtn">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import his from '../../common/his.js'
	import kfsys from '../../common/kfsys.js'
	
	export default {
		data() {
			return {
				title: '登录',
				showPassword: true,
				userName: '',
				pwd: ''
			}
		},
		methods: {
			login: function() {
				console.log('账号:' + this.userName)
				console.log('密码:' + this.pwd)
				uni.showLoading({
					title: '登录中...'
				})
				
				uni.request({
					url: his.formalUrl + 'api/Staff/getHisStaffLogin',
					method: 'GET',
					data: {
						userNumber: this.userName,
						pwd: this.pwd
					},
					success: (res) => {
						let rs = JSON.parse(res.data)
						if (rs.code == '0000') {
							this.finalLogin()
						} else {
							uni.showToast({
								title:rs.msg
							})
						}
					},
					fail: (err) => {
						console.log(JSON.stringify(err))

						uni.showLoading({
							title: JSON.stringify(err.errMsg),
						})
					},
				})
			},
			finalLogin: function() {
				uni.request({
					url: kfsys.formalUrl + 'api/v1/SystemBusiness/UserInfo/GetUserInfoByEmployeeNumber',
					method: 'GET',
					data: {
						EmployeeNumber: this.userName,
					},
					success: (res) => {
						console.log('login success')
						if (res.data != '') {
							let json = JSON.parse(res.data)
							uni.setStorageSync('UserName', json.EmployeeNumber)
							uni.setStorageSync('UserID', json.UserID)
							uni.setStorageSync('EmployeeID', json.EmployeeID)
							uni.setStorageSync('EmployeeName', json.EmployeeName)
							uni.setStorageSync('DepartmentID', json.DepartmentID)
							// uni.setStorageSync('DepartmentName', json.DepartmentName)
							uni.setStorageSync('RoleName', json.RoleName)
							uni.setStorageSync('HisID', json.HisID)

// 							uni.setStorageSync('UserName', '111')
// 							uni.setStorageSync('UserID', '1111-1111-1111-1111')
// 							uni.setStorageSync('EmployeeID', '1111-1111-1111-1111')
// 							uni.setStorageSync('EmployeeName', '洋洋')
// 							uni.setStorageSync('DepartmentID', '111')
							uni.setStorageSync('DepartmentName', '三病区')
// 							uni.setStorageSync('RoleName', '111')
// 							uni.setStorageSync('HisID', '111')
							
							uni.switchTab({
								url: '/pages/patientList/patientList'
							})
							// return
						}
					},
					
				})
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	.loginBtn {
		background: #32CD32;
		color: #FFFFFF;
	}
</style>
