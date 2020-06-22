import request from './request.js'
export const getLocation = () => {
    let myCity = new window.BMap.LocalCity()
    let city = JSON.parse(localStorage.getItem('my-city'))
    if (!city) {
        return new Promise( (resolve, reject) => {
            myCity.get( async result => {
                let cityName = result.name
                let { data } = await request({
                    method: 'GET',
                    url: '/area/info',
                    params: {
                        name: cityName
                    }
                })
                localStorage.setItem('my-city', JSON.stringify(data.body))
                resolve(data.body)
              })
        })
    } else {
        return Promise.resolve(city)
    }
  }