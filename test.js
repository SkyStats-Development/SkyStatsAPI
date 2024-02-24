const { default: axios } = require("axios");

const response = axios.get("https://api.skystats.lol/partyfinder/uhlaskis?key=73d628c622231d1603013f90a8dc198e8eeddc1901d4bab74b5e46b0470417a71aad66da42ef1e3276f1e1c3c95f71c67d46e37fa347626d18c0731734c729ee")

console.log(response.data)