import { Button } from '@heroui/react';
import { Headphones, Hourglass, Pause } from 'lucide-react';
import { useState, useRef } from 'react';

interface AudioButtonProps {
  src: string;
  className?: string;
}

const AudioButton = ({ src, className = "" }: AudioButtonProps) => {
  const [audioState, setAudioState] = useState<'idle' | 'loading' | 'playing'>('idle');
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (audioState === 'playing') {
      audioRef.current.pause();
      setAudioState('idle');
    } else {
      setAudioState('loading');
      try {
        await audioRef.current.play();
        setAudioState('playing');
      } catch (error) {
        console.error("Failed to play audio:", error);
        setAudioState('idle');
      }
    }
  };

  const getButtonIcon = () => {
    switch (audioState) {
      case 'loading':
        return <Hourglass size={20} />;
      case 'playing':
        return <Pause size={20} />;
      default:
        return <Headphones size={20} />;
    }
  };

  return (
    <>
      <Button isIconOnly disabled={audioState === "loading"} onPress={togglePlay}>
        {getButtonIcon()}
      </Button>

      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setAudioState('idle')}
        onPause={() => setAudioState('idle')}
        preload="none"
      />
    </>
  );
};

export default AudioButton;
