<template>
	<view>
		<banner :patient="info"></banner>
		
		<view class="page" style="margin-top: -15upx;">
			<scroll-view class="list" scroll-y style="height: 775upx;">
				<view class="no-data" v-if="EduList.length == 0" style="line-height: 775upx;">
					暂无数据
				</view>
				<view v-for="(item, i) in EduList" :key="i">
					<edu-card-list :item="item" @click="actionSheetTap(i)"></edu-card-list>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../store/modules/eduList/mutations.js'
	import * as actionConstants from '../../store/modules/eduList/actions.js'
	import * as listMutationConstants from '../../store/modules/assessmentList/mutations.js'
	import eduCardList from '../../components/edu-card-list.vue'
	
	export default {
		components: {
			eduCardList
		},
		data() {
			return {
				info: {},
				deptArray: ['三病区', '四病区']
			}
		},
		computed: {
			...mapGetters([
				'EduList', 
			]),
			...mapGetters({
				isFromSubmit: 'EduIsFromSubmit'
			})
		},
		onLoad: function(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.info = JSON.parse(decodeURIComponent(event.detail));
			} catch (error) {
				this.info = JSON.parse(event.detail);
			}
			console.log(JSON.stringify(this.info))
			this.$store.dispatch(actionConstants.EDU_LIST_INIT, {info: this.info})
		},
		onShow: function(){
			if (this.isFromSubmit) {
				this.$store.dispatch(actionConstants.EDU_LIST_INIT, {info: this.info})
			}
			this.$store.commit(mutationConstants.SET_IS_FROM_SUBMIT_FALSE)
		},
		onNavigationBarButtonTap: function(e){
			let info = encodeURIComponent(JSON.stringify(this.info)),
				url = this.deptArray.findIndex((element) => element == this.info.DeptID) == -1 ? 
						'../edu/edu5?type=create&info=' + info : 
						'../edu/edu34?type=create&info=' + info
			
			uni.navigateTo({ url: url })
	    },
		methods: {
			actionSheetTap(index) {
				let self = this
				uni.showActionSheet({
					itemList: ['编辑/查看', '删除'],
					success: (e) => {
						if (e.tapIndex == 1) {
							uni.showModal({
								content: '是否删除本条信息？',
								success: (res) => {
									if (res.confirm) {
										self.$store.dispatch(actionConstants.EDU_LIST_DELETE, index)
									}
								}
							})
						} else {
							this.$store.commit(listMutationConstants.SHOW_LOADING)
							let info    = encodeURIComponent(JSON.stringify(this.info)), 
								content = encodeURIComponent(JSON.stringify(this.EduList[index])),
								url		= this.deptArray.findIndex((element) => element == this.info.DeptID) == -1 ? 
											'../edu/edu5?type=edit&info=' + info + "&content=" + content: 
											'../edu/edu34?type=edit&info=' + info + "&content=" + content
							
							uni.navigateTo({ url: url })
						}
						
					}
				})
			},
		}
	}
</script>

<style>
	.scroll-view-item {
		height: 760upx;
		line-height: 760upx;
		text-align: center;
		font-size: 36upx;
	}
</style>
