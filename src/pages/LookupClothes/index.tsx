import * as React from 'react';

const initialState = {};
type IState = Readonly<typeof initialState>

export default class LookupClothes extends React.Component<{}, IState> {
  public readonly state = initialState;
  public render() {
    return <div />
  }
}