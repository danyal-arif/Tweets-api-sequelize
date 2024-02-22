import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('cowlar', 'cowlar', '123456', {
  host: 'localhost',
  dialect: 'postgres',
})

async function connectDB() {
  try {
    await sequelize.authenticate()
  } catch(e) {
    console.error(e)
    process.exit(1)
  }
}

connectDB()
export default sequelize
