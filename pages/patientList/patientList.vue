<template>
    <view class="page">
        <page-head :title="departmentName"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-card card-border" hover-class="uni-card-hover"
				v-for="(patient, i) in patients" :key="i" @click="goDetail(patient)"
				:style="{ borderLeftColor: patient.Sex=='男' ? '#007AFF' : '#C71585' }">
				<view class="uni-card-content uni-flex uni-column">
					<view class="uni-card-content-inner uni-flex uni-row" style="padding-bottom: 0;">
						<view class="inner-left text" style="flex: 3; font-size: 35upx;font-weight: 800;">
							{{ patient.BedNO }}&nbsp;&nbsp;&nbsp;{{ patient.PaientName }}
						</view>
						<view class="inner-right text" style="flex: 3; color: #7A7E83;">{{ patient.YSLX ? patient.YSLX : '-' }}</view>
					</view>
					<view class="uni-card-content-inner uni-flex uni-row" style="padding-top: 0;">
						<view class="inner-left text" style="flex: 3; font-size: 30upx; color: #7A7E83">
							{{ patient.HLJB ? patient.HLJB : '-' }}&nbsp;/&nbsp;{{ patient.Sex }}&nbsp;/&nbsp;{{ patient.age }}岁
						</view>
						<view class="inner-right text" style="flex: 1.5; color: #7A7E83;">{{ patient.inTime }}</view>
					</view>
					<view class="uni-card-content-inner uni-flex uni-row" style="padding-top: 0;">
						<view class="mszd text">
							{{ patient.MSZD }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height:80upx;"></view>
    </view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import kftools from '../../common/kftools.js'
	import * as mutationConstants from '../../store/modules/patientList/mutations.js'
	import * as actionConstants from '../../store/modules/patientList/actions.js'
	
    export default {
        data() {
            return {
				
            }
        },
		computed: {
			departmentName() {
				return uni.getStorageSync('DepartmentName')
			},
			...mapGetters({
				'patients': 'patients',
			})
		},
		onLoad() {
			uni.hideLoading()
			uni.showLoading({
				title: '数据获取中...'
			})
			this.$store.dispatch(actionConstants.PAGE_INIT)
				.then(() => {
					setTimeout(() => {
						uni.hideLoading()
					},1000)
				})
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.initData();
		},
		methods: {
			initData(){
				setTimeout(() => {
					this.$store.dispatch(actionConstants.PAGE_INIT)
								.then(() => {
									uni.stopPullDownRefresh();
								})
				}, 300);
			},
			setDate() {
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
			},
			goDetail: function (e) {
				uni.navigateTo({
					url: "../patientDetail/patientDetail?detail=" + encodeURIComponent(JSON.stringify(e))
				})
			},
		},
    }
</script>

<style>
	.uni-card { margin-top:50upx; }
	.card-border { border-left: 5upx solid; }
	.inner-left { text-align: left; }
	.inner-right { text-align: right; }
	.text { margin:0 10upx; padding: 0 20upx; height: 50upx; line-height: 50upx; font-size: 26upx; }
	.mszd { width: 100%; min-height: 150upx; font-size: 30upx; color: #7A7E83; background-color: #efeff4; padding: 20upx; }
    .page { padding-top: 60upx; background: #efeff4; }
    .image-view { height: 480upx; overflow: hidden; }
    .image { width: 100%; }
</style>