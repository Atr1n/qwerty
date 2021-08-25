<?php


namespace Webinsane\Flateditorofoffers\Classes\Util;

use Backend\Classes\Controller;
use Backend\Classes\WidgetBase;
use Backend\Widgets\Form;
use October\Rain\Support\Traits\Singleton;

class FormFieldWidgetDisabler
{
    use Singleton;

    const WIDGET_NAME = '';

    public function getDisabler()
    {
        return function (Form $form, array $fields) {
            if ($this->acceptController($form->getController())) {
                $this->possiblyDisableWidget($form, $fields);
            }
        };
    }

    protected function possiblyDisableWidget(Form $form, array $fields)
    {
        $widget = $form->getFormWidget(static::WIDGET_NAME);
        if (!$this->acceptWidget($widget)) {
            return null;
        }

        if (!isset($fields[static::WIDGET_NAME])) {
            return null;
        }
        $fields[static::WIDGET_NAME]->disabled = true;
        $widget->init();
    }

    protected function acceptController(Controller $controller)
    {
        return true;
    }

    protected function acceptWidget(WidgetBase $widget)
    {
        return true;
    }
}
