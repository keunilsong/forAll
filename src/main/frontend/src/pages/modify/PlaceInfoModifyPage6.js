import React, { useCallback, useEffect, useState } from "react";
import DropDown from "../../components/DropDown";
import Modal from "react-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageInput from "../../components/ImageInput";
import "../../components/Styles.css";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";
import Alert from "../../components/Alert";
import { ModalStyles } from "../../components/ModalStyles";
import ForAllLogo from "../../components/ForAllLogo";
import ImageViewer from "../../components/ImageViewer";
import {SmallModalStyles} from "../../components/SmallModalStyles";
const PlaceInfoModifyPage6 = () => {
    const location = useLocation();
    const data = { ...location.state };
    console.log(data);
    const navigate = useNavigate();

    let isPublic = false;
    const emailDatas = ["직접입력", "naver.com", "choi.com", "dreamwiz.com", "empal.com", "gmail.com", "hanafos.com", "hanmail.net", "hanmir.com", "hitel.net", "hotmail.com", "korea.com", "lycos.co.kr", "nate.com"];

    const [tradeName, setTradeName] = useState(data.companyName);
    const [representative, setRepresentative] = useState(data.ceoName);
    const [registNum, setRegistNum] = useState(data.businessNum);
    const [license, setLicense] = useState(data.businessImage);
    const [address, setAddress] = useState(data.businessAddress);
    const [exactAddress, setExactAddress] = useState("");
    const [phone1, setPhone1] = useState(data.payPhoneNum.slice(0, 3));
    const [phone2, setPhone2] = useState(data.payPhoneNum.slice(3, 7));
    const [phone3, setPhone3] = useState(data.payPhoneNum.slice(7, 11));
    const bankDatas = ["한국은행", "KB국민은행", "신한은행", "우리은행", "하나은행", "SC제일은행", "한국씨티은행", "케이뱅크", "카카오뱅크", "토스뱅크", "한국산업은행", "중소기업은행", "한국수출은행", "NH농협은행", "수협은행", "대구은행", "부산은행", "경남은행", "광주은행", "전북은행", "제주은행"];
    const [bank, setBank] = useState(data.bankName ? data.bankName : bankDatas[0]);
    const [account, setAccount] = useState(data.accountNum);
    const [accountHolder, setAccountHolder] = useState(data.accountHolder);
    const [isAgree, setIsAgree] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isPhoneOpen, setIsPhoneOpen]=useState(false);


    const [pending, setPending] = useState(false);
    const businessNum = data.businessNum;

    const onChangePhone1 = useCallback((e) => {
        if (e.target.value.length <= 3) {
            const reg = /^[0-9]*$/;
            if (reg.test(e.target.value)) {
                setPhone1(e.target.value);
            }
        };
    }, []);
    const onChangePhone2 = useCallback((e) => {
        if (e.target.value.length <= 4) {
            const reg = /^[0-9]*$/;
            if (reg.test(e.target.value)) {
                setPhone2(e.target.value);
            }
        };
    }, []);
    const onChangePhone3 = useCallback((e) => {
        if (e.target.value.length <= 4) {
            const reg = /^[0-9]*$/;
            if (reg.test(e.target.value)) {
                setPhone3(e.target.value);
            }
        };
    }, []);
    const onChangeAccount = useCallback((e) => {
        const reg = /^[0-9]*$/;
        if (reg.test(e.target.value)){
            let value = e.target.value;

            if (isNaN(value) || value.length > 14) {
                value = value.slice(0, -1);
            }
            // 입력값을 갱신합니다.
            e.target.value = value;
        setAccount(e.target.value);}
    }, []);
    const onChangeAccountHolder = useCallback((e) => {
        setAccountHolder(e.target.value);
    }, []);
    const regPhone1 = /^01[016789]$/;
    const regPhone2 = /^\d{3,4}$/;
    const regPhone3 = /^\d{4}$/;

    const handleButton = () => {
        if (isAgree === false) setIsAlertOpen(true);
        else if ((regPhone1.test(phone1)) && (regPhone2.test(phone2)) && (regPhone3.test(phone3)) && (account !== "") && (accountHolder)) {
            isPublic = true;
            submit();
        }else if (!(regPhone1.test(phone1)) || !(regPhone2.test(phone2)) || !(regPhone3.test(phone3))){
            setIsPhoneOpen(true);
        }
        else setIsModalOpen(true);
    };


    const submit = async () => {
        if(pending) return;
        setPending(true);
        const userId = sessionStorage.getItem("user_id");

        const closeImage = data.closeImage ? await Promise.all(data.closeImage.map(async(img) => await ImageUploader(img, userId))) : null;
        const businessImage = await ImageUploader(license, userId);
        const businessAddress = address + exactAddress;
        const payPhoneNum = phone1 + phone2 + phone3;

        await axios.put("/api/v1/space", {
            id: data.id,
            userId: userId,
            name: data.placeName,
            spaceBrief: data.placeIntro,
            spaceIntro: data.placeIntroDetail,
            kitchenFeat: data.kitchen,
            address: data.address,
            addressBrief: data.placeInfo,
            website: data.website,
            mainImage: data.imgRepresent,
            hallImage: data.hallImage,
            kitImage: data.kitImage,
            menu: data.menu,
            ableDate: data.rentWeek,
            ableStartHour: data.rentTimeFrom,
            ableFinHour: data.rentTimeTo,
            ableMiseenStartTime: data.ableMiseenStartTime,
            ableMiseenFinTime: data.ableMiseenFinTime,
            floorNum: data.floor,
            ableParking: data.ableParking,
            haveElevator: data.elevator,
            tableNum: data.table,
            seatNum: data.seat,
            priceSet: data.price,
            ableTrial: data.trial,
            ableEarlyDeliver: data.morningDelivery,
            ableWorkIn: data.workIn,
            ableMiseen: data.miseen,
            fireholeNum: data.firePit,
            capacity: data.capacity,
            equip: data.equip,
            equipExtra: data.extraMachine,
            plateImage: data.plateImage,
            plateNum: data.countSidePlate,
            cupImage: data.cupImage,
            cupNum: data.countCup,
            cutleryImage: data.cutleryImage,
            cutleryNum: data.countCuttrary,
            companyName: tradeName,
            ceoName: representative,
            businessNum: registNum,
            businessImage: businessImage,
            businessAddress: businessAddress,
            payPhoneNum: payPhoneNum,
            bankName: bank,
            accountNum: account,
            accountHolder: accountHolder,
            isPublic: data.isPublic && isPublic,
            closeGuide: data.closeGuide,
            closeImage: closeImage
        })
            .then((res) => {
                setPending(false);
                setModalOpen1(true);
            })
            .catch((err) => console.error(err));

    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ForAllLogo />
            <p style={{ textAlign: 'center' }}>(4/4) 예약 및 정산 정보</p>
            <div >
                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start", gap: "1.5rem" }} className="fontForRegister" >
                    <div style={{ width: "100%", marginBottom: "-1rem"}} >
                        <a>정산 정보를 입력해 주세요<span style={{ color: "#FF2929" }} >*</span></a>
                        <hr style={{ height: "2px", backgroundColor: "black", width: "100%" }} />
                    </div>
                    <div style={{ marginBottom:"-1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }} >
                            <p>상호(개인/법인)<span style={{ color: "#FF2929" }} >*</span></p>
                            <p>{tradeName.length}자/28자</p>
                        </div>
                        <input value={tradeName} defaultValue={data.companyName} disabled={true} className="input" style={{ width: '92vw'}}/>
                    </div>
                    <div style={{ marginBottom:"-1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>대표자명<span style={{ color: "#FF2929" }} >*</span></p>
                            <p>{representative.length}자/10자</p>
                        </div>
                        <input value={representative} defaultValue={data.ceoName} disabled={true} className="input" style={{ width: '92vw'}}/>
                    </div>
                    <div style={{ marginBottom:"-1rem" }}>
                        <p>사업자 등록번호<span style={{ color: "#FF2929" }} >*</span></p>
                        <input defaultValue={businessNum} disabled={true} className="input" style={{ width: '92vw'}}/>
                        <div style={{ padding: "0px 0px", display: "inline-block" }} >
                            <div style={{ padding: "0px 0px", display: "flex", flexDirection: 'column' }} >
                                <a style={{ color: "red" }} >• 사업자 등록번호는 필수 입력입니다.</a>
                                <a>• 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</a>
                                <a>• 추후, 사업자 정보가 수정된다면 반드시 온라인 상담을 통해 변경 내용을 알려주셔야 합니다.</a>

                            </div>
                        </div>
                    </div>
                    <div style={{ height: "9rem" , marginBottom:'-1rem'}} >
                        <p>사업자 등록증 첨부<span style={{ color: "#FF2929" }} >*</span></p>
                        <ImageViewer val={license} />
                    </div>
                    <div style={{ marginBottom:"-1rem" }}>
                        <a>사업장 주소<span style={{ color: "#FF2929" }} >*</span></a>
                        <input defaultValue={address} disabled={true} className="input" style={{ width: '92vw'}}/>
                    </div>
                    <div>
                        <p>정산용 연락처<span style={{ color: "#FF2929" }} >*</span></p>
                        <div style={{ display: "flex", alignItems: 'center',justifyContent:'space-between' }} >
                            <input value={phone1} defaultValue={phone1} onChange={onChangePhone1} className="input" style={{ width: "30%" }} />-
                            <input value={phone2} defaultValue={phone2} onChange={onChangePhone2} className="input" style={{ width: "30%" }} />-
                            <input value={phone3} defaultValue={phone3} onChange={onChangePhone3} className="input" style={{ width: "30%" }} />
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start", gap: "1.5rem" }} className="fontForRegister">
                    <div style={{ width: "100%" }} >
                        <a className="fontForRegister" >계좌 정보를 입력해 주세요.<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                        <hr style={{ height: "2px", backgroundColor: "black", width: "100%" }} />
                        <a style={{ fontSize: '0.4375rem' }}>• 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</a>
                    </div>
                    <div>
                        <div style={{ display: "flex" }} >
                            <div style={{display:'flex',flexDirection:'column'}} >
                                <a>은행명<span style={{ color: "#FF2929" }} >*</span></a>
                                <DropDown dataArr={bankDatas} onChange={setBank} defaultData={bank} val={bank} width='100%' />
                            </div>
                            <div style={{display:'flex',flexDirection:'column', marginLeft: '0.63rem'}}>
                                <a>계좌번호<span style={{ color: "#FF2929" }} >*</span></a>
                                <input onChange={onChangeAccount} placeholder={"예: 45410201376503"} defaultValue={account} className="input"
                                    style={{ width: '100%', height: "1.875rem", flexShrink: "0" }}
                                />
                            </div>
                            <div style={{display:'flex',flexDirection:'column', marginLeft: '0.63rem'}}>
                                <a>예금주<span style={{ color: "#FF2929" }} >*</span></a>
                                <input onChange={onChangeAccountHolder} defaultValue={accountHolder} className="input"
                                    style={{ width: '97%', }}
                                />
                            </div>
                        </div>
                        <div style={{ fontSize: '0.4375rem', display: 'flex', flexDirection: 'column' }}>
                            <a>- 정확한 정보를 입력했는지 다시 한번 확인해 주세요.</a>
                            <a>- 정산 금액 입금 시, 입금자명은 "포 올"로 확인할 수 있습니다.</a>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start" }} className="fontForRegister">
                    <p>환불 기준을 동의해 주세요<span style={{ color: "#FF2929" }} >*</span></p>
                    <hr style={{ height: "2px", backgroundColor: "black", width: "100%", marginTop: '0' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <a>• 셰프 환불 기준은 아래와 같이 구분됩니다.</a>
                        <a>• 1) 대관 14일 전:100% 환불</a>
                        <a>• 2) 대관 13일 전~9일 전:80% 환불</a>
                        <a>• 3) 대관 8일 전~5일 전:50% 환불</a>
                        <a>• 4) 대관 4일 전~당일:환불 불가</a>
                    </div>
                    <hr style={{ height: "2px", backgroundColor: "black", width: "100%" }} />
                </div>
                <input type="checkbox" id="agree" checked={isAgree} onChange={() => setIsAgree(!isAgree)} />
                <label for='agree' style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center' }}>
                    <em></em><a>동의합니다</a>
                </label>

            </div>
            <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem', bottom: '0'}}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => navigate(-1, data)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => handleButton()}
                >다음</button>
            </div>
            <Modal isOpen={isModalOpen} ariaHideApp={false} style={SmallModalStyles}>
                <div style={{
                    justifyContent: "center", alignItems: "center",
                    fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "1.25rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",

                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                }}>
                    <a style={{fontSize: '0.9375rem'}}>현재 필수 입력사항이 모두 기입되지 않았습니다.</a>
                    <p style={{fontSize: '0.9375rem'}}>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    margin: '0px',
                    marginTop: '4rem',
                    bottom: '0',
                    position: 'fixed',
                    fontSize: "0.9375rem",
                    fontWeight: "400"
                }}>
                    <button style={{
                        backgroundColor: "#FF4F4F",

                        width: '50%',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => setIsModalOpen(false)}
                    >
                        마저 입력하기
                    </button>
                    <button style={{
                        backgroundColor: "#000",

                        width: '50%',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => submit()}
                    >
                        넘어가기
                    </button>
                </div>
            </Modal>
            <Modal isOpen={isPhoneOpen} ariaHideApp={false} style={SmallModalStyles}>
                <div style={{
                    justifyContent: "center", alignItems: "center",
                    fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "1.25rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",

                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                }}>
                    <a style={{fontSize: '0.9375rem'}}>유효한 연락처를 입력하지 않았습니다.</a>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    margin: '0px',
                    marginTop: '4rem',
                    bottom: '0',
                    position: 'fixed',
                    fontSize: "0.9375rem",
                    fontWeight: "400"
                }}>
                    <button style={{
                        backgroundColor: "#FF4F4F",

                        width: '100%',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => setIsPhoneOpen(false)}
                    >
                        마저 입력하기
                    </button>
                </div>
            </Modal>
            <Modal isOpen={modalOpen1} style={ModalStyles} ariaHideApp={false}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path
                        d="M22.0832 28.7503L17.5519 24.2191C17.17 23.8371 16.7012 23.6462 16.1457 23.6462C15.5901 23.6462 15.104 23.8545 14.6873 24.2712C14.3054 24.6531 14.1144 25.1392 14.1144 25.7295C14.1144 26.3198 14.3054 26.8059 14.6873 27.1878L20.6248 33.1253C21.0068 33.5073 21.4929 33.6982 22.0832 33.6982C22.6735 33.6982 23.1596 33.5073 23.5415 33.1253L35.3644 21.3024C35.7464 20.9205 35.9373 20.4517 35.9373 19.8962C35.9373 19.3406 35.729 18.8545 35.3123 18.4378C34.9304 18.0559 34.4443 17.8649 33.854 17.8649C33.2637 17.8649 32.7776 18.0559 32.3957 18.4378L22.0832 28.7503ZM24.9998 45.8337C22.1179 45.8337 19.4096 45.2864 16.8748 44.192C14.3401 43.0989 12.1353 41.6149 10.2603 39.7399C8.38525 37.8649 6.90123 35.66 5.80817 33.1253C4.71373 30.5906 4.1665 27.8823 4.1665 25.0003C4.1665 22.1184 4.71373 19.41 5.80817 16.8753C6.90123 14.3406 8.38525 12.1357 10.2603 10.2607C12.1353 8.38574 14.3401 6.90102 16.8748 5.80658C19.4096 4.71352 22.1179 4.16699 24.9998 4.16699C27.8818 4.16699 30.5901 4.71352 33.1248 5.80658C35.6596 6.90102 37.8644 8.38574 39.7394 10.2607C41.6144 12.1357 43.0984 14.3406 44.1915 16.8753C45.2859 19.41 45.8332 22.1184 45.8332 25.0003C45.8332 27.8823 45.2859 30.5906 44.1915 33.1253C43.0984 35.66 41.6144 37.8649 39.7394 39.7399C37.8644 41.6149 35.6596 43.0989 33.1248 44.192C30.5901 45.2864 27.8818 45.8337 24.9998 45.8337Z"
                        fill="black" />
                </svg>
                <p style={{
                    color: "#000", fontFamily: "Noto Sans KR", fontSize: "0.9375rem",
                    fontStyle: "normal", fontWeight: "400", lineHeight: "normal"

                }}>공간정보가 수정되었습니다!</p>

                <hr />
                <button  style={{width:'100%',height:'3.125rem',backgroundColor:'white',border:'none'}} onClick={() => navigate("/")}>확인</button>
            </Modal>
            <Modal isOpen={pending} ariaHideApp={false} style={SmallModalStyles}>
                <div style={{
                    justifyContent: "center", alignItems: "center",
                    fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "1.25rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",

                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                }}>
                    <a style={{fontSize: '0.9375rem'}}>현재 입력사항을 업로드 중입니다.</a>
                    <p style={{fontSize: '0.9375rem'}}>잠시만 기다려주세요.</p>
                </div>
            </Modal>
            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={"환불 기준에 동의해 주세요"} />
        </div>


    )
};
export default PlaceInfoModifyPage6;