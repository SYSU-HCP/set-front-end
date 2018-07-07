import { Button, Icon, Input, message, Tooltip, Upload } from 'antd';
import axios from 'axios';
import * as React from 'react';

const Search = Input.Search


interface IState {
  picture: string,
  predict: string,
  campicture: string,
  
  gampicture: string,
  gampredict: string,
  gamcampicture: string
}

export default class Region extends React.Component<any, IState> {
  public state = {
    campicture: '',
    gamcampicture: '',
    gampicture: '',
    gampredict: '',
    picture: '',
    predict: ''
  }

  public constructor(props:any) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
  }
  public async onChange(info: any) {
    if (info.file.status !== 'uploading' && info.file.status !== 'removed') {
      try {
        // const param = new FormData()
        // param.append('file', info.file, info.file.name)
        // const config = {
        //   headers: {'Content-Type': 'multipart/form-data'}
        // }
        // const res = await axios.post('/api/mir/', param, config)
        // this.setState({
        //   resImgSelected: res.data.data.heatmapImageUrls.length && res.data.data.heatmapImageUrls[0],
        //   resImgs: res.data.data.heatmapImageUrls,
        //   text: res.data.data.captions
        // })
      } catch (err) {
        message.error(err && err.message || '解析图像失败');
      }
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }   
  }

  public beforeUpload(file:any, fileList:any[]) {
    // if((window as any).FileReader) {
    //   const fr = new FileReader();
    //   fr.onloadend = (e:any) => {
    //     this.setState({
    //       preImg: e.target.result
    //     })
    //   }
    //   fr.readAsDataURL(file);
    // }
    return false
  }

  public onRemove() {
    // this.setState({
    //   preImg: null,
    //   resImgSelected: '',
    //   resImgs: [],
    //   text: ''
    // })
    return true
  }

  public async onSearch(value: string) {
    const param = {
      imageUrl: value
    }
    const res = await axios.post('/api/visualize/urlDetection', param)
    this.setState({
      campicture: res.data.data.campicture,
      gamcampicture: res.data.data.gamcampicture,
      gampicture: res.data.data.gampicture,
      gampredict: res.data.data.gampredict,
      picture: res.data.data.picture,
      predict: res.data.data.predict
    })
  }

  public render() {
    const { campicture, gamcampicture, gampicture, gampredict, picture, predict } = this.state

    return (
      <div>
        <h2
          style={{
            textAlign: 'center'
          }}
          >Picture Classification and Aderversarial Attacks
        </h2>

        <div
          style={{
            textAlign: 'center'
          }}>
          <Search
            onSearch={this.onSearch}
            enterButton={<Icon type="enter" />}
            placeholder="Input the img url or upload the picture you want to test!"
            style={{
              margin: '0 20px 0 0',
              width: 500
            }}
          />

          <Upload
            headers={{
              authorization: 'authorization-text'
            }}
            name='file'
            beforeUpload={this.beforeUpload}
            onChange={this.onChange}
            onRemove={this.onRemove}>
            <Button>
              <Icon type="upload" />上传图片
            </Button>
          </Upload>
        </div>


        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            margin: '20px 0 0 0',
            padding: '10px'
          }}>
          <div
            style={{
              flex: 1,
              fontSize: '18px'
            }}>
            Example
          </div>

          <div
            style={{
              display: 'flex',
              flex: 4
            }}>
            <div
              style={{
                borderRight: '1px dashed #ddd',
                padding: '0 20px 0 0',
                textAlign: 'center'
              }}>
              <p>Original</p>
              <img
                style={{
                  height: '200px',
                  width: '200px'
                }}
                src={require('../../assets/imgs/banner.png')} />
            </div>
            <div
              style={{
                padding: '0 0 0 20px',
                textAlign: 'center'
              }}>
              <p>
                <span>Adversarial</span>
                <Tooltip
                  title="Process the original picture with some noise then we get the adversarial sample. People can't distinguish them with naked eyes, but it can cause the fail of the classfier.">
                  <Icon type="question-circle" />
                </Tooltip>
              </p>
              <img
                style={{
                  height: '200px',
                  width: '200px'
                }}
                src={require('../../assets/imgs/banner.png')} />
            </div>
          </div>
        </div>

        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            margin: '20px 0 0 0',
            padding: '10px'
          }}>
          <div
            style={{
              flex: 1,
              fontSize: '18px'
            }}>
            Original
          </div>
          <div
            style={{
              display: 'flex',
              flex: 4
            }}>
            <div style={{flex: 1}}>
              <img
                style={{
                  height: '200px',
                  width: '200px'
                }}
                src={picture}
              />
            </div>
            <div style={{flex: 1}}>
              <img
                style={{
                  height: '200px',
                  width: '200px'
                }}
                src={campicture}
              />
            </div>
            <p
              style={{
                flex: 1
              }}>
              {predict}
            </p>
          </div>
        </div>

        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            margin: '20px 0 0 0',
            padding: '10px'
          }}>
          <div
            style={{
              flex: 1,
              fontSize: '18px'
            }}>
            Adversarial
          </div>

          <div
            style={{
              display: 'flex',
              flex: 4
            }}>
            <div style={{flex: 1}}>
              <img
                style={{
                  height: '200px',
                  width: '200px'
                }}
                src={gampicture}
              />
            </div>
            <div style={{flex: 1}}>
              <img
                style={{
                  height: '200px',
                  width: '200px'
                }}
                src={gamcampicture}
              />
            </div>
            <p
              style={{
                flex: 1
              }}>
              {gampredict}
            </p>
          </div>
        </div>

        <div
          style={{
            margin: '30px 0 0 0',
            textAlign: 'center'
        }}>
          <a>more explanation about this net</a>
        </div>
      </div>
    )
  }
}