import express from "express";
import cors from 'cors'
import sequelize from "./sequelize.js";
import router from "./routes/index.js";

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', router)
app.use((err, req, res, next) => {
  console.error(err)
  res.json({data: err})
})
//function for starting the server
const createServer =  () => {
    return app.listen(5000, () => {
      console.log('app listening on port', + 5000)
    })
}

createServer()