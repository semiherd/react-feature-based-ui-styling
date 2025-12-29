import { Feature } from '../type';

export const ringOnFocus: Feature<React.HTMLAttributes<HTMLElement>> = {
    name: 'moveUp',
    apply: (props) => ({
        className: [
            props?.className ?? '',
            'focus-visible:outline focus-visible:outline-2'
        ].filter(Boolean).join(' ')
    })
};