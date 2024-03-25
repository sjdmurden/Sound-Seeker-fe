

function postAccessToken(req, res){
    fetchAccessToken().then(() => {
        res.status(200).send()
    })
}

module.exports = { postAccessToken }