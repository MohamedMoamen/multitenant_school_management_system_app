<?php

namespace App\Actions\Fortify;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'school_name' => ['required', 'string', 'max:100', 'unique:tenants,school_name'],
            'address' => ['nullable', 'string', 'max:255'],
        ])->validate();
        $tenant = Tenant::create([
        'school_name' => $input['school_name'],
        'address' => $input['address'] ?? null, 
       ]);
        

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
             'password' => Hash::make($input['password']),
            'tenant_id' => $tenant->tenant_id,
        ]);
    }
}
