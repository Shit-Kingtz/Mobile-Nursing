<template>
	<view>
		<banner :patient="info"></banner>
		
		<view class="uni-tab-bar">
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft" scroll-with-animation>
				<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
				 :data-current="index" @click="tapTab(index)" :style="tabIndex==index ? 'color: #32CD32' : ''">{{tab.name}}</view>
			</scroll-view>
			<swiper :current="tabIndex" class="page swiper-box" duration="300" @change="changeTab" style="height: 660upx;">
				<swiper-item v-for="(tab,index1) in NursingList" :key="index1">
					<view class="no-data" v-if="tab.noData">
						暂无数据
					</view>
					<scroll-view class="list" scroll-y style="height: 660upx">
						<block v-for="(item,index2) in tab.data" :key="index2">
							<nursing-card-list :item="item" :type="tab.type" @click="actionSheetTap(index1,index2)"></nursing-card-list>
						</block>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../../store/modules/nursingList/mutations.js'
	import * as actionConstants from '../../../store/modules/nursingList/actions.js'
	import * as listMutationConstants from '../../../store/modules/assessmentList/mutations.js'
	
	import nursingCardList from '../../../components/nursing-card-list.vue'
	
	export default {
		components: {
			nursingCardList
		},
		data() {
			return {
				tabIndex: 0, 
				scrollLeft: 0, 
				isClickChange: false, 
			}
		},
		computed: {
			...mapGetters([
				'info', 'NursingList'
			]),
			...mapGetters({
				tabBars: 'NursingTabBars',
				isFromSubmit: 'NursingIsFromSubmit'
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
			this.$store.dispatch(actionConstants.NURSINGLIST_INIT, {info: this.info})
		},
		onShow: function(){
			if (this.isFromSubmit) {
				this.$store.dispatch(actionConstants.NURSINGLIST_INIT, {info: this.info})
			}
			this.$store.commit(mutationConstants.SET_IS_FROM_SUBMIT_FALSE)
		},
		onNavigationBarButtonTap: function(e){
			let url  = '', hs = 0,
				info = encodeURIComponent(JSON.stringify(this.info))
			
			switch (this.tabIndex) {
				case 0:
					uni.navigateTo({ url: "../nurseRecording/nurseRecording?type=create&info=" + info + "&fromAssess=0" })
					break
				case 1:
					if (!this.NursingList[1].noData) {
						for (let i in this.NursingList[1].data) {
							if (this.NursingList[1].data[i].Outcome2 == '') {
								hs = 1
								break
							}
						}
					}
					uni.navigateTo({ url: "../fall/fall?type=create&info=" + info + "&haveSupervisor=" + hs })
					break
				case 2:
					if (!this.NursingList[1].noData) {
						uni.showModal({
							content: '预报表只会出现一张，确定要继续添加吗？',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({ url: "../fallSupervisor/fallSupervisor?type=create&info=" + info + "&fromAssess=0" })
								}
							}
						})
					} else {
						uni.navigateTo({ url: "../fallSupervisor/fallSupervisor?type=create&info=" + info + "&fromAssess=0" })
					}
					break
				case 3:
					if (!this.NursingList[3].noData) {
						for (let i in this.NursingList[3].data) {
							if (this.NursingList[3].data[i].Outcome2 == '') {
								hs = 1
								break
							}
						}
					}
					uni.navigateTo({ url: "../ulcer/ulcer?type=create&info=" + info + "&haveSupervisor=" + hs })
					break
				case 4:
					if (!this.NursingList[3].noData) {
						uni.showModal({
							content: '预报表只会出现一张，确定要继续添加吗？',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({ url: "../ulcerSupervisor/ulcerSupervisor?type=create&info=" + info + "&fromAssess=0" })
								}
							}
						})
					} else {
						uni.navigateTo({ url: "../ulcerSupervisor/ulcerSupervisor?type=create&info=" + info + "&fromAssess=0" })
					}
					break
				case 5:
					uni.navigateTo({ url: "../transfer/transfer?type=create&info=" + info + "&fromAssess=0" })
					break
			}
	    },
		methods: {
			actionSheetTap(index1, index2) {
				let self = this
				uni.showActionSheet({
					itemList: ['编辑/查看', '删除'],
					success: (e) => {
						if (e.tapIndex == 1) {
							uni.showModal({
								content: '是否删除本条信息？',
								success: (res) => {
									if (res.confirm) {
										self.$store.dispatch(actionConstants.NURSINGLIST_DELETE, {index1, index2})
									}
								}
							})
						} else {
							// this.$store.commit(listMutationConstants.SHOW_LOADING)
							let url		= '',
								info    = encodeURIComponent(JSON.stringify(this.info)), 
								content = encodeURIComponent(JSON.stringify(this.NursingList[index1].data[index2]))
							
							switch (index1){
								case 0:
									url = "../fall/fall?type=edit&info=" + info + "&content=" + content
									break
								case 1:
									url = "../fallSupervisor/fallSupervisor?type=edit&info=" + info + "&content=" + content
									break
								case 2:
									url = "../ulcer/ulcer?type=edit&info=" + info + "&content=" + content
									break
								case 3:
									url = "../ulcerSupervisor/ulcerSupervisor?type=edit&info=" + info + "&content=" + content
									break
								case 4:
									url = "../transfer/transfer?type=edit&info=" + info + "&content=" + content
									break
							}
							uni.navigateTo({ url: url })
						}
						
					}
				})
			},
			async changeTab(e) {
				let index = e.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
		
				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
				}
			},
		}
	}
</script>

<style>
</style>
