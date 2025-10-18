fetch('nav.html') // 請求導航列的 HTML 檔案
    .then(response => response.text())
    .then(data => {
        document.getElementById('global-header').innerHTML = data;
    });


//==============================================
// 區塊 1: 定義資料
//==============================================

/**
 * @class beanInfo
 * 咖啡豆產區資訊的資料結構類別
 * 使用 Private 欄位 (#) 確保資料的封裝性 (Encapsulation)
 */
class beanInfo {
    // 私有欄位
    #id = ""; // 英文id
    #countryName = ""; // 國家名稱 (中文)
    #terroir = [];     // 主要產區/莊園 (陣列)
    #flavor = "";      // 風味描述 (字串)

    /**
     * @param {string} id - id(英文)
     * @param {string} countryName - 國家名稱 (中文)
     * @param {string[]} terroir - 產區陣列
     * @param {string} flavor - 風味描述
     */
    constructor(id, countryName, terroir, flavor) {
        this.#id = id;
        this.#countryName = countryName;
        this.#terroir = terroir;
        this.#flavor = flavor;
    }

    // Public Getters (讀取器)
    get id() {
        return this.#id;
    }
    get countryName() {
        return this.#countryName;
    }

    get terroir() {
        return this.#terroir;
    }

    get flavor() {
        return this.#flavor;
    }
}

/**
 * @class productInfo
 * 產品資訊的資料結構類別
 * 使用 Private 欄位 (#) 確保資料的封裝性 (Encapsulation)
 */
class productInfo {
    // 私有欄位
    #id = ""; // 英文id
    #countryName = ""; // 國家名稱 (中文)
    #terroir = "";     // 主要產區/莊園 (字串)
    #productName = "";  // 產品名稱 (字串)
    #flavor = "";      // 風味描述 (字串)
    #price = [];       // 價格 (陣列)

    /**
     * @param {string} id - id(英文)
     * @param {string} countryName - 國家名稱 (中文)
     * @param {string} terroir - 產區
     * @param {string} productName - 產品名稱 (字串)
     * @param {string} flavor - 風味描述
     * @param {string[]} price - 價格 (陣列)
     */
    constructor(id, countryName, terroir, productName, flavor, price) {
        this.#id = id;
        this.#countryName = countryName;
        this.#terroir = terroir;
        this.#productName = productName;
        this.#flavor = flavor;
        this.#price = price;
    }

    // Public Getters (讀取器)
    get id() {
        return this.#id;
    }

    get countryName() {
        return this.#countryName;
    }

    get productName() {
        return this.#productName;
    }

    get terroir() {
        return this.#terroir;
    }


    get flavor() {
        return this.#flavor;
    }

    get price() {
        return this.#price;
    }
}

/**
 * @class reviewInfo
 * 顧客評論卡的資料結構類別
 * 使用 Private 欄位 (#) 確保資料的封裝性 (Encapsulation)
 */
class reviewInfo {
    // 私有欄位
    #userId = "";      // 使用者帳號
    #userName = "";    // 使用者名稱
    #countryName = ""; // 國家名稱 (中文)
    #terroir = "";     // 產區
    #productName = "";  // 產品名稱
    #scoreSet = new scoreSet(0, 0, 0, 0);    // 分數陣列，1-5顆星，共四個元素，分別代表酸感、甜感、苦感、風味
    #flavor = "";      // 風味描述 (字串)


    /**
     * @param {string} userId - 使用者帳號
     * @param {string} userName - 使用者名稱
     * @param {string} countryName - 國家名稱 (中文)
     * @param {string} terroir - 產區
     * @param {string} productName - 產品名稱
     * @param {number[]} scoreSet - 分數陣列
     * @param {string} flavor - 風味描述
     */
    constructor(userId, userName, countryName, terroir, productName, scoreSet, flavor) {
        this.#userId = userId;
        this.#userName = userName;
        this.#countryName = countryName;
        this.#terroir = terroir;
        this.#productName = productName;
        this.#scoreSet = scoreSet;
        this.#flavor = flavor;
    }

