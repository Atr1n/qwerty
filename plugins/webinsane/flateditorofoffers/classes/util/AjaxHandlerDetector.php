<?php


namespace Webinsane\Flateditorofoffers\Classes\Util;

use Backend\Classes\Controller;
use October\Rain\Support\Traits\Singleton;

class AjaxHandlerDetector
{
    use Singleton;

    const HANDLER_TO_DETECT = '';

    private $wasDetected = false;

    public function getHandlerDetector(): callable
    {
        return function (Controller $controller) {
            $this->wasDetected = $controller->getAjaxHandler() == static::HANDLER_TO_DETECT;
        };
    }

    public function detected()
    {
        return $this->wasDetected;
    }
}
