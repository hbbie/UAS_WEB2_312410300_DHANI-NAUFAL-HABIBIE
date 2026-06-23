import api from '../js/api.js'

export default {
    data() {
        return {
            kategori: [],
            search: '', // State untuk menyimpan teks pencarian
            editMode: false,
            editId: null,
            form: {
                nama_kategori: '',
                kode_kategori: '',
                deskripsi: ''
            }
        }
    },
    computed: {
        // Menghitung jumlah kategori yang muncul sesuai hasil pencarian
        totalKategori() {
            return this.filteredKategori.length
        },
        // Fungsi filter pencarian real-time
        filteredKategori() {
            return this.kategori.filter(item => {
                // Mengambil nilai text dan antisipasi jika field di database sedikit berbeda
                const nama = item.nama_kategori?.toLowerCase() || ''
                const kode = (item.kode_kategori || item.kode || '').toLowerCase()
                const deskripsi = (item.deskripsi || item.keterangan || '').toLowerCase()
                const cari = this.search.toLowerCase()
                
                // Pencarian akan mencocokkan nama, kode, atau deskripsi
                return nama.includes(cari) || kode.includes(cari) || deskripsi.includes(cari)
            })
        }
    },
    mounted() {
        this.getKategori()
    },
    methods: {
        async getKategori() {
            try {
                const response = await api.get('/kategori')
                this.kategori = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async tambahKategori() {
            try {
                await api.post('/kategori', this.form)
                alert('Kategori berhasil ditambahkan')
                this.getKategori()
                this.form = { nama_kategori: '', kode_kategori: '', deskripsi: '' }
            } catch (error) {
                console.log(error)
                alert(error.response?.data?.message || 'Gagal menambahkan kategori')
            }
        },
        editKategori(item) {
            this.editMode = true
            this.editId = item.id
            this.form = {
                nama_kategori: item.nama_kategori,
                kode_kategori: item.kode_kategori || item.kode,
                deskripsi: item.deskripsi || item.keterangan
            }
        },
        async updateKategori() {
            try {
                await api.put('/kategori/' + this.editId, this.form)
                alert('Kategori berhasil diubah')
                this.getKategori()
                this.editMode = false
                this.editId = null
                this.form = { nama_kategori: '', kode_kategori: '', deskripsi: '' }
            } catch (error) {
                console.log(error)
                alert(error.response?.data?.message || 'Gagal mengubah kategori')
            }
        },
        async hapusKategori(id) {
            if (!confirm('Yakin ingin menghapus kategori ini?')) return
            try {
                await api.delete('/kategori/' + id)
                alert('Kategori berhasil dihapus')
                this.getKategori()
            } catch (error) {
                console.log(error)
                alert(error.response?.data?.message || 'Gagal menghapus kategori')
            }
        }
    },
    template: `
    <div class="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 md:p-6 space-y-6">
        <div class="max-w-[1600px] mx-auto space-y-6">
            
            <div class="flex flex-col md:flex-row md:justify-between md:items-center bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 gap-4">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="bg-emerald-500/20 text-emerald-400 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-emerald-500/30">Inventaris & Stok</span>
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <h1 class="text-2xl font-black tracking-tight mt-2 flex items-center gap-2">
                        🗂️ Direktori Kategori Produk
                    </h1>
                </div>
                <router-link
                    to="/dashboard"
                    class="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-5 py-3 rounded-xl font-bold tracking-wide border border-slate-700 shadow-md transition-all text-center"
                >
                    ← Kembali ke Konsol Utama
                </router-link>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                    <div>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Kategori Aktif</p>
                        <h3 class="text-2xl font-black text-slate-900 mt-1">{{ totalKategori }} <span class="text-xs font-normal text-slate-400">Kelompok</span></h3>
                    </div>
                    <div class="bg-emerald-50 text-emerald-600 p-3 rounded-lg font-bold text-xl">🗂️</div>
                </div>
                
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between opacity-85">
                    <div>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Struktur Inventaris</p>
                        <h3 class="text-base font-bold text-emerald-600 mt-2 flex items-center gap-1">
                            <span>Hierarki Terorganisir</span>
                        </h3>
                    </div>
                    <div class="text-slate-300 text-xl">🏷️</div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between opacity-85">
                    <div>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Relasi Produk</p>
                        <h3 class="text-xs text-slate-500 mt-2 leading-tight">Otomatis mengelompokkan barang berdasarkan ID Kategori</h3>
                    </div>
                    <div class="text-slate-300 text-xl">📦</div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div class="lg:col-span-4 space-y-6">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                            <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {{ editMode ? '⚡ Amandemen Kategori' : '✨ Pendaftaran Kategori Baru' }}
                            </h2>
                            <span :class="editMode ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'" class="text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                {{ editMode ? 'Mode Edit' : 'Mode Tambah' }}
                            </span>
                        </div>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Kode Kategori</label>
                                <input
                                    v-model="form.kode_kategori"
                                    placeholder="Contoh: ELEK-01, MAKAN-02"
                                    class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                                >
                            </div>

                            <div>
                                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nama Kategori</label>
                                <input
                                    v-model="form.nama_kategori"
                                    placeholder="Contoh: Elektronik, Bahan Makanan"
                                    class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                                >
                            </div>

                            <div>
                                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Deskripsi Kategori</label>
                                <textarea
                                    v-model="form.deskripsi"
                                    rows="3"
                                    placeholder="Masukkan deskripsi atau cakupan kategori barang..."
                                    class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium resize-none"
                                ></textarea>
                            </div>
                            
                            <div class="pt-2">
                                <button
                                    v-if="!editMode"
                                    @click="tambahKategori"
                                    class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition duration-200 transform active:scale-98"
                                >
                                    Simpan Kategori
                                </button>
                                <button
                                    v-else
                                    @click="updateKategori"
                                    class="w-full bg-amber-500 hover:bg-amber-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/20 transition duration-200 transform active:scale-98"
                                >
                                    Perbarui Kategori
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-2xl shadow-md border border-slate-800 text-xs space-y-2">
                        <h4 class="font-bold text-emerald-400 flex items-center justify-between">
                            <span>📜 Standardisasi Inventaris</span>
                        </h4>
                        <p class="text-slate-400 leading-relaxed">
                            Pengelompokan kategori yang konsisten membantu efisiensi proses stock opname, penempatan rak gudang, dan mempermudah pencarian aset produk.
                        </p>
                    </div>
                </div>

                <div class="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    
                    <div class="p-4 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                        <div class="flex items-center space-x-2 w-full md:w-72">
                            <span class="text-slate-400">🔍</span>
                            <input 
                                v-model="search" 
                                placeholder="Cari nama atau kode kategori..." 
                                class="bg-white border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            >
                        </div>
                        <div class="text-[11px] text-slate-400 font-medium">
                            Status Basis Data: <span class="text-emerald-600 font-bold">Sinkron (Live)</span>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                                    <th class="p-4 text-center w-20">ID</th>
                                    <th class="p-4 w-32">Kode</th>
                                    <th class="p-4">Nama Kategori</th>
                                    <th class="p-4">Deskripsi</th>
                                    <th class="p-4 text-center w-40">Operasi</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm divide-y divide-slate-100">
                                <tr v-if="filteredKategori.length === 0">
                                    <td colspan="5" class="text-center p-12 text-slate-400 italic">
                                        🚨 Tidak ada data kategori yang cocok atau terdaftar.
                                    </td>
                                </tr>
                                <tr
                                    v-for="item in filteredKategori"
                                    :key="item.id"
                                    class="hover:bg-emerald-50/20 transition-colors group"
                                >
                                    <td class="p-4 text-center font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                                        #{{ item.id }}
                                    </td>
                                    <td class="p-4 font-mono text-xs font-bold text-slate-700">
                                        {{ item.kode_kategori || item.kode || '-' }}
                                    </td>
                                    <td class="p-4 font-bold text-slate-800 tracking-tight">
                                        {{ item.nama_kategori }}
                                    </td>
                                    <td class="p-4 text-xs text-slate-500 max-w-xs truncate">
                                        {{ item.deskripsi || item.keterangan || '-' }}
                                    </td>
                                    <td class="p-4 text-center space-x-1.5">
                                        <button
                                            @click="editKategori(item)"
                                            class="bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-700 text-xs px-3 py-1.5 rounded-xl font-bold transition-all border border-amber-200/50"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            @click="hapusKategori(item.id)"
                                            class="bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-xs px-3 py-1.5 rounded-xl font-bold transition-all border border-rose-200/50"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
                        <div>Terbaca <span class="font-bold text-slate-700">{{ filteredKategori.length }}</span> kategori terfilter.</div>
                        <div class="font-mono text-[10px]">Node: Inventory_Cluster</div>
                    </div>

                </div>
            </div>

        </div>
    </div>
    `
}