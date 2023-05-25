import styles from "../css/Icons.module.css"
import Home from "./Home"

function Icons() {


    return (
        <div className={styles.icons}>
            <Home 
                title={['React Challenge', 'GitHub', 'Nomad Coders']}   
                url={['http://apresmidi.cloud:5000', 'http://github.com/VENDREDl', 'https://nomadcoders.co/']}
                key={'1'}
            />
        </div>
    )
} 


export default Icons