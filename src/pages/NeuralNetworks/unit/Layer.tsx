import * as React from 'react';
import './index.css';

import { Button } from 'antd';

let unitsNumer: any = [64, 128, 256, 512];
const unitSize = 5;
const unitImgs = new Array(unitSize);
unitImgs.fill(0);
unitsNumer = unitsNumer.map((unit: any) => {
  const arr = new Array(unit);
  return arr.fill(0);
});

export default class Layer extends React.PureComponent<any, any> {
  public layers : any = []
  constructor(props: any) {
    super(props);
    const layersNumber = this.props.layersNumber;
    this.layers = new Array(layersNumber);
    this.layers.fill(0);
  }
  public getUnits() {
    const { layerIdx } = this.props;
    const units = unitsNumer[layerIdx];
    return units.map((unit: any, unitIdx: any) => {
      return (
        <div key={unitIdx}>
          <span style={{fontSize: '16px'}}>Layer {layerIdx + 1}, Unit {unitIdx + 1}</span>
          {
            unitImgs.map((img: any, imgIdx: any) => {
              return (
                <img 
                  style={{margin: '20px'}}
                  key={`${layerIdx}_${unitIdx}_${imgIdx}`} 
                  src={`https://raw.githubusercontent.com/SYSU-HCP/neural-network-pictures/master/default_layer${layerIdx + 1}_${imgIdx}_${unitIdx}.jpg`}
                />
              )
            })
          }
        </div>
      ) 
    });
  }
  public render() {
    const { layerIdx, handleLayerLabelClick, hideLayerDetail } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            borderBottom: '1px solid #ddd',
            paddingBottom: '10px',
          }}>
          {
            this.layers.map((layer : any, index : any) => {
              return (
                <React.Fragment key={index}>
                  <span 
                    className="layer-label"
                    style={{margin: '20px'}}
                    onClick={handleLayerLabelClick}
                    data-layer-idx={index}
                  >
                    Layer {index + 1}
                  </span>
                  <Button onClick={hideLayerDetail}style={{position: 'absolute', right: '10px'}}>Back</Button>
                </React.Fragment>              
              )
            })
          }
        </div>
        <div
          style={{
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <h2 style={{
            textAlign: 'center'
          }}>Layer {layerIdx + 1}</h2>
        </div>
        <div>
          {
            this.getUnits()
          }
        </div>
      </React.Fragment>
    )
  }
}