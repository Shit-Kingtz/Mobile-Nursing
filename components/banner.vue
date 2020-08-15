<template>
	<view class="page">
		<view class="uni-card" style="margin-top: -1upx;">
			<view class="uni-card-content" style="background-color: #32CD32;color: #fff;">
				<view class="uni-card-content-inner">
					<view class="bedNO">{{ patient.BedNO }}</view>
					<view class="patientName">{{ patient.PaientName }}</view>
					<view class="location">{{ patient.DeptID }}&nbsp;/&nbsp;{{ patient.ZYHM }}</view>
				</view>
			</view>
			<view class="uni-card-footer mszd">{{ patient.MSZD ? patient.MSZD : '-' }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "banner",
		props: {
			patient: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
	}
</script>

<style>
	.banner { overflow: hidden; position: relative; background-color: #32CD32; }
	.banner-title { max-height: 84upx; overflow: hidden; position: absolute; left: 30upx; bottom: 30upx; width: 90%; font-size: 32upx; font-weight: 400; line-height: 42upx; color: white; z-index: 11; }
	.bedNO { display: inline-block; width: 49%; text-align: right; font-size: xx-large; padding-right: 5upx; }
	.patientName { display: inline-block; width: 49%; text-align: left; font-size: x-large; padding-left: 5upx; }
	.location { text-align: center;}
	.mszd { background-color: #3CB371;color: #fff; padding: 20upx 50upx;}
</style>
