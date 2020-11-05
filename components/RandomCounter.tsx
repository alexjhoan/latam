import React, {useState, useEffect} from 'react'

type RandomCounterProps = {
    min:number
    max:number
}

const randomNumber = (min:number, max:number) => {
	let num = Math.round((Math.random() * (max - min)) + min);
	return num
}

export const RandomCounter = ({min, max}:RandomCounterProps) => {
    const [counter, setCounter] = useState(randomNumber(min, max))
    
    useEffect(() => {
       
        const loop = () => {
            let timeSpan = randomNumber(30000, 90000) 
            setTimeout(() => {
                let variation = randomNumber(1, 5)
                let prob = randomNumber(1, 3)
                console.log('change counters')
                if (prob === 1) {
                    if ((counter < 1000) && (counter > (min-1) )) {
                        setCounter( counter => counter - variation)
                    }
                } else {
                    if ((counter < 1000) && (counter > (min-1) )) {
                        setCounter( counter => counter + variation)
                    }
                }
                loop()
            }, timeSpan)

        }
        loop()

      
    }, []);

    return <>{counter}</>
}

