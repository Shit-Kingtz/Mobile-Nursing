import * as actionConstants from './actions.js'
import * as mutationConstants from './mutations.js'
import * as listMutationConstants from '../assessmentList/mutations.js'
import kftools from '../../../common/kftools.js'
import base from '../../../pages/assessment/inPatient/api/base.js'

const state = {
	now: '',
	themeColor: '#32CD32',
	pickerValueArray: [],
	mode: '',
	deepLength: 1,
	pickerValueDefault: [],
	
	HeadNurseNameObj: {},
	HeadNurseNameOptions: [
		{ type: 'HeadNurseName', value: '刘霞', label: '刘霞' },
		{ type: 'HeadNurseName', value: '吴海燕', label: '吴海燕' },
		{ type: 'HeadNurseName', value: '邹庆霞', label: '邹庆霞' },
	],
	
// 	// 基本资料
// 	Occupation: '',
// 	HospitalizedTypeObj: {},
// 	HospitalizedTypeOptions: [
// 		{ type: 'HospitalizedType', value: 1, label: '步行' },
// 		{ type: 'HospitalizedType', value: 2, label: '搀扶' },
// 		{ type: 'HospitalizedType', value: 3, label: '抱/背' },
// 		{ type: 'HospitalizedType', value: 4, label: '助行器' },
// 		{ type: 'HospitalizedType', value: 5, label: '轮椅' },
// 		{ type: 'HospitalizedType', value: 6, label: '平车' },
// 		{ type: 'HospitalizedType', value: 7, label: '其他' }
// 	],
// 	EducationObj: {},
// 	EducationOptions: [
// 		{ type: 'Education', value: '', label: '请选择' },
// 		{ type: 'Education', value: '大专', label: '大专' },
// 		{ type: 'Education', value: '本科及以上', label: '本科及以上' },
// 		{ type: 'Education', value: '高中', label: '高中' },
// 		{ type: 'Education', value: '初中', label: '初中' },
// 		{ type: 'Education', value: '小学', label: '小学' },
// 		{ type: 'Education', value: '文盲', label: '文盲' }
// 	],
// 	EthnicGroupObj: {},
// 	EthnicGroupOptions: [
// 		{ type: 'EthnicGroup', value: '汉族', label: '汉族' },
// 		{ type: 'EthnicGroup', value: '少数民族', label: '少数民族' },
// 	],
// 	FaithsObj: {},
// 	FaithsOptions: [{
// 		type: 'Faiths', 
// 		value: 1, 
// 		label: '无', 
// 		children: [
// 			{ type: 'Faiths', value: '', label: '无' },
// 		]
// 	},{
// 		type: 'Faiths', 
// 		value: 2, 
// 		label: '有', 
// 		children: [
// 			{ type: 'Faiths', value: '佛教', label: '佛教' },
// 			{ type: 'Faiths', value: '基督教', label: '基督教' },
// 			{ type: 'Faiths', value: '天主教', label: '天主教' },
// 			{ type: 'Faiths', value: '伊斯兰教', label: '伊斯兰教' },
// 			{ type: 'Faiths', value: '道教', label: '道教' },
// 			{ type: 'Faiths', value: '其他', label: '其他' }
// 		]
// 	}],
// 	PastIllnessObj: {},
// 	PastIllnessOptions: [
// 		{ type: 'PastIllness', value: 1, label: '无' },
// 		{ type: 'PastIllness', value: 2, label: '有' },
// 	],
// 	FamilialObj: {},
// 	FamilialOptions: [
// 		{ type: 'Familial', value: 1, label: '无' },
// 		{ type: 'Familial', value: 2, label: '有' },
// 	],
// 	AllergicObj: {},
// 	AllergicOptions: [
// 		{ type: 'Allergic', value: 1, label: '无' },
// 		{ type: 'Allergic', value: 2, label: '有' },
// 	],
// 	CatheterObj: {},
// 	CatheterOptions: [
// 		{ type: 'Catheter', value: 1, label: '无' },
// 		{ type: 'Catheter', value: 2, label: '有' },
// 	],
// 	HobbyObj: {},
// 	HobbyOptions: [
// 		{ type: 'Hobby', value: 1, label: '无' },
// 		{ type: 'Hobby', value: 2, label: '有' },
// 	],
// 	
// 	// 生活自理
// 	Height: '',
// 	Weight: '',
// 	NutritionObj: {},
// 	NutritionOptions: [
// 		{ type: 'Nutrition', value: 1, label: '良好'},
// 		{ type: 'Nutrition', value: 2, label: '一般'},
// 		{ type: 'Nutrition', value: 3, label: '差'},
// 		{ type: 'Nutrition', value: 4, label: '极差'}
// 	],
// 	DietNote: '',
// 	DietOptions: [
// 		{ value: 1, label: '普食'},
// 		{ value: 2, label: '软食'},
// 		{ value: 3, label: '半流质'},
// 		{ value: 4, label: '流质'},
// 		{ value: 5, label: '禁食'},
// 		{ value: 6, label: '治疗饮食'}
// 	],
// 	PreferenceObj: {},
// 	PreferenceOptions: [
// 		{ type: 'Preference', value: 1, label: '无' },
// 		{ type: 'Preference', value: 2, label: '有' },
// 	],
// 	DietingModeObj: {},
// 	DietingModeOptions: [
// 		{ type: 'DietingMode', value: 1, label: '自主进食'},
// 		{ type: 'DietingMode', value: 2, label: '协助进食'},
// 		{ type: 'DietingMode', value: 3, label: '鼻饲'},
// 		{ type: 'DietingMode', value: 4, label: '胃造瘘管'},
// 		{ type: 'DietingMode', value: 5, label: '肠造瘘管'},
// 		{ type: 'DietingMode', value: 6, label: '其他'}
// 	],
// 	SwallowingNote: '',
// 	SwallowingOptions: [
// 		{ type: 'Swallowing', value: 1, label: '正常'},
// 		{ type: 'Swallowing', value: 2, label: '进食缓慢'},
// 		{ type: 'Swallowing', value: 3, label: '吞咽困难'},
// 		{ type: 'Swallowing', value: 4, label: '饮水呛咳'},
// 		{ type: 'Swallowing', value: 5, label: '不能进食'},
// 		{ type: 'Swallowing', value: 6, label: '其他'}
// 	],
// 	SmokeObj: {},
// 	SmokeOptions: [
// 		{ type: 'Smoke', value: 1, label: '无'},
// 		{ type: 'Smoke', value: 2, label: '已戒'},
// 		{ type: 'Smoke', value: 3, label: '有'},
// 	],
// 	DrinkObj: {},
// 	DrinkOptions: [
// 		{ type: 'Drink', value: 1, label: '无'},
// 		{ type: 'Drink', value: 2, label: '已戒'},
// 		{ type: 'Drink', value: 3, label: '有'},
// 	],
// 	DyssomniaObj: {},
// 	DyssomniaExistOptions: [
// 		{ type: 'DyssomniaExist', value: 1, label: '无' },
// 		{ type: 'DyssomniaExist', value: 2, label: '有' },
// 	],
// 	DyssomniaOptions: [
// 		{ type: 'Dyssomnia', value: '难入睡', label: '难入睡'},
// 		{ type: 'Dyssomnia', value: '早醒', label: '早醒'},
// 		{ type: 'Dyssomnia', value: '易醒', label: '易醒'},
// 		{ type: 'Dyssomnia', value: '多梦', label: '多梦'},
// 		{ type: 'Dyssomnia', value: '其他', label: '其他'}
// 	],
// 	SleepAidObj: {},
// 	SleepAidOptions: [
// 		{ type: 'SleepAid', value: 1, label: '无' },
// 		{ type: 'SleepAid', value: 2, label: '有' },
// 	],
// 	UrinationObj: {},
// 	UrinationOptions: [
// 		{ type: 'Urination', value: 1, label: '正常'},
// 		{ type: 'Urination', value: 2, label: '排尿困难'},
// 		{ type: 'Urination', value: 3, label: '尿失禁'},
// 		{ type: 'Urination', value: 4, label: '尿潴留'},
// 		{ type: 'Urination', value: 5, label: '遗尿'},
// 		{ type: 'Urination', value: 6, label: '其他'}
// 	],
// 	UrineObj: {},
// 	UrineOptions: [
// 		{ type: 'Urine', value: 1, label: '正常'},
// 		{ type: 'Urine', value: 2, label: '深黄色'},
// 		{ type: 'Urine', value: 3, label: '血尿'},
// 		{ type: 'Urine', value: 4, label: '浑浊'},
// 		{ type: 'Urine', value: 5, label: '絮状物'},
// 		{ type: 'Urine', value: 6, label: '乳糜尿'},
// 		{ type: 'Urine', value: 7, label: '其他'}
// 	],
// 	AssitanceObj: {},
// 	AssitanceOptions: [
// 		{ type: 'Assitance', value: 1, label: '无' },
// 		{ type: 'Assitance', value: 2, label: '有' },
// 	],
// 	AssitanceToolOptions: [
// 		{ type: 'AssitanceTool', value: 1, label: '留置导尿'},
// 		{ type: 'AssitanceTool', value: 2, label: '间歇导尿'},
// 		{ type: 'AssitanceTool', value: 3, label: '尿布'},
// 		{ type: 'AssitanceTool', value: 4, label: '尿套'},
// 		{ type: 'AssitanceTool', value: 5, label: '保鲜袋'},
// 		{ type: 'AssitanceTool', value: 6, label: '接尿器'},
// 		{ type: 'AssitanceTool', value: 7, label: '膀胱造瘘'},
// 		{ type: 'AssitanceTool', value: 8, label: '其他'}
// 	],
// 	DefecateObj: {},
// 	DefecateOptions: [
// 		{ type: 'Defecate', value: 1, label: '正常'},
// 		{ type: 'Defecate', value: 2, label: '便秘'},
// 		{ type: 'Defecate', value: 3, label: '腹泻'},
// 		{ type: 'Defecate', value: 4, label: '失禁'},
// 	],
// 	DefecateDrugObj: {},
// 	DefecateDrugOptions: [
// 		{ type: 'DefecateDrug', value: 1, label: '无'},
// 		{ type: 'DefecateDrug', value: 2, label: '有'},
// 		{ type: 'DefecateDrug', value: 3, label: '其他'},
// 	],
// 	StoolConsistencyObj: {},
// 	StoolConsistencyOptions: [
// 		{ type: 'StoolConsistency', value: 1, label: '正常'},
// 		{ type: 'StoolConsistency', value: 2, label: '干结'},
// 		{ type: 'StoolConsistency', value: 3, label: '稀水样便'},
// 		{ type: 'StoolConsistency', value: 4, label: '粘液样变'},
// 		{ type: 'StoolConsistency', value: 5, label: '脓血样便'},
// 		{ type: 'StoolConsistency', value: 6, label: '柏油样变'},
// 		{ type: 'StoolConsistency', value: 7, label: '其他'}
// 	],
// 	
// 	// 体格检查
// 	ConsciousnessObj: {},
// 	ConsciousnessOptions: [
// 		{ type: 'Consciousness', value: 1, label: '清醒'},
// 		{ type: 'Consciousness', value: 2, label: '模糊'},
// 		{ type: 'Consciousness', value: 3, label: '瞌睡'},
// 		{ type: 'Consciousness', value: 4, label: '浅昏迷'},
// 		{ type: 'Consciousness', value: 5, label: '植物状态'}
// 	],
// 	Temperature: '',
// 	Pulse: '',
// 	Respiratory: '',
// 	BloodPressure: '',
// 	SkinDetails: [],
// 	SkinOptions: [
// 		{ type: 'Skin', value: 1, label: '完整'},
// 		{ type: 'Skin', value: 2, label: '苍白'},
// 		{ type: 'Skin', value: 3, label: '黄疸'},
// 		{ type: 'Skin', value: 4, label: '潮红'},
// 		{ type: 'Skin', value: 5, label: '水肿'},
// 		{ type: 'Skin', value: 6, label: '脱水'},
// 		{ type: 'Skin', value: 7, label: '皮疹'},
// 		{ type: 'Skin', value: 8, label: '出血点'},
// 		{ type: 'Skin', value: 9, label: '疤痕'},
// 		{ type: 'Skin', value: 10, label: '压疮'}
// 	],
// 	LanguageObj: {},
// 	LanguageOptions: [
// 		{ type: 'Language', value: 1, label: '正常'},
// 		{ type: 'Language', value: 2, label: '含糊'},
// 		{ type: 'Language', value: 3, label: '困难'},
// 		{ type: 'Language', value: 4, label: '失语'},
// 		{ type: 'Language', value: 5, label: '简单交流'},
// 		{ type: 'Language', value: 6, label: '听懂不能表达'},
// 		{ type: 'Language', value: 7, label: '不能交流'},
// 		{ type: 'Language', value: 8, label: '其他'}
// 	],
// 	PhysicalActivityObj: {},
// 	PhysicalActivityOptions: [
// 		{ type: 'PhysicalActivity', value: 1, label: '正常'},
// 		{ type: 'PhysicalActivity', value: 2, label: '受限'}
// 	],
// 	ShapesObj: {},
// 	ShapesOptions: [
// 		{ type: 'Shapes', value: 1, label: '正常'},
// 		{ type: 'Shapes', value: 2, label: '异常'}
// 	],
// 	ShapesUnusualOptions: [
// 		{ type: 'ShapesUnusual', value: 1, label: '畸形'},
// 		{ type: 'ShapesUnusual', value: 2, label: '缺失'},
// 		{ type: 'ShapesUnusual', value: 3, label: '肿胀'},
// 		{ type: 'ShapesUnusual', value: 4, label: '萎缩'},
// 		{ type: 'ShapesUnusual', value: 5, label: '痉挛'},
// 		{ type: 'ShapesUnusual', value: 6, label: '存在部位'}
// 	],
// 	OrthosisObj: {},
// 	OrthosisOptions: [
// 		{ type: 'Orthosis', value: 1, label: '无'},
// 		{ type: 'Orthosis', value: 2, label: '有'}
// 	],
// 	ProsthesisObj: {},
// 	ProsthesisOptions: [
// 		{ type: 'Prosthesis', value: 1, label: '无'},
// 		{ type: 'Prosthesis', value: 2, label: '有'}
// 	],
// 	wheelChair: false, 
// 	walkingFrames: false, 
// 	handCrutch: {
// 		single: false,
// 		double: false
// 	}, 
// 	axillaryCrutch: {
// 		single: false,
// 		double: false
// 	}, 
// 	elbowCrutch: {
// 		single: false,
// 		double: false
// 	},
// 	VASObj: {},
// 	VASOptions: [
// 		{ type: 'VAS', value: 1, label: '无'},
// 		{ type: 'VAS', value: 2, label: '有'}
// 	],
// 	PainReliefObj: {},
// 	PainReliefOptions: [
// 		{ type: 'PainRelief', value: 1, label: '无'},
// 		{ type: 'PainRelief', value: 2, label: '有'}
// 	],
// 	StageText: '',
// 	StageOptions: [
// 		{ type: 'Stage', value: '', label: '请选择'},
// 		{ type: 'Stage', value: '1期', label: '1期'},
// 		{ type: 'Stage', value: '2期', label: '2期'},
// 		{ type: 'Stage', value: '3期', label: '3期'},
// 		{ type: 'Stage', value: '4期', label: '4期'},
// 		{ type: 'Stage', value: '不可分期', label: '不可分期'},
// 		{ type: 'Stage', value: '深部组织损伤', label: '深部组织损伤'}
// 	],
// 	SkinItem: {},
// 	SkinList: [],
// 	
// 	// 心理社会
// 	MentalObj: {},
// 	MentalOptions: [
// 		{ type: 'Mental', value: 1, label: '稳定'},
// 		{ type: 'Mental', value: 2, label: '情绪不稳定'},
// 		{ type: 'Mental', value: 3, label: '孤独'},
// 		{ type: 'Mental', value: 4, label: '抑郁'},
// 		{ type: 'Mental', value: 5, label: '人际关系障碍'},
// 		{ type: 'Mental', value: 6, label: '情感平淡/冷淡'},
// 		{ type: 'Mental', value: 7, label: '悲观思想'},
// 		{ type: 'Mental', value: 8, label: '焦虑'},
// 		{ type: 'Mental', value: 9, label: '其他'}
// 	],
// 	ViewPointObj: {},
// 	ViewPointOptions: [
// 		{ type: 'ViewPoint', value: 1, label: '不理解'},
// 		{ type: 'ViewPoint', value: 2, label: '部分理解'},
// 		{ type: 'ViewPoint', value: 3, label: '能理解'},
// 		{ type: 'ViewPoint', value: 4, label: '其他'}
// 	],
// 	ConcernsObj: {},
// 	ConcernsOptions: [
// 		{ type: 'Concerns', value: 1, label: '无'},
// 		{ type: 'Concerns', value: 2, label: '有'},
// 	],
// 	ConcernsNoteOptions: [
// 		{ type: 'Concerns', value: '经济方面', label: '经济方面'},
// 		{ type: 'Concerns', value: '家庭方面', label: '家庭方面'},
// 		{ type: 'Concerns', value: '照顾方面', label: '照顾方面'},
// 		{ type: 'Concerns', value: '康复方面', label: '康复方面'},
// 		{ type: 'Concerns', value: '其他', label: '其他'}
// 	],
// 	
// 	// 护理要点
// 	NursingPointObj: {},
// 	NursingPointOptions: [
// 		{ type: 'NursingPoint', value: 1, label: '口腔护理'},
// 		{ type: 'NursingPoint', value: 2, label: '皮肤护理'},
// 		{ type: 'NursingPoint', value: 3, label: '头发护理'},
// 		{ type: 'NursingPoint', value: 4, label: '会阴护理'},
// 		{ type: 'NursingPoint', value: 5, label: '管路护理'},
// 		{ type: 'NursingPoint', value: 6, label: '心理指导'},
// 		{ type: 'NursingPoint', value: 7, label: '安全防护'},
// 		{ type: 'NursingPoint', value: 8, label: '健康宣教'},
// 		{ type: 'NursingPoint', value: 9, label: '其他'}
// 	],
	
	
	
	
	
	
	NotifyDoctor: false,
	
	ConsciousnessObj: {},
	ConsciousnessOptions: [
		{ type: 'Consciousness', value: 1, label: '清醒'},
		{ type: 'Consciousness', value: 2, label: '嗜睡'},
		{ type: 'Consciousness', value: 3, label: '模糊'},
		{ type: 'Consciousness', value: 4, label: '昏迷'},
	],
	CommunicationObj: {},
	CommunicationOptions: [
		{ type: 'Communication', value: 1, label: '正常'},
		{ type: 'Communication', value: 2, label: '障碍'},
	],
	PhysicalActivityObj: {},
	PhysicalActivityOptions: [
		{ type: 'PhysicalActivity', value: 1, label: '正常'},
		{ type: 'PhysicalActivity', value: 2, label: '瘫痪'},
		{ type: 'PhysicalActivity', value: 3, label: '其他'}
	],
	SwallowingObj: {},
	SwallowingOptions: [
		{ type: 'Swallowing', value: 1, label: '正常'},
		{ type: 'Swallowing', value: 2, label: '困难'},
	],
	VisionObj: {},
	VisionOptions: [
		{ type: 'Vision', value: 1, label: '正常'},
		{ type: 'Vision', value: 2, label: '异常'},
	],
	HearingObj: {},
	HearingOptions: [
		{ type: 'Hearing', value: 1, label: '正常'},
		{ type: 'Hearing', value: 2, label: '异常'},
	],
	SkinObj: {},
	SkinOptions: [
		{ type: 'Skin', value: 1, label: '正常'},
		{ type: 'Skin', value: 2, label: '压疮'},
		{ type: 'Skin', value: 3, label: '异常'},
	],
	CatheterObj: {},
	AllergicObj: {},
	
	HospitalizedTypeObj: {},
	HospitalizedTypeOptions: [
		{ type: 'HospitalizedType', value: 1, label: '步行' },
		{ type: 'HospitalizedType', value: 2, label: '扶行' },
		{ type: 'HospitalizedType', value: 3, label: '轮椅' },
		{ type: 'HospitalizedType', value: 4, label: '平车' },
	],
	HobbyObj: {},
	HobbyOptions: [
		{ type: 'Hobby', value: 1, label: '无' },
		{ type: 'Hobby', value: 2, label: '烟' },
		{ type: 'Hobby', value: 3, label: '酒' },
	],
	DietObj: {},
	DietOptions: [
		{ type: 'Diet', value: 1, label: '普食'},
		{ type: 'Diet', value: 2, label: '流食'},
		{ type: 'Diet', value: 3, label: '半流'},
		{ type: 'Diet', value: 4, label: '糖尿病饮食'},
		{ type: 'Diet', value: 5, label: '禁食'},
		{ type: 'Diet', value: 6, label: '鼻饲'},
		{ type: 'Diet', value: 7, label: '其他'}
	],
	UrinationWaysObj: {},
	UrinationWaysOptions: [
		{ type: 'UrinationWays', value: 1, label: '自行'},
		{ type: 'UrinationWays', value: 2, label: '留置导尿'},
		{ type: 'UrinationWays', value: 3, label: '造口'},
		{ type: 'UrinationWays', value: 4, label: '其他'},
	],
	DefecationWaysObj: {},
	DefecationWaysOptions: [
		{ type: 'DefecationWays', value: 1, label: '自行'},
		{ type: 'DefecationWays', value: 2, label: '造口（部位）'},
		{ type: 'DefecationWays', value: 3, label: '其他'},
	],
	SelfHelpObj: {},
	SelfHelpOptions: [
		{ type: 'SelfHelp', value: 1, label: '完全自理'},
		{ type: 'SelfHelp', value: 2, label: '部分自理'},
		{ type: 'SelfHelp', value: 3, label: '完全不能自理'},
	]
	
	
	
	
	
	
	
	
	
}

