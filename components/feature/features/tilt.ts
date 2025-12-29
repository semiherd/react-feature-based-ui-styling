import { Feature } from '../type';
import { applyTransform, getTransformState } from '../transform';

export const hover_tilt = (maxTilt = 12): Feature<React.HTMLAttributes<HTMLElement>> => ({
    name: 'tilt',
    apply: (props) => ({
        className: [
            props?.className ?? '',
            'transition-transform duration-200'
        ].filter(Boolean).join(' '),
        style: {
            ...props?.style,
            transformStyle: 'preserve-3d'
        }
    }),
    effect: (ctx) => {
        const el = ctx.getElement();
        if (!el) return;
        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const state = getTransformState(el);
            state.rotateX = (y / rect.height) * maxTilt;
            state.rotateY = -(x / rect.width) * maxTilt;
            applyTransform(el);
        };

        const reset = () => {
            const state = getTransformState(el);
            state.rotateX = 0;
            state.rotateY = 0;
            applyTransform(el);
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", reset);

        return () => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("mouseleave", reset);
        };
    }
});