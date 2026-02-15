(function() {
  // --- 🔑 設定您的密碼 ---
  var PASSWORD = "888"; 
  // -----------------------

  // 如果已經輸入過，就不用再輸
  if (sessionStorage.getItem("site_access") === "granted") return;

  // 1. 建立遮罩
  var overlay = document.createElement("div");
  overlay.id = "password-overlay";
  overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #333; color: white; z-index: 2147483647; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: sans-serif;";

  // 2. 建立標題
  var title = document.createElement("h2");
  title.innerText = "🔒 本站已鎖定";
  title.style.marginBottom = "20px";

  // 3. 建立輸入框
  var input = document.createElement("input");
  input.type = "password";
  input.placeholder = "請輸入密碼";
  input.style.cssText = "padding: 10px; font-size: 16px; border-radius: 5px; border: none; outline: none; text-align: center;";
  
  // 4. 建立按鈕
  var btn = document.createElement("button");
  btn.innerText = "進入";
  btn.style.cssText = "margin-top: 15px; padding: 8px 20px; font-size: 16px; cursor: pointer; background: #fff; border: none; border-radius: 5px; font-weight: bold; color: #333;";

  // 5. 錯誤訊息
  var errorMsg = document.createElement("div");
  errorMsg.style.cssText = "color: #ff6b6b; margin-top: 10px; height: 20px; font-size: 14px;";

  // --- 驗證邏輯 ---
  function checkPass() {
    if (input.value === PASSWORD) {
      // 密碼正確：存入紀錄，移除遮罩
      sessionStorage.setItem("site_access", "granted");
      document.body.removeChild(overlay);
    } else {
      errorMsg.innerText = "❌ 密碼錯誤";
      input.value = "";
    }
  }

  btn.onclick = checkPass;
  // 支援按 Enter 送出
  input.onkeyup = function(e) {
    if (e.key === "Enter") checkPass();
  };

  // 組裝
  overlay.appendChild(title);
  overlay.appendChild(input);
  overlay.appendChild(btn);
  overlay.appendChild(errorMsg);
  document.body.appendChild(overlay);
})();
