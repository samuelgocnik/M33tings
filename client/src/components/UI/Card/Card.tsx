import React from 'react';

const Card = (props: { children: any; className: string }) => {
  return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default Card;
