import _ from "./lib"
import React from 'react';
import Layout from './layout';
import reactdom from 'react-dom'

function run(){

  reactdom.render(<Layout />,document.querySelector('#app'));
}

new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
}).then(run)
