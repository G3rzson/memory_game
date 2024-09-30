
import React, { useEffect, useState } from 'react';
import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    const [flipp, setFlipp] = useState('flipped');

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card); 
        }
    };

    useEffect(() => {    
        setTimeout(() => {
            setFlipp(''); 
        }, 600); // 0.6s  
    }, [flipp]);

    return (
        <div className='card'>
            <div className={`${flipped ? "flipped" : ''} ${flipp}`}>
                <img className='front' src={card.src} alt='card front' />
                <img 
                    className='back' 
                    onClick={handleClick} 
                    src='/memory_game_React/pics/pattern.svg' 
                    alt='card back' 
                />
            </div>
        </div>
    );
}
