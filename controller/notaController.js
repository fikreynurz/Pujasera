import Nota from "../models/notaModel.js";

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
    const { KodeNota, KodeTenan, KodeKasir, TglNota, JamNota, JumlahBelanja, Diskon, Total } = req.body;

    try {
        const newNota = await Nota.create({
            KodeNota,
            KodeTenan,
            KodeKasir,
            TglNota,
            JamNota,
            JumlahBelanja,
            Diskon,
            Total,
        });

        res.status(201).json(newNota);
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
