import { Product } from "@/lib/services/api";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-1">
          {product.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold">
          ${product.price}
        </p>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
