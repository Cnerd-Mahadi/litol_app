<?php

namespace App\Rules;

use App\Http\Services\CommonServices;
use Illuminate\Contracts\Validation\Rule;

class BeUniqueTitleUpdated implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */

    private $commonService;
    private $collection;
    private $user_id;

    private $id;

    public function __construct($collection, $user_id, $id)
    {
        $this->commonService = app()->make(CommonServices::class);
        $this->collection = $collection;
        $this->id = $id;
        $this->user_id = $user_id;
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
        return $this->commonService->checkUniqueTitleUpdated($value, $this->id, $this->collection, $this->user_id);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Title already exists.';
    }
}