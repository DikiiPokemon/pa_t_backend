const Router = require("express")
const router = new Router()
const Price = require("../controllers/price")

router.get("/", Price.getPrice)
router.put("/change_range", Price.changeRange)
router.put("/change_model", Price.changeModel)
router.put("/change_type", Price.changeType)
router.put("/change_long", Price.changeLong)

module.exports = router;