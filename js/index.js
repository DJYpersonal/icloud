var reminder = angular.module('reminder',[]);
reminder.controller('mainCtrl',['$scope',function($scope){
    if(localStorage.lis){
       $scope.list = angular.fromJson(localStorage.lis);
    }else{
    	$scope.list = [];
    }
    $scope.saveData = function(){
    	localStorage.lis = angular.toJson(this.list);
    }
	
    $scope.currentList = null;

	$scope.colors = ['green','blue','purple','yellow','brown','red','orange'];
	$scope.addList = function(){
		var 
		  len = $scope.list.length,
          id = (len === 0)?1001:(Math.max.apply(null,$scope.list.map(function(v,i){
          	return v.id
          })) + 1),
		  list = {
           id: id,
           name: '新列表' + (len+1),
           theme: $scope.colors[len%7],
           shixiang: []
		};
        $scope.list.push(list);
        $scope.currentList = list;
        this.saveData();
	}
	$scope.setCurrent = function(index){
      $scope.currentList = $scope.list[index];
      this.saveData();
    }

   $scope.delete = function(){
      $scope.list= $scope.list.filter(function(v,k){
        return v.id !== $scope.currentList.id;
      })
      this.saveData();
     $scope.currentList = $scope.list[0];
  }
  $scope.newtodos=function (items) {
    var newItem={name:'事项'+(items.length+1),state:false};
    items.push(newItem);
    $scope.saveData();
  }
  $scope.clearDone=function (cur) {
    cur.shixiang=cur.shixiang.filter(function(v,i){
      return !v.state;
    })
    $scope.saveData();
  }

}])