import 'sanitize.css'
import './global.css'

import * as React from 'react'
import { useState, useRef, useMemo } from 'react'
import cx from 'classnames'
import * as ReactDOM from 'react-dom'
import thumbnail from './assets/thumbnail.jpg'

const c = {
  ITEMS_PER_ROW: 8,
  SLIDE_WIDTH: 175,
  SLIDE_HOVER_WIDTH: 300,
  SLIDE_MARGIN: 4
}

const items = new Array(100).fill({
  title: 'Pokemon Go'
})

function App() {
  const [active, setActive] = useState(-1)

  const styles = useMemo(() => {
    const activeRow = Math.ceil((active + 1) / c.ITEMS_PER_ROW) // Active item's index as row
    const activeColumn = active % c.ITEMS_PER_ROW // Active item's index as column

    return items.map((_, i) => {
      const currentRow = Math.ceil((i + 1) / c.ITEMS_PER_ROW)

      if (active === -1 || activeRow !== currentRow) {
        return {
          transition: '400ms all ease',
          transform: 'translateX(0) scale(1)'
        }
      }

      const scale = c.SLIDE_HOVER_WIDTH / c.SLIDE_WIDTH
      const translate = (c.SLIDE_HOVER_WIDTH - c.SLIDE_WIDTH) / 2
      const offset = (() => {
        if (activeColumn === 0) {
          return (c.SLIDE_HOVER_WIDTH - c.SLIDE_WIDTH) / 2
        }
        
        if (activeColumn === c.ITEMS_PER_ROW - 1) {
          return -((c.SLIDE_HOVER_WIDTH - c.SLIDE_WIDTH) / 2)
        }
        
        return 0
      })()

      if (active === i) {
        return {
          transition: '400ms all ease',
          transform: `translateX(${offset}px) scale(${scale})`
        }
      }

      if (i < active) {
        return {
          transition: '400ms all ease',
          transform: `translateX(-${translate - offset}px) scale(1)`
        }
      }

      if (i > active) {
        return {
          transition: '400ms all ease',
          transform: `translateX(${translate + offset}px) scale(1)`
        }
      }

      return {}
    })
  }, [active])
  
  return (
    <div className="app-body">
      <div className="app-container">
        <div className="show-list">
          {items.map((item, i) =>
            <div className="column" style={styles[i]} key={i}>
              <div className="show-item-container">
                <div className="show-item" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(-1)}>
                  <img src={thumbnail} className="thumbnail" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('mount'))
