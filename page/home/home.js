const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const reportUrl = 'http://192.168.1.181/patient/patient_report';
const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    methods: {
        submit() {
            global.patient_pid = '1234567';
            remote.getGlobal('sharedObject').patient_pid = '1234567';
            ipc.send('main-message', { path: 'patientDetail' });
        },
    },
    mounted() {
        $('.password-input').focus();
    },
})