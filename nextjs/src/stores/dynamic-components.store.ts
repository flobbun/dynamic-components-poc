import { DynamicComponentsData } from "app/types";
import { create } from "zustand";

/*±±±±±±±±±±±±±±±±±±±±±± DYNAMIC COMPONENTS STORE ±±±±±±±±±±±±±±±±±±±±*/

type DynamicComponentsStore = {
    data: DynamicComponentsData | null;
    setData: (data: DynamicComponentsData) => void;
}

const useDynamicComponentsStore = create<DynamicComponentsStore>()((set) => ({
    data: null,
    setData: (data) => {
        set({ data });
    }
}));

export {
    /**
    * ### DynamicComponentsStore
    * @description DynamicComponentsStore is used to provide dynamic properties to components in the store. It comes with two main properties:
    * - styles: CSSProperties
    * - props: Record<string, any>
    *
    * ## How to apply dynamic properties to a component?
    *
    * ```tsx
    * import { useDynamicComponentsStore } from '@stores/dynamic-components.store';
    *
    * const ContainerComponent = () => {
    *    const { data } = useDynamicComponentsStore();
    *
    *    const { styles, props } = data['AbcComponent'];
    *
    *   return (
    *       <AbcComponent {...props} styles={styles}>
    *           <h1>Example</h1>
    *       </AbcComponent>
    *   )}
    * ```
    */
    useDynamicComponentsStore
}