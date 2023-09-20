// TODO: 이 곳에 정답 코드를 작성해주세요.

// 1. 페이지가 로드 된 시점에 id 입력창에 focus가 되어있어야함.
// 대상 : id 입력 input
// 이벤트 : 페이지가 로드되었을 때
// 핸들러 : Focus()
const $id = document.getElementById('id')
// 페이지 로드되었을 때 auto focus
window.addEventListener('load', () => $id.focus())
// input태그에서 autofocus넣는 방법도 있음

// 2. 유효성 검사 로직
// 대상 : ID, 비밀번호, 비밀번호 확인 input
// 이벤트 : (1) input focus out, (2) 가입하기 버튼 눌렀을 때
// 핸들러 : (1) 해당 input의 유효성 검사 (2) 모든 필드의 유효성 검사
const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const $submit = document.getElementById('submit')

// 3. 커스텀 에러 메세지
const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')

// 모달
const $modal = document.getElementById('modal')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

// 취소하기 가입하기 버튼
const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

// 폰트 버튼
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')

var ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
var PW_REGEX = new RegExp('^[A-Za-z0-9]{8,16}$')

const ID_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능합니다.',
}

const PW_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
}

const PWCHECK_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '비밀번호가 일치하지 않습니다.',
}

const checkIdRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return ID_REGEX.test(value) ? true : 'invalid'
    }
}

const checkIdValidation = (value) => {
    // 모든 필드의 값은 빠짐없이 입력해야 합니다.
    // 정규표현식 배우기 https://regexr.com/
    const isValidId = checkIdRegex(value)
    // 3. 에러 메시지
    // (1) 비어 있을 때 (2) 유효하지 않은 값을 때
    // input태그에 border-red-600 class 추가 && msg div에 에러 메시지 추가
    if (isValidId !== true) {
        $id.classList.add('border-red-600')
        $idMsg.innerText = ID_ERROR_MSG[isValidId]
    } else {
        $id.classList.remove('border-red-600')
        $idMsg.innerHTML = ''
    }

    return isValidId
}

$id.addEventListener('focusout', () => checkIdValidation($id.value))

const checkPwRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return PW_REGEX.test(value) ? true : 'invalid'
    }
}

const checkPwValidation = (value) => {
    // 8~16자, 영문 대/소문자, 숫자 사용 가능
    const isValidPw = checkPwRegex(value)

    if (isValidPw !== true) {
        $pw.classList.add('border-red-600')
        $pwMsg.innerText = PW_ERROR_MSG[isValidPw]
    } else {
        $pw.classList.remove('border-red-600')
        $pwMsg.innerText = ''
    }

    return isValidPw
}
$pw.addEventListener('focusout', () => checkPwValidation($pw.value))

const checkPwCheckRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return value === $pw.value ? true : 'invalid'
    }
}

const checkPwCheckValidation = (value) => {
    // 비밀번호와 일치
    const isValidPwCheck = checkPwCheckRegex(value)

    if (isValidPwCheck !== true) {
        $pwCheck.classList.add('border-red-600')
        $pwCheckMsg.innerText = PWCHECK_ERROR_MSG[isValidPwCheck]
    } else {
        $pwCheck.classList.remove('border-red-600')
        $pwCheckMsg.innerText = ''
    }

    return isValidPwCheck
}

$pwCheck.addEventListener('focusout', () =>
    checkPwCheckValidation($pwCheck.value)
)

$submit.addEventListener('click', (e) => {
    e.preventDefault() // submit이 가진 form이 가진 걸 서버로 보내는걸 막음
    const isValidForm =
        checkIdValidation($id.value) === true &&
        checkPwValidation($pw.value) === true &&
        checkPwCheckValidation($pwCheck.value) === true
    // 모달 창 오픈
    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

// 취소하기 버튼 누르면 모달 닫기
$cancelBtn.addEventListener('click', () => {
    $modal.close()
})

// 동의하기 버튼
$approveBtn.addEventListener('click', () => {
    window.alert('가입되었습니다 🥳 ')
    $modal.close()
})

// 5. 폰트 사이즈 조절
const $html = document.documentElement
const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12
const getHtmlFontSize = () => {
    return parseFloat(window.getComputedStyle($html).fontSize)
}
$increaseFontBtn.addEventListener('click', () => {
    // fontsize +1px
    onClickFontSizeContron('increase')
    // DOM.style.fontSize = ''
    // const nextFontSize = getHtmlFontSize() + 1
    // $html.style.fontSize = nextFontSize
    // // 만약 20px 이상이면 increaseBtn비활
    // if (nextFontSize >= MAX_FONT_SIZE) {
    //     $increaseFontBtn.disabled = true
    // }
    // if (nextFontSize > MIN_FONT_SIZE) {
    //     $decreaseFontBtn.disabled = false
    // }
})
$decreaseFontBtn.addEventListener('click', () => {
    //font -1px
    onClickFontSizeContron('decrease')
    // const nextFontSize = getHtmlFontSize() - 1
    // $html.style.fontSize = nextFontSize
    // if (nextFontSize <= MIN_FONT_SIZE) {
    //     $decreaseFontBtn.disabled = true
    // }
    // if (nextFontSize < MAX_FONT_SIZE) {
    //     $increaseFontBtn.disabled = false
    // }
})

const onClickFontSizeContron = (flag) => {
    const fontSize = getHtmlFontSize()
    let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = newFontSize

    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
}
