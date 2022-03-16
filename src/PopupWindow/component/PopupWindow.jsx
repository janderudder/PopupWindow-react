import React from 'react'
import ReactDOM from 'react-dom'


export default class PopupWindow extends React.Component
{
    state = {
        isOpen: false,
        popup: null
    }

    constructor(props) {
        super(props)
    }

    togglePopup = () => {
        const {isOpen, popup} = this.state
        if (!isOpen) {
            this.setState(state => ({
                isOpen: true,
                popup: window.open('popup.html', 'PopupWindow', 'popup')
            }), () => {
                this.state.popup.addEventListener('DOMContentLoaded', () => {
                    const rootNode = this.state.popup.document.getElementById('root')
                    ReactDOM.render(this.props.children, rootNode)
                })
            })
        } else if (this.state.popup) {
            this.setState(state => ({
                isOpen: false,
                popup: (this.state.popup) ? this.state.popup.close()|null : null
            }))
        }
    }

    render() {
        return <button onClick={this.togglePopup}>Toggle Popup</button>
    }
}
