var guitarApp = angular.module('guitarApp', []);

guitarApp.controller('ChordCtrl', ['$scope', 'ChordLibrary', '$filter', function($scope, ChordLibrary, $filter){

  var findTab = function(input){
    for(var i=0;i<ChordLibrary.tabs.length; i++){
      if(input === ChordLibrary.tabs[i].name){
        return ChordLibrary.tabs[i].tab;
      }
    }
  }

  $scope.pressEnter = function(e) {
    if(e.which==13){ $scope.addTab('chord') };
  }

  var spacer = "-"
  $scope.spacing = function(amount){
    if(!amount){var amount = 1;}
    return new Array(amount + 1).join(spacer);
  }

  $scope.chordLib = ChordLibrary;
  $scope.tabs = [];
  $scope.stringInput = {}
  $scope.chord = '';

  $scope.$watch('chord', function() {
    $scope.stringInput = {};
    $scope.nameTab = findTab($scope.chord);
  });

  $scope.$watchCollection('[string_eH,string_b,string_g,string_d,string_a,string_eL]', function() {
    $scope.chord = '';
  }, true);

  $scope.spacerCt = function(amount){
    var amount = parseInt(amount);
    $scope.tabs.push({
      eH: $scope.spacing(amount),
      b:  $scope.spacing(amount),
      g:  $scope.spacing(amount),
      d:  $scope.spacing(amount),
      a:  $scope.spacing(amount),
      eL: $scope.spacing(amount)})
  }

  $scope.note = function(chord, string, name){
    if(chord){
      $('#add-tab').attr('disabled', false)
      $scope.stringInput[name] = chord;
      return chord;
    }else if(string){
      $('#add-tab').attr('disabled', false)
      if(string === '0'){
        $scope.stringInput[name] = string;
        return string;
      }
      string = string.replace(/^0/g,'');
      $scope.stringInput[name] = string;
      return string;
    }else{
      $scope.stringInput[name] = spacer;
      return spacer;
    }
  }

  $scope.resetStrings = function(){
    $('#add-tab').attr('disabled', true)
    $scope.stringInput = {};
    $scope.chord = '';
    $scope.string_eH   = '';
    $scope.string_b    = '';
    $scope.string_g    = '';
    $scope.string_d    = '';
    $scope.string_a    = '';
    $scope.string_eL   = '';
  }

  $scope.resetAll = function(){
    $scope.resetStrings();
    $scope.tabs = [];
  }

  $scope.addTab = function(item){
    if(item === 'measure'){
      $scope.tabs.push({eH: '|',b: '|',g: '|',d: '|',a: '|',eL:'|'})
    }else if(item === 'chord' && $scope.stringInput !== {}){
      $scope.tabs.push({
        eH: $scope.stringInput['eH'],
        b:  $scope.stringInput['b'],
        g:  $scope.stringInput['g'],
        d:  $scope.stringInput['d'],
        a:  $scope.stringInput['a'],
        eL: $scope.stringInput['eL']
      });
    }
    $scope.resetStrings();
    return;
  }
}])