import * as React from "react";
import { FontIcon,ImageIcon,mergeStyles } from "@fluentui/react"; 
import { GetFlagUrl} from "./../utils/CountryUtils"
import { useSelectedCountry } from "../hooks/useCountries";



//If country is defined display flag, otherwise display Globe icon
const FlagIcon = ():JSX.Element => {


    const {data:selectedcountry} = useSelectedCountry();
    

    const flagiconclass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 50,
        margin: "1px",      
    });


    return selectedcountry !== undefined  ?
        <ImageIcon className={flagiconclass} imageProps={{src:GetFlagUrl(selectedcountry.alpha3Code), height:"100%", width:"100%"}}/> :
        <FontIcon iconName="Globe" className={flagiconclass} />
}
export default FlagIcon;