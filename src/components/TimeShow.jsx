import {parseISO,formatDistanceToNow} from 'date-fns-jalali';
const TimeShow=({timestamp})=>{
    const timeAgo=''
    const time = parseISO(timestamp);
    const date= formatDistanceToNow(time)
    return(
        <span>{`${date} قبل`}</span>
    )
}
export default TimeShow;