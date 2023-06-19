<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Lcobucci\JWT\Encoding\CannotDecodeContent;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Token\InvalidTokenStructure;
use Lcobucci\JWT\Token\Parser;
use Lcobucci\JWT\Token\UnsupportedHeaderFound;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Lcobucci\JWT\Validation\Validator;

class StudentValidation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        $parser = new Parser(new JoseEncoder());

        $secretKey = \Lcobucci\JWT\Signer\Key\InMemory::base64Encoded(base64_encode('your_secret_key'));
        $signer = new Sha256();

        try {
            $parsedToken = $parser->parse($token);
        }
        catch (CannotDecodeContent | InvalidTokenStructure | UnsupportedHeaderFound $e) {
            return response()->json(['message' => "Unauthorized"], 401);
        }
        catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        $validator = new Validator();
        if ($validator->validate($parsedToken, new SignedWith($signer,$secretKey))) {
            $role=$parsedToken->claims()->get('role');
            if($role=="STUDENT"){
                return $next($request);
            }
            else{
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }
        else{
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
}
