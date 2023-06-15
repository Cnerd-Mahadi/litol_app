<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Lcobucci\JWT\Configuration;


class Creator extends Model
{
    use HasFactory;
    public $timestamps = false;

    /**
     * Returns a single related User model associated with the current object.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }

    public function contents()
    {
        return $this->hasMany(Content::class, 'creator_id', 'creator_id');
    }

    public function generateToken()
    {
        $config = Configuration::forSymmetricSigner(
            new \Lcobucci\JWT\Signer\Hmac\Sha256(),
            \Lcobucci\JWT\Signer\Key\InMemory::base64Encoded(base64_encode('your_secret_key'))
        );

        $now = new \DateTimeImmutable();
        $expiration = $now->modify('+365 days');

        $token = $config->builder()
            ->issuedBy('LITOL')
            ->identifiedBy('LITOL', true)
            ->issuedAt($now)
            ->expiresAt($expiration)
            ->withClaim('id', $this->user_id)
            ->withClaim('role', 'CREATOR')
            ->getToken($config->signer(), $config->signingKey());

        return $token->toString();
    }
}
