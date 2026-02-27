// eslint-disable-next-line @next/next/no-document-import-in-page
import BLOG from '@/blog.config'
import Document, { Head, Html, Main, NextScript } from 'next/document'

// 预先设置深色模式的脚本内容
const darkModeScript = `
(function() {
  const darkMode = localStorage.getItem('darkMode')

  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

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
          <div id="ai-chat-widget">
  <div id="ai-chat-window" style="position: fixed; bottom: 90px; right: 20px; width: 380px; height: 550px; max-width: 90vw; max-height: 80vh; background: #ffffff; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); z-index: 9998; display: none; overflow: hidden; border: 1px solid #eaeaea; transition: all 0.3s ease;">
    <iframe src="https://scottie1016-meimen-bot.hf.space/" style="width: 100%; height: 100%; border: none;"></iframe>
  </div>

  <button id="ai-chat-fab" style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; background-color: #2D3748; color: white; border: none; font-size: 28px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 9999; display: flex; justify-content: center; align-items: center; transition: transform 0.2s;">
    💬
  </button>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const fab = document.getElementById('ai-chat-fab');
    const chatWindow = document.getElementById('ai-chat-window');
    let isOpen = false;

    fab.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        chatWindow.style.display = 'block';
        fab.innerHTML = '✖'; // 打開時變成叉叉
        fab.style.backgroundColor = '#E53E3E'; // 變成紅色
        fab.style.transform = 'scale(0.9)';
      } else {
        chatWindow.style.display = 'none';
        fab.innerHTML = '💬'; // 關閉時變回泡泡
        fab.style.backgroundColor = '#2D3748'; // 變回深灰色
        fab.style.transform = 'scale(1)';
      }
    });
  });
</script>

        </body>
      </Html>
    )
  }
}

export default MyDocument
