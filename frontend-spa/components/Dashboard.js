export default {
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        }
    },
    template: `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans">
        
        <!-- NAVBAR PREMIUM (Deep Navy/Slate) -->
        <nav class="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg border-b border-slate-800 sticky top-0 z-50">
            <div class="flex items-center space-x-3">
                <span class="text-2xl">⚡</span>
                <h1 class="text-xl font-extrabold tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    E-INVENTORY COMPASS
                </h1>
            </div>
            <div class="flex items-center space-x-4">
                <div class="hidden md:flex flex-col text-right">
                    <span class="text-xs text-slate-400 font-medium">Sistem Inventaris v2.1</span>
                    <span class="text-sm font-semibold text-slate-200">Administrator Utama</span>
                </div>
                <button
                    @click="logout"
                    class="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-2 rounded-xl font-semibold shadow-md shadow-rose-900/20 transition-all duration-250 hover:scale-105 active:scale-95"
                >
                    Keluar Sistem
                </button>
            </div>
        </nav>

        <!-- MAIN CONTAINER -->
        <div class="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            <!-- HERO BANNER (Dibuat full-width melengkung mewah) -->
            <div class="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div class="relative z-10 max-w-2xl">
                    <span class="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">Kondisi Sistem: Optimal</span>
                    <h1 class="text-3xl md:text-4xl font-black tracking-tight mt-3">
                        Selamat Datang Kembali, Admin 👋
                    </h1>
                    <p class="text-slate-400 mt-2 text-sm md:text-base leading-relaxed">
                        Pantau pergerakan stok, verifikasi kemitraan supplier, dan kendalikan seluruh alur logistik pergudangan secara real-time dari satu tempat.
                    </p>
                </div>
            </div>

            <!-- JALUR NAVIGASI UTAMA (Warna Lebih Mewah & Konsisten) -->
            <div>
                <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Modul Navigasi Utama</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <!-- Modul Barang (Indigo) -->
                    <router-link
                        to="/barang"
                        class="group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                    >
                        <div class="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
                        <div class="flex justify-between items-start">
                            <div class="bg-indigo-50 p-4 rounded-xl text-3xl group-hover:scale-110 transition-transform">📦</div>
                            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md group-hover:bg-indigo-600 group-hover:text-white transition-colors">Buka →</span>
                        </div>
                        <h3 class="text-xl font-bold mt-4 text-slate-900 group-hover:text-indigo-600 transition-colors">Master Barang</h3>
                        <p class="mt-2 text-slate-500 text-xs leading-relaxed">
                            Manajemen database produk, opname stok gudang, penyesuaian harga, dan pelacakan SKU tunggal.
                        </p>
                    </router-link>

                    <!-- Modul Kategori (Cyan/Teal) -->
                    <router-link
                        to="/kategori"
                        class="group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                    >
                        <div class="absolute top-0 left-0 w-2 h-full bg-cyan-600"></div>
                        <div class="flex justify-between items-start">
                            <div class="bg-cyan-50 p-4 rounded-xl text-3xl group-hover:scale-110 transition-transform">🏷️</div>
                            <span class="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md group-hover:bg-cyan-600 group-hover:text-white transition-colors">Buka →</span>
                        </div>
                        <h3 class="text-xl font-bold mt-4 text-slate-900 group-hover:text-cyan-600 transition-colors">Kategori Produk</h3>
                        <p class="mt-2 text-slate-500 text-xs leading-relaxed">
                            Klasifikasi penataan barang berdasarkan klaster, sub-rak gudang, dan eselonitas rumpun logistik.
                        </p>
                    </router-link>

                    <!-- Modul Supplier (Violet) -->
                    <router-link
                        to="/supplier"
                        class="group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-violet-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                    >
                        <div class="absolute top-0 left-0 w-2 h-full bg-violet-600"></div>
                        <div class="flex justify-between items-start">
                            <div class="bg-violet-50 p-4 rounded-xl text-3xl group-hover:scale-110 transition-transform">🚚</div>
                            <span class="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded-md group-hover:bg-violet-600 group-hover:text-white transition-colors">Buka →</span>
                        </div>
                        <h3 class="text-xl font-bold mt-4 text-slate-900 group-hover:text-violet-600 transition-colors">Mitra Supplier</h3>
                        <p class="mt-2 text-slate-500 text-xs leading-relaxed">
                            Direktori vendor pasokan, nomor kontak resmi, dan riwayat pengiriman dokumen surat jalan.
                        </p>
                    </router-link>

                </div>
            </div>

            <!-- GRID DINAMIS UNTUK MENGISI RUANG KOSONG DI BAWAH -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <!-- Kiri-Tengah: Aktivitas Terbaru (Simulasi Biar Terlihat Padat) -->
                <div class="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest">Log Aktivitas Sistem</h3>
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-3 text-xs border-b border-slate-100 pb-3">
                            <span class="text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded">CREATE</span>
                            <p class="text-slate-600 flex-1"><b class="text-slate-800">Admin</b> menambahkan barang baru: <span class="italic text-slate-500">"Komputer Gaming X"</span></p>
                            <span class="text-slate-400">Baru saja</span>
                        </div>
                        <div class="flex items-center space-x-3 text-xs border-b border-slate-100 pb-3">
                            <span class="text-amber-600 font-semibold bg-amber-50 px-2 py-1 rounded">UPDATE</span>
                            <p class="text-slate-600 flex-1"><b class="text-slate-800">Admin</b> mengubah stok Kategori ID: 2</p>
                            <span class="text-slate-400">10 menit yang lalu</span>
                        </div>
                        <div class="flex items-center space-x-3 text-xs">
                            <span class="text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded">AUTH</span>
                            <p class="text-slate-600 flex-1">Sesi login berhasil diverifikasi melalui Token lokal</p>
                            <span class="text-slate-400">1 jam yang lalu</span>
                        </div>
                    </div>
                </div>

                <!-- Kanan: Status & Tips (Digabung agar layout seimbang) -->
                <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200/60 flex flex-col justify-between">
                    <div>
                        <h3 class="text-sm font-bold text-amber-800 flex items-center space-x-2">
                            <span>✨</span> <span>Informasi & Pengingat</span>
                        </h3>
                        <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                            Pastikan untuk selalu mencocokkan stok fisik di gudang dengan entitas angka digital pada modul <b class="text-slate-800">Master Barang</b> sebelum jam operasional tutup.
                        </p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-amber-200/50 text-[11px] text-amber-700/80 font-medium">
                        💡 Tips: Gunakan shortcut pencarian browser jika jumlah SKU barang sudah melewati batas ratusan data.
                    </div>
                </div>

            </div>

        </div>
    </div>
    `
}