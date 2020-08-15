<template>
	<view class="swiper-item uni-column">
		<view class="uni-list uni-input-group uni-common-mt">
			<view class="uni-list-cell uni-input-row">
				<label>姓名</label>
				<view class="list-cell-content">
					<view class="uni-input">{{ info.PaientName }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>性别</label>
				<view class="list-cell-content">
					<view class="uni-input">{{ info.Sex }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>年龄</label>
				<view class="list-cell-content">
					<view class="uni-input">{{ info.age }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>入院时间</label>
				<view class="list-cell-content">
					<view class="uni-input">{{ info.inTime }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>入院方式</label>
				<view class="list-cell-content" @click="showHospitalizedTypePicker">
					<view class="uni-input">{{ HospitalizedTypeObj ? HospitalizedTypeObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="HospitalizedTypeObj && HospitalizedTypeObj.HospitalizedType == 7">
				<label>入院方式内容</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="HospitalizedTypeObj.HospitalizedNote"/> 
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>文化程度</label>
				<view class="list-cell-content" @click="showEducationPicker">
					<view class="uni-input">{{ EducationObj ? EducationObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>职业</label>
				<view class="list-cell-content">
					<input class="uni-input" name="Occupation" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="Occupation"
							@focus="InputFocus" @blur="InputBlur"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>民族</label>
				<view class="list-cell-content" @click="showEthnicGroupPicker">
					<view class="uni-input">{{ EthnicGroupObj ? EthnicGroupObj.label : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>宗教信仰</label>
				<view class="list-cell-content" @click="showFaithsPicker">
					<view class="uni-input">{{ FaithsObj ? FaithsObj.Text : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>入院诊断</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<text>{{ info.MSZD }}</text>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>既往史</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="PastIllnessChange" :checked="PastIllnessObj && PastIllnessObj.PastIllness == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="PastIllnessObj && PastIllnessObj.PastIllness == 2">
				<label>既往史内容</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="PastIllnessObj.PastIllnessNote"/> 
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>遗传病史</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="FamilialChange" :checked="FamilialObj && FamilialObj.Familial == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="FamilialObj && FamilialObj.Familial == 2">
				<label>遗传病史内容</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="FamilialObj.FamilialNote"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>过敏史</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="AllergicChange" :checked="AllergicObj && AllergicObj.Allergic == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="AllergicObj && AllergicObj.Allergic == 2">
				<label>药物过敏史</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="AllergicObj.AllergicDrugs"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="AllergicObj && AllergicObj.Allergic == 2">
				<label>食物过敏史</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="AllergicObj.AllergicFood"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>导管</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="CatheterChange" :checked="CatheterObj && CatheterObj.Catheter == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="CatheterObj && CatheterObj.Catheter == 2">
				<label>导管内容</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="CatheterObj.CatheterNote"/>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>爱好</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="HobbyChange" :checked="HobbyObj && HobbyObj.Hobby == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="HobbyObj && HobbyObj.Hobby == 2">
				<label>爱好内容</label>
				<view class="list-cell-content">
					<view class="uni-textarea">
						<textarea @focus="InputFocus" @blur="InputBlur" v-model="HobbyObj.HobbyNote"/>
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
	
	import kftools from '../../common/kftools.js'

	export default {
		name: 'general-tab',
		props: {
			info: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		data() {
			return {};
		},
		computed: {
			...mapGetters([
				'HospitalizedTypeObj', 'HospitalizedTypeOptions', 'EducationObj', 'EducationOptions', 'EthnicGroupObj', 'EthnicGroupOptions',
				'FaithsObj', 'FaithsOptions', 'PastIllnessObj', 'PastIllnessOptions', 'FamilialObj', 'FamilialOptions', 'AllergicObj', 
				'AllergicOptions', 'CatheterObj', 'CatheterOptions', 'HobbyObj', 'HobbyOptions',
				'Occupation',
			])
		},
		methods: {
			showHospitalizedTypePicker() {
				this.$store.commit(mutationConstants.GENERAL_HOSPITALIZEDTYPE_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showEducationPicker() {
				this.$store.commit(mutationConstants.GENERAL_EDUCATION_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showEthnicGroupPicker() {
				this.$store.commit(mutationConstants.GENERAL_ETHNICGROUP_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showFaithsPicker() {
				this.$store.commit(mutationConstants.GENERAL_FAITHS_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			PastIllnessChange(e) {
				this.$store.commit(mutationConstants.GENERAL_PASTILLNESS_SWITCH_CHANGE, e);
			},
			FamilialChange(e) {
				this.$store.commit(mutationConstants.GENERAL_FAMILIAL_SWITCH_CHANGE, e);
			},
			AllergicChange(e) {
				this.$store.commit(mutationConstants.GENERAL_ALLERGIC_SWITCH_CHANGE, e);
			},
			CatheterChange(e) {
				this.$store.commit(mutationConstants.GENERAL_CATHETER_SWITCH_CHANGE, e);
			},
			HobbyChange(e) {
				this.$store.commit(mutationConstants.GENERAL_HOBBY_SWITCH_CHANGE, e);
			},
			InputFocus() {
				this.$emit('InputFocusOrBlur')
			},
			InputBlur() {
				this.$emit('InputFocusOrBlur')
			}
		},
	}
</script>

<style>
	.list-cell-content { width: 60%; }
	.list-cell-content .uni-textarea { width: 90%; margin-left: 15upx; }
</style>
