import { Icon, message, Modal, Upload } from 'antd';
import axios from 'axios';
import * as React from 'react';
import './index.css';

export default class IntelligentAlbum extends React.PureComponent {
  public state = {
    fileList: [],
    images: [1, 2, 3, 4, 5, 6],
    imagesChecked: [false, false, false, false, false, false],
    imagesSelected: [],
    previewImage: '',
    previewVisible: false,
    resultClothesImages: []
  };

  public handleCancel = () => this.setState({ previewVisible: false })

  public handlePreview = (file: any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  public getImgurl = (file: any) => new Promise((resolve, reject) => {
    if ((window as any).FileReader) {
      const fr = new FileReader();
      fr.onloadend = (e: any) => {
        resolve(e.target.result)
      }
      fr.readAsDataURL(file);
    } else {
      reject()
    }
  })

  public handleChange = async (info: any) => {
    if (info.file.status !== 'uploading' && info.file.status !== 'removed') {
      const hide = message.loading('请稍等...')
      try {
        const imgUrl = await this.getImgurl(info.file)
        const param = new FormData()
        param.append('img', info.file, info.file.name)
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        const res = await axios.post('/api/detection/classification', param, config)
        message.success('成功找到相似衣服的图片')
        this.setState({
          fileList: [{
            uid: -1,
            name: info.file.name,
            status: 'done',
            url: imgUrl
          }],
          resultClothesImages: res.data.data.images.map((image: string) => ({ url: image }))
        })

      } catch (err) {
        message.error('未找到任何相似图片');
        this.setState({
          resultClothesImages: []
        })
      } finally {
        hide()
      }
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    } else if (info.file.status === 'removed') {
      this.setState({
        fileList: [],
        resultClothesImages: []
      })
    }
  }

  public handleSample = async (imgName: any) => {
    const hide = message.loading('请稍等...')
    try {
      const param = {
        img: imgName
      }
      const res = await axios.post('/api/detection/classificationUrl', param)
      message.success('成功找到相似衣服的图片')
      this.setState({
        resultClothesImages: res.data.data.images.map((image: string) => ({ url: image }))
      })
    } catch (err) {
      message.error('未找到任何相似图片');
      this.setState({
        resultClothesImages: []
      })
    } finally {
      hide()
    }
  }

  public selectImg = async (index: number) => {
    const imagesChecked = this.state.imagesChecked;
    for (var i in imagesChecked) {
      imagesChecked[i] = false;
    }
    imagesChecked[index] = true;
    await this.handleSample(("cloth_"+index+".jpg"))
    this.setState({
      imagesChecked: [...imagesChecked]
    });
  }

  public removeImg = (index: number) => {
    const imagesChecked = this.state.imagesChecked;
    imagesChecked[index] = false;
    this.setState({
      imagesChecked: [...imagesChecked],
    });
  }

  public beforeUpload = () => {
    return false
  }

  public render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <React.Fragment>
        <div className="clearfix" style={{ padding: '20px 0' }}>
          <div>
            <p className="upload-img-hint">👇添加一张衣服的图片，你可以获得一组含有相似衣服的图片。</p>
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              beforeUpload={this.beforeUpload}
              fileList={fileList as any[]}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              className="upload"
            >
              {uploadButton}
            </Upload>
          </div>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <div className="upload-img--example">
          <p className="upload-img-hint">👇或者使用我们提供的图片试试（共6张）。</p>
          <div className="img-list">
            {
              this.state.images.map((img, index) => {
                return (
                  <div key={index} className="img-container">
                    <img onClick={this.selectImg.bind(this, index)}
                      src={require("../../assets/imgs/clothes/cloth_" + index + ".jpg")} />
                    {
                      this.state.imagesChecked[index] ?
                        (<div className="img-mask" onClick={this.removeImg.bind(this, index)}>
                          <Icon type="check" />
                        </div>) : null
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
        {this.state.resultClothesImages.length ?
          (<div className="result-clothes-container">
            <span className="result-clothes-title">查找到的衣服图片</span>
            <div className="result-clothes-imgs">
              {
                this.state.resultClothesImages.map((img: any, index) => {
                  return (<img key={index} src={img.url} />)
                })
              }
            </div>
          </div>) : null}
      </React.Fragment>
    );
  }
}