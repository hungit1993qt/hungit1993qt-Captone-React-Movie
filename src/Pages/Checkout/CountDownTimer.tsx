import React from 'react'
import { useTimeout } from 'usehooks-ts'
interface ICountdown {
    minutes: number;
    seconds: number;
}


const CountDownTimer = () => {
    const minutes = 5
    const seconds = 0
    const [time, setTime] = React.useState<ICountdown>({ minutes, seconds });
    const timeOut = false;

    const tick = () => {

        if (time.minutes === 0 && time.seconds === 0) {
            reset()
        } else if (time.seconds === 0) {
            setTime({ minutes: time.minutes - 1, seconds: 59 });
        } else {
            setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
        }
    };


    const reset = () => setTime({ minutes: time.minutes, seconds: time.seconds });


    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });


    return (
        <>
            {`${time.minutes
                .toString()
                .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}
        </>
    );
}

export default CountDownTimer;