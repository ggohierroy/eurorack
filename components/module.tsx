import React, { useState, useEffect } from 'react';

export default function FirstPost() {

    const [audioContext, setAudioContext] = useState<AudioContext>();
    const [oscillator, setOscillator] = useState<OscillatorNode>();

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

        if(!audioContext)
            return;
        
        // create Oscillator node
        const osc = audioContext.createOscillator();

        osc.type = 'square';
        osc.frequency.setValueAtTime(440, audioContext.currentTime); // value in hertz
        osc.connect(audioContext.destination);

        setOscillator(osc);

        osc.start();
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
        </div>
    )
}