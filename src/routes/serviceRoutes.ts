import { Router } from "express";
import serviceController from "../controllers/serviceController";

const router = Router();

router.route('/services')
    .get(serviceController.index)
    .post(serviceController.create);

//Para filtrar entre serviços de um preço mínimo até preço máximo:
router.get('/services/betweenTwoValues', serviceController.servicesBetweenTwoPrices);

router.route('/services/:id')
    .get(serviceController.getById)
    .put(serviceController.update)
    .delete(serviceController.delete);

    


export default router;