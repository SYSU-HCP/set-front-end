import { Button, Card, Col, Icon, message, Row, Upload } from 'antd';
import * as React from 'react';

const props = {
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  name: 'file',
  onChange(info:any) {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export interface IState {
  resImgSelected: string
  exImgSelected?: string
}

export default class MedicalDiagnosis extends React.PureComponent<any, IState> {
  public state: IState = {
    exImgSelected: '',
    resImgSelected: ''
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

  public render() {
    const images = [
      'http://p3.pstatp.com/large/6c310000780d7399a2d6',
      'http://p3.pstatp.com/large/6c310000780d7399a2d6',
      'http://p3.pstatp.com/large/6c310000780d7399a2d6',
      'http://p3.pstatp.com/large/6c310000780d7399a2d6',
      'http://p3.pstatp.com/large/6c310000780d7399a2d6',
    ]

    return (
      <div>
        <Row type="flex" justify="start" style={{ padding: '20px' }}>
          <Col span={12}>
            <Row type="flex" justify="start" align="middle">
              <Col span={20}>
                <Card style={{fontSize: 20, textAlign: 'center', lineHeight: '300px', height: '300px'}}>
                  还没有上传图片
                </Card>
                {/* <img style={{width: '100%', height: '100%'}} src={images[0]} alt="" /> */}
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" />上传图片
                </Button>
              </Upload>
            </Row>
            <Row style={{marginTop: '20px'}}>👆添加一张X光图片，您可以获得一张或多张<em>诊断结果图</em>, 和相应的<em>文字诊断图</em></Row>
            <Row style={{margin: '50px 0 10px 0'}}>👇或者从我们提供的图片中挑选一张试试</Row>
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
            </Row>
          </Col>
        </Row>

        <Row type="flex" justify="start" style={{ padding: '20px' }}>
          <Col span={12}>
            <Row type="flex" justify="start" align="middle">
              <Col span={20}>
                <img style={{width: '100%', height: '100%'}} src={images[0]} alt="" />
              </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" style={{marginTop: '10px'}}>
              {images.map((item, index) => {
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
            <p>从以上定义可以发现，四大机关的报告，均是上行文。其中，党、人大、军队三家的报告，都规定了四项用途，包括汇报工作、反映情况、提出建议、答复上级机关询问等。惟独政府的报告，只有三项用途，即汇报工作、反映情况、答复上级机关询问，而没有“提出建议”这个功能。实际上，在2000年发布的行政《办法》之前，也曾有“提出建议”的功能，只是在新的行政《办法》中取消了。承担这一功能新增加了文种：意见。因此，“意见”这个文种多了一个上行文的用途。（节选自《应用写作》2005年第11期《浅谈报告的适用范围和写作要求》）</p>
          </Col>
        </Row>
      </div>
    )
  }
}