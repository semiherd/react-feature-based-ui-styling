import { Feature } from '../type';

export const moveUpOnHover: Feature<React.HTMLAttributes<HTMLElement>> = {
    name: 'moveUp',
    apply: (props) => ({
        className: [
            props?.className ?? '',
            'transition-transform hover:-translate-y-3'
        ].filter(Boolean).join(' ')
    })
};