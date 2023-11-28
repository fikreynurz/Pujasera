import express from "express";
import { createBarangNota, deleteBarangNota, getAllBarangNota, getBarangNotaById, updateBarangNota } from "../controller/barangNotaController.js";
import { createBarang, deleteBarang, getAllBarang, getBarangById, updateBarang } from "../controller/barangController.js";
import { createKasir, deleteKasir, getAllKasir, getKasirById, updateKasir } from "../controller/kasirController.js";
import { createNota, deleteNota, getAllNota, getNotaById, updateNota } from "../controller/notaController.js";
import { createTenan, deleteTenan, getAllTenan, getTenanById, updateTenan } from "../controller/tenanController.js";

const router = express.Router();

// Kelola Data Barang
router.get("/barang", getAllBarang);
router.get("/barang/:kodeBarang", getBarangById);
router.post("/barang", createBarang);
router.put("/barang/:kodeBarang", updateBarang);
router.delete("/barang/:kodeBarang", deleteBarang);

// Kelola Data Kasir
router.get("/kasir", getAllKasir);
router.get("/kasir/:kodeKasir", getKasirById);
router.post("/kasir", createKasir);
router.put("/kasir/:kodeKasir", updateKasir);
router.delete("/kasir/:kodeKasir", deleteKasir);

// Kelola Data Tenan
router.get("/tenan", getAllTenan);
router.get("/tenan/:kodeTenan", getTenanById);
router.post("/tenan", createTenan);
router.put("/tenan/:kodeTenan", updateTenan);
router.delete("/tenan/:kodeTenan", deleteTenan);

// Tambah Transaksi
router.post("/transaksi", createNota);

// Lihat Struk
router.get("/struk/:kodeNota", getNotaById);

// Barang Nota
router.get("/barangnota", getAllBarangNota);
router.get("/barangnota/:kodeNota/:kodeBarang", getBarangNotaById);
router.post("/barangnota", createBarangNota);
router.put("/barangnota/:kodeNota/:kodeBarang", updateBarangNota);
router.delete("/barangnota/:kodeNota/:kodeBarang", deleteBarangNota);

export default router;
