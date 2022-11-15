import loadingImg from "../../../assets/images/loading.gif";
import styles from "./Preloader.module.css";
import React from "react";

const Preloader = () => {
    return(
        <img src={loadingImg} className={styles.loadingImg}/>
    )
}
export default Preloader