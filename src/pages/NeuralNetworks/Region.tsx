import { Button, Icon, Input, message, Tooltip, Upload } from 'antd';
import * as React from 'react';

const Search = Input.Search

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

export default class Region extends React.Component<any, any> {
  public render() {

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
            enterButton={<Icon type="enter" />}
            placeholder="Input the img url or upload the picture you want to test!"
            style={{
              margin: '0 20px 0 0',
              width: 500
            }}
          />

          <Upload {...props}>
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
                src={require('../../assets/imgs/banner.png')}
              />
            </div>
            <div style={{flex: 1}}>
              <img
                style={{
                  height: '200px',
                  width: '200px'
                }}
                src={require('../../assets/imgs/banner.png')}
              />
            </div>
            <p
              style={{
                flex: 1
              }}/>
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
                src={require('../../assets/imgs/banner.png')}
              />
            </div>
            <div style={{flex: 1}}>
              <img
                style={{
                  height: '200px',
                  width: '200px'
                }}
                src={require('../../assets/imgs/banner.png')}
              />
            </div>
            <p
              style={{
                flex: 1
              }}/>
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