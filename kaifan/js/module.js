angular.module('myModule',['ng','ngRoute','ngAnimate','ngTouch']).
controller('mainCtrl',function($scope,$location,$http){
    $scope.isLoading = true;    //是否正在加载
    $scope.hasMore = true;  //服务器还有更多数据可供加载吗？
    //控制器一创建，就要发起AJAX请求，获取前5条菜品记录
    $http.get('data/dish_listbypage.php').
    success(function(data){
        //console.log(data);
        $scope.dishList = data;
        $scope.isLoading = false;
    });
    //单击“加载更多”按钮时触发的函数  (0~4)  (5~9)  (10~14)
    $scope.loadMore = function(){
        $scope.isLoading = true;
        $http.get('data/dish_listbypage.php?start='+$scope.dishList.length).
        success(function(data){
            //console.log(data);
            if(data.length<5){
                $scope.hasMore = false;  //没有更多数据可供加载
            }
            //$scope.dishList = data;
            $scope.dishList = $scope.dishList.concat(data);
            $scope.isLoading = false;
        });
    };
    //监视Model数据kw的改变，一改变则立即向服务器发起AJAX请求
    $scope.$watch('kw', function(){
        //console.log('Model数据kw发生改变了：'+$scope.kw);
        if(!$scope.kw){
            return; //若kw为undefined或空字符串，则退出
        }
        $scope.isLoading =  true;
        $http.get('data/dish_listbykw.php?kw='+$scope.kw).
        success(function(data){
            //console.log(data);
            $scope.dishList = data;
            $scope.isLoading = false;
        });
    })
}).controller('detailCtrl',function($scope,$http,$routeParams,$location){
    $scope.jumpToOrder = function(){
        $location.path('/order/'+$routeParams.did);
    };
    //输出菜品详情
    $http.get('data/dish_listbydid.php?did=' + $routeParams.did).
    success(function (data) {
        $scope.dish = data;
        //console.log(data);
    })
}).controller('orderCtrl',function($scope,$location,$http,$routeParams){
   //存校验数据滴,给定默认值
    $scope.checkData ={
        "nameCheck":"m",
        "phoneCheck":"m"
    };
    //校验名字
    $scope.checkName = function(){
        if($scope.order.user_name){
            if($scope.order.user_name.length<2){
                $scope.checkData.nameCheck = "e";
                return false;
            }else{
                $scope.checkData.nameCheck = "r";
                return true;
            }
        }else{
            $scope.checkData.nameCheck = "m";
            return false;
        }
    };
    //校验电话
    $scope.checkPhone = function(){
        var phone = $scope.order.phone;
        if(phone){
            var reg = /^1(3|4|5|6|7|8)\d{9}$/;//手机号正则
            if(reg.test(phone)){
                $scope.checkData.phoneCheck = "r";//正确
            }else{
                $scope.checkData.phoneCheck = "e";//格式错误
            }
        }else{
            $scope.checkData.phoneCheck = "m";
            return false;
        }
    };
	/*
    $scope.submitOrder = function () {
			$http.get('data/order_add.php?user_name='+$scope.user_name+'&phone='+$scope.phone+'&sex='+$scope.sex+'&addr='+$scope.addr+'&did='+$routeParams.did).
				success(function(data){
					console.log(data);
			});
	}
	*/
	$scope.order = {did: $routeParams.did};
	$scope.$watch(function(){
		$scope.checkName();
		$scope.checkPhone();
		if($scope.checkData.phoneCheck == "r" && $scope.checkData.nameCheck == "r"){
			$scope.submitOrder = function () {
				var str = jQuery.param($scope.order);
				  //console.log(str);
					  $http.post('data/order_add.php', str).
					  success(function (data) {
						//alert('下单成功,查看订单');
						$location.path('/myorder/'+$scope.order.phone);
					});
			  }
		}
	});
}).controller('myorderCtrl',function($scope,$location,$http,$routeParams){
	$http.get('data/order_listbyphone.php?phone='+$routeParams.phone).
		success(function(data){
			//console.log(data);
			$scope.phones = data;
	});
}).config(function($routeProvider){//配置路由字典
    $routeProvider.
    when('/start',{
        templateUrl:'tpl/start.html',
        controller:'startCtrl'
    }).
    when('/main',{
        templateUrl:'tpl/main.html',
        controller:'mainCtrl'
    }).
    when('/login',{
        templateUrl:'tpl/login.html',
        controller:'loginCtrl'
    }).
    when('/detail/:did', {
        templateUrl: 'tpl/detail.html',
        controller: 'detailCtrl'
    }).
    when('/order/:did',{
        templateUrl:'tpl/order.html',
        controller:'orderCtrl'
    }).
    when('/myorder/:phone',{
        templateUrl:'tpl/myorder.html',
        controller:'myorderCtrl'
    })
}).run(function($http){
    //配置默认的HTTPPOST请求的头部
    $http.defaults.headers.post = {'Content-Type':'application/x-www-form-urlencoded'}
});