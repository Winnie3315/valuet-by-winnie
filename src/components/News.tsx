import React, { useMemo } from "react";

function News() {
    const randomNum = useMemo(() => randomInteger(), []);

    return ( 
        <>
            <div className="div flex gap-[15px]">
                <h3 className="text-white text-xs text-nowrap">
                    {randomNum}
                </h3>
                <h3 className="text-white text-xs">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, odio culpa ad voluptas qui voluptate, sapiente molestias doloremque quibusdam non corporis minima dicta et at recusandae velit! Architecto, eaque error.
                </h3 >
            </div>

        </> 
    );
}

export default News;

function randomInteger() {
    const min = 1;
    const max = 24;
    let rand = min + Math.random() * (max - min);
    return `${Math.round(rand)} hours ago`;
}
