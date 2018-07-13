// import { Button, Card, Col, message, Progress, Row } from 'antd';
import * as React from 'react';
import videojs from 'video.js';
// import 'video.js/dist/video-js.min.css';

export default class VideoPlayerPage extends React.PureComponent {

  componentDidMount() {
    videojs(document.getElementById('my-player'))
    videojs(document.getElementById('my-player2'))
    videojs(document.getElementById('my-player3'))
    videojs(document.getElementById('my-player4'))
  }

  render() {
    return (
      <div style={{ padding: '20px 0' }}>
        <h3>简介</h3>
        <p>第二组课题是深度学习在SLAM上的应用。
利用SFM估计图像的深度，同时得到图像之间的姿态转换关系。利用估计的深度的结果进行三维重建（利用TSDF进行融合得到三维空间的Mesh结构）。</p>
        <p style={{ margin: '20px 0' }}>👇原模型和真实值的深度图</p>
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
        <source src={require('../../assets/videos/group-2/1_原模型和真实值的深度图.mp4')} type="video/mp4"></source>
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
      <p style={{ margin: '20px 0' }}>👇ROS建图_1</p>
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
        <source src={require('../../assets/videos/group-2/2_ROS建图_1.mp4')} type="video/mp4"></source>
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

      <p style={{ margin: '20px 0' }}>👇原模型和优化后（导向滤波）对比</p>
      <video
          className="video-js"
          id="my-player3"
          controls
          style={{
            height: '400px',
            width: '640px'
          }}
          preload="auto"
          // poster="//vjs.zencdn.net/v/oceans.png"
          data-setup='{}'>
        <source src={require('../../assets/videos/group-2/3_原模型和优化后（导向滤波）对比.mp4')} type="video/mp4"></source>
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

      <p style={{ margin: '20px 0' }}>👇应用到室内场景</p>
      <video
          className="video-js"
          id="my-player4"
          controls
          style={{
            height: '400px',
            width: '640px'
          }}
          preload="auto"
          // poster="//vjs.zencdn.net/v/oceans.png"
          data-setup='{}'>
        <source src={require('../../assets/videos/group-2/4_应用到室内场景.mp4')} type="video/mp4"></source>
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