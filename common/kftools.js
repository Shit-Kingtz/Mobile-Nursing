// 扩展日期
Date.prototype.format = function (format) {
    let date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

// 判断是否登录
function isLogin() {
	let EmployeeName = uni.getStorageSync('EmployeeName')
	if (EmployeeName == '') {
		plus.nativeUI.alert('会话已超时，请重新登录')
		uni.switchTab({
			url: '/pages/login/login'
		})
	}
}

// 根据出生年月计算年龄
function Ages(DateOfBirth) {
	let r = DateOfBirth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
	if (r == null) return false
	let d = new Date(r[1], r[3] - 1, r[4])
	if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
		let Y = new Date().getFullYear()
		return (Y - r[1])
	}
	return ("输入的日期格式错误！")
}

// 格式化时间 默认格式 yyyy-MM-dd hh:mm
function formatDate(date, format) {
	// 日期格式化
	if (date == null || date == "" || date == "NaN-aN-aN aN:aN") {
		return ""
	}
	if (typeof date == 'string') {
		return new Date(date.replace('T', ' ')).format(format == null ? "yyyy-MM-dd hh:mm" : format)
	} else {
		return ""
	}
}

function formatRecord(str) {
	if (!str) {
		return ''
	}
	let arr = str.split('|'),
		nStr = '',
		nArr = [],
		rArr = []
	arr.forEach((val, index) => {
		if (val == '' && index != 0) {
			val = ';'
		}
		if ((index - 3) % 4 != 0) {
			nStr += val
		}
		if (index == arr.length - 2) {
			nStr += val == '静脉点滴' ? '静滴' : val
		}
		nStr += ' '
	})
	
	nStr.split(';').forEach((val, index) => {
		if (val !== ' ') {
			rArr.push(val)
		}
	})
	
	return rArr
}

function checkBoxValueInit(str) {
	let arr = str ? str.split(',').filter((item) => {
		if (item !== '') {
			return item
		}
	}) : []
	let checkBoxArr = getArray(arr)
	return checkBoxArr
}

function getArray(arr) {
	let rs = []
	for(let i in arr) {
		rs.push(parseInt(arr[i]))
	}
	return rs
}

function getSkinDetails(list) {
	let length = list.length
	if (length) {
		return list.map((item) => {
			let contentArray = []
			contentArray.push('部位：' + item.SkinPart)
			let area = []
			if (item.SkinArea) {
				area.push(item.SkinArea + 'cm²')
			}
			if (item.SkinArea1) {
				area.push(item.SkinArea1 + 'cm')
			}
	
			contentArray.push('面积：' + area.join(' '))
			contentArray.push('分期：' + item.SkinLevel)
			
			return contentArray
		})
	}
}

function getUlcerDetails(list) {
	let length = list.length
	if (length) {
		return list.map((item) => {
			let contentArray = []
			contentArray.push('日期：' + item.Uloccutime)
			contentArray.push('压疮部位：' + (item.UlcerPart ? item.UlcerPart : ''))	
			contentArray.push('压疮面积：' + (item.UlcerArea ? item.UlcerArea : ''))
			contentArray.push('压疮分期：' + (item.Ulcerstage ? item.Ulcerstage : ''))
			contentArray.push('分泌物：' + (item.Secretion ? item.Secretion : ''))
			return contentArray
		})
	}
}

function getCheckBoxStr(arr) {
	let values = []
	arr.forEach(item => {
		item.checked ? values.push(1) : values.push(0)
	})
	
	return ',' + values.join(',')
}

function getApplianceStr(wheelChair, walkingFrames, handCrutch, axillaryCrutch, elbowCrutch) {
	let values = []
	wheelChair ? values.push(1) : values.push(0)
	walkingFrames ? values.push(1) : values.push(0)
	handCrutch.single ? values.push(1) : values.push(0)
	handCrutch.double ? values.push(1) : values.push(0)
	axillaryCrutch.single ? values.push(1) : values.push(0)
	axillaryCrutch.double ? values.push(1) : values.push(0)
	elbowCrutch.single ? values.push(1) : values.push(0)
	elbowCrutch.double ? values.push(1) : values.push(0)
	
	return ',' + values.join(',')
}

function getOutcomeSkinRadio1Str(OutcomeSkinRadio1Obj) {
	let values = [OutcomeSkinRadio1Obj.Option1, OutcomeSkinRadio1Obj.Option2, OutcomeSkinRadio1Obj.Option3]
	return ',' + values.join(',')
}

function getClassName(type) {
	if (type == '1') {
		return 'drug'
	} else if (type == '2') {
		return 'treatment'
	} else {
		return 'other'
	}
}

// 获取身份确认arr - 转运交接
function GetIdentityConfirmationStrArr(TypeStr) {
	let result = [],
		options = ['腕带', '病历', '病家陈述'],
		arr = TypeStr.split(',').filter((item) => {
			if (item !== '') {
				return item
			}
		})
	
	for (let i in arr) {
		if (arr[i] == '1') {
			result.push(options[i])
		}
	}

	return result
}

// 获取意识形态str - 转运交接
function GetConsciousnessStr(type) {
	let options = ['清醒', '模糊', '嗜睡', '浅昏迷', '深昏迷']
	return type == 0 ? '' : options[type - 1]
}

function getFallAssessmentRadio(str) {
	let arr = str ? str.split(',').filter((item) => {
		if (item !== '') {
			return item
		}
	}) : []
	let checkBoxArr = getArray(arr)
	if (checkBoxArr[0] ^ checkBoxArr[1] == 1) {
		return checkBoxArr[0] == 1 ? 0 : 1
	} else {
		return 0
	}
}

function calculateFallScore(str, options) {
	let scoreValue = []
	options.forEach((item) => {
		if (item.checked) {
			scoreValue.push(parseInt(item.value.split('_')[0]))
		} else {
			scoreValue.push(0)
		}
	})
	
	return Math.max.apply(null, scoreValue)
}

function getFallSwitchStr(number) {
	return number == 1 ? ',0,1' : ',1,0'
}

function guid() {
	return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4();
}

function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

module.exports = {
	isLogin: isLogin,
	Ages: Ages,
	formatDate: formatDate,
	formatRecord: formatRecord,
	checkBoxValueInit: checkBoxValueInit,
	getSkinDetails: getSkinDetails,
	getCheckBoxStr: getCheckBoxStr,
	getApplianceStr: getApplianceStr,
	getClassName: getClassName,
	GetIdentityConfirmationStrArr: GetIdentityConfirmationStrArr,
	GetConsciousnessStr: GetConsciousnessStr,
	getFallAssessmentRadio: getFallAssessmentRadio,
	calculateFallScore: calculateFallScore,
	getFallSwitchStr: getFallSwitchStr,
	getUlcerDetails: getUlcerDetails,
	getOutcomeSkinRadio1Str: getOutcomeSkinRadio1Str,
	guid: guid(),
}