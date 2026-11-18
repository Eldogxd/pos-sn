<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderCalculationService
{
    /**
     * Resuelve los precios reales desde base de datos en una sola consulta (evita N+1),
     * y calcula subtotal, descuento y total final según el tipo de orden.
     *
     * @param array $productsPayload Array de ['id' => int, 'quantity' => int, 'price' => float]
     * @param string $orderType 'mesa' | 'llevar' | 'pedidosya' | 'delivery'
     * @param string|null $discountType 'amount' | 'percent' | null
     * @param float|int|string|null $discountValue
     * @return array{
     *     items: array<int, array{product_id: int, quantity: int, price: float}>,
     *     subtotal: float,
     *     discount_amount: float,
     *     total: float
     * }
     */
    public function resolveItemsAndTotals(
        array $productsPayload,
        string $orderType = 'mesa',
        ?string $discountType = null,
        $discountValue = null
    ): array {
        if (empty($productsPayload)) {
            return [
                'items' => [],
                'subtotal' => 0.0,
                'discount_amount' => 0.0,
                'total' => 0.0,
            ];
        }

        $productIds = collect($productsPayload)
            ->pluck('id')
            ->filter()
            ->unique()
            ->values()
            ->all();

        $productsById = Product::whereIn('id', $productIds)->get()->keyBy('id');

        $resolvedItems = [];
        $subtotal = 0.0;

        foreach ($productsPayload as $productData) {
            $productId = (int) $productData['id'];
            /** @var Product|null $product */
            $product = $productsById->get($productId);

            if (!$product) {
                throw (new ModelNotFoundException())->setModel(Product::class, [$productId]);
            }

            $quantity = (int) $productData['quantity'];
            $price = $this->resolveUnitPrice($product, $productData, $orderType);

            $subtotal += $price * $quantity;

            $resolvedItems[] = [
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $price,
            ];
        }

        $subtotal = round($subtotal, 2);
        $discountAmount = $this->calculateDiscount($subtotal, $discountType, $discountValue);
        $total = max(0.0, round($subtotal - $discountAmount, 2));

        return [
            'items' => $resolvedItems,
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount,
            'total' => $total,
        ];
    }

    /**
     * Determina el precio unitario autoritativo para un producto.
     */
    public function resolveUnitPrice(Product $product, array $productData, string $orderType = 'mesa'): float
    {
        if ($product->is_generic) {
            return round((float) ($productData['price'] ?? 0), 2);
        }

        if ($orderType === 'pedidosya') {
            $pyPrice = $product->py_price;
            if ($pyPrice !== null && (float) $pyPrice > 0) {
                return round((float) $pyPrice, 2);
            }
        }

        return round((float) $product->price, 2);
    }

    /**
     * Calcula el monto de descuento acotado entre 0 y el subtotal.
     */
    public function calculateDiscount(float $subtotal, ?string $discountType, $discountValue): float
    {
        $numericValue = (float) ($discountValue ?? 0);
        if (empty($discountType) || $numericValue <= 0 || $subtotal <= 0) {
            return 0.0;
        }

        if ($discountType === 'percent') {
            $percent = min($numericValue, 100.0);
            return round(($subtotal * $percent) / 100.0, 2);
        }

        if ($discountType === 'amount') {
            return round(min($numericValue, $subtotal), 2);
        }

        return 0.0;
    }
}
