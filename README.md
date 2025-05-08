## 🎵 OneSong

### 📄 소개

이 프로젝트는 3년 전에 개인적으로 진행했던 **랜덤 음악 추천** 아이디어를 기반으로 새롭게 리빌드한 버전입니다.

초기 프로젝트명은 'Music Roulette'이었으나, 리뉴얼하면서 프로젝트의 컨셉을 나타낼 수 있는 'OneSong'으로 변경하였습니다.

초기 버전은 `React`, `CSS Module`, `Shazam API`를 기반으로 개발되었으나,  
현재는 `Next.js`와 `TailwindCSS`를 활용하여 전체 구조와 UX를 대대적으로 개선하였습니다.

또한 기존에 사용했던 `Shazam API`의 주요 기능이 대부분 deprecated되어,  
새로운 데이터 소스를 기반으로 프로젝트를 재구성하게 되었습니다.

### 🛠 기술 스택

- `Next.js` (App Router 기반)
- `TypeScript`
- `TailwindCSS`
- `Zustand`
- `Jest`

### 📦 프로젝트 구조

```
📁 프로젝트 루트
├── __tests__/                   # 테스트 폴더 (src와 동일한 구조)
├── public/                      # 정적 파일 (favicon, manifest 등)
├── src/                         # 애플리케이션 소스 코드
│   ├── app/                     # Next.js 앱 라우팅 구조
│   │   ├── (with-audio)         # 오디오 플레이어가 고정된 페이지 레이아웃 그룹
│   │   ├── api                  # Next.js API 라우트 (서버 함수 기반 핸들러)
│   │   └── assets               # 앱 정적 자산
│   ├── components/              # 재사용 가능한 UI 및 기능 컴포넌트
│   │   ├── common/              # 공통 컴포넌트 (AudioPlayer 등)
│   │   ├── country/             # 메인 페이지 관련 컴포넌트
│   │   ├── guest/               # 비회원 전용 페이지 관련 컴포넌트
│   │   ├── icons/               # 프로바이더 아이콘 컴포넌트
│   │   ├── layouts/             # 레이아웃 관련 컴포넌트
│   │   ├── liked-songs/         # 찜한 노래 페이지 관련 컴포넌트
│   │   ├── me/                  # 회원 전용 페이지 관련 컴포넌트
│   │   └── ui/                  # shadcn/ui 기반 UI 컴포넌트 래퍼
│   ├── constants/               # 상수값 정의 (국가 코드 등)
│   ├── hooks/                   # 커스텀 훅 정의
│   ├── lib/                     # 유틸 함수 및 API fetch 로직
│   ├── providers                # 프로바이더 래퍼 컴포넌트
│   ├── stores/                  # Zustand 상태 관리 스토어
│   ├── types/                   # 타입 정의
│   ├── auth.ts                  # Auth.js 환경 설정
│   └── middleware.ts            # Next.js 미들웨어
├── jest.config.ts               # Jest 설정
├── tsconfig.json                # TypeScript 설정
├── README.md
└── package.json
```

### 🧠 상태 관리 설계 원칙

- **전역 상태**

  - 해당 상태를 소비하는 컴포넌트에서 직접 불러와서 사용
  - 전역 상태를 `props`로 전달하는 방식은 지양

- **지역 상태**
  - 해당 상태를 필요로 하는 컴포넌트에 `props`로 전달하여 사용
  - 컴포넌트 뎁스가 3단계 이상 넘어갈 경우 전역 상태로 승격 고려

### ✨ 구현 기능

#### ✅ MVP (최소 기능 구현)

- [x] 일부 국가별 랜덤 곡 추천
- [x] Apple Music RSS 기반 미리듣기 지원
- [x] 곡 제목, 아티스트명, 앨범커버, 앨범명 정보 제공
- [x] 비회원 찜한 노래 모아보기 (전역 상태 관리 + 로컬스토리지 연동)

#### ➕ 추가 구현

- [x] 오디오 플레이어 커스터마이징 (재생 / 일시정지 / 정지 / 재생 위치 표시)
- [x] 국가 선택 드롭다운 메뉴
- [x] 최근 추천 기록 저장
- [x] 회원 기능 도입 및 개별 찜한 노래 모아보기 (`Auth.js` + `Supabase DB`)
- [ ] 핵심 로직 유닛 테스트 및 렌더링 테스트

#### 🛠 구현 예정

- [ ] 아티스트 / 앨범 상세 페이지 구현 (현재는 외부 링크 처리로 대체)
- [ ] 다국어 대응
- [ ] 테스트 코드 및 배포 자동화

### 🧩 트러블 슈팅

- [ ] 오디오 플레이어 컴포넌트: 재생 중 리렌더링 발생 (2025.05.05)

  - 원인
    - Progress가 끊기듯 움직여 `requestAnimationFrame`을 적용해서 UI는 개선되었으나 `currentTime` 상태를 매 프레임 업데이트하여 과도한 리렌더링 유발
  - 시도한 방법
  - 결과

- [x] 첫 로그인 시, 이미 존재하는 이메일로 인식되어 회원가입 처리가 되지 않음 (2025.05.07)

  - 초기에 추정한 원인

    - 로그인 시 `/` 페이지에서 다시 `/country/[code]` 라우터로 리다이렉트 되면서 `AuthUserInitializer`가 두번 실행되어서 `createUser` 메서드가 두 번 호출됨
    - 이로 인해 중복 회원 생성 시도로 인한 `insert` 실패로 추정

  - 실제 원인

    - `AuthUserInitializer` 내 사이드 이펙트가 두개로 분리되어 있음
      - 1. 이메일 중복 확인 -> 없으면 `insert`
      - 2. 찜한 노래 목록을 localStorage -> Supabase DB로 이관 + 상태 플래그 업데이트
    - 비동기 실행 순서가 보장되지 않아 `insert` -> `select`와 `select` -> `insert` 레이스 발생하여 타이밍에 따라 `insert`에서 중복키 에러 발생

  - 해결 방법
    - `insert` 대신 `upsert`로 변경하여 이메일이 존재하면 넘어가고 없으면 새로 삽입하여 구조 안정성 확보
    ```ts
    const { data, error } = await supabase
      .from('users')
      .upsert(
        [
          {
            email,
            name: name ?? null,
            avatar_url: image ?? null,
            provider,
          },
        ],
        {
          onConflict: 'email',
        },
      )
      .select('id')
      .single()
    ```

- [x] Production 환경에서 `getToken()`이 항상 `null`을 반환하여 프라이빗 라우터 작동 안함 (2025.05.08)
  - 원인
    - Auth.js + App Router 프로젝트에서 `cookieName`이 보안 상의 이유로 `__Secure-authjs.session-token`으로 변경됨
    - `getToken()`은 기본적으로 `next-auth.session-token`만 인식
    - 쿠키는 브라우저 상 존재하지만, `getToken()`이 `cookieName`을 찾지 못하여 `null`을 반환
  - 해결 방법
    - `src/moddileware.ts` 내 `getToken()` 호출 시 `cookieName`을 명시적으로 지정
    ```ts
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      cookieName: '__Secure-authjs.session-token',
    })
    ```

### 🌿 브랜치 정보

- `main` — 리뉴얼된 버전
- `legacy/main` — 레거시 버전 (배포 중단, 코드만 확인 가능)
