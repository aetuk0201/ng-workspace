
export class DateTimeUtil {

    static getLocalDateTimeString() {
        const datePart = new Date().toISOString().slice(0, 10);
        const timePart = new Date().toLocaleTimeString();
        const dateTimeStamp = datePart + ' ' + timePart;
        return dateTimeStamp;
    }

}
