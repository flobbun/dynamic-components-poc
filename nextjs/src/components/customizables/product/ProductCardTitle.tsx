import useDynamicComponents from "app/hooks/useDynamicComponents";
import { CustomizableComponents } from "app/types";
import { HTMLAttributes } from "react"

type ProductCardTitleProps = HTMLAttributes<HTMLDivElement>

const ProductCardTitle = ({
    children
  }: ProductCardTitleProps) => {
    const { getComponent } = useDynamicComponents();
    const { style } = getComponent(CustomizableComponents.ProductCardTitle) || {};

    return (
        <h3 style={style}>{children}</h3>
    )
  }

export default ProductCardTitle