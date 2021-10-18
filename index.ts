import dotenv from 'dotenv'
import express,{Request,Response} from 'express';
import {connectToDb} from './Utils/database'
import {OfficialEquipmentRouter} from './routes/'
dotenv.config()

const PORT = process.env.PORT || 3001
const app = express()
app.use(express.json())

// Routes



app.get('/',(req:Request,res:Response)=>{
  res.json({ok:true})
})


app.use('/api/v1/official-equipment',OfficialEquipmentRouter)

connectToDb()
  .catch(err => {
    console.error('[connectToDB]', err);
    throw true;
  })
  .then(() => {
    console.log("Connected to db")
    app.listen(PORT,()=>{
      console.log(`Application running on server http://localhost:${PORT}`)
    })
    
  })
  .catch(() => console.log('Server failed to start.'))
