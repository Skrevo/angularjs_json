let currencyApp = angular.module('currencyApp', []);
currencyApp.controller('CurrencyCtrl', function ($scope, $http){
    $http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').success(function(data) {
        $scope.currency = data;
    });
});
// ожидание изменений выбора валюты или суммы
let changeCur = document.getElementById("select1")
changeCur.addEventListener('click', function(){
    calc1()
})
let changeCur2 = document.getElementById("select2")
changeCur2.addEventListener('click', function(){
    calc2()
})
let changeSum = document.getElementById("in")
changeSum.addEventListener('input', function(){
    calc1()
})
let changeSum2 = document.getElementById("out")
changeSum2.addEventListener('input', function(){
    calc2()
})

let res
function calc1(sum ,cur) {
    sum = document.getElementById("in").value
    if (document.getElementById("select1").value === "USD") {
        if (document.getElementById("select2").value === "UAH")
            cur = 37.45318
        if (document.getElementById("select2").value === "EUR")
            cur = 1.07
        if (document.getElementById("select2").value === "USD")
            cur = 1
    }
    if (document.getElementById("select1").value === "EUR") {
        if (document.getElementById("select2").value === "UAH")
            cur = 38.45318
        if (document.getElementById("select2").value === "EUR")
            cur = 1
        if (document.getElementById("select2").value === "USD")
            cur = 0.93
    }
    if (document.getElementById("select1").value === "UAH") {
        if (document.getElementById("select2").value === "UAH")
            cur = 1
        if (document.getElementById("select2").value === "EUR")
            cur = 0.376
        if (document.getElementById("select2").value === "USD")
            cur = 0.386
    }
    res = cur * sum
    document.getElementById("out").value=res
}

function calc2(sum ,cur) {
    sum = document.getElementById("out").value
    if (document.getElementById("select2").value === "USD") {
        if (document.getElementById("select1").value === "UAH")
            cur = 37.45318
        if (document.getElementById("select1").value === "EUR")
            cur = 1.07
        if (document.getElementById("select1").value === "USD")
            cur = 1
    }
    if (document.getElementById("select2").value === "EUR") {
        if (document.getElementById("select1").value === "UAH")
            cur = 38.45318
        if (document.getElementById("select1").value === "EUR")
            cur = 1
        if (document.getElementById("select1").value === "USD")
            cur = 0.93
    }
    if (document.getElementById("select2").value === "UAH") {
        if (document.getElementById("select1").value === "UAH")
            cur = 1
        if (document.getElementById("select1").value === "EUR")
            cur = 0.376
        if (document.getElementById("select1").value === "USD")
            cur = 0.386
    }
    res = cur * sum
    document.getElementById("in").value=res
}