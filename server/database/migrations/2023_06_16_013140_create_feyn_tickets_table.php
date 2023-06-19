<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feyn_tickets', function (Blueprint $table) {
            $table->unsignedBigInteger('feynman_id')->unique()->primary();
            $table->unsignedBigInteger('slot_A')->nullable();
            $table->unsignedBigInteger('slot_B')->nullable();
            $table->unsignedBigInteger('slot_C')->nullable();
            $table->unsignedBigInteger('slot_D')->nullable();

            $table->foreign('feynman_id')->references('feynman_id')->on('feynmen')
                ->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('slot_A')->references('user_id')->on('users')->nullOnDelete()->cascadeOnUpdate();
            $table->foreign('slot_B')->references('user_id')->on('users')->nullOnDelete()->cascadeOnUpdate();
            $table->foreign('slot_C')->references('user_id')->on('users')->nullOnDelete()->cascadeOnUpdate();
            $table->foreign('slot_D')->references('user_id')->on('users')->nullOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('feyn_tickets');
    }
};