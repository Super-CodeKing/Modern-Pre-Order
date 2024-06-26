import {
    BlockStack,
    Card,
    IndexTable,
    Text,
    Badge,
    useIndexResourceState,
    Divider,
    Button,
    Page,
    Frame,
} from "@shopify/polaris";
import ProductsTableSkeleton from "./Skeleton/ProductsTableSkeleton";
import { useAuthenticatedFetch } from "../../hooks";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrderList } from "../../store/reducers/PreOrder";

export default function OrdersTable() {
    
    const fetch = useAuthenticatedFetch();
    const dispatch = useDispatch();

    const shopName = useSelector((state) => state.preorder.shopName);
    const orderListRedux = useSelector((state) => state.preorder.orderList);

    const [preOrderOrders, setPreOrderOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(preOrderOrders);

    const resourceName = {
        singular: "order",
        plural: "orders",
    };

    const getOrderLink = (id) => {
        if(shopName)
        return `https://admin.shopify.com/store/${shopName}/orders/${id}`
        else
        return '#';
    }

    const rowMarkup = preOrderOrders.map(
        (
            {
                id,
                name,
                created_at,
                customer,
                total_price,
                currency,
                financial_status,
                line_items,
            },
            index
        ) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        <a href={getOrderLink(id)} target="_blank">{name}</a>
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {new Date(created_at).toLocaleString("en-US", {
                        timeZone: "America/New_York", // Adjust the time zone as needed
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    }) ?? "Not set"}
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {customer ?? "No Customer"}
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" numeric alignment="justify">
                        {total_price ?? "0.00"} {" " + currency}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Badge>{financial_status.charAt(0).toUpperCase() + financial_status.slice(1)}</Badge>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {line_items.length} Items
                </IndexTable.Cell>
            </IndexTable.Row>
        )
    );

    const getPreOrderOrders = async () => {
        const response = await fetch("/api/preorder/orders");
        if (response.ok) {
            const orders = await response.json();
            setPreOrderOrders(orders.orders);
            dispatch(setOrderList(orders.orders));
            setIsLoadingOrders(false);
        } else {
            console.log("Error in Activaing Pre Order: ", response);
            setIsLoadingOrders(false);
            throw new Error(`HTTP error ${response.status}`);
        }
    };

    useEffect(() => {
        setIsLoadingOrders(true);
        if(orderListRedux.length === 0) getPreOrderOrders();
        else {
            setPreOrderOrders(orderListRedux);
            setIsLoadingOrders(false);
        }
    }, []);

    return (
        <div className="orders [&>div>div]:pt-0">
            <Frame>
                {isLoadingOrders && (
                    <ProductsTableSkeleton title={"PRE-ORDER Orders List"} />
                )}
                {!isLoadingOrders && (
                    <Page fullWidth>
                        <BlockStack gap="500">
                            <div className="flex">
                                <Text variant="headingXl" as="h4">
                                    'PRE-ORDER' Orders List
                                </Text>
                                <div className="ml-auto">
                                    <Button
                                        variant="primary"
                                        onClick={() => activeResourcePicker()}
                                    >
                                        Export
                                    </Button>
                                </div>
                            </div>

                            <Divider borderColor="border" />
                            <Card>
                                <div className="container overflow-x-auto max-w-xs mx-auto overflow-y-hidden md:max-w-full">
                                    <IndexTable
                                        resourceName={resourceName}
                                        itemCount={preOrderOrders.length}
                                        selectedItemsCount={
                                            allResourcesSelected
                                                ? "All"
                                                : selectedResources.length
                                        }
                                        onSelectionChange={() =>
                                            handleSelectionChange()
                                        }
                                        headings={[
                                            { title: "Order" },
                                            { title: "Date" },
                                            { title: "Customer" },
                                            { title: "Total" },
                                            { title: "Payment Status" },
                                            { title: "Items" },
                                        ]}
                                    >
                                        {preOrderOrders.length > 0 && rowMarkup}
                                        {preOrderOrders.length === 0 && (
                                            <p>Empty</p>
                                        )}
                                    </IndexTable>
                                </div>
                            </Card>
                        </BlockStack>
                    </Page>
                )}
            </Frame>
        </div>
    );
}
