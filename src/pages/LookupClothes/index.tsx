import { Button, Icon, Modal, Upload } from 'antd';
import * as React from 'react';
import './index.css';

export default class IntelligentAlbum extends React.PureComponent {
  public state = {
    fileList: [],
    images: [1, 2, 3, 4 ,5 , 6, 7, 8, 9],
    imagesChecked: [false, false, false, false , false, false, false, false, false],
    imagesSelected: [],
    previewImage: '',
    previewVisible: false,
    resultClothesImages: [
      {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
      {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
      {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
      {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
    ],
  };

  public handleCancel = () => this.setState({ previewVisible: false })

  public handlePreview = (file : any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  public handleChange = ({ fileList } : { fileList : any } ) => this.setState({ fileList })

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
        <div className="clearfix" style={{ padding: '20px 0' }}>
          <div>
            <p className="upload-img-hint">👇添加一张衣服的图片，你可以获得一组含有相似衣服的图片。</p>
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
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
          <p className="upload-img-hint">👇或者使用我们提供的图片试试（共xx张）。</p>
          <Button type="primary">上传示例图片</Button>
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
        <div className="result-clothes-container">
            <span className="result-clothes-title">查找到的衣服图片</span>
            <div className="result-clothes-imgs">
              {
                this.state.resultClothesImages.map((img, index) => {
                  return (<img key={index} src={img.url} />)
                })
              }
            </div>
        </div>
      </React.Fragment>
    );
  }
}