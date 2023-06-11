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
        Schema::create('request_sessions', function (Blueprint $table) {
            $table->id('session_id');
            $table->unsignedBigInteger('rid_a')
            ->references('student_id')->on('students');
            $table->unsignedBigInteger('rid_b')
            ->references('student_id')->on('students');
            $table->unsignedBigInteger('rid_c')
            ->references('student_id')->on('students');
            $table->unsignedBigInteger('rid_d')
            ->references('student_id')->on('students');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_sessions');
    }
};
