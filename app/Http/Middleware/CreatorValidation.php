<?php

namespace App\Http\Middleware;

use App\Http\Services\AuthServices;
use Closure;
use Illuminate\Http\Request;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Token\Parser;

class CreatorValidation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    private $authService;
    public function __construct(AuthServices $authService)
    {
        $this->authService = $authService;
    }
    public function handle(Request $request, Closure $next)
    {
        if ($this->authService->validateToken($request)) {
            try {
                $token = $request->bearerToken();
                $parser = new Parser(new JoseEncoder());
                $parsedToken = $parser->parse($token);
                $role = $parsedToken->claims()->get('role');

            } catch (\Throwable $th) {
                return response()->json([
                    'message' => 'Unauthorized',
                    'error' => $th->getMessage()
                ], 403);
            }

            if ($role == "creator") {
                return $next($request);
            } else {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
}