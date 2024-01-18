import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";
const ImageInput = ({setImg, val}) => {
    const spring_app_url = "http://localhost:8080";
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "logo512.png";
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        if (file == null) return;
        setImg(file);
    };
    useEffect(() => {
        console.log(val);
        if (!val) setImgFile("");
        else setImgFile(typeof(val) === "string" ? spring_app_url + "/api/v1/image/"+val : URL.createObjectURL(val));
    }, [val]);
    const handleButton = () => {
        setImgFile(undefined);
        setImgFile("");
    }
    const onErrorImg = (e) => {
        // 기본 이미지 추후 설정 필요
        e.target.src = BaseImgSrc;
    }

    return (
        <div style={{height:"20vh"}}>
            <label
            >
                <img
                     className="image"
                     src={imgFile}
                     alt={"image"}
                     onError={onErrorImg}
                />
                <input type={"file"}
                       accept="image/*"
                       onChange={() =>saveImgFile()}
                       ref={imgRef}
                       style={{display: "none"}}
                />
                <button onClick={handleButton}>X</button>

            </label>
                    </div>
    )
};

export default ImageInput;