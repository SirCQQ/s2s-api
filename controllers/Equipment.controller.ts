import  {OfficialEquipmentModelController,OEqModel} from "../model/Equipment.model"
import { Request, Response } from "express"
import {validateAgainstSchemaProps} from '../Utils/ServerUtils'
class OfficialEquipmentController {

  static async getEquipment(req,res){
    res.json({ok:true,path:req.originalUrl})
  }
  static async getEquipmentById(req,res){
    let {params}= req
    res.json({ok:true,path:req.originalUrl,params})
  }

  static async createEquipment(req:Request,res:Response){
    let newEquipment= req.body.equipment
    console.log(newEquipment);
    
    validateAgainstSchemaProps(newEquipment,OEqModel);

    let createResult = await  OfficialEquipmentModelController.createOfficialEquipment(newEquipment);
    if(!createResult.ok){
      return res.status(500).json({ok:false, error:"Something went wrong. Try again! "}) 
    }
    return res.json({ok:true, newEquipment:createResult.equipment})
  }
}

export {OfficialEquipmentController}