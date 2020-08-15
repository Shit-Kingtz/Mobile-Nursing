<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-card" hover-class="uni-card-hover" @click="actionSheetTap">
				<view class="uni-card-content">
					<view class="uni-card-content-inner" style="padding-bottom: 0;">
						评估护士：{{ EmployeeName }}
					</view>
					<view class="uni-card-content-inner" style="padding-top: 0;">
						{{ content }}
					</view>
				</view>
				<view class="uni-card-footer">
					<view class="">评估时间：{{ CollectionDate }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import kftools from '../common/kftools.js'
	export default {
		name: "card-list",
		props: {
		    item: {
		        type: Object,
		        default: function(e) {
		            return {}
		        }
		    },
			type: {
				type: String,
				default: ''
			}
		},
		computed: {
			content() {
				if (this.type == 'grading' || this.type == 'MEWS') {
					return '评分：' + this.item.AssessScore
				} else if (this.type == 'PHQ9') {
					return '评分：' + (this.item.IncidenceLevel == 6 ? '病人不愿配合，无法评定' : this.item.AssessScore)	
				} else if (this.type == 'GAD7') {
					return '评分：' + (this.item.IncidenceLevel == 5 ? '病人不愿配合，无法评定' : this.item.AssessScore)
				} else if (this.type == 'nutrition') {
					return '评分：' + this.item.AssessSoruce
				} else {
					return ''
				}
			},
			EmployeeName() {
				return this.type == 'risk' ? this.item.NurseName : this.item.EmployeeName
			},
			CollectionDate() {
				return this.type == 'risk' ? kftools.formatDate(this.item.EvaluationDate, 'yyyy-MM-dd') : kftools.formatDate(this.item.CollectionDate, 'yyyy-MM-dd')
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
