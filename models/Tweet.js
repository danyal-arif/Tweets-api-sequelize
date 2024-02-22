import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize.js";
import User from "./User.js";


const Tweet = sequelize.define('Tweet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    }
  }, 
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {type: DataTypes.DATE},
  updatedAt: {type: DataTypes.DATE},
})

User.hasMany(sequelize.models.Tweet, {
  as: 'tweets',
  foreignKey: 'userid',
  onDelete: 'CASCADE'
})
Tweet.belongsTo(sequelize.models.User, {
  as: 'user',
  foreignKey: 'userid',
  onDelete: 'CASCADE'
})

export default Tweet