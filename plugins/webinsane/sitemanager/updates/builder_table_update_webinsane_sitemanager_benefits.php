<?php namespace Webinsane\Sitemanager\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateWebinsaneSitemanagerBenefits extends Migration
{
    public function up()
    {
        Schema::table('webinsane_sitemanager_benefits', function($table)
        {
            $table->integer('sort_order')->default(0)->change();
        });
    }
    
    public function down()
    {
        Schema::table('webinsane_sitemanager_benefits', function($table)
        {
            $table->integer('sort_order')->default(null)->change();
        });
    }
}
