import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import { useAppDispatch } from '../hooks';
// import { saveFullDateNum } from "../store/dateSlice";
import { setIsDateClicked } from "../store/clickSlice";
import { saveDayNum, saveLocaleDate } from "../store/dateSlice";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function SideCalendar() {
    const [today, setToday] = useState<Value>(new Date());
    const dispatch = useAppDispatch();

    function clickDate(day: Date){
        // dispatch(saveFullDateNum({day: day.getDay(), month: day.getMonth()+1, date: day.getDate()}))
        dispatch(saveDayNum(day.getDay()));
        dispatch(saveLocaleDate(day.toLocaleDateString()));
        dispatch(setIsDateClicked(true));
    }
    return (
        <div>
            <Calendar locale="ko" value={today} onClickDay={(day)=>{clickDate(day)}}/>
        </div>
    )
}