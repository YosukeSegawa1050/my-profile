import { useEffect, useRef, useState } from 'react'
import { fortunes } from './fortunes.js'

const dateLabel = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}).format(new Date())

function Crest({ small = false }) {
  return (
    <svg className={small ? 'crest crest--small' : 'crest'} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="38" />
      <path d="M50 12v76M12 50h76M23 23l54 54M77 23 23 77" />
      <path d="M50 25c8 9 11 17 0 25-11-8-8-16 0-25ZM75 50c-9 8-17 11-25 0 8-11 16-8 25 0ZM50 75c-8-9-11-17 0-25 11 8 8 16 0 25ZM25 50c9-8 17-11 25 0-8 11-16 8-25 0Z" />
      <circle cx="50" cy="50" r="5" />
    </svg>
  )
}

function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <span key={index} style={{ left: (index * 37 + 9) % 94 + '%', top: (index * 71 + 7) % 88 + '%', '--delay': (index % 8) * 0.35 + 's' }} />
      ))}
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="瑞光みくじ ホーム">
          <Crest small />
          <span><strong>瑞光みくじ</strong><small>ZUIKŌ OMICUJI</small></span>
        </a>
        <nav aria-label="メインナビゲーション">
          <a href="#omikuji">おみくじを引く</a>
          <a href="#about">瑞光みくじについて</a>
        </nav>
        <span className="header-edition">一期一会の、一籤。</span>
      </div>
    </header>
  )
}

function FortuneTube({ phase, onDraw }) {
  return (
    <button
      className="tube-button"
      type="button"
      onClick={onDraw}
      disabled={phase !== 'idle'}
      aria-label="おみくじ筒を振って、おみくじを引く"
    >
      <span className="tube-sticks" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </span>
      <span className="tube-lid" aria-hidden="true"><span /></span>
      <span className="tube-body" aria-hidden="true">
        <span className="tube-band tube-band--top" />
        <span className="tube-pattern tube-pattern--left" />
        <span className="tube-pattern tube-pattern--right" />
        <span className="tube-label">御神籤</span>
        <span className="tube-band tube-band--bottom" />
      </span>
      <span className="tube-foot" aria-hidden="true" />
    </button>
  )
}

function FortuneResult({ fortune, number, onAgain }) {
  return (
    <div className={'result-card result-card--' + fortune.tone} id="result" tabIndex={-1}>
      <div className="result-ornament result-ornament--top" aria-hidden="true">✦ · ─────── · ✦</div>
      <div className="result-topline"><span>瑞光神籤</span><span>第 {number} 番</span></div>
      <div className="result-heading">
        <span className="result-overline">今日の運勢</span>
        <strong>{fortune.rank}</strong>
        <span className="result-roman">{fortune.roman}</span>
      </div>
      <div className="result-poem">{fortune.verse}</div>
      <p className="result-message">{fortune.message}</p>
      <div className="result-guidance">
        {fortune.guidance.map(([label, text]) => (
          <div className="guidance-row" key={label}><span>{label}</span><p>{text}</p></div>
        ))}
      </div>
      <div className="result-lucky">
        <div><span>幸運の色</span><strong>{fortune.lucky}</strong></div>
        <div><span>吉方位</span><strong>{fortune.direction}</strong></div>
      </div>
      <div className="result-actions">
        <button className="again-button" type="button" onClick={onAgain}>もう一度引く <span aria-hidden="true">↗</span></button>
      </div>
      <div className="result-seal" aria-hidden="true">瑞<br />光</div>
      <div className="result-ornament result-ornament--bottom" aria-hidden="true">✦ · ─────── · ✦</div>
    </div>
  )
}

function RitualStage({ phase, fortune, number, onDraw, onAgain }) {
  return (
    <div className={'ritual-stage ritual-stage--' + phase}>
      <div className="stage-arch" aria-hidden="true"><i /><i /><i /></div>
      <div className="stage-halo" aria-hidden="true"><i /><i /><i /></div>
      <div className="stage-rays" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => <i key={index} style={{ '--ray': index }} />)}
      </div>
      <div className="stage-petals" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <i key={index} style={{ '--petal': index }} />)}
      </div>
      <div className="stage-floor" aria-hidden="true" />
      {phase !== 'result' ? (
        <>
          <FortuneTube phase={phase} onDraw={onDraw} />
          {phase === 'revealing' ? <div className="rising-slip" aria-hidden="true"><span>運</span></div> : null}
        </>
      ) : (
        <FortuneResult fortune={fortune} number={number} onAgain={onAgain} />
      )}
      <span className="stage-corner stage-corner--tl" aria-hidden="true" />
      <span className="stage-corner stage-corner--tr" aria-hidden="true" />
      <span className="stage-corner stage-corner--bl" aria-hidden="true" />
      <span className="stage-corner stage-corner--br" aria-hidden="true" />
    </div>
  )
}

