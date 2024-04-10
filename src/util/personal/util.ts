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
      Sentence = '나는 실용적이고 조직적이며 논리적이다. ISTJ 유형입니다.'
      break
    case 'ISFJ':
      Sentence = '나는 친절하고 현실적이며 신중하다. ISFJ 유형입니다.'
      break
    case 'ESFP':
      Sentence = '나는 활동적이고 사교적이며 관대하다. ESFP 유형입니다.'
      break
    case 'ESTP':
      Sentence = '나는 대담하고 탐험을 즐기며 논리적이다. ESTP 유형입니다.'
      break
    case 'INTJ':
      Sentence = '나는 독립적이고 집중력이 강하며 논리적이다. INTJ 유형입니다.'
      break
    case 'INFJ':
      Sentence = '나는 이상적이고 창의적이며 결정력이 강하다. INFJ 유형입니다.'
      break
    case 'ENFP':
      Sentence =
        '나는 열정적이고 독창적이며 다른 사람에게 영감을 준다. ENFP 유형입니다.'
      break
    case 'ENTP':
      Sentence = '나는 창의적이고 논리적이며 호기심이 많다. ENTP 유형입니다.'
      break
    case 'ISTP':
      Sentence =
        '나는 과묵하고 논리적이며 문제 해결능력이 뛰어나다. ISTP 유형입니다.'
      break
    case 'INTP':
      Sentence = '나는 독립적이고 분석적이며 비판적이다. INTP 유형입니다.'
      break
    case 'ESTJ':
      Sentence = '나는 현실적이고 사실적이며 신뢰성이 있다. ESTJ 유형입니다.'
      break
    case 'ENTJ':
      Sentence =
        '나는 대담하고 결단력이 있으며 목표를 이루기 위해 노력한다. ENTJ 유형입니다.'
      break
    case 'ISFP':
      Sentence = '나는 예술적이고 감각적이며 융통성이 있다. ISFP 유형입니다.'
      break
    case 'INFP':
      Sentence =
        '나는 이해심이 많고 상상력이 풍부하며 진정성을 중요시한다. INFP 유형입니다.'
      break
    case 'ESFJ':
      Sentence = '나는 사교적이고 동정심이 많으며 협동적이다. ESFJ 유형입니다.'
      break
    case 'ENFJ':
      Sentence =
        '나는 친절하고 인간관계를 중요시하며 이타적이다. ENFJ 유형입니다.'
      break
    default:
      Sentence = '알 수 없는 MBTI 유형입니다.'
      break
  }
  return Sentence
}
