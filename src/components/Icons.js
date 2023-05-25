import styles from "../css/Icons.module.css"
import Home from "./Home"

function Icons() {


    return (
        <div className={styles.icons}>
            <Home 
                title={['React Challenge', 'GitHub', 'Nomad Coders', 'README.md']}   
                url={['http://apresmidi.cloud:5000', 'http://wakatime.com/@GYU_HAN', 'https://nomadcoders.co/', "/home/hangyu/react_movie/react-mac/src/readme.html"]}
                key={'1'}
            />
        </div>
    )
} 


export default Icons