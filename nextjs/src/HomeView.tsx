import ProductListHeader from "app/components/customizables/ProductListHeader/ProductListHeader";
import { CustomizableComponent, CustomizableComponents } from "app/types";
import { CSSProperties, useEffect, useState } from "react";
import ProductList from "./components/customizables/ProductList/ProductList";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";
import useDynamicComponents from "./hooks/useDynamicComponents";
import assignObject from "./lib/assignObject";
import tryParseJSON from "./lib/tryParseJSON";
import { askForCSS } from "./server/operations/askForCSS";
import useHomeViewStore from "./stores/home-view.store";

/*±±±±±±±±±±±±±± MAIN HOME VIEW ±±±±±±±±±±±±±±*/

const HomeView = () => {
  return (
    <main className="flex p-2 h-full gap-x-1">
      <Card className="flex flex-col h-full w-2/4 items-center p-2 gap-y-1">
        <ControlPanelView />
        <LLMEditor />
        <EditorView />
      </Card>
      <VisualizationView />
    </main>
  )
}

/*±±±±±±±±±±±±±± CONTROL PANEL ±±±±±±±±±±±±±±*/

const ControlPanelView = () => {
  const { editionDisabled, toggleEdition } = useHomeViewStore();

  return (
    <Card className="flex flex-col items-center justify-center gap-y-4 w-full h-1/4 p-2">
      <p className="absolute top-5 left-6 text-black opacity-10">Control Panel</p>
      <label className="flex gap-x-2 items-center">
        Disable edition
        <Checkbox onClick={toggleEdition} checked={editionDisabled} />
      </label>

      <div className="flex flex-col items-center justify-center gap-y-1">
        <ProductListHeaderEdition />
        <ProductListEdition />
        <ProductCardEdition />
      </div>
    </Card>
  )
}

