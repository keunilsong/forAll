import {useState, useCallback, useEffect} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import ImageInput from "../../components/ImageInput";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";
import DropDown from "../../components/DropDown";
const ChefInfoModifyPage = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [career, setCareer] = useState([]);
    const [sanitaryImage, setSanitaryImage] = useState("");
    const [bank, setBank] = useState("");
    const [account, setAccount] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const bankDatas = ["한국은행", "KB국민은행", "신한은행", "우리은행", "하나은행", "SC제일은행", "한국씨티은행", "케이뱅크", "카카오뱅크", "토스뱅크", "한국산업은행", "중소기업은행", "한국수출은행", "NH농협은행", "수협은행", "대구은행", "부산은행", "경남은행", "광주은행", "전북은행", "제주은행"];
    const handleButton = () => {
        if ((career.length !== 0)  && (sanitaryImage !== "")&&(bank !== "")&&(account !== "")&&(accountHolder !== "")){
            submit();
        }
        else setIsModalOpen(true);
    }
    const onChangeAccount = useCallback((e) => {
        setAccount(e.target.value);
    }, []);
    const onChangeAccountHolder = useCallback((e) => {
        setAccountHolder(e.target.value);
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const certificate = await ImageUploader(sanitaryImage, userId);
<<<<<<< HEAD
        axios.put("/api/v1/chefProfile", {
            userId: userId,
            career: career,
            certificatePhoto: certificate,
            accountBank: bank,
            accountNum: account,
            accountHolder: accountHolder,
        }).then((res) => {
            navigate("/");
        }).catch((err) => console.error(err));
    };
    useEffect(() => { 
        const userId = sessionStorage.getItem("user_id");
        axios.get("/api/v1/chefProfile/user/" + userId)
            .then((res) => {
                setCareer(res.data.career?res.data.career:[]);
                setSanitaryImage(res.data.certificatePhoto);
                setBank(res.data.accountBank);
                setAccount(res.data.accountNum);
=======
        axios.put("/api/v1/profile", {
            userId: userId,
            career: career,
            certificate: certificate,
            bank: bank,
            account: account,
            accountHolder: accountHolder,
        }).then((res) => {
            setIsModalOpen2(true);
        }).catch((err) => console.error(err));
    };
    useEffect(() => { 
        const userId = sessionStorage.getItem("user_id")
        axios.get("/api/v1/profile/" + userId)
            .then((res) => {
                setCareer(res.data.career);
                setSanitaryImage(res.data.certificate);
                setBank(res.data.bank);
                setAccount(res.data.account);
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
                setAccountHolder(res.data.accountHolder);
            })
            .catch(() => {
                navigate("/error");
            })
    },[])
    const activeEnter = (e) => {
        if (e.key==="Enter"){
            const temp =[...career];
            setCareer(temp.concat(e.target.value));
            e.target.value="";
        }
    }
    return(
        <div className="margin"
             style={{display:"flex",
                 justifyContent:"space-around",
                 flexDirection:"column",}}>
            <header style={{textAlign: "center"}}><h3>1. 자기소개</h3></header>
            <h4 style={{marginBottom:"0"}} >경력</h4>
            <hr style={{height: "2px", backgroundColor: "black", width:"95vw"}}/>
            <h4>최근 경력을 최소 1개 입력해주세요.</h4>
            <input type="text" placeholder="안심하세요! 언제든지 프로필을 수정할 수 있어요."
<<<<<<< HEAD
=======
                    defaultValue={career}
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
                   style={{width: "94vw", height: "3vh"}}
                   onKeyDown={(e) => {activeEnter(e)}}
                    onChange={(e)=>{
                    setInputText(e.target.value);
            }}/>
            {career.map((item, index) => (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div key={index}
                         style={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             height: "3vh",
                             width: '45vw',
                             border: '2px solid lightgray',
                             backgroundColor: 'white',
                             borderRadius: '7px',
                             marginTop: '5px',
                             cursor: 'pointer'
                         }}
                    >
                        {item}
                    </div>
                    <button
                        style={{
                            position: 'absolute',
                            right: '47%',
                            bottom:"15%",
                            border: 'none',
                            backgroundColor: 'white',
                        }}
                        onClick={() => {
                            const newCareer = [...career];
                            newCareer.splice(index, 1);
                            setCareer(newCareer);
                        }}
                    >
                        x
                    </button>
                </div>
            ))}
            <h4 style={{marginBottom:"0"}} >보건증 사진</h4>
            <ImageInput setImg={setSanitaryImage} val={sanitaryImage}/>
            <div style={{margin:"0", padding:"0px 0px"}} >
                <h5 style={{margin:"0", padding:"0px 0px"}}>• 최근 1년내의 보건증을 등록해주세요.</h5>
                <h5 style={{margin:"0", padding:"0px 0px"}}>• 대관에 필요한 정보이오니, <span style={{color:"red",textDecoration:"underline",textDecorationColor:"red"}} >필히 등록해주세요!</span></h5>
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start", gap: "1.5rem" }} className="fontForRegister">
                <div style={{width:"100%"}} >
                <a className="fontForRegister" >계좌 정보를 입력해 주세요.<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                <hr style={{ height: "2px", backgroundColor: "black",width:"100%" }} />
                </div>
                <a>• 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</a>
                <div style={{ display: "flex" }} >
                    <div style={{ margin: "0.62rem" }}>
                        <p>은행명*</p>
                        <DropDown dataArr={bankDatas} onChange={setBank} defaultValue={bank}  val={bank} key={bank} />
                    </div>
                    <div style={{ margin: "0.62rem" }}>
                        <p>계좌번호*</p>
<<<<<<< HEAD
                        <input onChange={onChangeAccount} placeholder={"454102-01-376503"} value={account}
=======
                        <input onChange={onChangeAccount} placeholder={"454102-01-376503"} defaultValue={account} key={account}
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
                            style={{ width: "9.375rem", height: "1.875rem", flexShrink: "0" }}
                        />
                    </div>
                    <div style={{ margin: "0.62rem" }}>
                        <p>예금주*</p>
<<<<<<< HEAD
                        <input onChange={onChangeAccountHolder} value={accountHolder} placeholder={"홍길동"}
=======
                        <input onChange={onChangeAccountHolder} defaultValue={accountHolder} key={accountHolder} placeholder={"홍길동"}
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
                            style={{ width: "4.375rem", height: "1.875rem", flexShrink: "0" }}
                        />
                    </div>
                </div>
                <div style={{gap:"0px"}}>
                    <p>• 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>
                </div>
            <div style={{display: "flex"}}>
                <Link to="/">
                    <button style={{backgroundColor: "red"}} className="next_button" >이전</button>
                </Link>
                <button style={{backgroundColor: "grey"}} className="next_button"
                            onClick={handleButton}
                >다음</button>
                <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                    <p style={{fontSize: "16px"}}>필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                </Modal>

            </div>
            </div>
        </div>
    );
}
export default ChefInfoModifyPage;