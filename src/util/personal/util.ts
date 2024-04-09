export const mbtiMatch = (mbti: string) => {
  let mbtiCode;
  switch (mbti) {
    case "ISTJ":
      mbtiCode = 0;
      break;
    case "ISFJ":
      mbtiCode = 1;
      break;
    case "ESFP":
      mbtiCode = 2;
      break;
    case "ESTP":
      mbtiCode = 3;
      break;
    case "INTJ":
      mbtiCode = 4;
      break;
    case "INFJ":
      mbtiCode = 5;
      break;
    case "ENFP":
      mbtiCode = 6;
      break;
    case "ENTP":
      mbtiCode = 7;
      break;
    case "ISTP":
      mbtiCode = 8;
      break;
    case "INTP":
      mbtiCode = 9;
      break;
    case "ESTJ":
      mbtiCode = 10;
      break;
    case "ENTJ":
      mbtiCode = 11;
      break;
    case "ISFP":
      mbtiCode = 12;
      break;
    case "INFP":
      mbtiCode = 13;
      break;
    case "ESFJ":
      mbtiCode = 14;
      break;
    case "ENFJ":
      mbtiCode = 15;
      break;
    default:
      mbtiCode = 0;
      break;
  }
  return mbtiCode;
};
