import { useState, useEffect, useRef } from 'react'
import './App.css'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

function App() {
  const [openMenu, setOpenMenu] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [closingModal, setClosingModal] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [chartsOpen, setChartsOpen] = useState(false)
  const [timelineOpen, setTimelineOpen] = useState(false)
  const [flashcardsOpen, setFlashcardsOpen] = useState(false)
  const [timerOpen, setTimerOpen] = useState(false)
  const [slideshowOpen, setSlideshowOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeModal])

  useEffect(() => {
    const handleClick = (e) => {
      const container = document.createElement('div')
      container.className = 'lightning-click'
      container.style.left = e.clientX + 'px'
      container.style.top = e.clientY + 'px'

      const flash = document.createElement('div')
      flash.className = 'lc-flash'
      container.appendChild(flash)

      const ring = document.createElement('div')
      ring.className = 'lc-ring'
      container.appendChild(ring)

      const angles = [0, 45, 90, 135, 180, 225, 270, 315]
      angles.forEach(angle => {
        const spark = document.createElement('div')
        spark.className = 'lc-spark'
        spark.style.setProperty('--angle', `${angle}deg`)
        container.appendChild(spark)
      })

      document.body.appendChild(container)
      setTimeout(() => container.remove(), 600)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const openModal = (id) => {
    setActiveModal(id)
    setClosingModal(false)
  }

  const closeModal = () => {
    setClosingModal(true)
    setTimeout(() => {
      setActiveModal(null)
      setClosingModal(false)
    }, 300)
  }

  const toggleMenu = (menuId) => {
    setOpenMenu(openMenu === menuId ? null : menuId)
  }

  const menuStructure = [
    { id: 'intro', title: '📚 Giới thiệu' },
    {
      id: 'doc-quyen',
      title: '🏢 Biểu hiện mới của Độc quyền',
      subItems: [
        { id: 'tich-tu', title: 'a. Tích tụ & Tập trung tư bản' },
        { id: 'tai-chinh', title: 'b. Tư bản tài chính' },
        { id: 'xuat-khau', title: 'c. Xuất khẩu tư bản' },
        { id: 'thi-truong', title: 'd. Phân chia thị trường' },
        { id: 'lanh-tho', title: 'đ. Phân chia lãnh thổ' }
      ]
    },
    {
      id: 'doc-quyen-nn',
      title: '🏛️ Độc quyền Nhà nước',
      subItems: [
        { id: 'nhan-su', title: 'a. Cơ chế quan hệ nhân sự' },
        { id: 'so-huu-nn', title: 'b. Sở hữu nhà nước' },
        { id: 'dieu-tiet', title: 'c. Vai trò công cụ điều tiết' }
      ]
    }
  ]

  return (
    <div className="app">
      {/* Sidebar Toggle Button */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Mở menu"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Đóng menu"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span>📋 Mục lục</span>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <nav className="sidebar-nav">
          {menuStructure.map(menu => (
            <div key={menu.id} className="sidebar-nav-item">
              {menu.subItems ? (
                <div className="sidebar-group">
                  <button
                    className="sidebar-btn sidebar-btn-group"
                    onClick={() => toggleMenu(menu.id)}
                  >
                    <span>{menu.title}</span>
                    <span className={`arrow ${openMenu === menu.id ? 'open' : ''}`}>▼</span>
                  </button>
                  {openMenu === menu.id && (
                    <div className="sidebar-submenu">
                      {menu.subItems.map(subItem => (
                        <button
                          key={subItem.id}
                          className="sidebar-subitem"
                          onClick={() => { openModal(subItem.id); setSidebarOpen(false) }}
                        >
                          {subItem.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="sidebar-btn"
                  onClick={() => { openModal(menu.id); setSidebarOpen(false) }}
                >
                  {menu.title}
                </button>
              )}
            </div>
          ))}
        </nav>
        <div className="sidebar-quiz-wrap">
          <button
            className="sidebar-quiz-btn"
            onClick={() => { setQuizOpen(true); setSidebarOpen(false) }}
          >
            🎯 Kiểm tra kiến thức
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="header">
        <div className="header-main">
          <h1>🏛️ Biểu hiện mới của Độc quyền</h1>
          <p className="subtitle">Chủ nghĩa Tư bản Độc quyền trong Thế kỷ XXI</p>
        </div>
        <div className="header-tools">
          <button className="h-tool-btn" onClick={() => globalThis.print()} title="Xuất PDF / In">🖨️ PDF</button>
          <button className={`h-tool-btn ${timerOpen ? 'active' : ''}`} onClick={() => setTimerOpen(t => !t)} title="Đồng hồ đếm ngược">⏱ Timer</button>
          <button className="h-tool-btn primary" onClick={() => setSlideshowOpen(true)} title="Chế độ Slideshow">▶ Slideshow</button>
        </div>
      </header>

      {/* Cards Grid */}
      <main className="content sections-overview">
        {SECTIONS.slice(0, 6).map(s => (
          <SectionCard key={s.id} {...s} onClick={() => openModal(s.id)} />
        ))}

        <div className="section-divider">
          <span>🏛️ Độc quyền Nhà nước</span>
        </div>

        {SECTIONS.slice(6).map(s => (
          <SectionCard key={s.id} {...s} onClick={() => openModal(s.id)} />
        ))}
        {/* Tools row */}
        <div className="tools-section-title">
          <span className="tools-section-icon">🛠️</span>
          <span>Công cụ học tập</span>
        </div>
        <div className="tools-row">
          {[
            { icon: '📊', title: 'Biểu đồ dữ liệu', sub: 'FDI, OPEC, thị phần', color: '#1565c0', bg: '#dbeafe', onClick: () => setChartsOpen(true) },
            { icon: '⏳', title: 'Timeline Lịch sử', sub: '1860s → 2020s', color: '#b45309', bg: '#fde68a', onClick: () => setTimelineOpen(true) },
            { icon: '🃏', title: 'Flashcard', sub: '10 thuật ngữ quan trọng', color: '#6d28d9', bg: '#ddd6fe', onClick: () => setFlashcardsOpen(true) },
          ].map(t => (
            <button key={t.title} className="tool-card" onClick={t.onClick}>
              <span className="tool-card-icon" style={{ background: t.bg, color: t.color }}>{t.icon}</span>
              <div className="tool-card-info">
                <div className="tool-card-title" style={{ color: t.color }}>{t.title}</div>
                <div className="tool-card-sub">{t.sub}</div>
              </div>
            </button>
          ))}
        </div>

        <button className="quiz-banner-card" onClick={() => setQuizOpen(true)}>
          <span className="quiz-banner-icon">🎯</span>
          <div className="quiz-banner-info">
            <div className="quiz-banner-title">Kiểm tra kiến thức</div>
            <div className="quiz-banner-desc">10 câu hỏi về Kinh tế chính trị Mác-Lênin</div>
          </div>
          <span className="quiz-banner-cta">Bắt đầu →</span>
        </button>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-copy">© 2026 · Tài liệu học tập Kinh tế chính trị Mác - Lênin</p>
        <div className="footer-ai-label"><img src="https://ava-grp-talk.zadn.vn/9/9/a/2/2/360/8d84b3493ccd55c45d27228da2ae5d7c.jpg" alt="AI" style={{ width: '1.2rem', height: '1.2rem', objectFit: 'cover', borderRadius: '50%', verticalAlign: 'middle', marginRight: '.35rem' }} />Hỗ trợ bởi AI</div>
        <div className="footer-ai-row">
          {[
            { icon: '✦', name: 'Gemini', role: 'Soạn nội dung & outline bài thuyết trình', color: '#4285F4', bg: 'rgba(66,133,244,.12)', border: 'rgba(66,133,244,.3)' },
            { icon: '◆', name: 'Claude', role: 'Lập trình giao diện & tối ưu code React', color: '#c98a5e', bg: 'rgba(201,138,94,.12)', border: 'rgba(201,138,94,.3)' },
            { icon: '⬥', name: 'ChatGPT', role: 'Nghiên cứu ví dụ thực tế & số liệu', color: '#10a37f', bg: 'rgba(16,163,127,.12)', border: 'rgba(16,163,127,.3)' },
            { icon: '✿', name: 'GitHub Copilot', role: 'Hỗ trợ viết & debug code trực tiếp', color: '#58a6ff', bg: 'rgba(88,166,255,.12)', border: 'rgba(88,166,255,.3)' },
          ].map(ai => (
            <div key={ai.name} className="footer-ai-chip" style={{ background: ai.bg, borderColor: ai.border }}>
              <span className="footer-ai-icon" style={{ color: ai.color }}>{ai.icon}</span>
              <div className="footer-ai-info">
                <span className="footer-ai-name" style={{ color: ai.color }}>{ai.name}</span>
                <span className="footer-ai-role">{ai.role}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="footer-info-btn" onClick={() => setInfoOpen(true)}>
          <span className="footer-info-btn-icon">ℹ</span>
          Phân Tích Lý Thuyết &amp; Công Cụ Hỗ Trợ
        </button>
      </footer>

      {infoOpen && <InfoPanel onClose={() => setInfoOpen(false)} />}

      {/* AI Chat */}
      <AiChat />

      {/* Modal */}
      {activeModal && (
        <Modal
          section={SECTIONS.find(s => s.id === activeModal)}
          isClosing={closingModal}
          onClose={closeModal}
        />
      )}

      {/* Quiz */}
      {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}
      {chartsOpen && <DataChartsModal onClose={() => setChartsOpen(false)} />}
      {timelineOpen && <TimelineModal onClose={() => setTimelineOpen(false)} />}
      {flashcardsOpen && <FlashcardsModal onClose={() => setFlashcardsOpen(false)} />}

      {/* Timer widget */}
      {timerOpen && <CountdownTimer onClose={() => setTimerOpen(false)} />}

      {/* Slideshow */}
      {slideshowOpen && <SlideshowMode sections={SECTIONS} onClose={() => setSlideshowOpen(false)} />}
    </div>
  )
}

// Sections data
const SECTIONS = [
  { id: 'intro', icon: '📚', title: 'Tổng quan về Độc quyền mới', desc: 'Khái niệm cốt lõi, 5 biểu hiện và đặc điểm thời đại mới', color: '#1565c0', colorBg: '#dbeafe', Component: IntroSection },
  { id: 'tich-tu', icon: '🏢', title: 'Tích tụ & Tập trung Tư bản', desc: 'Concern, Conglomerate và vai trò doanh nghiệp vừa và nhỏ', color: '#0f766e', colorBg: '#ccfbf1', Component: TichTuSection },
  { id: 'tai-chinh', icon: '💰', title: 'Tư bản Tài chính', desc: 'Mở rộng liên kết, cơ chế tham dự và ngân hàng xuyên quốc gia', color: '#9333ea', colorBg: '#ede9fe', Component: TaiChinhSection },
  { id: 'xuat-khau', icon: '🌍', title: 'Xuất khẩu Tư bản', desc: 'Thay đổi dòng chảy, chủ thể và đa dạng hóa hình thức xuất khẩu', color: '#b45309', colorBg: '#fde68a', Component: XuatKhauSection },
  { id: 'thi-truong', icon: '🗺️', title: 'Phân chia Thị trường Thế giới', desc: 'TNCs, liên minh kinh tế khu vực và cạnh tranh giữa các khối', color: '#0369a1', colorBg: '#bae6fd', Component: ThiTruongSection },
  { id: 'lanh-tho', icon: '⚔️', title: 'Phân chia Lãnh thổ Ảnh hưởng', desc: 'Biên giới mềm, các hình thức chiến tranh mới và nguy cơ chiến tranh lạnh', color: '#b91c1c', colorBg: '#fecaca', Component: LanhThoSection },
  { id: 'nhan-su', icon: '🏛️', title: 'Cơ chế Quan hệ Nhân sự', desc: 'Thể chế đa nguyên, thế lực trung dung và bản chất giai cấp', color: '#1d4ed8', colorBg: '#bfdbfe', Component: NhanSuSection },
  { id: 'so-huu-nn', icon: '🏦', title: 'Sở hữu Nhà nước', desc: 'Ngân sách, cổ phần nhà nước, đầu tư hạ tầng và giải cứu tập đoàn', color: '#047857', colorBg: '#a7f3d0', Component: SoHuuNNSection },
  { id: 'dieu-tiet', icon: '🎛️', title: 'Vai trò Công cụ Điều tiết Kinh tế', desc: 'Điều tiết vĩ mô, đa nguyên tư sản và viện trợ nước ngoài', color: '#6d28d9', colorBg: '#ddd6fe', Component: DieuTietSection },
]

// Section Card — click to open modal
function SectionCard({ id, icon, title, desc, color, colorBg, onClick }) {
  return (
    <div
      id={id}
      className="expandable-section"
      style={{ '--c': color, '--c-bg': colorBg }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div className="section-card-header">
        <div className="section-card-left">
          <span className="section-card-icon">{icon}</span>
          <div className="section-card-info">
            <div className="section-card-title">{title}</div>
            <div className="section-card-desc">{desc}</div>
          </div>
        </div>
        <span className="section-card-arrow">›</span>
      </div>
    </div>
  )
}

// Modal
function Modal({ section, isClosing, onClose }) {
  const { icon, title, color, colorBg, Component } = section

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    globalThis.addEventListener('keydown', onKey)
    return () => globalThis.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={`modal-overlay${isClosing ? ' closing' : ''}`}
      onClick={onClose}
    >
      <div
        className={`modal-box${isClosing ? ' closing' : ''}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="modal-header"
          style={{ background: `linear-gradient(135deg, ${color} 0%, #0d1b2a 100%)` }}
        >
          <div className="modal-header-left">
            <span className="modal-icon" style={{ background: colorBg }}>{icon}</span>
            <span className="modal-title">{title}</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>
        <div className="modal-body">
          <Component />
        </div>
      </div>
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: 'Độc quyền trong kinh tế học Mác-Lênin được định nghĩa là gì?',
    opts: [
      'Nhà nước kiểm soát toàn bộ nền kinh tế',
      'Sự tập trung sản xuất và tư bản đến mức chi phối nền kinh tế',
      'Một doanh nghiệp duy nhất hoạt động trong thị trường',
      'Liên minh các quốc gia kiểm soát thương mại quốc tế',
    ],
    ans: 1,
    explain: 'Độc quyền là sự tập trung sản xuất và tư bản đến một mức độ nhất định, tạo ra sức mạnh chi phối và thống trị thị trường.',
  },
  {
    q: 'Hình thức tổ chức độc quyền nào kết hợp nhiều ngành kinh doanh khác nhau dưới một tập đoàn mẹ?',
    opts: ['Cartel', 'Syndicate', 'Trust', 'Conglomerate'],
    ans: 3,
    explain: 'Conglomerate (tập đoàn đa ngành) hợp nhất nhiều công ty thuộc các ngành khác nhau, giảm rủi ro và tận dụng sức mạnh tài chính chung.',
  },
  {
    q: 'Tư bản tài chính là sản phẩm của sự hợp nhất giữa:',
    opts: [
      'Tư bản thương mại và tư bản công nghiệp',
      'Tư bản ngân hàng và tư bản công nghiệp độc quyền',
      'Nhà nước và tư bản nước ngoài',
      'Tư bản nông nghiệp và tư bản thương mại',
    ],
    ans: 1,
    explain: 'Tư bản tài chính hình thành từ sự hợp nhất của tư bản ngân hàng độc quyền và tư bản công nghiệp độc quyền, tạo ra tầng lớp tài phiệt.',
  },
  {
    q: '"Cơ chế tham dự" trong tư bản tài chính có nghĩa là gì?',
    opts: [
      'Nhà nước tham gia điều tiết thị trường tài chính',
      'Công ty mẹ nắm cổ phần chi phối nhiều công ty con, cháu',
      'Các ngân hàng cho vay vốn với lãi suất thấp',
      'Nhà đầu tư nhỏ lẻ tham gia thị trường chứng khoán',
    ],
    ans: 1,
    explain: 'Cơ chế tham dự: tập đoàn mẹ nắm cổ phần kiểm soát công ty con, công ty con lại nắm ở công ty cháu — tạo mạng lưới kiểm soát cực rộng với ít vốn.',
  },
  {
    q: 'Xuất khẩu tư bản khác với xuất khẩu hàng hóa ở điểm cơ bản nào?',
    opts: [
      'Xuất khẩu tư bản chỉ xảy ra giữa các nước phát triển',
      'Xuất khẩu tư bản đưa giá trị ra nước ngoài để thu giá trị thặng dư tại đó',
      'Xuất khẩu tư bản không mang lại lợi nhuận',
      'Xuất khẩu hàng hóa phức tạp hơn xuất khẩu tư bản',
    ],
    ans: 1,
    explain: 'Xuất khẩu tư bản là đưa tư bản ra nước ngoài để sản xuất, khai thác lao động rẻ và tài nguyên, thu giá trị thặng dư tại nước nhận đầu tư.',
  },
  {
    q: 'Tổ chức nào là ví dụ điển hình của việc phân chia thị trường thế giới?',
    opts: [
      'Liên hợp quốc (UN)',
      'Tổ chức Y tế Thế giới (WHO)',
      'OPEC — Tổ chức các nước xuất khẩu dầu mỏ',
      'UNESCO',
    ],
    ans: 2,
    explain: 'OPEC là liên minh độc quyền quốc tế điển hình, phân chia và kiểm soát thị trường dầu mỏ toàn cầu thông qua hạn ngạch sản xuất.',
  },
  {
    q: 'Độc quyền nhà nước tư bản chủ nghĩa về bản chất phục vụ lợi ích của ai?',
    opts: [
      'Toàn bộ nhân dân lao động',
      'Nhà nước và bộ máy quan chức',
      'Giai cấp tư sản độc quyền',
      'Các tổ chức quốc tế',
    ],
    ans: 2,
    explain: 'Dù có vẻ vì lợi ích chung, độc quyền nhà nước TBCN về bản chất phục vụ giai cấp tư sản độc quyền — nhà nước là công cụ của giai cấp thống trị.',
  },
  {
    q: '"Cửa quay" (revolving door) trong cơ chế quan hệ nhân sự là gì?',
    opts: [
      'Chính sách mở cửa thị trường thương mại tự do',
      'Sự luân chuyển nhân sự giữa tập đoàn tư nhân và bộ máy nhà nước',
      'Hệ thống bầu cử đa đảng ở các nước tư bản',
      'Cơ chế nhập khẩu lao động nước ngoài',
    ],
    ans: 1,
    explain: 'Revolving door: lãnh đạo tập đoàn lớn luân phiên đảm nhận chức vụ nhà nước và ngược lại, đảm bảo lợi ích tư bản độc quyền luôn được bảo vệ.',
  },
  {
    q: 'Quỹ đầu tư quốc gia (Sovereign Wealth Fund) thuộc hình thức nào?',
    opts: [
      'Xuất khẩu tư bản tư nhân',
      'Sở hữu nhà nước trong độc quyền nhà nước',
      'Tư bản tài chính tư nhân',
      'Viện trợ phát triển quốc tế ODA',
    ],
    ans: 1,
    explain: 'SWF (như Temasek Singapore, GIC của Abu Dhabi) là hình thức sở hữu nhà nước trực tiếp đầu tư vào tài sản sinh lời toàn cầu.',
  },
  {
    q: 'Viện trợ nước ngoài (ODA) trong CNTB độc quyền nhà nước thực chất là:',
    opts: [
      'Hành động nhân đạo thuần túy không có lợi ích kinh tế',
      'Công cụ điều tiết kinh tế và mở rộng ảnh hưởng địa chính trị',
      'Hình thức bồi thường chiến tranh của các nước giàu',
      'Chính sách xóa nợ cho các nước nghèo',
    ],
    ans: 1,
    explain: 'ODA thực chất là công cụ của độc quyền nhà nước: kèm điều kiện mở cửa thị trường, ưu đãi doanh nghiệp nước viện trợ, phục vụ lợi ích địa chính trị.',
  },
]

// ── Sound Effects (Web Audio API) ──────────────────
function playSound(type) {
  try {
    const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const gain = ctx.createGain()
    gain.connect(ctx.destination)
    if (type === 'correct') {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator()
        osc.connect(gain)
        osc.type = 'sine'
        osc.frequency.value = freq
        osc.start(ctx.currentTime + i * 0.13)
        osc.stop(ctx.currentTime + i * 0.13 + 0.18)
      })
      gain.gain.setValueAtTime(0.22, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65)
    } else {
      const osc = ctx.createOscillator()
      osc.connect(gain)
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(280, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.35)
      gain.gain.setValueAtTime(0.22, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.45)
    }
    setTimeout(() => ctx.close(), 1500)
  } catch (err) {
    console.debug('Audio playback not available:', err)
  }
}

const STUDENTS = [
  { emoji: '👦', name: 'Minh' },
  { emoji: '👧', name: 'Lan' },
  { emoji: '🧒', name: 'Tuấn' },
  { emoji: '👩', name: 'Hoa' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function QuizModal({ onClose }) {
  const [step, setStep] = useState('start')
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  // phase: 'inviting' → students raise hands | 'answered' → reveal
  const [phase, setPhase] = useState('inviting')
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [shake, setShake] = useState(false)
  const [handStates, setHandStates] = useState([false, false, false, false])
  const handTimersRef = useRef([])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    globalThis.addEventListener('keydown', onKey)
    return () => globalThis.removeEventListener('keydown', onKey)
  }, [onClose])

  // Raise hands staggered on each new question
  useEffect(() => {
    if (step !== 'playing' || phase === 'answered') return
    setHandStates([false, false, false, false])
    handTimersRef.current.forEach(clearTimeout)
    handTimersRef.current = []
    const order = shuffle([0, 1, 2, 3])
    order.forEach((idx, rank) => {
      const delay = 250 + rank * (180 + Math.random() * 380)
      const t = setTimeout(() => {
        setHandStates(prev => { const next = [...prev]; next[idx] = true; return next })
      }, delay)
      handTimersRef.current.push(t)
    })
    return () => handTimersRef.current.forEach(clearTimeout)
  }, [current, step])

  const handleStart = () => {
    const q = shuffle(QUIZ_QUESTIONS)
    setQuestions(q)
    setCurrent(0)
    setPhase('inviting')
    setSelected(null)
    setCorrect(0)
    setStreak(0)
    setHandStates([false, false, false, false])
    setStep('playing')
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const handleSelect = (idx) => {
    if (phase !== 'inviting') return
    handTimersRef.current.forEach(clearTimeout)
    setHandStates([false, false, false, false])
    setSelected(idx)
    setPhase('answered')
    const q = questions[current]
    if (idx === q.ans) {
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
      playSound('correct')
    } else {
      setStreak(0)
      playSound('wrong')
      triggerShake()
    }
  }

  const goNext = () => {
    const nextIdx = current + 1
    if (nextIdx >= questions.length) {
      setStep('result')
    } else {
      setCurrent(nextIdx)
      setPhase('inviting')
      setSelected(null)
      setHandStates([false, false, false, false])
    }
  }

  const q = questions[current] || QUIZ_QUESTIONS[0]
  const total = questions.length || QUIZ_QUESTIONS.length
  const progressPct = ((current + (phase === 'answered' ? 1 : 0)) / total) * 100
  const isCorrect = selected !== null && selected === q.ans

  const presenterSpeech =
    phase === 'inviting'
      ? `Câu ${current + 1}: "${q.q}" — Mời các bạn giơ tay! 🙋`
      : isCorrect
        ? `Chính xác! Bạn ${STUDENTS[selected]?.name} trả lời đúng rồi! Cả lớp vỗ tay nào 👏`
        : `Chưa đúng rồi bạn ơi! Đáp án đúng là đáp án ${String.fromCodePoint(65 + q.ans)}. Xem giải thích bên dưới nhé 📚`

  const getRank = () => {
    const pct = correct / total
    if (pct >= 0.9) return { emoji: '🏆', title: 'Thiên tài!', msg: 'Bạn xứng đáng điểm A+ môn Kinh tế chính trị!' }
    if (pct >= 0.7) return { emoji: '🥇', title: 'Xuất sắc!', msg: 'Nắm vững kiến thức Mác-Lênin rất tốt!' }
    if (pct >= 0.5) return { emoji: '🥈', title: 'Khá tốt!', msg: 'Ôn lại một số phần để đạt điểm cao hơn nhé.' }
    if (pct >= 0.3) return { emoji: '🥉', title: 'Cố gắng!', msg: 'Xem lại nội dung bài học và thử lại!' }
    return { emoji: '📚', title: 'Cần ôn thêm!', msg: 'Hãy đọc kỹ tài liệu trước khi làm quiz nhé!' }
  }
  const rank = getRank()

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-box quiz-box${shake ? ' quiz-shake' : ''}`} onClick={e => e.stopPropagation()}>

        {/* ── Start ── */}
        {step === 'start' && (
          <div className="quiz-start">
            <div className="quiz-start-icon">👨‍🏫</div>
            <h2>Giờ kiểm tra kiến thức</h2>
            <p>{QUIZ_QUESTIONS.length} câu hỏi · Kinh tế Chính trị Mác-Lênin</p>
            <div className="quiz-rules">
              <div className="quiz-rule-item"><span>👨‍🏫</span> Giáo viên đọc từng câu hỏi</div>
              <div className="quiz-rule-item"><span>🙋</span> Bấm "Mời trả lời" để học sinh giơ tay</div>
              <div className="quiz-rule-item"><span>👆</span> Bấm vào học sinh để chọn câu trả lời</div>
            </div>
            <div className="quiz-start-btns">
              <button className="quiz-btn-primary" onClick={handleStart}>▶ Bắt đầu</button>
              <button className="quiz-btn-ghost" onClick={onClose}>Hủy</button>
            </div>
          </div>
        )}

        {/* ── Playing ── */}
        {step === 'playing' && (
          <>
            {/* Top bar */}
            <div className="quiz-header">
              <div className="quiz-q-counter">Câu {current + 1} / {total}</div>
              <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <div className="quiz-score-inline">✅ {correct}</div>
              <button className="modal-close" onClick={onClose} aria-label="Đóng">✕</button>
            </div>

            {/* Streak badge */}
            {streak >= 2 && phase === 'inviting' && (
              <div className="quiz-streak-badge">🔥 {streak} liên tiếp đúng!</div>
            )}

            <div className="quiz-body">
              {/* Presenter teacher */}
              <div className="presenter-row">
                <div className="presenter-avatar">👨‍🏫</div>
                <div className={`presenter-bubble phase-${phase}`}>{presenterSpeech}</div>
              </div>

              {/* Classroom */}
              {(
                <div className="classroom-row">
                  {q.opts.map((opt, i) => {
                    const st = STUDENTS[i]
                    const isAnswered = phase === 'answered'
                    const isCorrectOpt = isAnswered && i === q.ans
                    const isWrongOpt = isAnswered && i === selected && i !== q.ans
                    let stState = handStates[i] && !isAnswered ? 'raised' : 'idle'
                    if (isCorrectOpt) stState = 'correct'
                    if (isWrongOpt) stState = 'wrong'
                    return (
                      <button
                        key={`student-${current}-${i}`}
                        className={`student-desk st-${stState}`}
                        onClick={() => handleSelect(i)}
                        disabled={isAnswered}
                      >
                        <div className="student-bubble">
                          <span className="student-opt-letter">{String.fromCodePoint(65 + i)}</span>
                          {opt}
                        </div>
                        <div className="student-figure">
                          <div className={`student-arm${handStates[i] && !isAnswered ? ' up' : ''}`}>🤚</div>
                          <div className="student-body">{st.emoji}</div>
                        </div>
                        {isCorrectOpt && <div className="student-stars">⭐</div>}
                        {isWrongOpt && <div className="student-sad">😢</div>}
                      </button>
                    )
                  })}
                </div>
              )}

              {phase === 'answered' && (
                <div className={`quiz-explain ${isCorrect ? 'correct' : 'wrong'}`}>
                  <strong>
                    {isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng!'}
                  </strong>
                  <p>{q.explain}</p>
                </div>
              )}
            </div>

            <div className="quiz-footer">
              {phase === 'answered' && (
                <button className="quiz-btn-primary" onClick={goNext}>
                  {current + 1 >= total ? 'Xem kết quả 🎉' : 'Câu tiếp →'}
                </button>
              )}
            </div>
          </>
        )}

        {/* ── Result ── */}
        {step === 'result' && (
          <div className="quiz-result">
            <div className="quiz-result-emoji">{rank.emoji}</div>
            <h2>{rank.title}</h2>
            <div className="quiz-score-big">
              <span className="quiz-score-num">{correct}</span>
              <span className="quiz-score-total">/ {total}</span>
            </div>
            <div className="quiz-result-stats">
              <div className="quiz-stat">
                <span className="quiz-stat-val">{correct}</span>
                <span className="quiz-stat-lbl">câu đúng</span>
              </div>
              <div className="quiz-stat">
                <span className="quiz-stat-val">{total - correct}</span>
                <span className="quiz-stat-lbl">câu sai</span>
              </div>
              <div className="quiz-stat">
                <span className="quiz-stat-val">{Math.round(correct / total * 100)}%</span>
                <span className="quiz-stat-lbl">tỉ lệ đúng</span>
              </div>
            </div>
            <p className="quiz-result-msg">{rank.msg}</p>
            <div className="quiz-result-btns">
              <button className="quiz-btn-primary" onClick={handleStart}>🔄 Chơi lại</button>
              <button className="quiz-btn-ghost" onClick={onClose}>Đóng</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Reusable Image Gallery ────────────────────────────
function ImageGallery({ title, items }) {
  const [failed, setFailed] = useState({})

  return (
    <div className="gallery-wrap">
      {title && <div className="carousel-title">{title}</div>}
      <div className="gallery-grid">
        {items.map((item, i) => (
          <div key={i} className="gallery-item">
            <div
              className="gallery-img-wrap"
              style={failed[i] ? { background: item.bg ?? '#1b2d45', border: 'none' } : { background: '#fff' }}
            >
              {failed[i] ? (
                <div className="gallery-brand-card">
                  <span className="gallery-brand-emoji">{item.emoji ?? '🏢'}</span>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.label}
                  className="carousel-img"
                  onError={() => setFailed(p => ({ ...p, [i]: true }))}
                  loading="lazy"
                />
              )}
            </div>
            <span className="carousel-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Intro Section
function IntroSection() {
  return (
    <div className="section">
      <h2>📚 Tổng quan về Độc quyền mới</h2>

      {/* Slide 1: Khái niệm */}
      <div className="card highlight">
        <h3>1️⃣ Khái niệm</h3>
        <p>
          <strong>Độc quyền</strong> là sự tập trung sản xuất và tư bản ở mức độ cao, hình thành
          các tập đoàn kinh tế lớn có khả năng <strong>chi phối thị trường và nền kinh tế</strong>.
        </p>
        <p style={{ marginTop: '.6rem' }}>
          Trong thời đại hiện nay, độc quyền không chỉ tồn tại trong phạm vi quốc gia mà còn
          mở rộng ra toàn cầu, gắn với sự phát triển của <strong>khoa học công nghệ</strong> và{' '}
          <strong>toàn cầu hóa kinh tế</strong>.
        </p>
        <div className="slide-examples" style={{ marginTop: '.8rem' }}>
          <span>🏭 Tập trung sản xuất</span>
          <span style={{ background: 'none', border: 'none', color: 'var(--text)' }}>➕</span>
          <span>💰 Tập trung tư bản</span>
          <span style={{ background: 'none', border: 'none', color: 'var(--text)' }}>➡️</span>
          <span>🏛️ Tập đoàn chi phối kinh tế</span>
        </div>

      </div>

      {/* Slide 2: Biểu hiện chính */}
      <div className="card">
        <h3>2️⃣ Biểu hiện chính của độc quyền hiện đại</h3>
        <div className="slide-two-col">
          <div>
            <ul className="slide-bullets">
              <li>
                <strong>1️⃣ Tích tụ và tập trung tư bản</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.6)', fontSize: '.8rem' }}>→ Hình thành tập đoàn kinh tế lớn và đa ngành</span>
              </li>
              <li>
                <strong>2️⃣ Vai trò của tư bản tài chính</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.6)', fontSize: '.8rem' }}>→ Kết hợp ngân hàng + công nghiệp, kiểm soát qua cổ phiếu</span>
              </li>
              <li>
                <strong>3️⃣ Xuất khẩu tư bản</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.6)', fontSize: '.8rem' }}>→ Các nước phát triển đầu tư vốn ra nước ngoài (FDI)</span>
              </li>
            </ul>
          </div>
          <div>
            <ul className="slide-bullets">
              <li>
                <strong>4️⃣ Phân chia thị trường thế giới</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.6)', fontSize: '.8rem' }}>→ Tập đoàn lớn cạnh tranh và chiếm lĩnh thị trường toàn cầu</span>
              </li>
              <li>
                <strong>5️⃣ Phân chia phạm vi ảnh hưởng</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.6)', fontSize: '.8rem' }}>→ Cường quốc và tập đoàn mở rộng ảnh hưởng kinh tế – tài chính</span>
              </li>
            </ul>
            <div className="speaker-note" style={{ marginTop: '.8rem' }}>
              💡 <strong>Mẹo:</strong> Slide chỉ ghi từ khóa. Khi nói thì giải thích thêm ví dụ.
            </div>
          </div>
        </div>
        <div className="speaker-note">
          🎤 <strong>Nói:</strong> Độc quyền hiện đại có 5 biểu hiện chính. Mỗi biểu hiện sẽ được nhóm em trình bày chi tiết ở các phần sau. Ở đây em chỉ giới thiệu tổng quan để thầy/cô và các bạn có cái nhìn toàn cảnh trước.
        </div>
      </div>

      {/* Slide 3: Ví dụ thực tế */}
      <div className="card">
        <h3>3️⃣ Ví dụ thực tế — Các tập đoàn độc quyền lớn</h3>
        <div className="slide-two-col">
          <div>
            <p className="slide-col-head">Công nghệ số</p>
            <ul className="slide-bullets">
              <li>
                <strong>Google (Alphabet):</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.6)', fontSize: '.8rem' }}>tìm kiếm · quảng cáo · cloud · AI · YouTube · Android</span>
                <br /><a href="https://en.wikipedia.org/wiki/Alphabet_Inc." target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a>
              </li>
              <li>
                <strong>Amazon:</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.6)', fontSize: '.8rem' }}>thương mại điện tử · AWS cloud · logistics · truyền thông</span>
                <br /><a href="https://en.wikipedia.org/wiki/Amazon_(company)" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a>
              </li>
              <li>
                <strong>Microsoft:</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.6)', fontSize: '.8rem' }}>phần mềm · cloud Azure · gaming · LinkedIn · OpenAI</span>
                <br /><a href="https://en.wikipedia.org/wiki/Microsoft" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a>
              </li>
              <li>
                <strong>Apple:</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.6)', fontSize: '.8rem' }}>thiết bị · App Store · dịch vụ tài chính · streaming</span>
                <br /><a href="https://en.wikipedia.org/wiki/Apple_Inc." target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="slide-col-head">Tại sao đây là độc quyền?</p>
            <ul className="slide-bullets">
              <li>Google chiếm <strong>~92%</strong> thị phần tìm kiếm toàn cầu&nbsp;<a href="https://gs.statcounter.com/search-engine-market-share" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 statcounter.com</a></li>
              <li>Amazon chiếm <strong>~38%</strong> thị phần thương mại điện tử Mỹ&nbsp;<a href="https://en.wikipedia.org/wiki/Amazon_(company)" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
              <li>Microsoft + Google kiểm soát <strong>~60%</strong> thị trường cloud&nbsp;<a href="https://en.wikipedia.org/wiki/Cloud_computing#Providers" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
              <li>Apple thu về <strong>~85%</strong> lợi nhuận toàn bộ ngành smartphone&nbsp;<a href="https://en.wikipedia.org/wiki/Apple_Inc." target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
            </ul>
            <div className="slide-examples" style={{ marginTop: '.8rem' }}>
              <span>📊 Thị phần khổng lồ</span>
              <span>🌐 Hoạt động toàn cầu</span>
              <span>💰 Lợi nhuận cực lớn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 4: Sơ đồ minh họa */}
      <div className="card">
        <h3>4️⃣ Sơ đồ minh họa — Độc quyền hiện đại</h3>
        <div className="org-chart">
          <div className="org-top">
            <div className="org-box org-main">🏛️ Độc quyền hiện đại</div>
          </div>
          <div className="org-arrow-down">↓</div>
          <div className="org-mid">
            <div className="org-box org-sub">🏢 Tập đoàn<br /><small>kinh tế lớn</small></div>
            <div className="org-box org-sub">💰 Tư bản<br /><small>tài chính</small></div>
            <div className="org-box org-sub">🌍 Công ty<br /><small>xuyên quốc gia</small></div>
          </div>
          <div className="org-arrow-down">↓</div>
          <div className="org-bottom">
            <div className="org-box org-small">📈 Ảnh hưởng kinh tế toàn cầu</div>
          </div>
          <div className="org-arrow-down">↓</div>
          <div className="org-final">
            <div className="org-box org-chain">🌐 Chi phối thị trường & nền kinh tế thế giới</div>
          </div>
        </div>

        <p className="slide-col-head" style={{ marginTop: '1rem' }}>📊 Đặc điểm của độc quyền thời đại mới</p>
        <div className="slide-examples">
          <span>🌐 Toàn cầu hóa</span>
          <span>💻 Cách mạng KH-CN</span>
          <span>🏢 TNCs</span>
          <span>🤝 Liên minh kinh tế</span>
          <span>📱 Kinh tế số</span>
        </div>

        <div className="speaker-note">
          🎤 <strong>Câu kết:</strong> Tóm lại, độc quyền trong thời đại mới không còn giới hạn trong một quốc gia hay một ngành. Các tập đoàn lớn liên kết với tư bản tài chính, vươn ra toàn cầu và chi phối cả nền kinh tế thế giới. Đây là cơ sở để chúng ta hiểu các phần tiếp theo.
        </div>
      </div>

      <ImageGallery
        title="🌎 Các tập đoàn độc quyền hàng đầu thế giới"
        items={[
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://about.google&size=256', label: 'Google / Alphabet', emoji: '🔍', bg: '#4285F4' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://amazon.com&size=256', label: 'Amazon', emoji: '📦', bg: '#FF9900' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://microsoft.com&size=256', label: 'Microsoft', emoji: '💻', bg: '#00BCF2' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://apple.com&size=256', label: 'Apple', emoji: '🍎', bg: '#555555' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://meta.com&size=256', label: 'Meta', emoji: '🌐', bg: '#0866FF' },
        ]}
      />
    </div>
  )
}

// Tích tụ Section
function TichTuSection() {
  return (
    <div className="section">
      <h2>🏢 Biểu hiện mới của Tích tụ và Tập trung Tư bản</h2>

      {/* Slide 1 – Tổng quan */}
      <div className="card highlight">
        <h3>📌 Nội dung chính</h3>
        <ul className="slide-bullets">
          <li>Trước đây, doanh nghiệp chủ yếu phát triển trong <strong>một ngành</strong>, <strong>một quốc gia</strong></li>
          <li>Ngày nay, do toàn cầu hóa và công nghệ, các tập đoàn mở rộng ra <strong>nhiều ngành – nhiều quốc gia</strong></li>
          <li>Xuất hiện hình thức tổ chức độc quyền mới: <strong>Concern</strong> và <strong>Conglomerate</strong></li>
          <li>Doanh nghiệp vừa và nhỏ vẫn tồn tại nhưng <strong>liên kết, phụ thuộc</strong> tập đoàn lớn&nbsp;<a href="https://kinhtetieudung.vn/khi-doanh-nghiep-nho-dong-vai-tro-lon-trong-nen-kinh-te-a22512.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 kinhtetieudung.vn</a></li>
        </ul>
        <div className="slide-examples">
          <span>Samsung</span><span>Berkshire Hathaway</span><span>Toyota Group</span><span>Vingroup</span>
        </div>
        <div className="speaker-note">
          💬 <em>Ngày nay sự tích tụ và tập trung tư bản thể hiện qua sự xuất hiện của các tập đoàn xuyên quốc gia hoạt động ở nhiều ngành và nhiều quốc gia.</em>
        </div>
      </div>

      {/* Slide 2 – Concern */}
      <div className="card">
        <h3>🏭 Concern — Tập đoàn Đa ngành</h3>
        <div className="definition">
          <strong>Khái niệm:</strong> Tổ chức độc quyền đa ngành, gồm nhiều công ty hoạt động trong <strong>nhiều lĩnh vực khác nhau</strong> và ở nhiều quốc gia.
        </div>
        <div className="slide-two-col">
          <div>
            <p className="slide-col-head">📌 Ví dụ cụ thể</p>
            <ul className="slide-bullets">
              <li><strong>Samsung (Hàn Quốc):</strong><br />điện tử · đóng tàu · xây dựng · bảo hiểm · khách sạn<br /><a href="https://timviec365.vn/blog/lich-su-hinh-thanh-samsung-new13516.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 timviec365.vn</a></li>
              <li><strong>General Electric (Mỹ):</strong><br />hàng không · y tế · năng lượng · tài chính<br /><a href="https://www.ge.com/about-us" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 ge.com/about-us</a></li>
              <li><strong>Siemens (Đức):</strong><br />điện tử · giao thông · y tế · năng lượng<br /><a href="https://www.siemens.com/global/en/company/about.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 siemens.com/about</a></li>
            </ul>
          </div>
          <div>
            <p className="slide-col-head">🔑 Lý do hình thành</p>
            <ul className="slide-bullets">
              <li>Cạnh tranh gay gắt — kinh doanh một ngành dễ phá sản</li>
              <li>Tránh bị hạn chế bởi luật chống độc quyền</li>
              <li>Đa dạng hóa rủi ro, tối đa hóa lợi nhuận</li>
            </ul>
          </div>
        </div>
        <div className="speaker-note">
          💬 <em>Concern là tập đoàn đa ngành. Samsung không chỉ sản xuất điện thoại mà còn hoạt động trong xây dựng, bảo hiểm và đóng tàu — đây chính là biểu hiện của Concern.</em>
        </div>
      </div>

      {/* Slide 3 – Conglomerate */}
      <div className="card">
        <h3>💼 Conglomerate — Tập đoàn Hỗn hợp</h3>
        <div className="definition">
          <strong>Khái niệm:</strong> Tập đoàn gồm nhiều công ty <strong>không liên quan trực tiếp đến sản xuất</strong>. Chủ yếu kiếm lợi nhuận từ đầu tư tài chính và chứng khoán.
        </div>
        <div className="slide-two-col">
          <div>
            <p className="slide-col-head">📌 Ví dụ cụ thể</p>
            <ul className="slide-bullets">
              <li><strong>Berkshire Hathaway (Mỹ — Warren Buffett):</strong><br />bảo hiểm · đường sắt · năng lượng · bán lẻ · công nghệ<br /><a href="https://vi.wikipedia.org/wiki/Berkshire_Hathaway" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 vi.wikipedia.org</a></li>
              <li><strong>Tata Group (Ấn Độ):</strong><br />ô tô · thép · IT · khách sạn · trà<br /><a href="https://www.tata.com/business" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 tata.com/business</a></li>
              <li><strong>Alibaba (Trung Quốc):</strong><br />thương mại điện tử · cloud · thanh toán · truyền thông<br /><a href="https://www.alibabagroup.com/en-US/about-alibaba-businesses" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 alibabagroup.com</a></li>
            </ul>
          </div>
          <div>
            <p className="slide-col-head">⚖️ Đặc điểm</p>
            <ul className="slide-bullets">
              <li>✔ Linh hoạt trong đầu tư</li>
              <li>✔ Dễ chuyển vốn sang lĩnh vực lợi nhuận cao</li>
              <li>⚠ Dễ bị ảnh hưởng bởi biến động tài chính</li>
            </ul>
          </div>
        </div>
        <div className="speaker-note">
          💬 <em>Khác với Concern, Conglomerate gồm các công ty không liên quan đến sản xuất — Berkshire Hathaway sở hữu cả công ty bảo hiểm lẫn đường sắt, những thứ hoàn toàn khác nhau.</em>
        </div>
      </div>

      {/* Slide 4 – DNVVN */}
      <div className="card">
        <h3>🏪 Vai trò của Doanh nghiệp Vừa và Nhỏ</h3>
        <p style={{ fontSize: '.9rem', color: 'var(--text)', marginBottom: '.8rem' }}>
          Trong nền kinh tế hiện nay, doanh nghiệp vừa và nhỏ vẫn phát triển mạnh — nhưng thường <strong>liên kết hoặc phụ thuộc</strong> vào các tập đoàn lớn.
        </p>
        <div className="slide-two-col">
          <div>
            <p className="slide-col-head">🔍 Nguyên nhân phát triển</p>
            <ul className="slide-bullets">
              <li>Công nghệ giúp chuyên môn hóa sản xuất</li>
              <li>Tập đoàn lớn không tự làm tất cả → hợp tác với doanh nghiệp nhỏ</li>
              <li>Linh hoạt, đổi mới nhanh, dễ thích ứng thị trường</li>
            </ul>
          </div>
          <div>
            <p className="slide-col-head">📌 Ví dụ cụ thể</p>
            <ul className="slide-bullets">
              <li><strong>Toyota:</strong> hợp tác với hơn 10.000 nhà cung cấp linh kiện toàn cầu&nbsp;
                <a href="https://vi.wikipedia.org/wiki/Toyota" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 vi.wikipedia.org</a></li>
              <li><strong>Apple:</strong> thiết kế tại Mỹ — linh kiện từ hàng trăm công ty khác nhau&nbsp;
                <a href="https://www.apple.com/supply-chain/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 apple.com/supply-chain</a></li>
              <li><strong>Zara:</strong> làm việc với 1.400 xưởng may nhỏ ở Tây Ban Nha&nbsp;
                <a href="https://en.wikipedia.org/wiki/Zara_(retailer)" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
            </ul>
          </div>
        </div>
        <div className="speaker-note">
          💬 <em>Doanh nghiệp nhỏ đóng vai trò quan trọng trong chuỗi cung ứng toàn cầu — họ là mắt xích sản xuất cho các tập đoàn lớn.</em>
        </div>
      </div>

      {/* Slide 5 – Nước đang phát triển */}
      <div className="card">
        <h3>🌏 Độc quyền ở các Nước đang Phát triển</h3>
        <p style={{ fontSize: '.9rem', color: 'var(--text)', marginBottom: '.8rem' }}>
          Độc quyền không chỉ tồn tại ở các nước phát triển mà còn xuất hiện ngày càng mạnh ở các nước đang phát triển.
        </p>
        <div className="slide-two-col">
          <div>
            <p className="slide-col-head">📌 Ví dụ cụ thể</p>
            <ul className="slide-bullets">
              <li><strong>Vingroup (Việt Nam):</strong> bất động sản · VinFast · bán lẻ · công nghệ<br /><a href="https://en.wikipedia.org/wiki/Vingroup" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
              <li><strong>Reliance Industries (Ấn Độ):</strong> dầu khí · viễn thông · bán lẻ<br /><a href="https://en.wikipedia.org/wiki/Reliance_Industries" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
              <li><strong>Petrobras (Brazil):</strong> chi phối toàn bộ ngành dầu khí<br /><a href="https://en.wikipedia.org/wiki/Petrobras" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
              <li><strong>Saudi Aramco (Ả Rập):</strong> độc quyền dầu mỏ quy mô toàn cầu<br /><a href="https://en.wikipedia.org/wiki/Saudi_Aramco" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
            </ul>
          </div>
          <div>
            <p className="slide-col-head">🔑 Nguyên nhân hình thành</p>
            <ul className="slide-bullets">
              <li>Đầu tư từ các tập đoàn xuyên quốc gia (TNCs)</li>
              <li>Ứng dụng khoa học công nghệ hiện đại</li>
              <li>Quy mô vốn lớn đủ sức chi phối cả một ngành</li>
            </ul>
          </div>
        </div>
        <div className="speaker-note">
          💬 <em>Ở Việt Nam, Vingroup là ví dụ điển hình — chỉ một tập đoàn nhưng hoạt động từ bất động sản đến ô tô, điện thoại, bệnh viện và trường học.</em>
        </div>
      </div>

      {/* Sơ đồ */}
      <div className="card">
        <h3>📊 Sơ đồ: Cấu trúc Tập đoàn trong Nền kinh tế Hiện đại</h3>
        <div className="org-chart">
          <div className="org-top">
            <div className="org-box org-main">🏛️ Tập đoàn lớn<br /><small>Concern / Conglomerate</small></div>
          </div>
          <div className="org-arrow-down">↓</div>
          <div className="org-mid">
            <div className="org-box org-sub">🏢 Công ty con A<br /><small>Ngành điện tử</small></div>
            <div className="org-box org-sub">🏢 Công ty con B<br /><small>Ngành tài chính</small></div>
            <div className="org-box org-sub">🏢 Công ty con C<br /><small>Ngành logistics</small></div>
          </div>
          <div className="org-arrow-down">↓</div>
          <div className="org-bottom">
            <div className="org-box org-small">🏪 DN vừa & nhỏ<br /><small>Gia công · Linh kiện</small></div>
          </div>
          <div className="org-arrow-down">↓</div>
          <div className="org-final">
            <div className="org-box org-chain">🌐 Chuỗi sản xuất toàn cầu</div>
          </div>
        </div>
        <div className="speaker-note">
          💬 <em>Tóm lại, tích tụ và tập trung tư bản ngày nay thể hiện qua Concern và Conglomerate hoạt động toàn cầu — bên cạnh đó doanh nghiệp nhỏ vẫn đóng vai trò quan trọng trong chuỗi sản xuất.</em>
        </div>
      </div>

      <ImageGallery
        title="🏭 Các tập đoàn tiêu biểu"
        items={[
          { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1200px-Samsung_Logo.svg.png', label: 'Samsung', emoji: '📱', bg: '#1428A0' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://berkshirehathaway.com&size=256', label: 'Berkshire Hathaway', emoji: '💰', bg: '#1a3a5c' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://toyota.com&size=256', label: 'Toyota Group', emoji: '🚗', bg: '#EB0A1E' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://coca-cola.com&size=256', label: 'Coca-Cola', emoji: '🥤', bg: '#E3001B' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://siemens.com&size=256', label: 'Siemens', emoji: '⚡', bg: '#009999' },
        ]}
      />
    </div>
  )
}

// Tài chính Section
function TaiChinhSection() {
  return (
    <div className="section">
      <h2>💰 Biểu hiện về vai trò Tư bản Tài chính</h2>

      {/* Slide 1: Khái niệm */}
      <div className="card highlight">
        <h3>1️⃣ Khái niệm</h3>
        <p>
          <strong>Tư bản tài chính</strong> là sự kết hợp giữa <strong>tư bản ngân hàng</strong> và{' '}
          <strong>tư bản công nghiệp</strong>, hình thành nên các tập đoàn tài chính lớn có khả năng chi phối nền kinh tế.
        </p>
        <p style={{ marginTop: '.6rem' }}>
          Ngày nay, các tập đoàn tài chính không chỉ hoạt động trong lĩnh vực ngân hàng, mà còn đầu tư vào nhiều ngành kinh tế khác nhau.
        </p>
        <div className="slide-examples" style={{ marginTop: '.8rem' }}>
          <span>🏦 Tư bản ngân hàng</span>
          <span style={{ background: 'none', border: 'none', color: 'var(--text)' }}>➕</span>
          <span>🏭 Tư bản công nghiệp</span>
          <span style={{ background: 'none', border: 'none', color: 'var(--text)' }}>➡️</span>
          <span>💰 Tập đoàn tài chính lớn</span>
        </div>

      </div>

      {/* Slide 2: Biểu hiện 1 */}
      <div className="card">
        <h3>2️⃣ Biểu hiện chính</h3>
        <h4 style={{ margin: '.4rem 0 .6rem', color: 'var(--sky)' }}>📊 1. Mở rộng phạm vi liên kết</h4>
        <div className="slide-two-col">
          <div>
            <p className="slide-col-head">Nội dung</p>
            <ul className="slide-bullets">
              <li>Liên kết nhiều ngành: <strong>công nghiệp · nông nghiệp · thương mại · tín dụng · dịch vụ</strong></li>
              <li>Tạo thành các tổ hợp kinh tế lớn</li>
            </ul>
            <p className="slide-col-head" style={{ marginTop: '.9rem' }}>📈 Xu hướng mới</p>
            <ul className="slide-bullets">
              <li>📱 Fintech – công nghệ tài chính</li>
              <li>⚡ Tài chính kết hợp năng lượng xanh</li>
              <li>🏥 Tài chính + y tế & nông nghiệp CNC</li>
            </ul>
          </div>
          <div>
            <p className="slide-col-head">Ví dụ thực tế</p>
            <ul className="slide-bullets">
              <li>
                <strong>JPMorgan Chase (Mỹ):</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.65)', fontSize: '.8rem' }}>ngân hàng đầu tư · quản lý tài sản · ngân hàng thương mại · thẻ tín dụng · quỹ đầu tư</span>
                <br /><a href="https://en.wikipedia.org/wiki/JPMorgan_Chase" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a>
              </li>
              <li style={{ marginTop: '.5rem' }}>
                <strong>ICBC (Trung Quốc):</strong>
                <br /><span style={{ color: 'rgba(220,230,240,.65)', fontSize: '.8rem' }}>ngân hàng lớn nhất thế giới · công nghiệp · bất động sản · bảo hiểm</span>
                <br /><a href="https://en.wikipedia.org/wiki/Industrial_and_Commercial_Bank_of_China" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Slide 3: Biểu hiện 2 */}
      <div className="card">
        <h4 style={{ margin: '0 0 .6rem', color: 'var(--sky)' }}>📜 2. Cơ chế tham dự và ủy nhiệm</h4>
        <div className="slide-two-col">
          <div>
            <p className="slide-col-head">Cơ chế hoạt động</p>
            <div className="org-chart" style={{ alignItems: 'stretch', padding: '.3rem 0' }}>
              <div className="org-box org-sub" style={{ fontSize: '.78rem', minWidth: 0 }}>
                <strong>Bước 1:</strong> Công ty phát hành cổ phiếu
              </div>
              <div className="org-arrow-down">↓</div>
              <div className="org-box org-sub" style={{ fontSize: '.78rem', minWidth: 0 }}>
                <strong>Bước 2:</strong> Nhiều người dân mua cổ phiếu
              </div>
              <div className="org-arrow-down">↓</div>
              <div className="org-box org-sub" style={{ fontSize: '.78rem', minWidth: 0 }}>
                <strong>Bước 3:</strong> Cổ đông lớn được ủy quyền quản lý
              </div>
              <div className="org-arrow-down">↓</div>
              <div className="org-box org-small" style={{ fontSize: '.78rem', minWidth: 0 }}>
                ✅ Nhóm nhỏ kiểm soát công ty lớn
              </div>
            </div>
          </div>
          <div>
            <p className="slide-col-head">Ví dụ minh họa</p>
            <div className="org-box org-main" style={{ fontSize: '.8rem', minWidth: 0, marginBottom: '.8rem', textAlign: 'left' }}>
              <strong>Công ty ABC – vốn 1 tỷ USD</strong>
              <br /><small>👥 10 triệu cổ đông nhỏ = 70% (rời rạc, không quản lý)</small>
              <br /><small>👤 1 đại cổ đông = 30% (tập trung, có quyền)</small>
              <br /><small style={{ color: '#4ade80', fontWeight: 600 }}>→ Đại cổ đông kiểm soát toàn bộ</small>
            </div>
            <p className="slide-col-head">Phương thức kiểm soát</p>
            <ul className="slide-bullets">
              <li><strong>Trực tiếp:</strong> nắm cổ phần chi phối, bổ nhiệm ban lãnh đạo</li>
              <li><strong>Gián tiếp:</strong> qua ngân hàng, tín dụng, thị trường chứng khoán</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Slide 4: Biểu hiện 3 */}
      <div className="card">
        <h4 style={{ margin: '0 0 .6rem', color: 'var(--sky)' }}>🌐 3. Ngân hàng đa quốc gia và xuyên quốc gia</h4>
        <div className="slide-two-col">
          <div>
            <p className="slide-col-head">Ví dụ ngân hàng toàn cầu</p>
            <ul className="slide-bullets">
              <li><strong>HSBC (Anh):</strong> 64 quốc gia · 40 triệu khách hàng · tài sản $3 nghìn tỷ&nbsp;<a href="https://en.wikipedia.org/wiki/HSBC" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
              <li><strong>Citigroup (Mỹ):</strong> 160 quốc gia · 200 triệu tài khoản&nbsp;<a href="https://en.wikipedia.org/wiki/Citigroup" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
              <li><strong>BNP Paribas (Pháp):</strong> ngân hàng lớn nhất châu Âu · 72 quốc gia&nbsp;<a href="https://en.wikipedia.org/wiki/BNP_Paribas" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.78rem', color: 'var(--sky)', opacity: .8 }}>🔗 en.wikipedia.org</a></li>
            </ul>
          </div>
          <div>
            <p className="slide-col-head">🏙️ Trung tâm tài chính thế giới</p>
            <div className="slide-examples">
              <span>🗽 New York</span>
              <span>🇬🇧 London</span>
              <span>🇭🇰 Hong Kong</span>
              <span>🇸🇬 Singapore</span>
              <span>🗼 Tokyo</span>
            </div>
            <p className="slide-col-head" style={{ marginTop: '.9rem' }}>Vai trò</p>
            <ul className="slide-bullets">
              <li>Giao dịch ngoại hối</li>
              <li>Thị trường chứng khoán quốc tế</li>
              <li>Phát hành trái phiếu quốc tế</li>
              <li>Các sản phẩm tài chính phức tạp</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Slide 5: Sơ đồ + Câu kết */}
      <div className="card">
        <h3>3️⃣ Sơ đồ minh họa</h3>
        <div className="org-chart">
          <div className="org-top">
            <div className="org-box org-main">💰 Tư bản tài chính</div>
          </div>
          <div className="org-arrow-down">↓</div>
          <div className="org-mid">
            <div className="org-box org-sub">🏦 Ngân hàng</div>
            <div className="org-box org-sub">🏭 Công nghiệp</div>
            <div className="org-box org-sub">📈 Thị trường tài chính</div>
          </div>
          <div className="org-arrow-down">↓</div>
          <div className="org-bottom">
            <div className="org-box org-small">🏛️ Tập đoàn tài chính lớn</div>
          </div>
          <div className="org-arrow-down">↓</div>
          <div className="org-final">
            <div className="org-box org-chain">🌐 Hoạt động toàn cầu</div>
          </div>
        </div>
      </div>

      <ImageGallery
        title="🏦 Các tập đoàn Tài chính lớn nhất thế giới"
        items={[
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://blackrock.com&size=256', label: 'BlackRock ($10T AUM)', emoji: '🏛️', bg: '#1a1a2e' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://jpmorgan.com&size=256', label: 'JPMorgan Chase', emoji: '🏦', bg: '#003087' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://goldmansachs.com&size=256', label: 'Goldman Sachs', emoji: '📊', bg: '#5a6c8c' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://bankofamerica.com&size=256', label: 'Bank of America', emoji: '💵', bg: '#E31837' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://investor.vanguard.com&size=256', label: 'Vanguard Group', emoji: '⛵', bg: '#811f10' },
        ]}
      />
    </div>
  )
}

// Xuất khẩu Section
function XuatKhauSection() {
  return (
    <div className="section">
      <h2>🌍 Biểu hiện mới của Xuất khẩu Tư bản</h2>

      <ImageGallery
        title="🌟 Ví dụ: FDI & Xuất khẩu Tư bản hiện đại"
        items={[
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://aws.amazon.com&size=256', label: 'Amazon AWS (FDI Cloud)', emoji: '☁️', bg: '#FF9900' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://berkshirehathaway.com&size=256', label: 'Berkshire Hathaway', emoji: '💰', bg: '#1a3a5c' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://toyota.com&size=256', label: 'Toyota FDI VN', emoji: '🇻🇳', bg: '#EB0A1E' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://apple.com&size=256', label: 'Apple Supply Chain', emoji: '🌏', bg: '#555555' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://temasek.com.sg&size=256', label: 'Temasek Holdings', emoji: '🇸🇬', bg: '#e30613' },
        ]}
      />

      {/* Biểu hiện 1 */}
      <div className="card">
        <h3>🔄 1. Thay đổi dòng chảy tư bản</h3>

        <div className="comparison-table">
          <div className="table-row header">
            <div>Trước đây</div>
            <div>→</div>
            <div>Hiện nay</div>
          </div>
          <div className="table-row">
            <div>Nước phát triển → Nước kém phát triển</div>
            <div>⇌</div>
            <div>Nước phát triển ⇄ Nước phát triển</div>
          </div>
        </div>

        <div className="stat-box">
          <h4>📊 Thống kê FDI 2025:</h4>
          <ul>
            <li>🇺🇸 → 🇪🇺: $450 tỷ (công nghệ, dược phẩm)</li>
            <li>🇪🇺 → 🇺🇸: $380 tỷ (ô tô, hóa chất)</li>
            <li>🇯🇵 → 🇺🇸: $180 tỷ (điện tử, robot)</li>
            <li>💡 <strong>70% FDI toàn cầu</strong> luân chuyển giữa các nước phát triển</li>
          </ul>
        </div>

        <div className="reason-box">
          <h4>🔑 Nguyên nhân:</h4>
          <div className="two-columns">
            <div>
              <strong>✅ Ưu tiên nước phát triển:</strong>
              <ul>
                <li>Công nghệ cao, vốn lớn</li>
                <li>Lợi nhuận cao hơn</li>
                <li>Hạ tầng hoàn thiện</li>
                <li>Chính trị ổn định</li>
              </ul>
            </div>
            <div>
              <strong>⚠️ Hạn chế nước đang phát triển:</strong>
              <ul>
                <li>Hạ tầng lạc hậu</li>
                <li>Chính trị kém ổn định</li>
                <li>Rủi ro cao</li>
                <li>Lợi nhuận giảm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu hiện 2 */}
      <div className="card">
        <h3>🏢 2. Thay đổi chủ thể xuất khẩu</h3>

        <div className="example-box">
          <h4>📌 Vai trò của TNCs:</h4>
          <ul>
            <li>
              <strong>Apple (Mỹ):</strong>
              <ul>
                <li>Đầu tư nhà máy tại Trung Quốc, Ấn Độ, Việt Nam</li>
                <li>FDI hàng năm: $15-20 tỷ</li>
                <li>Chuỗi cung ứng 200+ quốc gia</li>
              </ul>
            </li>
            <li>
              <strong>Toyota (Nhật):</strong>
              <ul>
                <li>53 nhà máy ở 28 quốc gia</li>
                <li>Sản xuất 10 triệu xe/năm ở ngoài Nhật</li>
              </ul>
            </li>
            <li>
              <strong>Volkswagen (Đức):</strong> 122 nhà máy tại 31 quốc gia
            </li>
          </ul>
        </div>

        <div className="trend-box">
          <h4>🌏 Chủ thể mới từ nước đang phát triển:</h4>
          <ul>
            <li><strong>🇨🇳 Trung Quốc:</strong> Huawei, Alibaba, BYD đầu tư ra nước ngoài hàng chục tỷ USD/năm</li>
            <li><strong>🇮🇳 Ấn Độ:</strong> Tata Motors mua Jaguar Land Rover, Mittal Steel</li>
            <li><strong>🇧🇷 Brazil:</strong> Embraer xuất khẩu máy bay ra toàn cầu</li>
            <li><strong>🇻🇳 Việt Nam:</strong> Vingroup, Viettel đầu tư vào Myanmar, Lào, Campuchia</li>
          </ul>
        </div>
      </div>

      {/* Biểu hiện 3 */}
      <div className="card">
        <h3>💼 3. Đa dạng hóa hình thức xuất khẩu</h3>

        <div className="form-box">
          <h4>🔧 Các hình thức mới:</h4>

          <div className="form-item">
            <strong>BOT (Build-Operate-Transfer):</strong>
            <div className="example-box">
              <p>Xây dựng - Kinh doanh - Chuyển giao</p>
              <p><strong>Ví dụ:</strong></p>
              <ul>
                <li>Cao tốc Bắc-Nam (Việt Nam): Vốn Nhật, thời gian BOT 30 năm</li>
                <li>Nhà máy điện Phú Mỹ: Samsung C&T đầu tư theo BOT</li>
                <li>Cảng Lạch Huyện (Hải Phòng): Vốn Nhật $1.1 tỷ, BOT 50 năm</li>
              </ul>
            </div>
          </div>

          <div className="form-item">
            <strong>BT (Build-Transfer):</strong>
            <div className="example-box">
              <p>Xây dựng - Chuyển giao</p>
              <p><strong>Ví dụ:</strong></p>
              <ul>
                <li>Dự án hạ tầng đổi lấy quỹ đất</li>
                <li>Trung Quốc xây cầu đường ở châu Phi đổi lấy quyền khai thác khoáng sản</li>
              </ul>
            </div>
          </div>

          <div className="form-item">
            <strong>PPP (Public-Private Partnership):</strong>
            <div className="example-box">
              <p>Đối tác công tư</p>
              <p><strong>Ví dụ:</strong> Dự án metro Hà Nội, TP.HCM có sự hợp tác vốn nhà nước và tư nhân</p>
            </div>
          </div>
        </div>

        <div className="combination-box">
          <h4>🔗 Kết hợp đa dạng:</h4>
          <ul>
            <li>💻 <strong>Xuất khẩu chất xám:</strong> chuyển giao công nghệ, bản quyền, đào tạo</li>
            <li>📦 <strong>Xuất khẩu + đầu tư:</strong> bán sản phẩm kèm xây nhà máy</li>
            <li>🤝 <strong>Joint venture:</strong> liên doanh công nghệ + tài chính</li>
          </ul>
        </div>
      </div>

      {/* Biểu hiện 4 */}
      <div className="card">
        <h3>🤝 4. Từ áp đặt sang Cùng có lợi</h3>

        <div className="comparison-table">
          <div className="table-row header">
            <div>Thời kỳ thực dân cũ</div>
            <div>→</div>
            <div>Thời kỳ hiện nay</div>
          </div>
          <div className="table-row">
            <div>❌ Áp đặt, bóc lột trực tiếp</div>
            <div></div>
            <div>✅ Win-win, hợp tác đôi bên</div>
          </div>
          <div className="table-row">
            <div>❌ Chiếm đoạt tài nguyên</div>
            <div></div>
            <div>✅ Chuyển giao công nghệ</div>
          </div>
          <div className="table-row">
            <div>❌ Lao động rẻ mạt</div>
            <div></div>
            <div>✅ Đào tạo, nâng cao kỹ năng</div>
          </div>
        </div>

        <div className="example-box">
          <h4>📌 Ví dụ hợp tác cùng có lợi:</h4>
          <ul>
            <li>
              <strong>Samsung tại Việt Nam:</strong>
              <ul>
                <li>Đầu tư: $20 tỷ</li>
                <li>Việt Nam được: việc làm (200,000 người), chuyển giao công nghệ, xuất khẩu $70 tỷ/năm</li>
                <li>Samsung được: chi phí thấp, thị trường ASEAN, ưu đãi thuế</li>
              </ul>
            </li>
            <li>
              <strong>Tesla ở Trung Quốc:</strong>
              <ul>
                <li>Trung Quốc: công nghệ xe điện, việc làm, phát triển chuỗi cung ứng</li>
                <li>Tesla: thị trường lớn nhất thế giới, giảm chi phí vận chuyển</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Thị trường Section
function ThiTruongSection() {
  return (
    <div className="section">
      <h2>🗺️ Phân chia Thị trường Thế giới</h2>

      <ImageGallery
        title="🤝 Liên minh kinh tế & Tổ chức độc quyền"
        items={[
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://europa.eu&size=256', label: 'Liên minh Châu Âu (EU)', emoji: '🇪🇺', bg: '#003399' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://opec.org&size=256', label: 'OPEC - Dầu mỏ', emoji: '🛢️', bg: '#007A5E' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://wto.org&size=256', label: 'WTO', emoji: '🌐', bg: '#1a356e' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://asean.org&size=256', label: 'ASEAN', emoji: '🌏', bg: '#033e8c' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://coca-cola.com&size=256', label: 'Coca-Cola Toàn cầu', emoji: '🥤', bg: '#E3001B' },
        ]}
      />

      <div className="card highlight">
        <h3>🎯 Xu hướng chính</h3>
        <div className="two-columns">
          <div className="trend-item">
            <h4>🌐 Toàn cầu hóa</h4>
            <p>Kinh tế thế giới liên kết chặt chẽ, biên giới mờ nhạt</p>
          </div>
          <div className="trend-item">
            <h4>🏛️ Khu vực hóa</h4>
            <p>Các khối liên minh kinh tế khu vực ra đời</p>
          </div>
        </div>
      </div>

      {/* TNCs */}
      <div className="card">
        <h3>🏢 Vai trò của Công ty Xuyên quốc gia (TNCs)</h3>

        <div className="stat-box">
          <h4>📊 Quy mô và sức mạnh:</h4>
          <ul>
            <li>💼 <strong>Số lượng:</strong> hơn 80,000 TNCs toàn cầu</li>
            <li>🏭 <strong>Chi nhánh:</strong> 800,000+ công ty con</li>
            <li>💵 <strong>Doanh thu:</strong> Top 100 TNCs = GDP của 150 quốc gia</li>
            <li>👥 <strong>Lao động:</strong> 100+ triệu người làm việc trực tiếp</li>
            <li>📈 <strong>Tỷ trọng:</strong> kiểm soát 70% thương mại thế giới</li>
          </ul>
        </div>

        <div className="example-box">
          <h4>📌 Top 10 TNCs mạnh nhất (2025):</h4>
          <div className="top-list">
            <div className="top-item">
              <strong>1. Apple 🍎</strong> - Vốn hóa $3.5 nghìn tỷ - Công nghệ
            </div>
            <div className="top-item">
              <strong>2. Microsoft 💻</strong> - $3.2 nghìn tỷ - Phần mềm, Cloud
            </div>
            <div className="top-item">
              <strong>3. Saudi Aramco 🛢️</strong> - $2.8 nghìn tỷ - Dầu khí
            </div>
            <div className="top-item">
              <strong>4. Amazon 📦</strong> - $2.1 nghìn tỷ - Thương mại điện tử
            </div>
            <div className="top-item">
              <strong>5. Nvidia 🎮</strong> - $2.0 nghìn tỷ - Chip AI
            </div>
          </div>
        </div>

        <div className="influence-box">
          <h4>🎯 Phạm vi ảnh hưởng:</h4>
          <ul>
            <li><strong>Walmart:</strong> Hoạt động 24 quốc gia, 10,500 cửa hàng, 2.3 triệu nhân viên</li>
            <li><strong>Shell:</strong> Khai thác dầu khí tại 70+ quốc gia</li>
            <li><strong>Nestlé:</strong> 2,000 thương hiệu, bán tại 189 quốc gia</li>
            <li><strong>Coca-Cola:</strong> Tiêu thụ tại 200+ quốc gia, 1.9 tỷ ly/ngày</li>
          </ul>
        </div>
      </div>

      {/* Khu vực hóa */}
      <div className="card">
        <h3>🏛️ Các Liên minh Kinh tế Khu vực</h3>

        <div className="region-box">
          <h4>🇪🇺 1. Liên minh châu Âu (EU)</h4>
          <ul>
            <li><strong>Thành lập:</strong> 1993 (từ EEC 1957)</li>
            <li><strong>Thành viên:</strong> 27 quốc gia (sau Brexit)</li>
            <li><strong>Dân số:</strong> 450 triệu người</li>
            <li><strong>GDP:</strong> $18 nghìn tỷ (2025)</li>
            <li><strong>Đồng tiền:</strong> Euro (€) - 20 quốc gia sử dụng</li>
            <li><strong>Đặc điểm:</strong>
              <ul>
                <li>✅ Hàng hóa, dịch vụ, vốn, lao động tự do lưu chuyển</li>
                <li>✅ Chính sách chung về nông nghiệp, thương mại</li>
                <li>✅ Nghị viện châu Âu, Tòa án Công lý EU</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="region-box">
          <h4>🌎 2. NAFTA / USMCA (Bắc Mỹ)</h4>
          <ul>
            <li><strong>Thành viên:</strong> Mỹ, Canada, Mexico</li>
            <li><strong>Ra đời:</strong> NAFTA (1994) → USMCA (2020)</li>
            <li><strong>Dân số:</strong> 500 triệu người</li>
            <li><strong>GDP:</strong> $28 nghìn tỷ</li>
            <li><strong>Thương mại nội khối:</strong> $1.3 nghìn tỷ/năm</li>
            <li><strong>Đặc điểm:</strong>
              <ul>
                <li>✅ Xóa bỏ 99% thuế quan</li>
                <li>✅ Bảo hộ sở hữu trí tuệ</li>
                <li>✅ Quy định về lao động, môi trường</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="region-box">
          <h4>🌏 3. ASEAN (Đông Nam Á)</h4>
          <ul>
            <li><strong>Thành viên:</strong> 10 quốc gia ĐNA</li>
            <li><strong>Thành lập:</strong> 1967</li>
            <li><strong>Dân số:</strong> 680 triệu người</li>
            <li><strong>GDP:</strong> $3.6 nghìn tỷ</li>
            <li><strong>Mục tiêu:</strong> Cộng đồng kinh tế ASEAN (AEC) 2025</li>
            <li><strong>FTA với:</strong> Trung Quốc, Nhật, Hàn, Ấn Độ, Australia-New Zealand</li>
          </ul>
        </div>

        <div className="region-box">
          <h4>🛢️ 4. OPEC (Tổ chức Xuất khẩu Dầu mỏ)</h4>
          <ul>
            <li><strong>Thành viên:</strong> 13 quốc gia (Ả Rập Saudi, Iran, UAE, Kuwait...)</li>
            <li><strong>Thành lập:</strong> 1960</li>
            <li><strong>Sản lượng:</strong> 40% dầu thế giới</li>
            <li><strong>Dự trữ:</strong> 80% trữ lượng dầu toàn cầu</li>
            <li><strong>Vai trò:</strong> Quyết định giá dầu thế giới thông qua điều chỉnh sản lượng</li>
          </ul>
        </div>

        <div className="region-box">
          <h4>🌍 5. Các liên minh khác</h4>
          <ul>
            <li><strong>MERCOSUR (Nam Mỹ):</strong> Brazil, Argentina, Uruguay, Paraguay</li>
            <li><strong>RCEP (châu Á-TBD):</strong> 15 quốc gia, FTA lớn nhất thế giới (2020)</li>
            <li><strong>African Continental FTA:</strong> 54 quốc gia châu Phi (2021)</li>
            <li><strong>CPTPP:</strong> 11 quốc gia vùng TBD (sau khi Mỹ rút)</li>
          </ul>
        </div>
      </div>

      {/* Cạnh tranh */}
      <div className="card">
        <h3>⚔️ Cạnh tranh giữa các Khối</h3>

        <div className="competition-box">
          <h4>🥊 Chiến tranh thương mại Mỹ - Trung:</h4>
          <ul>
            <li><strong>2018-2019:</strong> Mỹ áp thuế 25% lên $250 tỷ hàng Trung Quốc</li>
            <li><strong>Đáp trả:</strong> Trung Quốc thuế 25% hàng Mỹ</li>
            <li><strong>Công nghệ:</strong> Cấm vận Huawei, TikTok, ZTE</li>
            <li><strong>Chip:</strong> Mỹ hạn chế xuất chip tiên tiến sang TQ</li>
            <li><strong>Ảnh hưởng:</strong> Chuỗi cung ứng toàn cầu tái cấu trúc</li>
          </ul>
        </div>

        <div className="strategy-box">
          <h4>🎯 Chiến lược của các cường quốc:</h4>
          <ul>
            <li><strong>🇺🇸 Mỹ:</strong> "America First", tái công nghiệp hóa, kiềm chế Trung Quốc</li>
            <li><strong>🇨🇳 Trung Quốc:</strong> "Vành đai con đường" (BRI), Made in China 2025</li>
            <li><strong>🇪🇺 EU:</strong> Tự chủ chiến lược, chuyển đổi xanh</li>
            <li><strong>🇷🇺 Nga:</strong> Liên kết với BRICS, Liên minh Á-Âu</li>
          </ul>
        </div>
      </div>

      {/* Vai trò nước đang phát triển */}
      <div className="card">
        <h3>🌏 Vai trò của Nước đang Phát triển</h3>

        <div className="example-box">
          <h4>📌 BRICS mở rộng:</h4>
          <ul>
            <li><strong>Thành viên gốc:</strong> Brazil, Nga, Ấn Độ, Trung Quốc, Nam Phi</li>
            <li><strong>Mở rộng 2024:</strong> + Ả Rập Saudi, UAE, Iran, Ai Cập, Ethiopia, Argentina</li>
            <li><strong>Dân số:</strong> 46% dân số thế giới</li>
            <li><strong>GDP:</strong> 36% GDP toàn cầu (PPP)</li>
            <li><strong>Mục tiêu:</strong> Ngân hàng phát triển BRICS, đồng tiền riêng thay USD</li>
          </ul>
        </div>

        <div className="significance-box">
          <h4>💡 Ý nghĩa:</h4>
          <ul>
            <li>✊ Chống lại sức ép của cường quốc tư bản</li>
            <li>🤝 Tăng sức mạnh thương lượng trong WTO, IMF, World Bank</li>
            <li>🌱 Thúc đẩy hợp tác Nam-Nam</li>
            <li>⚖️ Cân bằng lại trật tự thế giới đa cực</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Lãnh thổ Section
function LanhThoSection() {
  return (
    <div className="section">
      <h2>⚔️ Phân chia Lãnh thổ Ảnh hưởng</h2>

      <ImageGallery
        title="🇺🇸 Các tổ chức địa chính trị & quân sự"
        items={[
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://nato.int&size=256', label: 'NATO', emoji: '🛡️', bg: '#003087' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://un.org&size=256', label: 'Liên Hợp Quốc', emoji: '🌍', bg: '#4b92db' },
          { src: 'https://flagcdn.com/w160/us.png', label: 'Mỹ - Siêu cường số 1', emoji: '🇺🇸', bg: '#3c3b6e' },
          { src: 'https://flagcdn.com/w160/ru.png', label: 'Nga', emoji: '🇷🇺', bg: '#003580' },
          { src: 'https://flagcdn.com/w160/cn.png', label: 'Trung Quốc', emoji: '🇨🇳', bg: '#DE2910' },
        ]}
      />

      <div className="card highlight">
        <h3>🎯 Bối cảnh</h3>
        <p>
          Tuy chủ nghĩa thực dân cũ đã sụp đổ, nhưng các cường quốc tư bản vẫn tiếp tục
          tranh giành phạm vi ảnh hưởng dưới những hình thức mới, tinh vi hơn.
        </p>
      </div>

      {/* Chiến lược biên giới mềm */}
      <div className="card">
        <h3>🌐 1. Chiến lược "Biên giới mềm"</h3>

        <div className="definition">
          <strong>Khái niệm:</strong> Bành trướng "biên giới kinh tế" rộng hơn biên giới địa lý,
          ràng buộc các nước kém phát triển qua sự lệ thuộc về vốn, công nghệ và chính trị.
        </div>

        <div className="dependency-chain">
          <h4>🔗 Chuỗi lệ thuộc:</h4>
          <div className="flow-diagram">
            <div className="flow-step">
              <strong>Bước 1:</strong> Lệ thuộc về VỐN
              <p className="sub-text">Vay nợ, ODA, FDI</p>
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-step">
              <strong>Bước 2:</strong> Lệ thuộc về CÔNG NGHỆ
              <p className="sub-text">Nhập máy móc, bản quyền</p>
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-step">
              <strong>Bước 3:</strong> Lệ thuộc về KINH TẾ
              <p className="sub-text">Thị trường, nguyên liệu</p>
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-step">
              <strong>Kết quả:</strong> Lệ thuộc về CHÍNH TRỊ
              <p className="sub-text">Mất chủ quyền thực chất</p>
            </div>
          </div>
        </div>

        <div className="example-box">
          <h4>📌 Ví dụ cụ thể:</h4>

          <div className="case-study">
            <strong>🇬🇷 Hy Lạp và EU:</strong>
            <ul>
              <li><strong>Khủng hoảng nợ 2009:</strong> Nợ công 180% GDP</li>
              <li><strong>Gói cứu trợ:</strong> EU-IMF cho vay $300 tỷ</li>
              <li><strong>Điều kiện:</strong>
                <ul>
                  <li>Cắt giảm lương công chức 20%</li>
                  <li>Tăng tuổi nghỉ hưu lên 67</li>
                  <li>Tư nhân hóa tài sản nhà nước</li>
                  <li>Cải cách thuế, lao động</li>
                </ul>
              </li>
              <li><strong>Kết quả:</strong> Hy Lạp mất tự chủ chính sách kinh tế, chính trị bị chi phối</li>
            </ul>
          </div>

          <div className="case-study">
            <strong>🌍 Châu Phi và Trung Quốc:</strong>
            <ul>
              <li><strong>Vành đai Con đường (BRI):</strong> TQ cho vay $200 tỷ xây hạ tầng châu Phi</li>
              <li><strong>Bẫy nợ:</strong>
                <ul>
                  <li>Sri Lanka: Không trả được nợ → phải cho TQ thuê cảng Hambantota 99 năm</li>
                  <li>Kenya: Nợ đường sắt $5 tỷ → 70% doanh thu cảng Mombasa trả nợ TQ</li>
                  <li>Zambia: Vỡ nợ → TQ kiểm soát mỏ đồng, điện lực</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="case-study">
            <strong>🇻🇪 Venezuela và các cường quốc:</strong>
            <ul>
              <li><strong>Khai thác dầu:</strong> Dự trữ lớn nhất thế giới nhưng lệ thuộc công nghệ</li>
              <li><strong>Nợ Trung Quốc:</strong> $60 tỷ → phải trả bằng dầu giá rẻ</li>
              <li><strong>Trừng phạt Mỹ:</strong> Cấm vận → kinh tế sụp đổ, siêu lạm phát 1,000,000%</li>
            </ul>
          </div>
        </div>

        <div className="method-box">
          <h4>🎭 Các thủ đoạn:</h4>
          <ul>
            <li><strong>💰 Viện trợ có điều kiện (ODA):</strong> Ràng buộc mua hàng, thuê chuyên gia từ nước viện trợ</li>
            <li><strong>🏦 Cho vay lãi cao:</strong> IMF, World Bank áp đặt điều kiện cải cách theo tư bản</li>
            <li><strong>📜 Hiệp định BIT:</strong> Bảo hộ nhà đầu tư, kiện ra tòa quốc tế</li>
            <li><strong>🎓 Đào tạo tinh hoa:</strong> Học bổng → trở về áp dụng mô hình phương Tây</li>
            <li><strong>📺 Truyền thông văn hóa:</strong> Hollywood, CNN, BBC định hình dư luận</li>
          </ul>
        </div>
      </div>

      {/* Chiến tranh thế kỷ 21 */}
      <div className="card">
        <h3>💥 2. Các hình thức Chiến tranh Mới</h3>

        <div className="war-type">
          <h4>💼 Chiến tranh Thương mại</h4>
          <div className="example-box">
            <strong>📌 Ví dụ:</strong>
            <ul>
              <li>
                <strong>Mỹ - Trung (2018-nay):</strong>
                <ul>
                  <li>Thuế quan: $360 tỷ hàng hóa</li>
                  <li>Cấm vận công nghệ: Huawei, ZTE, SMIC</li>
                  <li>Kiểm soát xuất khẩu chip 5G, AI</li>
                  <li>Tổn thất: $100 tỷ cho mỗi bên</li>
                </ul>
              </li>
              <li>
                <strong>EU - Mỹ (tranh chấp máy bay):</strong>
                <ul>
                  <li>Boeing vs Airbus</li>
                  <li>WTO phán quyết cả 2 đều trợ cấp bất hợp pháp</li>
                  <li>Thuế trả đũa: phô mai, rượu, máy bay</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="war-type">
          <h4>📱 Chiến tranh Công nghệ</h4>
          <div className="example-box">
            <strong>📌 Ví dụ:</strong>
            <ul>
              <li>
                <strong>Cuộc chiến Chip:</strong>
                <ul>
                  <li>Mỹ: Cấm bán chip tiên tiến (&lt;7nm) cho TQ</li>
                  <li>Hà Lan: Cấm ASML xuất máy EUV sang TQ</li>
                  <li>Nhật-Hàn: Hạn chế bán vật liệu bán dẫn</li>
                  <li>TQ đáp trả: Cấm xuất gallium, germanium</li>
                </ul>
              </li>
              <li>
                <strong>Mạng 5G:</strong>
                <ul>
                  <li>Mỹ vận động đồng minh tẩy chay Huawei</li>
                  <li>Lý do: an ninh quốc gia, gián điệp</li>
                  <li>30+ quốc gia cấm hoặc hạn chế Huawei</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="war-type">
          <h4>💻 Chiến tranh Mạng (Cyber War)</h4>
          <div className="example-box">
            <strong>📌 Ví dụ:</strong>
            <ul>
              <li>
                <strong>Stuxnet (2010):</strong>
                <ul>
                  <li>Mỹ-Israel tấn công hạt nhân Iran</li>
                  <li>Phá hủy 1,000 máy ly tâm uranium</li>
                </ul>
              </li>
              <li>
                <strong>SolarWinds (2020):</strong>
                <ul>
                  <li>Nghi Nga tấn công 18,000 tổ chức Mỹ</li>
                  <li>Xâm nhập: Lầu Năm Góc, Bộ Tài chính, Microsoft</li>
                </ul>
              </li>
              <li>
                <strong>Colonial Pipeline (2021):</strong>
                <ul>
                  <li>Ransomware tấn công đường ống dẫn dầu lớn nhất Mỹ</li>
                  <li>Thiệt hại: $5 triệu tiền chuộc, khủng hoảng xăng dầu</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="war-type">
          <h4>🛢️ Chiến tranh Năng lượng</h4>
          <div className="example-box">
            <strong>📌 Ví dụ:</strong>
            <ul>
              <li>
                <strong>Nord Stream (2022):</strong>
                <ul>
                  <li>Nga cắt khí đốt sang châu Âu</li>
                  <li>Giá khí tăng 10 lần</li>
                  <li>Châu Âu khủng hoảng năng lượng mùa đông</li>
                  <li>Tháng 9/2022: Nord Stream 1 & 2 bị phá hủy (bí ẩn)</li>
                </ul>
              </li>
              <li>
                <strong>OPEC+ và giá dầu:</strong>
                <ul>
                  <li>2020: Nga-Ả Rập tranh chấp → giá dầu âm $-37/thùng</li>
                  <li>2022: Cắt giảm sản lượng → giá tăng $120/thùng</li>
                  <li>Vũ khí địa chính trị đối phó phương Tây</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="war-type">
          <h4>🕌 Chiến tranh Sắc tộc - Tôn giáo</h4>
          <div className="example-box">
            <strong>📌 Ví dụ (có bóng các cường quốc):</strong>
            <ul>
              <li>
                <strong>Syria (2011-nay):</strong>
                <ul>
                  <li>Mỹ-EU hỗ trợ phe đối lập</li>
                  <li>Nga-Iran hỗ trợ chính phủ Assad</li>
                  <li>Thổ Nhĩ Kỳ, Ả Rập Saudi cũng can thiệp</li>
                  <li>Hậu quả: 500,000 người chết, 13 triệu người di tản</li>
                </ul>
              </li>
              <li>
                <strong>Yemen (2014-nay):</strong>
                <ul>
                  <li>Ả Rập Saudi (ủng hộ Mỹ) vs Iran (hỗ trợ Houthi)</li>
                  <li>Khủng hoảng nhân đạo nghiêm trọng nhất thế giới</li>
                </ul>
              </li>
              <li>
                <strong>Libya (2011):</strong>
                <ul>
                  <li>NATO can thiệp lật đổ Gaddafi</li>
                  <li>Để lại Libya chia rẽ, nội chiến kéo dài</li>
                </ul>
              </li>
              <li>
                <strong>Ukraine (2014-nay):</strong>
                <ul>
                  <li>Xung đột Nga-phương Tây</li>
                  <li>2014: Crimea, Donbass</li>
                  <li>2022: Nga tấn công toàn diện</li>
                  <li>NATO-EU hỗ trợ Ukraine $200+ tỷ</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chiến tranh lạnh mới */}
      <div className="card">
        <h3>🧊 3. Nguy cơ Chiến tranh Lạnh Mới</h3>

        <div className="tension-box">
          <h4>⚠️ Các điểm nóng:</h4>

          <div className="hotspot">
            <strong>🌏 Biển Đông:</strong>
            <ul>
              <li>Trung Quốc bồi đắp đảo nhân tạo, quân sự hóa</li>
              <li>Mỹ tuần tra "tự do hàng hải"</li>
              <li>$3.4 nghìn tỷ thương mại/năm qua đây</li>
              <li>Căng thẳng với VN, PH, MY, ID</li>
            </ul>
          </div>

          <div className="hotspot">
            <strong>🏝️ Đài Loan:</strong>
            <ul>
              <li>TQ coi là tỉnh nổi loạn, đe dọa thống nhất bằng vũ lực</li>
              <li>Mỹ cam kết bảo vệ (mơ hồ)</li>
              <li>Vai trò then chốt trong sản xuất chip (TSMC)</li>
              <li>Nguy cơ chiến tranh cao nhất kể từ 1979</li>
            </ul>
          </div>

          <div className="hotspot">
            <strong>🚀 Chạy đua Vũ trang:</strong>
            <ul>
              <li>Chi tiêu quân sự toàn cầu: $2.4 nghìn tỷ/năm (2025)</li>
              <li>Mỹ: $900 tỷ (38%)</li>
              <li>TQ: $300 tỷ (13%)</li>
              <li>Vũ khí siêu thanh, AI, không gian, lượng tử</li>
              <li>Hiệp ước kiểm soát vũ khí tan rã (INF, Open Skies...)</li>
            </ul>
          </div>

          <div className="hotspot">
            <strong>🌌 Không gian:</strong>
            <ul>
              <li>Chạy đua quân sự hóa không gian</li>
              <li>Mỹ thành lập Lực lượng Không gian (Space Force)</li>
              <li>TQ, Nga thử nghiệm vũ khí chống vệ tinh</li>
              <li>Nguy cơ chiến tranh không gian</li>
            </ul>
          </div>
        </div>

        <div className="comparison-table">
          <h4>🆚 So sánh Chiến tranh lạnh Cũ vs Mới:</h4>
          <div className="table-row header">
            <div>Chiến tranh lạnh (1947-1991)</div>
            <div>Căng thẳng hiện nay</div>
          </div>
          <div className="table-row">
            <div>Mỹ vs Liên Xô (hai cực)</div>
            <div>Mỹ vs Trung Quốc (đa cực hơn)</div>
          </div>
          <div className="table-row">
            <div>Tư bản vs Xã hội chủ nghĩa</div>
            <div>Bá quyền vs Trỗi dậy</div>
          </div>
          <div className="table-row">
            <div>Kinh tế tách biệt</div>
            <div>Kinh tế đan xen sâu</div>
          </div>
          <div className="table-row">
            <div>Chạy đua vũ trang hạt nhân</div>
            <div>Cạnh tranh công nghệ, kinh tế</div>
          </div>
          <div className="table-row">
            <div>Liên minh rõ ràng (NATO vs Warsaw)</div>
            <div>Liên minh linh hoạt hơn</div>
          </div>
        </div>
      </div>

      {/* Kết luận */}
      <div className="card highlight">
        <h3>🎓 Kết luận</h3>
        <ul className="conclusion-list">
          <li>✅ Phân chia lãnh thổ không còn bằng chiến tranh quân sự trực tiếp</li>
          <li>✅ Chuyển sang hình thức tinh vi: kinh tế, công nghệ, văn hóa, mạng</li>
          <li>✅ "Biên giới mềm" - ràng buộc gián tiếp nhưng hiệu quả hơn</li>
          <li>✅ Các cường quốc vẫn tranh giành ảnh hưởng quyết liệt</li>
          <li>✅ Nước đang phát triển cần cảnh giác, bảo vệ chủ quyền thực chất</li>
          <li>✅ Nguy cơ chiến tranh lạnh mới và xung đột vũ trang vẫn hiện hữu</li>
        </ul>
      </div>
    </div>
  )
}

// Nhân sự Section
function NhanSuSection() {
  return (
    <div className="section">
      <h2>🏛️ Cơ chế Quan hệ Nhân sự</h2>

      <ImageGallery
        title="🔄 Ví dụ Revolving Door - Cửa quay nhân sự"
        items={[
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://jpmorgan.com&size=256', label: 'JPMorgan ↔ FED', emoji: '🏦', bg: '#003087' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://goldmansachs.com&size=256', label: 'Goldman Sachs ↔ Nhà nước', emoji: '🏦', bg: '#5a6c8c' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://microsoft.com&size=256', label: 'Microsoft ↔ Sáng kiến công', emoji: '💻', bg: '#00BCF2' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://federalreserve.gov&size=256', label: 'Cục Dự trữ Liên bang', emoji: '🧱', bg: '#1B395E' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://blackrock.com&size=256', label: 'BlackRock ↔ Chính phủ', emoji: '🏛️', bg: '#1a1a2e' },
        ]}
      />

      <div className="card highlight">
        <h3>🎯 Biểu hiện mới về cơ chế quan hệ nhân sự</h3>
        <p>
          Sự phát triển của trình độ dân trí và quy luật cạnh tranh trong xã hội tư bản
          ngày nay dẫn đến sự thay đổi về quan hệ nhân sự trong bộ máy chính quyền nhà nước.
        </p>
      </div>

      <div className="card">
        <h3>⚖️ Thể chế Đa nguyên</h3>

        <div className="definition">
          <strong>Thể chế đa nguyên trong phân chia quyền lực nhà nước trở thành phổ biến</strong>
        </div>

        <div className="mechanism-box">
          <h4>🔄 Cơ chế thỏa hiệp:</h4>
          <p>
            Tại các nước tư bản phát triển nhất xuất hiện cơ chế thỏa hiệp để cùng tồn tại,
            cùng phân chia quyền lực giữa các thế lực tư bản độc quyền.
          </p>
          <ul>
            <li>Không cho phép bất kỳ một thế lực tư bản nào độc tôn, chuyên quyền</li>
            <li>Phân chia quyền lực theo cơ chế tam quyền phân lập</li>
            <li>Cân bằng lợi ích giữa các nhóm độc quyền</li>
          </ul>
        </div>

        <div className="example-box">
          <h4>📌 Ví dụ điển hình:</h4>
          <ul>
            <li>
              <strong>Mỹ:</strong>
              <ul>
                <li>Đảng Dân chủ vs Đảng Cộng hòa luân phiên nắm quyền</li>
                <li>Đại diện cho các nhóm lợi ích tư bản khác nhau</li>
                <li>Dân chủ: công nghiệp công nghệ, phía Tây</li>
                <li>Cộng hòa: năng lượng hóa thạch, quân sự, phía Nam</li>
              </ul>
            </li>
            <li>
              <strong>Đức:</strong>
              <ul>
                <li>Liên minh CDU/CSU vs SPD thường phải lập chính phủ liên minh</li>
                <li>Phản ánh sự cân bằng giữa các tập đoàn công nghiệp lớn</li>
              </ul>
            </li>
            <li>
              <strong>Pháp:</strong>
              <ul>
                <li>Tổng thống và Thủ tướng có thể thuộc phe khác nhau</li>
                <li>"Cohabitation" - chung sống chính trị</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>🎭 Thế lực Trung dung</h3>

        <div className="reason-box">
          <h4>🔑 Vai trò cân bằng:</h4>
          <p>
            Trong không ít trường hợp, trọng tâm quyền lực nhà nước lại thuộc về một thế lực
            trung dung có vị thế cân bằng giữa các thế lực đối địch nhau.
          </p>
        </div>

        <div className="example-box">
          <h4>📌 Ví dụ:</h4>
          <ul>
            <li>
              <strong>Thụy Điển, Na Uy, Đan Mạch:</strong>
              <ul>
                <li>Đảng Dân chủ Xã hội nắm quyền lâu dài</li>
                <li>Cân bằng giữa lợi ích tư bản và công nhân</li>
                <li>Tạo ra mô hình phúc lợi xã hội Bắc Âu</li>
              </ul>
            </li>
            <li>
              <strong>Canada:</strong>
              <ul>
                <li>NDP (New Democratic Party) đóng vai trò cân bằng</li>
                <li>Ảnh hưởng chính sách dù không nắm quyền</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="trend-box">
          <h4>📈 Kết quả:</h4>
          <ul>
            <li>✅ Thể chế kinh tế, chính trị, xã hội ôn hòa hơn</li>
            <li>✅ Ít cực đoan hơn so với những thời kỳ trước</li>
            <li>✅ Giảm bớt xung đột giai cấp trực diện</li>
            <li>✅ Tạo ảo tưởng về dân chủ tư sản</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>⚠️ Bản chất giai cấp vẫn tồn tại</h3>

        <div className="competition-box">
          <h4>🚨 Thực chất:</h4>
          <p>
            Dù có thể chế đa nguyên, bản chất nhà nước tư sản vẫn là công cụ của giai cấp
            tư sản độc quyền. Khi quyền lực bị đe dọa, bộ mặt dân chủ sẽ bị lột trần.
          </p>
        </div>

        <div className="example-box">
          <h4>📌 Ví dụ lịch sử:</h4>
          <ul>
            <li>
              <strong>Chile (1973):</strong>
              <ul>
                <li>Tổng thống Salvador Allende đắc cử dân chủ</li>
                <li>Thực hiện cải cách xã hội chủ nghĩa</li>
                <li>CIA + quân đội Chile đảo chính</li>
                <li>Độc tài Pinochet: 3,000 người chết, 40,000 bị tra tấn</li>
              </ul>
            </li>
            <li>
              <strong>Nga (1993):</strong>
              <ul>
                <li>Yeltsin ra lệnh pháo kích Nghị viện (White House)</li>
                <li>Khi Quốc hội không chấp nhận tư nhân hóa cực đoan</li>
                <li>Hàng trăm người chết</li>
              </ul>
            </li>
            <li>
              <strong>Thái Lan (2006, 2014):</strong>
              <ul>
                <li>Đảo chính quân sự lật đổ chính phủ dân cử</li>
                <li>Bảo vệ lợi ích tầng lớp quý tộc-quân đội-tư bản</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Sở hữu NN Section
function SoHuuNNSection() {
  return (
    <div className="section">
      <h2>💰 Sở hữu Nhà nước</h2>

      <ImageGallery
        title="🏦 Các tổ chức Nhà nước nắm giữ kinh tế"
        items={[
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://temasek.com.sg&size=256', label: 'Temasek (Singapore)', emoji: '🇸🇬', bg: '#e30613' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://federalreserve.gov&size=256', label: 'FED (Mỹ)', emoji: '🇺🇸', bg: '#1B395E' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://imf.org&size=256', label: 'IMF', emoji: '🌐', bg: '#1a3660' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://worldbank.org&size=256', label: 'World Bank', emoji: '🏦', bg: '#009FDA' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ecb.europa.eu&size=256', label: 'ECB (Châu Âu)', emoji: '🇪🇺', bg: '#003299' },
        ]}
      />

      <div className="card">
        <h3>🏦 Quản lý Ngân sách Nhà nước</h3>

        <div className="mechanism-box">
          <h4>⚖️ Cơ chế kiểm soát:</h4>
          <ul>
            <li><strong>Chi tiêu ngân sách:</strong> Thuộc quyền của giới lập pháp</li>
            <li><strong>Giới hành pháp:</strong> Bị giới hạn, quản lý chặt chẽ bằng luật</li>
            <li><strong>Ưu tiên:</strong> Chống lạm phát và chống thất nghiệp</li>
            <li><strong>Dự trữ quốc gia:</strong> Chỉ sử dụng trong tình huống đặc biệt</li>
          </ul>
        </div>

        <div className="example-box">
          <h4>📌 Ví dụ:</h4>
          <ul>
            <li>
              <strong>Na Uy:</strong>
              <ul>
                <li>Government Pension Fund: $1.4 nghìn tỷ (lớn nhất thế giới)</li>
                <li>Từ dầu khí, đầu tư ra nước ngoài</li>
                <li>Chỉ được chi tối đa 3% lợi nhuận hàng năm</li>
              </ul>
            </li>
            <li>
              <strong>Singapore:</strong>
              <ul>
                <li>GIC và Temasek: quản lý $1 nghìn tỷ</li>
                <li>Đầu tư toàn cầu, tạo thu nhập cho ngân sách</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>📊 Cổ phần Nhà nước</h3>

        <div className="definition">
          Cổ phần của nhà nước trong các ngân hàng và công ty lớn trở thành phổ biến
        </div>

        <div className="example-box">
          <h4>📌 Các quốc gia có cổ phần nhà nước cao:</h4>
          <ul>
            <li>
              <strong>Trung Quốc:</strong>
              <ul>
                <li>4 ngân hàng lớn nhất: nhà nước nắm 60-70%</li>
                <li>PetroChina, Sinopec: nhà nước chi phối</li>
                <li>149/151 công ty top Fortune Global 500 có vốn nhà nước</li>
              </ul>
            </li>
            <li>
              <strong>Pháp:</strong>
              <ul>
                <li>EDF (điện lực): nhà nước 83.6%</li>
                <li>Renault: nhà nước 15%</li>
                <li>Air France-KLM: nhà nước 14%</li>
              </ul>
            </li>
            <li>
              <strong>Đức:</strong>
              <ul>
                <li>Deutsche Bahn (đường sắt): 100% nhà nước</li>
                <li>Deutsche Post, Deutsche Telekom: nhà nước có cổ phần</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>🏗️ Đầu tư Hạ tầng và Khoa học</h3>

        <div className="reason-box">
          <h4>🔑 Vai trò của nhà nước:</h4>
          <p>
            Vai trò của đầu tư nhà nước để khắc phục những chi phí tốn kém trong nghiên cứu
            khoa học cơ bản, trong xây dựng kết cấu hạ tầng và giải quyết các nhu cầu mang
            tính xã hội ngày càng tăng lên.
          </p>
        </div>

        <div className="method-box">
          <h4>🎯 Phân công lao động:</h4>
          <ul>
            <li><strong>Nhà nước:</strong> Tạo cơ sở vật chất, gánh chịu rủi ro lớn</li>
            <li><strong>Tư nhân:</strong> Tập trung vào lĩnh vực có lợi nhuận hấp dẫn</li>
          </ul>
        </div>

        <div className="example-box">
          <h4>📌 Ví dụ cụ thể:</h4>
          <ul>
            <li>
              <strong>Internet:</strong>
              <ul>
                <li>Nguồn gốc: ARPANET - dự án quân sự Mỹ (1960s)</li>
                <li>Nhà nước bỏ tiền nghiên cứu cơ bản</li>
                <li>Tư nhân sau đó khai thác thương mại (Google, Facebook...)</li>
              </ul>
            </li>
            <li>
              <strong>GPS:</strong>
              <ul>
                <li>Lầu Năm Góc đầu tư $12 tỷ phát triển</li>
                <li>Miễn phí cho dân dụng</li>
                <li>Tư nhân kiếm tỷ USD từ ứng dụng GPS</li>
              </ul>
            </li>
            <li>
              <strong>Vaccine COVID-19:</strong>
              <ul>
                <li>Chính phủ Mỹ, EU bỏ hàng chục tỷ USD nghiên cứu</li>
                <li>Pfizer, Moderna thu lợi nhuận khổng lồ</li>
              </ul>
            </li>
            <li>
              <strong>Hạ tầng giao thông:</strong>
              <ul>
                <li>Trung Quốc đầu tư $1.5 nghìn tỷ vào đường sắt cao tốc</li>
                <li>Tạo điều kiện cho logistics, thương mại phát triển</li>
                <li>Tư nhân hưởng lợi từ hạ tầng hiện đại</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>💸 Giải cứu Tập đoàn lớn</h3>

        <div className="definition">
          Trong khủng hoảng kinh tế, ngân sách nhà nước được dùng để cứu những tập đoàn lớn
          khỏi nguy cơ phá sản: "Tư hữu hóa lợi nhuận, xã hội hóa thua lỗ"
        </div>

        <div className="case-study">
          <strong>🏦 Khủng hoảng Tài chính 2008-2009:</strong>
          <ul>
            <li>
              <strong>Citigroup (Mỹ):</strong>
              <ul>
                <li>Chính phủ Mỹ bơm $45 tỷ</li>
                <li>Bảo lãnh $301 tỷ tài sản độc hại</li>
                <li>Nâng cổ phần lên 36%</li>
                <li>Lý do: "Too big to fail" (quá lớn không thể để phá sản)</li>
              </ul>
            </li>
            <li>
              <strong>AIG (Mỹ):</strong>
              <ul>
                <li>Giải cứu 2 lần: tổng $150 tỷ</li>
                <li>Chính phủ kiểm soát 80% cổ phần</li>
                <li>CEO vẫn nhận bonus hàng triệu USD gây phẫn nộ</li>
              </ul>
            </li>
            <li>
              <strong>General Motors (Mỹ):</strong>
              <ul>
                <li>Phá sản 2009, nhà nước bơm $50 tỷ</li>
                <li>Tái cơ cấu, giảm 40% công nhân</li>
                <li>Nhà nước bán lại cổ phiếu 2013: lỗ $10 tỷ</li>
              </ul>
            </li>
            <li>
              <strong>Royal Bank of Scotland (Anh):</strong>
              <ul>
                <li>Chính phủ Anh bơm $145 tỷ</li>
                <li>Nắm 82% cổ phần</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="significance-box">
          <h4>💡 Ý nghĩa:</h4>
          <ul>
            <li>⚠️ Lợi nhuận về túi tư bản, lỗ thì dân chịu (qua thuế)</li>
            <li>⚠️ Củng cố độc quyền, loại bỏ đối thủ nhỏ</li>
            <li>⚠️ Tăng nợ công, cắt giảm phúc lợi xã hội sau đó</li>
            <li>⚠️ Bất bình đẳng gia tăng</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>🌱 Chi tiêu Xã hội</h3>

        <div className="definition">
          Tại một số nước, định hướng ưu tiên cho các vấn đề xã hội trong chi tiêu ngân sách
          nhà nước được luật pháp hóa
        </div>

        <div className="example-box">
          <h4>📌 Ví dụ điển hình:</h4>
          <ul>
            <li>
              <strong>Na Uy:</strong>
              <ul>
                <li>Giáo dục miễn phí toàn dân (kể cả đại học)</li>
                <li>Y tế miễn phí toàn dân</li>
                <li>Trợ cấp thất nghiệp lên đến 62% lương cũ</li>
                <li>Nghỉ thai sản 49 tuần 100% lương</li>
              </ul>
            </li>
            <li>
              <strong>Thụy Điển:</strong>
              <ul>
                <li>Chi cho phúc lợi xã hội: 26% GDP</li>
                <li>Giáo dục, y tế miễn phí</li>
                <li>Lương hưu cơ bản cho mọi công dân</li>
              </ul>
            </li>
            <li>
              <strong>Đan Mạch:</strong>
              <ul>
                <li>Đất nước hạnh phúc nhất thế giới</li>
                <li>Phúc lợi xã hội từ nôi đến mồ</li>
                <li>Trợ cấp sinh viên $1,000/tháng</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="competition-box">
          <h4>⚠️ Bản chất:</h4>
          <p>
            <strong>Không phải do giai cấp tư sản "nhân đạo hóa"!</strong>
          </p>
          <ul>
            <li>✊ Kết quả đấu tranh bền bỉ của giai cấp công nhân</li>
            <li>✊ Ảnh hưởng của Cách mạng Tháng Mười Nga</li>
            <li>✊ Sức ép của phong trào công nhân mạnh mẽ</li>
            <li>✊ "Những sự chuẩn bị vật chất của chủ nghĩa xã hội"</li>
            <li>⚠️ Đang bị cắt giảm dần do khủng hoảng nợ công</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Điều tiết Section
function DieuTietSection() {
  return (
    <div className="section">
      <h2>🎛️ Vai trò Công cụ Điều tiết Kinh tế</h2>

      <ImageGallery
        title="🌐 Các tổ chức Điều tiết Kinh tế Toàn cầu"
        items={[
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://imf.org&size=256', label: 'IMF - Tiền tệ Quốc tế', emoji: '🌐', bg: '#1a3660' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://worldbank.org&size=256', label: 'World Bank', emoji: '🏦', bg: '#009FDA' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://wto.org&size=256', label: 'WTO', emoji: '🛢️', bg: '#1a356e' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://federalreserve.gov&size=256', label: 'FED', emoji: '🇺🇸', bg: '#1B395E' },
          { src: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ecb.europa.eu&size=256', label: 'ECB', emoji: '🇪🇺', bg: '#003299' },
        ]}
      />

      <div className="card">
        <h3>⚙️ Công cụ Điều tiết Vĩ mô</h3>

        <div className="definition">
          Nhà nước tư sản hiện đại là nhân tố quyết định sự ổn định kinh tế vĩ mô
        </div>

        <div className="method-box">
          <h4>🛠️ Các công cụ:</h4>
          <ul>
            <li><strong>Thu - chi ngân sách:</strong> Chính sách tài khóa mở rộng/thắt chặt</li>
            <li><strong>Kiểm soát lãi suất:</strong> FED, ECB, BoJ điều chỉnh lãi suất</li>
            <li><strong>Trợ cấp và trợ giá:</strong> Hỗ trợ ngành, doanh nghiệp chiến lược</li>
            <li><strong>Kiểm soát tỷ giá:</strong> Can thiệp thị trường ngoại hối</li>
            <li><strong>Mua sắm công:</strong> Đơn hàng chính phủ, hợp đồng quốc phòng</li>
            <li><strong>Nới lỏng định lượng (QE):</strong> In tiền mua trái phiếu</li>
          </ul>
        </div>

        <div className="example-box">
          <h4>📌 Ví dụ gần đây:</h4>
          <ul>
            <li>
              <strong>COVID-19 (2020-2021):</strong>
              <ul>
                <li>Mỹ: $5 nghìn tỷ gói kích thích</li>
                <li>EU: €750 tỷ gói phục hồi</li>
                <li>Nhật: ¥117 nghìn tỷ ($1.1 nghìn tỷ)</li>
                <li>In tiền, trợ cấp, vay lãi suất 0%</li>
              </ul>
            </li>
            <li>
              <strong>Khủng hoảng 2008:</strong>
              <ul>
                <li>FED hạ lãi suất xuống gần 0%</li>
                <li>QE1, QE2, QE3: mua $4.5 nghìn tỷ tài sản</li>
                <li>Cứu ngân hàng, kích thích kinh tế</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>🏛️ "Đa nguyên Tư sản"</h3>

        <div className="mechanism-box">
          <h4>🎭 Bản chất:</h4>
          <p>
            Về chính trị, các chính phủ, nghị viện tư sản hiện đại cũng được tổ chức như
            một công ty cổ phần tư bản chủ nghĩa.
          </p>
        </div>

        <div className="reason-box">
          <h4>🔑 Vai trò của đa đảng:</h4>
          <ul>
            <li><strong>Cho phép tham gia:</strong> Đảng đối lập, cả đảng cộng sản được phép</li>
            <li><strong>Giới hạn:</strong> Chỉ ở mức độ chưa đe dọa quyền lực giai cấp tư sản</li>
            <li><strong>Mục đích:</strong> Làm dịu làn sóng đấu tranh của nhân dân</li>
            <li><strong>Hiệu quả:</strong> Suy yếu sức mạnh của lực lượng đối lập</li>
          </ul>
        </div>

        <div className="case-study">
          <strong>📌 Ví dụ:</strong>
          <ul>
            <li>
              <strong>Ý, Pháp, Tây Ban Nha:</strong>
              <ul>
                <li>Đảng Cộng sản được phép hoạt động</li>
                <li>Tham gia bầu cử, có ghế trong nghị viện</li>
                <li>Nhưng không đủ ghế để thay đổi bản chất hệ thống</li>
              </ul>
            </li>
            <li>
              <strong>Hy Lạp (2015):</strong>
              <ul>
                <li>Syriza (tả cánh) thắng cử</li>
                <li>Hứa từ chối chính sách thắt lưng buộc bụng</li>
                <li>Bị EU ép buộc, cuối cùng đầu hàng</li>
                <li>Thực hiện chính sách cũ, mất dân tín</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="competition-box">
          <h4>⚠️ Khi quyền lực bị đe dọa:</h4>
          <p>
            Nếu xuất hiện nguy cơ bị mất quyền chi phối thì ngay lập tức sẽ:
          </p>
          <ul>
            <li>🚫 Giải tán chính phủ, quốc hội</li>
            <li>🚫 Thiết quân luật</li>
            <li>🚫 Tình trạng khẩn cấp</li>
            <li>🚫 Đảo chính quân sự</li>
          </ul>
        </div>

        <div className="example-box">
          <h4>📌 Lịch sử đã chứng minh:</h4>
          <ul>
            <li><strong>Chile (1973):</strong> Đảo chính khi Allende xã hội hóa kinh tế</li>
            <li><strong>Nga (1993):</strong> Yeltsin pháo kích Quốc hội</li>
            <li><strong>Ukraina (2014):</strong> Maidan - lật đổ chính phủ thân Nga</li>
            <li><strong>Venezuela (2019):</strong> Mỹ công nhận Guaidó "tổng thống lâm thời"</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>🌍 Viện trợ Nước ngoài</h3>

        <div className="definition">
          Viện trợ cho nước ngoài của chính phủ trở thành một bộ phận của điều tiết kinh tế trong nước
        </div>

        <div className="mechanism-box">
          <h4>🔄 Cơ chế hoạt động:</h4>
          <div className="flow-diagram">
            <div className="flow-step">
              <strong>Bước 1:</strong> Chính phủ công bố gói viện trợ
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-step">
              <strong>Bước 2:</strong> Đấu thầu "giới hạn" cho DN trong nước
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-step">
              <strong>Bước 3:</strong> Tập đoàn độc quyền thắng thầu
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-step">
              <strong>Kết quả:</strong> Lợi nhuận khổng lồ từ tiền thuế
            </div>
          </div>
        </div>

        <div className="reason-box">
          <h4>🎯 Lợi ích cho tập đoàn:</h4>
          <ul>
            <li>Cơ hội lớn mà không có tập đoàn độc quyền nào không quan tâm</li>
            <li>Phương thuốc cứu nguy khi hàng hóa tồn đọng</li>
            <li>Giải quyết công nghệ lỗi thời</li>
            <li>Nâng giá cổ phiếu khi có hợp đồng chính phủ</li>
          </ul>
        </div>

        <div className="case-study">
          <strong>📌 Thực tế viện trợ song phương:</strong>
          <ul>
            <li>
              <strong>Nước tiếp nhận chỉ được:</strong>
              <ul>
                <li>10-20% bằng ngoại tệ (tiền mặt)</li>
                <li>80-90% bằng hàng hóa, thiết bị, chuyên gia từ nước viện trợ</li>
              </ul>
            </li>
            <li>
              <strong>Ví dụ:</strong>
              <ul>
                <li>Mỹ viện trợ $1 tỷ cho châu Phi</li>
                <li>→ Phải mua lương thực Mỹ (giá cao hơn thị trường)</li>
                <li>→ Phải thuê tư vấn, chuyên gia Mỹ</li>
                <li>→ Thực tế chỉ nhận được $300 triệu giá trị</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="example-box">
          <h4>📌 Các hình thức "viện trợ":</h4>
          <ul>
            <li>
              <strong>USAID (Mỹ):</strong>
              <ul>
                <li>Ngân sách $50 tỷ/năm</li>
                <li>95% hợp đồng cho DN Mỹ</li>
                <li>Gắn với mục tiêu chính trị</li>
              </ul>
            </li>
            <li>
              <strong>JICA (Nhật):</strong>
              <ul>
                <li>Viện trợ ODA lớn nhất châu Á</li>
                <li>Ưu tiên dự án hạ tầng lớn</li>
                <li>Nhà thầu Nhật thắng hầu hết đấu thầu</li>
              </ul>
            </li>
            <li>
              <strong>Vành đai Con đường (TQ):</strong>
              <ul>
                <li>Cho vay $1 nghìn tỷ</li>
                <li>Nhà thầu TQ, công nhân TQ, vật liệu TQ</li>
                <li>Nước vay rơi vào bẫy nợ</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="card highlight">
        <h3>🎓 Kết luận về Độc quyền Nhà nước</h3>
        <ul className="conclusion-list">
          <li>✅ Độc quyền nhà nước là bộ mặt mới của CNTB độc quyền</li>
          <li>✅ Nhà nước là công cụ của giai cấp tư sản độc quyền</li>
          <li>✅ "Đa nguyên tư sản" là chiêu bài che đậy độc tài giai cấp</li>
          <li>✅ Ngân sách nhà nước phục vụ lợi ích tư bản độc quyền</li>
          <li>✅ Giải cứu tập đoàn = xã hội hóa thua lỗ, tư hữu hóa lợi nhuận</li>
          <li>✅ Phúc lợi xã hội là kết quả đấu tranh, không phải "nhân đạo"</li>
          <li>✅ Viện trợ nước ngoài = công cụ bành trướng của tư bản độc quyền</li>
          <li>⚠️ Khi quyền lực bị đe dọa → bạo lực nhà nước bộc lộ</li>
        </ul>
      </div>
    </div>
  )
}

// ── DataChartsModal ──────────────────────────────────
function DataChartsModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    globalThis.addEventListener('keydown', onKey)
    return () => globalThis.removeEventListener('keydown', onKey)
  }, [onClose])

  const fdiData = {
    labels: ['Bắc Mỹ', 'Châu Âu', 'Đông Á', 'Trung Quốc', 'Mỹ Latinh', 'Châu Phi'],
    datasets: [{
      label: 'FDI 2023 (tỷ USD)',
      data: [450, 380, 310, 180, 95, 48],
      backgroundColor: ['#1565c0', '#0f766e', '#9333ea', '#b45309', '#0369a1', '#b91c1c'],
      borderRadius: 8,
      borderSkipped: false,
    }],
  }

  const opecData = {
    labels: ['OPEC (Saudi, UAE, Iraq…)', 'Nga', 'Mỹ', 'Canada', 'Khác'],
    datasets: [{
      data: [35, 14, 22, 6, 23],
      backgroundColor: ['#f59e0b', '#ef4444', '#1565c0', '#0f766e', '#94a3b8'],
      borderWidth: 3,
      borderColor: 'white',
    }],
  }

  const statsData = [
    { num: '$13.5T', label: 'Tổng FDI toàn cầu', sub: 'năm 2023', color: '#1565c0' },
    { num: '30,000+', label: 'Công ty xuyên quốc gia', sub: 'TNCs hiện nay', color: '#0f766e' },
    { num: '$10T', label: 'AUM BlackRock', sub: 'quản lý tài sản', color: '#9333ea' },
    { num: '80%', label: 'GPU AI (NVIDIA)', sub: 'độc quyền chip AI', color: '#b45309' },
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box charts-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #1565c0 0%, #0d1b2a 100%)' }}>
          <div className="modal-header-left">
            <span className="modal-icon" style={{ background: '#dbeafe' }}>📊</span>
            <span className="modal-title">Biểu đồ dữ liệu kinh tế thực tế</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>
        <div className="modal-body charts-body">

          <div className="chart-card">
            <h3 className="chart-title">🌍 Dòng chảy FDI toàn cầu 2023</h3>
            <p className="chart-sub">Đầu tư trực tiếp nước ngoài theo khu vực (tỷ USD)</p>
            <div className="chart-wrap">
              <Bar data={fdiData} options={{
                responsive: true, maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y} tỷ USD` } },
                },
                scales: {
                  y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } },
                  x: { grid: { display: false }, ticks: { font: { size: 11 } } },
                },
              }} />
            </div>
            <p className="chart-note">📌 70% FDI luân chuyển giữa các nước phát triển — minh chứng "Xuất khẩu tư bản" kiểu mới</p>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">🛢️ Thị phần sản xuất dầu mỏ thế giới 2024</h3>
            <p className="chart-sub">Phân chia độc quyền thị trường năng lượng (%)</p>
            <div className="chart-wrap doughnut-wrap">
              <Doughnut data={opecData} options={{
                responsive: true, maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'right', labels: { boxWidth: 14, padding: 12, font: { size: 11 } } },
                  tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } },
                },
                cutout: '58%',
              }} />
            </div>
            <p className="chart-note">📌 OPEC kiểm soát 35% sản lượng dầu thế giới — "Phân chia thị trường thế giới" điển hình</p>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">💡 Số liệu nổi bật 2024</h3>
            <div className="stat-cards">
              {statsData.map(s => (
                <div key={s.label} className="stat-card" style={{ '--sc': s.color }}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Timeline ─────────────────────────────────────────
const TIMELINE_EVENTS = [
  { year: '1860s–1880s', title: 'Tích lũy ban đầu & CN lần 2', desc: 'Cách mạng công nghiệp lần 2: thép, điện, hóa chất. John D. Rockefeller thành lập Standard Oil (1870) — tập đoàn độc quyền đầu tiên kiểm soát 90% lọc dầu Mỹ.', icon: '⚙️', color: '#1565c0' },
  { year: '1890–1914', title: 'Đế quốc chủ nghĩa', desc: 'Lenin viết "Chủ nghĩa Đế quốc": tư bản tài chính, xuất khẩu tư bản, phân chia thế giới. Các Cartel quốc tế phân chia thị trường. Chiến tranh thế giới I do mâu thuẫn tái phân chia.', icon: '🌍', color: '#b91c1c' },
  { year: '1929–1939', title: 'Đại khủng hoảng & New Deal', desc: 'Thị trường chứng khoán sụp đổ 1929. Roosevelt: New Deal — nhà nước can thiệp mạnh, điển hình độc quyền nhà nước. Quốc hữu hóa hàng loạt, tỷ lệ thất nghiệp 25%.', icon: '📉', color: '#9333ea' },
  { year: '1945–1970', title: 'Chiến tranh Lạnh & Tái thiết', desc: 'Kế hoạch Marshall: Mỹ xuất khẩu $13 tỷ tư bản sang Châu Âu. Hình thành IMF, World Bank, GATT. Mỹ - Liên Xô phân chia phạm vi ảnh hưởng toàn cầu.', icon: '🌐', color: '#0f766e' },
  { year: '1970s', title: 'Khủng hoảng dầu mỏ & OPEC', desc: '1973: OPEC cấm vận dầu mỏ, giá tăng 400%. Ví dụ điển hình phân chia thị trường. Stagflation — lạm phát + thất nghiệp đồng thời, nhà nước mất kiểm soát.', icon: '🛢️', color: '#b45309' },
  { year: '1980–1990s', title: 'Toàn cầu hóa & Tư nhân hóa', desc: 'Reagan, Thatcher: tư nhân hóa ồ ạt, bãi bỏ quy định tài chính. WTO thay GATT (1995). Liên Xô tan rã — tư bản độc quyền mở rộng toàn cầu không cản trở.', icon: '🏦', color: '#0369a1' },
  { year: '2000–2007', title: 'Dotcom & Tổ hợp quân sự', desc: 'Bong bóng dot-com vỡ 2001. Sau 9/11: Mỹ chi $2 nghìn tỷ chiến tranh Iraq/Afghanistan — lợi ích tổ hợp công nghiệp-quân sự (Raytheon, Lockheed). Trung Quốc gia nhập WTO 2001.', icon: '💻', color: '#1d4ed8' },
  { year: '2008–2009', title: 'Khủng hoảng tài chính toàn cầu', desc: 'Lehman Brothers phá sản. Mỹ bơm $700 tỷ cứu trợ ("Xã hội hóa thua lỗ"). FED QE: in $3.5 nghìn tỷ. Điển hình độc quyền nhà nước cứu tư bản tài chính.', icon: '📊', color: '#dc2626' },
  { year: '2020s', title: 'Big Tech & AI Monopoly', desc: 'Apple + Microsoft + Google + Amazon + Meta = 25% S&P 500. NVIDIA độc quyền chip AI >80%. ChatGPT, Gemini — tư bản tài chính kỹ thuật số. China vs US Tech War.', icon: '🤖', color: '#6d28d9' },
]

function TimelineModal({ onClose }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    globalThis.addEventListener('keydown', onKey)
    return () => globalThis.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box timeline-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)' }}>
          <div className="modal-header-left">
            <span className="modal-icon" style={{ background: '#fde68a' }}>⏳</span>
            <span className="modal-title">Timeline lịch sử Độc quyền Tư bản</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>
        <div className="modal-body timeline-body">
          <p className="tl-hint">Nhấn vào mốc thời gian để xem chi tiết</p>
          <div className="timeline">
            {TIMELINE_EVENTS.map((ev, i) => (
              <div
                key={ev.year}
                className={`tl-item${active === i ? ' active' : ''}`}
                onClick={() => setActive(active === i ? null : i)}
              >
                <div className="tl-dot" style={{ background: ev.color }}>
                  <span>{ev.icon}</span>
                </div>
                <div className="tl-content">
                  <div className="tl-year" style={{ color: ev.color }}>{ev.year}</div>
                  <div className="tl-title">{ev.title}</div>
                  {active === i && <div className="tl-desc">{ev.desc}</div>}
                </div>
                <div className="tl-chevron">{active === i ? '▲' : '▼'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Flashcards ───────────────────────────────────────
const FLASHCARDS = [
  { term: 'Độc quyền', def: 'Liên minh giữa các doanh nghiệp lớn nắm phần lớn sản xuất và tiêu thụ, có khả năng định giá độc quyền nhằm thu lợi nhuận siêu ngạch.', example: '🏭 VD: NVIDIA nắm >80% thị phần GPU AI', color: '#1565c0' },
  { term: 'Tư bản Tài chính', def: 'Tư bản hình thành từ sự dung hợp giữa tư bản ngân hàng độc quyền và tư bản công nghiệp độc quyền, nắm trong tay các nhà tư bản tài chính.', example: '🏦 VD: BlackRock ($10T AUM), JPMorgan Chase', color: '#9333ea' },
  { term: 'Đầu sỏ Tài chính', def: 'Tầng lớp nhà tư sản tài chính nắm quyền thống trị kinh tế-chính trị thông qua tư bản tài chính và cơ chế tham dự.', example: '👑 VD: Warren Buffett, Larry Fink (BlackRock CEO)', color: '#b45309' },
  { term: 'Cơ chế Tham dự', def: 'Công ty mẹ nắm cổ phần chi phối công ty con, công ty con nắm cổ phần công ty cháu theo dây chuyền — kiểm soát tài sản khổng lồ với ít vốn ban đầu.', example: '🏗️ VD: Berkshire Hathaway kiểm soát 60+ công ty', color: '#0f766e' },
  { term: 'Concern', def: 'Hình thức tổ chức độc quyền kết hợp nhiều doanh nghiệp thuộc nhiều ngành kinh doanh khác nhau dưới sự kiểm soát tài chính của một tập đoàn lớn.', example: '🏢 VD: Samsung, LG, General Electric', color: '#0369a1' },
  { term: 'Conglomerate', def: 'Tập đoàn đa dạng hóa hoạt động sang các lĩnh vực hoàn toàn không liên quan, nhằm giảm rủi ro và tận dụng sức mạnh tài chính tổng hợp.', example: '📦 VD: Berkshire Hathaway (bảo hiểm + đường sắt + ngân hàng)', color: '#b91c1c' },
  { term: 'Xuất khẩu Tư bản', def: 'Đưa tư bản ra nước ngoài để sản xuất và thu giá trị thặng dư tại nước nhận đầu tư — khác với xuất khẩu hàng hóa thông thường.', example: '🌍 VD: Apple đặt nhà máy tại Trung Quốc, Ấn Độ, Việt Nam', color: '#047857' },
  { term: 'Revolving Door', def: '"Cửa quay" — cơ chế luân chuyển nhân sự giữa tập đoàn tư nhân và bộ máy nhà nước, đảm bảo lợi ích tư bản độc quyền được bảo vệ từ bên trong nhà nước.', example: '🔄 VD: Bộ trưởng Tài chính Mỹ ← cựu CEO Goldman Sachs', color: '#1d4ed8' },
  { term: 'Lợi nhuận Độc quyền', def: 'Lợi nhuận siêu ngạch thu được nhờ vị thế thống trị thị trường, vượt xa lợi nhuận bình quân trong cạnh tranh tự do.', example: '💰 VD: Apple biên LN 25–30% (TB ngành 5–8%)', color: '#b45309' },
  { term: 'Quốc hữu hóa', def: 'Nhà nước tiếp nhận quyền sở hữu doanh nghiệp tư nhân — thường trong khủng hoảng để cứu trợ — rồi tư nhân hóa khi ổn định (xã hội hóa thua lỗ, tư hữu hóa lợi nhuận).', example: '🏛️ VD: Mỹ cứu AIG & GM năm 2008–2009', color: '#6d28d9' },
]

function FlashcardsModal({ onClose }) {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const total = FLASHCARDS.length
  const card = FLASHCARDS[current]

  const next = () => { setCurrent(c => (c + 1) % total); setFlipped(false) }
  const prev = () => { setCurrent(c => (c - 1 + total) % total); setFlipped(false) }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === ' ') { e.preventDefault(); setFlipped(f => !f) }
    }
    globalThis.addEventListener('keydown', onKey)
    return () => globalThis.removeEventListener('keydown', onKey)
  }, [onClose, current])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box fc-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: `linear-gradient(135deg, ${card.color} 0%, #0d1b2a 100%)` }}>
          <div className="modal-header-left">
            <span className="modal-icon" style={{ background: '#fde68a' }}>🃏</span>
            <span className="modal-title">Flashcard — Thuật ngữ quan trọng</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>
        <div className="modal-body fc-body">
          <div className="fc-top">
            <span className="fc-counter">{current + 1} / {total}</span>
          </div>
          <div className="fc-progress">
            <div className="fc-progress-fill" style={{ width: `${(current + 1) / total * 100}%`, background: card.color }} />
          </div>

          <div className="fc-scene" onClick={() => setFlipped(f => !f)}>
            <div className={`fc-card${flipped ? ' flipped' : ''}`}>
              <div className="fc-face fc-front" style={{ borderTop: `4px solid ${card.color}` }}>
                <div className="fc-badge" style={{ background: card.color }}>THUẬT NGỮ</div>
                <div className="fc-term">{card.term}</div>
                <div className="fc-hint">👆 Nhấn để xem định nghĩa</div>
              </div>
              <div className="fc-face fc-back" style={{ background: card.color }}>
                <div className="fc-badge" style={{ background: 'rgba(255,255,255,.25)', color: 'white' }}>ĐỊNH NGHĨA</div>
                <div className="fc-definition">{card.def}</div>
                <div className="fc-example">{card.example}</div>
              </div>
            </div>
          </div>

          <div className="fc-nav">
            <button className="fc-nav-btn" onClick={prev}>← Trước</button>
            <button className="fc-flip-btn" style={{ background: card.color }} onClick={() => setFlipped(f => !f)}>
              {flipped ? '🔄 Lật lại' : '👆 Xem định nghĩa'}
            </button>
            <button className="fc-nav-btn" onClick={next}>Tiếp →</button>
          </div>
          <p className="fc-keys">← → điều hướng · Space lật thẻ · Esc đóng</p>
        </div>
      </div>
    </div>
  )
}

// ── Countdown Timer Widget ───────────────────────────
function CountdownTimer({ onClose }) {
  const [totalSecs, setTotalSecs] = useState(10 * 60)
  const [left, setLeft] = useState(10 * 60)
  const [running, setRunning] = useState(false)
  const [editMin, setEditMin] = useState('10')

  useEffect(() => {
    if (!running || left <= 0) return
    const id = setTimeout(() => setLeft(l => l - 1), 1000)
    return () => clearTimeout(id)
  }, [running, left])

  useEffect(() => {
    if (left === 0 && running) {
      setRunning(false)
      playSound('wrong')
    }
  }, [left, running])

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const pct = totalSecs > 0 ? (left / totalSecs) * 100 : 0
  const isRed = left < 120 && left > 0
  const isDone = left === 0

  const applyTime = () => {
    const m = Math.max(1, Math.min(99, parseInt(editMin) || 10))
    const secs = m * 60
    setTotalSecs(secs)
    setLeft(secs)
    setRunning(false)
  }

  return (
    <div className="timer-widget">
      <div className="timer-header">
        <span className="timer-title">⏱ Đếm ngược</span>
        <button className="timer-close" onClick={onClose}>✕</button>
      </div>
      <div className={`timer-display${isRed ? ' red' : ''}${isDone ? ' done' : ''}`}>
        {isDone ? '⏰ Hết giờ!' : `${mm}:${ss}`}
      </div>
      <div className="timer-bar-track">
        <div
          className="timer-bar-fill"
          style={{ width: `${pct}%`, background: isRed ? '#ef4444' : '#1565c0' }}
        />
      </div>
      <div className="timer-set-row">
        <input
          className="timer-input"
          type="number" min="1" max="99"
          value={editMin}
          onChange={e => setEditMin(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && applyTime()}
        />
        <span className="timer-unit">phút</span>
        <button className="timer-set-btn" onClick={applyTime}>✓ Đặt</button>
      </div>
      <div className="timer-btns">
        <button
          className={`timer-action-btn ${running ? 'pause' : 'play'}`}
          onClick={() => !isDone && setRunning(r => !r)}
          disabled={isDone}
        >
          {running ? '⏸ Dừng' : '▶ Bắt đầu'}
        </button>
        <button
          className="timer-action-btn reset"
          onClick={() => { setLeft(totalSecs); setRunning(false) }}
        >
          ↺ Reset
        </button>
      </div>
    </div>
  )
}

// ── Slideshow Mode ────────────────────────────────────
function SlideshowMode({ sections, onClose }) {
  const [idx, setIdx] = useState(0)
  const total = sections.length
  const s = sections[idx]
  const SectionComp = s.Component
  const pct = ((idx + 1) / total) * 100

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' || e.key === 'PageDown') setIdx(i => Math.min(i + 1, total - 1))
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') setIdx(i => Math.max(i - 1, 0))
    }
    globalThis.addEventListener('keydown', onKey)
    return () => globalThis.removeEventListener('keydown', onKey)
  }, [onClose, total])

  return (
    <div className="ss-overlay">
      <div className="ss-topbar">
        <div className="ss-info">
          <span className="ss-count">{idx + 1} / {total}</span>
          <div className="ss-progress"><div className="ss-progress-fill" style={{ width: `${pct}%` }} /></div>
        </div>
        <div className="ss-topbar-title">{s.icon} {s.title}</div>
        <button className="ss-exit-btn" onClick={onClose}>✕ Thoát (Esc)</button>
      </div>

      <div className="ss-slide" key={idx}>
        <div className="ss-slide-inner">
          <div className="ss-slide-header" style={{ borderLeftColor: s.color }}>
            <span className="ss-slide-icon" style={{ background: s.colorBg, color: s.color }}>{s.icon}</span>
            <div>
              <div className="ss-slide-title" style={{ color: s.color }}>{s.title}</div>
              <div className="ss-slide-sub">{s.desc}</div>
            </div>
          </div>
          <div className="ss-slide-body">
            <SectionComp />
          </div>
        </div>
      </div>

      <div className="ss-nav">
        <button
          className="ss-nav-btn"
          onClick={() => setIdx(i => Math.max(i - 1, 0))}
          disabled={idx === 0}
        >← Trước</button>
        <div className="ss-dots">
          {sections.map((sec, i) => (
            <button
              key={sec.id}
              className={`ss-dot ${i === idx ? 'active' : ''}`}
              style={i === idx ? { background: s.color, borderColor: s.color } : {}}
              onClick={() => setIdx(i)}
              title={sec.title}
            />
          ))}
        </div>
        <button
          className="ss-nav-btn"
          onClick={() => setIdx(i => Math.min(i + 1, total - 1))}
          disabled={idx === total - 1}
        >Tiếp →</button>
      </div>
    </div>
  )
}

// ===== AI CHAT DATA =====
const AI_QA = [
  {
    keywords: ['tích tụ', 'tập trung', 'concern', 'conglomerate', 'consortium', 'cartel', 'trust'],
    answer: '🏭 **Tích tụ & Tập trung tư bản** là biểu hiện đầu tiên của độc quyền mới. Các hình thức tổ chức gồm: **Concern** (tập đoàn đa ngành), **Conglomerate** (liên hợp đa dạng), **Consortium** (liên minh tài chính), **Cartel** và **Trust**. Ví dụ: Samsung, LG là các Concern điển hình của Hàn Quốc.',
  },
  {
    keywords: ['tài chính', 'ngân hàng', 'đầu sỏ', 'tư bản tài chính', 'quả đấm thép'],
    answer: '💰 **Tư bản tài chính** là sự dung hợp giữa tư bản ngân hàng độc quyền và tư bản công nghiệp độc quyền. Tạo ra tầng lớp **đầu sỏ tài chính** nắm quyền kiểm soát kinh tế. Ví dụ: JPMorgan Chase, Goldman Sachs kiểm soát hàng nghìn công ty qua sở hữu cổ phần.',
  },
  {
    keywords: ['xuất khẩu tư bản', 'fdi', 'đầu tư nước ngoài', 'xuất khẩu'],
    answer: '🌐 **Xuất khẩu tư bản** là đưa tư bản ra nước ngoài để thu lợi nhuận siêu ngạch. Gồm 2 hình thức: **Đầu tư trực tiếp (FDI)** – xây nhà máy, mua cổ phần kiểm soát; **Đầu tư gián tiếp (FPI)** – mua trái phiếu, cổ phiếu. Mục đích: khai thác tài nguyên và lao động rẻ.',
  },
  {
    keywords: ['thị trường', 'phân chia thị trường', 'wto', 'opec'],
    answer: '🗺️ **Phân chia thị trường thế giới**: Các tổ chức độc quyền quốc tế phân chia thị trường tiêu thụ và nguồn cung. Ví dụ: **OPEC** kiểm soát thị trường dầu mỏ; các Cartel trong ngành dược, chip bán dẫn phân chia thị phần toàn cầu.',
  },
  {
    keywords: ['lãnh thổ', 'phân chia lãnh thổ', 'thuộc địa', 'ảnh hưởng'],
    answer: '🌍 **Phân chia lãnh thổ ảnh hưởng**: Thay vì thuộc địa trực tiếp, nay dùng **"ngoại giao nợ"** (Belt & Road Initiative), căn cứ quân sự, hiệp định thương mại ưu đãi để kiểm soát các nước nhỏ. Đây là hình thức thuộc địa kiểu mới.',
  },
  {
    keywords: ['độc quyền nhà nước', 'nhà nước tư sản', 'can thiệp nhà nước'],
    answer: '🏛️ **Độc quyền Nhà nước** (State Monopoly Capitalism) là sự kết hợp giữa tư bản độc quyền tư nhân với bộ máy nhà nước, tạo cơ chế thống nhất phục vụ lợi ích tư bản độc quyền và duy trì chủ nghĩa tư bản trước các mâu thuẫn nội tại.',
  },
  {
    keywords: ['nhân sự', 'quan hệ nhân sự', 'cửa quay', 'revolving door'],
    answer: '👔 **Cơ chế "Cửa quay"** (Revolving Door): quan chức chính phủ sau khi nghỉ hưu vào làm tập đoàn lớn, và ngược lại CEO sang làm quan chức nhà nước. Ví dụ ở Mỹ: Bộ trưởng Tài chính từng là CEO Goldman Sachs; Bộ trưởng Quốc phòng từng lãnh đạo Raytheon.',
  },
  {
    keywords: ['sở hữu nhà nước', 'quốc hữu hóa', 'doanh nghiệp nhà nước', 'tư nhân hóa'],
    answer: '🏗️ **Sở hữu Nhà nước**: Nhà nước nắm giữ các doanh nghiệp chiến lược. Chu kỳ: **quốc hữu hóa** khi khủng hoảng (cứu vớt), rồi **tư nhân hóa** khi ổn định (chuyển lợi ích cho tư bản). Ví dụ: cứu trợ AIG, GM năm 2008-2009.',
  },
  {
    keywords: ['điều tiết', 'công cụ điều tiết', 'chính sách', 'fed', 'lãi suất', 'ngân sách'],
    answer: '⚙️ **Công cụ điều tiết vĩ mô**: **Chính sách tài khóa** (thu-chi ngân sách); **Chính sách tiền tệ** (FED tăng/giảm lãi suất); **Nới lỏng định lượng QE** (in tiền mua trái phiếu); **Trợ cấp** ngành chiến lược; **Mua sắm công** (hợp đồng quốc phòng).',
  },
  {
    keywords: ['độc quyền là gì', 'khái niệm', 'định nghĩa', 'là gì'],
    answer: '📚 **Độc quyền** là liên minh giữa các doanh nghiệp lớn nắm phần lớn sản xuất và tiêu thụ một loại hàng hóa, có khả năng định giá độc quyền để thu lợi nhuận cao. Theo Lenin, độc quyền xuất hiện khi tích tụ và tập trung tư bản đạt trình độ cao.',
  },
  {
    keywords: ['ví dụ', 'thực tế', 'hiện nay', 'ngày nay', 'thế kỷ 21'],
    answer: '🌟 **Ví dụ thực tế ngày nay**: Apple, Microsoft, Google, Amazon, Meta – 5 công ty chiếm hơn 25% vốn hóa S&P 500. TSMC độc quyền chip tiên tiến. NVIDIA kiểm soát >80% thị trường GPU AI. Đây là biểu hiện rõ nhất của tích tụ & tập trung tư bản thế kỷ XXI.',
  },
]

function getAiAnswer(question) {
  const q = question.toLowerCase()
  for (const item of AI_QA) {
    if (item.keywords.some(kw => q.includes(kw))) {
      return item.answer
    }
  }
  return '🤔 Tôi chưa có câu trả lời cho câu hỏi này. Hãy thử hỏi về: **tích tụ tư bản**, **tư bản tài chính**, **xuất khẩu tư bản**, **phân chia thị trường**, **phân chia lãnh thổ**, **độc quyền nhà nước**, **quan hệ nhân sự**, **sở hữu nhà nước**, hoặc **công cụ điều tiết**.'
}

// ===== AI CHAT COMPONENT =====
let msgIdCounter = 0

function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: ++msgIdCounter, from: 'ai', text: '👋 Xin chào! Tôi là trợ lý AI của bài học.\nBạn có thể hỏi tôi về bất kỳ nội dung nào trong bài **Biểu hiện mới của Độc quyền**!' }
  ])
  const [input, setInput] = useState('')

  const send = (question) => {
    const trimmed = question.trim()
    if (!trimmed) return
    setMessages(prev => [
      ...prev,
      { id: ++msgIdCounter, from: 'user', text: trimmed },
      { id: ++msgIdCounter, from: 'ai', text: getAiAnswer(trimmed) }
    ])
    setInput('')
    setTimeout(() => {
      const el = document.getElementById('ai-chat-messages')
      if (el) el.scrollTop = el.scrollHeight
    }, 60)
  }

  const quickQuestions = [
    'Tích tụ tư bản là gì?',
    'Tư bản tài chính?',
    'Xuất khẩu tư bản?',
    'Độc quyền nhà nước?',
  ]

  return (
    <>
      {/* Floating AI Character */}
      <div className={`ai-fab-char ${open ? 'ai-fab-char-open' : ''}`} onClick={() => setOpen(!open)} role="button" aria-label="Trợ lý AI học tập">
        {!open && (
          <div className="ai-fab-bubble">✨ Bạn muốn hỏi gì?</div>
        )}
        {open && (
          <div className="ai-fab-bubble ai-fab-bubble-close">✕ Đóng</div>
        )}
        <div className="ai-fab-char-bg">
          <img
            src="https://ava-grp-talk.zadn.vn/9/9/a/2/2/360/8d84b3493ccd55c45d27228da2ae5d7c.jpg"
            alt="AI"
            className="ai-fab-char-img"
          />
        </div>
      </div>

      {/* Chat Window */}
      {open && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-chat-header-left">
              <div className="ai-chat-avatar"><img src="https://ava-grp-talk.zadn.vn/9/9/a/2/2/360/8d84b3493ccd55c45d27228da2ae5d7c.jpg" alt="AI" /></div>
              <div>
                <div className="ai-chat-title">Triết Gia AI</div>
                <div className="ai-chat-status">Đang hoạt động</div>
              </div>
            </div>
            <button className="ai-chat-header-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="ai-chat-messages" id="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-msg ai-msg-${msg.from}`}>
                {msg.from === 'ai' && <div className="ai-msg-avatar"><img src="https://ava-grp-talk.zadn.vn/9/9/a/2/2/360/8d84b3493ccd55c45d27228da2ae5d7c.jpg" alt="AI" /></div>}
                <div
                  className="ai-msg-bubble"
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replaceAll(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                      .replaceAll('\n', '<br/>')
                  }}
                />
              </div>
            ))}
          </div>

          <div className="ai-quick-questions">
            {quickQuestions.map((q) => (
              <button key={q} className="ai-quick-btn" onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>

          <div className="ai-chat-input-row">
            <input
              className="ai-chat-input"
              type="text"
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); send(input) } }}
              autoFocus
            />
            <button className="ai-chat-send" onClick={() => send(input)} aria-label="Gửi">➤</button>
          </div>
        </div>
      )}
    </>
  )
}

function InfoPanel({ onClose }) {
  const AIs = [
    { name: 'Claude 3.5 Sonnet', desc: 'Phân tích & soạn thảo nội dung lý luận Mác-Lênin về độc quyền tư bản', color: '#c98a5e', bg: 'rgba(201,138,94,.13)', border: 'rgba(201,138,94,.35)', icon: '◆' },
    { name: 'GitHub Copilot', desc: 'Hỗ trợ gợi ý code, debug và hoàn thiện chi tiết giao diện React/Vite', color: '#58a6ff', bg: 'rgba(88,166,255,.13)', border: 'rgba(88,166,255,.35)', icon: '✿' },
    { name: 'GPT-4o', desc: 'Nghiên cứu số liệu thực tế: FDI, OPEC, TNCs, thị phần toàn cầu', color: '#10a37f', bg: 'rgba(16,163,127,.13)', border: 'rgba(16,163,127,.35)', icon: '⬥' },
  ]
  const prompts = [
    'Phân tích 5 biểu hiện mới của độc quyền trong chủ nghĩa tư bản thế kỷ XXI',
    'Giải thích cơ chế tham dự trong tư bản tài chính và sức mạnh của oligarchy tàì chính',
    'So sánh xuất khẩu tư bản với xuất khẩu hàng hóa — tác động đến nước nhận đầu tư',
    'Phân tích vai trò của TNCs trong việc phân chia thị trường thế giới và cạnh tranh giữa các khối',
    'Mô tả các hình thức chiến tranh mới (proxy war, chiến tranh thông tin) trong phân chia lãnh thổ',
    'Phân tích bản chất giai cấp của nhà nước tư sản thông qua cơ chế quan hệ nhân sự',
    'Giải thích vai trò điều tiết kinh tế vĩ mô của nhà nước độc quyền — ngân sách, giải cứu tập đoàn',
    'Xây dựng hệ thống câu hỏi trắc nghiệm 10 câu về biểu hiện mới của độc quyền tư bản',
  ]
  const concepts = [
    { label: '9 chủ đề nội dung chính', ok: true },
    { label: 'Quiz 10 câu trắc nghiệm', ok: true },
    { label: 'Biểu đồ dữ liệu (FDI, OPEC, thị phần)', ok: true },
    { label: 'Timeline lịch sử 1860s → 2020s', ok: true },
    { label: 'Flashcard 10 thuật ngữ', ok: true },
    { label: 'Slideshow trình chiếu', ok: true },
    { label: 'Đồng hồ đếm ngược', ok: true },
    { label: 'AI Chat hỗ trợ học tập', ok: true },
    { label: 'Export PDF / In tài liệu', ok: true },
    { label: 'Framer Motion animations', ok: false },
  ]
  const goals = [
    'Hiểu và phân tích được 5 biểu hiện mới của chủ nghĩa tư bản độc quyền',
    'Nắm vững khái niệm tư bản tài chính, cơ chế tham dự và tầng lớp tài phiệt',
    'Phân biệt xuất khẩu tư bản theo hình thức (FDI, ODA, đầu tư gián tiếp)',
    'Nhận diện vai trò TNCs và các liên minh kinh tế trong phân chia thị trường',
    'Phân tích bản chất và chức năng của nhà nước độc quyền tư bản hiện đại',
    'Áp dụng lý thuyết vào phân tích các sự kiện kinh tế - chính trị thực tế',
  ]

  return (
    <div className="ipanel-overlay" onClick={onClose}>
      <div className="ipanel" onClick={e => e.stopPropagation()}>
        <div className="ipanel-header">
          <span className="ipanel-header-icon">ℹ</span>
          <div>
            <div className="ipanel-title">Phân Tích Lý Thuyết &amp; Công Cụ Hỗ Trợ</div>
            <div className="ipanel-subtitle">Dữ liệu về AI, Prompts, Bài thuyết trình, Nội dung</div>
          </div>
          <button className="ipanel-close" onClick={onClose}>✕</button>
        </div>
        <div className="ipanel-body">

          <div className="ipanel-section-label">✦ AI Models Được Sử Dụng</div>
          <div className="ipanel-ai-list">
            {AIs.map(ai => (
              <div key={ai.name} className="ipanel-ai-item" style={{ background: ai.bg, borderColor: ai.border }}>
                <span className="ipanel-ai-icon" style={{ color: ai.color }}>{ai.icon}</span>
                <div>
                  <div className="ipanel-ai-name" style={{ color: ai.color }}>{ai.name}</div>
                  <div className="ipanel-ai-desc">{ai.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ipanel-section-label">✦ Prompts Và Lý Thuyết</div>
          <ul className="ipanel-prompts">
            {prompts.map((p, i) => <li key={i}>{p}</li>)}
          </ul>

          <div className="ipanel-section-label">✦ Các Khái Niệm Chính Được Triển Khai</div>
          <div className="ipanel-concepts-grid">
            {concepts.map((c, i) => (
              <div key={i} className={`ipanel-concept-item ${c.ok ? 'ok' : 'pending'}`}>
                <span className="ipanel-concept-check">{c.ok ? '✓' : '○'}</span>
                {c.label}
              </div>
            ))}
          </div>

          <div className="ipanel-section-label">✦ Mục Tiêu Học Tập</div>
          <ol className="ipanel-goals">
            {goals.map((g, i) => <li key={i}>{g}</li>)}
          </ol>

        </div>
      </div>
    </div>
  )
}

export default App
