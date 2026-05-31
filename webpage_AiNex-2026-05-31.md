# webpage_AiNex 감사 보고서 (2026-05-31)

## 개요

본 문서는 `/home/ubuntu-02/ai_project/webpage_AiNex` 경로의 정적 웹 프로젝트에 대한 읽기 전용·근거 기반 감사 결과를 기술한다. 프로젝트는 멀티 에이전트 AI 컨설팅 플랫폼 "AiNex"의 소개용 정적 웹사이트이다.

- 구성(확인): HTML 8개(`index.html`, `community.html`, `service-intro.html`, `ai-matching.html`, `architecture-guide.html`, `local-llm-detail.html`, `hybrid-reasoning-detail.html`, `security-detail.html`), 공용 `script.js`, `style.css`, 이미지 4개(`assets/images/`), 가이드북 PDF 11종(`downloads/`), 루트 PDF/ODT 문서 다수, `README.md`, `.gitignore`, 로그 2개(`server.log`, `server_8002.log`).
- 스택(확인): HTML5/CSS3/JavaScript(ES6+). 외부 의존성은 전부 CDN 로드 — Bootstrap 5.3.2, three.js 0.149.0, GSAP 3.12.5 + ScrollTrigger. `package.json` 없음(빌드 시스템 부재).
- 실행 방식(확인, README 기준): `python3 -m http.server 8002` 또는 `npx http-server`로 정적 서빙. 빌드/번들 단계 없음.

## 실행·테스트 결과

- `package.json` 부재 확인 → build/tsc/lint 대상 없음. 정적 사이트 점검 절차로 전환.
- JS 구문 검사(확인): `node --check script.js` → 통과(OK). Node v22.22.2.
- 인라인 JS 검사(확인): 8개 HTML 모두 인라인 `<script>` 블록 없음. `<script>` 태그는 전부 외부 CDN 4종 + 공용 `script.js` 참조뿐. 별도 구문 검사 대상 없음.
- 로컬 자산 참조 무결성(확인): HTML/`script.js`의 비외부 `src`/`href` 추출 후 실제 파일과 대조. 참조된 이미지 3종(`agent_structure.jpg`, `hero_bg.png`, `security_detail.png`), `style.css`, `script.js`, 내부 HTML 페이지 링크 8종 전부 존재.
- 다운로드 참조 무결성(확인): `script.js` 가이드북 목록의 `file` 11종 모두 `downloads/`에 존재. HTML 내 별도 `downloads/` 직접 참조는 없음.
- 브랜드 스크럽 잔존 검사(확인): 텍스트 파일(html/css/js/md) 대상 대소문자 무시 정규식 `wdlab / wdlab / WDLAB@2023-2026 / wdlab / wdlab / a3_` 검사. 조치 전 1건 적발, 조치 후 재검사 결과 0건(CLEAN).
- 서버 미기동(확인): 감사 중 어떤 서버도 실행하지 않음. 파괴적 명령 미사용.

## 발견된 문제점 (확인 vs 추정, 심각도)

1. (확인 / 낮음) 브랜드 스크럽 잔존 — `script.js:322` 가이드북 목록의 `desc` 필드에 `'A3_AiNex_The_Self_Consulting_Strategic_Compass.pdf'`로 구 브랜드 접두사 `A3_`가 남아 있었음. 해당 `desc`는 모달 내 파일명 부제로 화면에 노출되는 텍스트(렌더링 위치: `script.js` 약 343행 `${item.desc}`). 동일 항목의 `file` 필드는 정상(`AiNex_Consulting_Strategic_Compass.pdf`)이라 다운로드 동작에는 영향 없음. 표시 텍스트상의 잔존이므로 심각도 낮음.

2. (확인 / 낮음) 푸터 브랜드 표기 불일치 — `index.html`, `architecture-guide.html`, `service-intro.html`, `hybrid-reasoning-detail.html`, `local-llm-detail.html`, `security-detail.html`, `README.md`는 푸터에 `WDLAB@2023-2026`을 사용하나, `community.html`(622행)과 `ai-matching.html`(138행)은 `© 2025 AiNex. All Rights Reserved.`로 다른 표기를 사용한다. 이는 브랜드 스크럽이 원본을 `WDLAB@2023-2026`으로 치환한 페이지와, 본래 "AiNex" 표기였던 페이지 간 불일치다. 오류는 아니며 일관성 문제. 위험도 판단상 자동 수정 보류(아래 미해결 항목 참조).

