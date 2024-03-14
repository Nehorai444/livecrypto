const search = (startDate, endDate, coinName) => {
    return new Promise((resolve, reject) => {
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ startDate, endDate, coinName })
        }
        fetch("/api/searchCoinData", requestInit)
            .then(res => {
                resolve(res.json())
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const ApiRequest = { search }