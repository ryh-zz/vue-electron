import axios from '@/axios/index.js';

const api_patient_report2 = "/service/go/post/patient_report2";

const patientReport2 = (data) => axios.axiosPost(api_patient_report2, data);

export default {
  patientReport2
}