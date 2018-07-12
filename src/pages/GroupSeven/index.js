// import { Button, Card, Col, message, Progress, Row } from 'antd';
import * as React from 'react';
import videojs from 'video.js';
// import 'video.js/dist/video-js.min.css';

export default class VideoPlayerPage extends React.PureComponent {

  componentDidMount() {
    videojs(document.getElementById('my-player'))
    videojs(document.getElementById('my-player2'))
  }

  render() {
    return (
      <div style={{ padding: '20px 0' }}>
        <p style={{ margin: '0 0 20px 0' }}>👇使用随机抓取的策略进行试错抓取，采集数据</p>
        <video
          className="video-js"
          id="my-player"
          style={{
            height: '400px',
            margin: '0 0 50px 0',
            width: '640px'
          }}
          controls
          preload="auto"
          // poster="//vjs.zencdn.net/v/oceans.png"
          data-setup='{}'>
        <source src={require('../../assets/videos/group-7/1.mp4')} type="video/mp4"></source>
        {/* <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source> */}
        {/* <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source> */}
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="http://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
      <p style={{ margin: '0 0 20px 0' }}>👇用收集的数据训练深度学习模型，利用模型对抓取的角度做决策，对新物体进行抓取</p>
      <video
          className="video-js"
          id="my-player2"
          controls
          style={{
            height: '400px',
            width: '640px'
          }}
          preload="auto"
          // poster="//vjs.zencdn.net/v/oceans.png"
          data-setup='{}'>
        <source src={require('../../assets/videos/group-7/2.mp4')} type="video/mp4"></source>
        {/* <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source> */}
        {/* <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source> */}
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="http://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
      </div>
    )
  }
}