import { useDynamicComponentsStore } from "app/stores/dynamic-components.store";
import { CustomizableComponent, CustomizableComponents, CustomizeComponentRequestBody, DynamicComponentsData, PatchDynamicComponentsRequestBody } from "app/types";
import { customizeComponent as customizeComponentOperation } from "operations/customizeComponent";
import { getDynamicComponents as getDynamicComponentsOperation } from "operations/getDynamicComponents";
import { patchDynamicComponents as patchDynamicComponentsOperation } from "operations/patchDynamicComponents";
import { useCallback, useEffect, useState } from "react";

/**
 * ### Custom hook to manage dynamic components
*/
const useDynamicComponents = () => {
    const [data, setData] = useState<DynamicComponentsData | null>(null);
    const [revalidate, setRevalidate] = useState(false);
    const setDynamicComponents = useDynamicComponentsStore((state) => state.setData);
    const dynamicComponents = useDynamicComponentsStore((state) => state.data);

    const saveData = (data: DynamicComponentsData) => {
        setData(data); // Saves locally to access it immediately in the component
        setDynamicComponents(data); // Saves in the store to access it globally
    }

    const getDynamicComponents = useCallback(async () => {
        if (dynamicComponents && !revalidate)
            return dynamicComponents;
        const data = await getDynamicComponentsOperation();
        if (!data)
            return;
        saveData(data);
        setRevalidate(false);
        return data;
    }, [revalidate, dynamicComponents])

    const patchDynamicComponents = async (params: PatchDynamicComponentsRequestBody) => {
        const updatedData = await patchDynamicComponentsOperation(params);
        if (!updatedData)
            return;
        saveData(updatedData);
        setRevalidate(true);
    }


    const customizeComponent = async (params: CustomizeComponentRequestBody) => {
        const updatedData = await customizeComponentOperation(params);
        if (!updatedData)
            return;
        saveData(updatedData);
        setRevalidate(true);
    }

    function getComponent<T = any>(componentName: CustomizableComponents): CustomizableComponent<T> | undefined {
        const components = data?.components || dynamicComponents?.components;
        if (!components) return;
        const component = components[componentName];
        if (!component) {
            console.error(`Component ${componentName} not found`);
            return;
        }
        return component;
    };

    return {
        data,
        getDynamicComponents,
        patchDynamicComponents,
        customizeComponent,
        /**
         * Returns the component with the given name.
         */
        getComponent,
        /**
         * Dynamic components data, could be cached or fetched from the server
         */
        dynamicComponents: data?.components
    };
}

export default useDynamicComponents;