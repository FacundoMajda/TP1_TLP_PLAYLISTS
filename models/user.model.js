import { DataTypes } from "sequelize";

export const UserModel = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
