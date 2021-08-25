<?php namespace Webinsane\PropertySetsImporter;

use Event;
use Lovata\PropertiesShopaholic\Classes\Import\ImportPropertyModelFromXML;
use Lovata\Shopaholic\Classes\Import\ImportProductModelFromXML;
use Lovata\Toolbox\Classes\Helper\ParseXMLNode;
use SimpleXMLElement;
use Storage;
use System\Classes\PluginBase;
use System\Models\File;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
    }

    public function registerSettings()
    {
    }

    public function boot()
    {

    }
}
