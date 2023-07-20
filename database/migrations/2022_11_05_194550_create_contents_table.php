<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->id('content_id');
            $table->string('updated');
            $table->unsignedBigInteger('subject_id');
            $table->string('title');
            $table->string('image');
            $table->string('details');
            $table->unsignedBigInteger('user_id');

            $table->foreign('subject_id')
            ->references('subject_id')->on('subjects')
            ->cascadeOnDelete()->cascadeOnUpdate();

            $table->foreign('user_id')
            ->references('user_id')->on('users')
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
        Schema::dropIfExists('contents');
    }
};
