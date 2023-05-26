const product = require("../models/product");

const getAllProducts = async (req, res) => {
    const { company, name, featured, sort, select } = req.query;
    const queryObject = {};
    if (company) {
        queryObject.company = company;
    }
    if (featured) {
        queryObject.featured = featured;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    let apiData = product.find(queryObject);
    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }
    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit) || 10;
    let skip=(page-1)*limit;

    apiData=apiData.skip(skip).limit(limit);

    console.log(queryObject);
    const ListedProducts = await apiData;
    res.status(200).json({ ListedProducts, nHbits:ListedProducts.length })
};

const getAllProductsTesting = async (req, res) => {
    const ListedProducts = await product.find(req.query).select("price name");
    res.status(200).json({ ListedProducts })
};


module.exports = { getAllProducts, getAllProductsTesting }