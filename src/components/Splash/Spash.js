import React from "react"
import LeaseTopImg from "resources/images/official_logo_white_bg.png"
import { Keyframes, animated } from 'react-spring/renderprops'

const Container = Keyframes.Spring(async next => {
  while (true) {
    await next({
      from: { radians: 0, color: '#247BA0' },
      to: { radians: 2 * Math.PI },
    })
  }
})

export default class Spash extends React.PureComponent {

  render() {
    const Content = ({ radians }) =>
      (
        <animated.img
          key={1}
          style={{
            height: radians.interpolate(
              r =>
                `${400+ 
                  50*Math.sin(r + (1 * 5 * Math.PI))}px`
            ),
              width: radians.interpolate(
              r =>
                `${400+ 
                  50*Math.sin(r + (1 * 5 * Math.PI))}px`
            ),
          }}
          src={LeaseTopImg}/>
      )

    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'white',
        }}>
        <Container
          reset
          native
          config={{ duration: 2000 }}>
          {Content}
        </Container>
      </div>
    )
  }
}