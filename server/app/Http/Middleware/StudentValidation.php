<?php

namespace App\Http\Middleware;

use App\Http\Services\AuthServices;
use Closure;
use Illuminate\Http\Request;

class StudentValidation
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
            return $next($request);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
}