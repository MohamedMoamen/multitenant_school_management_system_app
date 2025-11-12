<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\assertAuthenticated;

uses(RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = get(route('register'));
    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'school_name' => 'Test School',
        'address' => '123 Test St',
    ]);

    assertAuthenticated(); 
    $response->assertRedirect(route('dashboard', absolute: false));
    
    expect(User::where('email', 'test@example.com')->exists())->toBeTrue();
});
