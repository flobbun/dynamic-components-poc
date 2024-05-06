import useDynamicComponents from "app/hooks/useDynamicComponents";
import { CustomizableComponents } from "app/types";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface ProductCardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

const ProductCardImage = (({ src, alt, className, ...props }: ProductCardImageProps) => {
  const { getComponent } = useDynamicComponents();
  const { style } = getComponent(CustomizableComponents.ProductCardImage) || {};

  return (
    <Image style={style} {...props} width={100} height={100} src={src} alt={alt}/>
  )
})

export default ProductCardImage;