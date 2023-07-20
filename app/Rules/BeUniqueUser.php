<?php

namespace App\Rules;

use App\Http\Services\UserServices;
use Illuminate\Contracts\Validation\Rule;

class BeUniqueUser implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    private $userService;

    public function __construct()
    {
        $this->userService = app()->make(UserServices::class);
    }
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $this->userService->checkUniqueUser($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'User already exists.';
    }
}