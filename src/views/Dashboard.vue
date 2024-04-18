<template>
    <div class="min-h-screen bg-gray-100">
        <header class="h-16 border-b bg-white">
            
        </header>
        <div class="p-10">
            <div class="mb-6">
                <h1 class="text-xl">Monchef Colombia</h1>
                <p>Welcome Diego</p>
            </div>
            <div>
                <!-- <p class="mb-6">Favorite Nodes</p> -->
                <div class="flex flex-wrap gap-6">
                    <router-link to="/inventory" class="grid place-content-center bg-indigo-500 text-white font-semibold w-32 h-32 rounded-lg">
                        Inventario
                    </router-link>
                    <router-link to="/orders/new" class="grid place-content-center bg-red-500 text-white font-semibold w-32 h-32 rounded-lg">
                        POS
                    </router-link>
                    <router-link to="/dashboard/profile" class="grid place-content-center bg-red-400 text-white font-semibold w-32 h-32 rounded-lg">
                        POS Mobile
                    </router-link>
                    <router-link to="/kds" class="grid place-content-center bg-green-500 text-white font-semibold w-32 h-32 rounded-lg">
                        KDS
                    </router-link>
                    <router-link to="/delivery" class="grid place-content-center bg-green-500 text-white font-semibold w-32 h-32 rounded-lg">
                        Logistica
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>