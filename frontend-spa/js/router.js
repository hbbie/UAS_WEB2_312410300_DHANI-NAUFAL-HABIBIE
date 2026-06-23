// 1. IMPORT SEMUA KOMPONEN UTAMA (Pastikan path file sesuai dengan struktur foldermu)
import Login from '../components/Login.js'
import Dashboard from '../components/Dashboard.js'
import Barang from '../components/Barang.js'
import Kategori from '../components/Kategori.js'
import Supplier from '../components/Supplier.js' // <-- Komponen baru sudah masuk radar!

// 2. DAFTAR ROUTING UTAMA APLIKASI INVENTARIS
const routes = [
    { 
        path: '/login', 
        name: 'Login',
        component: Login 
    },
    { 
        path: '/dashboard', 
        name: 'Dashboard',
        component: Dashboard 
    },
    { 
        path: '/barang', 
        name: 'Barang',
        component: Barang 
    },
    { 
        path: '/kategori', 
        name: 'Kategori',
        component: Kategori 
    },
    { 
        path: '/supplier', 
        name: 'Supplier',
        component: Supplier // <-- Jalur Supplier resmi dibuka, anti-blank!
    },
    // Otomatis lempar ke login kalau user mengetik url yang tidak terdaftar
    { 
        path: '/:pathMatch(.*)*', 
        redirect: '/login' 
    }
]

// 3. INISIALISASI VUE ROUTER INSTANCE
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

// 4. NAVIGATION GUARD (Fitur Wajib UAS: Mencegah user tembus tanpa login)
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token') // Mengambil token token dari localStorage

    if (to.name !== 'Login' && !token) {
        // Jika user mau ke dashboard/barang/kategori tapi BELUM login, tendang ke login
        next({ name: 'Login' })
    } else if (to.name === 'Login' && token) {
        // Jika user SUDAH login tapi malah iseng akses halaman login lagi, oper ke dashboard
        next({ name: 'Dashboard' })
    } else {
        // Selain kondisi di atas, izinkan user lewat
        next()
    }
})

export default router