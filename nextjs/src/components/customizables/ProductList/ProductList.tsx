import useDynamicComponents from "app/hooks/useDynamicComponents";
import { CustomizableComponents, Product } from "app/types";
import Section from "../../builders/Section";
import ProductCard from "../product/ProductCard";

const products: Product[] = [
  {
    image: 'https://via.placeholder.com/150',
    name: 'Product Example',
    price: 100
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Product Example 2',
    price: 200
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Product Example 3',
    price: 300
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Product Example 4',
    price: 400
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Product Example 5',
    price: 500
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Product Example 6',
    price: 600
  }
]

const ProductList = () => {
  const { getComponent } = useDynamicComponents();

  const { style } = getComponent(CustomizableComponents.ProductList) || {};

  return (
    <Section style={style}>
      {products.map((product) => (
        <ProductCard key={product.name} product={product}></ProductCard>
      ))}
    </Section>
  )
}

export default ProductList