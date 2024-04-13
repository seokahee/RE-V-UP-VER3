export const mbtiMatch = (mbti: string) => {
  let mbtiCode
  switch (mbti) {
    case 'ISTJ':
      mbtiCode = 0
      break
    case 'ISFJ':
      mbtiCode = 1
      break
    case 'ESFP':
      mbtiCode = 2
      break
    case 'ESTP':
      mbtiCode = 3
      break
    case 'INTJ':
      mbtiCode = 4
      break
    case 'INFJ':
      mbtiCode = 5
      break
    case 'ENFP':
      mbtiCode = 6
      break
    case 'ENTP':
      mbtiCode = 7
      break
    case 'ISTP':
      mbtiCode = 8
      break
    case 'INTP':
      mbtiCode = 9
      break
    case 'ESTJ':
      mbtiCode = 10
      break
    case 'ENTJ':
      mbtiCode = 11
      break
    case 'ISFP':
      mbtiCode = 12
      break
    case 'INFP':
      mbtiCode = 13
      break
    case 'ESFJ':
      mbtiCode = 14
      break
    case 'ENFJ':
      mbtiCode = 15
      break
    default:
      mbtiCode = 0
      break
  }
  return mbtiCode
}

export const SentenceMatch = (mbti: string) => {
  let Sentence
  switch (mbti) {
    case 'ISTJ':
      Sentence =
        'ISTJ 유형으로, 신중하고 현실적으로 안정과 조직을 중요시 합니다.클래식 음악과 재즈와 같이 조용하고 안정된 분위기를 가진 음악을 즐기는 편입니다!'
      break
    case 'ISFJ':
      Sentence =
        'ISFJ 유형으로 주변 사람들을 돕고 지원하는 데 열정적입니다.포크 음악과 팝 발라드와 같이 감성적이고 따뜻한 음악을 선호합니다!'
      break
    case 'ESFP':
      Sentence =
        'ESFP 유형으로 사람들과의 연결을 중요시하며, 즉흥적이고 활기찬 활동을 즐깁니다. 팝 음악과 댄스 음악과 같이 활기찬 리듬과 즐거운 분위기를 가진 음악을 선호합니다!'
      break
    case 'ESTP':
      Sentence =
        'ESTP 모험을 추구하고 즉흥적으로 행동하며 현실적이고 경쟁적인 환경을 선호합니다. 록 음악과 힙합과 같이 파워풀하고 활기찬 음악을 선호합니다!'
      break
    case 'INTJ':
      Sentence =
        'INTJ 유형으로 독립적이고 논리적으로 지적 탐구와 독창성이 중요시됩니다. 클래식 음악과 인스트루멘털 음악과 같이 지적이고 혁신적인 음악을 선호합니다!'
      break
    case 'INFJ':
      Sentence =
        'INFJ 유형으로 인간적 가치와 미래에 대한 비전을 추구합니다. 어쿠스틱 음악과 알앤비와 같이 감성적이고 정신적인 음악을 선호합니다!'
      break
    case 'ENFP':
      Sentence =
        'ENFP  유형으로, 창의적이고 자유로운 영혼을 가졌습니다!일렉트로닉 음악과 팝송을 즐기며 새로운 경험을 즐기는 편입니다!'
      break
    case 'ENTP':
      Sentence =
        'ENTP유형으로 로운 아이디어를 탐구하고 도전을 즐깁니다. 얼터너티브 록과 인디 음악과 같이 독특하고 실험적인 음악을 선호합니다!'
      break
    case 'ISTP':
      Sentence =
        'ISTP 유형으로 실용적인 문제 해결에 능숙하고 독립적이고 자유로운 활동을 즐깁니다. 록 음악과 헤비 메탈과 같이 활기찬 리듬과 동적인 음악을 선호합니다!'
      break
    case 'INTP':
      Sentence =
        'INTP 유형으로 지적인 호기심을 가지고 세계를 탐구합니다. 프로그레시브 락과 전자 음악과 같이 복잡하고 실험적인 음악을 선호합니다!'
      break
    case 'ESTJ':
      Sentence =
        'ESTJ 유형으로 조직과 안정을 중요시하며 신속하고 효율적인 방식으로 목표를 달성합니다. 클래식 음악과 포크 음악과 같이 전통적이고 안정된 음악을 선호합니다!'
      break
    case 'ENTJ':
      Sentence =
        'ENTJ 유형으로 리더십과 성취를 추구하며 도전과 성공을 통해 자신을 발전시킵니다. 락 음악과 헤비 메탈과 같이 파워풀하고 자신감 넘치는 음악을 선호합니다!'
      break
    case 'ISFP':
      Sentence =
        'ISFP 유형으로 자유로운 영혼으로 다양한 감성을 표현합니다. 팝 뮤직과 힙합과 같이 다양한 음악을 즐기며, 개성적이고 자유로운 분위기를 좋아합니다!'
      break
    case 'INFP':
      Sentence =
        'INFP 유형으로 내면의 가치와 미래에 대한 비전을 중요시합니다. 앤비와 어쿠스틱 음악과 같이 감성적이고 깊은 감정을 담은 음악을 선호합니다!'
      break
    case 'ESFJ':
      Sentence =
        'ESFJ 유형으로 사회적인 연결을 중요시하며, 안정된 관계를 유지합니다. 팝 음악과 디스코 음악과 같이 활기찬 분위기와 사랑스러운 멜로디를 가진 음악을 선호합니다!'
      break
    case 'ENFJ':
      Sentence =
        'ENFJ 유형으로 인간적 가치와 사회적 변화를 추구하며 타인에게 영감을 주고 지원합니다. 포크 음악과 팝 발라드와 같이 감성적이고 따뜻한 음악을 선호합니다!'
      break
    default:
      Sentence = '알 수 없는 MBTI 유형입니다.'
      break
  }
  return Sentence
}
