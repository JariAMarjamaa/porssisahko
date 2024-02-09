import React from 'react';

import CVpdfFile from '../content/Curriculum_vitae.pdf';

const DownloadButton = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = CVpdfFile;
    link.download = 'CV_Jari_Marjamaa.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="button" onClick={handleDownload}>Lataa CV</button>
  );
};

export default DownloadButton;