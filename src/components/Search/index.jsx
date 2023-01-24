import React from 'react'

export default function Search({search}) {

    const search_task = event => {
        search(event.target.value)
    };

  return (
    <div>
        <input type="text" name="title" placeholder='Search...' onChange={search_task}/>
    </div>
  )
}
