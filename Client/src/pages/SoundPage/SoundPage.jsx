import React from 'react';
import SoundList from '../../components/SoundList/SoundList'; // Import SoundList
import './SoundPage.css';

const SoundPage = () => {
  return (
    <div className="sound-page">
      <h1>Sounds</h1>
      <SoundList /> {/* Sử dụng SoundList */}
    </div>
  );
};

export default SoundPage;