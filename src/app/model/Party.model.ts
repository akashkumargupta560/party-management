export class Party {
    public fullName: string;
    public id: string;
    public address: string;
    public mobileNo: string;
    public date: string;
    public time: string;
    
    constructor(fullName: string, id: string, address: string, mobileNo: string, date: string, time: string) {
        this.fullName = fullName;
        this.id = id;
        this.address = address;
        this.mobileNo = mobileNo;
        this.date = date;
        this.time = time;
    }
}