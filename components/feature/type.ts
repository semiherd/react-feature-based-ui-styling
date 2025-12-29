import { JSX } from 'react';
type FeatureHook = (ref: React.RefObject<HTMLDivElement|null>, props: any) => void;

export const FEATURE_FLAGS = [
    "scaleDownOnHover",
    "opacityDownOnHover",
    "scaleUpOnHover",
    "hoverTilt3D",
    "moveUpOnHover"
] as const;

export type FeatureFlag = typeof FEATURE_FLAGS[number];
export type FeatureDefinition={
    wrapperClass?: string
    innerClass?: string
    hook?: FeatureHook
}

export type WithFeatureProps = {
    features?: FeatureFlag[];
};



export interface EffectContext<T extends HTMLElement> {
    getElement(): T | null;
}

//Feature never knows about ref, it access via getElement()
export type Feature<P,T extends HTMLElement = HTMLElement> = {
    name: string;
    apply: (props: P) => Partial<P>;
    effect?: (ctx: EffectContext<T>) => void | (() => void); 
};

export type FeatureGroup<P> = {
    name: string;
    features: readonly Feature<P>[];
};
export type FeatureLike<P> = Feature<P> | FeatureGroup<P>;

// Logical props (used by features)
export type LogicalProps<C extends React.ElementType> =
    React.ComponentPropsWithoutRef<C>;

// JSX props (used only for rendering)
export type JsxProps<C extends React.ElementType> =
    JSX.LibraryManagedAttributes<C, LogicalProps<C>>;

export interface TransformState {
    translateX: number;
    translateY: number;
    translateZ: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scale: number;
}

export type RefType<E extends HTMLElement = HTMLElement, Mutable extends boolean = false> = React.HTMLAttributes<E> &
   { ref?:  Mutable extends true ? OwnedRef<E>: ForeignRef<E> }
    
/**
 * A ref we own and are allowed to mutate
 */
export type OwnedRef<T extends HTMLElement> = React.MutableRefObject<T | null>;

/**
 * A ref we do NOT own (forwarded ref)
 */
export type ForeignRef<T extends HTMLElement> = React.Ref<T>;

export type AnyRef<T extends HTMLElement> = OwnedRef<T> | ForeignRef<T>;