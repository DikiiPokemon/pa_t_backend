const Router = require("express")
const router = new Router()
const Products = require("../controllers/products")

router.get("/", Products.getAll)
router.get("/get_mods", Products.getMods)

module.exports = router;