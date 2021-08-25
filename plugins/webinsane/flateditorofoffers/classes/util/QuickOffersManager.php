<?php


namespace Webinsane\Flateditorofoffers\Classes\Util;

use Input;
use Lovata\Shopaholic\Models\Offer;
use Lovata\Shopaholic\Models\Product;

class QuickOffersManager
{
    const POST_FIELD = "Product.quick_offers";

    /**
     * @var Product
     */
    private $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    private function getOffers()
    {
        return $this->product->offer;
    }

    public function getGroupedOffers()
    {
        return $this->getOffers()->keyBy('id');
    }

    public function getGroupedOffersArray()
    {
        return $this->getGroupedOffers()->toArray();
    }

    public function synchronizeOffersWithRepeater()
    {
        $offers = $this->getGroupedOffers();
        $quickOffers = self::getOffersFromPost();
        foreach ($quickOffers as $offerId => $offerData) {
            $offer = self::getExistingOffer($offers, $offerId, $offerData);
            self::synchronizeOfferWithNonEmptyData($offer, $offerData);
            self::linkOfferToProduct($this->product, $offer);
        }

        $guardedOfferIds = collect(array_keys($quickOffers));
        self::removeExcessOffers($this->product, $guardedOfferIds);
    }

    private static function getExistingOffer($offers, $offerId, $offerData)
    {
        $offer = $offers->get($offerId);
        return $offer ?: Offer::create($offerData);
    }

    /**
     * @param Product $product
     * @param $offer
     */
    private static function linkOfferToProduct(Product $product, $offer): void
    {
        // @todo is this check is required ?
        if (!$product->offer->contains('id', $offer->id)) {
            $product->offer()->save($offer);
        }
    }

    private static function synchronizeOfferWithNonEmptyData(?Offer $offer, &$offerData)
    {
        foreach ($offerData as $offerKey => $offerValue) {
            if (in_array($offerKey, array_merge($offer->fillable, $offer->arPriceField))) {
                $offer->$offerKey = $offerValue;
            }
        }
        $offer->save();
    }

    private static function removeExcessOffers(Product $product, $guardedIds)
    {
        $product->offer
            ->filter(function (Offer $offer) use ($guardedIds) {
                return !$guardedIds->contains($offer->id);
            })
            ->each(function (Offer $offer) {
                $offer->delete();
            });
    }

    private static function getOffersFromPost()
    {
        return array_map(function (array $offerData) {
            return self::sanitizeOfferData($offerData);
        }, Input::get(self::POST_FIELD, []));
    }

    private static function sanitizeOfferData(array $offerData)
    {
        foreach ($offerData as $offerDataKey => $offerDataValue) {
            if (strlen($offerDataValue) == 0) {
                unset($offerData[$offerDataKey]);
            }
        }
        return $offerData;
    }
}
