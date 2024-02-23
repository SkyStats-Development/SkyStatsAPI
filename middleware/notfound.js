//CREDIT: https://github.com/Senither/hypixel-skyblock-facade
module.exports = (_, response) => {
  return response.status(404).json({
    status: 404,
    reason: 'Route not found... uhhh??? why are u here you coded this didnt you? 👀👀👀 or are you a dirty little skidder like me - credits to skyhelper api for this',
  })
}