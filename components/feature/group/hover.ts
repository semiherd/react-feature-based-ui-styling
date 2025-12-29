import { moveUpOnHover } from '../features/moveUpOnHover';
import { scaleUpOnHover } from '../features/scaleUpOnHover';
import { FeatureGroup } from '../type';

export const hover:FeatureGroup<React.HTMLAttributes<HTMLElement>>= {
    name: 'hoverMotion',
    features:[
        {
            ...scaleUpOnHover,
            name: 'scaleUpOnHover',
        },
        {
            ...moveUpOnHover,
            name: 'moveUpOnHover',
        }
    ]
}