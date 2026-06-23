export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },

    methods: {
        async login() {
            try {
                const response = await axios.post(
                    'http://localhost/backend-api/public/login',
                    {
                        username: this.username,
                        password: this.password
                    }
                )

                localStorage.setItem(
                    'token',
                    response.data.token
                )

                localStorage.setItem(
                    'isLoggedIn',
                    true
                )

                alert('Login berhasil')
                this.$router.push('/dashboard')

            } catch (error) {
                alert('Username atau password salah')
            }
        }
    },

    template: `
    <!-- BACKGROUND UTAMA: Gradasi gelap estetis dengan dekorasi abstrak -->
    <div class="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 font-sans relative overflow-hidden">
        
        <!-- Ornamen lingkaran cahaya di latar belakang agar tidak monoton -->
        <div class="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <!-- CARD LOGIN: Modern, melengkung dalam, dan bayangan tebal -->
        <div class="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4 border border-slate-200/50 relative z-10">
            
            <!-- Logo & Header -->
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white text-3xl rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
                    ⚡
                </div>
                <h1 class="text-2xl font-black tracking-tight text-slate-800">
                    E-INVENTORY COMPASS
                </h1>
                <p class="text-sm text-slate-500 mt-1">
                    Silakan masuk untuk mengelola inventaris sistem
                </p>
            </div>

            <!-- Form Group -->
            <div class="space-y-5">
                <!-- Input Username -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Username
                    </label>
                    <input
                        v-model="username"
                        type="text"
                        placeholder="Masukkan username anda"
                        class="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-slate-800 font-medium"
                    >
                </div>

                <!-- Input Password -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Password
                    </label>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="••••••••"
                        class="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-slate-800 font-medium"
                    >
                </div>

                <!-- Spacer sedikit -->
                <div class="pt-2">
                    <!-- Tombol Login Bergradasi & Efek Hover Skala -->
                    <button
                        @click="login"
                        class="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Masuk ke Dashboard
                    </button>
                </div>
            </div>

            <!-- Footer Card -->
            <div class="mt-8 text-center border-t border-slate-100 pt-5">
                <p class="text-xs text-slate-400 font-medium">
                    Sistem Inventaris v2.1 • Hak Cipta Dilindungi
                </p>
            </div>

        </div>
    </div>
    `
}