<?php


namespace Webinsane\Flateditorofoffers\Classes\Util;

class PathManager
{
    const NAMESPACE_SEPARATOR = '\\';

    public static function toUnixPath($path)
    {
        return str_replace(self::NAMESPACE_SEPARATOR, DIRECTORY_SEPARATOR, $path);
    }

    public static function concatPaths($path1, $path2)
    {
        return $path1 . DIRECTORY_SEPARATOR . $path2;
    }
}
