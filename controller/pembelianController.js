// pembelianController.js
import Barang from "../models/barangModel.js";
import Nota from "../models/notaModel.js";
import Struk from "../models/strukModel.js";

// Fungsi untuk membuat transaksi pembelian
const beliBarang = async (req, res) => {
    try {
        // Mendapatkan data dari request body
        const { KodeNota, NamaTenan, NamaKasir, TglNota, NamaBarang, JumlahBarang, Diskon } = req.body;

        // Membuat nota baru
        const nota = await Nota.create({
            KodeNota,
            NamaTenan,
            NamaKasir,
            TglNota,
            JumlahBelanja: calculateTotal(JumlahBarang, await getHargaSatuan(NamaBarang)),
            Diskon,
            Total: 0, // Total akan dihitung setelah transaksi selesai
        });

        // Membuat struk baru
        const struk = await Struk.create({
            NotaId: nota.id, // Menggunakan id nota yang baru saja dibuat
            NamaBarang,
            JumlahBarang,
            HargaSatuan: await getHargaSatuan(NamaBarang),
        });

        // Menghitung total belanja
        const totalBelanja = calculateTotal(JumlahBarang, struk.HargaSatuan);

        // Memperbarui total pada nota
        await nota.update({ Total: totalBelanja });

        res.status(201).json({ message: "Transaksi berhasil", struk });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

// Fungsi untuk menghitung total belanja
const calculateTotal = (jumlahBarang, hargaSatuan) => {
    let total = 0;

    for (let i = 0; i < jumlahBarang.length; i++) {
        total += parseFloat(jumlahBarang[i]) * parseFloat(hargaSatuan);
    }

    return total;
};

// Fungsi untuk mendapatkan harga satuan barang dari model Barang
const getHargaSatuan = async (namaBarang) => {
    try {
        const barang = await Barang.findOne({ where: { NamaBarang: namaBarang } });

        if (barang) {
            return barang.HargaSatuan;
        } else {
            throw new Error("Barang tidak ditemukan");
        }
    } catch (error) {
        throw error;
    }
};

export { beliBarang };