const getters = {
	now: state => state.now,
	themeColor: state => state.themeColor,
	pickerValueArray: state => state.pickerValueArray,
	mode: state => state.mode,
	deepLength: state => state.deepLength,
	pickerValueDefault: state => state.pickerValueDefault,
	
	NotifyDoctor: state => state.NotifyDoctor,
	HeadNurseNameObj: state => state.HeadNurseNameObj,
	HeadNurseNameOptions: state => state.HeadNurseNameOptions,

// 	// 基本资料
// 	Occupation: state => state.Occupation,
// 	HospitalizedTypeObj: state => state.HospitalizedTypeObj,
// 	HospitalizedTypeOptions: state => state.HospitalizedTypeOptions,
// 	EducationObj: state => state.EducationObj,
// 	EducationOptions: state => state.EducationOptions,
// 	EthnicGroupObj: state => state.EthnicGroupObj,
// 	EthnicGroupOptions: state => state.EthnicGroupOptions,
// 	FaithsObj: state => state.FaithsObj,
// 	FaithsOptions: state => state.FaithsOptions,
// 	PastIllnessObj: state => state.PastIllnessObj,
// 	PastIllnessOptions: state => state.PastIllnessOptions,
// 	FamilialObj: state => state.FamilialObj,
// 	FamilialOptions: state => state.FamilialOptions,
// 	AllergicObj: state => state.AllergicObj,
// 	AllergicOptions: state => state.AllergicOptions,
// 	CatheterObj: state => state.CatheterObj,
// 	CatheterOptions: state => state.CatheterOptions,
// 	HobbyObj: state => state.HobbyObj,
// 	HobbyOptions: state => state.HobbyOptions,
// 	
// 	// 生活自理
// 	Height: state => state.Height,
// 	Weight: state => state.Weight,
// 	NutritionObj: state => state.NutritionObj,
// 	NutritionOptions: state => state.NutritionOptions, 
// 	DietNote: state => state.DietNote, 
// 	DietOptions: state => state.DietOptions, 
// 	PreferenceObj: state => state.PreferenceObj, 
// 	PreferenceOptions: state => state.PreferenceOptions, 
// 	DietingModeObj: state => state.DietingModeObj, 
// 	DietingModeOptions: state => state.DietingModeOptions, 
// 	SwallowingNote: state => state.SwallowingNote,
// 	SwallowingOptions: state => state.SwallowingOptions, 
// 	SmokeObj: state => state.SmokeObj, 
// 	SmokeOptions: state => state.SmokeOptions, 
// 	DrinkObj: state => state.DrinkObj, 
// 	DrinkOptions: state => state.DrinkOptions, 
// 	DyssomniaObj: state => state.DyssomniaObj, 
// 	DyssomniaExistOptions: state => state.DyssomniaExistOptions, 
// 	DyssomniaOptions: state => state.DyssomniaOptions, 
// 	SleepAidObj: state => state.SleepAidObj, 
// 	SleepAidOptions: state => state.SleepAidOptions, 
// 	UrinationObj: state => state.UrinationObj, 
// 	UrinationOptions: state => state.UrinationOptions, 
// 	UrineObj: state => state.UrineObj, 
// 	UrineOptions: state => state.UrineOptions, 
// 	AssitanceObj: state => state.AssitanceObj, 
// 	AssitanceOptions: state => state.AssitanceOptions, 
// 	AssitanceToolOptions: state => state.AssitanceToolOptions, 
// 	DefecateObj: state => state.DefecateObj,
// 	DefecateOptions: state => state.DefecateOptions, 
// 	DefecateDrugObj: state => state.DefecateDrugObj, 
// 	DefecateDrugOptions: state => state.DefecateDrugOptions, 
// 	StoolConsistencyObj: state => state.StoolConsistencyObj, 
// 	StoolConsistencyOptions: state => state.StoolConsistencyOptions,
// 	
// 	// 体格检查
// 	ConsciousnessObj: state => state.ConsciousnessObj,
// 	ConsciousnessOptions: state => state.ConsciousnessOptions,
// 	Temperature: state => state.Temperature,
// 	Pulse: state => state.Pulse,
// 	Respiratory: state => state.Respiratory,
// 	BloodPressure: state => state.BloodPressure,
// 	SkinDetails: state => state.SkinDetails,
// 	SkinOptions: state => state.SkinOptions,
// 	LanguageObj: state => state.LanguageObj,
// 	LanguageOptions: state => state.LanguageOptions,
// 	PhysicalActivityObj: state => state.PhysicalActivityObj,
// 	PhysicalActivityOptions: state => state.PhysicalActivityOptions,
// 	ShapesObj: state => state.ShapesObj,
// 	ShapesOptions: state => state.ShapesOptions,
// 	ShapesUnusualOptions: state => state.ShapesUnusualOptions,
// 	OrthosisObj: state => state.OrthosisObj,
// 	OrthosisOptions: state => state.OrthosisOptions,
// 	ProsthesisObj: state => state.ProsthesisObj,
// 	ProsthesisOptions: state => state.ProsthesisOptions,
// 	wheelChair: state => state.wheelChair,
// 	walkingFrames: state => state.walkingFrames,
// 	handCrutch: state => state.handCrutch,
// 	axillaryCrutch: state => state.axillaryCrutch,
// 	elbowCrutch: state => state.elbowCrutch,
// 	VASObj: state => state.VASObj,
// 	VASOptions: state => state.VASOptions,
// 	PainReliefObj: state => state.PainReliefObj,
// 	PainReliefOptions: state => state.PainReliefOptions,
// 	StageText: state => state.StageText,
// 	StageOptions: state => state.StageOptions,
// 	SkinItem: state => state.SkinItem,
// 	SkinList: state => state.SkinList,
// 	
// 	// 心理社会
// 	MentalObj: state => state.MentalObj,
// 	MentalOptions: state => state.MentalOptions,
// 	ViewPointObj: state => state.ViewPointObj,
// 	ViewPointOptions: state => state.ViewPointOptions,
// 	ConcernsObj: state => state.ConcernsObj,
// 	ConcernsOptions: state => state.ConcernsOptions,
// 	ConcernsNoteOptions: state => state.ConcernsNoteOptions,
// 	
// 	// 护理要点
// 	NursingPointObj: state => state.NursingPointObj,
// 	NursingPointOptions: state => state.NursingPointOptions,

	ConsciousnessObj: state => state.ConsciousnessObj,
	ConsciousnessOptions: state => state.ConsciousnessOptions,
	CommunicationObj: state => state.CommunicationObj,
	CommunicationOptions: state => state.CommunicationOptions,
	PhysicalActivityObj: state => state.PhysicalActivityObj,
	PhysicalActivityOptions: state => state.PhysicalActivityOptions,
	SwallowingObj: state => state.SwallowingObj,
	SwallowingOptions: state => state.SwallowingOptions,
	VisionObj: state => state.VisionObj,
	VisionOptions: state => state.VisionOptions,
	HearingObj: state => state.HearingObj,
	HearingOptions: state => state.HearingOptions,
	SkinObj: state => state.SkinObj,
	SkinOptions: state => state.SkinOptions,
	CatheterObj: state => state.CatheterObj,
	AllergicObj: state => state.AllergicObj,
	
	HospitalizedTypeObj: state => state.HospitalizedTypeObj,
	HospitalizedTypeOptions: state => state.HospitalizedTypeOptions,
	HobbyObj: state => state.HobbyObj,
	HobbyOptions: state => state.HobbyOptions,
	DietObj: state => state.DietObj,
	DietOptions: state => state.DietOptions,
	UrinationWaysObj: state => state.UrinationWaysObj,
	UrinationWaysOptions: state => state.UrinationWaysOptions,
	DefecationWaysObj: state => state.DefecationWaysObj,
	DefecationWaysOptions: state => state.DefecationWaysOptions,
	SelfHelpObj: state => state.SelfHelpObj,
	SelfHelpOptions: state => state.SelfHelpOptions,
}

