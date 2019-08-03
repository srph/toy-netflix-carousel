import 'sanitize.css'
import './global.css'

import * as React from 'react'
import { useState, useRef, useMemo } from 'react'
import cx from 'classnames'
import * as ReactDOM from 'react-dom'
import thumbnail from './assets/thumbnail.jpg'

const c = {
  ITEMS_PER_ROW: 4,
  SLIDE_WIDTH: 248,
  SLIDE_HOVER_WIDTH: 500,
  SLIDE_MARGIN: 4
}

const items = new Array(100).fill({
  title: 'Pokemn Go'
})

function App() {
  const [active, setActive] = useState(-1)

  const styles = useMemo(() => {
    return items.map((_, i) => {
      const activeRow = Math.ceil((active + 1) / c.ITEMS_PER_ROW)
      const currentRow = Math.ceil((i + 1) / c.ITEMS_PER_ROW)

      if (active === -1 || activeRow !== currentRow) {
        return {
          transition: '400ms all ease',
          transform: 'translateX(0) scale(1)'
        }
      }

      const scale = c.SLIDE_HOVER_WIDTH / c.SLIDE_WIDTH
      const translate = (c.SLIDE_HOVER_WIDTH - c.SLIDE_WIDTH) / 2

      if (active === i) {
        return {
          transition: '400ms all ease',
          transform: `translateX(0) scale(${scale})`
        }
      }

      if (i < active) {
        return {
          transition: '400ms all ease',
          transform: `translateX(-${translate}px) scale(1)`
        }
      }

      if (i > active) {
        return {
          transition: '400ms all ease',
          transform: `translateX(${translate}px) scale(1)`
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