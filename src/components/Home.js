import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import styles from "../css/Home.module.css"
import Draggable from "react-draggable"
import { Resizable } from "re-resizable";

function Home({url, img, title}){

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
                            <iframe src={data == "React Challenge" ? url[0] : data == "Github" ? url[1] : url[2]} width={data.x} height={data.y}></iframe>
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
        </div>

        
    )
}

export default Home;