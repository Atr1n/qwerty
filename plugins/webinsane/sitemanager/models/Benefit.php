<?php namespace Webinsane\Sitemanager\Models;

use Model;

/**
 * Model
 */
class Benefit extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;
    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'webinsane_sitemanager_benefits';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
