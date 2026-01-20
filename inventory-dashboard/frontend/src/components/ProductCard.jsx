import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from './ui';
import { ArrowDown, ArrowUp, Minus, Plus } from 'lucide-react';

const ProductCard = ({ product, onUpdateStock, updating }) => {
    const isLowStock = product.stock < product.lowStockThreshold;

    return (
        <Card className={`transition-all hover:shadow-lg ${isLowStock ? 'border-amber-200 bg-amber-50/30' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {product.name}
                </CardTitle>
                {isLowStock && (
                    <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-100">
                        Low Stock
                    </Badge>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                    Stock ID: #{product.id}
                </p>

                <div className="mt-4 flex items-center justify-between rounded-lg border bg-slate-50 p-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white text-black hover:bg-white border-none shadow-sm"
                        onClick={() => onUpdateStock(product.id, product.stock - 1)}
                        disabled={product.stock <= 0 || updating}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <div className="font-mono font-bold text-lg">
                        {product.stock}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white text-black hover:bg-white border-none shadow-sm"
                        onClick={() => onUpdateStock(product.id, product.stock + 1)}
                        disabled={updating}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
