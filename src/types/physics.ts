export interface SimulationState {
  isPlaying: boolean;
  radius: number; // in meters (e.g. 0.2m - 2.5m)
  period: number; // in seconds (e.g. 0.4s - 8.0s)
  angle: number; // current angle in radians
  elapsedTime: number; // in seconds
  revolutions: number; // count of completed revolutions
  showVelocityVector: boolean;
  showRadiusVector: boolean;
  showTrail: boolean;
  showGrid: boolean;
  cameraPreset: 'perspective' | 'top' | 'side' | 'custom';
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  category: 'davr' | 'chastota' | 'tezlik' | 'radius' | 'amaliyot';
}

export interface Problem {
  id: number;
  title: string;
  difficulty: 'Oson' | 'O‘rta' | 'Murakkab / Hayotiy';
  statement: string;
  given: { label: string; value: string }[];
  toFind: string;
  formula: string;
  correctAnswer: number; // numeric value
  unit: string;
  tolerance: number; // e.g. 0.05 (5%)
  solutionSteps: string[];
}

export interface RealWorldExample {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  rotatingPart: string;
  physicsConnection: string;
  question: {
    text: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}
