import
{
    FC, 
    useEffect, 
    useState
}
from "react";

import Item from "./Item";

import { useNuiEvent } from "../../hooks/useNuiEvent";
import { FaArrowLeft, FaArrowRight, FaUser, FaSocks, FaTshirt, FaShoePrints, FaSmile, FaCheck, FaBan } from "react-icons/fa";
import { fetchNui } from "../../utils/fetchNui";

import './clothing.css'

const Shop: FC = () =>
{
    const [ shopData, setShopData ] = useState<OpenShopState>({ visible: false, pedData: [] });

    useNuiEvent<OpenShopEvent>('openShop', ( { visible, pedData }) =>
    {
        let data: ItemProps[];
        if (visible)
        {
            data = JSON.parse(pedData) as ItemProps[];
        }

        setShopData(prevState => ({ ...prevState, visible, pedData: data ?? [] }));
    });

    const handleCam = (bodyPart: TBodyPart) =>
    {
        fetchNui<boolean>("changeCam", JSON.stringify({part: bodyPart}));
    }

    const handleRotate = (side: TSide) =>
    {
        fetchNui<boolean>("rotate", JSON.stringify({side: side}));
    }

    const handleConfirm = (bool: boolean) =>
    {
        fetchNui('closeShop', JSON.stringify({buy: bool}))
    }
  
    return (
      <div style={ { display: shopData.visible ? "block" : "none", height: "100%" } }>
        <div className="container">
            <button onClick={() => handleRotate('left')} className="cam left"><FaArrowLeft /></button>
            <button onClick={() => handleRotate('right')} className="cam right"><FaArrowRight /></button>

            <div className="type-picker">
                <button onClick={() => handleCam("reset")} className="type-btn"><FaUser /></button>
                <button onClick={() => handleCam("face")} className="type-btn"><FaSmile /></button>
                <button onClick={() => handleCam("torso")} className="type-btn"><FaTshirt /></button>
                <button onClick={() => handleCam("leg")} className="type-btn"><FaSocks /></button>
                <button onClick={() => handleCam("shoes")} className="type-btn"><FaShoePrints /></button>
                <button onClick={() => handleConfirm(false)} className="type-btn rej"><FaBan /></button>
                <button onClick={() => handleConfirm(true)} className="type-btn conf"><FaCheck /></button>
            </div>
    

            <div className="clothing-container">
                <div className="clothing-header">
                    clothing shop name ...
                </div>
                <div className="clothing-sections">
                    {
                        shopData.pedData.map((item: ItemProps, index: number) =>
                        {
                            return <Item key={index} {...item} />
                        })
                    }
                </div>
            </div>
        </div>
      </div>
    )
}

export default Shop;