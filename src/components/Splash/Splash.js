import React from "react"
import LeaseTopImg from "resources/images/official_logo_white_bg.png"
import {animated, Keyframes} from 'react-spring/renderprops'

const Container = Keyframes.Spring(async next => {
    while (true) {
        await next({
            from: {radians: 0, color: '#247BA0'},
            to: {radians: 2 * Math.PI},
        })
    }
})

export default class Splash extends React.PureComponent {

    render() {
        const Content = ({radians}) =>
            (
                <animated.img
                    key={1}

                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',

                        height: radians.interpolate(
                            r =>
                                `${300 +
                                30 * Math.sin(r + (1 * 5 * Math.PI))}px`
                        ),
                        width: radians.interpolate(
                            r =>
                                `${300 +
                                30 * Math.sin(r + (1 * 5 * Math.PI))}px`
                        ),
                    }}
                    src={LeaseTopImg}/>
            )

        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor:'white'
                }}>
                <Container
                    reset
                    native
                    config={{duration: 1200}}>
                    {Content}
                </Container>
            </div>
        )
    }
}