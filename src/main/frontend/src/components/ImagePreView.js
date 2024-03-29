import {GetImageUri} from "../utils/GetImage";

const ImagePreView = ({img}) => {
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "/logo512.png";
    const onErrorImg = (e) => {
        // 기본 이미지 추후 설정 필요
        e.target.src = BaseImgSrc;
    }
    return(
        <img
            style={{width:'90%'}}
            src={typeof(img) === "string" ? GetImageUri(img) : URL.createObjectURL(img)}
            alt={"image"}
            onError={onErrorImg}
        />
    )
};

export default ImagePreView;