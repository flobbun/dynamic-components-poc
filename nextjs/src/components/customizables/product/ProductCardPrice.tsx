import useDynamicComponents from "app/hooks/useDynamicComponents";
import { CustomizableComponents } from "app/types";
import { HTMLAttributes } from "react";

type ProductCardPriceProps = HTMLAttributes<HTMLDivElement>

const ProductCardPrice = ({
    children,
    ...props
}: ProductCardPriceProps) => {
  const { getComponent } = useDynamicComponents();
  const { style } = getComponent(CustomizableComponents.ProductCardPrice) || {};

  return (
    <div style={style} {...props}>
      <span>$</span>
      <span>{children}</span>
    </div>
  )
}

export default ProductCardPrice