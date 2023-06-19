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
            $table->unsignedBigInteger('subject_id')
            ->references('subject_id')->on('subjects');
            $table->unsignedBigInteger('topic_id')
            ->references('topic_id')->on('topics');
            $table->unsignedBigInteger('creator_id')
            ->references('creator_id')->on('creators');

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
