<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tenant;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    
    public function run(): void
    {
        $tenant = Tenant::firstOrCreate(
            ['school_name' => 'Test School'],
            ['address' => 'Test Address']
        );

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'tenant_id' => $tenant->tenant_id,
            ]
        );
    }
}
