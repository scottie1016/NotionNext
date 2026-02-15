(function() {
  // -----------------------------------------------------------
  // 設定區
  // 1. AI 機器人的網址
  var BOT_URL = "https://scottie1016-meimen-bot.hf.space/?embed=true";
  
  // 2. 您的 Icon 圖片網址 (請把引號內的網址換成您自己的)
  var ICON_URL = "https://www.notion.so/image/attachment%3A465be1be-e59b-477d-9cbc-8038b3311354%3AIMG_3451.png?table=collection&id=307b0ddc-0cbe-81a1-9fdd-000bc8a301b1&t=307b0ddc-0cbe-81a1-9fdd-000bc8a301b1"; 
  // -----------------------------------------------------------
  
  // 建立按鈕 (Bubble)
  var btn = document.createElement("div");
  // 設定預設為圖片
  btn.innerHTML = '<img src="' + ICON_URL + '" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">';
  
  // 設定按鈕樣式 (拿掉原本的 text-align 和 line-height，因為圖片不需要)
  btn.style.cssText = "position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background: #fff; border-radius: 50%; cursor: pointer; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.3s; display: flex; justify-content: center; align-items: center;";
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
      // 打開時變成 "✖" (關閉符號)
      btn.innerHTML = "✖"; 
      btn.style.fontSize = "30px";
      btn.style.color = "#333";
      btn.style.background = "#fff"; // 保持白色背景
      btn.style.transform = "rotate(90deg)";
    } else {
      box.style.display = "none";
      // 關閉時變回您的圖片
      btn.innerHTML = '<img src="' + ICON_URL + '" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">';
      btn.style.transform = "rotate(0deg)";
    }
  }
})();
