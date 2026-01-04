# AiNex - AI Consulting & Analyst Platform

AiNex는 AI 컨설팅 및 분석 서비스를 제공하는 웹 플랫폼입니다. 사용자가 AI 서비스를 이해하고, 적합한 솔루션을 매칭받으며, 커뮤니티를 통해 정보를 공유할 수 있도록 설계되었습니다.

## 🌟 주요 기능 (Key Features)

*   **몰입형 랜딩 페이지**: Three.js를 활용한 인터랙티브 3D 파티클 배경과 GSAP 기반의 스크롤 애니메이션으로 세련된 사용자 경험을 제공합니다.
*   **반응형 디자인**: Bootstrap 5와 커스텀 CSS(Glassmorphism 스타일)를 사용하여 데스크탑 및 모바일 환경에 최적화되었습니다.
*   **가이드북 다운로드 센터 (`community.html`)**:
    *   다양한 AI 관련 기술 문서(PDF)를 제공합니다.
    *   사용자는 파일을 **다운로드**하거나, **새 창에서 미리보기**를 할 수 있습니다.
*   **커뮤니티 게시판**:
    *   최신 토론 주제를 리스트 형태로 제공하며, '더보기(Load More)' 기능을 통해 추가 게시글을 동적으로 로드합니다.
*   **상세 서비스 소개**:
    *   AI 매칭, 서비스 소개, 아키텍처 가이드 등 각 분야별 상세 페이지를 제공합니다.

## 🛠️ 기술 스택 (Tech Stack)

*   **Frontend**: HTML5, CSS3, JavaScript (ES6+)
*   **UI Framework**: Bootstrap 5.3.2
*   **Animations & Graphics**:
    *   [Three.js](https://threejs.org/) (3D 배경 효과)
    *   [GSAP](https://gsap.com/) (스크롤 트리거 및 애니메이션)
*   **Utilities**:
    *   Bootstrap Icons
    *   PDF.js (PDF 문서 처리 관련)

## 📂 프로젝트 구조 (Project Structure)

```
webpage_AiNex/
├── index.html                  # 메인 랜딩 페이지
├── community.html              # 커뮤니티 및 가이드북 페이지
├── service-intro.html          # 서비스 소개 페이지
├── ai-matching.html            # AI 매칭 페이지
├── architecture-guide.html     # 아키텍처 가이드 상세
├── local-llm-detail.html       # 로컬 LLM 상세
├── hybrid-reasoning-detail.html# 하이브리드 추론 상세
├── script.js                   # 주요 인터랙션 및 로직 (모달, 애니메이션 등)
├── style.css                   # 전역 스타일 정의
├── assets/                     # 이미지 및 정적 리소스
└── downloads/                  # 가이드북 PDF 파일 저장소
```

## 🚀 실행 방법 (Getting Started)

이 프로젝트는 정적 웹사이트로 구성되어 있어, 간단한 정적 파일 서버로 실행할 수 있습니다.

### Python 사용 시 (Recommended)
프로젝트 루트 디렉토리에서 아래 명령어를 실행하세요.

```bash
# Python 3
python3 -m http.server 8002
```

브라우저에서 `http://localhost:8002`로 접속하여 확인합니다.

### Node.js (http-server) 사용 시
```bash
npx http-server -p 8002
```

## 📝 주요 업데이트 내역
*   **PDF 뷰어 개선**: 가이드북 미리보기 시 모달 겹침 현상을 해결하기 위해 브라우저 새 탭(`window.open`)에서 열리도록 변경.
*   **네비게이션 개선**: Home 링크 클릭 시 현재 작업 흐름을 유지하기 위해 새 탭에서 열리도록 설정.
*   **자료 업데이트**: 최신 AI 트렌드 및 거버넌스 관련 PDF 자료 4종 추가 (총 11종).
