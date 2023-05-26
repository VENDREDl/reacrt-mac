import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import styles from "../css/Home.module.css"
import Draggable from "react-draggable"
import { Resizable } from "re-resizable";
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import Readme from "./Readme"

const playList = [
            ["꽃", "지수"], ["UNFORGIVEN", "LE SSERAFIM"], ["Teddy Bear", "STAYC"],
            ["Spicy", "Aespa"], ["Queencard", "(여자)아이들"], ["OMG", "뉴진스"],
            ["KNOCK", "이채연"], ["I AM", "IVE(아이브)"], ["Kitsch", "IVE(아이브)"],
            ["Hype Boy", "뉴진스"], ["Allergy", "(여자)아이들"], ["CHRISTIAN", "Zior Park"],
            ["Ditto", "뉴진스"]
]

function shuffle(array){
    array.sort(() => Math.random() - 0.5);
}

shuffle(playList)   


function Home({url, img, title}){
    
    const [currentMusic, setCurrentMusic] = useState(playList[0][0])
    const [currentSinger, setCurrentSinger] = useState(playList[0][1])
    localStorage.setItem("song_info", `${playList[0][0]} - ${playList[0][1]}`)
    const [musicUrl, setMusicUrl] = useState(`https://storage.googleapis.com/ai-doorlock.appspot.com/${currentMusic}.mp3`)
    const [musicCoverUrl, setMusicCoverUrl] = useState(`https://storage.googleapis.com/ai-doorlock.appspot.com/${currentMusic}.jpg`)
    const [musicState, setMusicState] = useState("onPlay")

    const player = (data) => {
        console.log(data)
    return (
        <div className = {data === true ? styles.audio_modal : styles.audio_modal_i}
            >
            <img src={musicCoverUrl} className={styles.audio_image}></img>
            <div className={styles.audio_title}>{`${currentMusic} - ${currentSinger}`}</div>
            <AudioPlayer 
            
            style={{
                width: '400px'
            }}
            autoPlay
            src={musicUrl}
            onPlay={e => ""}
            onEnded={e => setMusicState("onEnded")}
            onClickPrevious={e => console.log("Previous")}
            onClickNext={e => setMusicState("next")}
            volume='0.2'
            showSkipControls = 'true'
            />
        </div>
    )
    }

    useEffect(() => {
        setMusicUrl(`https://storage.googleapis.com/ai-doorlock.appspot.com/${currentMusic}.mp3`)
        setMusicCoverUrl(`https://storage.googleapis.com/ai-doorlock.appspot.com/${currentMusic}.jpg`)
        if(musicState === "next" || musicState === "onEnded"){
            console.log(musicState)
            shuffle(playList)      
            setCurrentMusic(playList[0][0])
            setCurrentSinger(playList[0][1])  
            setMusicState("onPlay")
            localStorage.setItem("song_info", `${playList[0][0]} - ${playList[0][1]}`)
        }
    }, [musicState])

    // ===========================================================================================
 
    const [modal, setModal] = useState(false)
    const [data, setData] = useState("")
    const [musicBar, setMusicBar] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0})

    const trackPos = (data) => {
        setPosition({x: data.x, y: data.y})
    }

    const closeModal = () => {
        setModal(false)
    }


    const renderModal = (data) => {
        return (
            <Draggable onDrag={(e, data) => trackPos(data)}>
            <Resizable
                className={styles.modal}
                defaultSize={{
                    width: 1000,
                    height: 700
                }}>
                        <div className={styles.modal_header}>
                            <div className={styles.modal_header_left}>
                                <div className={styles.modal_header_left_exit} onClick={closeModal}>x</div>
                                <div></div>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.modal_main}>
                            {data !== "README.md" ? 
                            <iframe src={data === "React Challenge" ? 
                            url[0] : 
                            data === "GitHub" ? 
                            url[1] :  
                            url[2]} width={data.x} height={data.y}></iframe> :
                            <div>
                               <Readme />
                            </div>}
                        </div>
                
            </Resizable>
            </Draggable>
        )
    }

    const onClick = (event) => {
        console.log(`Clicked ${event.target.parentElement.outerText}`)

        setModal(true)
        setData(event.target.parentElement.outerText)

    }

    const clickMusicBar = () => {
        setMusicBar(true)

        if (musicBar === true){
            setMusicBar(false)
        }
    }

    const renderTitles = () => {
        const titles = []

        title.forEach((t) => {
            titles.push(
            <div className={styles.icon_detail} onClick={onClick}>
                {t === "Nomad Coders" ? 
                <div className={styles.icon_png_n}></div> : 
                t === "README.md" ?
                <div className={styles.icon_png_r}></div> :
                <div className={styles.icon_png}></div>
            }
                <div>
                    {t}
                </div>
            </div>
            )
        })
        return titles
    }

    const renderUrls = () => {
        const urls = []

        url.forEach((t) => {
            urls.push(<div>{t}</div>)
        })
        return urls
    }

    return (
        <div className={styles.home}>

            <div className={styles.home_icon}>
                {renderTitles()}
            </div>
            <div className={styles.home_icon_disable}>

            </div>

            {modal === true ? renderModal(data) : ""}\

            {musicBar === true ? player(true) : player(false)}

            <div>
            </div>
            <div style={{
                width: '200px',
                height: '25px',
                backgroundColor: 'red',
                position: 'fixed',
                top: '0px',
                right: '360px',
                zIndex: '3',
                opacity: '0.3'
            }}
            onClick={clickMusicBar}
            ></div>
        </div>

        
    )
}

export default Home;