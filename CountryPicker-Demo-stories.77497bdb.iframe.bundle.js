"use strict";(self.webpackChunkpcf_project=self.webpackChunkpcf_project||[]).push([[318],{"./CountryPicker/components/CountryPickerApp.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>components_CountryPickerApp});var lib=__webpack_require__("./node_modules/@fluentui/font-icons-mdl2/lib/index.js"),react=__webpack_require__("./node_modules/react/index.js"),queryClient=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/queryClient.mjs"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ViewModelProvider=_ref=>{let{viewmodel,children}=_ref;return(0,jsx_runtime.jsx)(ViewModelContext.Provider,{value:viewmodel,children})};ViewModelProvider.displayName="ViewModelProvider";const ViewModelContext=react.createContext(void 0),useViewModel=()=>(0,react.useContext)(ViewModelContext);try{ViewModelProvider.displayName="ViewModelProvider",ViewModelProvider.__docgenInfo={description:"",displayName:"ViewModelProvider",props:{viewmodel:{defaultValue:null,description:"",name:"viewmodel",required:!0,type:{name:"IViewModel"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["CountryPicker/services/ViewModelProvider.tsx#ViewModelProvider"]={docgenInfo:ViewModelProvider.__docgenInfo,name:"ViewModelProvider",path:"CountryPicker/services/ViewModelProvider.tsx#ViewModelProvider"})}catch(__react_docgen_typescript_loader_error){}var Stack=__webpack_require__("./node_modules/@fluentui/react/lib/components/Stack/Stack.js"),VirtualizedComboBox=__webpack_require__("./node_modules/@fluentui/react/lib/components/ComboBox/VirtualizedComboBox.js"),ImageIcon=__webpack_require__("./node_modules/@fluentui/react/lib/components/Icon/ImageIcon.js"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),axios=__webpack_require__("./node_modules/axios/lib/axios.js");const GetCountryName=(country,language)=>{let name="";switch(language){case"en":default:name=country.name.common;break;case"de":name=country.translations.deu?.common??country.name.common;break;case"es":name=country.translations.spa?.common??country.name.common;break;case"fr":name=country.translations.fra?.common??country.name.common;break;case"ja":name=country.translations.jpn?.common??country.name.common;break;case"it":name=country.translations.ita?.common??country.name.common;break;case"pt":name=country.translations.por?.common??country.name.common;break;case"nl":name=country.translations.nld?.common??country.name.common;break;case"fa":name=country.translations.ara?.common??country.name.common}return""==name&&(name=country.name.common),name},sortByOptionText=(a,b)=>a.text>b.text?1:b.text>a.text?-1:0;const useAllCountries=()=>{const{data,isLoading,isError}=(0,useQuery.a)(["countries"],(()=>(async()=>{const{data}=await axios.Z.get("https://restcountries.com/v3.1/all?fields=name,flags,cca3,capital,region,subregion,translations,population,timezones,currencies,borders,languages");return data})()));return{countries:data,isLoading,isError}},useFilteredCountries=()=>{const vm=useViewModel(),{countries,isLoading,isError}=useAllCountries(),filterdcountries=countries?.filter((c=>void 0===vm.limit||vm.limit.includes(c.cca3)));return{countries:filterdcountries,isLoading,isError}},useCountryOptions=()=>{const vm=useViewModel(),{countries,isLoading,isError}=useFilteredCountries(),options=countries?((data,vm)=>data.map((c=>({key:c.cca3,text:GetCountryName(c,vm.language)}))).sort(sortByOptionText).sort(function sortByPromoted(promoted){return function(a,b){const last=promoted?.length??0,keya=a.key.toString(),keyb=b.key.toString(),ranka=promoted?.includes(keya)?promoted.indexOf(keya):last,rankb=promoted?.includes(keyb)?promoted.indexOf(keyb):last;return ranka>rankb?1:rankb>ranka?-1:0}}(vm.promoted)))(countries,vm):void 0;return{options,isLoading,isError}},useCountry=code=>{useViewModel();const{countries,isLoading,isError}=useAllCountries(),country=countries?.find((country=>country.cca3===code));return{country,isLoading,isError}},useSelectedCountry=()=>{const vm=useViewModel(),{countries,isLoading,isError}=useFilteredCountries(),selectedcountry=countries?.find((country=>country.cca3===vm.countrycode));return{selectedcountry,isLoading,isError}},CountryPickerOption=option=>{const{country}=useCountry(option?.key.toString()??"");return(0,jsx_runtime.jsxs)("div",{children:[option&&option.key&&(0,jsx_runtime.jsx)(ImageIcon.X,{style:{marginRight:"8px",width:25,height:17},imageProps:{src:country?.flags.png,width:25,height:17}}),option&&option.text&&(0,jsx_runtime.jsx)("span",{children:option.text})]})};CountryPickerOption.displayName="CountryPickerOption";const components_CountryPickerOption=CountryPickerOption;try{CountryPickerOption.displayName="CountryPickerOption",CountryPickerOption.__docgenInfo={description:"",displayName:"CountryPickerOption",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["CountryPicker/components/CountryPickerOption.tsx#CountryPickerOption"]={docgenInfo:CountryPickerOption.__docgenInfo,name:"CountryPickerOption",path:"CountryPicker/components/CountryPickerOption.tsx#CountryPickerOption"})}catch(__react_docgen_typescript_loader_error){}var style_utilities_lib=__webpack_require__("./node_modules/@fluentui/style-utilities/lib/index.js"),FontIcon=__webpack_require__("./node_modules/@fluentui/react/lib/components/Icon/FontIcon.js"),Image=__webpack_require__("./node_modules/@fluentui/react/lib/components/Image/Image.js"),IconButton=__webpack_require__("./node_modules/@fluentui/react/lib/components/Button/IconButton/IconButton.js"),Panel=__webpack_require__("./node_modules/@fluentui/react/lib/components/Panel/Panel.js");const CountryFlag=_ref=>{let{code,index}=_ref;const{country}=useCountry(code),flagIconClass=(0,style_utilities_lib.y0)({fontSize:30,height:30,width:55,margin:"1px"});return(0,jsx_runtime.jsxs)(Stack.K,{children:[(0,jsx_runtime.jsx)(ImageIcon.X,{className:flagIconClass,imageProps:{src:country?.flags.png??"",width:46,height:30}}),(0,jsx_runtime.jsxs)("span",{children:[country?.name?.common," (",code,")"]}),(0,jsx_runtime.jsx)("br",{})]})};CountryFlag.displayName="CountryFlag";const components_CountryFlag=CountryFlag;try{CountryFlag.displayName="CountryFlag",CountryFlag.__docgenInfo={description:"",displayName:"CountryFlag",props:{code:{defaultValue:null,description:"",name:"code",required:!0,type:{name:"string"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["CountryPicker/components/CountryFlag.tsx#CountryFlag"]={docgenInfo:CountryFlag.__docgenInfo,name:"CountryFlag",path:"CountryPicker/components/CountryFlag.tsx#CountryFlag"})}catch(__react_docgen_typescript_loader_error){}const components_CountryInfoPanel=()=>{const[isOpen,openPanel,dismissPanel]=(initialValue=>{const[value,setValue]=(0,react.useState)(initialValue);return[value,()=>setValue(!0),()=>setValue(!1)]})(!1),{selectedcountry}=useSelectedCountry(),panelIconClass=((0,style_utilities_lib.y0)({fontSize:30,height:30,width:55,margin:"1px"}),(0,style_utilities_lib.y0)({fontSize:17,width:20})),bold=(0,style_utilities_lib.y0)({fontWeight:"bold"});return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(IconButton.h,{iconProps:{iconName:"Info"},title:"info",ariaLabel:"info",disabled:void 0===selectedcountry,onClick:openPanel}),(0,jsx_runtime.jsxs)(Panel.s,{isLightDismiss:!0,headerText:selectedcountry?.name.common+" ("+selectedcountry?.cca3+")",headerClassName:bold,isOpen,onDismiss:dismissPanel,closeButtonAriaLabel:"Close",children:[(0,jsx_runtime.jsx)(Image.E,{src:selectedcountry?.flags?.png,alt:"flag",width:150}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(FontIcon.xu,{iconName:"Globe2",className:panelIconClass}),(0,jsx_runtime.jsx)("span",{className:bold,children:"Region/Subregion : "}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsxs)("span",{children:[selectedcountry?.region,"/",selectedcountry?.subregion]}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(FontIcon.xu,{iconName:"GlobeFavorite",className:panelIconClass}),(0,jsx_runtime.jsx)("span",{className:bold,children:"Capital :"}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("span",{children:selectedcountry?.capital?.join()}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(FontIcon.xu,{iconName:"Family",className:panelIconClass}),(0,jsx_runtime.jsx)("span",{className:bold,children:"Population : "}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("span",{children:selectedcountry?.population?.toLocaleString("en")}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(FontIcon.xu,{iconName:"AllCurrency",className:panelIconClass}),(0,jsx_runtime.jsx)("span",{className:bold,children:"Currencies : "}),(0,jsx_runtime.jsx)("br",{}),selectedcountry&&Object.entries(selectedcountry.currencies).map((_ref=>{let[k,v]=_ref;return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsxs)("span",{children:[v.name," (",v.symbol,") "]}),(0,jsx_runtime.jsx)("br",{})]},"currency-"+k)})),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(FontIcon.xu,{iconName:"Clock",className:panelIconClass}),(0,jsx_runtime.jsx)("span",{className:bold,children:"Timezones : "}),selectedcountry?.timezones?.map(((t,i)=>(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("span",{children:t}),(0,jsx_runtime.jsx)("br",{})]},"tz-"+i))),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(FontIcon.xu,{iconName:"Feedback",className:panelIconClass}),(0,jsx_runtime.jsx)("span",{className:bold,children:"Languages : "}),selectedcountry&&Object.entries(selectedcountry.languages).map((_ref2=>{let[k,v]=_ref2;return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("span",{children:v}),(0,jsx_runtime.jsx)("br",{})]},"lang-"+k)})),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(FontIcon.xu,{iconName:"Nav2DMapView",className:panelIconClass}),(0,jsx_runtime.jsx)("span",{className:bold,children:"Borders : "}),selectedcountry?.borders?.map(((b,i)=>(0,jsx_runtime.jsx)(components_CountryFlag,{code:b,index:i},"flag-"+i))),(0,jsx_runtime.jsx)("br",{})]})]})};var TextField=__webpack_require__("./node_modules/@fluentui/react/lib/components/TextField/TextField.js");const MaskedInput=()=>{const maskedinputclass=(0,style_utilities_lib.y0)({fontSize:30,height:30,width:50,margin:"1px"});return(0,jsx_runtime.jsxs)(Stack.K,{tokens:{childrenGap:2},horizontal:!0,children:[(0,jsx_runtime.jsx)(FontIcon.xu,{iconName:"Lock",className:maskedinputclass}),(0,jsx_runtime.jsx)(TextField.n,{value:"*********",style:{width:"100%"}})]})};MaskedInput.displayName="MaskedInput";const components_MaskedInput=MaskedInput,components_FlagIcon=()=>{const{selectedcountry}=useSelectedCountry(),flagiconclass=(0,style_utilities_lib.y0)({fontSize:30,height:30,width:50,margin:"1px"});return void 0!==selectedcountry?(0,jsx_runtime.jsx)(ImageIcon.X,{className:flagiconclass,imageProps:{src:selectedcountry.flags.png,height:"100%",width:"100%"}}):(0,jsx_runtime.jsx)(FontIcon.xu,{iconName:"Globe",className:flagiconclass})};const components_CountryPickerComboBox=()=>{const comboboxRef=(0,react.useRef)(null),vm=useViewModel(),{options,isLoading,isError}=useCountryOptions(),{selectedoption}=(()=>{const vm=useViewModel(),{selectedcountry,isLoading,isError}=useSelectedCountry();return{selectedoption:selectedcountry?{key:selectedcountry.cca3,text:GetCountryName(selectedcountry,vm.language)}:void 0,isLoading,isError}})(),firstUpdate=(0,react.useRef)(!0),prevSelectedOption=function usePrevious(value){const ref=(0,react.useRef)();return(0,react.useEffect)((()=>{ref.current=value}),[value]),ref.current}(selectedoption);(0,react.useEffect)((()=>{firstUpdate.current?firstUpdate.current=!1:void 0!==prevSelectedOption&&void 0===selectedoption?vm.onChange("",""):void 0!==selectedoption&&selectedoption.key!==prevSelectedOption?.key&&vm.onChange(selectedoption.key.toString(),selectedoption.text)}),[selectedoption]);return isLoading?(0,jsx_runtime.jsx)("div",{children:"Loading..."}):isError?(0,jsx_runtime.jsx)("div",{children:"Error fetching data..."}):vm.masked?(0,jsx_runtime.jsx)(components_MaskedInput,{}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:options&&(0,jsx_runtime.jsxs)(Stack.K,{horizontal:!0,children:[(0,jsx_runtime.jsx)(components_FlagIcon,{}),(0,jsx_runtime.jsx)(VirtualizedComboBox.H,{componentRef:comboboxRef,onRenderOption:components_CountryPickerOption,onChange:(event,option,index)=>{vm.onChange(option?.key.toString(),option?.text)},selectedKey:selectedoption?.key,text:selectedoption?.text??" ",allowFreeform:!0,autoComplete:"on",options,style:{width:"100%"},disabled:vm.readonly}),vm.displayinfo&&(0,jsx_runtime.jsx)(components_CountryInfoPanel,{})]})})};(0,lib.l)();const CountryPickerApp_queryClient=new queryClient.S({defaultOptions:{queries:{refetchOnMount:!1,refetchOnWindowFocus:!1}}}),CountryPickerApp=viewmodel=>(0,jsx_runtime.jsx)(QueryClientProvider.aH,{client:CountryPickerApp_queryClient,children:(0,jsx_runtime.jsx)(ViewModelProvider,{viewmodel,children:(0,jsx_runtime.jsx)(components_CountryPickerComboBox,{})})});CountryPickerApp.displayName="CountryPickerApp";const components_CountryPickerApp=CountryPickerApp;try{CountryPickerApp.displayName="CountryPickerApp",CountryPickerApp.__docgenInfo={description:"",displayName:"CountryPickerApp",props:{countrycode:{defaultValue:null,description:"",name:"countrycode",required:!0,type:{name:"string"}},language:{defaultValue:null,description:"",name:"language",required:!0,type:{name:"enum",value:[{value:'"en"'},{value:'"de"'},{value:'"es"'},{value:'"fr"'},{value:'"ja"'},{value:'"it"'},{value:'"pt"'},{value:'"nl"'},{value:'"fa"'}]}},promoted:{defaultValue:null,description:"",name:"promoted",required:!0,type:{name:"string[] | undefined"}},limit:{defaultValue:null,description:"",name:"limit",required:!0,type:{name:"string[] | undefined"}},displayinfo:{defaultValue:null,description:"",name:"displayinfo",required:!0,type:{name:"boolean"}},readonly:{defaultValue:null,description:"",name:"readonly",required:!0,type:{name:"boolean"}},masked:{defaultValue:null,description:"",name:"masked",required:!0,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(countrycode: string, countryname: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["CountryPicker/components/CountryPickerApp.tsx#CountryPickerApp"]={docgenInfo:CountryPickerApp.__docgenInfo,name:"CountryPickerApp",path:"CountryPicker/components/CountryPickerApp.tsx#CountryPickerApp"})}catch(__react_docgen_typescript_loader_error){}},"./stories/CountryPicker.Demo.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Disabled:()=>Disabled,Limited:()=>Limited,Masked:()=>Masked,Promoted:()=>Promoted,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _CountryPicker_components_CountryPickerApp__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./CountryPicker/components/CountryPickerApp.tsx"),_storybook_client_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/client-api"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Country Picker/Demo",component:_CountryPicker_components_CountryPickerApp__WEBPACK_IMPORTED_MODULE_1__.Z,decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:{margin:"3em",maxWidth:"350px"},children:Story()})],args:{countrycode:"",language:"en",displayinfo:!0}},Template=args=>{const[,updateArgs]=(0,_storybook_client_api__WEBPACK_IMPORTED_MODULE_2__.useArgs)();return args.onChange=(countrycode,countryname)=>{console.log(`PCF NotifyOutputChanged  => ${countrycode}:${countryname}`),updateArgs({countrycode})},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_CountryPicker_components_CountryPickerApp__WEBPACK_IMPORTED_MODULE_1__.Z,{...args})};Template.displayName="Template";const Default=Template.bind({}),Promoted=Template.bind({});Promoted.args={promoted:["CAN","USA","MEX"]};const Limited=Template.bind({});Limited.args={limit:["CAN","USA","MEX"]};const Disabled=Template.bind({});Disabled.args={countrycode:"CAN",readonly:!0};const Masked=Template.bind({});Masked.args={countrycode:"CAN",masked:!0},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => {\n  const [, updateArgs] = useArgs();\n  args.onChange = (countrycode: string, countryname: string) => {\n    console.log(`PCF NotifyOutputChanged  => ${countrycode}:${countryname}`);\n    updateArgs({\n      countrycode: countrycode\n    });\n  };\n  return <CountryPickerApp {...args} />;\n}",...Default.parameters?.docs?.source}}},Promoted.parameters={...Promoted.parameters,docs:{...Promoted.parameters?.docs,source:{originalSource:"args => {\n  const [, updateArgs] = useArgs();\n  args.onChange = (countrycode: string, countryname: string) => {\n    console.log(`PCF NotifyOutputChanged  => ${countrycode}:${countryname}`);\n    updateArgs({\n      countrycode: countrycode\n    });\n  };\n  return <CountryPickerApp {...args} />;\n}",...Promoted.parameters?.docs?.source}}},Limited.parameters={...Limited.parameters,docs:{...Limited.parameters?.docs,source:{originalSource:"args => {\n  const [, updateArgs] = useArgs();\n  args.onChange = (countrycode: string, countryname: string) => {\n    console.log(`PCF NotifyOutputChanged  => ${countrycode}:${countryname}`);\n    updateArgs({\n      countrycode: countrycode\n    });\n  };\n  return <CountryPickerApp {...args} />;\n}",...Limited.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"args => {\n  const [, updateArgs] = useArgs();\n  args.onChange = (countrycode: string, countryname: string) => {\n    console.log(`PCF NotifyOutputChanged  => ${countrycode}:${countryname}`);\n    updateArgs({\n      countrycode: countrycode\n    });\n  };\n  return <CountryPickerApp {...args} />;\n}",...Disabled.parameters?.docs?.source}}},Masked.parameters={...Masked.parameters,docs:{...Masked.parameters?.docs,source:{originalSource:"args => {\n  const [, updateArgs] = useArgs();\n  args.onChange = (countrycode: string, countryname: string) => {\n    console.log(`PCF NotifyOutputChanged  => ${countrycode}:${countryname}`);\n    updateArgs({\n      countrycode: countrycode\n    });\n  };\n  return <CountryPickerApp {...args} />;\n}",...Masked.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Promoted","Limited","Disabled","Masked"]}}]);