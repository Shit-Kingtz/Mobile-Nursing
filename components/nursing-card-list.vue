<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-card" hover-class="uni-card-hover" @click="actionSheetTap" v-if="type == 'fall' || type == 'ulcer'">
				<view class="uni-card-content">
					<view class="uni-card-content-inner">
						总分：{{ item.Score }}
					</view>
				</view>
				<view class="uni-card-footer">
					<view class="">评估护士：{{ item.EmployeeName }}</view>
					<view class="">评估时间：{{ CollectionDate }}</view>
				</view>
			</view>
			<view class="uni-card" hover-class="uni-card-hover" @click="actionSheetTap" v-else-if="type == 'fallSupervisor' || type == 'ulcerSupervisor'">
				<view class="uni-card-content">
					<view class="uni-card-content-inner">
						总分：{{ item.Score }}
						<view class="Intervention-item">
							<uni-badge text="落实" type="success" v-if="item.Intervention == '落实'" ></uni-badge>
							<uni-badge text="未到位" type="danger" v-else></uni-badge>
						</view>
					</view>
				</view>
				<view class="uni-card-footer">
					<view class="">预报者：{{ item.EmployeeName }}</view>
				</view>
			</view>
			<view class="uni-card" hover-class="uni-card-hover" @click="actionSheetTap" v-else>
				<view class="uni-card-content">
					<view class="uni-card-content-inner" style="padding-bottom: 0;">
						转入时间：{{ item.TransferTime }}
					</view>
					<view class="uni-card-content-inner" style="padding-top: 0;">
						转入科室：{{ item.ConfirmDepartIn }}
					</view>
					<view class="uni-card-content-inner" style="padding-bottom: 0;">
						接收者：{{ item.ConfirmPersonIn }}
					</view>
					<view class="uni-card-content-inner" style="padding-top: 0;">
						转出科室：{{ item.ConfirmDepartOut }}
					</view>
					<view class="uni-card-content-inner" style="padding-bottom: 0;">
						交班者：{{ item.ConfirmPersonOut }}
					</view>
					<view class="uni-card-content-inner" style="padding-top: 0;">
						诊断：{{ item.Diagnosis }}
					</view>
					<view class="uni-card-content-inner" style="padding-bottom: 0;">
						身份确认：{{ item.IdentityConfirmationStrArr }}
					</view>
					<view class="uni-card-content-inner" style="padding-top: 0;">
						意识形态：{{ item.ConsciousnessState }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import kftools from '../common/kftools.js'
	import uniBadge from './uni-badge.vue'
	
	export default {
		name: "nursing-card-list",
		components: {
			uniBadge
		},
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
			CollectionDate() {
				return kftools.formatDate(this.item.CollectionDate, 'yyyy-MM-dd')
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
	.Intervention-item { float: right; }
</style>
