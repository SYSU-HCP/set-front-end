import * as React from 'react';
import Meta from '../Meta';

export const withMeta = <OriginalProps extends object>(UnwrappedComponent: React.ComponentType<OriginalProps>, meta: IMeta) => {

  class WithMeta extends React.PureComponent<OriginalProps> {
    public render() {
      return (
        <React.Fragment>
          <Meta {...meta} />
          <UnwrappedComponent/>
        </React.Fragment>
      );
    }
  };

  return WithMeta;
}

export default withMeta;