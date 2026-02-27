// eslint-disable-next-line @next/next/no-document-import-in-page
import BLOG from '@/blog.config'
import Document, { Head, Html, Main, NextScript } from 'next/document'

// 预先设置深色模式的脚本内容 
const darkModeScript = `
(function() {
  const darkMode = localStorage.getItem('darkMode')

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  const defaultAppearance = '${BLOG.APPEARANCE || 'auto'}'

  let shouldBeDark = darkMode === 'true' || darkMode === 'dark'

  if (darkMode === null) {
    if (defaultAppearance === 'dark') {
      shouldBeDark = true
    } else if (defaultAppearance === 'auto') {
      // 检查是否在深色模式时间范围内
      const date = new Date()
      const hours = date.getHours()
      const darkTimeStart = ${BLOG.APPEARANCE_DARK_TIME ? BLOG.APPEARANCE_DARK_TIME[0] : 18}
      const darkTimeEnd = ${BLOG.APPEARANCE_DARK_TIME ? BLOG.APPEARANCE_DARK_TIME[1] : 6}
      
      shouldBeDark = prefersDark || (hours >= darkTimeStart || hours < darkTimeEnd)
    }
  }
  
  // 立即设置 html 元素的类
  document.documentElement.classList.add(shouldBeDark ? 'dark' : 'light')
})()
`

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={BLOG.LANG}>
        <Head>
          {/* 预加载字体 */}
          {BLOG.FONT_AWESOME && (
            <>
              <link
                rel='preload'
                href={BLOG.FONT_AWESOME}
                as='style'
                crossOrigin='anonymous'
              />
              <link
                rel='stylesheet'
                href={BLOG.FONT_AWESOME}
                crossOrigin='anonymous'
                referrerPolicy='no-referrer'
              />
            </>
          )}

          {/* 预先设置深色模式，避免闪烁 */}
          <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
        </Head>

        <body>
          <Main />
          <NextScript />
          
          {/* ========== AI 浮動泡泡客服區塊 開始 ========== */}
          <div id="ai-chat-widget">
            <div id="ai-chat-window" style={{ position: 'fixed', bottom: '90px', right: '20px', width: '380px', height: '550px', maxWidth: '90vw', maxHeight: '80vh', background: '#ffffff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 9998, display: 'none', overflow: 'hidden', border: '1px solid #eaeaea', transition: 'all 0.3s ease' }}>
              <iframe src="https://scottie1016-meimen-bot.hf.space/" style={{ width: '100%', height: '100%', border: 'none' }} />
            </div>
            <button id="ai-chat-fab" style={{ position: 'fixed', bottom: '20px', right: '20px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#2D3748', color: 'white', border: 'none', fontSize: '28px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.2s' }}>
              💬
            </button>
          </div>
          <script dangerouslySetInnerHTML={{ __html: `
            document.addEventListener('DOMContentLoaded', function() {
              var fab = document.getElementById('ai-chat-fab');
              var chatWindow = document.getElementById('ai-chat-window');
              var isOpen = false;
              if(fab) {
                fab.addEventListener('click', function() {
                  isOpen = !isOpen;
                  if (isOpen) {
                    chatWindow.style.display = 'block';
                    fab.innerHTML = '✖';
                    fab.style.backgroundColor = '#E53E3E';
                    fab.style.transform = 'scale(0.9)';
                  } else {
                    chatWindow.style.display = 'none';
                    fab.innerHTML = '💬';
                    fab.style.backgroundColor = '#2D3748';
                    fab.style.transform = 'scale(1)';
                  }
                });
              }
            });
          ` }} />
          {/* ========== AI 浮動泡泡客服區塊 結束 ========== */}
          
        </body>
      </Html>
    )
  }
}

export default MyDocument
