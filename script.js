// получение курса валют в таблицу в header
let currencyApp = angular.module('currencyApp', []);
currencyApp.controller('CurrencyCtrl', function ($scope, $http){
    $http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').success(function(data) {
        $scope.currency = data;
    });
});

// Получение значений полей
let setCur = document.getElementById("select1")
let setCur2 = document.getElementById("select2")
let input1 = document.getElementById("in")
let input2 = document.getElementById("out")

// ожидание изменений выбора валюты или изменения суммы
setCur.addEventListener('click', function(){
    calc1()
})
setCur2.addEventListener('click', function(){
    calc1()
})
input1.addEventListener('input', function(){
    calc1()
})
input2.addEventListener('input', function(){
    calc2()
})

// подключение к API
let requestURL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
let request = new XMLHttpRequest()

// функции конвертации
let res
function calc1(sum,cur) {
    sum = input1.value
    if (setCur2.value === setCur.value)
        cur = 1
    request.open('GET',requestURL)
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        let curInfo = request.response;
        for (let c in curInfo) {
            if (setCur.value === curInfo[c].ccy && setCur2.value === curInfo[c].base_ccy)
                cur = curInfo[c].sale
            if (setCur2.value === curInfo[c].ccy && setCur.value === curInfo[c].base_ccy)
                cur = 1/curInfo[c].sale
            if (setCur.value === curInfo[c].ccy && setCur2.value !== curInfo[c].base_ccy) {
                if (setCur2.value !== setCur.value) {
                    let findCur2 = function () {
                        for (let f in curInfo)
                            if (setCur2.value === curInfo[f].ccy) return curInfo[f].sale
                    }
                    cur = curInfo[c].sale / findCur2()
                }
            }
        }
        res = cur * sum
        input2.value=res
    }
}

function calc2(sum ,cur) {
    sum = input2.value
    if (setCur2.value === setCur.value)
        cur = 1
    request.open('GET',requestURL)
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        let curInfo = request.response;
        for (let c in curInfo) {
            if (setCur2.value === curInfo[c].ccy && setCur.value === curInfo[c].base_ccy)
                cur = curInfo[c].sale
            if (setCur.value === curInfo[c].ccy && setCur2.value === curInfo[c].base_ccy)
                cur = 1/curInfo[c].sale
            if (setCur2.value === curInfo[c].ccy && setCur.value !== curInfo[c].base_ccy) {
                if (setCur2.value !== setCur.value) {
                    let findCur2 = function () {
                        for (let f in curInfo)
                            if (setCur.value === curInfo[f].ccy) return curInfo[f].sale
                    }
                    cur = findCur2() / curInfo[c].sale
                }
            }
        }
    res = cur * sum
    input1.value=res
    }
}