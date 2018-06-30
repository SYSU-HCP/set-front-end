// import { UploadFile } from '_antd@3.6.2@antd/lib/upload/interface';
import { Button, Icon, Input, Modal, Upload } from 'antd';
import * as React from 'react';
import './index.css';

export default class IntelligentAlbum extends React.PureComponent {
  public state = {
    fileList: [],
    images: [1, 2, 3, 4 ,5 , 6, 7, 8, 9],
    imagesChecked: [false, false, false, false , false, false, false, false, false],
    imagesSelected: [],
    labels: [
      {
        imgs: [
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
        ],
        name: '猫',
      }, 
      { 
        imgs: [
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
        ],
        name: '狗',
      }, 
      {
        imgs: [
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
          {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_AKNXc2X-Ev2KL382lPEjBvlXdIaigO6CiolLiDniOz0b5u_'},
        ],
        name: '花',
      },
    ],
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
        <div className="clearfix">
          <div className="upload-img--self">
            <p className="upload-img-hint">👇添加一组图片，您可以获得一个根据图片内容分类的智能相册。</p>
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
          <p className="upload-img-hint">👇添加一组图片，您可以获得一个根据图片内容分类的智能相册。或者使用我们提供一组图片试试（共xx张）。</p>
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
        <div className="label-search-container">
          <Input className="label-search" placeholder="请输入标签" />
          <span>👈可以直接搜索分类标签</span>
        </div>
        <div className="labels-container">
          {
            this.state.labels.map((label, idx) => {
              const { name, imgs=[] } = label;
              return (
                <div key={idx}>
                  <span className="label-name">{name}</span>
                  <div className="label-imgs">
                    {
                      imgs.map((img, index) => {
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