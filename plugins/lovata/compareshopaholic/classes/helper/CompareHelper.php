<?php namespace Lovata\CompareShopaholic\Classes\Helper;

use Lovata\Toolbox\Classes\Storage\UserStorage;
use Lovata\Toolbox\Classes\Storage\SessionUserStorage;

/**
 * Class CompareHelper
 * @package Lovata\CompareShopaholic\Classes\Helper
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
class CompareHelper
{
    const FIELD_NAME = 'product_compare';

    /**
     * Add product in compare list
     * @param int $iProductID
     */
    public function add($iProductID)
    {
        if (empty($iProductID)) {
            return;
        }

        $obUserStorage = $this->getUserStorage();
        $obUserStorage->addToList(self::FIELD_NAME, $iProductID);
    }

    /**
     * Remove product from compare list
     * @param int $iProductID
     */
    public function remove($iProductID)
    {
        if (empty($iProductID)) {
            return;
        }

        $obUserStorage = $this->getUserStorage();
        $obUserStorage->removeFromList(self::FIELD_NAME, $iProductID);
    }

    /**
     * Get compare list
     * @return array
     */
    public function getList()
    {
        $obUserStorage = $this->getUserStorage();
        $arProductIDList = $obUserStorage->getList(self::FIELD_NAME);

        return $arProductIDList;
    }

    /**
     * Clear compare list
     */
    public function clear()
    {
        $obUserStorage = $this->getUserStorage();
        $obUserStorage->clear(self::FIELD_NAME);
    }

    /**
     * Get user storage object
     * @return UserStorage
     */
    protected function getUserStorage()
    {
        /** @var UserStorage $obUserStorage */
        $obUserStorage = app(UserStorage::class);
        $obUserStorage->setDefaultStorage(SessionUserStorage::class);

        return $obUserStorage;
    }
}