//Extracted interface from this API : https://restcountries.eu/rest/v2/all

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

export interface Translations {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
}

export interface RegionalBloc {
    acronym: string;
    name: string;
    otherAcronyms: string[];
    otherNames: string[];
}

export interface Country {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: number[];
    demonym: string;
    area?: number;
    gini?: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    currencies: Currency[];
    languages: Language[];
    translations: Translations;
    flag: string;
    regionalBlocs: RegionalBloc[];
    cioc: string;
}



export const GetCountry = (countries:Country[],countrykey:undefined|string|number) : Country | undefined => {
        
    var selectedCountry = countries.filter(c => c.alpha3Code === countrykey);
    return selectedCountry.length === 0 ? undefined : selectedCountry[0];
}

export const GetFlagUrl = (key:string|number|undefined):string => 
        "https://restcountries.eu/data/" + key?.toString().toLowerCase() + ".svg"

export const GetCountryName = (country:Country, language:string):string => {

    let name = "";
    switch (language){
        case "en":
             name = country.name;  
             break;        
        case "de":
            name = country.translations.de ?? country.name;
            break;
        case "es":
            name = country.translations.es ?? country.name;
            break;
        case "fr":
            name = country.translations.fr ?? country.name;
            break;
        case "ja":
            name = country.translations.ja ?? country.name;
            break;
        case "it":
            name = country.translations.it ?? country.name;
            break;
        case "pt":
            name = country.translations.pt ?? country.name;
            break;
        case "nl":
            name = country.translations.nl ?? country.name;
            break;
        case "fa":
            name = country.translations.fa ?? country.name;
            break;
        default:
            name = country.name;
    }
    //in case one of the translation is empty, default to country.name
    if(name == ""){
        name = country.name;
    }
    return name;
}



