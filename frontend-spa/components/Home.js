export default {
    template: `
        <div class="min-h-screen flex flex-col justify-center items-center">

            <h1 class="text-4xl font-bold mb-4">
                Sistem E-Inventory
            </h1>

            <p class="mb-6">
                Selamat datang di aplikasi inventaris barang.
            </p>

            <router-link
                to="/login"
                class="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Login
            </router-link>

        </div>
    `
}