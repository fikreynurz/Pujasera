import BarangNota from "../models/barangNotaModel.js";
import Barang from "../models/barangModel.js";
import Nota from "../models/notaModel.js";

export const getAllBarangNota = async (req, res) => {
    try {
        const response = await BarangNota.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getBarangNotaById = async (req, res) => {
    try {
        const { kodeNota, kodeBarang } = req.params;
        const barangNota = await BarangNota.findOne({
            where: { KodeNota: kodeNota, KodeBarang: kodeBarang },
        });

        if (!barangNota) {
            return res.status(404).json({ msg: "BarangNota not found" });
        }

        res.status(200).json(barangNota);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const createBarangNota = async (req, res) => {
    const { KodeNota, KodeBarang, JumlahBarang } = req.body;

    try {
        const nota = await Nota.findOne({
            where: { KodeNota: KodeNota },
        });

        if (!nota) {
            return res.status(404).json({ msg: "Nota not found" });
        }

        // Ubah cara mencari barang agar sesuai dengan perubahan di model
        const barang = await Barang.findOne({
            where: { KodeBarang: KodeBarang },
        });

        if (!barang || barang.HargaSatuan === null) {
            return res.status(404).json({ msg: "Barang not found or HargaSatuan is null" });
        }

        const { HargaSatuan, Stok, NamaBarang } = barang;
        const Jumlah = JumlahBarang * HargaSatuan;

        const newBarangNota = await BarangNota.create({
            KodeNota,
            KodeBarang,
            NamaBarang,
            JumlahBarang,
            HargaSatuan,
            Jumlah,
        });

        // Ubah cara mengupdate stok
        await barang.update({ Stok: Stok - JumlahBarang });

        res.status(201).json(newBarangNota);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const updateBarangNota = async (req, res) => {
    try {
        const { kodeNota, kodeBarang } = req.params;
        const barangNota = await BarangNota.findOne({
            where: { KodeNota: kodeNota, KodeBarang: kodeBarang },
        });

        if (!barangNota) {
            return res.status(404).json({ msg: "BarangNota not found" });
        }

        await barangNota.update(req.body);

        res.status(200).json(barangNota);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const deleteBarangNota = async (req, res) => {
    try {
        const { kodeNota, kodeBarang } = req.params;
        const barangNota = await BarangNota.findOne({
            where: { KodeNota: kodeNota, KodeBarang: kodeBarang },
        });

        if (!barangNota) {
            return res.status(404).json({ msg: "BarangNota not found" });
        }

        await barangNota.destroy();

        res.json({ msg: "BarangNota deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
