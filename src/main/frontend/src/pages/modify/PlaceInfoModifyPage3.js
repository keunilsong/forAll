import DropDown from "../../components/DropDown";
import { useCallback, useEffect, useState } from "react";
import "../../style/btnStyles.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import "../../components/Styles.css";
import axios from "axios";
import MultipleDatePicker from "react-multiple-datepicker";
import ForAllLogo from "../../components/ForAllLogo";
const PlaceInfoModifyPage3 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const navigate = useNavigate();
    const [dbData, setDbData] = useState({});

    const rentWeeksData = ["휴무없음", "매주", "격주(홀수주)", "격주(짝수주)", "매월 첫째주", "매월 둘째주", "매월 셋째주", "매월 넷째주", "매월 마지막주", "매월 말일", "직접지정"];
    const days = [...Array(31).keys()].map(i => (i + 1) + "일");
    const rentTimeFromData = [...Array(25).keys()].map(i => i + "시");
    const rentTimeToData = [...Array(25).keys()].map(i => i + "시");
    const parkAvaliableData = ["주차불가", "1대", "2대", "3대", "4대", "직접 입력"];
    const [miseenTimeFrom, setMiseenTimeFrom] = useState("");
    const [miseenTimeTo, setMiseenTimeTo] = useState("");
    const [rentWeek, setRentWeek] = useState(rentWeeksData[0]);
    const [rentDays, setRentDays] = useState([]);
    const [monDay, setMonDay] = useState(false);
    const [tuesDay, setTuesDay] = useState(false);
    const [wednesDay, setWednesDay] = useState(false);
    const [thursDay, setThursDay] = useState(false);
    const [friDay, setFriDay] = useState(false);
    const [saturDay, setSaturDay] = useState(false);
    const [sunDay, setSunDay] = useState(false);
    const [rentTimeFrom, setRentTimeFrom] = useState("");
    const [rentTimeTo, setRentTimeTo] = useState("");
    const [parkAvaliable, setParkAvaliable] = useState("");
    const [exactPark, setExactPark] = useState();
    const [elevator, setElevator] = useState();
    const [table, setTable] = useState();
    const [seat, setSeat] = useState();
    const [price, setPrice] = useState();
    const [trial, setTrial] = useState();
    const [morningDelivery, setMorningDelivery] = useState();
    const [workIn, setWorkIn] = useState();
    const [miseen, setMiseen] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrial, setIsTrial] = useState(false);
    const [isMorningDelivery, setIsMorningDelivery] = useState(false);
    const [isWorkIn, setIsWorkIn] = useState(false);
    const [isMiseen, setIsMiseen] = useState(false);
    const [formattedPrice, setFormattedPrice] = useState();
    let isPublic = false;

    const onChangePark = useCallback((e) => {
        setExactPark(e.target.value);
    }, []);
    const onChangeTable = useCallback((e) => {
        setTable(e.target.value);
    }, []);
    const onChangeSeat = useCallback((e) => {
        setSeat(e.target.value);
    }, []);
    const onChangePrice = useCallback((e) => {
        setPrice(e.target.value);
    }, []);

    const toggleMonday = useCallback((e) => {
        setMonDay(!monDay);
    }, [monDay]);
    const toggleTuesDay = useCallback((e) => {
        setTuesDay(!tuesDay);
    }, [tuesDay]);
    const toggleWednesDay = useCallback((e) => {
        setWednesDay(!wednesDay);
    }, [wednesDay]);
    const toggleThursDay = useCallback((e) => {
        setThursDay(!thursDay);
    }, [thursDay]);
    const toggleFriDay = useCallback((e) => {
        setFriDay(!friDay);
    }, [friDay]);
    const toggleSaturDay = useCallback((e) => {
        setSaturDay(!saturDay);
    }, [saturDay]);
    const toggleSunDay = useCallback((e) => {
        setSunDay(!sunDay);
    }, [sunDay]);
    const DownloadData = async () => {
        let spaceid;
        await axios.get("/api/v1/space/userSpace/" + sessionStorage.getItem("user_id"))
            .then((res) => spaceid = res.data[0])
            .catch((err) => console.error(err));
        axios
            .get("/api/v1/space/" + spaceid)
            .then((res) => {
                console.log(res.data);
                setDbData(res.data);
                setElevator(res.data.haveElevator)
                setTrial(res.data.ableTrial)
                setMorningDelivery(res.data.ableEarlyDeliver)
                setWorkIn(res.data.ableWorkIn)
                setMiseen(res.data.ableMiseen)
                setRentWeek(res.data.ableDate.split(" ")[0])

                setMiseenTimeFrom(res.data.ableMiseenStartTime ? res.data.ableMiseenStartTime + "시" : "0시")
                setMiseenTimeTo(res.data.ableMiseenFinTime ? res.data.ableMiseenFinTime + "시" : "0시")

                setRentTimeFrom(res.data.ableStartHour ? res.data.ableStartHour + "시" : "0시")
                setRentTimeTo(res.data.ableFinHour ? res.data.ableFinHour + "시" : "0시")
                setParkAvaliable(parkAvaliableData.includes(res.data.ableParking) ? res.data.ableParking : "직접 입력")
                setTable(res.data.tableNum)
                setSeat(res.data.seatNum)
                setPrice(res.data.priceSet)
                setExactPark(res.data.ableParking.split("대")[0])
                // 아래 부분은 수정 필요함, 대관 날짜를 직접 지정하면 오류 난다
                setRentDays(res.data.ableDate.split(" ")[1].split(","))
                setMonDay(res.data.ableDate.split(" ")[1].split(",").includes("월"))
                setTuesDay(res.data.ableDate.split(" ")[1].split(",").includes("화"))
                setWednesDay(res.data.ableDate.split(" ")[1].split(",").includes("수"))
                setThursDay(res.data.ableDate.split(" ")[1].split(",").includes("목"))
                setFriDay(res.data.ableDate.split(" ")[1].split(",").includes("금"))
                setSaturDay(res.data.ableDate.split(" ")[1].split(",").includes("토"))
                setSunDay(res.data.ableDate.split(" ")[1].split(",").includes("일"))
            }).catch((err) => console.error(err))
    };
    useEffect(() => {
        DownloadData();
    }, []);
    const handleButton = () => {
        if ((rentWeek !== "") && (rentTimeFrom !== "") && (rentTimeTo !== "")
            && (parkAvaliable !== "") && (elevator !== undefined) && (table !== undefined)
            && (seat !== undefined) && (price !== undefined) && (trial !== undefined) && (morningDelivery !== undefined)
            && (workIn !== undefined) && (miseen !== undefined)) {
            isPublic = true;
            submit();
        }
        else setIsModalOpen(true);
    }
    const submit = () => {
        const rentDayString = [];
        if (monDay) rentDayString.push("월");
        if (tuesDay) rentDayString.push("화");
        if (wednesDay) rentDayString.push("수");
        if (thursDay) rentDayString.push("목");
        if (friDay) rentDayString.push("금");
        if (saturDay) rentDayString.push("토");
        if (sunDay) rentDayString.push("일");

        const rentDaysdata = rentDays.map((day) => day.toString().split(" ").slice(0, 4).join(" ")).join(",");
        const rentData = rentWeek !== "직접지정" ? rentWeek + " " + rentDayString.join(",") : rentDaysdata;
        const park = parkAvaliable === "직접 입력" ? exactPark + "대" : parkAvaliable;
        data.isPublic = data.isPublic && isPublic;
        navigate("/placeInfoModify4", {
            state: {
                ...data,
                rentWeek: rentData,
                rentTimeFrom: rentTimeFrom ? rentTimeFrom.split("시")[0] : "",
                rentTimeTo: rentTimeTo ? rentTimeTo.split("시")[0] : "",
                miseenTimeFrom: miseenTimeFrom ? miseenTimeFrom.split("시")[0] : "",
                miseenTimeTo: miseenTimeTo ? miseenTimeTo.split("시")[0] : "",
                parkAvaliable: park,
                elevator: elevator,
                table: table,
                seat: seat,
                price: price,
                trial: trial,
                morningDelivery: morningDelivery,
                workIn: workIn,
                miseen: miseen
            }
        });
    };
    useEffect(() => {
        let recommendedPrice = seat * 15000;
        let priceString = recommendedPrice.toString();
        let firstDigits = priceString.slice(0, -4);
        let randomFourDigits = Math.floor(1000 + Math.random() * 9000);
        let finalPrice = parseInt(firstDigits + randomFourDigits.toString());
        const formattedPrice = "₩" + finalPrice.toLocaleString();
        setFormattedPrice(formattedPrice);
    }, [seat]);
    return (
        <div className="fontForRegister"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: '1.5rem'
            }}>
            <header style={{ textAlign: "center" }}><h3>(2/4) 이용 안내</h3></header>
            <div style={{ padding: '1rem', width: '100%', boxSizing: 'border-box', gap: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <div>
                    <a>이용 정보를 입력해주세요.<span style={{ color: '#FF2929' }} >*</span></a>
                    <hr style={{ height: "1px", backgroundColor: "black", width: '100%' }} />
                </div>
                <ForAllLogo />
                <div>
                    <a>대관 가능일<span style={{ color: '#FF2929' }} >*</span></a>
                    <DropDown dataArr={rentWeeksData} onChange={setRentWeek} placeholder={"휴무없음"} defaultData={rentWeeksData.includes(rentWeek) ? rentWeek : "직접지정"} val={rentWeek} width='90vw' />
                    {rentWeek === "직접지정" ?
                        <MultipleDatePicker onSubmit={setRentDays} /> : (rentWeek !== "휴무없음" ?
                            <div style={{ display: 'flex' }} >
                                <div className={monDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleMonday}>월</div>
                                <div className={tuesDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleTuesDay}>화</div>
                                <div className={wednesDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleWednesDay}>수</div>
                                <div className={thursDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleThursDay}>목</div>
                                <div className={friDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleFriDay}>금</div>
                                <div className={saturDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleSaturDay}>토</div>
                                <div className={sunDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleSunDay}>일</div>
                            </div>
                            : null)}
                </div>

                <div>
                    <a>입•퇴실 시간<span style={{ color: '#FF2929' }} >*</span></a>
                    <div style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                    }}>
                        <span>대관 당일 </span>
                        <span style={{ marginLeft: '1rem' }}><DropDown dataArr={rentTimeFromData} onChange={setRentTimeFrom} placeholder={"00시"} defaultData={rentTimeFrom} val={rentTimeFrom} width='6.31444rem' /></span>
                        <span> 부터, 당일 </span>
                        <span style={{ marginLeft: '1rem' }}><DropDown dataArr={rentTimeToData} onChange={setRentTimeTo} placeholder={"24시"} defaultData={rentTimeTo} val={rentTimeTo} width='6.31444rem' /></span>

                        <span> 까지</span>
                    </div>
                </div>

                <div>
                    <a>주차 여부<span style={{ color: '#FF2929' }} >*</span></a>
                    <DropDown dataArr={parkAvaliableData} onChange={setParkAvaliable} placeholder={"주차 여부를 선택해 주세요"} defaultData={parkAvaliable} val={parkAvaliable} width='90vw' />
                    {parkAvaliable === "직접 입력" ? (
                        <div style={{ marginTop: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }} >
                                <input className="input" style={{ width: '10vw' }} onChange={onChangePark} value={exactPark} />
                                <a>대</a>
                            </div>
                            {exactPark < 5 ? <p>5 이상의 숫자만 입력하여 주세요.</p> : null}
                        </div>
                    ) : null}
                </div>
                <div>
                    <a>엘리베이터 여부<span style={{ color: '#FF2929' }} >*</span></a>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <div style={{
                            border: "1px solid lightgray",
                            borderRadius: "0",
                            width: "45vw",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }} className={(elevator) === true ? "btn_selected" : "btn_not_selected"} onClick={() => setElevator(true)}>있음
                        </div>

                        <div
                            style={{
                                border: "1px solid lightgray",
                                borderRadius: "0",
                                width: "45vw",
                                height: "1.875rem",
                                textAlign: "center",
                                fontFamily: "Noto Sans KR",
                            }}
                            className={(elevator) === false ? "btn_selected" : "btn_not_selected"} onClick={() => setElevator(false)}>없음
                        </div>
                    </div>
                </div>
                <div>
                    <a>테이블<span style={{ color: '#FF2929' }} >*</span></a>
                    <input className="input fontForRegister" style={{ width: "90vw", height: "3vh", float: "left" }} onChange={onChangeTable}
                        placeholder={"최대 테이블 수를 기준으로 입력해주세요"} defaultValue={dbData.tableNum} />
                </div>
                <div>
                    <a>좌석 수<span style={{ color: '#FF2929' }} >*</span></a>
                    <input className="input fontForRegister" style={{ width: "90vw", height: "3vh", float: "left" }} onChange={onChangeSeat}
                        placeholder={"최대 좌석수를 기준으로 입력해주세요"} defaultValue={dbData.seatNum} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }} >
                    <a>가격 설정<span style={{ color: '#FF2929' }} >*</span></a>
                    <div>
                        <input className="input fontForRegister" style={{ width: "90vw", height: "3vh", float: "left", marginRight: "2vw" }}
                            onChange={onChangePrice} placeholder={"포 올 권장기준에 참고하여 가격을 설정해주세요"} defaultValue={dbData.priceSet} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '0.875rem' }} >{(seat === undefined || seat === "") ? "포 올 권장가격 : ₩" : (seat <= 10) ? "포 올 권장가격 : ₩150,000원" : "포 올 권장가격 :" + formattedPrice + "원"}</h3 >
                    </div>
                </div>

                <div>
                    <a>가능 여부<span style={{ color: '#FF2929' }} >*</span></a>
                    <hr style={{ height: "1px", backgroundColor: "black" }} />
                </div>
                <div>
                    <a>트라이얼<span style={{ color: '#FF2929' }} >*</span></a>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <div style={{
                            border: "1px solid lightgray",
                            borderRadius: "0.5px",
                            width: "47vw",
                            height: "3vh",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                            className={(trial) === true ? "btn_selected" : 'btn_not_selected'} onClick={() => setTrial(true)}>가능
                        </div>
                        <div style={{
                            border: "1px solid lightgray",
                            borderRadius: "0.5px",
                            width: "47vw",
                            height: "3vh",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                            className={(trial) === false ? "btn_selected" : 'btn_not_selected'} onClick={() => setTrial(false)}>불가
                        </div>
                    </div>
                    <Modal isOpen={isTrial} style={ModalStyles} >
                        <header>트라이얼이란?</header>
                        <button onClick={() => setIsTrial(false)} >닫기</button>
                    </Modal>
                    <button onClick={() => setIsTrial(!isTrial)}
                        className="detail"
                    >• 트라이얼이란?</button>
                </div>
                <div>
                    <a>재료 새벽 배달<span style={{ color: '#FF2929' }} >*</span></a>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <div style={{
                            border: "1px solid lightgray",
                            borderRadius: "0.5px",
                            width: "47vw",
                            height: "3vh",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                            className={(morningDelivery) === true ? "btn_selected" : 'btn_not_selected'}
                            onClick={() => setMorningDelivery(true)}>가능
                        </div>
                        <div style={{
                            border: "1px solid lightgray",
                            borderRadius: "0.5px",
                            width: "47vw",
                            height: "3vh",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                            className={(morningDelivery) === false ? "btn_selected" : 'btn_not_selected'}
                            onClick={() => setMorningDelivery(false)}>불가
                        </div>
                    </div>
                    <Modal isOpen={isMorningDelivery} style={ModalStyles} >
                        <header>새벽배달이란?</header>
                        <button onClick={() => setIsMorningDelivery(false)} >닫기</button>
                    </Modal>
                    <button onClick={() => setIsMorningDelivery(!isMorningDelivery)}
                        className="detail"
                    >• 새벽배달이란?</button>
                </div>
                <div>
                    <a>미장<span style={{ color: '#FF2929' }} >*</span></a>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <div style={{
                            border: "1px solid lightgray",
                            borderRadius: "0.5px",
                            width: "47vw",
                            height: "3vh",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                            className={(miseen) === true ? "btn_selected" : 'btn_not_selected'} onClick={() => setMiseen(true)}>가능
                        </div>
                        <div style={{
                            border: "1px solid lightgray",
                            borderRadius: "0.5px",
                            width: "47vw",
                            height: "3vh",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                            className={(miseen) === false ? "btn_selected" : 'btn_not_selected'} onClick={() => setMiseen(false)}>불가
                        </div>
                    </div>
                    <div hidden={!miseen}>
                        <div style={{ display: "flex", justifyContent: 'left', alignItems: 'center' }}>
                            <span>대관전일</span>

                            <span style={{ marginLeft: '1rem' }}><DropDown dataArr={rentTimeFromData} onChange={setMiseenTimeFrom} defaultData={miseenTimeFrom} val={miseenTimeFrom} width="5.25rem" /></span>
                            <span> 부터, 당일 </span>
                            <span style={{ marginLeft: '1rem' }}><DropDown dataArr={rentTimeToData} onChange={setMiseenTimeTo} defaultData={miseenTimeTo} val={miseenTimeTo} width="5.25rem" /></span>

                            <span> 까지</span>
                        </div>
                    </div>
                    <Modal isOpen={isMiseen} style={ModalStyles} >
                        <header>미장이란?</header>
                        <button onClick={() => setIsMiseen(false)} >닫기</button>
                    </Modal>
                    <button onClick={() => setIsMiseen(!isMiseen)}
                        className="detail"
                    >• 미장이란?</button>
                </div>
                <div>
                    <a>워크인<span style={{ color: '#FF2929' }} >*</span></a>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <div style={{
                            border: "1px solid lightgray",
                            borderRadius: "0.5px",
                            width: "47vw",
                            height: "3vh",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                            className={(workIn) === true ? "btn_selected" : 'btn_not_selected'} onClick={() => setWorkIn(true)}>가능
                        </div>
                        <div style={{
                            border: "1px solid lightgray",
                            borderRadius: "0.5px",
                            width: "47vw",
                            height: "3vh",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                            className={(workIn) === false ? "btn_selected" : 'btn_not_selected'} onClick={() => setWorkIn(false)}>불가
                        </div>
                    </div>
                    <Modal isOpen={isWorkIn} style={ModalStyles} >
                        <header>워크인이란?</header>
                        <button onClick={() => setIsWorkIn(false)} >닫기</button>
                    </Modal>
                    <button onClick={() => setIsWorkIn(!isWorkIn)}
                        className="detail"
                    >• 워크인이란?</button>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100vw', margin: '0px', marginTop: '4rem' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => navigate(-1, data)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => handleButton()}
                >다음</button>
            </div>
            <Modal isOpen={isModalOpen} style={{ ...ModalStyles, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} ariaHideApp={false}>
                <div style={{ textAlign: "left" }} >
                    <p>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <p>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                </div>
                <hr style={{ height: "1px", backgroundColor: "lightgrey" }} />
                <div style={{ display: 'flex', width: '100%' }} >
                    <button style={{ flex: 1, border: 'none', background: 'white', }} onClick={() => setIsModalOpen(false)}>뒤로</button>
                    <button style={{ flex: 1, border: 'none', background: 'white', }} onClick={() => submit()}>다음</button>
                </div>
            </Modal>
        </div>
    )
};

export default PlaceInfoModifyPage3;