import React from 'react'

export default class LightningIcon extends React.Component {
  render () {
    return (
      <span className='wrapper'>
        <svg
          width='16'
          height='28'
          viewBox='0 0 16 28'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5.5583272.755775L.4383006 16.5627194h4.5938179L2.110086 26.5476408 15.0917867 11.718738H9.3370362L15.2599611.755775H5.5583272z'
            fill='#2479ff'
            fillRule='nonzero'
            stroke='#2479ff'
            strokeWidth='.63750002'
          />
        </svg>
        <style jsx>{`
          .wrapper {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            margin: 0 5px;
            width: 2.3rem;
            height: 2.3rem;
            overflow: hidden;
            transition: all 300ms ease-in-out;
          }
        `}</style>
      </span>
    )
  }
}
