<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-card" hover-class="uni-card-hover" @click="actionSheetTap">
				<view class="uni-card-content">
					<view class="uni-card-content-inner" style="padding-bottom: 0;">
						评估护士：{{ item.EvaluateName }}
					</view>
					<view class="uni-card-content-inner" style="padding-top: 0;">
						宣教护士：{{ item.ImplementerName }}
					</view>
				</view>
				<view class="uni-card-footer">
					<view class="">评估时间：{{ item.CollectionDate }}</view>
					<view class="">宣教时间：{{ item.EducationDate }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import kftools from '../common/kftools.js'
	export default {
		name: "edu-card-list",
		props: {
		    item: {
		        type: Object,
		        default: function(e) {
		            return {}
		        }
		    }
		},
		methods: {
		    actionSheetTap(e) {
		        this.$emit('click');
		    }
		}
	}
</script>

<style>
</style>
