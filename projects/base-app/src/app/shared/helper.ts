import { Buffer as buffer } from "buffer";

export class Helper {
     
    public static getLocalDateTimeString = () => {

        const datePart = new Date().toISOString().slice(0, 10);
        const timePart = new Date().toLocaleTimeString();
        const dateTimeStamp = datePart + ' ' + timePart;

        return dateTimeStamp;
    }

    public static convertImageToBase64 = async (file: File) : Promise<string | ArrayBuffer> => {

        return await new Promise((resolve, reject) => {

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result.toString().replace(/^data:image\/[a-z]+;base64,/, ""));
                } else {
                    reject(new Error("Failed to read file."));
                }
            };
            reader.onerror = error => reject(error);
                
        });

    }

    public static encodeBase64String = (strBase64: string) => { 
        return buffer.from(strBase64); //.toString('base64');
        //return strBase64.replace(/^data:image\/[a-z]+;base64,/, "");
        //return btoa(strBase64);
    }

    public static decodeBase64String = (strBase64: string) => { 
        return buffer.from(strBase64, 'base64').toString('ascii');
        //return atob(strBase64);
    }
}
