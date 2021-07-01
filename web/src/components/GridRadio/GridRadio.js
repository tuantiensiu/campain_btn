import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

const GridCell = ({ text = '' }) => {
  const isSeparated = text.length > 0 ? text.indexOf('|') > -1 : false
  const [left, right] =
    isSeparated && text.length > 0 ? text.split('|') : [text, null]
  return (
    <>
      <span>{left}</span>
      <div className="flex-1" />
      <span>{right}</span>
    </>
  )
}

const GridRadio = ({
  list = [],
  cols = 3,
  onSelect = () => {},
  titleProp = 'title',
}) => {
  const [selected, setSelected] = useState(0)
  const switchRadio = (index) => {
    setSelected(index)
    onSelect(list[index])
  }
  useEffect(() => {
    setSelected(0)
  }, [list])
  return (
    <div
      className={classNames('grid', 'gap-2', 'mt-2', {
        ['grid-cols-' + cols]: true,
      })}
    >
      {list.map((item, index) => (
        <div
          onClick={() => switchRadio(index)}
          key={index}
          className={classNames(
            'cursor-pointer',
            'flex',
            'text-white',
            'rounded',
            'p-2',
            'h-16',
            'text-md',
            'lg:text-xl',
            {
              'bg-green-500': selected === index,
              'bg-gray-600': selected !== index,
            }
          )}
        >
          <GridCell text={item[titleProp]} />
        </div>
      ))}
    </div>
  )
}

export default GridRadio
