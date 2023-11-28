// barangModel.js
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Barang = db.sequelize.define(
    "barang",
    {
        KodeBarang: {
            type: DataTypes.STRING,
            primaryKey: true,
            // autoIncrement: true,
            allowNull: false,
        },
        NamaBarang: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Satuan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        HargaSatuan: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        Stok: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

export default Barang;