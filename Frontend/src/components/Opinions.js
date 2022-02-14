import React, { useState } from "react";
import Opinion from './Opinion';

const Opinions = (props) => {
    return (
        <div>
            {props.opinions.map((opinion, index) => (
                <div key={index.toString()}>
                    <Opinion date={opinion.date} name={opinion.name} rating={opinion.rating} description={opinion.description}/>
                </div>
            ))}
        </div>
    )
}

export default Opinions
