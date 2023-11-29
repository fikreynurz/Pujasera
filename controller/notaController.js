import Nota from "../models/notaModel.js";
import Tenan from "../models/tenanModel.js";
import Kasir from "../models/kasirModel.js";

export const getAllNota = async (req, res) => {
    try {
        const response = await Nota.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getNotaById = async (req, res) => {
    try {
        const { kodeNota } = req.params;
        const nota = await Nota.findByPk(kodeNota);

        if (!nota) {
            return res.status(404).json({ msg: "Nota not found" });
        }

        res.status(200).json(nota);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const createNota = async (req, res) => {
    const { KodeTenan, KodeKasir, TglNota, JumlahBelanja, Diskon, NamaTenan, NamaKasir } = req.body;

    try {
        // Find the associated Tenan and Kasir
        const tenan = await Tenan.findOne({ where: { KodeTenan } });
        const kasir = await Kasir.findOne({ where: { KodeKasir } });

        if (!tenan || !kasir) {
            return res.status(404).json({ msg: "Tenan or Kasir not found" });
        }

        // Get the latest KodeNota
        const latestNota = await Nota.findOne({
            order: [["KodeNota", "DESC"]],
            attributes: ["KodeNota"],
        });

        let nextIncrement = 1;

        if (latestNota && latestNota.KodeNota) {
            // Extract the current increment and increment it
            const currentIncrement = parseInt(latestNota.KodeNota.slice(-2), 10);
            nextIncrement = (currentIncrement % 100) + 1;
        }

        // Pad the increment with leading zeros
        const paddedIncrement = nextIncrement.toString().padStart(2, "0");

        // Generate the new KodeNota
        const newKodeNota = `NO211524040${paddedIncrement}`;

        // Calculate Total based on JumlahBelanja and Diskon
        const Total = JumlahBelanja - (JumlahBelanja * Diskon) / 100;

        // Create the new Nota
        const newNota = await Nota.create({
            KodeNota: newKodeNota,
            KodeTenan,
            KodeKasir,
            TglNota,
            JumlahBelanja,
            Diskon,
            Total,
            NamaTenan, // Pastikan nilai NamaTenan ada
            NamaKasir, // Pastikan nilai NamaKasir ada
        });

        // Prepare the response object with additional details
        const response = {
            KodeTenan,
            NamaTenan: tenan.NamaTenan,
            NamaKasir: kasir.Nama,
            TglNota,
            JumlahBelanja,
            Diskon,
            Total,
        };

        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const updateNota = async (req, res) => {
    try {
        const { kodeNota } = req.params;
        const nota = await Nota.findByPk(kodeNota);

        if (!nota) {
            return res.status(404).json({ msg: "Nota not found" });
        }

        await nota.update(req.body);

        res.status(200).json(nota);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const deleteNota = async (req, res) => {
    try {
        const { kodeNota } = req.params;
        const nota = await Nota.findByPk(kodeNota);

        if (!nota) {
            return res.status(404).json({ msg: "Nota not found" });
        }

        await nota.destroy();

        res.json({ msg: "Nota deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
