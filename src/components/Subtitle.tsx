import React from 'react';

interface SubtitleProps {
  text?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ text = "כלי עזר יום יומיים לצוותי רפואה" }) => (
  <div className="subtitle">{text}</div>
);

export default Subtitle;