const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const reportUrl = 'http://192.168.1.181/patient/patient_report';
const patientDetailUrl = 'http://192.168.1.181/patient/get_patient_info';
const app = new Vue({
    el: '#app',
    data: {
        succeed: false,
        patient_pid: '',
        patient: {}

    },
    methods: {
        submit() {
            const data = JSON.stringify({ 'patient_pid': this.patient_pid });
            $.post(reportUrl, data, (res) => {
                this.succeed = true;
                const timeOut = setTimeout(() => {
                    ipc.send('main-message', { path: 'home' });
                    clearTimeout(timeOut);
                }, 2000);
            })
        },

        patientDetail() {
            if (this.patient_pid !== '') {
                $.get(patientDetailUrl, { patient_pid: this.patient_pid }, (res) => {
                    this.patient = res;
                })
            }
        },

        returnHome() {
            ipc.send('main-message', { path: 'home' });
        }
    },
    mounted() {
        this.patient_pid = remote.getGlobal('sharedObject').patient_pid;
        this.patientDetail();
    },
})