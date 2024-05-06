import { Card } from "app/components/ui/card"
import useDynamicComponents from "app/hooks/useDynamicComponents"
import tryParseJSON from "app/lib/tryParseJSON"
import useHomeViewStore from "app/stores/home-view.store"
import { CustomizableComponents } from "app/types"
import Grid, { WidthProvider } from "react-grid-layout"

const ResponsiveGridLayout = WidthProvider(Grid)

const ProductListHeader = () => {
    const { setEditorContent, setDirty, editorContent, editionDisabled } = useHomeViewStore()
    const linkStyle = "p-1 w-40 underline underline-offset-2 hover:text-blue-300 cursor-pointer"

    const { getComponent } = useDynamicComponents();

    const { style, grid } = getComponent(CustomizableComponents.ProductsListHeader) || {};

    const onLayoutChange = (layout: Grid.Layout[]) => {
        if (!editorContent) return;
        const parsedData = tryParseJSON(editorContent);
        if (!parsedData) return;
        setDirty(true);
        const productListHeader = parsedData.components[CustomizableComponents.ProductsListHeader];
        if (!productListHeader) return;
        Object.assign(productListHeader.grid, { layout: layout });
        setEditorContent(JSON.stringify(parsedData, null, 8));
    }

    return (
        <Card style={style} className="flex flex-col gap-x-2 text-center p-3 relative">
            <small className="text-sm absolute left-1 top-1 opacity-10">Product List Header (Grid System)</small>
            <ResponsiveGridLayout
                isDraggable={!editionDisabled}
                isResizable={!editionDisabled}
                layout={grid?.layout || []}
                className="flex w-full"
                cols={grid?.cols || 3}
                rowHeight={30}
                width={400}
                onLayoutChange={onLayoutChange}
            >
                <p key="1" className={linkStyle}>All Products</p>
                <p key="2" className={linkStyle}>Best sellers</p>
                <div key="3"><input className="border rounded-md p-1 w-full" placeholder="Search..." type="search" /></div>
            </ResponsiveGridLayout>
        </Card >
    )
}

export default ProductListHeader