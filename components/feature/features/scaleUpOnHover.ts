import { Feature } from '../type';
import { applyTransform, getTransformState } from '../transform';

export const scaleUpOnHover: Feature<React.HTMLAttributes<HTMLElement>> = {
    name: 'scaleUpOnHover',
    apply: (props) => ({
        className: [
            props?.className ?? "",
            'transition-transform hover:scale-80'
        ].filter(Boolean).join(' ')
    })
};

export const scaleOnHover = (scale = 1.05): Feature<React.HTMLAttributes<HTMLElement>> => ({
    name: 'scale',
    apply: (props) => ({
        className: [
            props?.className ?? ''
        ].filter(Boolean).join(' ')
    }),
    effect: (ctx) => {
        const el = ctx.getElement();
        if (!el) return;
        const handleEnter = () => {
            const state = getTransformState(el);
            state.scale = scale;
            applyTransform(el);
        };

        const handleLeave = () => {
            const state = getTransformState(el);
            state.scale = 1;
            applyTransform(el);
        };

        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);

        return () => {
            el.removeEventListener("mouseenter", handleEnter);
            el.removeEventListener("mouseleave", handleLeave);
        };
    }
});