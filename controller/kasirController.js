import Kasir from "../models/kasirModel.js";

export const getAllKasir = async (req, res) => {
  try {
    const response = await Kasir.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getKasirById = async (req, res) => {
  try {
    const { kodeKasir } = req.params;
    const kasir = await Kasir.findOne({
      where: { KodeKasir: kodeKasir },
    });

    if (!kasir) {
      return res.status(404).json({ msg: "Kasir not found" });
    }

    res.status(200).json(kasir);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createKasir = async (req, res) => {
  const { Nama, HP } = req.body;

  try {
    // Get the latest KodeKasir
    const latestKasir = await Kasir.findOne({
      order: [["KodeKasir", "DESC"]],
      attributes: ["KodeKasir"],
    });

    let nextIncrement = 1;

    if (latestKasir && latestKasir.KodeKasir) {
      // Extract the current increment and increment it
      const currentIncrement = parseInt(latestKasir.KodeKasir.slice(-2), 10);
      nextIncrement = (currentIncrement % 100) + 1;
    }

    // Pad the increment with leading zeros
    const paddedIncrement = nextIncrement.toString().padStart(2, "0");

    // Generate the new KodeKasir
    const newKodeKasir = `KS211524040${paddedIncrement}`;

    const newKasir = await Kasir.create({
      KodeKasir: newKodeKasir,
      Nama,
      HP,
    });

    res.status(201).json(newKasir);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateKasir = async (req, res) => {
  try {
    const { kodeKasir } = req.params;
    const kasir = await Kasir.findOne({
      where: { KodeKasir: kodeKasir },
    });

    if (!kasir) {
      return res.status(404).json({ msg: "Kasir not found" });
    }

    await kasir.update(req.body);

    res.status(200).json(kasir);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteKasir = async (req, res) => {
  try {
    const { kodeKasir } = req.params;
    const kasir = await Kasir.findOne({
      where: { KodeKasir: kodeKasir },
    });

    if (!kasir) {
      return res.status(404).json({ msg: "Kasir not found" });
    }

    await kasir.destroy();

    res.json({ msg: "Kasir deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
