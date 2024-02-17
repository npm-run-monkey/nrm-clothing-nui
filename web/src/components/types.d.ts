interface ItemState
{
    componentId: number;
    drawable: number;
    texture: number;
}

interface ItemProps extends ItemState
{
    type: ItemType;
    title: string;
}

interface OpenShopEvent
{
    visible: boolean;
    pedData: string;
}

interface OpenShopState
{
    visible: boolean;
    pedData: ItemProps[];
}

type handleInputType = "item" | "texture";

type ItemType = "item" | "prop";
type TBodyPart = "face" | "mask" | "hair" | "torso" | "leg" | "bag" | "shoes" | "accessory" | "shirt" | "kevlar" | "badge" | "torso2" | "reset";
type TSide = "left" | "right"