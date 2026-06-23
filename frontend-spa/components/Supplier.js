import api from '../js/api.js'

export default {
    data() {
        return {
            supplier: [],
            search: '', // State baru untuk menyimpan text pencarian
            editMode: false,
            editId: null,
            form: {
                nama_supplier: '',
                kontak: '',
                alamat: ''
            }
        }
    },
    computed: {
        // Menghitung jumlah vendor kemitraan yang aktif/terfilter
        totalSupplier() {
            return this.filteredSupplier.length
        },
        // Fungsi filter pencarian secara real-time
        filteredSupplier() {
            return this.supplier.filter(item => {
                const nama = item.nama_supplier?.toLowerCase() || ''
                const kontak = item.kontak?.toLowerCase() || ''
                const alamat = item.alamat?.toLowerCase() || ''
                const cari = this.search.toLowerCase()

                // Mencocokkan input pencarian dengan nama, kontak, atau alamat
                return nama.includes(cari) || kontak.includes(cari) || alamat.includes(cari)
            })
        }
    },
    mounted() {
        this.getSupplier()
    },
    methods: {
        async getSupplier() {
            try {
                const response = await api.get('/supplier')
                this.supplier = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async tambahSupplier() {
            try {
                await api.post('/supplier', this.form)
                alert('Supplier berhasil ditambahkan')
                this.getSupplier()
                this.form = { nama_supplier: '', kontak: '', alamat: '' }
            } catch (error) {
                console.log(error)
                alert(error.response?.data?.message || 'Gagal menambahkan supplier')
            }
        },
        editSupplier(item) {
            this.editMode = true
            this.editId = item.id
            this.form = {
                nama_supplier: item.nama_supplier,
                kontak: item.kontak,
                alamat: item.alamat
            }
        },
        async updateSupplier() {
            try {
                await api.put('/supplier/' + this.editId, this.form)
                alert('Supplier berhasil diubah')
                this.getSupplier()
                this.editMode = false
                this.editId = null
                this.form = { nama_supplier: '', kontak: '', alamat: '' }
            } catch (error) {
                console.log(error)
                alert(error.response?.data?.message || 'Gagal mengubah supplier')
            }
        },
        async hapusSupplier(id) {
            if (!confirm('Yakin ingin menghapus supplier ini?')) return
            try {
                await api.delete('/supplier/' + id)
                alert('Supplier berhasil dihapus')
                this.getSupplier()
            } catch (error) {
                console.log(error)
                alert(error.response?.data?.message || 'Gagal menghapus supplier')
            }
        }
    },
    template: `
    <div class="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 md:p-6 space-y-6">
        <div class="max-w-[1600px] mx-auto space-y-6">
            
            <div class="flex flex-col md:flex-row md:justify-between md:items-center bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 gap-4">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="bg-violet-500/20 text-violet-400 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-violet-500/30">Rantai Pasokan (Supply Chain)</span>
                        <span class="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                    </div>
                    <h1 class="text-2xl font-black tracking-tight mt-2 flex items-center gap-2">
                        🚚 Direktori Mitra Supplier & Vendor
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
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mitra Vendor Aktif</p>
                        <h3 class="text-2xl font-black text-slate-900 mt-1">{{ totalSupplier }} <span class="text-xs font-normal text-slate-400">Perusahaan</span></h3>
                    </div>
                    <div class="bg-violet-50 text-violet-600 p-3 rounded-lg font-bold text-xl">🚚</div>
                </div>
                
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between opacity-85">
                    <div>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Integritas Logistik</p>
                        <h3 class="text-base font-bold text-emerald-600 mt-2 flex items-center gap-1">
                            <span>🤝 Kemitraan Terverifikasi</span>
                        </h3>
                    </div>
                    <div class="text-slate-300 text-xl">🛡️</div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between opacity-85">
                    <div>
                        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Alur Surat Jalan</p>
                        <h3 class="text-xs text-slate-500 mt-2 leading-tight">Otomatis terelasi menggunakan ID Unik Supplier</h3>
                    </div>
                    <div class="text-slate-300 text-xl">📦</div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div class="lg:col-span-4 space-y-6">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                            <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {{ editMode ? '⚡ Amandemen Profil Vendor' : '✨ Pendaftaran Vendor Baru' }}
                            </h2>
                            <span :class="editMode ? 'bg-amber-100 text-amber-800' : 'bg-violet-100 text-violet-800'" class="text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                {{ editMode ? 'Mode Edit' : 'Mode Tambah' }}
                            </span>
                        </div>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nama Supplier / Perusahaan</label>
                                <input
                                    v-model="form.nama_supplier"
                                    placeholder="Contoh: PT. Logistik Jaya Mandiri"
                                    class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                                >
                            </div>

                            <div>
                                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nomor Kontak / Telepon</label>
                                <input
                                    v-model="form.kontak"
                                    placeholder="Contoh: 08123456789"
                                    class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                                >
                            </div>

                            <div>
                                <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Alamat Kantor Operasional</label>
                                <textarea
                                    v-model="form.alamat"
                                    rows="3"
                                    placeholder="Masukkan alamat lengkap vendor..."
                                    class="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all font-medium resize-none"
                                ></textarea>
                            </div>
                            
                            <div class="pt-2">
                                <button
                                    v-if="!editMode"
                                    @click="tambahSupplier"
                                    class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-violet-600/20 transition duration-200 transform active:scale-98"
                                >
                                    Resmikan Kemitraan
                                </button>
                                <button
                                    v-else
                                    @click="updateSupplier"
                                    class="w-full bg-amber-500 hover:bg-amber-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/20 transition duration-200 transform active:scale-98"
                                >
                                    Perbarui Profil Vendor
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-2xl shadow-md border border-slate-800 text-xs space-y-2">
                        <h4 class="font-bold text-violet-400 flex items-center justify-between">
                            <span>📜 Perjanjian Tingkat Layanan (SLA)</span>
                        </h4>
                        <p class="text-slate-400 leading-relaxed">
                            Setiap entitas supplier wajib diverifikasi kontak resminya demi menjamin validitas dokumen pengiriman logistik saat melakukan opname barang masuk.
                        </p>
                    </div>
                </div>

                <div class="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    
                    <div class="p-4 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                        <div class="flex items-center space-x-2 w-full md:w-72">
                            <span class="text-slate-400">🔍</span>
                            <input 
                                v-model="search" 
                                placeholder="Cari nama, kontak atau alamat..." 
                                class="bg-white border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
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
                                    <th class="p-4 text-center w-20">ID VEND</th>
                                    <th class="p-4">Identitas Perusahaan</th>
                                    <th class="p-4">Saluran Kontak</th>
                                    <th class="p-4">Domisili Kantor</th>
                                    <th class="p-4 text-center w-40">Operasi</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm divide-y divide-slate-100">
                                <tr v-if="filteredSupplier.length === 0">
                                    <td colspan="5" class="text-center p-12 text-slate-400 italic">
                                        🚨 Tidak ada entitas supplier yang cocok atau terdaftar.
                                    </td>
                                </tr>
                                <tr
                                    v-for="item in filteredSupplier"
                                    :key="item.id"
                                    class="hover:bg-violet-50/20 transition-colors group"
                                >
                                    <td class="p-4 text-center font-bold text-slate-400 group-hover:text-violet-600 transition-colors">
                                        #{{ item.id }}
                                    </td>
                                    <td class="p-4 font-bold text-slate-800 tracking-tight">
                                        {{ item.nama_supplier }}
                                    </td>
                                    <td class="p-4 font-mono text-xs text-slate-600">
                                        📞 {{ item.kontak }}
                                    </td>
                                    <td class="p-4 text-xs text-slate-500 max-w-xs truncate">
                                        {{ item.alamat }}
                                    </td>
                                    <td class="p-4 text-center space-x-1.5">
                                        <button
                                            @click="editSupplier(item)"
                                            class="bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-700 text-xs px-3 py-1.5 rounded-xl font-bold transition-all border border-amber-200/50"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            @click="hapusSupplier(item.id)"
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
                        <div>Terbaca <span class="font-bold text-slate-700">{{ filteredSupplier.length }}</span> mitra terfilter.</div>
                        <div class="font-mono text-[10px]">Node: Supply_Chain_Cluster</div>
                    </div>

                </div>
            </div>

        </div>
    </div>
    `
}