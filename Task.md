# Task: 대전우리병원 사용자 중심 리뉴얼 구현 태스크

> PRD.md 기반 상세 구현 태스크 목록

---

## Phase 1: Foundation (기반 구축)

### 1.1 프로젝트 초기 설정
- [ ] **T1.1.1** Next.js 14 프로젝트 생성 (App Router, TypeScript)
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
  ```
- [ ] **T1.1.2** 추가 패키지 설치
  - 스타일링: `tailwind-merge`, `clsx`
  - UI: `lucide-react`, `framer-motion`, `@radix-ui/react-dialog`, `@radix-ui/react-accordion`
  - 상태관리: `zustand`
  - 폼: `react-hook-form`, `zod`, `@hookform/resolvers`
- [ ] **T1.1.3** ESLint, Prettier 설정 파일 구성
- [ ] **T1.1.4** 폴더 구조 생성 (PRD 8장 참조)

### 1.2 디자인 시스템 구축
- [ ] **T1.2.1** `tailwind.config.ts` 커스텀 설정
  - Primary 컬러 팔레트 (50~900)
  - Semantic 컬러 (success, warning, error, info)
  - Gray 스케일 (50~900)
  - 폰트 패밀리 (Pretendard)
  - 폰트 사이즈 스케일 (Silver-Friendly)
  - 스페이싱 스케일
  - 브레이크포인트
- [ ] **T1.2.2** `src/styles/globals.css` 작성
  - CSS 변수 정의
  - Pretendard 폰트 로드
  - 기본 리셋 스타일
- [ ] **T1.2.3** `src/lib/utils.ts` 유틸리티 함수 작성
  - `cn()` 클래스 병합 함수

### 1.3 기본 UI 컴포넌트
- [ ] **T1.3.1** `Button.tsx` 컴포넌트
  - Variants: primary, secondary, ghost, danger
  - Sizes: sm, md, lg
  - States: default, hover, active, disabled, loading
  - 최소 높이 48px (터치 접근성)
- [ ] **T1.3.2** `Card.tsx` 컴포넌트
  - 기본 카드, 호버 효과, 클릭 가능 카드
  - 패딩 24px, 라운드 16px
- [ ] **T1.3.3** `Input.tsx` 컴포넌트
  - 텍스트, 전화번호, 날짜 타입
  - 라벨, 에러 메시지, 헬퍼 텍스트
  - 높이 48px
- [ ] **T1.3.4** `Select.tsx` 컴포넌트
  - 드롭다운 선택
  - 접근성 준수 (키보드 네비게이션)
- [ ] **T1.3.5** `Modal.tsx` 컴포넌트
  - Radix UI Dialog 기반
  - 반응형 (모바일: 바텀시트, 데스크톱: 센터 모달)
- [ ] **T1.3.6** `Badge.tsx` 컴포넌트
  - 태그/상태 표시용
- [ ] **T1.3.7** `src/components/ui/index.ts` 배럴 파일 작성

### 1.4 레이아웃 컴포넌트
- [ ] **T1.4.1** `Header.tsx` 컴포넌트
  - 로고, 네비게이션 메뉴
  - 모바일 햄버거 메뉴
  - 스크롤 시 배경 변화
- [ ] **T1.4.2** `Navigation.tsx` 컴포넌트
  - 데스크톱: 상단 가로 메뉴
  - 모바일: 슬라이드 사이드 메뉴
- [ ] **T1.4.3** `Footer.tsx` 컴포넌트
  - 병원 정보, 연락처, 진료시간
  - 소셜 링크, 저작권
- [ ] **T1.4.4** `StickyActionBar.tsx` 컴포넌트
  - 하단 고정 (60px)
  - 카톡 상담, 전화 연결, 온라인 예약 버튼
  - backdrop-blur 효과
  - Safe Area 대응
- [ ] **T1.4.5** `src/app/layout.tsx` 루트 레이아웃 구성

### 1.5 Mock Data 생성
- [ ] **T1.5.1** `src/types/` 타입 정의
  - `doctor.ts`: Doctor, TimeSlot 인터페이스
  - `center.ts`: Center, Treatment 인터페이스
  - `symptom.ts`: Symptom, BodyPart 타입
  - `booking.ts`: Booking, BookingStatus 인터페이스
- [ ] **T1.5.2** `src/data/doctors.ts` 의료진 목데이터
  - 최소 8명 이상의 의료진 데이터
  - 각 센터별 2명 이상 배치
- [ ] **T1.5.3** `src/data/centers.ts` 센터 목데이터
  - 5개 센터 (척추, 관절, 통증, 재활, 검진)
  - 각 센터별 진료 항목
- [ ] **T1.5.4** `src/data/symptoms.ts` 증상 목데이터
  - 7개 부위별 증상 목록
  - 증상-센터 연결 관계
- [ ] **T1.5.5** `src/data/timeSlots.ts` 시간 슬롯 데이터
  - 의료진별 진료 가능 시간

---

## Phase 2: Core Features (핵심 기능)

### 2.1 메인 페이지
- [ ] **T2.1.1** `HeroSection.tsx` 히어로 섹션
  - 대형 타이틀, 서브 카피
  - CTA 버튼 (예약하기)
  - 배경 이미지/그라데이션
  - 반응형 레이아웃
- [ ] **T2.1.2** `QuickBookingCTA.tsx` 빠른 예약 CTA
  - 증상 빠른 선택 버튼들
  - "어디가 불편하신가요?" 프롬프트
- [ ] **T2.1.3** `CenterShowcase.tsx` 전문 센터 소개
  - 5개 센터 카드 그리드
  - 호버/탭 인터랙션
  - 더보기 링크
- [ ] **T2.1.4** `DoctorHighlight.tsx` 의료진 하이라이트
  - 주요 의료진 3~4명 캐러셀
  - 프로필 카드
- [ ] **T2.1.5** 오시는 길 미니맵 섹션
  - 지도 미리보기
  - 주소, 전화번호
  - 상세보기 링크
- [ ] **T2.1.6** `src/app/page.tsx` 메인 페이지 조합

### 2.2 예약 시스템 - 상태 관리
- [ ] **T2.2.1** `src/stores/bookingStore.ts` Zustand 스토어
  - 상태: currentStep, selectedBodyParts, selectedSymptoms, selectedDoctor, selectedDateTime, patientInfo
  - 액션: setStep, addSymptom, removeSymptom, setDoctor, setDateTime, setPatientInfo, resetBooking

### 2.3 예약 시스템 - Step 1: 증상 선택
- [ ] **T2.3.1** `BodyPartSelector.tsx` 부위 선택 UI
  - 인체 일러스트 (SVG) 또는 버튼 그리드
  - 7개 부위 선택 가능
  - 다중 선택 지원
  - 선택 상태 시각적 피드백
- [ ] **T2.3.2** `SymptomSelector.tsx` 증상 선택 UI
  - 선택된 부위에 해당하는 증상 목록
  - 체크박스/태그 형태
  - 증상 설명 툴팁
- [ ] **T2.3.3** `src/app/booking/symptom/page.tsx` 증상 선택 페이지
  - 프로그레스 바 (Step 1/4)
  - 부위 선택 → 증상 선택 플로우
  - 다음 버튼 (최소 1개 증상 선택 필수)

### 2.4 예약 시스템 - Step 2: 의료진 선택
- [ ] **T2.4.1** `DoctorCard.tsx` 의료진 카드
  - 프로필 이미지
  - 이름, 직책
  - 전문 분야 태그
  - 주요 경력 요약
  - 선택 버튼
- [ ] **T2.4.2** `DoctorList.tsx` 의료진 목록
  - 매칭 알고리즘 (증상 기반 추천)
  - 정렬 옵션 (추천순, 경력순, 빠른예약순)
  - 필터 기능
- [ ] **T2.4.3** `src/app/booking/doctor/page.tsx` 의료진 선택 페이지
  - 프로그레스 바 (Step 2/4)
  - "선택하신 증상에 맞는 전문의" 안내
  - 이전/다음 버튼

### 2.5 예약 시스템 - Step 3: 시간 선택
- [ ] **T2.5.1** `BookingCalendar.tsx` 예약 캘린더
  - 월간/주간 뷰 토글
  - 예약 가능 날짜 표시
  - 오늘 이전 날짜 비활성화
- [ ] **T2.5.2** `TimeSlotPicker.tsx` 시간 슬롯 선택
  - 30분 단위 시간 버튼
  - 예약 가능/마감 상태 표시
  - 오전/오후 구분
- [ ] **T2.5.3** `src/app/booking/schedule/page.tsx` 시간 선택 페이지
  - 프로그레스 바 (Step 3/4)
  - 선택된 의료진 정보 표시
  - 캘린더 + 시간 슬롯 조합

### 2.6 예약 시스템 - Step 4: 예약 확정
- [ ] **T2.6.1** `BookingForm.tsx` 예약 폼
  - 필드: 이름, 연락처, 생년월일, 증상 메모
  - React Hook Form + Zod 유효성 검사
  - 개인정보 동의 체크박스
- [ ] **T2.6.2** `BookingSummary.tsx` 예약 요약
  - 선택한 증상, 의료진, 날짜/시간 표시
  - 수정 링크
- [ ] **T2.6.3** `src/app/booking/confirm/page.tsx` 예약 확정 페이지
  - 프로그레스 바 (Step 4/4)
  - 요약 + 폼
  - 예약 완료 버튼
- [ ] **T2.6.4** 예약 완료 모달/페이지
  - 성공 메시지
  - 예약 번호 (시뮬레이션)
  - 홈으로, 예약 확인 버튼

### 2.7 예약 시스템 - 통합
- [ ] **T2.7.1** `src/app/booking/page.tsx` 예약 랜딩 페이지
  - 예약 시스템 소개
  - 시작하기 버튼 → /booking/symptom
- [ ] **T2.7.2** `src/app/booking/layout.tsx` 예약 레이아웃
  - 공통 프로그레스 바
  - 뒤로가기 네비게이션

---

## Phase 3: Content Pages (콘텐츠 페이지)

### 3.1 전문 센터
- [ ] **T3.1.1** `CenterCard.tsx` 센터 카드 컴포넌트
  - 고해상도 이미지
  - 센터명, 소개
  - 주요 진료 태그
  - 자세히 보기 버튼
- [ ] **T3.1.2** `src/app/centers/page.tsx` 센터 목록 페이지
  - 5개 센터 그리드/리스트
  - 센터별 대표 컬러 적용
- [ ] **T3.1.3** `CenterDetail.tsx` 센터 상세 컴포넌트
  - 히어로 이미지
  - 센터 소개
  - 진료 항목 상세
  - 해당 센터 의료진
  - 예약 CTA
- [ ] **T3.1.4** `src/app/centers/[slug]/page.tsx` 센터 상세 페이지
  - 동적 라우팅 (spine, joint, pain, rehab, checkup)

### 3.2 의료진 소개
- [ ] **T3.2.1** `src/app/doctors/page.tsx` 의료진 목록 페이지
  - 전체 의료진 그리드
  - 센터별 필터
  - 검색 기능
- [ ] **T3.2.2** `src/app/doctors/[id]/page.tsx` 의료진 상세 페이지
  - 프로필 이미지 대형
  - 학력, 경력, 자격 목록
  - 전문 분야 상세
  - 해당 의료진 예약 CTA

---

## Phase 4: Support Features (지원 기능)

### 4.1 오시는 길
- [ ] **T4.1.1** `Map.tsx` 지도 컴포넌트
  - 카카오/네이버 지도 API 연동 (또는 정적 이미지)
  - 병원 마커
  - 줌 컨트롤
- [ ] **T4.1.2** `src/app/location/page.tsx` 오시는 길 페이지
  - 지도
  - 주소, 전화번호
  - 자가용 안내 (주차 정보)
  - 대중교통 안내 (버스 노선)
  - 네비게이션 앱 연동 버튼

### 4.2 증명서 발급
- [ ] **T4.2.1** `src/app/certificate/page.tsx` 증명서 발급 페이지
  - 증명서 종류별 카드
  - 발급 방법 안내 (온라인/방문)
  - 필요 서류 체크리스트
  - 발급 절차 스텝 가이드
  - FAQ 아코디언

### 4.3 문의하기
- [ ] **T4.3.1** `src/app/contact/page.tsx` 문의하기 페이지
  - 연락처 정보
  - 진료 시간 안내
  - 문의 폼 (시뮬레이션)

---

## Phase 5: Polish (마무리)

### 5.1 애니메이션
- [ ] **T5.1.1** 페이지 트랜지션 (Framer Motion)
- [ ] **T5.1.2** 스크롤 애니메이션 (섹션 진입 시)
- [ ] **T5.1.3** 호버/클릭 마이크로 인터랙션
- [ ] **T5.1.4** 로딩 스피너/스켈레톤 UI

### 5.2 반응형 최적화
- [ ] **T5.2.1** 모바일 (320px ~ 639px) 테스트
- [ ] **T5.2.2** 태블릿 (640px ~ 1023px) 테스트
- [ ] **T5.2.3** 데스크톱 (1024px+) 테스트
- [ ] **T5.2.4** 터치 타겟 44px 이상 검증

### 5.3 접근성
- [ ] **T5.3.1** 키보드 네비게이션 테스트
- [ ] **T5.3.2** 스크린 리더 테스트
- [ ] **T5.3.3** 컬러 대비 WCAG AA 검증
- [ ] **T5.3.4** ARIA 레이블 검수

### 5.4 성능 최적화
- [ ] **T5.4.1** 이미지 최적화 (Next.js Image)
- [ ] **T5.4.2** 코드 스플리팅 확인
- [ ] **T5.4.3** Lighthouse 성능 측정 (목표: 90점+)
- [ ] **T5.4.4** Core Web Vitals 검증

---

## 작업 체크리스트 요약

| Phase | 태스크 수 | 예상 복잡도 |
|-------|----------|------------|
| Phase 1: Foundation | 25개 | 중간 |
| Phase 2: Core Features | 22개 | 높음 |
| Phase 3: Content Pages | 6개 | 낮음 |
| Phase 4: Support Features | 4개 | 낮음 |
| Phase 5: Polish | 12개 | 중간 |
| **Total** | **69개** | - |

---

## 의존성 관계

```
Phase 1 (Foundation)
    ↓
    ├── T1.2 디자인 시스템 → T1.3 UI 컴포넌트 → T1.4 레이아웃
    └── T1.5 Mock Data → Phase 2 전체

Phase 2 (Core Features)
    ↓
    ├── T2.2 상태관리 → T2.3~T2.6 예약 단계
    └── T2.1 메인페이지 (독립적)

Phase 3 (Content Pages) ← Phase 1, 2 완료 후

Phase 4 (Support Features) ← Phase 1 완료 후 (독립적)

Phase 5 (Polish) ← Phase 1~4 완료 후
```

---

## 시작 명령어

```bash
# 1. 프로젝트 초기화
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. 추가 패키지 설치
npm install tailwind-merge clsx lucide-react framer-motion zustand react-hook-form zod @hookform/resolvers

# 3. Radix UI 컴포넌트 설치
npm install @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-checkbox @radix-ui/react-select

# 4. 개발 서버 시작
npm run dev
```

---

*Task Document Version: 1.0*
*Created: 2025-01-07*
*Based on: PRD.md v1.0*
