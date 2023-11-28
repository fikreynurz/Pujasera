// notaModel.js
import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Tenan from "./tenanModel.js";
import Kasir from "./kasirModel.js";

const Nota = db.sequelize.define(
  "nota",
  {
    KodeNota: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    KodeTenan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    KodeKasir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TglNota: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    JumlahBelanja: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Diskon: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Nota.belongsTo(Tenan, {
  foreignKey: "KodeTenan",
  targetKey: "KodeTenan", // Specify the target key data type
});

Nota.belongsTo(Kasir, {
  foreignKey: "KodeKasir",
  targetKey: "KodeKasir", // Specify the target key data type
});

export default Nota;
