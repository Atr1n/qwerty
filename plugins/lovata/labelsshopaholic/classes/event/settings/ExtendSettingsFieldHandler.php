<?php namespace Lovata\LabelsShopaholic\Classes\Event\Settings;

use Lovata\Toolbox\Classes\Event\AbstractBackendFieldHandler;
use Lovata\Toolbox\Classes\Helper\PageHelper;

use Lovata\Shopaholic\Models\Settings;

/**
 * Class ExtendSettingsFieldHandler
 * @package Lovata\LabelsShopaholic\Classes\Event\Settings
 * @author  Sergey Zakharevich, s.zakharevich@lovata.com, LOVATA Group
 */
class ExtendSettingsFieldHandler extends AbstractBackendFieldHandler
{
    /**
     * Extend form fields
     * @param \Backend\Widgets\Form $obWidget
     */
    protected function extendFields($obWidget)
    {
        $obWidget->addTabFields([
            'default_label_page_id' => [
                'tab'         => 'lovata.shopaholic::lang.tab.page_settings',
                'label'       => 'lovata.labelsshopaholic::lang.field.default_label_page',
                'span'        => 'left',
                'type'        => 'dropdown',
                'emptyOption' => 'lovata.toolbox::lang.field.empty',
                'options'     => PageHelper::instance()->getPageNameList(),
            ],
        ]);
    }

    /**
     * Get model class name
     * @return string
     */
    protected function getModelClass() : string
    {
        return Settings::class;
    }

    /**
     * Get controller class name
     * @return string
     */
    protected function getControllerClass() : string
    {
        return \System\Controllers\Settings::class;
    }
}
