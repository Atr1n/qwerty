<?php namespace Webinsane\Flateditorofoffers;

use Event;
use Lovata\Shopaholic\Controllers\Products;
use System\Classes\PluginBase;
use Webinsane\Flateditorofoffers\Classes\Event\Product\ExtendProductFieldsHandler;
use Webinsane\Flateditorofoffers\Classes\Event\Product\ExtendProductModel;
use Webinsane\Flateditorofoffers\Classes\Util\QuickOffersWidgetDisabler;
use Webinsane\Flateditorofoffers\Classes\Util\SaveHandlerDetector;

/**
 * Flateditorofoffers Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * @var string[] plugin dependencies
     */
    public $require = ['Lovata.Shopaholic', 'Lovata.Toolbox'];

    /**
     * Returns information about this plugin.
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'webinsane.flateditorofoffers::lang.plugin.name',
            'description' => 'webinsane.flateditorofoffers::lang.plugin.description',
            'author'      => 'Webinsane',
            'icon'        => 'icon-leaf'
        ];
    }

    public function boot()
    {
        Event::subscribe(ExtendProductFieldsHandler::class);
        Event::subscribe(ExtendProductModel::class);

        Products::extend(
            SaveHandlerDetector::instance()->getHandlerDetector()
        );
        Event::listen(
            'backend.form.refreshFields',
            QuickOffersWidgetDisabler::instance()->getDisabler()
        );
    }
}
