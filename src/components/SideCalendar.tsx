import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './SideCalendar.css';
import { useState } from "react";
import { useAppDispatch } from '../hooks';
import { setIsDateClicked } from "../store/clickSlice";
import { saveDayNum, saveLocaleDate } from "../store/dateSlice";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function SideCalendar() {
    const [today, setToday] = useState<Value>(new Date());
    const dispatch = useAppDispatch();

    function clickDate(day: Date){
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