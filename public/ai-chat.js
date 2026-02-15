(function() {
  // -----------------------------------------------------------
  // 設定區：請將下方的網址換成您自己的 Hugging Face Space 網址
  // 記得在網址最後面加上 /?embed=true 以隱藏標題列
  // -----------------------------------------------------------
  var BOT_URL = "https://scottie1016-meimen-bot.hf.space/?embed=true";
  
  // 建立按鈕 (Bubble)
  var btn = document.createElement("div");
  btn.innerText = "🤖"; 
  btn.style.cssText = "position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background: #000; color: #fff; border-radius: 50%; text-align: center; line-height: 60px; font-size: 30px; cursor: pointer; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.3s;";
  btn.onclick = toggleChat;
  
  // 建立聊天視窗 (Iframe Container)
  var box = document.createElement("div");
  box.style.cssText = "position: fixed; bottom: 90px; right: 20px; width: 380px; height: 600px; background: #fff; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); z-index: 9999; display: none; overflow: hidden; border: 1px solid #eee;";
  
  // 建立 Iframe
  var iframe = document.createElement("iframe");
  iframe.src = BOT_URL;
  iframe.style.cssText = "width: 100%; height: 100%; border: none;";
  box.appendChild(iframe);
  
  // 加入到網頁中
  document.body.appendChild(btn);
  document.body.appendChild(box);
  
  // 開關邏輯
  var isOpen = false;
  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      box.style.display = "block";
      btn.innerText = "✖"; // 變成關閉符號
      btn.style.transform = "rotate(90deg)";
    } else {
      box.style.display = "none";
      btn.innerText = "🤖"; // 變回機器人
      btn.style.transform = "rotate(0deg)";
    }
  }
})();
