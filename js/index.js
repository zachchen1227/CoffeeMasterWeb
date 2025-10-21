import { GetBeanInfoData, GetReviewInfoData, GetProductInfoData } from "./db.js";

fetch('nav.html') // 請求導航列的 HTML 檔案
    .then(response => response.text())
    .then(data => {
        document.getElementById('global-header').innerHTML = data;
    });

// 畫面載入完成後執行的主要啟動函式
document.addEventListener('DOMContentLoaded', initializePage);

// 主要啟動程式
function initializePage() {
    initializeBeaconEvents();
    initializeProductSwiper();
    initializeReviewSwiper();
}

/**
 * 綁定所有咖啡豆圖示的滑鼠進入/離開事件。
 */
async function initializeBeaconEvents() {

    let beanInfoList = await GetBeanInfoData("../file/BeanInfo.json");

    // 遍歷所有國家 ID
    for (let i = 0; i < beanInfoList.length; i++) {
        let beanInfoData = beanInfoList[i]
        const element = document.getElementById(beanInfoData.id);

        // 綁定滑鼠進入事件 (mouseenter)
        element.addEventListener("mouseenter", function () { showBeanAreaInfo(beanInfoData); });
        // 綁定滑鼠離開事件 (mouseleave)
        element.addEventListener("mouseleave", function () { hideBeanAreaInfo(); });
    }
}

/**
 * 顯示指定國家 ID 的咖啡豆產地詳細資訊。
 * @param {string} id - 國家 ID (必須是 countryNameEnum 中的 key)
 */
function showBeanAreaInfo(beanInfoData) {
    // 1. 隱藏主標語 (mainSlogan)
    let sloganElm = document.getElementById("mainSlogan");
    sloganElm.style.visibility = "hidden";

    // 2. 更新 area Information 區塊內容
    let infoElm = document.getElementById("areaInformation");

    // 將產區陣列轉換為 "產區: A、B、C" 的格式
    const areasString = `產區: ${beanInfoData.terroir.join('、')}`;

    // 更新 DOM 內容
    infoElm.querySelector("h1").innerHTML = beanInfoData.countryName; // 更新國家名稱
    infoElm.querySelector("h2").innerHTML = areasString;          // 更新產區列表
    infoElm.querySelector("p").innerHTML = `<strong>${beanInfoData.flavor}</strong>`; // 更新風味描述

    // 3. 顯示資訊區塊 (通過 class 和 style)
    infoElm.classList.add("showBeaconInformation"); // 通常用於 CSS 動畫或狀態標記
    infoElm.style.visibility = "visible";
}

/**
 * 隱藏產地詳細資訊，並顯示主標語。
 */
function hideBeanAreaInfo() {
    // 1. 隱藏 areaInformation
    let infoElm = document.getElementById("areaInformation");
    infoElm.classList.remove("showBeaconInformation")
    infoElm.style.visibility = "hidden";

    // 2. 顯示 mainSlogan
    let sloganElm = document.getElementById("mainSlogan");
    sloganElm.style.visibility = "visible";
}

// 初始化產品卡
async function initializeProductCard() {

    let productInfoList = await GetProductInfoData("../file/productInfo.json");

    let wrapperDiv = $(".productWrapper");

    for (let i = 0; i < productInfoList.length; i++) {
        let slideDiv = $("<div class='productCard swiper-slide'></div>");
        let sub_img = $(`<img src=../images/product/product_${productInfoList[i].id}.jpg alt="Master's Brew">`);
        let sub_countryName = $(`<h3>${productInfoList[i].countryName} | ${productInfoList[i].terroir}</h3>`);
        let sub_productName = $(`<p class = "productName"><strong>${productInfoList[i].productName}</strong></p>`);
        let sub_flavor = $(`<p>${productInfoList[i].flavor}</p>`);
        let sub_price = $(`<p class = "price"><strong>NT$${productInfoList[i].price}</strong></p>`);
        let sub_button = $("<p><button class='add-to-cart-btn'>加入購物車</button></p>");
        slideDiv.append(sub_img, sub_countryName, sub_productName, sub_flavor, sub_price, sub_button);
        wrapperDiv.append(slideDiv);
    }

    wrapperDiv.on("click", ".add-to-cart-btn", function (e) {
        // $(this) 在此處指向被點擊的按鈕
        let productCard = $(this).closest('.productCard');
        let productName = productCard.find('.productName')[0].innerText;
        let productPrice =productCard.find('.price')[0].innerText;
        alert(productName + " 已成功加入購物車!");       
    });
}

