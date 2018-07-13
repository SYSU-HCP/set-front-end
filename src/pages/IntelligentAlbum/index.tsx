import { Icon, Input, message, Modal, Upload } from 'antd';
import axios from 'axios';
import * as React from 'react';
import './index.css';

interface IState {
  fileList: any[]
  images: any[]
  imagesChecked: boolean[]
  labels: Array<{
    name: string
    imgs: any[]
  }>
  previewImage: any
  previewVisible: boolean
  searchWord: string
  resLabels: string[]
}


export default class IntelligentAlbum extends React.PureComponent<any, IState> {
  public state = {
    fileList: [],
    images: [
      '000000027909.jpg',
      '000000039678.jpg',
      '000000039957.jpg',
      '000000049822.jpg',
      '000000088898.jpg',
      '000000116641.jpg',
      '000000163865.jpg',
      '000000195871.jpg',
      '000000278122.jpg',
      '000000278826.jpg'
    ],
    imagesChecked: [false, false, false, false , false, false, false, false, false],
    imagesSelected: [],
    labels: [],
    previewImage: '',
    previewVisible: false,
    searchWord: '',
    resLabels: []
  };

  public handleCancel = () => this.setState({ previewVisible: false })

  public handlePreview = (file : any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  public beforeUpload = () => {
    return false
  }

  public getImgurl = (file:any) => new Promise((resolve, reject) => {
    if((window as any).FileReader) {
      const fr = new FileReader();
      fr.onloadend = (e:any) => {
        resolve(e.target.result)
      }
      fr.readAsDataURL(file);
    } else {
      reject()
    }
  })

  public handleInput = (e:any) => {
    this.setState({
      searchWord: e.target.value
    })
  }

  public handleChange = async (info:any) => {
    if (info.file.status !== 'uploading' && info.file.status !== 'removed') {
      const hide = message.loading('请稍等...')
      try {
        const imgUrl = await this.getImgurl(info.file)
        const param = new FormData()
        param.append('img', info.file, info.file.name)
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        const res = await axios.post('/api/recognition/uploadImage', param, config)
        const labels = this.state.labels
        const resLabels = typeof res.data.data.data === 'string' ? [res.data.data.data] : res.data.data.data
        const newLabels = []
        for (const resLabel of resLabels) {
          let isExist = false
          for (const label of labels) {
            if ((label as any).name === resLabel) {
              (label as any).imgs.push({ url: imgUrl as any })
              isExist = true
              break
            }
          }
          if (!isExist) {
            newLabels.push({
              imgs: [{ url: imgUrl }],
              name: resLabel
            })
          }
        }

        this.setState({
          fileList: [{
            uid: -1,
            name: info.file.name,
            status: 'done',
            url: imgUrl
          }],
          labels: [...labels, ...newLabels],
          resLabels
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
    } else if (info.file.status === 'removed') {
      this.setState({
        fileList: []
      })
    }  
  }

  public selectImg = async (index : number) => {
    let imagesChecked = this.state.imagesChecked;
    imagesChecked = imagesChecked.map(() => false)
    imagesChecked[index] = true;
    this.setState({
      imagesChecked: [...imagesChecked]
    });

    const hide = message.loading('请稍等...')
    const img = this.state.images[index]
    const imgUrl = require(`../../assets/imgs/gourp4/${img}`)
    try {
      const res = await axios.post('/api/recognition/uploadImageUrl', { img })
      const labels = this.state.labels
      const resLabels = typeof res.data.data.data === 'string' ? [res.data.data.data] : res.data.data.data
      const newLabels = []
      for (const resLabel of resLabels) {
        let isExist = false
        for (const label of labels) {
          if ((label as any).name === resLabel) {
            (label as any).imgs.push({ url: imgUrl as any })
            isExist = true
            break
          }
        }
        if (!isExist) {
          newLabels.push({
            imgs: [{ url: imgUrl }],
            name: resLabel
          })
        }
      }

      this.setState({
        fileList: [{
          uid: -1,
          name: img,
          status: 'done',
          url: imgUrl
        }],
        labels: [...labels, ...newLabels],
        resLabels
      })     
    } finally {
      hide()
    }
  }

  public removeImg = (index : number) => {
    const imagesChecked = this.state.imagesChecked;
    imagesChecked[index] = false;
    this.setState({
      imagesChecked: [...imagesChecked],
    });
  }

  public render() {
    const { previewVisible, previewImage, fileList, resLabels } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <React.Fragment>
        <div className="clearfix" style={{padding: '20px 0'}}>
          <div>
            <p className="upload-img-hint">👇添加一组图片，您可以获得一个根据图片内容分类的智能相册。</p>
            <Upload
              listType="picture-card"
              fileList={fileList as any[]}
              beforeUpload={this.beforeUpload}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              className="upload"
            >
              {uploadButton}
            </Upload>
          </div>
          <div style={{ margin: '20px 0' }}>
            <span>👇分类结果</span>
            <p style={{ margin: '10px 0 0 10px' }}>{resLabels.length ? resLabels.join(', ') : '暂无结果'}</p>
          </div>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <div className="upload-img--example">
          <p className="upload-img-hint">👇或者使用我们提供一组图片试试（共xx张）。</p>
          <div className="img-list">
            {
              this.state.images.map((img, index) => {
                return (
                  <div key={index} className="img-container">
                    <img onClick={this.selectImg.bind(this, index)}
                      src={require(`../../assets/imgs/gourp4/${img}`)} />
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
        <div className="label-search-container">
          <Input className="label-search" placeholder="请输入标签" onInput={this.handleInput} />
          <span>👈可以直接搜索分类标签</span>
        </div>
        <div className="labels-container">
          {
            this.state.labels.filter(label => (label as any).name.indexOf(this.state.searchWord) !== -1).map((label, idx) => {
              const { name, imgs=[] }:any = label;
              return (
                <div key={idx}>
                  <span className="label-name">{name}</span>
                  <div className="label-imgs">
                    {
                      imgs.map((img:any, index:number) => {
                        return (
                          <img key={index} src={img.url} />
                        )
                      })
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      </React.Fragment>
    );
  }
}