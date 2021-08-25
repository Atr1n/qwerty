<?php namespace Webinsane\Flateditorofoffers\Classes\Util;

use Backend\Classes\Controller;
use Backend\Classes\WidgetBase;
use Backend\FormWidgets\Repeater;
use Lovata\Shopaholic\Controllers\Products;

class QuickOffersWidgetDisabler extends FormFieldWidgetDisabler
{
    /**
     * Quick offers repeater field' code
     */
    const WIDGET_NAME = 'quick_offers';

    /**
     * Post data key
     * If exists -> editor can save data
     * @var string
     */
    const OFFERS_EDITOR_LOADED = 'formQuickOffers_loaded';

    protected function acceptController(Controller $controller)
    {
        return $controller instanceof Products;
    }

    protected function acceptWidget(WidgetBase $widget)
    {
        return $widget instanceof Repeater;
    }

    public static function isOffersFieldDisabled()
    {
        return post(self::OFFERS_EDITOR_LOADED) == null;
    }
}
