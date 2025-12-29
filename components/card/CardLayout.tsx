import React, { ReactNode } from 'react';

export interface CardLayoutProps{
    header?: ReactNode
    content?: ReactNode
    footer?: ReactNode
    className?: string
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}

export const CardLayout: React.FC<CardLayoutProps>= ({
    header,footer,content,className="",onMouseEnter,onMouseLeave
}) => {

    return(
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}            className={` flex flex-col rounded-[16px] border border*[#FFFDFD] bg-white w-full h-full p-6 shadow-sm overflow-hidden ${className}`}
        >
            {header && <div className="mb-4">{header}</div>}
            {content && <div className="flex-1">{content}</div>}
            {footer && <div className="pt-4 mt-auto">{footer}</div>}
        </div>
    )
}