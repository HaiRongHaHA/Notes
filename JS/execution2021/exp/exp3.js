var a = 1
function one() {
  var b = 2
  function two() {
    console.log(a, b)
  }
  return two
}
let two = one()
two()