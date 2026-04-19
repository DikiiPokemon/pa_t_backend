const Router = require("express")
const router = new Router()
const Price = require("../controllers/price")

router.get("/", Price.getPrice)
router.get("/bdt_bfs", Price.getPriceBDT_BFS)
router.put("/change_model", Price.changeModel)
router.put("/change_type", Price.changeType)
router.put("/change_long", Price.changeLong)

module.exports = router;