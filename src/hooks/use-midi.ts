import { useEffect, useState } from 'react';

export interface MidiDevice {
    id: string;
    name: string;
    manufacturer?: string;
}

export function useMidi() {
    const [inputs, setInputs] = useState<MidiDevice[]>([]);
    const [enabled, setEnabled] = useState(false);
    const [activeInput, setActiveInput] = useState<WebMidi.MIDIInput | null>(null);

    useEffect(() => {
        if (!navigator.requestMIDIAccess) {
            console.warn("WebMIDI is not supported in this browser.");
            return;
        }

        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

        function onMIDISuccess(midiAccess: WebMidi.MIDIAccess) {
            setEnabled(true);

            const updateDevices = () => {
                const inputsArr: MidiDevice[] = [];
                const inputsMap = midiAccess.inputs.values();
                for (let input = inputsMap.next(); !input.done; input = inputsMap.next()) {
                    inputsArr.push({
                        id: input.value.id,
                        name: input.value.name || 'Unknown Device',
                        manufacturer: input.value.manufacturer
                    });

                    // Auto-select the first available input
                    if (!activeInput) {
                        setActiveInput(input.value);
                        console.log(`MIDI connected: ${input.value.name}`);
                    }
                }
                setInputs(inputsArr);
            };

            updateDevices();
            midiAccess.onstatechange = updateDevices;
        }

        function onMIDIFailure() {
            console.warn("Could not access your MIDI devices.");
        }

    }, []);

    return { enabled, inputs, activeInput };
}
