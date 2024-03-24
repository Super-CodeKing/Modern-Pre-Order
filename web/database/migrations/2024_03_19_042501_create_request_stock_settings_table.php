<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestStockSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_stock_settings', function (Blueprint $table) {
            $table->id();
            $table->string('shop');
            $table->boolean('button_inherit_from_theme')->default(true);
            $table->boolean('form_inherit_from_theme')->default(true);
            $table->json('button')->nullable();
            $table->json('form')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_stock_settings');
    }
}
