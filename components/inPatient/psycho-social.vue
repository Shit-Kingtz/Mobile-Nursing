<template>
	<view class="swiper-item uni-column">
		<view class="uni-list uni-input-group uni-common-mt">
			<view class="uni-list-cell uni-input-row">
				<label>心理表现</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="MentalChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in MentalOptions" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
								<view>{{ item.label }}</view>
							</label>
						</checkbox-group>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="MentalNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="MentalObj.MentalNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>对疾病认识</label>
				<view class="list-cell-content" @click="showViewPointPicker">
					<view class="uni-input">{{ ViewPointObj ? ViewPointObj.ViewPointText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>备注</label>
				<view class="list-cell-content">
					<input class="uni-input" name="ViewPointNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="ViewPointObj.ViewPointNote"
							@focus="InputFocus" @blur="InputBlur"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>住院顾虑</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="ConcernsChange" :checked="ConcernsObj && ConcernsObj.Concerns == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="ConcernsObj && ConcernsObj.Concerns == 2">
				<label>顾虑类型</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="ConcernsNoteChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in ConcernsNoteOptions" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
								<view>{{ item.label }}</view>
							</label>
						</checkbox-group>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="ConcernsNote1" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="ConcernsObj.ConcernsNote1"
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
		name: 'psycho-social-tab',
		data() {
			return {};
		},
		computed: {
			...mapGetters([
				'MentalObj', 'MentalOptions', 'ViewPointObj', 'ViewPointOptions', 'ConcernsObj', 'ConcernsOptions', 'ConcernsNoteOptions',
			])
		},
		methods: {
			showViewPointPicker() {
				this.$store.commit(mutationConstants.PSYCHO_SOCIAL_VIEW_POINT_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			ConcernsChange(e) {
				this.$store.commit(mutationConstants.PSYCHO_SOCIAL_CONCERNS_SWITCH_CHANGE, e);
			},
			MentalChange(e) {
				this.$store.commit(mutationConstants.PSYCHO_SOCIAL_MENTAL_CHECKBOX_CHANGE, e);
			},
			ConcernsNoteChange(e) {
				this.$store.commit(mutationConstants.PSYCHO_SOCIAL_CONCERNS_NOTE_CHECKBOX_CHANGE, e);
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
