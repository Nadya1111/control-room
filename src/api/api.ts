import {ApplicationForm} from "../model/model";
import axios from "../common/axios"
export  class Api {
    static sendApplication(data: ApplicationForm): Promise<any> {
       return axios.post("/sentApplication", data )
    }
}