import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import styles from "../css/Header.module.css"




const playList = []


function Header(){
    const today = new Date();


    const [month, setMonth] = useState(0);
    const [date, setDate] = useState(0);
    const [day, setDay] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const [seconds, setseconds] = useState(0)



    useEffect(() => {
        setMonth(today.getMonth() + 1);
        setDate(today.getDate());
        setDay(today.getDay() === 1 ? "월" : today.getDay() === 2 ? "화" : today.getDay() === 3 ? "수" : today.getDay() === 4 ? "목" : today.getDay() === 5 ? "금" : today.getDay() === 6 ? "토" : "일");
        setHours(today.getHours() >= 12 ? `오후 ${today.getHours()}` : `오전 ${today.getHours()}`);
        setMinutes(String(today.getMinutes()).length == 1 ? (`0${String(today.getMinutes())}`) : today.getMinutes());

        // console.log(`${month}월 ${date}일 (${day}) ${hours}:${minutes}`)
        
    }, [seconds])

    setInterval(function(){
        setseconds(today.getSeconds())
        // const audioState = document.querySelector("audio")
        // console.log(audioState)
    }, 2000)

    return (
       <div className={styles.header}>
            <div className={styles.header_left}>
                <div className={styles.italic}>HanGyu</div>
                <div className={styles.left_icon}>Since</div>
                <div className={styles.left_icon}>23.05.25</div>
                <div className={styles.left_icon}>주의</div>
                <div className={styles.left_icon} >오류 많음</div>
                <div className={styles.left_icon}>계속</div>
                <div className={styles.left_icon}>업데이트</div>
                <div className={styles.left_icon}>예정</div>
                
            </div>
            <div className={styles.header_right}>
                <div>Icon 1</div>
                <div>Icon 2</div>
                <div>Icon 3</div>
                <div>
                   {localStorage.getItem("song_info")}
                </div>
                <div><img src="https://wakatime.com/badge/user/ed8163e8-aa6a-4cb4-827e-780d53c1f10e.svg" className={styles.header_right_img}></img></div>
                <div>{`${month}월 ${date}일 (${day}) ${hours}:${minutes}`}</div>
            </div>

            
        </div>
    )
}

export default Header;