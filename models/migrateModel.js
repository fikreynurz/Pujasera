// migrateModel.js
import Nota from "./notaModel.js";
import Barang from "./barangModel.js";
import Kasir from "./kasirModel.js";
import Tenan from "./tenanModel.js";
import BarangNota from "./barangNotaModel.js";

(async () => {
  // Define and sync models in the appropriate order
  await Barang.sync({ force: true });
  await Kasir.sync({ force: true });
  await Tenan.sync({ force: true });
  await Nota.sync({ force: true });
  await BarangNota.sync({ force: true });
})();
