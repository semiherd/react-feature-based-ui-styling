import { Feature, FeatureLike } from "./type";

export function normalizeFeatures<P>(input?: readonly FeatureLike<P>[]): Feature<P>[] {
    if (!input) return [];

    return input.flatMap(item => 'features' in item ? item.features : item);
}