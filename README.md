# AiNex - AI Consulting Enterprise Platform (소개용 웹페이지)

> **문서 버전**: 3.0
> **최종 수정일**: 2026년 2월 18일
> **Update Date**: Feb. 18, 2026

멀티 에이전트 기반 AI 컨설팅 엔터프라이즈 플랫폼 **AiNex**의 소개용 웹 페이지입니다.

## 주요 기능 (Key Features)

*   **몰입형 랜딩 페이지**: Three.js를 활용한 인터랙티브 3D 파티클 배경과 GSAP 기반의 스크롤 애니메이션
*   **7개 멀티 에이전트 프레임워크**: LangGraph, CrewAI, AutoGen, DSPy, LangChain, LlamaIndex, Native
*   **SVG 아키텍처 다이어그램**: AiNex Orchestrator → 7 Frameworks → Ollama LLM 3계층 시각화
*   **4대 ISO 표준 거버넌스**: ISO 42001, 23053, 24030, 38500
*   **반응형 디자인**: Bootstrap 5와 Glassmorphism 스타일 (데스크탑/모바일 최적화)
*   **가이드북 다운로드 센터**: 11종 PDF 문서 (다운로드/미리보기)
*   **커뮤니티 게시판**: 최신 토론 주제 + '더보기(Load More)' 동적 로드
*   **SaaS 가입 모달**: 3단계 회원가입 (역할 선택 → 정보 입력 → 플랜 선택)

## 기술 스택 (Tech Stack)

| 분류 | 기술 |
|------|------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **UI Framework** | Bootstrap 5.3.2 |
| **Animations** | Three.js (3D), GSAP + ScrollTrigger |
| **PDF** | PDF.js (PDF 문서 뷰어) |
| **Icons** | Bootstrap Icons 1.11.1 |

## AiNex 플랫폼 기술 스택 (Backend 참조)

| 분류 | 기술 |
|------|------|
| **LLM** | Ollama (llama3.2:3b, Local) |
| **멀티 에이전트** | LangGraph, CrewAI, AutoGen (AG2) |
| **고급 프레임워크** | DSPy, LangChain (LCEL), LlamaIndex (RAG) |
| **Native Orchestrator** | AiNex 자체 순차 오케스트레이터 (5 에이전트) |
| **Backend** | FastAPI + Uvicorn, Python 3.12 |
| **Database** | SQLite (aiosqlite) |
| **API 엔드포인트** | 145개 |
| **테스트 성공률** | 98.1% (106건 중 104건 통과) |

## 프로젝트 구조 (Project Structure)

```
webpage_AiNex/
├── index.html                    # 메인 랜딩 페이지 (7 프레임워크 소개)
├── community.html                # 커뮤니티 및 가이드북 페이지
├── service-intro.html            # 서비스 소개 페이지
├── ai-matching.html              # AI 매칭 페이지
├── architecture-guide.html       # 아키텍처 가이드 상세 (v3.0)
├── local-llm-detail.html         # 로컬 LLM 상세
├── hybrid-reasoning-detail.html  # 하이브리드 추론 상세
├── security-detail.html          # 보안 아키텍처 상세
├── script.js                     # 주요 인터랙션 및 로직
├── style.css                     # 전역 스타일 정의
├── assets/                       # 이미지 및 정적 리소스
└── downloads/                    # 가이드북 PDF 파일 저장소 (11종)
```

## 실행 방법 (Getting Started)

```bash
# Python 3
python3 -m http.server 8002

# 또는 Node.js
npx http-server -p 8002
```

브라우저에서 `http://localhost:8002`로 접속하여 확인합니다.

## 주요 업데이트 내역

### 2026-02-18 (v3.0)
*   7개 멀티 에이전트 프레임워크 반영 (LangGraph, CrewAI, AutoGen, DSPy, LangChain, LlamaIndex, Native)
*   SVG 아키텍처 다이어그램 추가 (Orchestrator → 7 Frameworks → Ollama LLM)
*   ISO 23053 추가 (4대 ISO 표준 완성)
*   기술 스택 전면 업데이트 (llama3.2:3b, 145 API, 98.1% 테스트)
*   아키텍처 가이드 v3.0 업데이트
*   서비스 소개 페이지 7 프레임워크 반영
*   전 페이지 Copyright 업데이트

### 2026-01-10
*   문서 정비, README 파일 업데이트 및 프로젝트 정보 최신화

---

**Copyright &copy; 2025-2026 A3 Security Co.,Ltd. AITF Working Group. All Rights Reserved.**
