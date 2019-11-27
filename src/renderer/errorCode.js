
const patientReport2Error = (error) => {
    let data = error;
    switch (error) {
        case 'report not exist':
            data = '未找到报道信息！'
            break;
        case 'patient not exist':
            data = '患者编号输入错误！'
            break;
        case 'add report error':
            data = '增加报到错误'
            break;
        case 'delete report error':
            data = '删除报到错误'
            break;
        case 'edit report error':
            data = '编辑报到错误'
            break;
        case 'report already exist':
            data = '您已经报到过了！'
            break;
        case 'patient already reported':
            data = '您已经报到过了！'
            break;
        case 'not report time yet':
            data = '未到报到时间'
            break;

        default:
            break;
    }
    return data;
}
export default {
    patientReport2Error
}