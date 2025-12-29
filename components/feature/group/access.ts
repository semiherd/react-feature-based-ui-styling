import { focus_ring } from "../features/index";
import { FeatureGroup } from "../type";

export const Accessibility:FeatureGroup<React.HTMLAttributes<HTMLElement>>= {
    name: 'accessibility',
    features: [
        { ...focus_ring, name: 'focustRing'}
    ]
}