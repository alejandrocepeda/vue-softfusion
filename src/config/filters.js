const phone = {'format': phone => phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
const money = {'format': money => '$ ' + money.replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')}

export default {
  phone, money
}
