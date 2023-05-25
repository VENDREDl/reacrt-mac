import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import styles from "../css/Home.module.css"
import Draggable from "react-draggable"
import { Resizable } from "re-resizable";
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

// %20

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

    //https://storage.googleapis.com/ai-doorlock.appspot.com/${music}.mp3
    
    const [currentMusic, setCurrentMusic] = useState(playList[0][0])
    const [currentSinger, setCurrentSinger] = useState(playList[0][1])
    localStorage.setItem("song_info", `${playList[0][0]} - ${playList[0][1]}`)
    const [musicUrl, setMusicUrl] = useState(`https://storage.googleapis.com/ai-doorlock.appspot.com/${currentMusic}.mp3`)
    const [musicState, setMusicState] = useState("onPlay")

    const player = () => {
    return (
        <div className={styles.audio_modal}>
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

    const [position, setPosition] = useState({x: 0, y: 0})

    const trackPos = (data) => {
        setPosition({x: data.x, y: data.y})
    }

    const onChange = (event) => {
        console.log(event)
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
                            {data != "README.md" ? 
                            <iframe src={data == "React Challenge" ? 
                            url[0] : 
                            data == "GitHub" ? 
                            url[1] :  
                            url[2]} width={data.x} height={data.y}></iframe> :
                            <div>
                                <h2>23.05.25</h2>
                                <ul>
                                    <li>개발 4시간째라 문제가 많습니다.. </li>
                                    <li>Header 추가 </li>
                                    <li>Icon 추가 </li>
                                    <li>Modal Resize / Drag 이벤트 추가 - 수정 필요 </li>
                                    <li>음악 플레이어 기능 테스트 중 </li>
                                    <li>예정) 노래 중복 재생 안되게</li>
                                </ul>
                            </div>}
                        </div>
                
            </Resizable>
            </Draggable>
        )
    }

    const onClick = (event) => {
        console.log(`Clicked ${event.target.parentElement.outerText}`)
        // console.log(event)

        setModal(true)
        setData(event.target.parentElement.outerText)

    }

    const renderTitles = () => {
        const titles = []

        title.forEach((t) => {
            titles.push(
            <div className={styles.icon_detail} onClick={onClick}>
                {t == "Nomad Coders" ? 
                <div className={styles.icon_png_n}></div> : 
                t == "README.md" ?
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

            {/* {renderTitles()}
            {renderUrls()} */}

            {modal === true ? renderModal(data) : ""}

            <div>
                {player()}
            </div>
        </div>

        
    )
}

export default Home;