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
}


export default class IntelligentAlbum extends React.PureComponent<any, IState> {
  public state = {
    fileList: [],
    images: [1, 2, 3, 4 ,5 , 6, 7, 8, 9],
    imagesChecked: [false, false, false, false , false, false, false, false, false],
    imagesSelected: [],
    labels: [],
    previewImage: '',
    previewVisible: false,
  };

  public handleCancel = () => this.setState({ previewVisible: false })

  public handlePreview = (file : any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  // public handleChange = ({ fileList } : { fileList : any } ) => this.setState({ fileList })
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

  public handleChange = async (info:any) => {
    if (info.file.status !== 'uploading' && info.file.status !== 'removed') {
      try {
        const imgUrl = await this.getImgurl(info.file)
        const param = new FormData()
        param.append('img', info.file, info.file.name)
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        const res = await axios.post('/api/recognition/uploadImage', param, config)
        const labels = this.state.labels
        const resLabels = res.data.data
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
              imgs: [],
              name: resLabel
            })
          }
        }

        this.setState({
          labels: [...labels, ...newLabels]
        })

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

  public selectImg = (index : number) => {
    const imagesChecked = this.state.imagesChecked;
    imagesChecked[index] = true;
    this.setState({
      imagesChecked: [...imagesChecked]
    });
  }

  public removeImg = (index : number) => {
    const imagesChecked = this.state.imagesChecked;
    imagesChecked[index] = false;
    this.setState({
      imagesChecked: [...imagesChecked],
    });
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
        <div className="clearfix">
          <div className="upload-img--self">
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
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <div className="upload-img--example">
          <p className="upload-img-hint">👇添加一组图片，您可以获得一个根据图片内容分类的智能相册。或者使用我们提供一组图片试试（共xx张）。</p>
          {/* <Button type="primary">上传示例图片</Button> */}
          <div className="img-list">
            {
              this.state.images.map((img, index) => {
                return (
                  <div key={index} className="img-container">
                    <img onClick={this.selectImg.bind(this, index)}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_" />
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
          <Input className="label-search" placeholder="请输入标签" />
          <span>👈可以直接搜索分类标签</span>
        </div>
        <div className="labels-container">
          {
            this.state.labels.map((label, idx) => {
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