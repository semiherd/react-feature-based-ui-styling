import { FeatureLike } from "../feature/type";
import { JSX } from 'react';
export type RElement<P = any> = React.ElementType<P>
export type PropsOf<C extends React.ElementType> =
    JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;
export interface AnchorLikeProps {
    href: string;
}

export type AnchorCapable = React.ElementType<AnchorLikeProps>;

export interface BaseListProps<
    T extends object,
    C extends RElement
> {
    items: readonly T[];
    Component: C;
    Container?: React.FC<{ children: React.ReactNode }>;
    extraProps?: Partial<PropsOf<C>>;
    features?: readonly FeatureLike<PropsOf<C>>[];
}
export interface PlainListProps<
    T extends object,
    C extends RElement
> extends BaseListProps<T, C> {
    items: readonly (T & { href?: never })[];
}
export interface LinkListProps<
    T extends AnchorLikeProps,
    C extends AnchorCapable
> extends BaseListProps<T,C> {
    items: readonly T[]
}
export type ListProps<
    T extends object,
    C extends RElement
> =
    | PlainListProps<T,C>
    | LinkListProps<T & AnchorLikeProps, Extract<C, AnchorCapable>>;