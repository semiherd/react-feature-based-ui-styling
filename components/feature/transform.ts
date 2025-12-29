import { TransformState } from "./type";

export function getTransformState(el: HTMLElement): TransformState {
    // Store state as a property on the element itself
    if (!(el as any).__transformState) {
        (el as any).__transformState = {
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1
        };
    }
    return (el as any).__transformState;
}

export function applyTransform(el: HTMLElement) {
    const state = getTransformState(el);
    el.style.transform = `
        translate3d(${state.translateX}px, ${state.translateY}px, ${state.translateZ}px)
        rotateX(${state.rotateX}deg)
        rotateY(${state.rotateY}deg)
        rotateZ(${state.rotateZ}deg)
        scale(${state.scale})
    `.trim().replace(/\s+/g, ' ');
}