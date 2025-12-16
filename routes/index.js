const Router = require("express")
const router = new Router()
const products_routes = require("./products_routes")

router.use("/products", products_routes)

module.exports = router