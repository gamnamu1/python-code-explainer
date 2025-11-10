# 파이썬 코드 설명 생성기 (Python Code Explainer)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green.svg)](https://nodejs.org/)

AI 기반 파이썬 코드 분석 및 설명 생성 웹 애플리케이션입니다. 파이썬 코드를 입력하면 **초등학생 수준**과 **전공자 수준** 두 가지 난이도로 자동 해설을 제공합니다.

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [사용 방법](#-사용-방법)
- [프로젝트 구조](#-프로젝트-구조)
- [개발 배경](#-개발-배경)
- [라이선스](#-라이선스)

## 🎯 프로젝트 소개

**파이썬 코드 설명 생성기**는 코딩 지식이 부족한 초보자부터 기술적 이해가 필요한 전공자까지, 각자의 수준에 맞는 파이썬 코드 설명을 제공하는 교육용 웹 애플리케이션입니다.

### 왜 이 프로젝트를 만들었나요?

시민 주도 플랫폼을 개발하려면 여러 개발자의 협업이 필요합니다. 하지만 프로젝트 기획자가 코딩 지식이 부족하면 다른 개발자들이 작성한 코드를 이해하기 어렵습니다. 이 도구는 그러한 격차를 해소하고, 비개발자도 코드의 흐름과 구조를 이해할 수 있도록 돕기 위해 만들어졌습니다.

## ✨ 주요 기능

### 1. 두 가지 수준의 설명 제공

- **초등학생 수준**: 비유와 친근한 말투로 코딩 개념을 쉽게 설명
  - 예: "마법 도구 상자", "보물 찾기" 등의 비유 사용
  - 변수, 함수, 반복문 등 기본 개념을 일상 언어로 풀어서 설명
  
- **전공자 수준**: 기술적 용어와 개념을 사용한 전문적 설명
  - 라이브러리, 데이터 구조, 알고리즘 등 정확한 용어 사용
  - 코드의 작동 원리와 내부 메커니즘 상세 설명

### 2. 다양한 입력 방식

- 파이썬 파일(.py) 업로드
- 텍스트 영역에 직접 코드 입력 또는 붙여넣기

### 3. 코드 하이라이팅

- 설명 내 코드 블록 자동 색상 입히기
- 각 코드 블록마다 복사 버튼 제공

### 4. 반응형 디자인

- 데스크톱, 태블릿, 모바일 모든 기기에서 최적화된 UI

## 🛠 기술 스택

### Frontend
- **React 19**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성 보장
- **Tailwind CSS 4**: 유틸리티 우선 CSS 프레임워크
- **shadcn/ui**: 고품질 UI 컴포넌트 라이브러리
- **Vite**: 빠른 개발 서버 및 빌드 도구

### Backend
- **Express 4**: Node.js 웹 프레임워크
- **tRPC 11**: 타입 안전 API 통신
- **Drizzle ORM**: TypeScript 우선 ORM

### Database
- **MySQL/TiDB**: 관계형 데이터베이스

### AI/ML
- **Manus LLM API**: 코드 분석 및 자연어 설명 생성

### Authentication
- **Manus OAuth**: 사용자 인증 및 권한 관리

## 🚀 시작하기

### 필요 조건

- Node.js 22 이상
- pnpm 패키지 매니저
- MySQL 또는 TiDB 데이터베이스

### 설치

```bash
# 리포지토리 클론
git clone https://github.com/gamnamu1/python-code-explainer.git
cd python-code-explainer

# 의존성 설치
pnpm install

# 환경 변수 설정
# .env 파일을 생성하고 필요한 환경 변수를 설정하세요
# DATABASE_URL, JWT_SECRET, BUILT_IN_FORGE_API_KEY 등

# 데이터베이스 마이그레이션
pnpm db:push

# 개발 서버 실행
pnpm dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

## 📖 사용 방법

### 1. 코드 입력

- 방법 1: "파이썬 파일(.py)을 클릭하여 업로드" 영역을 클릭하여 `.py` 파일 선택
- 방법 2: 텍스트 영역에 파이썬 코드 직접 입력 또는 붙여넣기

### 2. 분석 실행

- "코드 분석하기" 버튼 클릭
- AI가 코드를 분석하는 동안 대기 (약 5-15초)

### 3. 설명 확인

- **초등학생 수준** 탭: 쉬운 설명 확인
- **전공자 수준** 탭: 전문적인 설명 확인
- 코드 블록 우측 상단의 복사 버튼으로 코드 복사

## 📁 프로젝트 구조

```
python-code-explainer/
├── client/                 # 프론트엔드
│   ├── src/
│   │   ├── pages/         # 페이지 컴포넌트
│   │   │   └── Home.tsx   # 메인 페이지
│   │   ├── components/    # 재사용 가능한 컴포넌트
│   │   ├── lib/           # 유틸리티 및 설정
│   │   └── App.tsx        # 앱 라우팅
│   └── public/            # 정적 파일
├── server/                # 백엔드
│   ├── routers.ts         # tRPC 라우터 (API 엔드포인트)
│   ├── db.ts              # 데이터베이스 쿼리 헬퍼
│   └── _core/             # 코어 시스템 (OAuth, LLM 등)
├── drizzle/               # 데이터베이스
│   ├── schema.ts          # 데이터베이스 스키마
│   └── meta/              # 마이그레이션 메타데이터
├── todo.md                # 프로젝트 TODO 리스트
├── userGuide.md           # 사용자 가이드
└── README.md              # 이 파일
```

### 주요 파일 설명

- **`server/routers.ts`**: 코드 분석 API 로직이 구현된 파일
  - `analyzeCode` 프로시저: 파이썬 코드를 분석하고 두 가지 수준의 설명 생성
  - `getHistory` 프로시저: 사용자의 분석 이력 조회

- **`client/src/pages/Home.tsx`**: 메인 페이지 UI
  - 파일 업로드 및 텍스트 입력 기능
  - 탭 전환 및 결과 표시

- **`drizzle/schema.ts`**: 데이터베이스 스키마
  - `users` 테이블: 사용자 정보
  - `code_analyses` 테이블: 코드 분석 이력

## 💡 개발 배경

이 프로젝트는 **CR(Critical Reader) 프로젝트**를 진행하는 과정에서 탄생했습니다. CR 프로젝트는 시민들이 AI를 활용하여 뉴스 기사의 품질과 신뢰성을 평가하는 시민 주도 언론 비평 플랫폼입니다.

프로젝트 기획자가 파이썬 기초만 공부한 상태에서 본격적인 플랫폼 개발을 시작하려니, 다른 개발자들과 협업할 때 코드를 이해하는 데 어려움이 있었습니다. "어떤 코드가 어떤 기능을 하고, 어디와 어디가 어떻게 연결되는지" 정도라도 이해할 필요가 있다고 느꼈고, 그래서 이 **파이썬 코드 설명 생성기**를 만들게 되었습니다.

### 설계 원칙

사용자가 요청한 설명 방식을 따릅니다:

> "쉽고 정확하게, 비유를 들어, 하나하나 풀어서 설명해 주기를 바랍니다."

예를 들어, 함수 정의를 설명할 때:

```python
def add_1(x, y):
    result = x + y + 1
    return result
```

**초등학생 수준 설명 예시:**
> "(파이썬아) 함수를 정의할게(def). 함수 이름은 'add_1'이고, 이 함수에 들어갈 매개변수는 x, y 두 개야. 함수가 해야 할 일은 주어진 두 개의 매개변수를 더하고 1을 더한 후 값을 변수 result에 '할당(=)'하는 거야. 그리고 그 result라는 변수의 값을 리턴하는 거지."

## 🤝 기여하기

이 프로젝트는 오픈소스이며, 기여를 환영합니다!

1. 이 리포지토리를 Fork 합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---
