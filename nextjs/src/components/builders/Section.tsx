import { FC, HTMLAttributes, PropsWithChildren } from "react"
import GridLayout from "react-grid-layout";

type SectionProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  layout?: ReactGridLayout.Layout[];
  cols?: number;
  rowHeight?: number;
  width?: number;
  onLayoutChange?: (layout: ReactGridLayout.Layout[]) => void;
}

const Section: FC<SectionProps> = ({ className, style, children, layout, cols, rowHeight, width, onLayoutChange }) => {

  const onDrop = (layout: ReactGridLayout.Layout[], layoutItem: ReactGridLayout.Layout, _event: MouseEvent) => {
    console.log(layout, layoutItem)
  }

  return (
    <GridLayout
    isDraggable={true}
    style={style}
    className={className}
    layout={layout}
    cols={cols}
    rowHeight={rowHeight}
    width={width}
    onLayoutChange={onLayoutChange}
    onDrop={onDrop}
    >
        {children}
    </GridLayout>
  )
}

export default Section