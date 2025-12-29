'use client'
import { normalizeFeatures } from "@/components/feature/normalize";
import { applyFeatures } from "../feature/apply";
import { RElement,ListProps,PropsOf } from "./type";
import * as React from "react";
import { FeatureLike } from "@/components/feature/type";

function ListItem<C extends RElement>({
    Component,
    itemProps,
    features
}: {
    Component: C;
    itemProps: PropsOf<C>;
    features?: readonly FeatureLike<any>[];
}) {
    const normalized = normalizeFeatures<PropsOf<C>>(features);
    const finalProps = applyFeatures(itemProps, normalized);
    return <Component {...finalProps} />;
}

function render<C extends React.ElementType>(
    Comp: C,
    props: PropsOf<C>
): React.ReactElement | null {
    return React.createElement(Comp, props);
}
export function List<
  T extends object,
  C extends RElement
>(props: ListProps<T, C>) {

    const {
        items,
        Component: Comp,
        Container,
        extraProps,
        features
    } = props;

    const renderedItems = items.map((item, index) => {
        const alt =
            'name' in item && typeof item.name === 'string'
                ? item.name
                : `item-${index}`;

        const baseProps = {
            ...(item as Partial<PropsOf<C>>),
            ...(extraProps ?? {}),
            alt
        } as PropsOf<C>;

        return (
            <ListItem
                key={alt || index}
                Component={Comp}
                itemProps={baseProps}
                features={features}
            />
        );
    });

    return Container 
        ? <Container>{renderedItems}</Container> 
        : <>{renderedItems}</>;
}


