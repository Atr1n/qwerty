<?php namespace Webinsane\Sitemanager\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateWebinsaneSitemanagerPartners extends Migration
{
    public function up()
    {
        Schema::create('webinsane_sitemanager_partners', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('logo');
            $table->string('url');
            $table->integer('sort_order')->default(0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('webinsane_sitemanager_partners');
    }
}
