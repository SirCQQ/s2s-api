import  {Router}from "express"
import {OfficialEquipmentController} from "../controllers/Equipment.controller"

const router= Router()

router.get('/',OfficialEquipmentController.getEquipment)

router.get('/:id',OfficialEquipmentController.getEquipmentById)

router.post('/',OfficialEquipmentController.createEquipment);

export default router