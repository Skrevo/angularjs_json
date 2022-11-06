// получение курса валют в таблицу в header
let currencyApp = angular.module('currencyApp', []);
currencyApp.controller('CurrencyCtrl', function ($scope, $http){
    $http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').success(function(data) {
        $scope.currency = data;
    });
});
// получение курса валют для конвертации
let curUSDtoUAH
let curEURtoUAH
let requestURL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
let request = new XMLHttpRequest()
request.open('GET',requestURL)
request.responseType = 'json';
request.send();
request.onload = function() {
   let curInfo = request.response;
    console.log(curInfo)
   curUSDtoUAH = curInfo[0].sale;
   curEURtoUAH =curInfo[1].sale;
}

// ожидание изменений выбора валюты или изменения суммы
let changeCur = document.getElementById("select1")
changeCur.addEventListener('click', function(){
    calc1()
})
let changeCur2 = document.getElementById("select2")
changeCur2.addEventListener('click', function(){
    calc1()
})
let changeSum = document.getElementById("in")
changeSum.addEventListener('input', function(){
    calc1()
})
let changeSum2 = document.getElementById("out")
changeSum2.addEventListener('input', function(){
    calc2()
})

// функции конвертации
let res
function calc1(sum ,cur) {
    sum = document.getElementById("in").value
    if (document.getElementById("select1").value === "USD") {
        if (document.getElementById("select2").value === "UAH")
            cur = curUSDtoUAH
        if (document.getElementById("select2").value === "EUR")
            cur = curUSDtoUAH/curEURtoUAH
        if (document.getElementById("select2").value === "USD")
            cur = 1
    }
    if (document.getElementById("select1").value === "EUR") {
        if (document.getElementById("select2").value === "UAH")
            cur = curEURtoUAH
        if (document.getElementById("select2").value === "EUR")
            cur = 1
        if (document.getElementById("select2").value === "USD")
            cur = curEURtoUAH/curUSDtoUAH
    }
    if (document.getElementById("select1").value === "UAH") {
        if (document.getElementById("select2").value === "UAH")
            cur = 1
        if (document.getElementById("select2").value === "EUR")
            cur = 1/curEURtoUAH
        if (document.getElementById("select2").value === "USD")
            cur = 1/curUSDtoUAH
    }
    res = cur * sum
    document.getElementById("out").value=res
}

function calc2(sum ,cur) {
    sum = document.getElementById("out").value
    if (document.getElementById("select2").value === "USD") {
        if (document.getElementById("select1").value === "UAH")
            cur = curUSDtoUAH
        if (document.getElementById("select1").value === "EUR")
            cur = curUSDtoUAH/curEURtoUAH
        if (document.getElementById("select1").value === "USD")
            cur = 1
    }
    if (document.getElementById("select2").value === "EUR") {
        if (document.getElementById("select1").value === "UAH")
            cur = curEURtoUAH
        if (document.getElementById("select1").value === "EUR")
            cur = 1
        if (document.getElementById("select1").value === "USD")
            cur = curEURtoUAH/curUSDtoUAH
    }
    if (document.getElementById("select2").value === "UAH") {
        if (document.getElementById("select1").value === "UAH")
            cur = 1
        if (document.getElementById("select1").value === "EUR")
            cur = 1/curEURtoUAH
        if (document.getElementById("select1").value === "USD")
            cur = 1/curUSDtoUAH
    }
    res = cur * sum
    document.getElementById("in").value=res
}