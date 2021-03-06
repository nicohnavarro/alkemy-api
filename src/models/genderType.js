import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
// import Movie from "./movie.js";
const { DataTypes } = pkg;

const GenderType = sequelize.define("genderTypes", {
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
},{
  timestamps: false
});

export default GenderType;
