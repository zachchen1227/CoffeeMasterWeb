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

    static getDataFromJson(jsonArray) {
        let dataList = [];

        for (let i = 0; i < jsonArray.length; i++) {
            let jsondata = jsonArray[i];

            let myInfo = new beanInfo(
                jsondata.id,
                jsondata.countryName,
                jsondata.terroir,
                jsondata.flavor
            );

            dataList.push(myInfo);
        }
        return dataList;
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
export class productInfo {
    // 私有欄位
    #id = ""; // 英文id
    #countryName = ""; // 國家名稱 (中文)
    #terroir = "";     // 主要產區/莊園 (字串)
    #productName = "";  // 產品名稱 (字串)
    #flavor = "";      // 風味描述 (字串)
    #price = "";       // 價格

    /**
     * @param {string} id - id(英文)
     * @param {string} countryName - 國家名稱 (中文)
     * @param {string} terroir - 產區
     * @param {string} productName - 產品名稱 (字串)
     * @param {string} flavor - 風味描述
     * @param {string} price - 價格 
     */
    constructor(id, countryName, terroir, productName, flavor, price) {
        this.#id = id;
        this.#countryName = countryName;
        this.#terroir = terroir;
        this.#productName = productName;
        this.#flavor = flavor;
        this.#price = price;
    }

    static getDataFromJson(jsonArray) {
        let dataList = [];

        for (let i = 0; i < jsonArray.length; i++) {
            let jsondata = jsonArray[i];

            let myInfo = new productInfo(
                jsondata.id,
                jsondata.countryName,
                jsondata.terroir,
                jsondata.productName,
                jsondata.flavor,
                jsondata.price);

            dataList.push(myInfo);
        }
        return dataList;
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

    static getDataFromJson(jsonArray) {
        let dataList = [];

        for (let i = 0; i < jsonArray.length; i++) {
            let jsondata = jsonArray[i];
            
            let myInfo = new reviewInfo(
                jsondata.userId,
                jsondata.userName,
                jsondata.countryName,
                jsondata.terroir,
                jsondata.productName,
                new scoreSet(
                    jsondata.scoreSet.sourness_score,
                    jsondata.scoreSet.sweetness_score,
                    jsondata.scoreSet.bitterness_score,
                    jsondata.scoreSet.flavor_score),
                jsondata.flavor);


            dataList.push(myInfo);
        }
        return dataList;
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
// 區塊 2: 從資料庫載入資料
//==============================================

// 取得BeanInfo資料
export async function GetBeanInfoData(url) {
    let dataList = await getData(beanInfo, url);
    return dataList;
}

// 取得ProductInfo資料
export async function GetProductInfoData(url) {
    let dataList = await getData(productInfo, url);
    return dataList;
}

// 取得ReviewInfo資料
export async function GetReviewInfoData(url) {
    let dataList = await getData(reviewInfo, url);
    return dataList;
}

//使用fetch從資料庫讀取資料
async function getData(dataType, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        let dataList = dataType.getDataFromJson(result);
        return dataList;
    } catch (error) {
        console.error(error.message);
    }
}





