// Three.js Background Animation
const initThree = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    const animate = () => {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Subtle mouse follow
        particlesMesh.rotation.y += mouseX * 0.05;
        particlesMesh.rotation.x += -mouseY * 0.05;

        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Scroll Animations
const initAnimations = () => {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Navbar transparency
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.glass-nav');
        if (!nav) return;
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 6, 8, 0.95)';
            nav.style.padding = '0.5rem 0';
        } else {
            nav.style.background = 'rgba(5, 6, 8, 0.7)';
            nav.style.padding = '1rem 0';
        }
    });

    // Fade up elements
    gsap.fromTo('.content-fade-up',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    // Fade in common elements
    gsap.utils.toArray('.fade-in').forEach(elem => {
        gsap.to(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                onEnter: () => elem.classList.add('active')
            }
        });
    });
};

/* SaaS Signup Modal Injection & Logic */
const injectSignupModal = () => {
    // Inject HTML only if it doesn't exist
    if (!document.getElementById('signupModal')) {
        const modalHtml = `
    <div class="modal fade" id="signupModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content text-white" style="background-color: #0d1117; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold">AiNex 플랫폼 가입</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="progress mb-4" style="height: 6px; background: rgba(255,255,255,0.05);">
                        <div id="signupProgress" class="progress-bar bg-primary-glow" role="progressbar" style="width: 25%;"></div>
                    </div>
                    <form id="signupForm">
                        <!-- Step 1 -->
                        <div class="signup-step" id="step1">
                            <h4 class="mb-4 text-center">회원 종류 선택</h4>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="role-card p-4 text-center border rounded-4 cursor-pointer" onclick="selectRole('corporate')">
                                        <i class="bi bi-building fs-1 mb-3 d-block text-primary"></i>
                                        <h5 class="fw-bold">기업 회원</h5>
                                        <p class="small text-muted">AI/AX 도입 담당자</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="role-card p-4 text-center border rounded-4 cursor-pointer" onclick="selectRole('consultant')">
                                        <i class="bi bi-person-workspace fs-1 mb-3 d-block text-accent"></i>
                                        <h5 class="fw-bold">AX 컨설턴트</h5>
                                        <p class="small text-muted">전문 컨설턴트/매니저</p>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" name="role" id="selectedRole">
                        </div>
                        <!-- Step 2 -->
                        <div class="signup-step d-none" id="step2">
                            <h4 id="step2Title" class="mb-4 text-center">정보 입력</h4>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label small text-muted">성함</label>
                                    <input type="text" class="form-control bg-dark border-secondary text-white" name="name" required placeholder="홍길동">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label small text-muted">이메일</label>
                                    <input type="email" class="form-control bg-dark border-secondary text-white" name="email" required placeholder="alex@ainex.ai">
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label small text-muted">비밀번호</label>
                                    <input type="password" class="form-control bg-dark border-secondary text-white" name="password" required>
                                </div>
                                <div class="col-md-12" id="corporateField">
                                    <label class="form-label small text-muted">회사명</label>
                                    <input type="text" class="form-control bg-dark border-secondary text-white" name="company" placeholder="회사명을 입력하세요">
                                </div>
                                <div class="col-md-12 d-none" id="consultantField">
                                    <label class="form-label small text-muted">전문 분야</label>
                                    <input type="text" class="form-control bg-dark border-secondary text-white" name="specialty" placeholder="예: 전략, 인프라, 보안">
                                </div>
                            </div>
                            <div class="mt-4 d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary" onclick="prevStep(1)">이전</button>
                                <button type="button" class="btn btn-primary" onclick="nextStep(3)">다음</button>
                            </div>
                        </div>
                        <!-- Step 3 -->
                        <div class="signup-step d-none" id="step3">
                            <h4 class="mb-4 text-center">플랜 선택</h4>
                            <div class="row g-2">
                                <div class="col-3">
                                    <div class="tier-card p-2 text-center border rounded-3 cursor-pointer" onclick="selectTier('free')">
                                        <div class="fw-bold small">Free</div>
                                        <div class="text-primary smaller">무용</div>
                                        <div class="smaller text-muted mt-1">1 Proj</div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="tier-card p-2 text-center border rounded-3 cursor-pointer" onclick="selectTier('basic')">
                                        <div class="fw-bold small">Basic</div>
                                        <div class="text-primary smaller">100만</div>
                                        <div class="smaller text-muted mt-1">10 Proj</div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="tier-card p-2 text-center border rounded-3 cursor-pointer" onclick="selectTier('pro')">
                                        <div class="fw-bold small">Pro</div>
                                        <div class="text-accent smaller">250만</div>
                                        <div class="smaller text-muted mt-1">30 Proj</div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="tier-card p-2 text-center border rounded-3 cursor-pointer" onclick="selectTier('enterprise')">
                                        <div class="fw-bold small">Ent.</div>
                                        <div class="text-success smaller">협의</div>
                                        <div class="smaller text-muted mt-1">unlimit</div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" name="tier" id="selectedTier">
                            <div class="mt-4 d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary" onclick="prevStep(2)">이전</button>
                                <button type="submit" class="btn btn-primary-glow px-4">가입 완료</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // Bind Submission (Crucial: Do this regardless of whether we injected HTML or it was already there)
    const form = document.getElementById('signupForm');
    if (form) {
        // Remove existing listener to prevent duplicates if this function is called multiple times
        form.removeEventListener('submit', handleSignup);
        form.addEventListener('submit', handleSignup);
    }
};

window.selectRole = (role) => {
    document.getElementById('selectedRole').value = role;
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    if (role === 'corporate') {
        document.getElementById('corporateField').classList.remove('d-none');
        document.getElementById('consultantField').classList.add('d-none');
        document.getElementById('step2Title').innerText = '기업 회원 정보 입력';
    } else {
        document.getElementById('corporateField').classList.add('d-none');
        document.getElementById('consultantField').classList.remove('d-none');
        document.getElementById('step2Title').innerText = 'AX 컨설턴트 정보 입력';
    }
    setTimeout(() => nextStep(2), 300);
};

window.selectTier = (tier) => {
    document.getElementById('selectedTier').value = tier;
    document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
};

window.nextStep = (step) => {
    document.querySelectorAll('.signup-step').forEach(s => s.classList.add('d-none'));
    const target = document.getElementById('step' + step);
    if (target) target.classList.remove('d-none');
    document.getElementById('signupProgress').style.width = (step / 3 * 100) + '%';
};

window.prevStep = (step) => nextStep(step);

const handleSignup = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    try {
        const res = await fetch('http://localhost:8001/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        // 404 Not Found -> Fallback to Demo Mode
        if (res.status === 404) {
            throw new Error('API Endpoint Not Found');
        }

        const result = await res.json();
        if (res.ok) {
            alert('가입 성공!');
            localStorage.setItem('ainex_token', result.access_token);
            finalizeTier(data.tier);
            location.reload();
        } else {
            alert('오류: ' + (result.detail || '가입 실패'));
        }
    } catch (err) {
        console.warn('Backend unavailable or 404. Activating Demo Mode.');
        localStorage.setItem('ainex_token', 'demo_token');
        finalizeTier(data.tier);
        alert('가입 완료 (데모 모드)');
        location.reload();
    }
};

const finalizeTier = (tier) => {
    let limit = 1;
    if (tier === 'basic') limit = 10;
    else if (tier === 'pro') limit = 30;
    else if (tier === 'enterprise') limit = 999;
    localStorage.setItem('ainex_project_limit', limit);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThree();
    initAnimations();
    injectSignupModal();
    injectGuideModal(); // New Guidebook Modal
});

// Resiliency
window.addEventListener('pageshow', () => ScrollTrigger.refresh());
window.addEventListener('hashchange', () => setTimeout(() => ScrollTrigger.refresh(), 100));

/* Guidebook Download Modal Injection */
const injectGuideModal = () => {
    if (document.getElementById('guideModal')) return;

    const guidebookFiles = [
        { name: 'AiNex Strategic Compass', file: 'AiNex_Consulting_Strategic_Compass.pdf', desc: 'A3_AiNex_The_Self_Consulting_Strategic_Compass.pdf' },
        { name: 'Vol.1 Framework', file: 'AiNex_Framwork_vol_1.pdf', desc: 'AiNex_이용자 메뉴얼 해설집_Framwork(vol_1).pdf' },
        { name: 'Vol.2 ISO 42001', file: 'AiNex_ISO42001_vol_2.pdf', desc: 'AiNex_이용자 메뉴얼 해설집_ISO42001(vol_2).pdf' },
        { name: 'Vol.3 ISO 38500', file: 'AiNex_ISO38500_vol_3.pdf', desc: 'AiNex_이용자 메뉴얼 해설집_ISO38500(vol_3).pdf' },
        { name: 'Vol.4 ISO 24030', file: 'AiNex_ISO24030_vol_4.pdf', desc: 'AiNex_이용자 메뉴얼 해설집_ISO24030(vol_4).pdf' },
        { name: 'Vol.5 ISO 23053', file: 'AiNex_ISO23053_vol_5.pdf', desc: 'AiNex_이용자 메뉴얼 해설집_ISO23053(vol_5).pdf' },
        { name: 'AiNex Workflow', file: 'AiNex_Workflow.pdf', desc: 'AiNex 설계 개념 및 워크플로우.pdf' },
        { name: 'AiNex 3 Key Points', file: 'AiNex_AI_3 Key Point.pdf', desc: 'AiNex_AI_3 Key Point.pdf' },
        { name: 'Trust Transformation', file: 'AI_Transformation_Built_on_Trust.pdf', desc: 'AI_Transformation_Built_on_Trust.pdf' },
        { name: 'Consulting Agent Platform', file: 'AI_Consulting_Agent_Platform.pdf', desc: 'AI_Consulting_Agent_Platform.pdf' },
        { name: 'Governance Mastery', file: 'AiNex_AI_Governance_Mastery.pdf', desc: 'AiNex_AI_Governance_Mastery.pdf' }
    ];

    let fileListHtml = '';
    guidebookFiles.forEach(item => {
        fileListHtml += `
        <div class="p-3 border-secondary bg-dark bg-opacity-50 rounded border d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <i class="bi bi-file-earmark-pdf-fill text-danger fs-4 me-3"></i>
                <div>
                    <div class="fw-bold text-white">${item.name}</div>
                    <div class="small text-muted" style="font-size: 0.75rem;">${item.desc}</div>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button onclick="window.open('downloads/${item.file}', '_blank')" class="btn btn-sm btn-outline-light" title="미리보기">
                    <i class="bi bi-eye"></i>
                </button>
                <a href="downloads/${item.file}" download class="btn btn-sm btn-outline-light" title="다운로드">
                    <i class="bi bi-download"></i>
                </a>
            </div>
        </div>`;
    });

    const modalHtml = `
    <div class="modal fade" id="guideModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content text-white" style="background-color: #0d1117; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold"><i class="bi bi-book-half me-2 text-primary"></i>AiNex 가이드북 다운로드</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <p class="text-muted small mb-4">AiNex 이용자 메뉴얼 해설집을 다운로드하거나 미리보실 수 있습니다.</p>
                    <div class="d-grid gap-3" style="max-height: 500px; overflow-y: auto;">
                        ${fileListHtml}
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

/* PDF Viewer Modal Injection & Logic */
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.0;
let canvas, ctx;

const injectPdfViewerModal = () => {
    if (document.getElementById('pdfViewerModal')) return;

    const modalHtml = `
    <div class="modal fade" id="pdfViewerModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content bg-dark text-white">
                <div class="modal-header border-bottom border-secondary py-2">
                    <h5 class="modal-title fs-6"><i class="bi bi-file-pdf me-2 text-danger"></i>PDF Viewer</h5>
                    <div class="d-flex align-items-center gap-3 mx-auto">
                        <button class="btn btn-sm btn-outline-secondary" onclick="changePage(-1)"><i class="bi bi-chevron-left"></i></button>
                        <span class="small">Page <span id="pdf-page-num">1</span> / <span id="pdf-page-count">--</span></span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="changePage(1)"><i class="bi bi-chevron-right"></i></button>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-0 d-flex justify-content-center align-items-center bg-black position-relative" style="overflow: auto;">
                    <div id="pdf-loader" class="position-absolute">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <canvas id="pdf-render"></canvas>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    canvas = document.getElementById('pdf-render');
    ctx = canvas.getContext('2d');
};

/* Helper utility to load PDF.js dynamically if needed */
const loadPdfJs = () => {
    return new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve();
        };
        script.onerror = () => reject(new Error('Failed to load PDF.js library'));
        document.head.appendChild(script);
    });
};

const openPdfViewer = async (url) => {
    try {
        await loadPdfJs();
    } catch (error) {
        console.error(error);
        alert('PDF 뷰어 라이브러리를 로드하는데 실패했습니다. 인터넷 연결을 확인해주세요.');
        return;
    }

    const viewerModal = new bootstrap.Modal(document.getElementById('pdfViewerModal'));
    viewerModal.show();

    // Reset state
    pdfDoc = null;
    pageNum = 1;
    scale = 1.2; // Default scale
    document.getElementById('pdf-loader').classList.remove('d-none');
    if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = 0;
    }

    // Load PDF
    pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
        pdfDoc = pdfDoc_;
        document.getElementById('pdf-page-count').textContent = pdfDoc.numPages;
        renderPage(pageNum);
        document.getElementById('pdf-loader').classList.add('d-none');
    }).catch(err => {
        console.error('Error loading PDF:', err);
        document.getElementById('pdf-loader').classList.add('d-none');
        alert('PDF를 불러오는 중 오류가 발생했습니다.');
        viewerModal.hide();
    });
};

const renderPage = (num) => {
    pageRendering = true;
    // Fetch page
    pdfDoc.getPage(num).then((page) => {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        const renderTask = page.render(renderContext);

        // Wait for render to finish
        renderTask.promise.then(() => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    // Update page counters
    document.getElementById('pdf-page-num').textContent = num;
};

const queueRenderPage = (num) => {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
};

window.changePage = (offset) => {
    if (!pdfDoc) return;
    const newPage = pageNum + offset;
    if (newPage >= 1 && newPage <= pdfDoc.numPages) {
        pageNum = newPage;
        queueRenderPage(pageNum);
    }
};

/* Load More Discussions Logic */
const initLoadMore = () => {
    const btn = document.getElementById('loadMoreBtn');
    if (!btn) return;

    const moreDiscussions = [
        {
            category: 'Technical',
            badgeClass: 'bg-primary',
            time: '12시간 전',
            icon: 'bi-cpu-fill',
            iconColor: 'text-primary',
            title: 'RAG 파이프라인 최적화: LangChain vs LlamaIndex',
            desc: '엔터프라이즈 환경에서 대규모 문서를 처리할 때 RAG 성능을 극대화하기 위한 프레임워크 비교 토론입니다. 청킹 전략과 임베딩 모델 선택 기준을 공유합니다.',
            stats: { views: '3,102', comments: '56', likes: '210' },
            modalId: '#discussionModal1'
        },
        {
            category: 'Business',
            badgeClass: 'bg-accent',
            time: '15시간 전',
            icon: 'bi-graph-up-arrow',
            iconColor: 'text-accent',
            title: 'AI 도입 ROI 산정 시 숨겨진 비용(Hidden Costs) 분석',
            desc: '단순 API 비용 외에 인프라 유지보수, 데이터 전처리 인건비, 그리고 지속적인 파인튜닝 비용을 어떻게 예산에 반영해야 할까요?',
            stats: { views: '1,540', comments: '23', likes: '89' },
            modalId: '#discussionModal2'
        },
        {
            category: 'Governance',
            badgeClass: 'bg-success',
            time: '1일 전',
            icon: 'bi-file-earmark-ruled',
            iconColor: 'text-success',
            title: '데이터 3법 개정과 가명정보 처리 가이드라인',
            desc: '최신 개정된 데이터 3법에 따라 AI 학습용 데이터를 가명처리할 때 주의해야 할 법적 리스크와 기술적 조치 사항들을 정리했습니다.',
            stats: { views: '2,890', comments: '45', likes: '130' },
            modalId: '#discussionModal3'
        },
        {
            category: 'Technical',
            badgeClass: 'bg-primary',
            time: '1일 전',
            icon: 'bi-code-slash',
            iconColor: 'text-primary',
            title: 'Prompt Engineering: Chain-of-Thought(CoT)의 실제 효과',
            desc: '복잡한 추론 작업에서 CoT가 할루시네이션을 얼마나 줄여주는지 실험해 보았습니다. few-shot 예제 구성 팁도 함께 나눕니다.',
            stats: { views: '4,200', comments: '112', likes: '450' },
            modalId: '#discussionModal1'
        },
        {
            category: 'Business',
            badgeClass: 'bg-accent',
            time: '2일 전',
            icon: 'bi-people-fill',
            iconColor: 'text-accent',
            title: 'AI Transformation(AX)을 위한 조직 문화 변화 관리',
            desc: '기술 도입보다 어려운 것이 구성원들의 마인드셋 변화입니다. 저항을 최소화하고 AI를 도구로 활용하게 만드는 리더십 전략.',
            stats: { views: '980', comments: '15', likes: '56' },
            modalId: '#discussionModal2'
        },
        {
            category: 'Governance',
            badgeClass: 'bg-success',
            time: '2일 전',
            icon: 'bi-shield-check',
            iconColor: 'text-success',
            title: '금융권 망분리 규제 완화와 SaaS AI 도입 가능성',
            desc: '최근 샌드박스 제도를 통해 금융권에서도 SaaS 형태의 AI 서비스 도입이 가능해지고 있습니다. 보안성 심사 통과 노하우를 공유합니다.',
            stats: { views: '3,500', comments: '67', likes: '201' },
            modalId: '#discussionModal3'
        },
        {
            category: 'Technical',
            badgeClass: 'bg-primary',
            time: '3일 전',
            icon: 'bi-hdd-rack-fill',
            iconColor: 'text-primary',
            title: 'Multi-GPU 학습 환경 구축: DeepSpeed 설정 팁',
            desc: '단일 노드 8x A100 환경에서 DeepSpeed ZeRO-3 Offload를 설정하여 175B 모델을 파인튜닝한 경험을 공유합니다.',
            stats: { views: '1,200', comments: '34', likes: '98' },
            modalId: '#discussionModal1'
        },
        {
            category: 'Business',
            badgeClass: 'bg-accent',
            time: '3일 전',
            icon: 'bi-cart-check-fill',
            iconColor: 'text-accent',
            title: 'E-commerce 개인화 추천 시스템 구축 사례',
            desc: '사용자 로그 기반의 협업 필터링과 콘텐츠 기반 필터링을 하이브리드로 적용하여 구매 전환율을 15% 개선한 사례입니다.',
            stats: { views: '2,100', comments: '40', likes: '120' },
            modalId: '#discussionModal2'
        },
        {
            category: 'Governance',
            badgeClass: 'bg-success',
            time: '4일 전',
            icon: 'bi-journal-check',
            iconColor: 'text-success',
            title: 'ISO/IEC 42001 심사 준비 체크리스트 공유',
            desc: 'AI 경영시스템 인증 심사를 앞두고 내부 감사를 위해 작성했던 체크리스트 엑셀 파일을 공유합니다. (첨부파일 포함)',
            stats: { views: '5,600', comments: '210', likes: '670' },
            modalId: '#discussionModal3'
        },
        {
            category: 'Technical',
            badgeClass: 'bg-primary',
            time: '5일 전',
            icon: 'bi-robot',
            iconColor: 'text-primary',
            title: 'Agentic Workflow: AutoGPT vs BabyAGI 비교',
            desc: '자율 에이전트 구축을 위한 오픈소스 프레임워크들의 장단점을 비교하고, 실제 업무 자동화(RPA) 적용 가능성을 타진합니다.',
            stats: { views: '3,800', comments: '78', likes: '340' },
            modalId: '#discussionModal1'
        }
    ];

    btn.addEventListener('click', () => {
        const listContainer = document.getElementById('forumList');

        // Simulate loading
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
        btn.disabled = true;

        setTimeout(() => {
            moreDiscussions.forEach(item => {
                const html = `
                <div class="forum-item cursor-pointer fade-in-up" data-bs-toggle="modal" data-bs-target="${item.modalId}" style="animation: fadeInUp 0.5s ease forwards;">
                    <div class="d-flex w-100 justify-content-between align-items-center mb-2">
                        <span class="badge ${item.badgeClass}">${item.category}</span>
                        <small class="text-muted"><i class="bi bi-clock me-1"></i>${item.time}</small>
                    </div>
                    <div class="d-flex align-items-start">
                        <div class="me-3 mt-1">
                            <i class="bi ${item.icon} fs-4 ${item.iconColor}"></i>
                        </div>
                        <div>
                            <h5 class="mb-1 text-white">${item.title}</h5>
                            <p class="text-secondary small mb-2 text-truncate" style="max-width: 800px;">
                                ${item.desc}
                            </p>
                            <div class="d-flex align-items-center small text-muted">
                                <span class="me-3"><i class="bi bi-eye me-1"></i>${item.stats.views}</span>
                                <span class="me-3"><i class="bi bi-chat-dots me-1"></i>${item.stats.comments}</span>
                                <span><i class="bi bi-heart me-1"></i>${item.stats.likes}</span>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                listContainer.insertAdjacentHTML('beforeend', html);
            });

            // Hide button after loading
            btn.closest('.text-center').style.display = 'none';
        }, 600);
    });
};

// Add fade-in-up keyframe dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThree();
    initAnimations();
    injectSignupModal();
    injectGuideModal();
    initLoadMore(); // Newly Added
});