const ProductListHeaderEdition = () => {
  const { editorContent, setEditorContent, setDirty, editionDisabled } = useHomeViewStore();

  const onLayoutChange = (value: string) => {
    if (!editorContent) return;
    const parsedData = tryParseJSON(editorContent);
    if (!parsedData) return;
    setDirty(true);
    const productListHeader = parsedData.components[CustomizableComponents.ProductsListHeader];
    if (!productListHeader) return;
    Object.assign(productListHeader.grid, { cols: parseInt(value) });
    setEditorContent(JSON.stringify(parsedData, null, 8));
  }

  return (
    <div className="flex items-center gap-x-2 w-full">
      <p className="text-lg">Product List Header</p>
      <Select onValueChange={onLayoutChange} disabled={editionDisabled}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Layout" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 Column</SelectItem>
          <SelectItem value="2">2 Columns</SelectItem>
          <SelectItem value="3">3 Columns</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

const ProductListEdition = () => {
  const { editorContent, setEditorContent, setDirty, editionDisabled } = useHomeViewStore();

  const themeMap: Record<string, CSSProperties> = {
    dark: {
      backgroundColor: "black",
      color: "white",
    },
    light: {
      backgroundColor: "white",
      color: "black"
    },
    system: {
      backgroundColor: "#333",
      color: "green",
    }
  }

  const layoutMap: Record<number, CustomizableComponent> = {
    1: {
      style: {
        gridTemplateColumns: "repeat(1, 1fr)"
      },
    },
    2: {
      style: {
        gridTemplateColumns: "repeat(2, 1fr)"
      },
    },
    3: {
      style: {
        gridTemplateColumns: "repeat(3, 1fr)"
      },
    }
  }

  const onThemeChange = (value: string) => {
    if (!editorContent) return;
    const parsedData = tryParseJSON(editorContent);
    if (!parsedData) return;
    setDirty(true);
    const theme = themeMap[value];
    const productList = parsedData.components.ProductList;
    const productCard = parsedData.components.ProductCard;
    if (!productList || !productCard) return;
    Object.assign(productList?.style, theme);
    Object.assign(productCard?.style, theme);
    setEditorContent(JSON.stringify(parsedData, null, 8));
  }

  const onLayoutChange = (value: string) => {
    if (!editorContent) return;
    const parsedData = tryParseJSON(editorContent);
    if (!parsedData) return;
    setDirty(true);
    const layout = layoutMap[parseInt(value)]!;
    const productList = parsedData.components.ProductList;
    if (!productList) return;
    assignObject(productList, layout, "style");
    setEditorContent(JSON.stringify(parsedData, null, 8));
  }

  return (
    <div className="flex items-center gap-x-2 w-full">
      <p className="text-lg">Product List</p>
      <div className="flex gap-x-4 items-center justify-center">
        <Select onValueChange={onThemeChange} disabled={editionDisabled}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onLayoutChange} disabled={editionDisabled}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Column</SelectItem>
            <SelectItem value="2">2 Columns</SelectItem>
            <SelectItem value="3">3 Columns</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

const ProductCardEdition = () => {
  const { editorContent, setEditorContent, setDirty, editionDisabled } = useHomeViewStore();

  const onVariantChange = (value: string) => {
    if (!editorContent) return;
    const parsedData = tryParseJSON(editorContent);
    if (!parsedData) return;
    setDirty(true);
    const productCard = parsedData.components.ProductCard;
    if (!productCard) return;
    assignObject(productCard, { props: { variant: parseInt(value) } }, "props");
    setEditorContent(JSON.stringify(parsedData, null, 8));
  }

  return (
    <div className="flex items-center gap-x-2 w-full">
      <p className="text-lg">Product Card</p>
      <div className="flex gap-x-4 items-center justify-center">
        <Select onValueChange={onVariantChange} disabled={editionDisabled}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Variant 1</SelectItem>
            <SelectItem value="2">Variant 2</SelectItem>
            <SelectItem value="3">Variant 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

/*±±±±±±±±±±±±±± LLM EDITOR ±±±±±±±±±±±±±±*/

const LLMEditor = () => {
  const [prompt, setPrompt] = useState<string>("");
  const { editorContent, setEditorContent, setDirty, editionDisabled } = useHomeViewStore();

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setPrompt(event.target.value);
  }

  const handleClick = async () => {
    if (!editorContent) return;
    const parsedData = tryParseJSON(editorContent);
    if (!parsedData) return;
    setDirty(true);

    const newJSON = await askForCSS({ prompt });
    if (!newJSON) return;
    setEditorContent(newJSON);
    setPrompt("");
  }

  return (
    <div className="flex w-full items-center gap-y-1">
      <p className="absolute left-6 text-white opacity-10">LLM Editor</p>
      <Textarea placeholder="Write a prompt..." className="h-full w-full flex flex-col gap-y-2  bg-slate-900 text-white resize-none" disabled={editionDisabled} onChange={handleOnChange} />
      <Button disabled={editionDisabled} onClick={handleClick} className="w-1/12 h-full">Send</Button>
    </div>
  )
}


/*±±±±±±±±±±±±±± EDITOR ±±±±±±±±±±±±±±*/

const EditorView = () => {
  const [syntaxError, setSyntaxError] = useState<string>("");
  const { editionDisabled, editorContent, setEditorContent, setDirty, dirty } = useHomeViewStore();
  const { patchDynamicComponents, getDynamicComponents } = useDynamicComponents();

  useEffect(() => {
    (async () => {
      if (editionDisabled) return;
      const data = await getDynamicComponents();
      if (data) {
        setEditorContent(JSON.stringify(data, null, 8));
      }
    })().catch(console.error);
  }, [editionDisabled]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setDirty(true);
    setEditorContent(event.target.value);
  }

  useEffect(() => {
    (async () => {
      if (editorContent && dirty) {
        const parsedData = tryParseJSON(editorContent);
        if (!parsedData) {
          setSyntaxError("border-red-600 border-4");
          return;
        }

        setSyntaxError("");
        await patchDynamicComponents(parsedData);
      }
    })().catch(console.error);
  }, [editorContent]);

  return (
    <div className="w-full h-full">
      <p className="absolute left-6 text-white opacity-10">Components Editor</p>
      <Textarea disabled={editionDisabled} className={`h-full flex flex-col gap-y-2 w-full bg-slate-900 text-white ${syntaxError}`} value={editorContent || ""} onChange={onChange} />
    </div>
  )
}

/*±±±±±±±±±±±±±± VISUALIZATION ±±±±±±±±±±±±±±*/

const VisualizationView = () => {
  return (
    <Card className="flex flex-col gap-y-1 w-2/4 p-1">
      <ProductListHeader />
      <ProductList />
    </Card>
  )
}

export default HomeView