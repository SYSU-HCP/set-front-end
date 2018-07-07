import { Button, Form, Icon, InputNumber, message, Modal, Upload } from 'antd';
import axios from 'axios';
import * as React from 'react';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    sm: { span: 8 },
    xs: { span: 24 },
  },
  wrapperCol: {
    sm: { span: 16 },
    xs: { span: 24 },
  },
};

export default class UploadModal extends React.Component<any, any> {
  public state = {
    fileList: [],
    layer: null,
    path: null,
    unit: null,
    uploading: false,
  }
  public uploadProps = {
    action: '',
    beforeUpload: (file: any) => {
      this.setState(({ fileList } : any) => ({
        fileList: [file],
      }));
      return false;
    },
    fileList: this.state.fileList,
    onRemove: (file: any) => {
      this.setState(({ fileList } : any) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
      });
    },
  };
  public saveLayer = (e: any) => {
    this.setState({
      layer: parseInt(e.target.value, 10),
    });
  }
  public saveUnit = (e: any) => {
    this.setState({
      unit: parseInt(e.target.value, 10),
    });
  }
  public saveImgUrl = (e: any) => {
    this.setState({
      imgUrl: e.target.value,
    });
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
  public async onChange(info: any) {
    if (info.file.status !== 'uploading' && info.file.status !== 'removed') {
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
      }
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }   
  }

  public submit = async () => {
    const { fileList, layer, unit } : any = this.state;
    const formData = new FormData();
    fileList.forEach((file: any) => {
      formData.append('img', file);
    });
    formData.append('layer', `layer${layer}`);
    formData.append('unit', unit);
    this.setState({
      uploading: true,
    });
    const config = {
      headers: {'Content-Type': 'application/form-data'}
    }
    try {
      const res = await axios.post('/api/visualize/segment', formData, config);
      const { data: {data, msg} } : any = res;
      const { path } = data;
      if (path) {
        this.setState({
          path
        });
      } else {
        message.error(msg);
      }
    } catch(e) {
      message.error(e);
    } finally {
      this.setState({
        uploading: false,
      });
    }
  }
  public hideModal = () => {
    const { hideModal } = this.props;
    hideModal();
    this.setState({
      path: null
    });
  }
  public render() {
    const { modalVisible } = this.props;
    const { uploading, path } : any = this.state;
    return (
      <Modal
          title="Generate Picture"
          visible={modalVisible}
          onCancel={this.hideModal}
          destroyOnClose={true}
          footer={
            <Button onClick={this.hideModal}>Close</Button>
          }
        >
        <Form>
          <FormItem
            label="Layer："
            {...formItemLayout}
          >
            <InputNumber placeholder="请输入层数" style={{width: '50%'}} onBlur={this.saveLayer} />
          </FormItem>
          <FormItem
            label="Unit："
            {...formItemLayout}
          >
            <InputNumber placeholder="请输入单元数" style={{width: '50%'}}  onBlur={this.saveUnit} />
          </FormItem>
        </Form>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}>
          <Upload
            headers={{
              authorization: 'authorization-text'
            }}
            showUploadList={false}
            name='file'
            {...this.uploadProps}
            >
            <Button loading={uploading}>
              <Icon type="upload" /> Upload Image
            </Button>
          </Upload>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '10px', alignItems: 'center'}}>
          <Button onClick={this.submit} type="primary">Submit</Button> 
          { path && <div style={{marginTop: '10px'}}>
            <img src={path} />                  
          </div>
          }       
        </div>
      </Modal>
    );
  }
}