function aaa() {

    let wrapperDiv = $(".productWrapper");

}


// 初始化顧客評分卡
async function initializeReviewCard() {

    let reviewInfoList = await GetReviewInfoData("../file/reviewInfo.json");

    let wrapperDiv = $(".reviewWrapper");
    for (let i = 0; i < reviewInfoList.length; i++) {
        let customerReview = reviewInfoList[i];
        let slideDiv = $("<div class='reviewCard swiper-slide'></div>");
        let sub_customerName = $(`<h3>${customerReview.userName}</h3>`);
        let sub_location = $(`<p>${customerReview.countryName} | ${customerReview.terroir}</p>`);
        let sub_productName = $(`<p>${customerReview.productName}</p>`);
        let sub_scoreSet = getStarElement(customerReview.scoreSet);
        let sub_flavor = $(`<p id="reviewFlavor">${customerReview.flavor}</p>`);

        slideDiv.append(
            sub_customerName,
            sub_location,
            sub_productName,
            sub_scoreSet,
            sub_flavor);

        wrapperDiv.append(slideDiv);
    }
}



function getStarElement(scoreSet) {

    let mySpan = [];

    // 建立sourness 星星評分html
    mySpan.push($(`<span class="starReview">酸味: </span>`))
    mySpan.push(...createStarHtml(scoreSet.sourness_score));
    mySpan.push($("<br>"));

    // 建立sweetness 星星評分html
    mySpan.push($(`<span class="starReview">甜味: </span>`))
    mySpan.push(...createStarHtml(scoreSet.sweetness_score));
    mySpan.push($("<br>"));

    // 建立bitterness 星星評分html
    mySpan.push($(`<span class="starReview">苦味: </span>`))
    mySpan.push(...createStarHtml(scoreSet.bitterness_score));
    mySpan.push($("<br>"));

    // 建立flavor 星星評分html
    mySpan.push($(`<span class="starReview">風味: </span>`))
    mySpan.push(...createStarHtml(scoreSet.flavor_score));
    return mySpan;
}

function createStarHtml(score) {
    let sub_span = [];
    let fullScore = 5;

    for (let i = 0; i < score; i++) {
        sub_span.push($(`<span class="fa fa-star checked"></span>`));
    }

    for (let i = 0; i < fullScore - score; i++) {
        sub_span.push($(`<span class="fa fa-star"></span>`));
    }

    return sub_span;
}

// 初始化產品資訊卡輪播系統
function initializeProductSwiper() {

    // 初始化產品資訊卡
    initializeProductCard()

    // 初始化輪播系統
    let swiper = new Swiper(".productSwiper", {
        slidesPerView: 'auto',
        grabCursor: true,

        // 啟用居中模式
        centeredSlides: true,

        // ***關鍵設定：讓捲動邊界貼合起點和終點***
        centeredSlidesBounds: true,

        // 滑塊間距
        spaceBetween: 30,

        loop: false, // 確保是非循環模式

        pagination: {
            el: ".product-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        navigation: {
            nextEl: ".product-next",
            prevEl: ".product-prev",
        },

    });
}

// 初始化顧客評分卡輪播系統
async function initializeReviewSwiper() {

    await initializeReviewCard();

    // 初始化輪播系統
    let swiper = new Swiper(".reviewSwiper", {
        slidesPerView: 'auto',
        grabCursor: true,

        // 啟用居中模式
        centeredSlides: true,

        // ***關鍵設定：讓捲動邊界貼合起點和終點***
        centeredSlidesBounds: true,

        // 滑塊間距
        spaceBetween: 30,

        loop: false, // 確保是非循環模式

        pagination: {
            el: ".review-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        navigation: {
            nextEl: ".review-next",
            prevEl: ".review-prev",
        },
    });
}

