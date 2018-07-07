import { Button, Card, Col, Progress, Row } from 'antd';
import * as React from 'react';
import './index.css';

interface IAudio {
  name: string;
  source: string;
}
type IState = Readonly<{
  audios: IAudio[];
  uploadProgress: number;
  uploadState: 0 | 1 | 2;
  result: string;
}>

const initialState: IState = {
  audios: [{
    name: '测试',
    source: 'http://fjdx.sc.chinaz.com/Files/DownLoad/sound1/201807/10310.mp3'
  }, {
    name: '测试',
    source: 'http://fjdx.sc.chinaz.com/Files/DownLoad/sound1/201807/10310.mp3'
  }, {
    name: '测试',
    source: 'http://fjdx.sc.chinaz.com/Files/DownLoad/sound1/201807/10310.mp3'
  }, {
    name: '测试',
    source: 'http://fjdx.sc.chinaz.com/Files/DownLoad/sound1/201807/10310.mp3'
  } ],
  result: '',
  uploadProgress: 0,
  uploadState: 1,
};

export default class SpeechRecognition extends React.PureComponent<{}, IState> {
  public state: IState = initialState;

  public render() {
    const { audios, uploadState, uploadProgress, result } = this.state;
    let status: "success" | "active" | "exception" | undefined;

    if (uploadState === 0) {
      status = 'active';
    } else if (uploadState === 1) {
      status = 'success';
    } else if (uploadState === 2) {
      status = 'exception';
    }

    return (
      <div className="speech-recognition">
        <h3>⬇️您可以在我们提供的音频中选择一个进行</h3>
        <Row className="audios" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {
            audios.map((audio, index) => (
              <Col className="audio" key={index} xs={24} sm={24} md={12} lg={12}>
                <Card title={audio.name}>
                  <audio controls={true} src={audio.source} />
                  <Button disabled={!uploadState} style={{ width: '100%', marginTop: 10 }} onClick={this.upload.bind(this, audio)}>上传</Button>
                </Card>
              </Col>
            ))
          }
        </Row>
        <Progress percent={uploadProgress} status={status} />
        { 
          result ? (
            <div style={{ marginTop: 20 }}>
              <h3>结果如下</h3>
              <span>{ result }</span>
            </div>
          ) : null
        }
      </div>
    );
  }

  private upload = async (audio: IAudio) => {
    this.fakeProgress(true);
    setTimeout(() => {
      this.setState({ uploadState: 1, result: '测试语音' })
    }, 8000);
  };

  private fakeProgress = (start: boolean | undefined) => {
    const { uploadState, uploadProgress } = this.state;
    if (start) {
      this.setState({
        result: '',
        uploadProgress: 0,
        uploadState: 0,
      });
      setTimeout(this.fakeProgress, 1000);
    } else if (uploadState === 0 && uploadProgress < 100) {
      this.setState({
        uploadProgress: Math.floor((100 + uploadProgress) / 2.5)
      });
      setTimeout(this.fakeProgress, 1000);
    } else {
      this.setState({
        uploadProgress: 100,
      });
    }
  }
}