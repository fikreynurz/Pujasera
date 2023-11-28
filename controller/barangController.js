import Barang from "../models/barangModel.js";

export const createBarang = async (req, res) => {
    const { NamaBarang, Satuan, HargaSatuan, Stok } = req.body;

    try {
        // Get the latest KodeBarang
        const latestBarang = await Barang.findOne({
            order: [["KodeBarang", "DESC"]],
            attributes: ["KodeBarang"],
        });

        let nextIncrement = 1;

        if (latestBarang && latestBarang.KodeBarang) {
            // Extract the current increment and increment it
            const currentIncrement = parseInt(latestBarang.KodeBarang.slice(-2), 10);
            nextIncrement = (currentIncrement % 100) + 1;
        }

        // Pad the increment with leading zeros
        const paddedIncrement = nextIncrement.toString().padStart(2, "0");

        // Generate the new KodeBarang
        const newKodeBarang = `BRG211524040${paddedIncrement}`;

        const newBarang = await Barang.create({
            KodeBarang: newKodeBarang,
            NamaBarang,
            Satuan,
            HargaSatuan,
            Stok,
        });

        res.status(201).json(newBarang);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getAllBarang = async (req, res) => {
    try {
        const response = await Barang.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getBarangById = async (req, res) => {
    try {
        const { kodeBarang } = req.params;
        const barang = await Barang.findOne({
            where: { KodeBarang: kodeBarang },
        });

        if (!barang) {
            return res.status(404).json({ msg: "Barang not found" });
        }

        res.status(200).json(barang);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const updateBarang = async (req, res) => {
    try {
        const { kodeBarang } = req.params;
        const barang = await Barang.findOne({
            where: { KodeBarang: kodeBarang },
        });

        if (!barang) {
            return res.status(404).json({ msg: "Barang not found" });
        }

        await barang.update(req.body);

        res.status(200).json(barang);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const deleteBarang = async (req, res) => {
    try {
        const { kodeBarang } = req.params;
        const barang = await Barang.findOne({
            where: { KodeBarang: kodeBarang },
        });

        if (!barang) {
            return res.status(404).json({ msg: "Barang not found" });
        }

        await barang.destroy();

        res.json({ msg: "Barang deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
