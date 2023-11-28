// barangNotaModel.js
import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Nota from "./notaModel.js";
import Barang from "./barangModel.js";

const BarangNota = db.sequelize.define(
    "barangnota",
    {
        KodeNota: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: Nota,
                key: "KodeNota",
            },
            allowNull: false,
        },
        KodeBarang: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: Barang,
                key: "KodeBarang",
            },
            allowNull: false,
        },
        JumlahBarang: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        HargaSatuan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Jumlah: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

export default BarangNota;

// (async () => {
//     await BarangNota.sync({ force: true });
// })();