    // Public Getters (讀取器)
    get userId() {
        return this.#userId;
    }

    get userName() {
        return this.#userName;
    }

    get countryName() {
        return this.#countryName;
    }

    get terroir() {
        return this.#terroir;
    }

    get productName() {
        return this.#productName;
    }

    get scoreSet() {
        return this.#scoreSet;
    }

    get flavor() {
        return this.#flavor;
    }
}

class scoreSet {
    #sourness_score = 0;
    #sweetness_score = 0;
    #bitterness_score = 0;
    #flavor_score = 0;

    constructor(sourness_score, sweetness_score, bitterness_score, flavor_score) {
        this.#sourness_score = sourness_score;
        this.#sweetness_score = sweetness_score;
        this.#bitterness_score = bitterness_score;
        this.#flavor_score = flavor_score;
    }


    get sourness_score() {
        return this.#sourness_score;
    }

    get sweetness_score() {
        return this.#sweetness_score;
    }

    get bitterness_score() {
        return this.#bitterness_score;
    }

    get flavor_score() {
        return this.#flavor_score;
    }

    set sourness_score(newScore) {
        this.#sourness_score = newScore;
    }

    set sweetness_score(newScore) {
        this.#sweetness_score = newScore;
    }

    set bitterness_score(newScore) {
        this.#bitterness_score = newScore;
    }

    set flavor_score(newScore) {
        this.#flavor_score = newScore;
    }
}

//==============================================
// 區塊 2: 核心資料庫
//==============================================

/**
 * @const {Object.<string, beanInfo>} beanInfoList
 * 儲存所有咖啡豆產地資訊的陣列。
 */
let beanInfoList = [
    new beanInfo("Ethiopia", "衣索比亞", ["耶加雪菲", "西達摩", "古吉"], "花香(如茉莉)、柑橘、莓果、茶感、層次豐富。"),
    new beanInfo("Kenya", "肯亞", ["尼耶里", "奇里尼亞加"], "濃郁果酸(似黑醋栗、葡萄柚)、醇厚、複雜甜感、香料氣息。"),
    new beanInfo("Guatemala", "瓜地馬拉 ", ["薇薇特南果", "安提瓜"], "風味均衡，酸度明亮，帶有巧克力、堅果、焦糖及水果調性。"),
    new beanInfo("CostaRica", "哥斯大黎加", ["塔拉珠", "中央谷地"], "極高乾淨度、酸甜平衡、常有柑橘、蜂蜜、焦糖風味。"),
    new beanInfo("Colombia", "哥倫比亞 ", ["薇拉", "納里尼奧"], "風味均衡、溫和水果酸、巧克力、堅果香氣，精品咖啡的經典。"),
    new beanInfo("Brazil", "巴西", ["喜拉朵", "米納斯吉拉斯"], "酸度較低，口感圓潤，以堅果、巧克力、焦糖甜感為主。"),
    new beanInfo("Indonesia", "印尼", ["蘇門答臘", "曼特寧", "爪哇"], "極低酸度，口感醇厚，帶有獨特藥草、泥土、香料氣息。")
]

/**
 * @const {Object.<string, productInfo>} productInfoList
 * 儲存所有產品資訊的陣列。
 */
