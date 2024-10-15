import React, { useState, useEffect, useCallback } from 'react';

interface MetronomeProps {
  isPlaying: boolean;
  bpm?: number;
}

const Metronome: React.FC<MetronomeProps> = ({ isPlaying, bpm = 100 }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const playClick = useCallback(() => {
    if (audioContext) {
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);

      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  }, [audioContext]);

  useEffect(() => {
    if (isPlaying) {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(context);

      return () => {
        context.close();
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && audioContext) {
      const intervalId = setInterval(playClick, (60 / bpm) * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isPlaying, audioContext, bpm, playClick]);

  return null; // This component doesn't render anything
};

export default Metronome;