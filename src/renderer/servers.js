import axios from '@/axios/index.js';

const api_patient_report = "/service/go/post/patient_report";

const patientReport = (data) => axios.axiosPost(api_patient_report, data);

export default {
    patientReport
  }