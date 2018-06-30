import { Icon } from 'antd'
import * as React from 'react'

export interface IBackProps {
  onClick?: () => any,
  style?: React.CSSProperties
}

interface IBackState {
  isHovering: boolean
}

export default class Back extends React.Component<
  IBackProps,
  IBackState
> {

  public state = {
    isHovering: false
  }

  constructor(props: IBackProps) {
    super(props)

    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
  }

  public onMouseLeave() {
    this.setState({
      isHovering: false
    })
  }

  public onMouseOver() {
    this.setState({
      isHovering: true
    })
  }


  public render() {
    const { isHovering } = this.state
    const { onClick, style } = this.props
    return (
      <div
        style={{
          ...style,
          left: 10,
          position: 'absolute',
          top: 0
        }}
        onClick={onClick}
        onMouseLeave={this.onMouseLeave}
        onMouseOver={this.onMouseOver}
      >
        <Icon
          style={{
            color: isHovering ? '#1890ff' : '#333',
            fontSize: 24
          }}
          type="arrow-left"
        />
      </div>
    )
  }
}