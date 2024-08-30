import React from 'react';
import classNames from 'classnames';

const VideoSection = ({ sectionId, videoTitle, videoSrc, className }) => {
  return (
    <section id={sectionId} className={classNames('video-content', className)}>
      <h2 className="video-title">{videoTitle}</h2>
      <iframe
        width="869"
        height="489"
        src={videoSrc}
        title={videoTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </section>
  );
};

export default VideoSection;
