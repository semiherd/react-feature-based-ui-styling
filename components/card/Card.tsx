import { Source,CardProps } from "../types/type";
import { CardLayout } from "../CardLayout";
import Image from "next/image";
import { forwardRef } from 'react';

export const Card = forwardRef<HTMLDivElement,CardProps>((props,ref) => {
    const { id, owner, message, source, className, style, ...restProps } = props;
    const initials = owner
        ?.split(" ")
        .map((n) => n[0])
        .filter((_,i,arr) => i===0 || i===arr.length-1)
        .join("")
        .toUpperCase();

    const iconMap: Record<Source, string> = {
        email: "/icons/email.png",
        call: "/icons/headset.png",
        web: "/icons/earth.png",
    };

    const iconSrc = iconMap[source];
    return (
        <div ref={ref} className={`${className}`} style={style} {...restProps}>
            <CardLayout        
                className="review-card h-full"
                content={<p className="text-[#1E1E1E] text-[0.9rem] leading-[1.3rem] pb-3 border-b border-[#e9e9e9]">
                    {message}
                </p>}
                footer={<div className="flex items-center justify-between pt-4 mt-auto">

                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
                            {initials}
                        </div>

                        <p className="font-semibold text-[1rem] leading-[30px] text-black">
                            {owner}
                        </p>
                    </div>

                    <Image
                        src={iconSrc}
                        alt={source}
                        width={30}
                        height={30}
                        loading="lazy"
                    />
                </div>}
                header={null}
            />
        </div>
    );
});
