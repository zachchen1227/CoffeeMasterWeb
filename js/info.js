import { GetProductInfoData } from "./db.js";

fetch('nav.html') // 請求導航列的 HTML 檔案
    .then(response => response.text())
    .then(data => {
        document.getElementById('global-header').innerHTML = data;
    });

document.getElementById("clickMe").addEventListener("click",async function(){
    let result = await GetProductInfoData("../file/productInfo.json");
    console.log(result);
   
  
})