<template>
	<view>
		<banner :patient="info"></banner>
		
		<view class="uni-tab-bar">
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft" scroll-with-animation>
				<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
				 :data-current="index" @click="tapTab(index)" :style="tabIndex==index ? 'color: #32CD32' : ''">{{tab.name}}</view>
			</scroll-view>
			<swiper :current="tabIndex" class="page swiper-box" duration="300" @change="changeTab" style="height: 660upx;">
				<swiper-item v-for="(tab,index1) in assessmentList" :key="index1">
					<view class="no-data" v-if="tab.noData">
						暂无数据
					</view>
					<scroll-view class="list" scroll-y style="height: 660upx">
						<block v-for="(item,index2) in tab.data" :key="index2">
							<card-list :item="item" :type="tab.type" @click="actionSheetTap(index1,index2)"></card-list>
						</block>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../../store/modules/assessmentList/mutations.js'
	import * as actionConstants from '../../../store/modules/assessmentList/actions.js'
	
	import cardList from '../../../components/card-list.vue'
	
	export default {
		components: {
			cardList,
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
				'info', 'assessmentList', 'tabBars', 'isFromSubmit'
			])
		},
		onLoad: function(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			let info
			try {
				info = JSON.parse(decodeURIComponent(event.detail));
			} catch (error) {
				info = JSON.parse(event.detail);
			}
			console.log(JSON.stringify(info))
			this.$store.dispatch(actionConstants.ASSESSMENTLIST_INIT, {info})
		},
		onShow: function(){
			if (this.isFromSubmit) {
				this.$store.dispatch(actionConstants.ASSESSMENTLIST_INIT, {info: this.info})
			}
			this.$store.commit(mutationConstants.SET_IS_FROM_SUBMIT_FALSE)
		},
		onNavigationBarButtonTap: function(e){
			let url  = '',
				info = encodeURIComponent(JSON.stringify(this.info))
			
			switch (this.tabIndex) {
				case 0:
					url = "../inPatient/inPatient?type=create&info=" + info
					break
				case 1:
					url = "../grading/grading?type=create&info=" + info
					break
				case 2:
					url = "../PHQ9/PHQ9?type=create&info=" + info
					break
				case 3:
					url = "../GAD7/GAD7?type=create&info=" + info
					break
				case 4:
					url = "../bladder/bladder?type=create&info=" + info
					break
				case 5:
					url = "../intestinal/intestinal?type=create&info=" + info
					break
				case 6:
					url = "../nutrition/nutrition?type=create&info=" + info
					break
				case 7:
					url = "../risk/risk?type=create&info=" + info
					break
				case 8:
					url = "../MEWS/MEWS?type=create&info=" + info
					break
			}
			uni.navigateTo({ url: url })
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
										self.$store.dispatch(actionConstants.ASSESSMENTLIST_DELETE, {index1, index2})
									}
								}
							})
						} else {
							this.$store.commit(mutationConstants.SHOW_LOADING)
							let url		= '',
								info    = encodeURIComponent(JSON.stringify(this.info)), 
								content = encodeURIComponent(JSON.stringify(this.assessmentList[index1].data[index2]))
							
							switch (index1){
								case 0:
									url = "../inPatient/inPatient?type=edit&info=" + info + "&content=" + content
									break
								case 1:
									url = "../grading/grading?type=edit&info=" + info + "&content=" + content
									break
								case 2:
									url = "../PHQ9/PHQ9?type=edit&info=" + info + "&content=" + content
									break
								case 3:
									url = "../GAD7/GAD7?type=edit&info=" + info + "&content=" + content
									break
								case 4:
									url = "../bladder/bladder?type=edit&info=" + info + "&content=" + content
									break
								case 5:
									url = "../intestinal/intestinal?type=edit&info=" + info + "&content=" + content
									break
								case 6:
									url = "../nutrition/nutrition?type=edit&info=" + info + "&content=" + content
									break
								case 7:
									url = "../risk/risk?type=edit&info=" + info + "&content=" + content
									break
								case 8:
									url = "../MEWS/MEWS?type=edit&info=" + info + "&content=" + content
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
			}
			
		}
	}
</script>

<style>
	
</style>
