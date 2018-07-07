import { Button } from 'antd';
import * as React from 'react';

import Layer from './Layer';
import UploadModal from './modal';

import unitPic from '../../../assets/unit.jpg';

import './index.css';

const layersNumber = 4;

const layerBestSize = 5;

const layerFour = [
  'default_layer4_0_volcano',
  'default_layer4_1_child',
  'default_layer4_2_parking_lot',
  'default_layer4_3_arcade',
  'default_layer4_4_pagoda',
]

export default class Unit extends React.PureComponent {
  public state = {
    layerToShow: null,
    modalVisible: false,
  }
  public showLayerDetail = (layerIdx : number) => {
    this.setState({
      layerToShow: layerIdx,
    });
  }
  public hideLayerDetail = () => {
    this.setState({
      layerToShow: null,
    });
  }
  public handleLayerLabelClick = (e : any) => {
    const layerIdx = parseInt(e.target.dataset.layerIdx, 10);
    this.showLayerDetail(layerIdx);
  }
  public getLayerBest = () => {
    const layers = new Array(layersNumber);
    layers.fill(0);
    return layers.map((layer, layerIdx) => {
      const imgs = new Array(layerBestSize);
      imgs.fill(0);
      return (
        <div style={{marginLeft: '10px'}} key={layerIdx}>
          <span className="layer-label" onClick={this.handleLayerLabelClick} data-layer-idx={layerIdx}>
            {`Layer ${layerIdx + 1}:`}
          </span>
          {
            imgs.map((img, imgIdx) => {
              let src = `http://on6ak4en1.bkt.clouddn.com/default_layer${layerIdx + 1}_${imgIdx}.jpg`;
              if (layerIdx === 3) {
                src = `http://on6ak4en1.bkt.clouddn.com/${layerFour[imgIdx]}.jpg`
              }
              return (<img style={{margin: '20px'}} key={`${layerIdx}_${imgIdx}`} src={src} />);
            })
          }
        </div>
      );
    });
  }
  public showModal = () => {
    this.setState({
      modalVisible: true,
    });
  }
  public hideModal = () => {
    this.setState({
      modalVisible: false,
    })
  }
  public render() {
    const { layerToShow, modalVisible } = this.state;
    return (
      <React.Fragment>
          {
            layerToShow === null && (
                <React.Fragment>
                  <div
                    style={{
                      alignItems: 'center',
                      borderBottom: '1px solid #ddd',
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <h2 style={{
                      textAlign: 'center',
                     }}>Visualize Layers and Units in Resnet</h2>
                    <Button 
                      style={{position: 'absolute', right: '10px'}}
                      type="primary" onClick={this.showModal}>
                      Generate Picture
                    </Button>
                  </div>
                  <div style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <p style={{marginRight: '10px'}}>Resnet-18 Construction</p>
                    <img style={{width: '90%', margin: 'auto', marginTop: '10px'}} src={unitPic} />
                  </div>
                  <p>We genereated the visualization for 
                    all the units in all layers of Resnet-18. And we picked the top-5-activation images 
                    from training data for each unit. You cn click on the layer names to see all units of 
                    that layer. Or just browse some of them here to get a general cognition of the net.</p>
                  <div>
                    {
                      this.getLayerBest()
                    }
                  </div>
                </React.Fragment>
            )
          }
          {
            layerToShow !== null &&
            <Layer layerIdx={layerToShow} 
              layersNumber={layersNumber} 
              hideLayerDetail={this.hideLayerDetail} 
              handleLayerLabelClick={this.handleLayerLabelClick}
            />
          }
          <UploadModal modalVisible={modalVisible} hideModal={this.hideModal} />
      </React.Fragment>
    )
  }
}