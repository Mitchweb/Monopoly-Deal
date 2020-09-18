import React from 'react';

interface IProps {
  playerName: string;
}

const JustSayNo: React.FC<IProps> = ({ playerName }) => {
  return (
    <div className='just-say-no'>
      <h3>{playerName} played a</h3>
      <h1>Just Say No!</h1>
    </div>
  );
};

export default JustSayNo;
