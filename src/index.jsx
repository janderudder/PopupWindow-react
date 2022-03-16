import React from 'react'
import ReactDOM from 'react-dom'
import PopupWindow from './PopupWindow/component/PopupWindow'


ReactDOM.render(
    <>
        <p>hello</p>
        <PopupWindow
            src="popup.html"
            width="380"
            height="200"
            node-selector="#popup-root"
        >
            <p>Incididunt qui magna ut non cillum et labore ullamco consectetur amet aliqua adipisicing.</p>
        </PopupWindow>
    </>,
    document.getElementById('root')
)
