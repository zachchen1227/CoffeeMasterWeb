/**
 * @class productInfo
 * 產品資訊的資料結構類別
 * 使用 Private 欄位 (#) 確保資料的封裝性 (Encapsulation)
 */
export class productInfo {
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

//==============================================
// 區塊 2: 核心資料庫
//==============================================

/**
 * @const {Object.<string, productInfo>} productInfoList
 * 儲存所有產品資訊的陣列。
 */
export let productInfoList = [
    new productInfo("Ethiopia-00", "衣索比亞", "耶加雪菲", "花神之春", "濃郁花香、清爽茶感", ["350", "680"]),
    new productInfo("Ethiopia-01", "衣索比亞", "西達摩", "豐收大地", "明亮果酸、水果甜感", ["400", "780"]),
    new productInfo("Kenya-00", "肯亞", "尼耶里", "曠野嘆息", "柑橘、濃郁巧克力", ["450", "880"]),
    new productInfo("Kenya-01", "肯亞", "奇里尼亞加", "水果派對", "黑醋栗、紅莓果、花香", ["400", "690"]),
    new productInfo("Guatemala", "瓜地馬拉 ", "薇薇特南果", "悠揚晨曦", "柑橘、莓果、花香", ["380", "750"]),
    new productInfo("CostaRica", "哥斯大黎加", "塔拉珠", "小熊維尼", "柑橘、蜂蜜、花香", ["550", "1000"]),
    new productInfo("Colombia", "哥倫比亞 ", "薇拉", "黑色跑車", "橘酸，焦糖、巧克力", ["680", "1280"]),
    new productInfo("Brazil-00", "巴西", "喜拉朵", "哈囉你好", "紅蘋果、蜂蜜、花香", ["480", "920"]),
    new productInfo("Brazil-01", "巴西", "米納斯吉拉斯", "火紅聖誕", "甜感、堅果、巧克力", ["500", "970"]),
    new productInfo("Indonesia", "印尼", "蘇門答臘", "獵人小屋", "煙草、藥草、黑巧克力", ["700", "1350"]),
]
