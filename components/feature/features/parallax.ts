import { Feature } from '../type';
import { applyTransform, getTransformState } from '../transform';

const parallaxY = (speed = 0.5, distance = 100): Feature<React.HTMLAttributes<HTMLElement>> => ({
    name: 'parallax',
    apply: (props) => ({
        className: [
            props?.className ?? '',
            'will-change-transform'
        ].filter(Boolean).join(' ')
    }),
    effect: (ctx) => {
        const el = ctx.getElement();
        if (!el) return;
        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                const translateY = (scrollProgress - 0.5) * distance * speed;
                const state = getTransformState(el);
                state.translateY = translateY;
                applyTransform(el);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }
});

export {
    parallaxY
}