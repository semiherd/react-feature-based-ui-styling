'use client';
import { Card } from "./card/Card"
import { CardData } from "./types/type";
import { data } from './data/data';
import { List } from './List/List';

import {
    hover_scaleUp,
    hover_moveUp,
    focus_ring,
    parallaxY,
    hover_tilt,
    hover_scaleBy,
    hover_glowColor }
 from './feature/features/index';


const features = [
        hover_moveUp,
        hover_tilt(20),
        hover_scaleBy(1.02),
        hover_glowColor('rgba(234, 54, 111, 0.5)')
    ];

export const Container= () => {
 
    return(
        <div className="review-container">
            <h1 className="review-title">What <span className="review-title_colored">Premier</span> Traders are saying about us</h1>     
            <p className="review-description">Join a growing community of professionals who rely on our platform to trade smarter every day.</p>
            <List<CardData,typeof Card>
                items={data}
                features= {features}
                extraProps={{}}
                Component={Card}
                Container={({children}) => (
                    <div 
                        className="grid 
                            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                            [grid-auto-rows:1fr]
                            gap-10 
                            mx-[5%] 
                            items-stretch"
                    >{children}
                    </div>
                )}                               
            />
        </div>
    )
}