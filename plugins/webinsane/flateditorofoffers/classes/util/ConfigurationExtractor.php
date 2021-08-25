<?php


namespace Webinsane\Flateditorofoffers\Classes\Util;

use October\Rain\Support\Traits\Singleton;
use System\Traits\ConfigMaker;

class ConfigurationExtractor
{
    use Singleton;
    use ConfigMaker;

    public static function getConfiguration($directory, $file)
    {
        $path = PathManager::concatPaths($directory, $file);
        return self::getConfigurationByPath($path);
    }

    private static function getConfigurationByPath($path)
    {
        $path = PathManager::toUnixPath($path);
        return self::instance()->createConfiguration($path);
    }

    /**
     * @noinspection PhpUndefinedClassInspection
     * @param $path
     * @return array|\stdClass
     */
    private function createConfiguration($path)
    {
        try {
            return $this->makeConfig($path);
        } catch (SystemException $exception) {
            return [];
        }
    }
}
