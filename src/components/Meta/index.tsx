import * as React from 'react';

import './index.css';

const Meta: React.StatelessComponent<IMeta> = props => {
  const { title, TA, members } = props;
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <h4>{[`${TA} (TA)`, ...members].join(', ')}</h4>
    </React.Fragment>
  );
};

export default Meta;
