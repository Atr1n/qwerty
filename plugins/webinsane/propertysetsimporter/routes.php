<?php

use Lovata\PropertiesShopaholic\Models\Property;
use Lovata\PropertiesShopaholic\Models\PropertySet;
use Lovata\Shopaholic\Models\Category;

Route::get('/webinsane-import-property-sets', function() {
    $importData = Storage::get('partner.xml');
    $importObject = simplexml_load_string($importData);
    $categoryIds = $importObject->xpath('shop/categories/category/@id');
    $categoryIdsCollection = collect($categoryIds)->map(function($categoryIdElement) {
        return (int)$categoryIdElement;
    });
    $categories = Category::with('property_set')->whereIn('external_id', $categoryIdsCollection)->get();

    $properties = Property::all();
    $offers = $importObject->xpath('shop/offers/offer');
    $categoryToCharacteristicsMap = collect($offers)->mapToGroups(function($offerElement) use ($properties) {
        $categoryId = (int)$offerElement->categoryId;
        return [$categoryId => getPropertyIds($offerElement, $properties)];
    });
    $categoryToCharacteristicsMap = $categoryToCharacteristicsMap->map(function ($propertyIds) {
        return $propertyIds->flatten()->unique();
    })
    ->filter(function ($propertyIds) {
        return $propertyIds->isNotEmpty();
    });
    $categoryToCharacteristicsMap->each(function($properties, $categoryId) use ($categories) {
        if (empty($properties)) return;
        $category = $categories->firstWhere('external_id', $categoryId);
        if (!$category) return;
        $propertySet = $category->property_set->firstWhere('name', $category->name);
        if (!($propertySet instanceof PropertySet)) {
            $propertySet = $category->property_set()->create([
                'name' => $category->name,
                'code' => md5($category->id),
            ]);
        }
        $propertySet->product_property()->sync($properties);
    });
})->middleware('web');

function getPropertyIds($offerElement, $properties)
{
    $characteristics = $offerElement->xpath('Characteristics/Character');
    return collect($characteristics)->map(function($character) {
        return (string)$character->attributes()->Name;
    })
    ->unique()
    ->map(function($characterName) use($properties) {
        return $properties->where('name', $characterName)->first();
    })
    ->filter(function($property) {
        return !is_null($property);
    })
    ->map(function($property) {
        return $property->id;
    });
}
