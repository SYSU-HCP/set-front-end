import * as React from 'react';
import config from './config'

export default class Home extends React.PureComponent<any, any> {
  public render() {
    return (
      <div>
        <h2>{config.title}</h2>

        <div>
          {config.projects.map(
            project => (
              <div
                style={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  margin: '20px 0'
                }}>
                { project.picture && <img style={{width: '250px', height: '250px'}} src={project.picture} alt="" />}
                <div
                  style={{
                    flexBasis: '50%',
                    margin: '0 0 0 10px',
                }}>
                  <h2>{project.title}</h2>
                  <div
                    style={{
                      fontSize: '16px',
                      margin: '10px 0 20px 0',
                  }}>{project.desc}</div>
                  <div
                    style={{
                      fontWeight: 'bold',
                    }}
                  >作者：{project.authors.join(',') }</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )
  };
}