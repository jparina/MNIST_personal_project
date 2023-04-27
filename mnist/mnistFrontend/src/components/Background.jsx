import React from 'react';

function Background() {
  return (
    <>
      <div className='App'>
        <div id="video-container">
          <video id="bg-video" autoPlay muted loop>
            <source id="mp4" src="/backgroundVideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}

export default Background;
