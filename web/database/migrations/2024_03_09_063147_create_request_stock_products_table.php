<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestStockProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_stock_products', function (Blueprint $table) {
            $table->id();
            $table->string('shop');
            $table->string('product_id');
            $table->string('variant_id')->nullable();
            $table->string('title');
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->tinyInteger('no_end_date')->default(1);
            $table->timestamp('restock_date')->nullable();
            $table->tinyInteger('no_restock_date')->default(1);
            $table->boolean('display_message')->default(false);
            $table->boolean('display_badge')->default(false);
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
        Schema::dropIfExists('request_stock_products');
    }
}