const actions = {
	[actionConstants.INPATIENT_INIT] ({ commit }, payload) {
		base.init(payload.info, payload.id, payload.type, (now, content) => {
			console.log(JSON.stringify(content))
			commit(mutationConstants.NOW_INIT, now)
// 			commit(mutationConstants.SET_CONTENT, {info: content, type: payload.type})
// 			commit(mutationConstants.SET_CHECKBOX, {info: content, type: payload.type})
			setTimeout(() => {
				commit(listMutationConstants.CLOSE_LOADING)
			},3000)
		})
	},
	[actionConstants.SUBMIT_BEFORE] ({ commit }, payload) {
		let params = {
			HospitalizedID: '',
			HospitalizedHisID: payload.info.ZYH,
			PatientID: '',
			PatientHisID: payload.info.ZYHM,
			
			PatientName: payload.info.PaientName,
			Sex: payload.info.Sex,
			Age: payload.info.age.toString(),
			HospitalizedDate: payload.info.inTime,
			HospitalizedType: state.HospitalizedTypeObj ? state.HospitalizedTypeObj.HospitalizedType : undefined,
			HospitalizedNote: state.HospitalizedTypeObj ? state.HospitalizedTypeObj.HospitalizedNote : '',
			Education: state.EducationObj ? state.EducationObj.Education : '',
			Occupation: payload.formData.Occupation,
			EthnicGroup: state.EthnicGroupObj ? state.EthnicGroupObj.EthnicGroup : '',
			FaithsType: state.FaithsObj ? state.FaithsObj.FaithsType : undefined,
			Faiths: state.FaithsObj ? state.FaithsObj.Faiths : '',
			Diagnosis: payload.info.MSZD,
			PastIllness: state.PastIllnessObj ? state.PastIllnessObj.PastIllness : undefined,
			PastIllnessNote: state.PastIllnessObj ? state.PastIllnessObj.PastIllnessNote : '',
			Familial: state.FamilialObj ? state.FamilialObj.Familial : undefined,
			FamilialNote: state.FamilialObj ? state.FamilialObj.FamilialNote : '',
			Allergic: state.AllergicObj ? state.AllergicObj.Allergic : undefined,
			AllergicDrugs: state.AllergicObj ? state.AllergicObj.AllergicDrugs : '',
			AllergicFood: state.AllergicObj ? state.AllergicObj.AllergicFood : '',
			Catheter: state.CatheterObj ? state.CatheterObj.Catheter : undefined,
			CatheterNote: state.CatheterObj ? state.CatheterObj.CatheterNote : '',
			Hobby: state.HobbyObj ? state.HobbyObj.Hobby : undefined,
			HobbyNote: state.HobbyObj ? state.HobbyObj.HobbyNote : '',
			
			Nutrition: state.NutritionObj ? state.NutritionObj.Nutrition : undefined,
			Height: state.Height == 0 ? '' : state.Height.toString(),
			Weight: state.Weight == 0 ? '' : state.Weight.toString(),
			BMI: payload.BMI,
			BMIResult: payload.BMIResult,
			Diet: kftools.getCheckBoxStr(state.DietOptions),
			DietNote: state.DietNote,
			Preference: state.PreferenceObj ? state.PreferenceObj.Preference : undefined,
			PreferenceNote: state.PreferenceObj ? state.PreferenceObj.PreferenceNote : '',
			DietingMode: state.DietingModeObj ? state.DietingModeObj.DietingMode : undefined,
			DietingModeNote: state.DietingModeObj ? state.DietingModeObj.DietingModeNote : '',
			Swallowing: kftools.getCheckBoxStr(state.SwallowingOptions),
			SwallowingNote: state.SwallowingNote,
			Smoke: state.SmokeObj ? state.SmokeObj.Smoke : undefined,
			SmokeOfDay: payload.formData.SmokeOfDay ? payload.formData.SmokeOfDay : '',
			Drink: state.DrinkObj ? state.DrinkObj.Drink : undefined,
			DrinkOfDay: payload.formData.DrinkOfDay ? payload.formData.DrinkOfDay : '',
			Dyssomnia: state.DyssomniaObj ? state.DyssomniaObj.Dyssomnia : undefined,
			DyssomniaOption: kftools.getCheckBoxStr(state.DyssomniaOptions),
			DyssomniaNote: state.DyssomniaObj ? state.DyssomniaObj.DyssomniaNote : '',
			SleepAid: state.SleepAidObj ? state.SleepAidObj.SleepAid : undefined,
			SleepAidMethods: payload.formData.SleepAidMethods ? payload.formData.SleepAidMethods : '',
			SleepAidEffect: payload.formData.SleepAidEffect ? payload.formData.SleepAidEffect : '',
			Urination: state.UrinationObj ? state.UrinationObj.Urination : undefined,
			UrinationNote: state.UrinationObj ? state.UrinationObj.UrinationNote : '',
			Urine: state.UrineObj ? state.UrineObj.Urine : undefined,
			UrineNote: state.UrineObj ? state.UrineObj.UrineNote : '',
			Assitance: state.AssitanceObj ? state.AssitanceObj.Assitance : undefined,
			AssitanceTools: kftools.getCheckBoxStr(state.AssitanceToolOptions),
			AssitanceNote: state.AssitanceObj ? state.AssitanceObj.AssitanceNote : '',
			Defecate: state.DefecateObj ? state.DefecateObj.Defecate : undefined,
			DefecateDrug: state.DefecateDrugObj ? state.DefecateDrugObj.DefecateDrug : undefined,
			DefecateDrugNote: state.DefecateDrugObj ? state.DefecateDrugObj.DefecateDrugNote : '',
			DefecateDrugNote1: state.DefecateDrugObj ? state.DefecateDrugObj.DefecateDrugNote1 : '',
			StoolConsistency: state.StoolConsistencyObj ? state.StoolConsistencyObj.StoolConsistency : undefined,
			StoolConsistencyNote: state.StoolConsistencyObj ? state.StoolConsistencyObj.StoolConsistencyNote : '',
			
			Consciousness: state.ConsciousnessObj ? state.ConsciousnessObj.Consciousness : undefined,
			Temperature: state.Temperature == 0 ? '' : state.Temperature.toString(),
			Pulse: state.Pulse == 0 ? '' : state.Pulse.toString(),
			Respiratory: state.Respiratory == 0 ? '' : state.Respiratory.toString(),
			BloodPressure: payload.formData.BloodPressure,
			Skin: kftools.getCheckBoxStr(state.SkinOptions),
			SkinList: JSON.stringify(state.SkinList),
			Language: state.LanguageObj ? state.LanguageObj.Language : undefined,
			LanguageNote: state.LanguageObj ? state.LanguageObj.LanguageNote : '',
			PhysicalActivity: state.PhysicalActivityObj ? state.PhysicalActivityObj.PhysicalActivity : undefined,
			PhysicalActivityPart: payload.formData.PhysicalActivityPart ? payload.formData.PhysicalActivityPart : '',
			Shapes: state.ShapesObj ? state.ShapesObj.Shapes : undefined,
			ShapesUnusual: kftools.getCheckBoxStr(state.ShapesUnusualOptions),
			ShapesUnusualPart: payload.formData.ShapesUnusualPart ? payload.formData.ShapesUnusualPart : '',
			Orthosis: state.OrthosisObj ? state.OrthosisObj.Orthosis : undefined,
			OrthosisNote: payload.formData.OrthosisNote ? payload.formData.OrthosisNote : '',
			Prosthesis: state.ProsthesisObj ? state.ProsthesisObj.Prosthesis : undefined,
			ProsthesisNote: payload.formData.ProsthesisNote ? payload.formData.ProsthesisNote : '',
			Appliance: kftools.getApplianceStr(state.wheelChair, state.walkingFrames, state.handCrutch, state.axillaryCrutch, state.elbowCrutch),
			VAS: state.VASObj ? state.VASObj.VAS : undefined,
			VASNote: payload.formData.VASNote ? payload.formData.VASNote : '',
			PainRelief: state.PainReliefObj ? state.PainReliefObj.PainRelief : undefined,
			PainReliefNote: payload.formData.PainReliefNote ? payload.formData.PainReliefNote : '',
			
			Mental: kftools.getCheckBoxStr(state.MentalOptions),
			MentalNote: payload.formData.MentalNote,
			ViewPoint: state.ViewPointObj ? state.ViewPointObj.ViewPoint : undefined,
			ViewPointNote: payload.formData.ViewPointNote,
			Concerns: state.ConcernsObj ? state.ConcernsObj.Concerns : undefined,
			ConcernsNote: kftools.getCheckBoxStr(state.ConcernsNoteOptions),
			ConcernsNote1: payload.formData.ConcernsNote1 ? payload.formData.ConcernsNote1 : '',
			
			NursingPoint: kftools.getCheckBoxStr(state.NursingPointOptions),
			NursingPointNote: payload.formData.NursingPointNote,
			
			CollectionDate: state.now,
			HeadNurseName: state.HeadNurseNameObj.HeadNurseName,
			
			EmployeeID: uni.getStorageSync('EmployeeID'),
			NurseName: uni.getStorageSync('EmployeeName'),
			UserID: uni.getStorageSync('UserID'),
		}
		console.log(JSON.stringify(params))
		
		commit(mutationConstants.SUBMIT_START)
		base.submit(params, payload.id, payload.type, (finalModel) => {
			console.log(JSON.stringify(finalModel))
			base.saveBasicInfoModel(payload.type, finalModel)
			.then((msg) => {
				commit(mutationConstants.SUBMIT_DONE)
				commit(mutationConstants.SHOW_MESSAGE, msg)
				commit(listMutationConstants.SET_IS_FROM_SUBMIT_TRUE)
				setTimeout(() => {
					uni.navigateBack({ delta: 1 })
				},500)
			})
		})
		.catch((msg) => {
			commit(mutationConstants.SUBMIT_DONE)
			commit(mutationConstants.SHOW_MESSAGE, msg)
		})
	},
}

