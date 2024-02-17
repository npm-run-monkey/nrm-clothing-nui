import
{
    FC, 
    useEffect, 
    useState,
    useRef
}
from "react";

import { FaPlus, FaMinus } from "react-icons/fa";
import { fetchNui } from "../../utils/fetchNui";

const Item: FC<ItemProps> = ( { type, title, componentId, drawable, texture } ) =>
{
    const [ state, setState ] = useState<ItemState>( { componentId, drawable, texture } );

    const itemRef = useRef<HTMLInputElement>(null);
    const textureRef = useRef<HTMLInputElement>(null);

    const didMount = useRef<boolean>(false);

    useEffect(() =>
    {
        if (!didMount.current)
        {
            didMount.current = true;
            return;
        }

        if (type == "item")
        {
            fetchNui('changeVariation', JSON.stringify( { componentId: state.componentId, drawable: state.drawable, texture: state.texture + 1 } ));
            return;
        }

        fetchNui('changeProp', JSON.stringify({ componentId: state.componentId, drawable: state.drawable, texture: state.texture + 1 }));
    }, [ state ]);

    const handleInputState = (type: handleInputType, int: number) =>
    {
        if (type == "item")
        {
            setState(prevState => ({ ...prevState, drawable: prevState.drawable + int }));
            return;
        }

        setState(prevState => ({ ...prevState, texture: prevState.texture + int }))
    }

    const handleOnChangeInputState = (type: handleInputType) => 
    {
        if (type == "item")
        {
            setState(prevState => ({ ...prevState, drawable: Number(itemRef.current?.value) ?? 0 }));
            return;
        }

        setState(prevState => ({ ...prevState, texture: Number(textureRef.current?.value) ?? 0 }));
    }

    return (
        <div className="clothing-section">
            <div className="section-header">
                {title.toUpperCase()}
            </div>
            <div className="section">
                <button onClick={( ) => handleInputState("item", -1)}><FaMinus /></button>
                <div className="comp">
                    <p>ITEM</p>
                    <input ref={itemRef} onChange={() => handleOnChangeInputState("item")} value={state.drawable}/>
                </div>
                <button onClick={( ) => handleInputState("item", 1)}><FaPlus /></button>
            </div>
            <div className="section">
            <button onClick={( ) => handleInputState("texture", -1)}><FaMinus /></button>
                <div className="comp">
                    <p>TEXTURE</p>
                    <input ref={textureRef} onChange={() => handleOnChangeInputState("texture")} value={state.texture}/>
                </div>
                <button onClick={( ) => handleInputState("texture", 1)}><FaPlus /></button>
            </div>
        </div>
    )
}

export default Item;