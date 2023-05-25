import useUUID from "@/hooks/useUUID";
import { ISelect } from "@/types/base";
import Image from "next/image";
import { RefObject } from "react";
import filterCSSVariables from "../styles/components/Filter.module.scss";

interface FilterProps {
    selectFilter: ISelect;
    selectedOption: string;
    refInput: RefObject<HTMLInputElement>;
    refSelect: RefObject<HTMLSelectElement>;
    filterHandler: Function;
}

const Filter: React.FC<FilterProps> = ({ selectFilter, selectedOption, refInput, refSelect, filterHandler }) => {
    const selectKeys = useUUID( selectFilter.options.length );

    return (
        <>  
           <div id={ filterCSSVariables.filterPanelId }>
                <div id={ filterCSSVariables.searchInputId }>
                    <input ref={ refInput } placeholder={ 'Поиск...' } type='text' />
                </div>
                <div id={ filterCSSVariables.selectId }>
                    <select ref={ refSelect } id={ selectFilter.id } className={ selectFilter.className } defaultValue={ selectedOption }>
                        {   selectFilter.options.map(({ title, value }, index) => {
                                return <option key={ selectKeys[index] } value={ value }>{ title }</option>;
                            })
                        }
                    </select>
                </div>
                <div id={ filterCSSVariables.filterIconId } onClick={ () => { filterHandler() } }>
                    <Image 
                        src="/filter.png"
                        alt="Filter"
                        width={ +filterCSSVariables.filterIconWidth }
                        height={ +filterCSSVariables.filterIconHeight } />
                </div>
           </div>
        </>
    );
};

export default Filter;