"use client";

import { useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle() {
    const [enabled, setEnabled] = useState(false);

    const toggle = useCallback(() => {
        setEnabled((prev) => !prev);
        // Play a click sound as feedback
        if (!enabled) {
            playFizz();
        }
    }, [enabled]);

    return (
        <button
            onClick={toggle}
            className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white transition-all hover:scale-110 active:scale-90"
            aria-label={enabled ? "Mute sounds" : "Enable sounds"}
        >
            {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
    );
}

// Synthesize a fizz/pop sound using Web Audio API
export function playFizz() {
    try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

        // Fizz noise
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Filter for fizz character
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 3000;
        filter.Q.value = 0.7;

        // Gain envelope
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
        noise.stop(ctx.currentTime + 0.15);

        // Pop sound
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

        const popGain = ctx.createGain();
        popGain.gain.setValueAtTime(0.1, ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.connect(popGain);
        popGain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
        // Web Audio API not available
    }
}