3. (확인 / 정보성) 스크럽 산출물의 어색한 텍스트 — 다수 푸터가 `© 2025-2026 WDLAB@2023-2026 Co.,Ltd. WDLAB@2023-2026 Working Group. All Rights Reserved.` 형태로, 동일 토큰 `WDLAB@2023-2026`이 한 문장에 두 번 등장하여 문구가 어색하다(원본 "WDLAB@2023-2026 Co.,Ltd. ... WDLAB@2023-2026 Working Group" 등 서로 다른 두 주체가 동일 문자열로 치환된 결과로 추정). 기능 영향 없음. 표현 개선은 사용자 의도 확인 필요.

4. (추정 / 정보성) 외부 CDN 의존 — Bootstrap·three.js·GSAP를 외부 CDN에서 로드하므로 오프라인/차단 환경에서는 3D 배경·애니메이션·모달 등이 동작하지 않을 수 있다(추정). 정상 인터넷 환경 기준으로는 문제 아님. 정적 검사만 수행했고 브라우저 런타임은 관측하지 않았으므로 추정으로 분류.

5. (확인 / 정보성) 미사용 자산 — `assets/images/agent_structure.png`는 존재하나 어느 파일에서도 참조되지 않음(참조는 `agent_structure.jpg?v=2`만 존재). 깨진 참조는 아니며 잔여 파일.

## 조치한 내용

- (확인) `script.js:322`의 `desc` 값을 `'A3_AiNex_The_Self_Consulting_Strategic_Compass.pdf'` → `'AiNex_The_Self_Consulting_Strategic_Compass.pdf'`로 수정하여 잔존 브랜드 접두사 `A3_`를 제거. 다른 가이드북 항목의 `desc` 명명 방식(접두사 없는 사용자용 파일명)과 일치시킴.
- 재검증(확인):
  - 브랜드 잔존 정규식 재검사 → 0건(CLEAN).
  - `node --check script.js` → 통과(OK).
  - 보존 지정 용어 `A3DE`/`A3-ADE`는 본 코드베이스에 애초에 존재하지 않음(검색 결과 0건) — 잘못 제거된 보존 용어 없음.

## 미해결·위험 항목

- (권고만) 푸터 브랜드 표기 불일치(문제점 2): `community.html`/`ai-matching.html`의 `© 2025 AiNex` 표기를 다른 페이지의 `WDLAB@2023-2026` 표기와 통일할지는 정책 판단이 필요하므로 자동 수정하지 않음. 통일이 필요하면 별도 지시 요망.
- (권고만) 스크럽 문구 중복(문제점 3): `WDLAB@2023-2026 Co.,Ltd. WDLAB@2023-2026 Working Group`의 중복 토큰 정리는 회사명/워킹그룹명 분리 표기에 대한 원 저작자 의도 확인이 필요하여 보류.
- (권고만) `server.log`, `server_8002.log`가 작업 트리에 존재하나 `.gitignore`의 Logs 규칙(`npm-debug.log*` 등)에 해당 파일명은 포함되지 않음. 추적 여부는 `.git` 비열람 원칙상 미확인. 필요 시 정리 권고.
- (정보) 외부 CDN 의존(문제점 4)은 운영 환경 정책에 따라 로컬 번들화를 고려할 수 있으나 변경 위험이 있어 권고에 그침.

## 종합 판단

정적 사이트로서 구조·자산·링크 무결성은 양호하다(확인): 로컬 자산·내부 페이지 링크·가이드북 PDF 참조가 모두 해결되며, 유일한 JS 파일 `script.js`는 구문 검사를 통과한다. 깨진 참조(broken ref)는 발견되지 않았다. 브랜드 스크럽 측면에서 조치 전 잔존 1건(`A3_` 접두사)이 있었으나 저위험 표시 텍스트로 수정 완료했고, 재검사 결과 잔존 브랜드 용어는 0건이다(CLEAN). 나머지는 기능 결함이 아닌 표기 일관성·운영 정책 성격의 항목으로, 정책 판단이 필요하여 권고로 남긴다. 정상 인터넷 환경에서 정적 서버로 서빙하면 동작에는 무리가 없을 것으로 추정한다(브라우저 런타임 미관측).
