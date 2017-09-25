'use strict';

angular.module('openweatherApp')
          .component('fetcher', {
            restrict: 'E',
            templateUrl: 'views/dataFetcher.html',
            controller: ['$sce', '$http', 'fetchData', '$interval', function ($sce, $http, fetchData, $interval) {
              var vm = this;
              this.checked;
              this.sortType = 2; //Rodzaj sortowania (bubble/selection)
              this.cityListArr = []; //Lista miast dodanych do komponentu cityList
              this.sortClicks = [0,0,0,0,0,0,0]; //Macierz zliczająca kliknięcia - do array.reverse()
              fetchData.then(function(response) {
                vm.cities = response;
              });

//------------Wyszukiwanie index na podstawie nazwy
              function findIndex(location, array){
                for(var i = 0; i<array.length; i++){
                  if(location === array[i][0]) return i
                }
                return -1;
              }

//------------Dodanie nowego miasta do komponentu cityList - tablica cityListArr
              this.addcity = function(name, checked, time){
                if(checked){
                  var index = findIndex(name, vm.cities);
                  var newCity = vm.cities[index];
                  vm.cityListArr.push(newCity);             //dodajemy nowe miasto do listy miast obserwowanych
                  var newIndex = vm.cityListArr.length-1;   //index nowo dodanego miasta
                  vm.cityListArr[newIndex][3] = time;
                  giveMeData(name);
                  this.getCurrentData(name);
                  return vm.cityListArr;
                } else { //Odznaczenie jeśli już jest zaznaczone oraz "posprzątanie" po $interval
                  var index = findIndex(name, vm.cityListArr);
                  $interval.cancel(vm.cityListArr[index][2]);
                  vm.cityListArr.splice(index,1);
                }
              }

//------------Ustanowienie interwału czasowego
              this.getCurrentData = function(name){
                var index = findIndex(name, vm.cityListArr);
                var times = (60/vm.cityListArr[index][3])*1000;
                vm.cityListArr[index][2] = $interval( function(){giveMeData(name)}, times);
              }

              function giveMeData(name){
                var index = findIndex(name, vm.cityListArr);
                var trustedUrl = $sce.trustAsResourceUrl(vm.cityListArr[index][1]);
                $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
                      .then(function(response){
                        vm.cityListArr[index][4] = response.data.main.temp;
                        vm.cityListArr[index][5] = response.data.wind.speed;
                        vm.cityListArr[index][6] = response.data.main.pressure;
                        console.log(vm.cityListArr[index][0]);
                      })
              }

//-----------Sortowanie
              //Wywołanie sortowanie w zaileżności od sortType (radio button)
              this.sort = function(arr, elem, sortType){
                if(sortType == 1){
                  vm.sortClicks[elem]+=1;
                  (vm.sortClicks[elem]%2 !== 0) ? bubbleSort(arr, elem) : arr.reverse();
                } else if(sortType == 2){
                  vm.sortClicks[elem]+=1;
                  (vm.sortClicks[elem]%2 !== 0) ? selectionSort(arr, elem) : arr.reverse();
                }
              }

              function bubbleSort(arr, elem){
                  var len = arr.length;
                   for (var i = len-1; i>=0; i--){
                     for(var j = 1; j<=i; j++){
                       if(arr[j-1][elem]>arr[j][elem]){
                           var temp = arr[j-1];
                           arr[j-1] = arr[j];
                           arr[j] = temp;
                        }
                     }
                   }
                   return arr;
              }

              function selectionSort(arr, elem){
                var minIdx, temp,
                    len = arr.length;
                for(var i = 0; i < len; i++){
                  minIdx = i;
                  for(var  j = i+1; j<len; j++){
                     if(arr[j][elem]<arr[minIdx][elem]){
                        minIdx = j;
                     }
                  }
                  temp = arr[i];
                  arr[i] = arr[minIdx];
                  arr[minIdx] = temp;
                }
                return arr;
              }

//------------Dopisanie funkcji wewnętrznych do scope na potrzeby testów
              this.findIndex = findIndex;
              this.bubbleSort = bubbleSort;
              this.selectionSort = selectionSort;


            }]
        });
