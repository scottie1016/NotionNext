(function() {
  // -----------------------------------------------------------
  // 設定區
  var BOT_URL = "https://scottie1016-meimen-bot.hf.space/?embed=true";
  var ICON_URL = "/Meimen_logo.PNG"; // 您的頭像
  // -----------------------------------------------------------
  
  // 1. 建立主按鈕 (Bubble)
  var btn = document.createElement("div");
  btn.innerHTML = '<img src="' + ICON_URL + '" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">';
  btn.style.cssText = "position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background: #fff; border-radius: 50%; cursor: pointer; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.3s; display: flex; justify-content: center; align-items: center;";
  btn.onclick = toggleChat;
  
  // 2. 建立聊天視窗容器
  var box = document.createElement("div");
  // 預設大小 (手機版會自動調整)
  var defaultStyle = "position: fixed; bottom: 90px; right: 20px; width: 380px; height: 600px; max-width: 90vw; max-height: 80vh; background: #fff; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); z-index: 9999; display: none; overflow: hidden; border: 1px solid #eee; transition: all 0.3s ease;";
  box.style.cssText = defaultStyle;
  
  // 3. 建立「放大/縮小」切換按鈕
  var resizeBtn = document.createElement("div");
  resizeBtn.innerHTML = "⤢"; // 放大符號
  resizeBtn.style.cssText = "position: absolute; top: 10px; left: 10px; width: 30px; height: 30px; background: rgba(0,0,0,0.6); color: white; border-radius: 50%; text-align: center; line-height: 30px; cursor: pointer; z-index: 10000; font-size: 14px; user-select: none;";
  resizeBtn.onclick = toggleSize;

  // 4. 建立 Iframe
  var iframe = document.createElement("iframe");
  iframe.src = BOT_URL;
  iframe.style.cssText = "width: 100%; height: 100%; border: none;";
  
  // 組裝元素
  box.appendChild(resizeBtn); // 把放大按鈕放進去
  box.appendChild(iframe);
  document.body.appendChild(btn);
  document.body.appendChild(box);
  
  // --- 邏輯區 ---
  var isOpen = false;
  var isFull = false;

  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      box.style.display = "block";
      btn.innerHTML = "✖"; 
      btn.style.fontSize = "30px";
      btn.style.color = "#333";
      btn.style.transform = "rotate(90deg)";
    } else {
      box.style.display = "none";
      btn.innerHTML = '<img src="' + ICON_URL + '" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">';
      btn.style.transform = "rotate(0deg)";
    }
  }

  function toggleSize(e) {
    // 防止點擊波及到 iframe
    e.stopPropagation();
    isFull = !isFull;
    if (isFull) {
        // 變大模式：幾乎全螢幕
        box.style.width = "90vw";
        box.style.height = "90vh";
        box.style.right = "5vw"; // 居中
        box.style.bottom = "5vh";
        resizeBtn.innerHTML = "↙"; // 縮小符號
    } else {
        // 恢復預設模式
        box.style.cssText = defaultStyle;
        box.style.display = "block"; // 確保不會消失
        resizeBtn.innerHTML = "⤢"; // 放大符號
    }
  }
})();
