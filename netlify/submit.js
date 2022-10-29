exports.handler = async function (event, context) {
  var body = JSON.parse(event.body);
  console.log(body);
};
