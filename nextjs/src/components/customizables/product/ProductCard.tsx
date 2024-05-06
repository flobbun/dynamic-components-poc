"use client";
import Brick from "app/components/builders/Brick";
import { Button } from "app/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "app/components/ui/card";
import useDynamicComponents from "app/hooks/useDynamicComponents";
import { CustomizableComponents } from "app/types";
import ProductCardImage from "./ProductCardImage";
import ProductCardPrice from "./ProductCardPrice";
import ProductCardTitle from "./ProductCardTitle";
import Image from "next/image";
import placeholderImage from "public/placeholder.png";

type Product = {
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { getComponent } = useDynamicComponents();
  const { style, props } = getComponent<{ variant: number }>(CustomizableComponents.ProductCard) || {};

  const variant = props?.variant || 1;

  return (
    <Brick style={style} className="mx-auto text-center items-center flex flex-col gap-2 border rounded-md relative">
      <div className="bg-white absolute left-2 top-2 flex flex-col p-1 text-black rounded opacity-10">
        <small className="text-xs">Product Card</small>
        {variant && <small className="text-xs">(Variant {variant})</small>}
      </div>
      {
        variant === 1 && <ProductCardVariant1 product={product} />
      }
      {
        variant === 2 && <ProductCardVariant2 product={product} />
      }
      {
        variant === 3 && <ProductCardVariant3 product={product} />
      }
    </Brick>
  )
}

const ProductCardVariant1 = ({ product }: { product: Product }) => (
  <>
    <CardHeader>
      <ProductCardTitle>{product.name}</ProductCardTitle>
    </CardHeader>
    <CardContent>
      <ProductCardImage src={placeholderImage.src} alt={product.name} />
      <ProductCardPrice>{product.price}</ProductCardPrice>
    </CardContent>
    <CardFooter>
      <Button>Buy Now</Button>
    </CardFooter>
  </>
)

const ProductCardVariant2 = ({ product }: { product: Product }) => (
  <>
    <CardHeader>
      <Button className="flex gap-x-1">Buy Now for
        <ProductCardPrice className="text-red-400 bold text-lg">{product.price}</ProductCardPrice>
        !
      </Button>
    </CardHeader>
    <CardContent>
      <Image src={placeholderImage.src} alt={product.name} width={200} height={200} />
    </CardContent>
  </>
)

const ProductCardVariant3 = ({ product }: { product: Product }) => (
  <div
    className="w-full h-full bg-cover bg-center bg-no-repeat rounded-mdr flex items-end justify-center p-2"
    style={{ backgroundImage: `url(${placeholderImage.src})` }}>
    <Button className="text-2xl">Buy Now</Button>
  </div>
)


export default ProductCard;