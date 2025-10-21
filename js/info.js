fetch('nav.html') // 請求導航列的 HTML 檔案
    .then(response => response.text())
    .then(data => {
        document.getElementById('global-header').innerHTML = data;
    });


// 確保 DOM 載入完畢後才執行
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    const fnameInput = document.getElementById('fname');
    const lnameInput = document.getElementById('lname');
    const countrySelect = document.getElementById('country');
    const subjectTextarea = document.getElementById('subject');

    form.addEventListener('submit', function (e) {
        // 在這裡使用 e.preventDefault() 阻止瀏覽器預設的提交行為
        // 這樣我們才能執行自定義的驗證
        e.preventDefault();

        let isValid = true; // 設置一個旗標來追蹤驗證狀態

        // --- 1. 驗證 First Name ---
        if (fnameInput.value.trim().length < 2) {
            alert("名 (First Name) 至少需要 2 個字元。");
            isValid = false;
            fnameInput.focus();
            return; // 驗證失敗，直接退出
        }

        // --- 2. 驗證 Last Name ---
        if (lnameInput.value.trim() === "") {
            // 由於 HTML5 required 已檢查，這裡可以檢查其他規則，例如長度或格式
            // 這裡我們假設只需要檢查是否填寫，但為了示範，仍加入檢查
            alert("姓氏 (Last Name) 不能為空。");
            isValid = false;
            lnameInput.focus();
            return;
        }

        // --- 3. 驗證 國家 (Country) ---
        // 檢查 value 是否為預設的空字串
        if (countrySelect.value === "") {
            alert("請選擇一個國家。");
            isValid = false;
            countrySelect.focus();
            return;
        }

        // --- 4. 驗證 Subject ---
        if (subjectTextarea.value.trim().length < 10) {
            alert("意見至少需要 10 個字元。");
            isValid = false;
            subjectTextarea.focus();
            return;
        }

        // --- 5. 如果所有驗證都通過 (isValid 仍為 true) ---
        if (isValid) {
            alert("表單驗證成功！正在提交資料...");
            // 執行真正的提交，例如：
            // 1. form.submit();  // 標準提交
            // 2. 執行 AJAX 請求

            // 由於我們只是示範，這裡將表單手動提交
            this.submit(); // 'this' 指的是 form 元素
        }
    });
});