let productInfoList = [
    new productInfo("Ethiopia", "衣索比亞", "耶加雪菲", "花神之春", "濃郁花香、清爽茶感", ["350", "680"]),
    new productInfo("Ethiopia_1", "衣索比亞", "西達摩", "豐收大地", "明亮果酸、水果甜感", ["400", "780"]),
    new productInfo("Kenya", "肯亞", "尼耶里", "曠野嘆息", "柑橘、濃郁巧克力", ["450", "880"]),
    new productInfo("Kenya_1", "肯亞", "奇里尼亞加", "水果派對", "黑醋栗、紅莓果、花香", ["400", "690"]),
    new productInfo("Guatemala", "瓜地馬拉 ", "薇薇特南果", "悠揚晨曦", "柑橘、莓果、花香", ["380", "750"]),
    new productInfo("CostaRica", "哥斯大黎加", "塔拉珠", "小熊維尼", "柑橘、蜂蜜、花香", ["550", "1000"]),
    new productInfo("Colombia", "哥倫比亞 ", "薇拉", "黑色跑車", "橘酸，焦糖、巧克力", ["680", "1280"]),
    new productInfo("Brazil", "巴西", "喜拉朵", "哈囉你好", "紅蘋果、蜂蜜、花香", ["480", "920"]),
    new productInfo("Brazil_1", "巴西", "米納斯吉拉斯", "火紅聖誕", "甜感、堅果、巧克力", ["500", "970"]),
    new productInfo("Indonesia", "印尼", "蘇門答臘", "獵人小屋", "煙草、藥草、黑巧克力", ["700", "1350"])
]

/**
 * @const {Object.<string, reviewInfo>} reviewInfoList
 * 儲存所有顧客評論的陣列。
 */
let reviewInfoList = [
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 4, 3, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 2, 3, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 4, 2, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 4, 3, 2), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 4, 0, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 0, 3, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(0, 4, 3, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 1, 3, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 4, 1, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 4, 3, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 4, 1, 4), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 1, 3, 1), "濃郁花香、清爽茶感"),
    new reviewInfo("iven0127", "伊凡周", "衣索比亞", "耶加雪菲", "花神之春", new scoreSet(3, 2, 2, 4), "濃郁花香、清爽茶感")
]

//==============================================
// 區塊 3: 事件初始化 (程式碼執行入口)
//==============================================

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
function initializeBeaconEvents() {
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
function initializeProductCard() {

    let wrapperDiv = $(".productWrapper");
    for (let i = 0; i < productInfoList.length; i++) {
        let slideDiv = $("<div class='productCard swiper-slide'></div>");
        let sub_img = $(`<img src=../images/product/product_${productInfoList[i].id}.jpg alt="Master's Brew">`);
        let sub_countryName = $(`<h3>${productInfoList[i].countryName} | ${productInfoList[i].terroir}</h3>`);
        let sub_productName = $(`<p><strong>${productInfoList[i].productName}</strong></p>`);
        let sub_flavor = $(`<p>${productInfoList[i].flavor}</p>`);
        let sub_price = $(`<p class = "price"><strong>NT$${productInfoList[i].price[0]} ~ NT$${productInfoList[i].price[1]}</strong></p>`);
        let sub_button = $("<p><button>加入購物車</button></p>");
        slideDiv.append(sub_img, sub_countryName, sub_productName, sub_flavor, sub_price, sub_button);
        wrapperDiv.append(slideDiv);
    }
    console.log(wrapperDiv);
}

// 初始化顧客評分卡
function initializeReviewCard() {

    let wrapperDiv = $(".reviewWrapper");
    for (let i = 0; i < reviewInfoList.length; i++) {
        let customerReview = reviewInfoList[i];
        let slideDiv = $("<div class='reviewCard swiper-slide'></div>");
        let sub_customerName = $(`<h3>${customerReview.userName}</h3>`);
        let sub_location = $(`<p>${customerReview.countryName} | ${customerReview.terroir}</p>`);
        let sub_productName = $(`<p>${customerReview.productName}</p>`);
        let sub_scoreSet = getStarElement(customerReview.scoreSet);
        let sub_flavor = $(`<p class="reviewFlavor">${customerReview.flavor}</p>`);

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
function initializeReviewSwiper() {


    initializeReviewCard();

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


//分頁跳轉事件
function initializeSwitchPageEvent() {
    document.getElementById("gotoProductPage").addEventListener("click",)
}

