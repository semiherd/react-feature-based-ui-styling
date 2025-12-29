'use client'
import {  RefType, Feature, EffectContext } from "./type";
import { useRef,useEffect } from 'react';

function mergeRefs<T>(
    ...refs: (React.Ref<T> | undefined)[]
  ): React.RefCallback<T> {
    return (value) => {
      refs.forEach(ref => {
        if (!ref) return;
        if (typeof ref === 'function') {
          ref(value);
        } else {
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      });
    };
  }

function applyFeatures<T extends HTMLElement,P extends RefType<T, false>>(
    props: P,
    features?: readonly Feature<P,T>[]
): P {
    const ownedRef = useRef<T | null>(null);
   
    try{
        if (!features?.length) {
            return {
              ...props,
              ref: mergeRefs(props.ref, ownedRef),
            };
        }
        const enhancedProps = features.reduce(
            (acc, feature) => ({ ...acc, ...feature.apply(acc) }),
            props
        );

        const effects = features.map(f => f.effect!).filter(Boolean) as NonNullable<Feature<P, T>['effect']>[];;

        useEffect(() => {
            if (effects.length === 0) return;

            const ctx: EffectContext<T> = {
                getElement: () => ownedRef.current,
              };
          
              const cleanups = effects.map(e => e(ctx));
              return () => cleanups.forEach(c => c?.());
        }, [effects.length]);
        
        if (!effects.length) return enhancedProps;
        
        return {
            ...enhancedProps,
            ref: mergeRefs(enhancedProps.ref, ownedRef)
        };
    }catch(e){
        console.log(e);
        return props;
    }
}

export {
    applyFeatures
}