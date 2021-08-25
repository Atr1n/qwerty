<?php namespace Webinsane\Flateditorofoffers\Classes\Event\Product;

use Lovata\Shopaholic\Models\Product;
use Webinsane\Flateditorofoffers\Classes\Util\QuickOffersWidgetDisabler;
use Webinsane\Flateditorofoffers\Classes\Util\QuickOffersManager;
use Webinsane\Flateditorofoffers\Classes\Util\SaveHandlerDetector;


class ExtendProductModel
{
    /**
     * Offers accessor dynamic method name
     */
    const OFFERS_ACCESSOR = 'getQuickOffersAttribute';

    /**
     * Offers mutator dynamic method name
     */
    const OFFERS_MUTATOR = 'setQuickOffersAttribute';

    public function subscribe()
    {
        Product::extend(function (Product $obProduct) {
            $obProduct->addDynamicMethod(self::OFFERS_ACCESSOR, function () use ($obProduct) {
                return self::getOffersForRepeater($obProduct);
            });
            $obProduct->addDynamicMethod(self::OFFERS_MUTATOR, function () use ($obProduct) {
                if (self::shouldAddOffersMutator()) {
                    self::synchronizeOffersWithRepeater($obProduct);
                }
            });
        });
    }

    private static function shouldAddOffersMutator()
    {
        return SaveHandlerDetector::instance()->detected() && !QuickOffersWidgetDisabler::isOffersFieldDisabled();
    }

    /**
     * @param Product $product
     * @return array
     */
    private static function getOffersForRepeater(Product $product)
    {
        $manager = new QuickOffersManager($product);
        return $manager->getGroupedOffersArray();
    }

    /**
     * @param Product $product
     */
    private static function synchronizeOffersWithRepeater(Product $product)
    {
        $manager = new QuickOffersManager($product);
        $manager->synchronizeOffersWithRepeater();
    }
}
