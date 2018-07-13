import { Button, Modal, Upload, message } from 'antd';
import * as React from 'react'
import Back from '../../components/Back';

enum Step {
  first,
  second,
  third
}

export interface IState {
  labelList: any[]
  fileList: any[]
  dialogVisible: boolean
  step: Step
}

export default class Distribution extends React.Component<any, IState> {

  public state: IState = {
    labelList: [],
    fileList: [],
    dialogVisible: false,
    step: Step.first
  }

  constructor(props: any) {
    super(props)

    this.showHowToUse = this.showHowToUse.bind(this);
    this.hideHowToUse = this.hideHowToUse.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.beforeLabelUpload = this.beforeLabelUpload.bind(this);
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
      // TODO
      // 向后端获取API返回值保存在state中
      const hide = message.loading('请稍等...',15)
      // 其实没有后端，这里只好假装在请求,5秒后跳转
      setTimeout(() => {
        hide()
        this.setState({
          step: Step.third
        })
      }, 15000)
    }
  }

  public beforeUpload(file: any) {
    // console.log(file)
    // console.log(fileList)
    this.setState(({ fileList }) => ({
      fileList: [...fileList, file],
    }));
    // console.log(this.state.fileList)
    // wait for upload
    return false
  }

  public beforeLabelUpload(file: any, fileList: any[]) {
    this.setState(({ labelList }) => ({
      labelList: [...labelList, file],
    }));
    // console.log(this.state.labelList)
    return false
  }

  // public handleLabelChange = (info: any) => {
  //   let fileList = info.fileList;
  //   // 2. read from response and show file link
  //   fileList = fileList.map((file: any) => {
  //     if (file.response) {
  //       // Component will show file.url as link
  //       file.url = file.response.url;
  //     }
  //     return file;
  //   });

  //   // 3. filter successfully uploaded files according to response from server
  //   fileList = fileList.filter((file: any) => {
  //     if (file.response) {
  //       return file.response.status === 'success';
  //     }
  //     return true;
  //   });

  //   this.setState({ fileList });
  // }

  public render() {

    const {
      dialogVisible,
      step,
      fileList,
      labelList
    } = this.state

    return (
      <div
        style={{
          position: 'relative'
        }}
      >
        {step !== Step.first && <Back onClick={this.goBack} />}
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
                  src={require('../../assets/imgs/banner.png')}
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
                  src={require('../../assets/imgs/banner1.png')}
                />
                <p>Visualization Using Network Embedding</p>
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
        {step === Step.second ? (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '20px 0 0 0'
            }}>
            <Upload
              multiple={true}
              headers={{
                authorization: 'authorization-text'
              }}
              fileList={fileList}
              name='imgs'

              // onChange={this.prepareUploadImages}
              beforeUpload={this.beforeUpload}
              onRemove={(file) => {
                this.setState(({ fileList }) => {
                  const index = fileList.indexOf(file);
                  const newFileList = fileList.slice();
                  newFileList.splice(index, 1);
                  return {
                    fileList: newFileList,
                  };
                });
              }}
            // beforeUpload={this.beforeUpload}
            // onChange={this.onChange}
            >
              <Button
                style={{
                  marginBottom: '20px'
                }}
              >
                Upload Photo
              </Button>
            </Upload>

            <Upload
              headers={{
                authorization: 'authorization-text'
              }}
              fileList={labelList}
              name='label'
              // onChange={this.prepareUploadImages}
              beforeUpload={this.beforeLabelUpload}
              // beforeUpload={this.beforeUpload}
              onChange={(info) => {
                // console.log("change")
                let fileList = info.fileList;
                fileList = fileList.slice(-1);
                this.setState({ labelList: fileList });
              }}
              onRemove={(file) => {
                this.setState(({ labelList }) => {
                  const index = labelList.indexOf(file);
                  const newLabel = labelList.slice();
                  newLabel.splice(index, 1);
                  return {
                    labelList: newLabel,
                  };
                });
              }}
            >
              <Button
                style={{
                  marginBottom: '20px'
                }}
              >
                Upload Label
              </Button>
            </Upload>
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
                  src={require('../../assets/imgs/tsne2000.png')}
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
                  src={require('../../assets/imgs/digit2000.png')}
                />
                <p>Visualization Using Network Embedding</p>
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
          <img src={require('../../assets/imgs/imgs_example.png')} alt="" />
          <h3>Upload Label</h3>
          <p>the label file should be like this</p>
          <img src={require('../../assets/imgs/label_example.png')} alt="" />
        </Modal>
      </div>
    );
  }
}