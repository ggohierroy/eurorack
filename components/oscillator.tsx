import React, { useState, useEffect } from 'react';

export default function Oscillator() {

    const [audioContext, setAudioContext] = useState<AudioContext>();
    const [oscillator, setOscillator] = useState<OscillatorNode>();
    const [frequency, setFrequency] = useState(440);

    useEffect(() => {    
        // create web audio api context
        const audioCtx = new window.AudioContext();

        setAudioContext(audioCtx);
    }, []);

    //oscillator.start();

    function handleStart() {
        if(oscillator){
            oscillator.stop();
        }

        if(!audioContext){
            return;
        }
        
        // create Oscillator node
        const osc = audioContext.createOscillator();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, audioContext.currentTime); // value in hertz
        osc.connect(audioContext.destination);

        setOscillator(osc);

        osc.start();
    }

    function handleFrequencyChange(e: React.ChangeEvent<HTMLInputElement>) {
        
        if(!audioContext) {
            return;
        }
        
        if(!oscillator){
            return;
        }
        
        var freq = +e.target.value;
        setFrequency(freq);
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // value in hertz
    }

    function handleStop() {
        if(oscillator){
            oscillator.stop();
        }
    }

    if (!audioContext) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={() => handleStart()}>Start</button>
            <button onClick={() => handleStop()}>Stop</button>
            <input type='text' value={frequency} onChange={(e) => handleFrequencyChange(e)}></input>
        </div>
    )
}