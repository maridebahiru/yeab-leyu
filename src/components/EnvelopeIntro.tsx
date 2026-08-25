import React from 'react';
import { EnvelopeScreen } from './EnvelopeScreen';

interface EnvelopeIntroProps {
  onOpenComplete?: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpenComplete }) => {
  return <EnvelopeScreen onStart={onOpenComplete} />;
};

export default EnvelopeIntro;
