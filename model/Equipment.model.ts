import { Schema, model, models, Document } from "mongoose"
import {
  ImgInterface,
  IOInterface, IOTypes, EQInterface
} from '../interfaces/OfficialEquipmentInterface'
import { FunctionResponse } from '../types/Types'


const IOSchema = new Schema<IOInterface>({
  type: {
    type: String,
    enum: Object.values(IOTypes),
    default: IOTypes.DATE,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  auto: { type: Boolean },
  options: {
    type: [String]
  },
  value: { type: Schema.Types.Mixed },
  rows: [String],

})

const imgSchema = new Schema<ImgInterface>({
  src: { type: String, required: true },
  alt: { type: String, required: true }
})

const EquipmentSchema = new Schema<EQInterface>({
  maker: {
    type: String,
    required: true
  },
  process: {
    type: String, required: true
  },
  equipmentName: {
    type: String, required: true
  },
  model: {
    type: String, required: true
  },
  IN: { type: [IOSchema], required: true },
  OUT: { type: [IOSchema], required: true },
  documentation: { type: Object, required: true },
  images: { type: [imgSchema], required: true },
  flags: { type: Schema.Types.Mixed },
  recommendations: { type: [String], required: true },
  // canDelete: {type:Boolean,}

})
// export default model("EquipmentOfficialList", equipmentSchema)
const OEqModel =
  // models.EquipmentOfficial ||
  <EQInterface>model("EquipmentOfficial", EquipmentSchema)

class OfficialEquipmentModelController {

  static async createOfficialEquipment(equipment: EQInterface): Promise<FunctionResponse> {

    let newEquipment = new OEqModel(equipment)
    try {
      const createdEquipment: EQInterface = await newEquipment.save()
      console.log(createdEquipment)
      return <FunctionResponse>{ ok: true, equipment: createdEquipment }
    }
    catch (e) {
      return <FunctionResponse>{ ok: false, error: e }
    }


  }
}


export { OfficialEquipmentModelController, OEqModel }