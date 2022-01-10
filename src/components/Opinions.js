import React, { useState } from "react";
import Opinion from './Opinion';

const Opinions = () => {
    const [opionions, setOpionions] = useState([
        {
            date: 'Date 1',
            name: 'Ania',
            rating: 0,
            description: 'do kitu :(',
        },
        {
            date: 'Date 2',
            name: 'Darek',
            rating: 4,
            description: 'super',
        },
        {
            date: 'Date 3',
            name: 'Paweł',
            rating: 4.2,
            description: 'fajne',
        }
    ]);

    return (
        <div>
            {opionions.map((opionion) => (
                <div key={opionion.date.toString()}>
                    <Opinion date={opionion.date} name={opionion.name} rating={opionion.rating} description={opionion.description}/>
                </div>
            ))}
        </div>
    )
}

export default Opinions
