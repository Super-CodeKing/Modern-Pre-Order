import {
    Page,
    Text,
    Icon,
    Avatar,
} from "@shopify/polaris";
import { TitleBar, useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import "../../assets/preorder.css";
import {
    ChatIcon,
    StatusActiveIcon,
    ProductIcon,
    OrderIcon,
    CalendarTimeIcon,
    DiscountIcon,
    ColorIcon,
    OrderRepeatIcon,
    ProductListIcon
} from "@shopify/polaris-icons";
import Activation from "./Activation";
import ProductTable from "./ProductTable";
import OrderLimit from "./OrderLimit";
import Schedule from "./Schedule";
import DisplayMessage from "./DisplayMessage";
import OrdersTable from "./OrdersTable";
import ColorNText from "./ColorNText";
import BadgeDesign from "./BadgeDesign";
import { useDispatch, useSelector } from 'react-redux'
import { setActivation, setShopName } from "../../store/reducers/PreOrder";

export default function PreOrder() {
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const shopName = useSelector((state) => state.preorder?.shopName);
    const primaryAction = { content: "Help", url: "/help" };

    const [storeName, setStoreName] = useState('');
    const [storeMainPart, setStoreMainPart] = useState('');

    const flags = [
        { name: 'Activation', icon: StatusActiveIcon },
        { name: 'Product Setup', icon: ProductIcon },
        { name: 'Pre Orders', icon: OrderRepeatIcon },
        { name: 'Colors & Text', icon: ColorIcon },
        { name: 'Order Limit', icon: OrderIcon},
        { name: 'Set Schedule', icon: CalendarTimeIcon },
        { name: 'Display Message', icon: ChatIcon },
        { name: 'Badge Design', icon: DiscountIcon }
    ];

    const [activeFlag, setActiveFlag] = useState('Activation');

    const handleFlagClick = (flagName) => {
        setActiveFlag(flagName);
    };

    const FlagItem = ({ flag, isActive }) => {
        const bgColor = isActive ? 'bg-slate-200' : 'bg-white';
        return (
          <li
            className="cursor-pointer rounded-lg py-1 px-2"
            key={flag.name}
            onClick={() => handleFlagClick(flag.name)}
          >
            <div className={`rounded-lg py-1 px-2 ${bgColor}`}>
              <div className="flex justify-start">
                <Icon source={flag.icon} />
                <div className="ml-2 flex-1">
                  <Text>{flag.name}</Text>
                </div>
              </div>
            </div>
          </li>
        );
    };

    const setStoreWithoutShopifySubDomain = (shop) => {
        const mainPart = shop.split('.');
        const parts = mainPart[0].split('-');
        const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
        const capitalizedUrl = capitalizedParts.join('-');
        setStoreMainPart(capitalizedUrl);
    }

    const getShopName = async () => {
        const response = await fetch("/api/preorder/init");
        if (response.ok) {
            const preOrderActivation = await response.json();
            dispatch(setShopName(preOrderActivation?.shop));
            dispatch(setActivation({
                'active' : preOrderActivation.active,
                'active_on_collection' : preOrderActivation.active_on_collection,
                'active_on_product' : preOrderActivation.active_on_product,
                'when_show_pre_order': preOrderActivation.when_show_pre_order,
                'specific_inventory': preOrderActivation.specific_inventory
            }))
            setStoreName(preOrderActivation?.shop)
            setStoreWithoutShopifySubDomain(preOrderActivation?.shop);
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        if(shopName.length === 0) getShopName();
        else setStoreWithoutShopifySubDomain(shopName);
    }, []);

    return (
        <Page fullWidth>
            <TitleBar
                title="Pre Order: Settings"
                primaryAction={primaryAction}
            />

            <div className="flex">
                <div
                    className="self-start preorder-nav mx-3 hs-overlay hs-overlay-open:translate-x-0 w-64 bg-white -translate-x-full transition-all duration-300 transform hidden z-[60] border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
                >
                    <nav
                        className="hs-accordion-group pb-3 w-full flex flex-col flex-wrap"
                        data-hs-accordion-always-open
                    >
                        <div className="gap-2 flex items-center bg-gray-200 justify-start p-3">
                            <div className="flex grow-0 shrink-0 basis-auto items-center">
                                <img width="40" height="40" src="https://img.icons8.com/emoji/40/convenience-store.png" alt="convenience-store"/>
                            </div>
                            <div>
                                <h3 className="BHLa_">{storeMainPart}</h3>
                                <p className="MIA9A">
                                    <span className="Polaris-Text--root_yj4ah Polaris-Text--bodySm_nvqxj Polaris-Text--subdued_17vaa">
                                        {shopName}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <ul className="space-y-1.5 mt-3">
                            {flags.map((flag) => (
                                <FlagItem key={flag.name} flag={flag} isActive={flag.name === activeFlag} />
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="flex-1">
                    {activeFlag === 'Activation' && <Activation />}
                    {activeFlag === 'Product Setup' && <ProductTable />}
                    {activeFlag === 'Pre Orders' && <OrdersTable />}
                    {activeFlag === 'Order Limit' && <OrderLimit />}
                    {activeFlag === 'Set Schedule' && <Schedule />}
                    {activeFlag === 'Display Message' && <DisplayMessage />}
                    {activeFlag === 'Badge Design' && <BadgeDesign />}
                    {activeFlag === 'Colors & Text' && <ColorNText />}
                </div>
            </div>
        </Page>
    );
}
