import Tenan from "../models/tenanModel.js";

export const getAllTenan = async (req, res) => {
  try {
    const response = await Tenan.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTenanById = async (req, res) => {
  try {
    const { kodeTenan } = req.params;
    const tenan = await Tenan.findOne({
      where: { KodeTenan: kodeTenan },
    });

    if (!tenan) {
      return res.status(404).json({ msg: "Tenan not found" });
    }

    res.status(200).json(tenan);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createTenan = async (req, res) => {
  const { NamaTenan, HP } = req.body;

  try {
    // Get the latest KodeTenan
    const latestTenan = await Tenan.findOne({
      order: [["KodeTenan", "DESC"]],
      attributes: ["KodeTenan"],
    });

    let nextIncrement = 1;

    if (latestTenan && latestTenan.KodeTenan) {
      // Extract the current increment and increment it
      const currentIncrement = parseInt(latestTenan.KodeTenan.slice(-2), 10);
      nextIncrement = (currentIncrement % 100) + 1;
    }

    // Pad the increment with leading zeros
    const paddedIncrement = nextIncrement.toString().padStart(2, "0");

    // Generate the new KodeTenan
    const newKodeTenan = `TK211524040${paddedIncrement}`;

    const newTenan = await Tenan.create({
      KodeTenan: newKodeTenan,
      NamaTenan,
      HP,
    });

    res.status(201).json(newTenan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateTenan = async (req, res) => {
  try {
    const { kodeTenan } = req.params;
    const tenan = await Tenan.findOne({
      where: { KodeTenan: kodeTenan },
    });

    if (!tenan) {
      return res.status(404).json({ msg: "Tenan not found" });
    }

    await tenan.update(req.body);

    res.status(200).json(tenan);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteTenan = async (req, res) => {
  try {
    const { kodeTenan } = req.params;
    const tenan = await Tenan.findOne({
      where: { KodeTenan: kodeTenan },
    });

    if (!tenan) {
      return res.status(404).json({ msg: "Tenan not found" });
    }

    await tenan.destroy();

    res.json({ msg: "Tenan deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
