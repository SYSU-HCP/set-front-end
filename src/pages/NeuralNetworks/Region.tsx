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
      const hide = message.loading('请稍等...')
      try {
        const param = new FormData()
        param.append('img', info.file, info.file.name)
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        const res = await axios.post('/api/visualize/detection', param, config)
        this.setState({
          campicture: res.data.data.campicture,
          gamcampicture: res.data.data.gamcampicture,
          gampicture: res.data.data.gampicture,
          gampredict: res.data.data.gampredict,
          picture: res.data.data.picture,
          predict: res.data.data.predict
        })
      } catch (err) {
        message.error(err && err.message || '解析图像失败');
      } finally {
        hide()
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
    const hide = message.loading('请稍等...') 
    try {
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
    } finally {
      hide()
    }
  }

  public render() {
    const { campicture, gamcampicture, gampicture, gampredict, picture, predict } = this.state
    const { goNext } = this.props

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
            showUploadList={false}
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
              flex: 4,
              flexWrap: 'wrap'
            }}>
              <div onClick={() => this.onSearch('https://wx4.sinaimg.cn/mw690/a0b59701ly1ft7go3jb0bj20dw0dw77t.jpg')} style={{ display: 'flex', margin: '0 20px 20px 0' }}>
                <div
                  style={{
                    borderRight: '1px dashed #ddd',
                    padding: '0 20px 0 0',
                    textAlign: 'center'
                  }}>
                  <p>Original</p>
                  <img
                    style={{
                      height: '150px',
                      width: '150px'
                    }}
                    src={require('../../assets/imgs/picture1.jpeg')} />
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
                      height: '150px',
                      width: '150px'
                    }}
                    src={require('../../assets/imgs/campicture1.jpeg')} />
                </div>
              </div>
              <div onClick={() => this.onSearch('https://wx2.sinaimg.cn/mw690/a0b59701ly1ft7go3k7cmj20dw0dwgpg.jpg')} style={{ display: 'flex', margin: '0 20px 20px 0' }}>
                <div
                  style={{
                    borderRight: '1px dashed #ddd',
                    padding: '0 20px 0 0',
                    textAlign: 'center'
                  }}>
                  <p>Original</p>
                  <img
                    style={{
                      height: '150px',
                      width: '150px'
                    }}
                    src={require('../../assets/imgs/picture2.jpeg')} />
                </div>
                <div
                  style={{
                    padding: '0 0 0 20px',
                    textAlign: 'center'
                  }}>
                  <p>
                    <span>Adversarial</span>
                  </p>
                  <img
                    style={{
                      height: '150px',
                      width: '150px'
                    }}
                    src={require('../../assets/imgs/campicture2.jpeg')} />
                </div>
              </div>
              <div onClick={() => this.onSearch('https://wx2.sinaimg.cn/mw690/a0b59701ly1ft7go3lepdj20dw0dwtd2.jpg')} style={{ display: 'flex', margin: '0 20px 20px 0' }}>
                <div
                  style={{
                    borderRight: '1px dashed #ddd',
                    padding: '0 20px 0 0',
                    textAlign: 'center'
                  }}>
                  <p>Original</p>
                  <img
                    style={{
                      height: '150px',
                      width: '150px'
                    }}
                    src={require('../../assets/imgs/picture3.jpeg')} />
                </div>
                <div
                  style={{
                    padding: '0 0 0 20px',
                    textAlign: 'center'
                  }}>
                  <p>
                    <span>Adversarial</span>
                  </p>
                  <img
                    style={{
                      height: '150px',
                      width: '150px'
                    }}
                    src={require('../../assets/imgs/campicture3.jpeg')} />
                </div>
              </div>
            </div>
        </div>

        {picture ? (<div
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
        </div>) : null}

        {gampicture ? (<div
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
        </div>) : null}

        <div
          style={{
            margin: '30px 0 0 0',
            textAlign: 'center'
        }}>
          <a onClick={goNext}>more explanation about this net</a>
        </div>
      </div>
    )
  }
}