<?php namespace Lovata\CampaignsShopaholic\Classes\Event\Product;

use Lovata\Toolbox\Classes\Event\AbstractExtendRelationConfigHandler;

use Lovata\Shopaholic\Controllers\Products;

/**
 * Class ExtendProductControllerHandler
 * @package Lovata\CampaignsShopaholic\Classes\Event\Product
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
class ExtendProductControllerHandler extends AbstractExtendRelationConfigHandler
{
    /**
     * Get path to config file
     * @return string
     */
    protected function getConfigPath() : string
    {
        return '$/lovata/campaignsshopaholic/config/campaign_config_relation.yaml';
    }

    /**
     * Get controller class name
     * @return string
     */
    protected function getControllerClass() : string
    {
        return Products::class;
    }
}
