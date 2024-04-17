import React from 'react'
import { INPUT_FOCUS, INPUT_SHADOW } from '../login/loginCss'

const AllowUserInfo = () => {
  return (
    <textarea
      name='allowUserInfo'
      id='allowUserInfo'
      cols={30}
      rows={10}
      disabled
      className={`flex h-[90px] w-[320px] items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary ${INPUT_SHADOW}  ${INPUT_FOCUS} text-[rgba(255,255,255,0.4)]`}
    >
      &#60;개인정보 활용 동의서&#62; ## 본인은 회원가입을 위해 서비스 운영자에게
      제공되는 개인정보가 아래의 목적으로 활용되는 것에 동의합니다. 1.
      **수집항목**: 이름, 이메일 주소, 연령 등 2. **목적**: 서비스 제공,
      고객지원, 이벤트 참여 등 3. **보유 및 이용기간**: 회원 탈퇴 시 혹은
      이용계약 종료 시까지 본인은 개인정보 제공에 동의하지 않을 권리가 있으며,
      동의하지 않을 경우 회원가입이 제한될 수 있음을 인지하고 있습니다.
      &#60;회원가입 약관&#62; 1. &#60;목적&#62; 이 약관은 음악감상 웹사이트(이하
      "서비스")의 이용조건 및 절차, 회원과 서비스 운영자 간의 권리 의무 및
      책임사항 등을 규정함을 목적으로 합니다. 2. **정의** 1. "회원"이란 본
      서비스에 접속하여 이 약관에 따라 서비스 이용계약을 체결하고, 서비스를
      이용하는 이용자를 의미합니다. 2. "운영자"란 본 서비스를 제공하는 주체를
      의미합니다. 3. **약관의 효력과 변경** 1. 본 약관은 회원가입 시에
      동의함으로써 효력을 발생합니다. 2. 운영자는 합리적인 사유가 발생할 경우
      약관을 변경할 수 있으며, 변경된 약관은 적용일자를 명시하여 웹사이트를 통해
      공지합니다. 변경된 약관에 대한 회원의 의견을 듣고 필요한 경우 회원의
      동의를 얻을 수 있습니다. 4. **회원가입** 1. 서비스 이용을 위해서는
      회원가입이 필요합니다. 2. 회원가입 시에는 본 약관에 동의해야 합니다. 5.
      **개인정보의 보호 및 이용** 1. 운영자는 서비스의 제공을 위하여 회원의
      개인정보를 수집할 수 있습니다. 2. 운영자는 회원의 개인정보를 보호하기 위해
      최선을 다하며, 개인정보의 보호 및 이용에 대한 자세한 사항은 개인정보
      처리방침에서 확인할 수 있습니다. 6. **서비스의 제공 및 이용** 1. 운영자는
      회원에게 서비스를 제공합니다. 2. 회원은 서비스를 본래의 용도 이외의
      목적으로 사용해서는 안 됩니다. 7. **서비스의 변경 및 중단** 1. 운영자는
      운영상, 기술상의 필요에 따라 서비스의 전부 또는 일부를 수정, 변경, 중단할
      수 있습니다. 8. **책임의 한계** 1. 운영자는 천재지변, 국가비상사태 또는 그
      밖에 합리적인 운영자의 통제 불가능한 사유로 인한 서비스 중단에 대하여
      책임을 지지 않습니다. 9. **분쟁의 해결** 1. 본 약관 및 서비스 이용에 관한
      분쟁에 대하여는 운영자의 본사 소재지 관할 법원을 관할법원으로 합니다.
    </textarea>
  )
}

export default AllowUserInfo
