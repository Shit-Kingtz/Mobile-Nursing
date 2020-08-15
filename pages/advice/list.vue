<template>
	<view class="page">
		<banner :patient="info"></banner>
		
		<view class="uni-list">
			<view class="uni-list-cell uni-input-row">
				<label>医嘱类型</label>
				<view class="list-cell-content" @click="showAdviceTypePicker">
					<view class="uni-input">{{ AdviceTypeObj.label }}</view>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="uni-flex uni-row">
				<view class="Advice-label" style="color: #a94442;">● 药物医嘱</view>
				<view class="Advice-label" style="color: #31708f;">● 诊疗医嘱</view>
				<view class="Advice-label" style="color: #3c763d;">● 其他医嘱</view>

			</view>
			<view class="no-data" v-if="hasAdvice" style="height: 215upx;">
				暂无内容
			</view>
			
			<view class="uni-flex uni-column Advice-item" :class="item.className" v-for="(item, i) in showList" :key="i">
				<view class="flex-item flex-item-V uni-flex uni-row">
					<view class="text" style="width: 180upx; font-weight: bold;">名称</view>
					<view class="text" style="flex: 3; font-weight: bold">{{ item.YZMC }}</view>
				</view>
				<view class="flex-item flex-item-V uni-flex uni-row">
					<view class="text" style="flex: 1; height: 100upx; line-height: 48upx;">开嘱时间</view>
					<view class="text" style="flex: 1; height: 100upx; line-height: 48upx;">{{ item.KZSJ }}</view>
					<view class="text" style="flex: 1; height: 100upx; line-height: 48upx;">停嘱时间</view>
					<view class="text" style="flex: 1; height: 100upx; line-height: 48upx;">{{ item.TZSJ }}</view>
				</view>
				<view class="flex-item flex-item-V uni-flex uni-row">
					<view class="text" style="flex: 1;">一次剂量</view>
					<view class="text" style="flex: 1;">{{ item.YCJL }}</view>
					<view class="text" style="flex: 1;">使用频次</view>
					<view class="text" style="flex: 1;">{{ item.SYPC }}</view>
				</view>
				<view class="flex-item flex-item-V uni-flex uni-row">
					<view class="text" style="flex: 1;">总量</view>
					<view class="text" style="flex: 1;">{{ item.ZL }}</view>
					<view class="text" style="flex: 1;">单位</view>
					<view class="text" style="flex: 1;">{{ item.ZLDW }}</view>
				</view>
			</view>
		</view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" 
			@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../store/modules/adviceList/mutations.js'
	import * as actionConstants from '../../store/modules/adviceList/actions.js'
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue'

	export default {
		components: {
			mpvuePicker,
		},
	    data() {
			return {
				title: '',
				ZYH: '',
				ZYHM: '',
				type: '',
				info: {},
	        }
	    },
		computed: {
			hasAdvice () {
				return this.showList.length == 0
			},
			...mapGetters([
				'AdviceTypeObj', 'showList', 'adviceList'
			]),
			...mapGetters({
				themeColor: 'AdviceTemeColor',
				pickerValueArray: 'AdvicePickerValueArray', 
				mode: 'AdviceMode', 
				deepLength: 'AdviceDeepLength', 
				pickerValueDefault: 'AdvicePickerValueDefault'
			})
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.type = decodeURIComponent(event.type)
				this.info = JSON.parse(decodeURIComponent(event.detail))
			} catch (error) {
				this.type = event.type
				this.info = JSON.parse(event.detail)
			}
			this.ZYH   = this.info.ZYH
			this.ZYHM  = this.info.ZYHM
			this.title = this.type == 'SO' ? '长期医嘱查询' : '临时医嘱查询'
			console.log(JSON.stringify(this.info))
			uni.setNavigationBarTitle({ title: this.title })
			
			this.$store.dispatch(actionConstants.ADVICE_INIT, {info: this.info, type: this.type})
		},
		methods: {
			onConfirm(e) {
				console.log(JSON.stringify(e))
				this.$store.commit(mutationConstants.PICKER_CONFIRM, e)
			},
			onCancel(e) {
				console.log(JSON.stringify(e))
			},
			showAdviceTypePicker() {
				this.$store.commit(mutationConstants.ADVICE_TYPE_PICKER_OPEN);
				this.$refs.mpvuePicker.show()
			}
		},
		onBackPress() {
			// 返回按钮监听
			
			// return true;
		}
	}
</script>

<style>
	.content { margin-top: 40upx; padding-bottom: 300upx;}
	.Advice-label { padding: 20upx; }
	.Advice-item { background-color: #FFFFFF; margin: 20upx; border-bottom: 1upx solid #d6d6d6 }
	.flex-item { width: 33.3%; text-align: center; }
	.flex-item-V { width: 100%; text-align: center; }
	.text{ padding: 0 20upx; height: 70upx; line-height: 70upx; text-align: left; color: #777; font-size: 26upx; box-sizing: border-box; }
	
	.drug { border: 1upx solid; background-color: #f2dede; border-color: #ebccd1; color: #a94442; }
	.treatment { border: 1upx solid; background-color: #d9edf7; border-color: #bce8f1; color: #31708f; }
	.other { border: 1upx solid; background-color: #dff0d8; border-color: #d6e9c6; color: #3c763d; }
	
	.list-cell-content { width: 60%; }
</style>
