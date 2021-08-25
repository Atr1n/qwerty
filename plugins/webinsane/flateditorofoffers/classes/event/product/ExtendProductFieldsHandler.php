<?php


namespace Webinsane\Flateditorofoffers\Classes\Event\Product;

use Backend\Widgets\Form;
use Lovata\Shopaholic\Controllers\Products;
use Lovata\Shopaholic\Models\Product;
use Lovata\Toolbox\Classes\Event\AbstractBackendFieldHandler;
use Str;
use Webinsane\Flateditorofoffers\Classes\Util\ConfigurationExtractor;

/**
 * Class ExtendProductFieldsHandler
 * Adds tab for quick offers edition.
 * @package Webinsane\Flateditorofoffers\Event\Product
 */
class ExtendProductFieldsHandler extends AbstractBackendFieldHandler
{
    const FIELDS_FILE = "fields.yaml";

    /**
     * Extend field
     * @param Form $obWidget
     */
    protected function extendFields($obWidget)
    {
        $form = self::getFieldsConfiguration();
        $arAdditionFields = [
            'quick_offers' => [
                'tab'       => 'webinsane.flateditorofoffers::lang.tab.name',
                'titleFrom' => 'Offers',
                'dependsOn' => 'offer',
                'context' => 'update',
                'type' => 'repeater',
                'form' => $form,
            ],
        ];
        $obWidget->addTabFields($arAdditionFields);
    }

    private static function getFieldsConfiguration()
    {
        $lowerClassNS = Str::lower(self::class);
        $dirPath = plugins_path($lowerClassNS);
        return ConfigurationExtractor::getConfiguration($dirPath, self::FIELDS_FILE);
    }

    /**
     * Get model class name
     * @return string
     */
    protected function getModelClass(): string
    {
        return Product::class;
    }

    /**
     * Get controller class name
     * @return string
     */
    protected function getControllerClass(): string
    {
        return Products::class;
    }
}
