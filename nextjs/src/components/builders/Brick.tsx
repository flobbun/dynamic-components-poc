import { FC, HTMLAttributes, PropsWithChildren } from "react"

type BrickProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const Brick: FC<BrickProps> = ({ style, children, className, draggable = false }) => {
  return (
    <div draggable={draggable} className={className} style={style}>
      {children}
    </div>
  )
}

export default Brick;