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
    #id = ""
    #countryName = ""; // 國家名稱 (中文)
    #terroir = "";     // 主要產區/莊園 (字串)
    #flavor = "";      // 風味描述 (字串)
    #price = [];       // 價格 (陣列)

    /**
     * @param {string} countryName - 國家名稱 (中文)
     * @param {string} terroir - 產區
     * @param {string} flavor - 風味描述
     * @param {string[]} price - 產區陣列
     */
    constructor(id, countryName, terroir, flavor, price) {
        this.#id = id;
        this.#countryName = countryName;
        this.#terroir = terroir;
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



//==============================================
// 區塊 2: 核心資料庫
//==============================================

/**
 * @const {Object.<string, beanInfo>} beanInfoList
 * 儲存所有咖啡豆產地資訊的物件。
 * Key 使用 國家名稱。
 * Value 為 beanInfo 類別的實例。
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
 * @const {Object.<string, beanInfo>} productInfoList
 * 儲存所有產品資訊的物件。
 * Key 使用 國家名稱+編號。
 * Value 為 beanInfo 類別的實例。
 */
let productInfoList = [
    new productInfo("Ethiopia", "衣索比亞", "耶加雪菲", "濃郁花香、清爽茶感", ["350", "680"]),
    new productInfo("Ethiopia_1", "衣索比亞", "西達摩", "明亮果酸、水果甜感", ["400", "780"]),
    new productInfo("Kenya", "肯亞", "尼耶里", "柑橘、濃郁巧克力", ["450", "880"]),
    new productInfo("Kenya_1", "肯亞", "奇里尼亞加", "黑醋栗、紅莓果、花香", ["400", "690"]),
    new productInfo("Guatemala", "瓜地馬拉 ", "薇薇特南果", "柑橘、莓果、花香", ["380", "750"]),
    new productInfo("CostaRica", "哥斯大黎加", "塔拉珠", "柑橘、蜂蜜、花香", ["550", "1000"]),
    new productInfo("Colombia", "哥倫比亞 ", "薇拉", "橘酸，焦糖、巧克力", ["680", "1280"]),
    new productInfo("Brazil", "巴西", "喜拉朵", "紅蘋果、蜂蜜、花香", ["480", "920"]),
    new productInfo("Brazil_1", "巴西", "米納斯吉拉斯", "甜感、堅果、巧克力", ["500", "970"]),
    new productInfo("Indonesia", "印尼", "蘇門答臘", "煙草、藥草、黑巧克力。", ["700", "1350"])
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

    let wrapperDiv = $(".swiper-wrapper");


    for (let i = 0; i < productInfoList.length; i++) {
        let slideDiv = $("<div class='card swiper-slide'></div>");
        let sub_img = $(`<img src=../images/product/product_${productInfoList[i].id}.jpg alt="Master's Brew">`);
        let sub_h3 = $(`<h3>${productInfoList[i].countryName} | ${productInfoList[i].terroir}</h3>`);
        let sub_p1 = $(`<p>${productInfoList[i].flavor}</p>`);
        let sub_p2 = $(`<p class = "price"><strong>NT$${productInfoList[i].price[0]} ~ NT$${productInfoList[i].price[1]}</strong></p>`);
        let sub_p3 = $("<p><button>加入購物車</button></p>");
        slideDiv.append(sub_img, sub_h3, sub_p1, sub_p2, sub_p3);
        wrapperDiv.append(slideDiv);
    }


}


// 初始化產品卡輪播系統
function initializeProductSwiper() {

    // 初始化產品卡
    initializeProductCard()

    // 初始化輪播系統
    var swiper = new Swiper(".mySwiper", {
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
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        // Let's Make it Autoplay
        autoplay: {
            delay: 3500,
            disableOnInteraction: false
        },
        // Responsive
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });
}



