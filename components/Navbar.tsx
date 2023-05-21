import { ITab, tab, tabPath } from "@/types/navbar";
import Image from "next/image";
import navbarCSSVariables from "../styles/components/Navbar.module.scss";

const allTabs = new Map<tab, tabPath>([
    [ 'Заявки', 'requests' ],
    [ 'Клиенты', 'customers' ],
    [ 'Сотрудники', 'employees' ],
    [ 'База знаний', 'knowledge-base' ],
    [ 'Статистика', 'stats' ]
]);

interface NavbarProps {
    tabs: ITab[];
}

const Navbar: React.FC<NavbarProps> = ({ tabs }) => {
    return (
        <>  
           <div id={ navbarCSSVariables.tabsId }>
                {   tabs.map(({ id, tab, path, onClick, ref }) => {
                        return (
                            <div id={ id } className={ navbarCSSVariables.tabClass } title={ tab } onClick={ onClick } ref={ ref } key={ `${path}/${allTabs.get(tab)}` }>
                                <Image src={ `/${allTabs.get(tab)}.png` } alt={ tab } />
                            </div>
                        );
                    }) 
                }
            </div>
        </>
    );
};

export default Navbar;