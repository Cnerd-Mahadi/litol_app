<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Lcobucci\JWT\Configuration;

class User extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function roleInfo()
    {
        return $this->hasOne(Role::class, 'role_id', 'role_id');
    }

    public function studentInfo()
    {
        return $this->hasOne(Student::class, 'user_id', 'user_id');
    }

    public function creatorInfo()
    {
        return $this->hasOne(Creator::class, 'user_id', 'user_id');
    }

    public function generateToken($role)
    {
        $config = Configuration::forSymmetricSigner(
            new \Lcobucci\JWT\Signer\Hmac\Sha256(),
            \Lcobucci\JWT\Signer\Key\InMemory::base64Encoded(base64_encode('your_secret_key'))
        );

        $now = new \DateTimeImmutable();
        $expiration = $now->modify('+365 days');

        $token = $config->builder()
            ->issuedBy('LITOL')
            ->identifiedBy('LITOL')
            ->issuedAt($now)
            ->expiresAt($expiration)
            ->withClaim('id', $this->user_id)
            ->withClaim('role', $role)
            ->getToken($config->signer(), $config->signingKey());

        return $token->toString();
    }

}