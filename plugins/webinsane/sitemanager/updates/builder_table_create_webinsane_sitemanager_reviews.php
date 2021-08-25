<?php namespace Webinsane\Sitemanager\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateWebinsaneSitemanagerReviews extends Migration
{
    public function up()
    {
        Schema::create('webinsane_sitemanager_reviews', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('name');
            $table->text('text');
            $table->string('photo');
            $table->integer('sort_order')->default(0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('webinsane_sitemanager_reviews');
    }
}
