<template>
	<view class="swiper-item uni-column">
		<view class="uni-list uni-input-group uni-common-mt">
			<view class="uni-list-cell uni-input-row">
				<label>意识状况</label>
				<view class="list-cell-content" @click="showConsciousnessPicker">
					<view class="uni-input">{{ ConsciousnessObj ? ConsciousnessObj.ConsciousnessText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>生命体征</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<label>T(℃)</label>
						<view class="list-cell-content">
							<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="Temperature"></uni-number-box>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>P(次/分)</label>
						<view class="list-cell-content">
							<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="Pulse"></uni-number-box>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>R(次/分)</label>
						<view class="list-cell-content">
							<uni-number-box :min="0" @focus="InputFocus" @blur="InputBlur" v-model="Respiratory"></uni-number-box>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>BP(mmHg)</label>
						<view class="list-cell-content">
							<input class="uni-input" name="BloodPressure" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="BloodPressure"
									@focus="InputFocus" @blur="InputBlur" />
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>皮肤状况</label>
				<view class="list-cell-content">
					<checkbox-group @change="SkinChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in SkinOptions" :key="item.value">
							<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
							<view>{{ item.label }}</view>
						</label>
					</checkbox-group>
					<button class="mini-btn addBtn" size="mini" @click="insertItem">添加新数据</button>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="SkinList.length !== 0">
				<label>皮肤状况详情</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row" v-for="(item, i) in SkinDetails" :key="i">
						<view>
							<view class="uni-input" v-for="(content, j) in item" :key="j" style="display: inline-block;">{{ content }}</view>
						</view>
						<view class="uni-icon uni-icon-clear" style="color: #BEBEBE" @click="deleteItem(i)"></view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>语言交流</label>
				<view class="list-cell-content" @click="showLanguagePicker">
					<view class="uni-input">{{ LanguageObj ? LanguageObj.LanguageText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>身体活动</label>
				<view class="list-cell-content" @click="showPhysicalActivityPicker">
					<view class="uni-input">{{ PhysicalActivityObj ? PhysicalActivityObj.PhysicalActivityText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="PhysicalActivityObj && PhysicalActivityObj.PhysicalActivity == 2">
				<label>受限部位</label>
				<view class="list-cell-content">
					<input class="uni-input" name="PhysicalActivityPart" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="PhysicalActivityObj.PhysicalActivityPart"
							@focus="InputFocus" @blur="InputBlur"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>肢体形态</label>
				<view class="list-cell-content" @click="showShapesPicker">
					<view class="uni-input">{{ ShapesObj ? ShapesObj.ShapesText : '' }}</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="ShapesObj && ShapesObj.Shapes == 2">
				<label>异常类型</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<checkbox-group @change="ShapesUnusualChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in ShapesUnusualOptions" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" color="#32CD32" /></view>
								<view>{{ item.label }}</view>
							</label>
						</checkbox-group>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>备注</label>
						<view class="list-cell-content">
							<input class="uni-input" name="ShapesUnusualPart" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="ShapesObj.ShapesUnusualPart"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>辅助器具</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<label>矫形器</label>
						<view class="list-cell-content">
							<switch color="#32CD32" @change="OrthosisChange" :checked="OrthosisObj && OrthosisObj.Orthosis == 2"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="OrthosisObj && OrthosisObj.Orthosis == 2">
						<label>名称</label>
						<view class="list-cell-content">
							<input class="uni-input" name="OrthosisNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="OrthosisObj.OrthosisNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<label>假肢</label>
						<view class="list-cell-content">
							<switch color="#32CD32" @change="ProsthesisChange" :checked="ProsthesisObj && ProsthesisObj.Prosthesis == 2"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="ProsthesisObj && ProsthesisObj.Prosthesis == 2">
						<label>名称</label>
						<view class="list-cell-content">
							<input class="uni-input" name="ProsthesisNote" type="text" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="ProsthesisObj.ProsthesisNote"
									@focus="InputFocus" @blur="InputBlur"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row">
						<view style="width: 100%;">
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="wheelChairChange" :checked="wheelChair"/>
								<view @click="wheelChairLabelClick" style="width: 50%;">轮椅</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="walkingFramesChange" :checked="walkingFrames"/>
								<view @click="walkingFramesLabelClick" style="width: 50%;">助行架</view>
							</view>
							
							<label>手拐</label>
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="handCrutchSingleChange" :checked="handCrutch.single"/>
								<view @click="handCrutchSingleLabelClick" style="width: 50%;">单</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="handCrutchDoubleChange" :checked="handCrutch.double"/>
								<view @click="handCrutchDoubleLabelClick" style="width: 50%;">双</view>
							</view>
							
							<label>腋拐</label>
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="axillaryCrutchSingleChange" :checked="axillaryCrutch.single"/>
								<view @click="axillaryCrutchSingleLabelClick" style="width: 50%;">单</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="axillaryCrutchDoubleChange" :checked="axillaryCrutch.double"/>
								<view @click="axillaryCrutchDoubleLabelClick" style="width: 50%;">双</view>
							</view>
							
							<label>肘拐</label>
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="elbowCrutchSingleChange" :checked="elbowCrutch.single"/>
								<view @click="elbowCrutchSingleLabelClick" style="width: 50%;">单</view>
							</view>
							<view class="uni-list-cell uni-input-row">
								<switch type="checkbox" color="#32CD32" @change="elbowCrutchDoubleChange" :checked="elbowCrutch.double"/>
								<view @click="elbowCrutchDoubleLabelClick" style="width: 50%;">双</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>疼痛（VAS）</label>
				<view class="list-cell-content">
					<switch color="#32CD32" @change="VASChange" :checked="VASObj && VASObj.VAS == 2"/>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row" v-if="VASObj && VASObj.VAS == 2">
				<label>VAS备注</label>
				<view class="list-cell-content">
					<input class="uni-input" name="VASNote" type="number" placeholder="分" placeholder-style="color: #BEBEBE" v-model="VASObj.VASNote"
							@focus="InputFocus" @blur="InputBlur" />
					<view style="color: red;font-size: smaller;">0分：不痛&nbsp;2分：微痛&nbsp;4分：有些痛<br>6分：很痛&nbsp;8分：疼痛剧烈<br>10分：疼痛难忍</view>
				</view>
			</view>
			<view class="uni-list-cell uni-input-row">
				<label>减痛方式</label>
				<view class="list-cell-content">
					<view class="uni-list-cell uni-input-row">
						<label>方法</label>
						<view class="list-cell-content">
							<switch color="#32CD32" @change="PainReliefChange" :checked="PainReliefObj && PainReliefObj.PainRelief == 2"/>
						</view>
					</view>
					<view class="uni-list-cell uni-input-row" v-if="PainReliefObj && PainReliefObj.PainRelief == 2">
						<label>描述</label>
						<view class="list-cell-content">
							<input class="uni-input" name="PainReliefNote" placeholder="请输入" placeholder-style="color: #BEBEBE" v-model="PainReliefObj.PainReliefNote"
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
	import uniNumberBox from '../uni-number-box.vue'
	
	export default {
		name: 'physical-tab',
		components: {
			uniNumberBox
		},
		data() {
			return {};
		},
		computed: {
			...mapGetters([
				'ConsciousnessObj', 'ConsciousnessOptions', 'SkinOptions', 'SkinList', 'SkinDetails', 'LanguageObj', 'LanguageOptions', 'PhysicalActivityObj', 'PhysicalActivityOptions', 
				'ShapesObj', 'ShapesOptions', 'ShapesUnusualOptions', 'OrthosisObj', 'OrthosisOptions', 'ProsthesisObj', 'ProsthesisOptions', 'VASObj', 'VASOptions', 'PainReliefObj', 
				'PainReliefOptions',
				'Temperature', 'Pulse', 'Respiratory', 'BloodPressure', 'wheelChair', 'walkingFrames', 'handCrutch', 'axillaryCrutch', 'elbowCrutch'
			])
		},
		methods: {
			showConsciousnessPicker() {
				this.$store.commit(mutationConstants.PHYSICAL_CONSCIOUSNESS_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showLanguagePicker() {
				this.$store.commit(mutationConstants.PHYSICAL_LANGUAGE_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showPhysicalActivityPicker() {
				this.$store.commit(mutationConstants.PHYSICAL_PHYSICAL_ACTIVITY_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			showShapesPicker() {
				this.$store.commit(mutationConstants.PHYSICAL_SHAPES_PICKER_OPEN);
				this.$emit('showPicker', this.$store.getters)
			},
			OrthosisChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_ORTHOSIS_SWITCH_CHANGE, e);
			},
			ProsthesisChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_PROSTHESIS_SWITCH_CHANGE, e);
			},
			VASChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_VAS_SWITCH_CHANGE, e);
			},
			PainReliefChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_PAINRELIEF_SWITCH_CHANGE, e);
			},
			SkinChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_SKIN_CHECKBOX_CHANGE, e);
			},
			ShapesUnusualChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_SHAPES_UNUSUAL_CHECKBOX_CHANGE, e);
			},
			wheelChairChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_WHEEL_CHAIR_CHECKBOX_CHANGE, e);
			},
			wheelChairLabelClick() {
				this.$store.commit(mutationConstants.PHYSICAL_WHEEL_CHAIR_LABEL_CLICK);
			},
			walkingFramesChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_WALKING_FRAMES_CHECKBOX_CHANGE, e);
			},
			walkingFramesLabelClick() {
				this.$store.commit(mutationConstants.PHYSICAL_WALKING_FRAMES_LABEL_CLICK);
			},
			handCrutchSingleChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_HAND_CRUTCH_SINGLE_CHECKBOX_CHANGE, e);
			},
			handCrutchSingleLabelClick() {
				this.$store.commit(mutationConstants.PHYSICAL_HAND_CRUTCH_SINGLE_LABEL_CLICK);
			},
			handCrutchDoubleChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_HAND_CRUTCH_DOUBLE_CHECKBOX_CHANGE, e);
			},
			handCrutchDoubleLabelClick() {
				this.$store.commit(mutationConstants.PHYSICAL_HAND_CRUTCH_DOUBLE_LABEL_CLICK);
			},
			axillaryCrutchSingleChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_AXILLARY_CRUTCH_SINGLE_CHECKBOX_CHANGE, e);
			},
			axillaryCrutchSingleLabelClick() {
				this.$store.commit(mutationConstants.PHYSICAL_AXILLARY_CRUTCH_SINGLE_LABEL_CLICK);
			},
			axillaryCrutchDoubleChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_AXILLARY_CRUTCH_DOUBLE_CHECKBOX_CHANGE, e);
			},
			axillaryCrutchDoubleLabelClick() {
				this.$store.commit(mutationConstants.PHYSICAL_AXILLARY_CRUTCH_DOUBLE_LABEL_CLICK);
			},
			elbowCrutchSingleChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_ELBOW_CRUTCH_SINGLE_CHECKBOX_CHANGE, e);
			},
			elbowCrutchSingleLabelClick() {
				this.$store.commit(mutationConstants.PHYSICAL_ELBOW_CRUTCH_SINGLE_LABEL_CLICK);
			},
			elbowCrutchDoubleChange(e) {
				this.$store.commit(mutationConstants.PHYSICAL_ELBOW_CRUTCH_DOUBLE_CHECKBOX_CHANGE, e);
			},
			elbowCrutchDoubleLabelClick() {
				this.$store.commit(mutationConstants.PHYSICAL_ELBOW_CRUTCH_DOUBLE_LABEL_CLICK);
			},
			InputFocus() {
				this.$emit('InputFocusOrBlur')
			},
			InputBlur() {
				this.$emit('InputFocusOrBlur')
			},
			insertItem() {
				uni.navigateTo({
					url: "../../assessment/inPatient/skinItem?skinList=" + encodeURIComponent(JSON.stringify(this.SkinList))
				})
			},
			deleteItem(index) {
				let self = this
				console.log(index)
				uni.showModal({
					content: '确定删除该皮肤状况？',
					success: (res) => {
						if (res.confirm) {
							self.$store.commit(mutationConstants.PHYSICAL_DELETE_SKIN_ITEM, index)
						}
					}
				})
			}
		},
	}
</script>

<style>
	.list-cell-content { width: 60%; }
	.list-cell-content .uni-textarea { width: 90%; margin-left: 15upx; }
	.addBtn { background: #32CD32; color: #FFFFFF; margin: 15upx 0 0 20upx; }
</style>
