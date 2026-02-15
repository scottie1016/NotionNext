(function() {
  // --- 🔑 設定您的密碼 ---
  var PASSWORD = "1760"; 
  // -----------------------

  // 如果已經輸入過，就不用再輸
  if (sessionStorage.getItem("site_access") === "granted") return;

  // 1. 建立全螢幕遮罩 (黑色背景)
  var overlay = document.createElement("div");
  overlay.id = "password-overlay";
  overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #222; color: white; z-index: 2147483647; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: sans-serif;";

  // 2. 建立標題
  var title = document.createElement("h2");
  title.innerText = "🔒 請輸入訪問密碼";
  title.style.marginBottom = "30px";
  title.style.letterSpacing = "2px";

  // 3. 建立輸入框 (關鍵修改：改成 text 類型，並加大字體)
  var input = document.createElement("input");
  input.type = "text";            // 改成 text，讓數字直接顯示出來
  input.inputMode = "numeric";    // 手機版會自動跳出數字鍵盤
  input.placeholder = "請輸入數字";
  // 樣式：字體 40px，字距 10px (看起來像 PIN 碼)，置中
  input.style.cssText = "width: 200px; padding: 10px; font-size: 40px; letter-spacing: 10px; text-align: center; border-radius: 10px; border: 2px solid #555; background: #333; color: #fff; outline: none; font-weight: bold;";
  
  // 聚焦時變色
  input.onfocus = function() {
    input.style.border = "2px solid #4CAF50"; // 綠色邊框
  }

  // 4. 建立按鈕
  var btn = document.createElement("button");
  btn.innerText = "解鎖進入 ➜";
  btn.style.cssText = "margin-top: 30px; padding: 12px 30px; font-size: 18px; cursor: pointer; background: #4CAF50; border: none; border-radius: 50px; color: white; transition: all 0.3s;";
  
  // 滑鼠移過去的效果
  btn.onmouseover = function() { btn.style.background = "#45a049"; }
  btn.onmouseout = function() { btn.style.background = "#4CAF50"; }

  // 5. 錯誤訊息
  var errorMsg = document.createElement("div");
  errorMsg.style.cssText = "color: #ff6b6b; margin-top: 20px; height: 20px; font-size: 16px; font-weight: bold;";

  // --- 驗證邏輯 ---
  function checkPass() {
    if (input.value === PASSWORD) {
      sessionStorage.setItem("site_access", "granted");
      // 淡出動畫
      overlay.style.transition = "opacity 0.5s";
      overlay.style.opacity = "0";
      setTimeout(function() {
        if(document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
      }, 500);
    } else {
      errorMsg.innerText = "❌ 密碼錯誤，請重試";
      // 錯誤時搖晃輸入框
      input.style.animation = "shake 0.3s";
      setTimeout(() => input.style.animation = "", 300);
      input.value = "";
      input.focus();
    }
  }

  // 加入搖晃動畫樣式
  var styleSheet = document.createElement("style");
  styleSheet.innerText = "@keyframes shake {0% { transform: translateX(0); } 25% { transform: translateX(-10px); } 50% { transform: translateX(10px); } 75% { transform: translateX(-10px); } 100% { transform: translateX(0); }}";
  document.head.appendChild(styleSheet);

  btn.onclick = checkPass;
  input.onkeyup = function(e) {
    if (e.key === "Enter") checkPass();
  };

  // 組裝
  overlay.appendChild(title);
  overlay.appendChild(input);
  overlay.appendChild(btn);
  overlay.appendChild(errorMsg);
  document.body.appendChild(overlay);

  // 自動聚焦 (讓使用者一進來就可以打字)
  setTimeout(() => input.focus(), 100);

})();
