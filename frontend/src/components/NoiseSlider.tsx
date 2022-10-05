import 'rc-slider/assets/index.css';
import '../styles/NoiseSlider.css';

import Slider from 'rc-slider';
import { useStore } from '../store';
import shallow from 'zustand/shallow';

const NoiseSlider = () => {
  const { noise, setNoise } = useStore(
    (state) => ({
      noise: state.noise,
      setNoise: state.setNoise
    }),
    shallow
  );

  const setValue = (value: number | number[]) => {
    setNoise(typeof value === 'number' ? value / 100 : value[0] / 100);
  };

  return (
    <div className="mt-2">
      <label className="font-medium">Noise Threshold: {noise}</label>
      <Slider defaultValue={noise * 100} onChange={setValue} />
    </div>
  );
};

export default NoiseSlider;
