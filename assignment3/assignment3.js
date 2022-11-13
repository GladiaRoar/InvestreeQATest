// input : [3,2,5,1,8,9,6]
// output : [1,3,5,9,2,8,6]

const input = [3,2,5,1,8,9,6];
let result = []
let even = []

input.sort((a,b) => a - b)
for(let i = 0; i < input.length; i++) {
    if(input[i] % 2 == 1) {
        result.push(input[i])
    } else {
        even.push(input[i])
    }
}
for(let i = 0; i < even.length; i++){
    result.push(even[i])
}
console.log(result)