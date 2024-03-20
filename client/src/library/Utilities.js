const search = (startDate, endDate, coinName) => {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:8000/api/searchCoinData';
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ startDate, endDate, coinName })
        }
        fetch(url, requestInit)
            .then(res => {
                resolve(res.json())
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const ApiRequest = { search }