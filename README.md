# ![vvv-logo](https://github.com/RE-V-UP/vvv/assets/152264010/640533e6-34db-4735-9c54-3756adae835c)(Volume Up)

### < 목차 >

**# 프로젝트 팀 "V-UP(Volume Up)"소개**

- 팀원소개

**# 프로젝트 소개**

- 개발 기간 & 프로젝트 명 & 소개 & 목표 & 프로젝트 Rule

**# 시작가이드**

- Installation

**# 와이어프레임**

- 프로젝트 화면 구성 및 기능

  - 필수 사항

  - 선택 사항

  - 트러블슈팅

  - 기능담당

  - 기능소개

- 파일 구조





<br />

## 프로젝트 팀 "VVV(VakVakVerse)" 소개

<br />

**팀원 소개**

---

|                   성예지                   |                 강지수                 |                     남해리                     |                   서가희                   |       전주용       |
| :----------------------------------------: | :------------------------------------: | :--------------------------------------------: | :----------------------------------------: | :----------------: |
|                    ISTP                    |                  ISFP                  |                   ENFJ/ISTJ                    |                    ESTP                    |        ENFJ        |
|                  <p></p>                   |                <p></p>                 |                    <p></p>                     |                  <p></p>                   |      <p></p>       |
| [@dpwl032](https://github.com/dpwl032) | [@jigico](https://github.com/jigico) | [@r03181231](https://github.com/r03181231) | [@seokahee](https://github.com/kahee430) |      [@iinon00](https://github.com/iinon00)      |
|                    팀장                    |                  팀원                  |                      팀원                      |                    팀원                    |        팀원        |
|                          |                    |                                    |                         |  |




<br />

<br />



**팀 목표** 

---

\- 포기하지 말자! 낙오되지 말자!

\- 소통을 두려워하지 말자!

\- 혼자 생각하지 않기

\-궁금한 거 참지 말고 물어보기!!



<br />


<br />



## "![vvv-logo](https://github.com/RE-V-UP/vvv/assets/152264010/d526f6f2-4891-4ae0-acd1-4d18886bff27)(Volume Up)"

**배포 도메인** : https://vvv-fawn.vercel.app/

**프로젝트 명** : V-UP (Volume Up, 불륨업)

**개발 기간** : 2024.03. 25~ 2023.04.15 (13일) 

**프로젝트 소개** : 음악 플레이어와 커뮤니티를 동시에 즐길 수 있는 플랫폼입니다.

**프로젝트 목표** : 플레이어로 음악을 들으면서, 커뮤니티를 통해 사용자들은 평소 취향에 맞는 음악을 추천하고 추천받음과 동시에 또 평소에 많이 듣지 않은 장르도 편하게 탐색할 수 있습니다. 사용자에게 다양한 음악 경험을 제공합니다.

<br />

### 🚦 Project Rules

#### **개발 환경(버전참고)**

- **Environment :** Visual Studio Code, git(2.37.3), github
- **Language :**  Javascript
- **Framwork** : React (v18.2.0)
- **Library** : zustand(^4.5.2), next-auth(^4.24.7), tanstack/react-query(^5.28.9), style-components(v6.1.8), chart.js(^4.4.2), eslint(^9.0.0), tailwindcss(^3.3.0), tailwind-scrollbar-hide(^1.1.7), prettier-plugin-tailwindcss(^0.5.13)
- **DB**:  supabase(v2.41.1)
- **Communication** : figma, slack, notion, zep, canva

<br />

### Code Convention

1. interface 보단 type 쓰기
2. types.d.ts 파일 이용하기
3. import 시 import **type** "이름" 으로 type 붙여주고 간격 띄우기

### 네이밍 원칙

- 모호하지 않고 기능을 설명하는 이름 사용
- 검색 가능한 이름 사용
- 동사 - 목적어 순으로 작명
- 넘버링 금지
- 인코딩을 회피하는 네이밍 필수 (접두사, 타입 정보 명시 금지)
- 변수 혹은 함수 이름에 축약어 사용 금지 (btn → button)
- 폴더명은 소문자

### 네이밍 방법

- camelCase → 변수, 함수 이름
- PascalCase → class / component
- snake_case → 안 씀
- SNAKE_CASE → 상수 표현
- kebab-case → route or path name (e.g. /main-page) / class-name
- 변수나 함수는 위와 같이 귀찮더라도 최대한 풀네임으로 작성!! ex) onChangeHandler

