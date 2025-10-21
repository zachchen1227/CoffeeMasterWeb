import { GetProductInfoData } from "./db.js";


// 請求導航列的 HTML 檔案
fetch('nav.html').then(response => response.text()).then(data => {
    document.getElementById('global-header').innerHTML = data;
});

// 畫面載入完成後執行的主要啟動函式
document.addEventListener('DOMContentLoaded', initializePage);

// 主要啟動程式
function initializePage() {
    initializeProductCard();
    initializeTabProductEvent();
    showProductGrid("ProductDiv-All");
}

// 初始化產品卡
async function initializeProductCard() {

    let productInfoList = await GetProductInfoData("../file/productInfo.json");

    let productDivList = $("div").filter(".productDiv");

    for (let i = 0; i < productDivList.length; i++) {
        let divId = productDivList[i].id;
        let countryId = divId.split("-")[1];

        for (let i = 0; i < productInfoList.length; i++) {
            let myInfo = productInfoList[i];
            let productRow = $(`#${divId}`).find(".row")
            let flag = false;


            if (countryId == "All" || countryId == myInfo.id.split("-")[0])
                flag = true;

            if (flag) {
                let colDiv = $("<div class='productCard col-3'></div>");
                let sub_img = $(`<img src=../images/product/product_${myInfo.id}.jpg alt="Master's Brew">`);
                let sub_countryName = $(`<p><strong>${myInfo.countryName} | ${myInfo.terroir}<strong></p>`);
                let sub_productName = $(`<p class = "productName"><strong>${myInfo.productName}</strong></p>`);
                let sub_flavor = $(`<p>${myInfo.flavor}</p>`);
                let sub_price = $(`<p class = "price"><strong>NT$${myInfo.price}</strong></p>`);
                let sub_button = $("<p class = 'add-to-cart-btn'><button>加入購物車</button></p>");
                colDiv.append(sub_img, sub_countryName, sub_productName, sub_flavor, sub_price, sub_button);
                productRow.append(colDiv);
            }
        }

    }

    productDivList.on("click", ".add-to-cart-btn", function (e) {
        // $(this) 在此處指向被點擊的按鈕
        let productCard = $(this).closest('.productCard');
        let productName = productCard.find('.productName')[0].innerText;
        let productPrice = productCard.find('.price')[0].innerText;
        alert(productName + " 已成功加入購物車!");
    });

}

function initializeTabProductEvent() {
    let productTabList = $("div").filter(".subTab");
    for (let i = 0; i < productTabList.length; i++) {
        productTabList[i].addEventListener("click", function () {
            let countryName = productTabList[i].id.split("-")[1];

            showProductGrid(`ProductDiv-${countryName}`);
        })
    }
}

function showProductGrid(target) {
    let productDivList = $("div").filter(".productDiv");
    for (let i = 0; i < productDivList.length; i++) {
        let divId = productDivList[i].id;
        if (divId == target) {
            document.getElementById(divId).style.display = "block";
        } else {
            document.getElementById(divId).style.display = "none";

        }
    }
}