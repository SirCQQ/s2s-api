import { Document } from "mongoose"

enum IOTypes {
  DATE = "date",
  STRING = "string",
  OPTIONS_WITH_STRINGS = "options_with_string",
  ROWS = "rows",
  NUMBER = "number",
}

interface IOInterface {
  type: IOTypes
  name: string
  auto?: boolean
  options?: string[]
  value: any,
  rows?: string[]

}

interface ImgInterface {
  src: string
  alt: string
}




interface EQInterface {
  maker: string
  process: string
  equipmentName: string
  model: string
  IN: IOInterface[]
  OUT: IOInterface[]
  documentation: any
  images: ImgInterface[]
  flags: any
  recommendations: string[],
  canDelete: boolean
}


// interface EqModelInterface extends EQInterface, Document { }
// interface ImgModelInterface extends ImgInterface, Document { }
// interface IOModelInterface extends IOInterface, Document { }


export { IOTypes, EQInterface, ImgInterface, IOInterface }