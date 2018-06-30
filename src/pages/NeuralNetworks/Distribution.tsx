import { Button, Modal } from 'antd';
import * as React from 'react'
import Back from '../../components/Back';

enum Step {
  first,
  second,
  third
}

export interface IState {
  dialogVisible: boolean
  step: Step
}

export default class Distribution extends React.Component<any, IState> {

  public state : IState = {
    dialogVisible: false,
    step: Step.first
  }

  constructor(props: any) {
    super(props)

    this.showHowToUse = this.showHowToUse.bind(this);
    this.hideHowToUse = this.hideHowToUse.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);
  }

  public showHowToUse() {
    this.setState({
      dialogVisible: true
    })
  }

  public hideHowToUse() {
    this.setState({
      dialogVisible: false
    })
  }

  public goBack() {
    const { step } = this.state

    if (step === Step.second) {
      this.setState({
        step: Step.first
      })
    } else if (step === Step.third) {
      this.setState({
        step: Step.second
      })
    }
  }

  public goNext() {
    const { step } = this.state

    if (step === Step.first) {
      this.setState({
        step: Step.second
      })
    } else if (step === Step.second) {
      this.setState({
        step: Step.third
      })
    }
  }

  public render() {

    const {
      dialogVisible,
      step
    } = this.state

    return (
      <div
        style={{
          position: 'relative'
        }}
        >
        {step !== Step.first && <Back onClick={this.goBack}/>}        
        <div
          style={{
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <h2>A Visualization Tool That</h2>
          <p>Show the Distribution  Of</p>
          <p>High Dimensional Dataset</p>
        </div>
        {step === Step.first ? (
          <div
            style={{
              margin: '20px 0'
            }}>
            <div
              style={{
                textAlign: 'center'
              }}>
              Upload And Visualize Your Dataset
            </div>
            <div
              style={{
                textAlign: 'center'
              }}>
              <div
                style={{
                  display: 'inline-block',
                  height: '250px',
                  width: '250px'
                }}
                >
                <img
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                  src={require('../../assets/imgs/banner1.png')}
                />
                <p>Visualization Using Tsne</p>
              </div>
              <div
                style={{
                  display: 'inline-block',
                  height: '250px',
                  marginLeft: '40px',
                  width: '250px'
                }}
              >
                <img
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                  src={require('../../assets/imgs/banner.png')}
                />
                <p>Visualization Using Digt</p>
              </div>
            </div>
            <div
              style={{
                marginTop: '40px',
                textAlign: 'center'
              }}>
              <Button onClick={this.goNext}>
                Upload My Dataset
              </Button>
            </div>
          </div>
        ) : null
        }
        {/* * upload */}
        { step === Step.second ? (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '20px 0 0 0'
            }}>
            <Button
              style={{
                marginBottom: '20px'
              }}
            >
              Upload Photo
            </Button>
            <Button
              style={{
                marginBottom: '20px'
              }}
            >
              Upload Label
            </Button>
            <Button
              style={{
                marginBottom: '20px'
              }}
              onClick={this.goNext}
            >
              Show Result
            </Button>
            <a href="javascript:void(0)" onClick={this.showHowToUse}>How to use ？</a>
          </div>
          ) : null 
        }

        {/* * result*/}
        {step === Step.third ? (
          <div
            style={{
              margin: '20px 0 0 0'
            }}>
            <h3>Your Dataset Distribution</h3>
            <div
              style={{
                textAlign: 'center'
              }}>
              <div
                style={{
                  display: 'inline-block',
                  height: '250px',
                  width: '250px'
                }}
                >
                <img
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                  src={require('../../assets/imgs/banner1.png')}
                />
                <p>Visualization Using Tsne</p>
              </div>
              <div
                style={{
                  display: 'inline-block',
                  height: '250px',
                  marginLeft: '40px',
                  width: '250px'
                }}
              >
                <img
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                  src={require('../../assets/imgs/banner.png')}
                />
                <p>Visualization Using Digt</p>
              </div>
            </div>
          </div> 
        ) : null
        }

        <Modal
          onCancel={this.hideHowToUse}
          onOk={this.hideHowToUse}
          title="How to use ?"
          visible={dialogVisible}
        >
          <h3>Upload Photo</h3>
          <p>the photo folder should be like this</p>
          <img src={require('../../assets/imgs/imgs_example.png')} alt=""/>
          <h3>Upload Label</h3>
          <p>the label file should be like this</p>
          <img src={require('../../assets/imgs/label_example.png')} alt=""/>
        </Modal>
      </div>
    );
  }
}