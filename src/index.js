const $id = document.getElementById('id')
window.addEventListener('load', () => $id.focus())

const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const $submit = document.getElementById('submit')

const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const $modal = document.getElementById('modal')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')

var ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
var PW_REGEX = new RegExp('^[A-Za-z0-9]{8,16}$')

const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId: '5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidPwCheck: '비밀번호가 일치하지 않습니다.',
}

const checkRegex = (target) => {
    const { value, id } = target
    if (value.length === 0) {
        return 'required'
    } else {
        switch (id) {
            case 'id':
                return ID_REGEX.test(value) ? true : 'invalidId'
            case 'pw':
                return PW_REGEX.test(value) ? true : 'invalidPw'
            case 'pw-check':
                return value === $pw.value ? true : 'invalidPwCheck'
        }
    }
}

const checkValidation = (target, msgTarget) => {
    const isValid = checkRegex(target)
    if (isValid !== true) {
        target.classList.add('border-red-600')
        msgTarget.innerText = ERROR_MSG[isValid]
    } else {
        target.classList.remove('border-red-600')
        msgTarget.innerText = ''
    }
    return isValid
}

$id.addEventListener('focusout', () => checkValidation($id, $idMsg))

$pw.addEventListener('focusout', () => checkValidation($pw, $pwMsg))

$pwCheck.addEventListener('focusout', () =>
    checkValidation($pwCheck, $pwCheckMsg)
)

$submit.addEventListener('click', (e) => {
    e.preventDefault()
    const isValidForm =
        checkValidation($id, $idMsg) === true &&
        checkValidation($pw, $pwMsg) === true &&
        checkValidation($pwCheck, $pwCheckMsg) === true
    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

$cancelBtn.addEventListener('click', () => {
    $modal.close()
})

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
    onClickFontSizeContron('increase')
})

$decreaseFontBtn.addEventListener('click', () => {
    onClickFontSizeContron('decrease')
})

const onClickFontSizeContron = (flag) => {
    const fontSize = getHtmlFontSize()
    let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = newFontSize
    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
}
