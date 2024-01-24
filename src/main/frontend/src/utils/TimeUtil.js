export const TimeUtil = {
    now: () => new Date().toJSON(),
<<<<<<< HEAD
    parse: (str) => new Date(str).toJSON(),
    setHour: (str, hour) => {
        const date = new Date(str);
        date.setHours(hour);
        return date.toJSON();
    },
    checkPast: (json) => {
        const from = new Date(json).getTime();
        const now = new Date().getTime();
        return now - from > 0;
    },
    checkToday: (json) => {
        const date = new Date().toJSON().split("T")[0]
        return date === json.split("T")[0];
    },
    getDiffSecond: (json) => {
        const from = new Date(json).getTime();
        const now = new Date().getTime();
        return Math.floor(Math.abs(now - from)/1000);
=======
    getDiffSecond: (json) => {
        const from = new Date(json).getTime();
        const now = new Date().getTime();
        return Math.floor((now - from)/1000);
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
    },
    getDiffStr: (json) => {
        const from = new Date(json).getTime();
        const now = new Date().getTime();
        const sec = Math.floor((now - from)/1000);
        if (sec < 10) return "방금전";
        else if (sec < 60) return sec+"초 전";
        else if (sec < 60*60) return Math.floor(sec / 60)+"분 전";
        else if (sec < 24*60*60) return Math.floor(sec / 60 / 60) + "시간 전";
        else return Math.floor(sec / 60 / 60 / 24) + "일 전";
    }
}