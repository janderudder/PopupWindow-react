import React from 'react'
import ReactDOM from 'react-dom'


export default class PopupWindow extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            src:  props.src,
            width: props.width,
            height: props.height,
            target: props.target || '__blank',
            nodeSelector: props['node-selector'] || '#root',
            mode: this[props.mode||'toggle'],
            isOpen: false,
            popup: null
        }
        const { width, height } = this.state
        this.state['featString'] = 'popup'
            + ((width) ? `,width=${width}` : '')
            + ((height) ? `,height=${height}` : '')
    }

    open = () => {
        const { isOpen } = this.state
        if (isOpen) {
            this.state.popup.focus()
        } else {
            const { src, target, nodeSelector, featString } = this.state
            this.setState({
                isOpen: true,
                popup: window.open(src, target, featString)
            }, () => {
                this.state.popup.addEventListener('DOMContentLoaded', () => {
                    ReactDOM.render(
                        <>{this.props.children}</>,
                        this.state.popup.document.querySelector(nodeSelector))
                })
            })
        }
    }

    close = () => {
        this.setState({isOpen: false}, () => {
            if (this.state.popup) {
                this.state.popup.close()
            }
        })
    }

    toggle = () => {
        if (!this.state.isOpen) {
            this.open()
        } else if (this.state.popup) {
            this.close()
        }
    }

    render() {
        return <button onClick={this.state.mode}>Toggle Popup</button>
    }
}
