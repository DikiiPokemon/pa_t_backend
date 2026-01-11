const Router = require("express")
const router = new Router()
const products_routes = require("./products_routes")
const price_routes = require("./price_routes")

router.use("/products", products_routes)
router.use("/price", price_routes)

module.exports = router