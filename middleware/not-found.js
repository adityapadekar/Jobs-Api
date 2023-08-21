const notFound = (req, res) => {
    res.status(404).json({msg:'Route Does Not Exist'})
}

module.exports = notFound
