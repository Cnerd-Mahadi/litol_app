<?php

namespace App\Http\Services;

use App\Helpers\ResponseHelper;
use DateTimeImmutable;
use Illuminate\Http\Request;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Encoding\CannotDecodeContent;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Token\InvalidTokenStructure;
use Lcobucci\JWT\Token\Parser;
use Lcobucci\JWT\Token\UnsupportedHeaderFound;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Lcobucci\JWT\Validation\Validator;

class AuthServices
{
    public function generateAuthToken($userId, $role)
    {
        $configuration = Configuration::forSymmetricSigner(
            new Sha256(),
            InMemory::base64Encoded(base64_encode('37aT!sT0s3cr3cy3ek9039t!n5A9y3ay'))
        );

        $now = new DateTimeImmutable();
        $expiration = $now->modify('+365 days');

        try {
            $token = $configuration->builder()
                ->issuedBy('Cnerd')
                ->identifiedBy('b4!TsmIdn8bUrYm3d3Ad_an3rD')
                ->issuedAt($now)
                ->expiresAt($expiration)
                ->withClaim('id', $userId)
                ->withClaim('role', $role)
                ->getToken($configuration->signer(), $configuration->signingKey());
        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'Token could not be created',
                'error' => $th->getMessage()
            ]);
        }

        return $token->toString();
    }

    public function validateToken(Request $request)
    {
        $token = $request->bearerToken();
        $parser = new Parser(new JoseEncoder());
        $secretKey = InMemory::base64Encoded(base64_encode('37aT!sT0s3cr3cy3ek9039t!n5A9y3ay'));
        $signer = new Sha256();

        try {
            $parsedToken = $parser->parse($token);
        } catch (CannotDecodeContent | InvalidTokenStructure | UnsupportedHeaderFound $e) {
            return response()->json(['message' => "Unauthorized"], 401);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        $validator = new Validator();
        return $validator->validate($parsedToken, new SignedWith($signer, $secretKey));
    }
}