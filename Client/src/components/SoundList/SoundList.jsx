import React, { useEffect, useState } from 'react';
import { fetchSounds } from '../../utils/api'; // Import hàm fetchSounds
import './SoundList.css';

const SoundList = () => {
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    const getSounds = async () => {
      const data = await fetchSounds();
      setSounds(data);
    };

    getSounds();
  }, []);

  return (
    <div className="sound-list">
      {sounds.map(sound => (
        <div key={sound.name} className="sound-item">
          <audio controls>
            <source src={sound.url} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <h3>{sound.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default SoundList;