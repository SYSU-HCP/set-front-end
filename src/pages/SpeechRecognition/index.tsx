import { Button, Card, Col, message, Progress, Row } from 'antd';
import axios from 'axios';
import * as React from 'react';
import './index.css';

interface IAudio {
  id: number;
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
    id: 1,
    name: 'sheila left marvin house',
    source: require('../../assets/voice/id_1-sheila left marvin house.mp3')
  }, {
    id: 2,
    name: 'nine bird on the tree',
    source: require('../../assets/voice/id_2-nine bird on the tree.mp3')
  }, {
    id: 3,
    name: 'stop dog up on house',
    source: require('../../assets/voice/id_3-stop dog up on house.wav')
  }, {
    id: 4,
    name: 'six tree on right side of house',
    source: require('../../assets/voice/id_4-six tree on right side of house.wav')
  },{
    id: 5,
    name: 'one two three four five',
    source: require('../../assets/voice/id_5-one two three four five.wav')
  },{
    id: 6,
    name: 'six bird stop on the right',
    source: require('../../assets/voice/id_6-six bird stop on the right.wav')
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
        <span>👇您可以在我们提供的音频中选择一个进行</span>
        <Row className="audios" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {
            audios.map((audio, index) => (
              <Col className="audio" key={index} xs={24} sm={24} md={8} lg={8}>
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
            <div style={{ marginTop: '20px', fontSize: '16px' }}>
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
    try {
      const result = await axios.post('/api/voiceRecognition/uploadId', { id: audio.id });
      (console as any).log(result);
      this.setState({ uploadState: 1, uploadProgress: 100, result: result.data.data.join(' ') });
    } catch(e) {
      message.error(e.response.data.msg);
      this.setState({ uploadState: 2, uploadProgress: 100, result: '' });
    }
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