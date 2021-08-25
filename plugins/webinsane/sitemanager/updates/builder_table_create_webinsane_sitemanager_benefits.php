<?php namespace Webinsane\Sitemanager\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateWebinsaneSitemanagerBenefits extends Migration
{
    public function up()
    {
        Schema::create('webinsane_sitemanager_benefits', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('title');
            $table->text('text');
            $table->string('image');
            $table->integer('sort_order');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('webinsane_sitemanager_benefits');
    }
}
