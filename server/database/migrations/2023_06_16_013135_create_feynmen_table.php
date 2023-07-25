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
        Schema::create('feynmen', function (Blueprint $table) {
            $table->id('feynman_id');
            $table->string('updated');
            $table->unsignedBigInteger('content_id');
            $table->boolean('status');

            $table->foreign('content_id')
                ->references('content_id')->on('contents')
                ->cascadeOnDelete()->cascadeOnUpdate();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('feynmen');
    }
};