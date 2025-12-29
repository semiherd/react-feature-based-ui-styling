import { FeatureFlag } from '../feature/type';

const SourceList= ['email','call','web'] as const;
export type Source= typeof SourceList[number]
export type CardData={
    id: string
    owner: string
    source: Source
    message: string
}
export type CardProps = React.HTMLAttributes<HTMLDivElement> & CardData & {
  features?: FeatureFlag[];
}