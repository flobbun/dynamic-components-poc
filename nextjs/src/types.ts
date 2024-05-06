import { CSSProperties } from "react"
import { ReactGridLayoutProps } from "react-grid-layout"

export enum CustomizableComponents {
    ProductList = 'ProductList',
    ProductCard = 'ProductCard',
    ProductsListHeader = 'ProductsListHeader',
    ProductCardImage = 'ProductCardImage',
    ProductCardTitle = 'ProductCardTitle',
    ProductCardPrice = 'ProductCardPrice',
    ProductCardButton = 'ProductCardButton',
}

export type CustomizableComponent<T = any> = {
    style: CSSProperties;
    props?: T | Record<string, any>;
    grid?: Partial<ReactGridLayoutProps>;
}

export type DynamicComponentsData = {
    components: Record<string, CustomizableComponent>
}

export type GetDynamicComponentsResponse = DynamicComponentsData;

export type CustomizeComponentRequestBody = {
    component: CustomizableComponents
} & CustomizableComponent;

export type CustomizeComponentResponse = DynamicComponentsData;

export type PatchDynamicComponentsRequestBody = DynamicComponentsData;
export type PatchDynamicComponentsResponse = DynamicComponentsData;

export type AskForCSSRequestBody = {
    prompt: string
}

export type AskForCSSResponse = string; // DynamicComponentsData stringified

export type Product = {
    image: string
    name: string
    price: number
}

export enum ApiPaths {
    DynamicComponents = '/dynamic-components',
    Ask = '/ask',
}