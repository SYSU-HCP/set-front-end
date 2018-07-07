import { Button, Card, Col, Icon, message, Row, Upload } from 'antd';
import axios from 'axios';
import * as React from 'react';


export interface IState {
  resImgSelected: string
  resImgs: string[],
  text: string,
  preImg: any,
  exImgSelected?: string
}

export default class MedicalDiagnosis extends React.PureComponent<any, IState> {
  public state: IState = {
    exImgSelected: '',
    preImg: null,
    resImgSelected: '',
    resImgs: [],
    text: ''
  }
  public constructor(props:any) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
  }
  public async onChange(info: any) {
    if (info.file.status !== 'uploading' && info.file.status !== 'removed') {
      const hide = message.loading('请稍等...')
      try {
        const param = new FormData()
        param.append('file', info.file, info.file.name)
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        const res = await axios.post('/api/mir/', param, config)
        this.setState({
          resImgSelected: res.data.data.heatmapImageUrls.length && res.data.data.heatmapImageUrls[0],
          resImgs: res.data.data.heatmapImageUrls,
          text: res.data.data.captions
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

  public onResImgSelected(item:string) {
    this.setState({
      resImgSelected: item
    })
  }

  public onExImgSelected(item:string) {
    this.setState({
      exImgSelected: item
    })
  }

  public beforeUpload(file:any, fileList:any[]) {
    if((window as any).FileReader) {
      const fr = new FileReader();
      fr.onloadend = (e:any) => {
        this.setState({
          preImg: e.target.result
        })
      }
      fr.readAsDataURL(file);
    }
    return false
  }

  public onRemove() {
    this.setState({
      preImg: null,
      resImgSelected: '',
      resImgs: [],
      text: ''
    })
    return true
  }

  public render() {
    const { resImgSelected, resImgs, text, preImg } = this.state
    return (
      <div>
        <Row type="flex" justify="start" style={{ padding: '20px' }}>
          <Col span={12}>
            <Row type="flex" justify="start" align="middle">
              <Col span={20}>
                {!preImg ? 
                  (
                    <Card style={{fontSize: 20, textAlign: 'center', lineHeight: '300px', height: '300px'}}>
                      还没有上传图片
                    </Card>) :
                  (<img style={{width: '100%', height: '100%'}} src={preImg} alt="" />)
                }
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Upload
                headers={{
                  authorization: 'authorization-text'
                }}
                name='file'
                beforeUpload={this.beforeUpload}
                onChange={this.onChange}
                onRemove={this.onRemove}
                >
                <Button>
                  <Icon type="upload" />上传图片
                </Button>
              </Upload>
            </Row>
            <Row style={{marginTop: '20px'}}>👆添加一张X光图片，您可以获得一张或多张<em>诊断结果图</em>, 和相应的<em>文字诊断图</em></Row>
            {/* <Row style={{margin: '50px 0 10px 0'}}>👇或者从我们提供的图片中挑选一张试试</Row>
            <Row>
            {images.map((item, index) => {
                const style = {
                  border: this.state.exImgSelected === item ? '1px dashed #1890ff' : '1px dashed #d9d9d9',
                  height: '120px',
                  margin: '0 10px 10px 0',
                  width: '120px',
                }
                return (
                  <img
                    onClick={this.onExImgSelected.bind(this, item)}
                    key={index}
                    style={style}
                    src={item}
                    alt="" />
                )
              }
              )}
            </Row> */}
          </Col>
        </Row>
        
        <Row type="flex" justify="start" style={{ padding: '20px', display: resImgs.length ? 'block' : 'none' }}>
          <Col span={12}>
            <Row type="flex" justify="start" align="middle">
              <Col span={20}>
                <img style={{width: '100%', height: '100%'}} src={resImgSelected} alt="" />
              </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" style={{marginTop: '10px'}}>
              {resImgs.map((item, index) => {
                const style = {
                  border: this.state.resImgSelected === item ? '1px dashed #1890ff' : '1px dashed #d9d9d9',
                  height: '80px',
                  margin: '0 10px 10px 0',
                  width: '80px',
                }
                return (
                  <img
                    onClick={this.onResImgSelected.bind(this, item)}
                    key={index}
                    style={style}
                    src={item}
                    alt="" />
                )
              }
              )}
            </Row>
          </Col>
          <Col span={12}>
            <h3>诊断报告</h3>
            <p>{text}</p>
          </Col>
        </Row>
      </div>
    )
  }
}