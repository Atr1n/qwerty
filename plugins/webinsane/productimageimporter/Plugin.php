<?php namespace Webinsane\Productimageimporter;

use Event;
use Http;
use Lovata\Shopaholic\Classes\Import\ImportProductModelFromXML;
use Lovata\Toolbox\Classes\Helper\ParseXMLNode;
use SimpleXMLElement;
use Storage;
use System\Classes\PluginBase;

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
        Event::listen(ImportProductModelFromXML::EXTEND_IMPORT_DATA, function($arImportData, ParseXMLNode $obParseNode) {
            $pictures = collect([]);
            $pictureNodes = $obParseNode->getNode()->xpath('picture');
            foreach ($pictureNodes as $pictureNode) {
                if ($pictureNode instanceof SimpleXMLElement) {
                    $url = (string)$pictureNode;
                    $picturePath = str_after($url, 'http://');
                    $picturePath = str_after($picturePath, 'https://');

                    $pictures->push($picturePath);
                    if (Storage::exists($picturePath)) continue;

                    $pictureContent = Http::get($url)->send();
                    if (empty($pictureContent)) {
                        $pictures->pop();
                        continue;
                    }
                    Storage::put($picturePath, $pictureContent);
                }
            }

            if (!empty($pictures)) {
                $pictures = $pictures->map(function($picture) {
                    return 'app/' . $picture;
                });
                $arImportData['preview_image'] = $pictures->shift();
                $arImportData['images'] = $pictures->toArray();
            }
            else {
                $arImportData['preview_image'] = storage_path('app/media/default.jpg');
            }

            return $arImportData;
        });
    }
}
