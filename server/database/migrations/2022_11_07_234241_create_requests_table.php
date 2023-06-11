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
        Schema::create('requests', function (Blueprint $table) {
            $table->id('request_id');
            $table->unsignedBigInteger('topic_id');
            $table->foreign('topic_id')->references('topic_id')->on('topics');
            $table->unsignedBigInteger('session_id');
            $table->foreign('session_id')->references('session_id')->on('request_sessions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('requests');
    }
};
