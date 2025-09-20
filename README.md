# SixthSense Frontend

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand + TanStack Query
- **Forms**: React Hook Form + Zod

## 폴더 구조

```
src/
├── app/                    # 페이지 (Next.js App Router)
│   └── [feature]/         # 기능별 페이지 (예: home, my)
│       ├── (api)/         # API 로직
│       ├── (component)/   # 페이지 전용 컴포넌트
│       ├── (hook)/        # 페이지 전용 훅
│       ├── (state)/       # 페이지 전용 상태
│       ├── (util)/        # 페이지 전용 유틸
│       ├── (abc)/         # 기타 페이지 전용 무언가
│       └── page.tsx       # 페이지 컴포넌트
│       └── layout.tsx     # 레이아웃 컴포넌트 (optional)
├── assets/                # 정적 에셋
│   ├── icon/             # 아이콘 (svg만)
│   └── image/            # 기타 이미지
└── shared/               # 공통 코드 모음
    ├── components/       # 다른 페이지에서 공통으로 사용되는 재사용 컴포넌트
    ├── hooks/           # 공통 훅
    ├── libs/            # 라이브러리 관련 코드
    ├── stores/          # 전역 상태 관리 (Zustand)
    ├── types/           # 전역 타입 정의
    └── utils/           # 기타 유틸리티 함수
```

## 개발 규칙

### 파일 배치

- **페이지**: `src/app/[feature]/`
- **페이지 전용 코드**: `src/app/[feature]/(폴더)/`
- **재사용 코드**: `src/shared/`
- **정적 에셋 파일**: `src/assets/`

### 네이밍

- **페이지**: `PascalCase.tsx` + `export default`

  ```typescript
  // HomePage.tsx
  export default function HomePage() {
    return (
      <main>
        {/* ... 페이지 내용 ... */}
      </main>
    );
  }
  ```

- **컴포넌트**: `PascalCase.tsx` + `export const`

  ```typescript
  // Button.tsx
  export const Button = ({ children, ...props }) => {
    // ... 컴포넌트 로직 ...
    return <button {...props}>{children}</button>;
  };
  ```

- **훅**: `useXxx.ts`

  ```typescript
  // useAuth.ts
  export const useAuth = () => {
    // ... 훅 로직 ...
    return { user, login, logout };
  };
  ```

- **폴더**: `snake_case`

  ```
  user_profile/
  auth_service/
  product_list/
  ```

- **기타 함수**: `kebab-case.ts`
  ```typescript
  // format-date.ts
  export const formatDate = (date: Date) => {
    // ... 함수 로직 ...
  };
  ```

### 컴포넌트 구조

- **페이지 최상위 태그**: `<main>` 사용 필수

### 임포트

- **절대 경로**: `@/shared/components/Button` (@ alias 우선 사용)
- **정적 에셋**: `import Icon from '@/assets/icon/logo.svg'` (PascalCase로 임포트)

## API 연동

### API 타입별 사용법

- **publicAPI**: 인증이 필요 없는 공개 API (회원가입, 로그인 등)
- **privateAPI**: JWT 토큰 인증이 필요한 API (사용자 정보, 개인 데이터 등)
- **internalAPI**: Next.js API Route 호출 (`/api/*` 경로)

```typescript
// 사용 예시
import { publicAPI, privateAPI, internalAPI } from "@/shared/api/apiInstance";

// 공개 API
publicAPI.post("/auth/login", data);

// 프라이빗 API (자동으로 Bearer token 추가)
privateAPI.get("/user/profile");

// 내부 API
internalAPI.post("/upload", formData);
```

## 개발 워크플로우

### 커밋 규칙

| feat(#이슈번호)     | 일반적인 코드 추가/수정                                                               |
| ------------------- | ------------------------------------------------------------------------------------- |
| fix(#이슈번호)      | 코드 오류, 버그 해결                                                                  |
| ui(#이슈번호)       | UI 작업                                                                               |
| api(#이슈번호)      | API 연동 관련 작업                                                                    |
| refactor(#이슈번호) | 리팩토링(같은 기능을 하지만, 코드 가독성이나 로직 측면에서 더 효율적으로 수정한 경우) |
| chore(#이슈번호)    | 기타 패키지 설정이라든지 설정 파일 건든다던지..                                       |
| actions(#이슈번호)  | Github Actions 건들때                                                                 |
| add(#이슈번호)      | 파일 추가한경우                                                                       |
| remove(#이슈번호)   | 파일 삭제한경우                                                                       |
| hotfix(#이슈번호)   | 급하게 수정할경우                                                                     |

### 개발 프로세스

1. **브랜치 생성**: `feature/기능명` 또는 `fix/버그명`
2. **개발 및 커밋**: 위 커밋 규칙에 따라 커밋
3. **푸시**: 해당 브랜치로 푸시
4. **PR 생성**: `(해당 브랜치) → develop` PR 생성
5. **CI 통과**: ESLint, Prettier 검사 통과 확인
6. **셀프 머지**: 본인이 직접 머지 후 알림
7. **배포**: `develop → main` PR로 CI/CD 거쳐 프로덕션 배포