function About() {
  return (
    <section className="about-section" id="about">
      <div className="container about-inner">
        <div className="about-lead">
          <p className="eyebrow"><span /> ABOUT ZUIKŌ</p>
          <h2>偶然を、<br /><em>美しい余韻に。</em></h2>
        </div>
        <div className="about-copy">
          <p>瑞光は、めでたい兆しを告げる光。今日のあなたに届いた言葉が、小さな一歩のきっかけになりますように。</p>
          <p>心を静めて、願いをひとつ。筒に触れ、現れた一籤をゆっくりとお読みください。</p>
          <div className="about-steps">
            <div><span>壱</span><strong>心を整える</strong></div>
            <div><span>弐</span><strong>籤を引く</strong></div>
            <div><span>参</span><strong>言葉を受け取る</strong></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [phase, setPhase] = useState('idle')
  const [fortune, setFortune] = useState(null)
  const [number, setNumber] = useState('')
  const timers = useRef([])
  const drawButtonRef = useRef(null)

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    if (phase !== 'result') return
    const frame = requestAnimationFrame(() => {
      document.getElementById('result')?.focus({ preventScroll: true })
      if (window.innerWidth < 780) {
        document.getElementById('result')?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'center',
        })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [phase])

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function drawFortune() {
    if (phase !== 'idle') return
    clearTimers()
    const selected = fortunes[Math.floor(Math.random() * fortunes.length)]
    setFortune(selected)
    setNumber(String(Math.floor(Math.random() * 99) + 1).padStart(2, '0'))
    setPhase('shaking')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealDelay = reducedMotion ? 80 : 1700
    const resultDelay = reducedMotion ? 160 : 2800
    timers.current.push(setTimeout(() => setPhase('revealing'), revealDelay))
    timers.current.push(setTimeout(() => setPhase('result'), resultDelay))
  }

  function drawAgain() {
    clearTimers()
    setFortune(null)
    setPhase('idle')
    requestAnimationFrame(() => drawButtonRef.current?.focus({ preventScroll: true }))
    document.getElementById('omikuji')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const status = phase === 'shaking' ? 'おみくじを振っています' : phase === 'revealing' ? 'おみくじが現れます' : phase === 'result' ? '結果は' + fortune.rank + 'です' : 'おみくじを引く準備ができました'

  return (
    <div id="top" className="site-shell">
      <Starfield />
      <Header />
      <main>
        <section className="hero-section" id="omikuji">
          <div className="hero-wash" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> 一日一縁、心に一籤。</p>
              <h1>今日の運命に、<br /><em>光を。</em></h1>
              <div className="hero-rule"><i /><Crest small /><i /></div>
              <p className="hero-description">その一瞬に、願いを込めて。<br />金色の光とともに、あなただけの言葉が届きます。</p>
              <div className="hero-date"><span>TODAY'S ORACLE</span><strong>{dateLabel}</strong></div>
              <button ref={drawButtonRef} className="draw-button" type="button" onClick={drawFortune} disabled={phase !== 'idle'}>
                <span className="button-spark" aria-hidden="true">✦</span>
                {phase === 'idle' ? 'おみくじを引く' : phase === 'result' ? 'おみくじを開きました' : '願いを届けています'}
                <span className="button-arrow" aria-hidden="true">↗</span>
              </button>
              <p className="draw-hint">筒を押しても引けます。心を静めて、ひと押し。</p>
            </div>
            <div className="hero-visual">
              <div className="visual-title" aria-hidden="true">瑞光</div>
              <RitualStage phase={phase} fortune={fortune} number={number} onDraw={drawFortune} onAgain={drawAgain} />
              <div className="visual-caption"><span>瑞光神籤</span><span>FORTUNE OF THE DAY · MMXXVI</span></div>
            </div>
          </div>
          <div className="container hero-bottom"><span>SCROLL TO DISCOVER</span><i /><span>瑞光 / ZUIKŌ</span></div>
        </section>
        <About />
        <section className="closing-section">
          <div className="container closing-inner"><Crest /><p>よき日も、そうでない日も。<br />今日という一日が、あなたらしくありますように。</p><span>瑞光みくじ</span></div>
        </section>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><span>© 2026 ZUIKŌ OMICUJI</span><span>このおみくじは娯楽を目的とした創作です。</span><a href="#top">ページの先頭へ ↑</a></div></footer>
      <div className="sr-only" role="status" aria-live="polite">{status}</div>
    </div>
  )
}
