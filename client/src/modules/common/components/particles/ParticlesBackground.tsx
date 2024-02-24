import Particles from 'react-tsparticles';
import { useCallback } from 'react';
import { Engine, ISourceOptions } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

import particlesOptions from './particlesOptions';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div style={styles}>
      <Particles
        id='tsparticles'
        init={particlesInit}
        options={particlesOptions as ISourceOptions}
      />
    </div>
  );
};

const styles: React.CSSProperties | undefined = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
};

export default ParticlesBackground;
