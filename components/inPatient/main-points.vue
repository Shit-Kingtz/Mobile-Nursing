<template>
	<view class="swiper-item uni-column">
		<view class="uni-list uni-input-group uni-common-mt">
			<view class="uni-list-cell uni-input-row">
				<label>要点内容</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="NursingPointChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in NursingPointOptions" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
								<view>{{ item.label }}</view>
							</label>
						</checkbox-group>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="NursingPointNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="NursingPointObj.NursingPointNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
				</view>
			</view>
		</view>
	 </view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as mutationConstants from '../../store/modules/inPatient/mutations.js'
	import * as actionConstants from '../../store/modules/inPatient/actions.js'
	
	export default {
		name: 'main-points-tab',
		data() {
			return {};
		},
		computed: {
			...mapGetters([
				'NursingPointObj', 'NursingPointOptions',
			])
		},
		methods: {
			NursingPointChange: function (e) {
				this.$store.commit(mutationConstants.MAIN_POINTS_NURSING_POINT_CHECKBOX_CHANGE, e);
			},
			InputFocus() {
				this.$emit('InputFocusOrBlur')
			},
			InputBlur() {
				this.$emit('InputFocusOrBlur')
			},
		},
	}
</script>

<style>
	.list-cell-content { width: 60%; }
	.list-cell-content .uni-textarea { width: 90%; margin-left: 15upx; }
</style>
