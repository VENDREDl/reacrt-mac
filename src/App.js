import React from "react"
import Header from "./components/Header"
import Icons from "./components/Icons"
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"

import AudioPlayer from 'react-h5-audio-player'
// import 'react-h5-audio-player/lib/styles.css'



function App() {  
  return (
     <div>
       <Header />
      <Icons />


     </div>
  )
}

export default App;
