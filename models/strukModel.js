// strukModel.js
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Struk = db.sequelize.define(
    "struk",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        NamaBarang: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        JumlahBarang: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        HargaSatuan: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        Total: {
            type: DataTypes.VIRTUAL,
            get() {
                // Kalkulasi total dari NamaBarang, JumlahBarang, dan HargaSatuan
                const namaBarang = this.getDataValue('NamaBarang');
                const jumlahBarang = this.getDataValue('JumlahBarang');
                const hargaSatuan = this.getDataValue('HargaSatuan');
                
                let total = 0;

                for (let i = 0; i < namaBarang.length; i++) {
                    total += parseFloat(jumlahBarang[i]) * parseFloat(hargaSatuan[i]);
                }

                return total;
            },
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);

export default Struk;
