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
        const renderChildren = (rootNode) => {
            ReactDOM.render(<>{this.props.children}</>, rootNode)
        }
        if (this.state.isOpen) {
            this.state.popup.focus()
        } else {
            const { src, target, nodeSelector, featString } = this.state
            this.setState({
                isOpen: true,
                popup: window.open(src, target, featString)
            }, () => {
                const popup = this.state.popup
                /*  This is programmed defensively. In practice, the render
                    function seems to always end up being called by the event
                    listener, even if we add a delay before querying the node.*/
                const renderNode = popup.document.querySelector(nodeSelector)
                if (renderNode) {
                    renderChildren(renderNode)
                } else {
                    popup.addEventListener('DOMContentLoaded', (event) => {
                        renderChildren(event.target.querySelector(nodeSelector))
                    })
                }
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
