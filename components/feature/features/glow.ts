import { Feature } from "../type";

export const glowWithCol = (color = 'rgba(59, 130, 246, 0.5)'): Feature<React.HTMLAttributes<HTMLElement>> => ({
    name: 'glow',
    apply: (props) => ({
        className: [
            props?.className ?? '',
            'transition-all duration-300'
        ].filter(Boolean).join(' ')
    }),
    effect: (ctx) => {
        const el = ctx.getElement();
        if (!el) return;
        const handleEnter = () => {  
            el.style.filter = `drop-shadow(0 0 12px ${color})`;
        };

        const handleLeave = () => {
            el.style.filter = "";
        };

        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);

        return () => {
            el.removeEventListener("mouseenter", handleEnter);
            el.removeEventListener("mouseleave", handleLeave);
        };
    }
});