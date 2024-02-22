import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize.js";


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,   
    set(val) {
      this.setDataValue('firstName', val.substring(0, 1).toUpperCase() + val.substring(1))
    } 
  },
  lastName: {
    type: DataTypes.STRING,
    set(val) {
      this.setDataValue('lastName', val.substring(0, 1).toUpperCase() + val.substring(1))
    } 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`
    },
    set(val) {
      throw new Error('Unable to set a virtual field!')
    }
  }
})



export default User