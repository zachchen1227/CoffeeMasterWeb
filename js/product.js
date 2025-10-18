import { productInfoList } from "../js/db.js";



// 請求導航列的 HTML 檔案
fetch('nav.html').then(response => response.text()).then(data => {
    document.getElementById('global-header').innerHTML = data;
    console.log(productInfoList);
});

// 畫面載入完成後執行的主要啟動函式
document.addEventListener('DOMContentLoaded', initializePage);

// 主要啟動程式
function initializePage() {
    initializeProductCard();
}

// 初始化產品卡
function initializeProductCard() {
    let productGrid = $("#productGrid");
    for (let i = 0; i < productInfoList.length; i++) {
        let myInfo = productInfoList[i];
        console.log(myInfo);
        let colDiv = $("<div class='productCard col-3'></div>");
        let sub_img = $(`<img src=../images/product/product_${myInfo.id}.jpg alt="Master's Brew">`);
        let sub_countryName = $(`<p><strong>${myInfo.countryName} | ${myInfo.terroir}<strong></p>`);
        let sub_productName = $(`<p><strong>${myInfo.productName}</strong></p>`);
        let sub_flavor = $(`<p>${myInfo.flavor}</p>`);
        let sub_price = $(`<p class = "price"><strong>NT$${myInfo.price[0]} ~ NT$${myInfo.price[1]}</strong></p>`);
        let sub_button = $("<p><button>加入購物車</button></p>");
        colDiv.append(sub_img, sub_countryName, sub_productName, sub_flavor, sub_price, sub_button);
        productGrid.append(colDiv);
    }    
}




//產品頁簽切換事件初始化
function initializeProductTabEvent(){
    
}