### 함수 원칙

- 새로운 리액트 함수 선언은 rafce 스니펫 사용
- 화살표 함수 사용
- 하나의 함수는 하나의 기능만 하도록 설계
- 인수 최소화
- 사이드 이펙트 발생 방지
- 플래그 인수 금지 (독립적인 메소드로 분리 가능하게 설계)

### 주석

- 원칙적으로 코드 내 주석 금지 (좋은 코드는 코드 자체로 기능을 설명할 수 있어야 함)
- 의도를 명확히 전달하고자 할 때 주석 사용
- 결과에 대한 경고를 전달하고자 할 때 주석 사용

### 소스코드 구조

- 변수와 함수는 사용하는 곳에 가까이 위치하도록 설계
- 위에서 아래로 읽어내려갈 수 있도록 코드 작성
- 공백은 상하 내용의 관련성을 표기하기 위해 사용

### Tailwind CSS 클래스 네임

- 공식문서 목차에 나열되는 순서대로 작성

### 라이브러리 설치

- yarn 사용 → npm 사용 금지

### 타입스크립트

- interface 보단 type 쓰기
- types.d.ts 파일 이용하기
- import 시 import **type** “이름” 으로 type 붙여주고 간격 띄우기



- 프리티어 설정 :

```json
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": true,
  "printWidth": 80,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleAttributePerLine": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}

```


<br />

<br />

<br />



### **📚프로젝트 운영 방식 및 Rules 예시📚**

  #### **깃허브 규칙**

  - 브랜치 이름 : 기능 이름

------

  #### 깃헙 커밋 규칙

| 타입     | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| Feat     | 기능 구현                                                    |
| Fix      | 버그 수정                                                    |
| Refactor | 코드 리팩토링                                                |
| chore    | 기능에 영향을 주지 않는 코드 수정                            |
| Style    | 스타일링 관련 코드 추가/수정                                 |
| Minor    | 마이너 한 변경사항 (오타 수정, 탭 사이즈 변경, 변수명 변경 등) |
| test     | 테스트 코드                                                  |
| Dir      | 폴더 구조 수정                                               |

### Commit Convention

#### 아래 헤더를 사용해 커밋 메시지 작성

- 헤더 목록
  - Feat : 기능 추가
  - Fix : 버그 수정
  - Refactor : 코드 리팩토링
  - Chore : 기능에 영향을 주지 않는 코드 수정
  - Style : 스타일링 관련 코드 추가/수정
  - Minor : 마이너 한 변경사항 (오타 수정, 탭 사이즈 변경, 변수명 변경 등)
  - Test : 테스트 코드 관련
  - Dir : 폴더 구조 수정
- 커밋 메시지 제목은 50자 미만으로 작성
- 이슈와 관련된 커밋이라면 헤더 뒤에 이슈 번호 명시

### 커밋 메시지 예시

**Feat(#12) : 신규 input 태그에 대한 이벤트 함수 추가**

참고 : 브랜치 빼고 다 대문자!

------





<br />

<br />

<br />

---


## 🚩시작 가이드

<br />

### Installation

```bash
$ git clone https://github.com/RE-V-UP/vvv.git
$ cd vvv
$ yarn install or npm install
$ yarn run start or npm run start
```

### Environment variable

- 파일 이름 : .env.local
- 변수 이름1 : NEXT_PUBLIC_SUPABASE_URL
- 변수 이름2 : NEXT_PUBLIC_SUPABASE_ANON_KEY
- 변수 이름3 : NEXTAUTH_SECRET
- 변수 이름4 : NEXTAUTH_URL
- 변수 이름5 : KAKAO_CLIENT_ID
- 변수 이름6 : KAKAO_CLIENT_SECRET
  
  
- DB는 supabase를 사용하여 관련된 변수 이름을 부여
- Supabase 클라이언트를 초기화하기 위한 도우미 파일 : src/shared/supabase/supabase.ts

