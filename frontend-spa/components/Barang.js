import api from '../js/api.js'

export default {
    data() {
        return {
            barang: [],
            editMode: false,
            editId: null,
            form: {
                nama_barang: '',
                stok: '',
                harga: '',
                kategori_id: '',
                supplier_id: ''
            }
        }
    },
    computed: {
        // Menghitung statistik dinamis berdasarkan data barang yang ada
        totalSKU() {
            return this.barang.length
        },
        totalStok() {
            return this.barang.reduce((sum, item) => sum + Number(item.stok || 0), 0)
        },
        totalAset() {
            return this.barang.reduce((sum, item) => sum + (Number(item.stok || 0) * Number(item.harga || 0)), 0)
        }
    },
    mounted() {
        this.getBarang()
    },
    methods: {
        async getBarang() {
            try {
                const response = await api.get('/barang')
                this.barang = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async tambahBarang() {
            try {
                await api.post('/barang', this.form)
                alert('Barang berhasil ditambahkan')
                this.getBarang()
                this.form = { nama_barang: '', stok: '', harga: '', kategori_id: '', supplier_id: '' }
            } catch (error) {
                console.log(error)
                alert(error.response?.data?.message || 'Gagal menambahkan barang')
            }
        },
        async updateBarang() {
            try {
                await api.put('/barang/' + this.editId, this.form)
                alert('Barang berhasil diubah')
                this.getBarang()
                this.editMode = false
                this.editId = null
                this.form = { nama_barang: '', stok: '', harga: '', kategori_id: '', supplier_id: '' }
            } catch (error) {
                console.log(error)
                alert(error.response?.data?.message || 'Gagal mengubah barang')
            }
        },
        async hapusBarang(id) {
            if (!confirm('Yakin ingin menghapus?')) return
            try {
                await api.delete('/barang/' + id)
                alert('Barang berhasil dihapus')
                this.getBarang()
            } catch (error) {
                console.log(error)
                alert(error.response?.data?.message || 'Gagal menghapus barang')
            }
        },
        editBarang(item) {
            this.editMode = true
            this.editId = item.id
            this.form = {
                nama_barang: item.nama_barang,
                stok: item.stok,
                harga: item.harga,
                kategori_id: item.kategori_id,
                supplier_id: item.supplier_id
            }
        }
    },
    template: `
    <div class="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 md:p-6 space-y-6">
        <div class="max-w-[1600px] mx-auto space-y-6">
            
            <div class="flex flex-col md:flex-row md:justify-between md:items-center bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 gap-4">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="bg-indigo-500/20 text-indigo-400 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-indigo-500/30">Gudang A Utama</span>
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <h1 class="text-2xl font-black tracking-tight mt-2 flex items-center gap-2">
                        📦 Kontrol Inventaris & SKU Barang
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
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Item Unik (SKU)</p>
                        <h3 class="text-2xl font-black text-slate-900 mt-1">{{ totalSKU }} <span class="text-xs font-normal text-slate-400">Barang</span></h3>
                    </div>
                    <div class="bg-blue-50 text-blue-600 p-3 rounded-lg font-bold text-xl">📊</div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                    <div>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Akumulasi Stok Fisik</p>
                        <h3 class="text-2xl font-black text-slate-900 mt-1">{{ totalStok }} <span class="text-xs font-normal text-slate-400">Pcs</span></h3>
                    </div>
                    <div class="bg-emerald-50 text-emerald-600 p-3 rounded-lg font-bold text-xl">📦</div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                    <div>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Estimasi Nilai Aset Gudang</p>
                        <h3 class="text-2xl font-black text-indigo-600 mt-1">Rp {{ totalAset.toLocaleString('id-ID') }}</h3>
                    </div>
                    <div class="bg-indigo-50 text-indigo-600 p-3 rounded-lg font-bold text-xl">💰</div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div class="lg:col-span-4 space-y-6">
                    
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                            <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {{ editMode ? '⚡ Edit Properti SKU' : '✨ Entri Komoditas Baru' }}
                            </h2>
                            <span :class="editMode ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'" class="text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                {{ editMode ? 'Mode Edit' : 'Mode Tambah' }}
                            </h2>
                        </div>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Deskripsi Nama Barang</label>
                                <input
                                    v-model="form.nama_barang"
                                    placeholder="Masukkan nama spesifikasi barang..."
                                    class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                >
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Volume Stok</label>
                                    <input
                                        v-model="form.stok"
                                        type="number"
                                        placeholder="0"
                                        class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                    >
                                </div>
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Harga Pokok (Rp)</label>
                                    <input
                                        v-model="form.harga"
                                        type="number"
                                        placeholder="0"
                                        class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                    >
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Relasi Kategori ID</label>
                                    <input
                                        v-model="form.kategori_id"
                                        type="number"
                                        placeholder="ID"
                                        class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                    >
                                </div>
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Relasi Supplier ID</label>
                                    <input
                                        v-model="form.supplier_id"
                                        type="number"
                                        placeholder="ID"
                                        class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                    >
                                </div>
                            </div>
                            
                            <div class="pt-2">
                                <button
                                    v-if="!editMode"
                                    @click="tambahBarang"
                                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 transition duration-200 transform active:scale-98"
                                >
                                    Simpan ke Database
                                </button>
                                <button
                                    v-else
                                    @click="updateBarang"
                                    class="w-full bg-amber-500 hover:bg-amber-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/20 transition duration-200 transform active:scale-98"
                                >
                                    Simpan Perubahan Data
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-md border border-slate-800 text-xs space-y-3">
                        <h4 class="font-bold text-indigo-300 flex items-center justify-between">
                            <span>📋 Aturan Validasi Input</span>
                            <span class="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">SOP</span>
                        </h4>
                        <p class="text-slate-400 leading-relaxed">
                            Pastikan data <b class="text-white">Kategori ID</b> dan <b class="text-white">Supplier ID</b> sudah terdaftar terlebih dahulu di master data masing-masing untuk mencegah kegagalan <i class="text-amber-400">Foreign Key Constraint</i> database.
                        </p>
                    </div>

                </div>

                <div class="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    
                    <div class="p-4 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                        <div class="flex items-center space-x-2 w-full md:w-72">
                            <span class="text-slate-400">🔍</span>
                            <input placeholder="Cari SKU atau nama barang cepat..." class="bg-white border p-2 rounded-lg w-full focus:outline-none focus:border-indigo-500" disabled>
                        </div>
                        <div class="flex items-center space-x-2 font-medium text-slate-500 self-end md:self-auto">
                            <span>Status Filter:</span>
                            <span class="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-bold">Semua Data</span>
                            <span class="bg-white border px-2.5 py-1 rounded-md hover:bg-slate-100 cursor-not-allowed">Stok Tersedia</span>
                            <span class="bg-white border px-2.5 py-1 rounded-md hover:bg-slate-100 cursor-not-allowed">Stok Kosong</span>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                                    <th class="p-4 text-center w-16">ID</th>
                                    <th class="p-4">Spesifikasi Komoditas</th>
                                    <th class="p-4 text-center w-24">Stok Fisik</th>
                                    <th class="p-4 w-36">Nilai Satuan</th>
                                    <th class="p-4 text-center w-40">Aksi Relasional</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm divide-y divide-slate-100">
                                <tr v-if="barang.length === 0">
                                    <td colspan="5" class="text-center p-12 text-slate-400 italic">
                                        🚨 Belum ada entitas data barang terdaftar di dalam klaster sistem.
                                    </td>
                                </tr>
                                <tr
                                    v-for="item in barang"
                                    :key="item.id"
                                    class="hover:bg-indigo-50/30 transition-colors group"
                                >
                                    <td class="p-4 text-center font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">{{ item.id }}</td>
                                    <td class="p-4">
                                        <div class="font-bold text-slate-800">{{ item.nama_barang }}</div>
                                        <div class="text-[10px] text-slate-400 mt-0.5 font-mono">CAT: ID-{{ item.kategori_id || 'X' }} • VEND: SUP-{{ item.supplier_id || 'X' }}</div>
                                    </td>
                                    <td class="p-4 text-center">
                                        <span 
                                            :class="Number(item.stok) > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'"
                                            class="px-2.5 py-1 rounded-lg text-xs font-black inline-block min-w-[40px]"
                                        >
                                            {{ item.stok }}
                                        </span>
                                    </td>
                                    <td class="p-4 font-bold text-indigo-600">
                                        Rp {{ Number(item.harga).toLocaleString('id-ID') }}
                                    </td>
                                    <td class="p-4 text-center space-x-1.5">
                                        <button
                                            @click="editBarang(item)"
                                            class="bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-700 text-xs px-3 py-2 rounded-xl font-bold transition-all border border-amber-200/60"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            @click="hapusBarang(item.id)"
                                            class="bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-xs px-3 py-2 rounded-xl font-bold transition-all border border-rose-200/60"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
                        <div>Menampilkan <span class="font-bold text-slate-700">{{ barang.length }}</span> entitas produk terdaftar.</div>
                        <div class="font-mono text-[10px]">E-Inventory Live Data Node v2.1</div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    `
}