// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import Jungle from '../src/jungle'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Jungle />,
    document.body.appendChild(document.createElement('div')),
  )
})
