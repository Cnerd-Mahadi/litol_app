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
        Schema::create('note_details', function (Blueprint $table) {
            $table->id('note_details_id');
            $table->unsignedBigInteger('note_id');
            $table->string('key');
            $table->string('details');

            $table->foreign('note_id')->references('note_id')->on('notes')
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
        Schema::dropIfExists('note_details');
    }
};