const mutations = {
	[mutationConstants.NOW_INIT] (state, payload) {
		state.now = payload
	},
	[mutationConstants.SET_CONTENT] (state, payload) {
		let assessmentInfo 	   = payload.type == 'create' ? {} : JSON.parse(payload.info),
			ApplianceValueInit = payload.type == 'create' ? [0,0,0,0,0,0,0,0] : kftools.checkBoxValueInit(assessmentInfo.Appliance)
		
		state.now = payload.type == 'create' ? state.now : assessmentInfo.CollectionDate.replace('T', ' ')
		state.HeadNurseNameObj = payload.type == 'create' ? {} : {
			HeadNurseName: assessmentInfo.HeadNurseName,
			label: assessmentInfo.HeadNurseName
		}

// 		// 基本资料
// 		state.HospitalizedTypeObj = payload.type == 'create' ? {} : {
// 			HospitalizedType: assessmentInfo.HospitalizedType,
// 			label: assessmentInfo.HospitalizedType == 0 ? '' : state.HospitalizedTypeOptions[assessmentInfo.HospitalizedType - 1].label,
// 			HospitalizedNote: assessmentInfo.HospitalizedNote
// 		}
// 		state.EducationObj = payload.type == 'create' ? {} : {
// 			Education: assessmentInfo.Education == null ? '' : assessmentInfo.Education,
// 			label: assessmentInfo.Education == null ? '' : assessmentInfo.Education,
// 		}
// 		state.Occupation = payload.type == 'create' ? '' : assessmentInfo.Occupation
// 		state.EthnicGroupObj = payload.type == 'create' ? '' : {
// 			EthnicGroup: assessmentInfo.EthnicGroup,
// 			label: assessmentInfo.EthnicGroup
// 		} 
// 		state.FaithsObj = payload.type == 'create' ? {} : {
// 			FaithsType: assessmentInfo.FaithsType,
// 			Faiths: assessmentInfo.Faiths,
// 			Text: assessmentInfo.FaithsType == 1 ? '无' : (assessmentInfo.Faiths == null ? '' : assessmentInfo.Faiths)
// 		}
// 		state.PastIllnessObj = payload.type == 'create' ? {} : {
// 			PastIllness: assessmentInfo.PastIllness,
// 			PastIllnessNote: assessmentInfo.PastIllnessNote
// 		}
// 		state.FamilialObj = payload.type == 'create' ? {} : {
// 			Familial: assessmentInfo.Familial,
// 			FamilialText: assessmentInfo.Familial == 0 ? '' : state.FamilialOptions[assessmentInfo.Familial - 1].label,
// 			FamilialNote: assessmentInfo.FamilialNote
// 		}
// 		state.AllergicObj = payload.type == 'create' ? {} : {
// 			Allergic: assessmentInfo.Allergic,
// 			AllergicText: assessmentInfo.Allergic == 0 ? '' : state.AllergicOptions[assessmentInfo.Allergic - 1].label,
// 			AllergicDrugs: assessmentInfo.AllergicDrugs,
// 			AllergicFood: assessmentInfo.AllergicFood
// 		}
// 		state.CatheterObj = payload.type == 'create' ? {} : {
// 			Catheter: assessmentInfo.Catheter,
// 			CatheterText: assessmentInfo.Catheter == 0 ? '' : state.CatheterOptions[assessmentInfo.Catheter - 1].label,
// 			CatheterNote: assessmentInfo.CatheterNote
// 		}
// 		state.HobbyObj = payload.type == 'create' ? {} : {
// 			Hobby: assessmentInfo.Hobby,
// 			HobbyText: assessmentInfo.Hobby == 0 ? '' : state.HobbyOptions[assessmentInfo.Hobby - 1].label,
// 			HobbyNote: assessmentInfo.HobbyNote
// 		},
// 		
// 		// 生活自理
// 		state.DietNote = assessmentInfo.DietNote
// 		state.SwallowingNote = assessmentInfo.SwallowingNote
// 		state.NutritionObj = payload.type == 'create' ? {} : {
// 			Nutrition: assessmentInfo.Nutrition,
// 			label: assessmentInfo.Nutrition == 0 ? '' : state.NutritionOptions[assessmentInfo.Nutrition - 1].label
// 		}
// 		state.Height = (payload.type == 'create'||assessmentInfo.Height == '') ? 0 : assessmentInfo.Height
// 		state.Weight = (payload.type == 'create'||assessmentInfo.Weight == '') ? 0 : assessmentInfo.Weight
// 		state.PreferenceObj = payload.type == 'create' ? {} : {
// 			Preference: assessmentInfo.Preference,
// 			PreferenceText: assessmentInfo.Preference == 0 ? '' : state.PreferenceOptions[assessmentInfo.Preference - 1].label,
// 			PreferenceNote: assessmentInfo.PreferenceNote
// 		}
// 		state.DietingModeObj = payload.type == 'create' ? {} : {
// 			DietingMode: assessmentInfo.DietingMode,
// 			DietingModeText: assessmentInfo.DietingMode == 0 ? '' : state.DietingModeOptions[assessmentInfo.DietingMode - 1].label,
// 			DietingModeNote: assessmentInfo.DietingModeNote
// 		}
// 		state.SmokeObj = payload.type == 'create' ? {} : {
// 			Smoke: assessmentInfo.Smoke,
// 			SmokeText: assessmentInfo.Smoke == 0 ? '' : state.SmokeOptions[assessmentInfo.Smoke - 1].label,
// 			SmokeOfDay: assessmentInfo.SmokeOfDay
// 		}
// 		state.DrinkObj = payload.type == 'create' ? {} : {
// 			Drink: assessmentInfo.Drink,
// 			DrinkText: assessmentInfo.Drink == 0 ? '' : state.DrinkOptions[assessmentInfo.Drink - 1].label,
// 			DrinkOfDay: assessmentInfo.DrinkOfDay
// 		}
// 		state.DyssomniaObj = payload.type == 'create' ? {} : {
// 			Dyssomnia: assessmentInfo.Dyssomnia,
// 			DyssomniaText: assessmentInfo.Dyssomnia == 0 ? '' : state.DyssomniaExistOptions[assessmentInfo.Dyssomnia - 1].label,
// 			DyssomniaNote: assessmentInfo.DyssomniaNote
// 		}
// 		state.SleepAidObj = payload.type == 'create' ? {} : {
// 			SleepAid: assessmentInfo.SleepAid,
// 			SleepAidText: assessmentInfo.SleepAid == 0 ? '' : state.SleepAidOptions[assessmentInfo.SleepAid - 1].label,
// 			SleepAidMethods: assessmentInfo.SleepAidMethods,
// 			SleepAidEffect: assessmentInfo.SleepAidEffect
// 		}
// 		state.UrinationObj = payload.type == 'create' ? {} : {
// 			Urination: assessmentInfo.Urination,
// 			UrinationText: assessmentInfo.Urination == 0 ? '' : state.UrinationOptions[assessmentInfo.Urination - 1].label,
// 			UrinationNote: assessmentInfo.UrinationNote
// 		}
// 		state.UrineObj = payload.type == 'create' ? {} : {
// 			Urine: assessmentInfo.Urine,
// 			UrineText: assessmentInfo.Urine == 0 ? '' : state.UrineOptions[assessmentInfo.Urine - 1].label,
// 			UrineNote: assessmentInfo.UrineNote
// 		}
// 		state.AssitanceObj = payload.type == 'create' ? {} : {
// 			Assitance: assessmentInfo.Assitance,
// 			AssitanceText: assessmentInfo.Assitance == 0 ? '' : state.AssitanceOptions[assessmentInfo.Assitance - 1].label,
// 			AssitanceNote: assessmentInfo.AssitanceNote
// 		}
// 		state.DefecateObj = payload.type == 'create' ? {} : {
// 			Defecate: assessmentInfo.Defecate,
// 			DefecateText: assessmentInfo.Defecate == 0 ? '' : state.DefecateOptions[assessmentInfo.Defecate - 1].label
// 		}
// 		state.DefecateDrugObj = payload.type == 'create' ? {} : {
// 			DefecateDrug: assessmentInfo.DefecateDrug,
// 			DefecateDrugText: assessmentInfo.DefecateDrug == 0 ? '' : state.DefecateDrugOptions[assessmentInfo.DefecateDrug - 1].label,
// 			DefecateDrugNote: assessmentInfo.DefecateDrugNote,
// 			DefecateDrugNote1: assessmentInfo.DefecateDrugNote1
// 		}
// 		state.StoolConsistencyObj = payload.type == 'create' ? {} : {
// 			StoolConsistency: assessmentInfo.StoolConsistency,
// 			StoolConsistencyText: assessmentInfo.StoolConsistency == 0 ? '' : state.StoolConsistencyOptions[assessmentInfo.StoolConsistency - 1].label,
// 			StoolConsistencyNote: assessmentInfo.StoolConsistencyNote
// 		}
// 		
// 		// 体格检查
// 		state.ConsciousnessObj = payload.type == 'create' ? {} : {
// 			Consciousness: assessmentInfo.Consciousness,
// 			ConsciousnessText: assessmentInfo.Consciousness == 0 ? '' : state.ConsciousnessOptions[assessmentInfo.Consciousness - 1].label
// 		}
// 		state.Temperature 	= (payload.type == 'create'||assessmentInfo.Temperature == '') ? 0 : assessmentInfo.Temperature
// 		state.Pulse 		= (payload.type == 'create'||assessmentInfo.Pulse == '') ? 0 : assessmentInfo.Pulse
// 		state.Respiratory 	= (payload.type == 'create'||assessmentInfo.Respiratory == '') ? 0 : assessmentInfo.Respiratory
// 		state.BloodPressure = payload.type == 'create' ? '' : assessmentInfo.BloodPressure
// 		state.SkinList 		= payload.type == 'create' ? [] : JSON.parse(assessmentInfo.SkinList)
// 		state.SkinDetails 	= kftools.getSkinDetails(state.SkinList)
// 		state.LanguageObj = payload.type == 'create' ? {} : {
// 			Language: assessmentInfo.Language,
// 			LanguageText: assessmentInfo.Language == 0 ? '' : state.LanguageOptions[assessmentInfo.Language - 1].label,
// 			LanguageNote: assessmentInfo.LanguageNote
// 		}
// 		state.PhysicalActivityObj = payload.type == 'create' ? {} : {
// 			PhysicalActivity: assessmentInfo.PhysicalActivity,
// 			PhysicalActivityText: assessmentInfo.PhysicalActivity == 0 ? '' : state.PhysicalActivityOptions[assessmentInfo.PhysicalActivity - 1].label,
// 			PhysicalActivityPart: assessmentInfo.PhysicalActivityPart
// 		}
// 		state.ShapesObj = payload.type == 'create' ? {} : {
// 			Shapes: assessmentInfo.Shapes,
// 			ShapesText: assessmentInfo.Shapes == 0 ? '' : state.ShapesOptions[assessmentInfo.Shapes - 1].label,
// 			ShapesUnusualPart: assessmentInfo.ShapesUnusualPart
// 		}
// 		state.OrthosisObj = payload.type == 'create' ? {} : {
// 			Orthosis: assessmentInfo.Orthosis,
// 			OrthosisText: assessmentInfo.Orthosis == 0 ? '' : state.OrthosisOptions[assessmentInfo.Orthosis - 1].label,
// 			OrthosisNote: assessmentInfo.OrthosisNote
// 		}
// 		state.ProsthesisObj = payload.type == 'create' ? {} : {
// 			Prosthesis: assessmentInfo.Prosthesis,
// 			ProsthesisText: assessmentInfo.Prosthesis == 0 ? '' : state.ProsthesisOptions[assessmentInfo.Prosthesis - 1].label,
// 			ProsthesisNote: assessmentInfo.ProsthesisNote
// 		},
// 		state.wheelChair	 = ApplianceValueInit[0]
// 		state.walkingFrames	 = ApplianceValueInit[1]
// 		state.handCrutch	 = { single: ApplianceValueInit[2], double: ApplianceValueInit[3] }
// 		state.axillaryCrutch = { single: ApplianceValueInit[4], double: ApplianceValueInit[5] }
// 		state.elbowCrutch	 = { single: ApplianceValueInit[6], double: ApplianceValueInit[7] }
// 		state.VASObj = payload.type == 'create' ? {} : {
// 			VAS: assessmentInfo.VAS,
// 			VASText: assessmentInfo.VAS == 0 ? '' : state.VASOptions[assessmentInfo.VAS - 1].label,
// 			VASNote: assessmentInfo.VASNote
// 		}
// 		state.PainReliefObj = payload.type == 'create' ? {} : {
// 			PainRelief: assessmentInfo.PainRelief,
// 			PainReliefText: assessmentInfo.PainRelief == 0 ? '' : state.PainReliefOptions[assessmentInfo.PainRelief - 1].label,
// 			PainReliefNote: assessmentInfo.PainReliefNote
// 		}
// 		
// 		// 心理社会
// 		state.MentalObj = payload.type == 'create' ? {} : {
// 			MentalNote: assessmentInfo.MentalNote
// 		}
// 		state.ViewPointObj = payload.type == 'create' ? {} : {
// 			ViewPoint: assessmentInfo.ViewPoint,
// 			ViewPointText: assessmentInfo.ViewPoint == 0 ? '' : state.ViewPointOptions[assessmentInfo.ViewPoint - 1].label,
// 			ViewPointNote: assessmentInfo.ViewPointNote
// 		}
// 		state.ConcernsObj = payload.type == 'create' ? {} : {
// 			Concerns: assessmentInfo.Concerns,
// 			ConcernsText: assessmentInfo.Concerns == 0 ? '' : state.ConcernsOptions[assessmentInfo.Concerns - 1].label,
// 			ConcernsNote: assessmentInfo.ConcernsNote,
// 			ConcernsNote1: assessmentInfo.ConcernsNote1
// 		}
// 		
// 		// 护理要点
// 		state.NursingPointObj = payload.type == 'create' ? {} : {
// 			NursingPoint: assessmentInfo.NursingPoint,
// 			NursingPointNote: assessmentInfo.NursingPointNote
// 		}
	},
	[mutationConstants.SET_CHECKBOX] (state, payload) {
		let assessmentInfo = payload.type == 'create' ? {} : JSON.parse(payload.info)
		if (payload.type == 'create') {
			state.DietOptions.forEach((item) => item.checked = false)
			state.SwallowingOptions.forEach((item) => item.checked = false)
			state.DyssomniaOptions.forEach((item) => item.checked = false)
			state.AssitanceToolOptions.forEach((item) => item.checked = false)
			state.SkinOptions.forEach((item) => item.checked = false)
			state.ShapesUnusualOptions.forEach((item) => item.checked = false)
			state.MentalOptions.forEach((item) => item.checked = false)
			state.ConcernsNoteOptions.forEach((item) => item.checked = false)
			state.NursingPointOptions.forEach((item) => item.checked = false)
		} else {
			kftools.checkBoxValueInit(assessmentInfo.Diet).forEach((item, index) => state.DietOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.Swallowing).forEach((item, index) => state.SwallowingOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.DyssomniaOption).forEach((item, index) => state.DyssomniaOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.AssitanceTools).forEach((item, index) => state.AssitanceToolOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.Skin).forEach((item, index) => state.SkinOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.ShapesUnusual).forEach((item, index) => state.ShapesUnusualOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.Mental).forEach((item, index) => state.MentalOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.ConcernsNote).forEach((item, index) => state.ConcernsNoteOptions[index].checked = item)
			kftools.checkBoxValueInit(assessmentInfo.NursingPoint).forEach((item, index) => state.NursingPointOptions[index].checked = item)
		}
	},
	[mutationConstants.PICKER_CONFIRM] (state, payload) {
		switch(payload.type) {
			case 'HeadNurseName':
				state.HeadNurseNameObj = {
					HeadNurseName: payload.value[0],
					label: payload.label
				}
				break;
// 			case 'HospitalizedType':
// 				state.HospitalizedTypeObj = {
// 					HospitalizedType: payload.value[0],
// 					label: payload.label,
// 					HospitalizedNote: ''
// 				}
// 				break;
// 			case 'Education':
// 				state.EducationObj = {
// 					Education: payload.value[0],
// 					label: payload.label
// 				}
// 				break;
// 			case 'EthnicGroup':
// 				state.EthnicGroupObj = {
// 					EthnicGroup: payload.value[0],
// 					label: payload.label
// 				}
// 				break;
// 			case 'Faiths':
// 				let labelArr = payload.label.split('-')
// 				state.FaithsObj = {
// 					FaithsType: payload.value[0],
// 					Faiths: payload.value[1],
// 					Text: labelArr[1]
// 				}
// 				break;
// 			case 'Familial':
// 				state.FamilialObj = {
// 					Familial: payload.value[0],
// 					FamilialText: payload.label,
// 					FamilialNote: ''
// 				}
// 				break;
// 			case 'Allergic':
// 				state.AllergicObj = {
// 					Allergic: payload.value[0],
// 					AllergicText: payload.label,
// 					AllergicDrugs: '',
// 					AllergicFood: ''
// 				}
// 				break;
// 			case 'Catheter':
// 				state.CatheterObj = {
// 					Catheter: payload.value[0],
// 					CatheterText: payload.label,
// 					CatheterNote: ''
// 				}
// 				break;
// 			case 'Hobby':
// 				state.HobbyObj = {
// 					Hobby: payload.value[0],
// 					HobbyText: payload.label,
// 					HobbyNote: ''
// 				}
// 				break;
// 			case 'Nutrition':
// 				state.NutritionObj = payload
// 				break;
// 			case 'Preference':
// 				state.PreferenceObj = {
// 					Preference: payload.value[0],
// 					PreferenceText: payload.label,
// 					PreferenceNote: ''
// 				}
// 				break;
// 			case 'DietingMode':
// 				state.DietingModeObj = {
// 					DietingMode: payload.value[0],
// 					DietingModeText: payload.label,
// 					DietingModeNote: ''
// 				}
// 				break;
// 			case 'Smoke':
// 				state.SmokeObj = {
// 					Smoke: payload.value[0],
// 					SmokeText: payload.label,
// 					SmokeNote: ''
// 				}
// 				break;
// 			case 'Drink':
// 				state.DrinkObj = {
// 					Drink: payload.value[0],
// 					DrinkText: payload.label,
// 					DrinkNote: ''
// 				}
// 				break;
// 			case 'DyssomniaExist':
// 				state.DyssomniaObj = {
// 					Dyssomnia: payload.value[0],
// 					DyssomniaText: payload.label,
// 					DyssomniaOption: [],
// 					DyssomniaNote: ''
// 				}
// 				break;
// 			case 'SleepAid':
// 				state.SleepAidObj = {
// 					SleepAid: payload.value[0],
// 					SleepAidText: payload.label,
// 					SleepAidMethods: '',
// 					SleepAidEffect: ''
// 				}
// 				break;
// 			case 'Urination':
// 				state.UrinationObj = {
// 					Urination: payload.value[0],
// 					UrinationText: payload.label,
// 					UrinationNote: ''
// 				}
// 				break;
// 			case 'Urine':
// 				state.UrineObj = {
// 					Urine: payload.value[0],
// 					UrineText: payload.label,
// 					UrineNote: ''
// 				}
// 				break;
// 			case 'Assitance':
// 				state.AssitanceObj = {
// 					Assitance: payload.value[0],
// 					AssitanceText: payload.label,
// 					AssitanceTools: [],
// 					AssitanceNote: ''
// 				}
// 				break;
// 				Defecate
// 			case 'Defecate':
// 				state.DefecateObj = {
// 					Defecate: payload.value[0],
// 					DefecateText: payload.label
// 				}
// 				break;
// 			case 'DefecateDrug':
// 				state.DefecateDrugObj = {
// 					DefecateDrug: payload.value[0],
// 					DefecateDrugText: payload.label,
// 					DefecateDrugNote: '',
// 					DefecateDrugNote1: ''
// 				}
// 				break;
// 			case 'StoolConsistency':
// 				state.StoolConsistencyObj = {
// 					StoolConsistency: payload.value[0],
// 					StoolConsistencyText: payload.label,
// 					StoolConsistencyNote: ''
// 				}
// 				break;
// 			case 'Consciousness':
// 				state.ConsciousnessObj = {
// 					Consciousness: payload.value[0],
// 					ConsciousnessText: payload.label,
// 					ConsciousnessNote: ''
// 				}
// 				break;
// 			case 'Skin':
// 				state.SkinObj = {
// 					Skin: payload.value[0],
// 					SkinText: payload.label,
// 					SkinNote: ''
// 				}
// 				break;
// 			case 'Language':
// 				state.LanguageObj = {
// 					Language: payload.value[0],
// 					LanguageText: payload.label,
// 					LanguageNote: ''
// 				}
// 				break;
// 			case 'PhysicalActivity':
// 				state.PhysicalActivityObj = {
// 					PhysicalActivity: payload.value[0],
// 					PhysicalActivityText: payload.label,
// 					PhysicalActivityNote: ''
// 				}
// 				break;
// 			case 'Shapes':
// 				state.ShapesObj = {
// 					Shapes: payload.value[0],
// 					ShapesText: payload.label,
// 					ShapesUnusual: '',
// 					ShapesUnusualPart: ''
// 				}
// 				break;
// 			case 'Orthosis':
// 				state.OrthosisObj = {
// 					Orthosis: payload.value[0],
// 					OrthosisText: payload.label,
// 					OrthosisNote: ''
// 				}
// 				break;
// 			case 'Prosthesis':
// 				state.ProsthesisObj = {
// 					Prosthesis: payload.value[0],
// 					ProsthesisText: payload.label,
// 					ProsthesisNote: ''
// 				}
// 				break;
// 			case 'VAS':
// 				state.VASObj = {
// 					VAS: payload.value[0],
// 					VASText: payload.label,
// 					VASNote: ''
// 				}
// 				break;
// 			case 'PainRelief':
// 				state.PainReliefObj = {
// 					PainRelief: payload.value[0],
// 					PainReliefText: payload.label,
// 					PainReliefNote: ''
// 				}
// 				break;
// 			case 'Stage':
// 				state.StageText = payload.label
// 				state.SkinItem.SkinLevel = payload.value[0]
// 				break;
// 			case 'ViewPoint':
// 				state.ViewPointObj = {
// 					ViewPoint: payload.value[0],
// 					ViewPointText: payload.label,
// 					ViewPointNote: ''
// 				}
// 				break;
// 			case 'Concerns':
// 				state.ConcernsObj = {
// 					Concerns: payload.value[0],
// 					ConcernsText: payload.label,
// 					ConcernsNote: '',
// 					ConcernsNote1: ''
// 				}
// 				break;
			case 'Consciousness':
				state.ConsciousnessObj = {
					Consciousness: payload.value[0],
					label: payload.label,
				}
				break;
			case 'Communication':
				state.CommunicationObj = {
					Communication: payload.value[0],
					label: payload.label,
				}
				break;
			case 'PhysicalActivity':
				state.PhysicalActivityObj = {
					PhysicalActivity: payload.value[0],
					label: payload.label,
					PhysicalActivityNote: '',
				}
				break;
			case 'Swallowing':
				state.SwallowingObj = {
					Swallowing: payload.value[0],
					label: payload.label,
				}
				break;
			case 'Vision':
				state.VisionObj = {
					Vision: payload.value[0],
					label: payload.label,
					VisionNote: '',
				}
				break;
			case 'Hearing':
				state.HearingObj = {
					Hearing: payload.value[0],
					label: payload.label,
					HearingNote: '',
				}
				break;
			case 'Skin':
				state.SkinObj = {
					Skin: payload.value[0],
					label: payload.label,
					SkinNote: '',
				}
				break;
			case 'HospitalizedType':
				state.HospitalizedTypeObj = {
					HospitalizedType: payload.value[0],
					label: payload.label,
				}
				break;
			case 'Hobby':
				state.HobbyObj = {
					Hobby: payload.value[0],
					label: payload.label,
				}
				break;
			case 'Diet':
				state.DietObj = {
					Diet: payload.value[0],
					label: payload.label,
					DietNote: '',
				}
				break;
			case 'UrinationWays':
				state.UrinationWaysObj = {
					UrinationWays: payload.value[0],
					label: payload.label,
				}
				break;
			case 'DefecationWays':
				state.DefecationWaysObj = {
					DefecationWays: payload.value[0],
					label: payload.label,
				}
				break;
			case 'SelfHelp':
				state.SelfHelpObj = {
					SelfHelp: payload.value[0],
					label: payload.label,
				}
				break;
		}
	},
	[mutationConstants.HEAD_NURSE_NAME_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.HeadNurseNameOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	
	// 基本资料
	[mutationConstants.GENERAL_HOSPITALIZEDTYPE_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.HospitalizedTypeOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.GENERAL_EDUCATION_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.EducationOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = ['大专']
	},
	[mutationConstants.GENERAL_ETHNICGROUP_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.EthnicGroupOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = ['汉族']
	},
	[mutationConstants.GENERAL_FAITHS_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.FaithsOptions
		state.mode = 'multiLinkageSelector'
		state.deepLength = 2
		state.pickerValueDefault = [0,0]
	},
	[mutationConstants.GENERAL_PASTILLNESS_SWITCH_CHANGE] (state, payload) {
		state.PastIllnessObj = {
			PastIllness: payload.target.value ? 2 : 1,
			PastIllnessNote: ''
		}
	},
	[mutationConstants.GENERAL_FAMILIAL_SWITCH_CHANGE] (state, payload) {
		state.FamilialObj = {
			Familial: payload.target.value ? 2 : 1,
			FamilialNote: ''
		}
	},
	[mutationConstants.GENERAL_ALLERGIC_SWITCH_CHANGE] (state, payload) {
		state.AllergicObj = {
			Allergic: payload.target.value ? 2 : 1,
			AllergicDrugs: '',
			AllergicFood: ''
		}
	},
	[mutationConstants.GENERAL_CATHETER_SWITCH_CHANGE] (state, payload) {
		state.CatheterObj = {
			Catheter: payload.target.value ? 2 : 1,
			CatheterNote: ''
		}
	},
	[mutationConstants.GENERAL_HOBBY_SWITCH_CHANGE] (state, payload) {
		state.HobbyObj = {
			Hobby: payload.target.value ? 2 : 1,
			HobbyNote: ''
		}
	},
	
	// 生活自理
	[mutationConstants.SELF_HELP_NUTRITION_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.NutritionOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SELF_HELP_DIETING_MODE_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.DietingModeOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SELF_HELP_SMOKE_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.SmokeOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SELF_HELP_DRINK_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.DrinkOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SELF_HELP_URINATION_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.UrinationOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SELF_HELP_URINE_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.UrineOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SELF_HELP_DEFECATE_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.DefecateOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SELF_HELP_DEFECATE_DRUG_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.DefecateDrugOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SELF_HELP_STOOL_CONSISTENCY_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.StoolConsistencyOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SELF_HELP_HEIGHT_CHANGE] (state, payload) {
		state.Height = payload
	},
	[mutationConstants.SELF_HELP_WEIGHT_CHANGE] (state, payload) {
		state.Weight = payload
	},
	[mutationConstants.SELF_HELP_DIET_CHECKBOX_CHANGE] (state, payload) {
		let items = state.DietOptions,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.SELF_HELP_SWALLOWING_CHECKBOX_CHANGE] (state, payload) {
		let items = state.SwallowingOptions,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.SELF_HELP_DYSSOMNIA_CHECKBOX_CHANGE] (state, payload) {
		let items = state.DyssomniaOptions,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.SELF_HELP_ASSITANCE_TOOL_CHECKBOX_CHANGE] (state, payload) {
		let items = state.AssitanceToolOptions,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.SELF_HELP_PREFERENCE_SWITCH_CHANGE] (state, payload) {
		state.PreferenceObj = {
			Preference: payload.target.value ? 2 : 1,
			PreferenceNote: ''
		}
	},
	[mutationConstants.SELF_HELP_DYSSOMNIA_SWITCH_CHANGE] (state, payload) {
		state.DyssomniaObj = {
			Dyssomnia: payload.target.value ? 2 : 1,
			DyssomniaOption: [],
			DyssomniaNote: ''
		}
	},
	[mutationConstants.SELF_HELP_SLEEP_AID_SWITCH_CHANGE] (state, payload) {
		state.SleepAidObj = {
			SleepAid: payload.target.value ? 2 : 1,
			SleepAidMethods: '',
			SleepAidEffect: ''
		}
	},
	[mutationConstants.SELF_HELP_ASSITANCE_SWITCH_CHANGE] (state, payload) {
		state.AssitanceObj = {
			Assitance: payload.target.value ? 2 : 1,
			AssitanceTools: [],
			AssitanceNote: ''
		}
	},
	
	// 体格检查
	[mutationConstants.PHYSICAL_CONSCIOUSNESS_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.ConsciousnessOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.PHYSICAL_LANGUAGE_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.LanguageOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.PHYSICAL_PHYSICAL_ACTIVITY_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.PhysicalActivityOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.PHYSICAL_SHAPES_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.ShapesOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SKIN_ITEM_STAGE_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.StageOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.SKIN_ITEM_SUBMIT] (state, payload) {
		state.SkinItem = payload
	},
	[mutationConstants.SKIN_ITEM_RETURN_SKINLIST] (state, payload) {
		state.SkinList = payload
		state.SkinDetails = kftools.getSkinDetails(state.SkinList)
	},
	[mutationConstants.SKIN_ITEM_FORM_RESET] (state, payload) {
		state.SkinItem = {}
		state.StageText = ''
	},
	[mutationConstants.PHYSICAL_DELETE_SKIN_ITEM] (state, payload) {
		console.log(payload)
		state.SkinList.splice(payload, 1)
		state.SkinDetails = kftools.getSkinDetails(state.SkinList)
	},
	[mutationConstants.PHYSICAL_SKIN_CHECKBOX_CHANGE] (state, payload) {
		let items = state.SkinOptions,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.PHYSICAL_SHAPES_UNUSUAL_CHECKBOX_CHANGE] (state, payload) {
		let items = state.ShapesUnusualOptions,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.PHYSICAL_WHEEL_CHAIR_CHECKBOX_CHANGE] (state, payload) {
		state.wheelChair = payload.target.value
	},
	[mutationConstants.PHYSICAL_WHEEL_CHAIR_LABEL_CLICK] (state, payload) {
		state.wheelChair = !state.wheelChair
	},
	[mutationConstants.PHYSICAL_WALKING_FRAMES_CHECKBOX_CHANGE] (state, payload) {
		state.walkingFrames = payload.target.value
	},
	[mutationConstants.PHYSICAL_WALKING_FRAMES_LABEL_CLICK] (state, payload) {
		state.walkingFrames = !state.walkingFrames
	},
	[mutationConstants.PHYSICAL_HAND_CRUTCH_SINGLE_CHECKBOX_CHANGE] (state, payload) {
		state.handCrutch.single = payload.target.value
	},
	[mutationConstants.PHYSICAL_HAND_CRUTCH_SINGLE_LABEL_CLICK] (state, payload) {
		state.handCrutch.single = !state.handCrutch.single
	},
	[mutationConstants.PHYSICAL_HAND_CRUTCH_DOUBLE_CHECKBOX_CHANGE] (state, payload) {
		state.handCrutch.double = payload.target.value
	},
	[mutationConstants.PHYSICAL_HAND_CRUTCH_DOUBLE_LABEL_CLICK] (state, payload) {
		state.handCrutch.double = !state.handCrutch.double
	},
	[mutationConstants.PHYSICAL_AXILLARY_CRUTCH_SINGLE_CHECKBOX_CHANGE] (state, payload) {
		state.axillaryCrutch.single = payload.target.value
	},
	[mutationConstants.PHYSICAL_AXILLARY_CRUTCH_SINGLE_LABEL_CLICK] (state, payload) {
		state.axillaryCrutch.single = !state.axillaryCrutch.single
	},
	[mutationConstants.PHYSICAL_AXILLARY_CRUTCH_DOUBLE_CHECKBOX_CHANGE] (state, payload) {
		state.axillaryCrutch.double = payload.target.value
	},
	[mutationConstants.PHYSICAL_AXILLARY_CRUTCH_DOUBLE_LABEL_CLICK] (state, payload) {
		state.axillaryCrutch.double = !state.axillaryCrutch.double
	},
	[mutationConstants.PHYSICAL_ELBOW_CRUTCH_SINGLE_CHECKBOX_CHANGE] (state, payload) {
		state.elbowCrutch.single = payload.target.value
	},
	[mutationConstants.PHYSICAL_ELBOW_CRUTCH_SINGLE_LABEL_CLICK] (state, payload) {
		state.elbowCrutch.single = !state.elbowCrutch.single
	},
	[mutationConstants.PHYSICAL_ELBOW_CRUTCH_DOUBLE_CHECKBOX_CHANGE] (state, payload) {
		state.elbowCrutch.double = payload.target.value
	},
	[mutationConstants.PHYSICAL_ELBOW_CRUTCH_DOUBLE_LABEL_CLICK] (state, payload) {
		state.elbowCrutch.double = !state.elbowCrutch.double
	},
	[mutationConstants.PHYSICAL_ORTHOSIS_SWITCH_CHANGE] (state, payload) {
		state.OrthosisObj = {
			Orthosis: payload.target.value ? 2 : 1,
			OrthosisNote: ''
		}
	},
	[mutationConstants.PHYSICAL_PROSTHESIS_SWITCH_CHANGE] (state, payload) {
		state.ProsthesisObj = {
			Prosthesis: payload.target.value ? 2 : 1,
			ProsthesisNote: ''
		}
	},
	[mutationConstants.PHYSICAL_VAS_SWITCH_CHANGE] (state, payload) {
		state.VASObj = {
			VAS: payload.target.value ? 2 : 1,
			VASNote: ''
		}
	},
	[mutationConstants.PHYSICAL_PAINRELIEF_SWITCH_CHANGE] (state, payload) {
		state.PainReliefObj = {
			PainRelief: payload.target.value ? 2 : 1,
			PainReliefNote: ''
		}
	},
	
	// 心理社会
	[mutationConstants.PSYCHO_SOCIAL_VIEW_POINT_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.ViewPointOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.PSYCHO_SOCIAL_MENTAL_CHECKBOX_CHANGE] (state, payload) {
		let items = state.MentalOptions,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.PSYCHO_SOCIAL_CONCERNS_NOTE_CHECKBOX_CHANGE] (state, payload) {
		let items = state.ConcernsNoteOptions,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},
	[mutationConstants.PSYCHO_SOCIAL_CONCERNS_SWITCH_CHANGE] (state, payload) {
		state.ConcernsObj = {
			Concerns: payload.target.value ? 2 : 1,
			ConcernsNote: '',
			ConcernsNote1: ''
		}
	},
	
	// 护理要点
	[mutationConstants.MAIN_POINTS_NURSING_POINT_CHECKBOX_CHANGE] (state, payload) {
		let items = state.NursingPointOptions,
			values = payload.detail.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false;
			for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
				if (items[i].value == values[j]) {
					items[i].checked = true;
					break
				}
			}
		}
	},

	[mutationConstants.SUBMIT_START] (state, payload) {
		uni.showLoading({
			title: '正在保存...'
		})
	},
	[mutationConstants.SUBMIT_DONE] (state, payload) {
		uni.hideLoading()
	},
	[mutationConstants.SHOW_MESSAGE] (state, payload) {
		uni.showToast({
			title: payload,
			icon: 'success',
			duration: 3000
		})
	},
	
	
	
	
	
	
	
	
	
	
	[mutationConstants.INPATIENT_NOTIFY_DOCTOR_SWITCH_CHANGE] (state, payload) {
		state.NotifyDoctor = payload.target.value
	},
	
	[mutationConstants.INPATIENT_CONSCIOUSNESS_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.ConsciousnessOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_COMMUNICATION_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.CommunicationOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_PHYSICAL_ACTIVITY_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.PhysicalActivityOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_SWALLOWING_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.SwallowingOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_VISION_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.VisionOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_HEARING_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.HearingOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_SKIN_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.SkinOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_CATHETER_SWITCH_CHANGE] (state, payload) {
		state.CatheterObj = {
			Catheter: payload.target.value ? 2 : 1,
			CatheterNote: ''
		}
	},
	[mutationConstants.INPATIENT_ALLERGIC_SWITCH_CHANGE] (state, payload) {
		state.AllergicObj = {
			Allergic: payload.target.value ? 2 : 1,
			AllergicNote: ''
		}
	},
	
	[mutationConstants.INPATIENT_HOSPITALIZED_TYPE_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.HospitalizedTypeOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_HOBBY_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.HobbyOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_DIET_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.DietOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_URINATION_WAYS_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.UrinationWaysOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_DEFECATION_WAYS_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.DefecationWaysOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	[mutationConstants.INPATIENT_SELF_CARE_PICKER_OPEN] (state, payload) {
		state.pickerValueArray = state.SelfHelpOptions
		state.mode = 'selector'
		state.deepLength = 1
		state.pickerValueDefault = [0]
	},
	
	
	
	
	
	
	
}

export default {
    state,
    getters,
    actions,
    mutations
}