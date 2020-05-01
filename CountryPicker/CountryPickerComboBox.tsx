import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useConst } from "@uifabric/react-hooks";
import { initializeIcons, mergeStyles, FontIcon, ImageIcon,Stack, VirtualizedComboBox,TextField, IComboBoxOption,IComboBox} from "@fluentui/react"; 

import useFetch from "use-http";
import {Country,GetCountryName,GetCountry,GetFlagUrl} from "./CountryUtils"
import CountryInfoPanel, {ICountryInfoPanelProps} from "./CountryInfoPanel"

//PROPS for component (received from caller)
export interface ICountryPickerComboBoxProps {
    countrycode: string;
    language: string;
    promoted: string[]|undefined;
    limit: string[]|undefined;
    displayinfo : boolean;
    readonly: boolean;
    masked: boolean;
    onChange: (countrycode:string,countryname:string) => void;
}

const CountryPickerComboBox = (props : ICountryPickerComboBoxProps): JSX.Element => {

    //INITIALISATION HOOK
    useConst(()=>{
        initializeIcons();
    });
    
    //STATE HOOKS VARIABLES
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country|undefined>(undefined);

    const [options, setOptions] = useState<IComboBoxOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<IComboBoxOption|undefined>(undefined);

    //FETCH HOOKS
    const { loading, error, data  } = useFetch("https://restcountries.eu/rest/v2/all", undefined, []) 

    //EFFECT HOOKS    
    //-Set Countries  when 'data' changes (when retrieved from API call) 
    useEffect(() => {
        
        if(!loading && !error && data)
        {
            setCountries(data as Country[])    
        } 

    }, [data]);

    //-Set options  when 'countries' changes
    useEffect(() => {
        
        if(!loading && !error && data)
        {
            setOptions(getOptions());
        } 

    }, [countries]);

    //SET selectedOption
    useEffect(() => {
        
        if(!loading && !error && data)
        {
            
            setSelectedOption(getSelectedOption(props.countrycode))
        }
        
    }, [options,props.countrycode]);

    
    

    //-Set 'selectedCountry' and Callback to PCF when 'selectedOption' changes 
    useEffect(() => {
        
        if(!loading && !error && data)
        {
            if(selectedOption && (selectedCountry === undefined || selectedCountry?.alpha3Code !== selectedOption?.key)) {
               
                setSelectedCountry(GetCountry(countries,selectedOption.key));
                props.onChange(selectedOption.key.toString(),selectedOption.text); 
            } else if(selectedCountry === undefined && options.length > 1){ //Clear only if options are defined PREVENTS clear on init
                
                setSelectedCountry(undefined);
                props.onChange("","");
            }
        };
        
            
    }, [selectedOption]);

    //Get combobox options from countries
    const getOptions = ():IComboBoxOption[] => {
        let comboboxoptions:IComboBoxOption[] = Array.from(countries, i => { return {
            key:i.alpha3Code,
            text:GetCountryName(i,props.language)}
        });
        //filter out some values if 'limit' contains values                                                                     
        if(props.limit){
            comboboxoptions = comboboxoptions.filter(i => props.limit != undefined && props.limit.includes(i.key.toString()))
        }

        //sort alphabetically by country name
        comboboxoptions.sort(sortByCountryName)

        //sort if 'promoted' (Will bubble up promoted countries)
        if(props.promoted){
            comboboxoptions.sort(sortByPromoted)
        }

        return comboboxoptions;
    };

    //Get an option by countrycode (Assumes that country code are unique)
    const getSelectedOption = (countrycode:string) : IComboBoxOption | undefined => {
        let selected = options.filter(o => o.key === countrycode);
        return selected.length === 0 ? undefined : selected[0];
    };

    //Props to pass to CountryInfoPanel
    const getCountryInfoPanelProps = ():ICountryInfoPanelProps =>{
        return selectedCountry ?
             {country:selectedCountry,disabled:false,displayicon:props.displayinfo}  :      
             {country:undefined,disabled:true,displayicon:props.displayinfo}
    }

    //Sort functions for combobox options
    const sortByCountryName = (a:IComboBoxOption,b:IComboBoxOption):number => {

        if (a.text > b.text) return 1;
        if (b.text > a.text) return -1;

        return 0;
    }

    const sortByPromoted = (a:IComboBoxOption,b:IComboBoxOption):number => {
        let ranka = promotedRank(a.key);
        let rankb = promotedRank(b.key);
           
        if (ranka > rankb) return 1;
        if (rankb > ranka) return -1;

        return 0;
    }

    // Rank of a given country compared to the 'promoted' countri list. 
    //Ex. promoted = [USA,CAN,MEX], USA=1, CAN=2, MEX=3, COL=0. If promoted is empty rank = 0 for all countries
    const promotedRank = (countrykey:string | number):Number => {

        var last = props.promoted?.length ?? 0;
        var rank = props.promoted?.indexOf(countrykey.toString()) ?? last;
        return rank < 0 ? last : rank;
    }
        
    //STYLES
    const leftIconClass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 50,
        margin: "1px",      
    });
    
    //EVENTS
    //- When value of combobox changes, Change selected option and callback to PCF
    const onComboboxChanged = (event: React.FormEvent<IComboBox>,option?:IComboBoxOption|undefined,index? : number | undefined) => { 
        
        setSelectedOption(option);

    } 

    //RENDERING
    //If country is defined display flag, otherwise display Globe icon
    const renderFlagIcon = ():JSX.Element => {
        return selectedOption  ?
            <ImageIcon className={leftIconClass} imageProps={{src:GetFlagUrl(selectedOption.key), height:"100%", width:"100%"}}/> :
            <FontIcon iconName="Globe" className={leftIconClass} />
    }

    //- Rendering of the dropdown options (Flag + Countryname)
    const onRenderOption = (option:IComboBoxOption|undefined): JSX.Element => {
        
        return (
        <div>

            {option && option.key && (
                <ImageIcon 
                    style={{ marginRight: "8px", width:25, height:17 }} 
                    imageProps={{src:GetFlagUrl(option.key),width:25,height:17}}
                />
            )}

            {option && option.text && (
                <span>{option.text}</span>
            )}
            
        </div>
        );
    
    }

    //MAIN RENDERING
    if(loading){
        return <div>Loading...</div>
    }if(error){
        return <div>Error fetching data...</div>
    }
    if(countries.length ===0){
        return <div>No countries to display...</div>
    }
    if(props.masked){
        return(
            <Stack tokens={{ childrenGap: 2 }} horizontal>
                <FontIcon iconName="Lock" className={leftIconClass} />     
                <TextField value="*********" style={{width:"100%"}}/>
            </Stack>
        );
    }
    else{
        
        return (
            <div>
                <Stack  horizontal>
                    {renderFlagIcon()}
                    
                    <VirtualizedComboBox
                        onRenderOption={onRenderOption}
                        onChange={onComboboxChanged}          
                        selectedKey={selectedOption?.key}
                        text={selectedOption?.text}
                        allowFreeform={true}
                        autoComplete="on"
                        options={options}
                        style={{width:"100%"}}
                        disabled={props.readonly}
                    />
                    
                    {React.createElement(CountryInfoPanel,getCountryInfoPanelProps())}

                </Stack>               
            </div>
                       
        );
    }

}

export default CountryPickerComboBox;