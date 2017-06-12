/*login*/
var formApp = angular.module('formApp', []);
    formApp.controller('formController',function formController($scope,$http) {      
        $scope.formData = {};        
        $scope.processForm = function() {
            $http({
                method: 'GET',
                url: './sites.php'
            }).then(function successCallback(response) {
                for (var i = 0; i < response.data.sites.length; i++) {
                    console.log(response.data.sites[i].Name);
                    if (response.data.sites[i].Name==$scope.formData.name) {                        
                    	window.location = 'route.html';
                    	break;
                    }else{
                        alert("账号名错误或密码错误！");
                        continue;
                    }
                }
            }, function errorCallback(response) {
                console.log("连接错误");
            });
        };
    });


/*index*/
var app = angular.module('myApp', ['ngRoute']);
app.controller('sitesCtrl', function($scope, $http) {   //控制器
}).controller('computers',function($scope, $route, $http, $location){
	$scope.$route = $route;
	$http.get("sites.php").then(function(response) {
        $scope.names = response.data.sites;
    });
    $scope.OpenDetail = function(yid) { 
        window.location = 'detail.html#/?yid='+yid;
    }
}).controller('art',function testCtrl($scope, $route){
	$scope.$route = $route;
	$scope.chickenEgg = 'chicken';
	$scope.legend = ["Berlin", "London",'New York','Tokyo'];  
    $scope.item = ['Jan', 'Feb', 'Mar', 'Apr', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
	$scope.data = [  
        [-1, 1, 3, 7, 13, 16, 18, 16, 15, 9, 4, 2], //Berlin  
        [0, 1, 4, 7, 12, 15, 16, 15, 15, 10, 6, 5], //London  
        [4, 4, 5, 10, 16, 22, 25, 24, 20, 14, 9, 3],    //New York  
        [7, 6, 8, 14, 17, 22, 25, 27, 24, 17, 14, 10]   //Tokyo  
    ]; 
	$scope.data1 = [  
        [-1, -1, -3, -7, 13, 16, 18, 16, 15, -9, -4, -2], //Berlin  
        [0, -1, -4, -7, 12, 15, 16, 15, 15, 10, -6, -5], //London  
        [-4, -4, -5, 10, 16, 22, 25, 24, 20, 14, -9, -3],    //New York  
        [-7, -6, -8, 14, 17, 22, 25, 27, 24, 17, 14, 10]   //Tokyo  
    ];
}).controller('music',function($scope,$route,$http){
	$scope.$route = $route;
	//$scope表示作用域对象，每个控制器都有自己的作用域对象
	$http.get("sites.php").then(function(response) {
        $scope.arrs = response.data.list;
    });

    //定义一个空对象 , 用于更新和保存数据时临时存储
    $scope.prod = {};

    //定义一个单击删除按钮时触发的事件，用于删除选中行
    $scope.delete = function ($index) {

        if($index>=0){
            if(confirm("是否删除"+$scope.arrs[$index].productid+"商品") ){
                $scope.arrs.splice($index,1);
            }
        }
    };

    //定义一个全局变量idx  , 用于存储选中行的索引，方便执行保存操作时保存数据
    var idx = -1;

    //定义一个单击修改按钮时触发的事件，用于单击后弹出模块窗口用于修改数据
    $scope.updata = function ($index) {

        //显示bootstrap中的模块窗口
        $('#modal-1').modal('show');

        //将选中行的数据绑定到临时对象prod中，在下面的模态窗口中展示出来
        $scope.prod.productid = $scope.arrs[$index].productid;
        $scope.prod.productname = $scope.arrs[$index].productname;
        //选中行的索引赋值给全局变量idx
        idx = $index;
    };

    //定义一个单机保存按钮时触发的事件,
    $scope.save = function () {
        //将修改后的值赋给数组
        $scope.arrs[idx].productid = $scope.prod.productid;
        $scope.arrs[idx].productname = $scope.prod.productname;
        //关闭模块窗口
        $('#modal-1').modal('hide');
    }
	
}).controller('history',function($scope, $route){
    $scope.$route = $route;
    
});

app.config(['$routeProvider',function($routeProvider){  //路由
	$routeProvider
        .when('/computers',{
	        templateUrl: 'embedded.computers.html',
	        controller: 'computers'
    	})
    	.when('/art',{
	        templateUrl: 'embedded.art.html',
	        controller: 'art'
    	})
        .when('/music',{
	        templateUrl: 'embedded.music.html',
	        controller: 'music'
    	})
        .when('/history',{
            templateUrl: 'embedded.history.html',
            controller: 'history'
        })
        .when('/',{
	        templateUrl: 'embedded.computers.html',
	        controller: 'computers'
    	})
		.otherwise({redirectTo:'/'});
		
}]);

app.directive('line', function() {    //指令
    return {  
        scope: {  
            id: "@",  
            legend: "=",  
            item: "=",  
            data: "="  
        },  
        restrict: 'E',  
        template: '<div class="col-xs-12 col-sm-12 col-md-12" style="height:400px;padding-bottom:30px"></div>',  
        replace: true,  
        link: function($scope, element, attrs, controller) {  
            var option = {  
                // 提示框，鼠标悬浮交互时的信息提示  
                tooltip: {  
                    show: true,  
                    trigger: 'item'  
                },  
                // 图例  
                legend: {  
                    data: $scope.legend  
                },  
                // 横轴坐标轴  
                xAxis: [{  
                    type: 'category',  
                    data: $scope.item  
                }],  
                // 纵轴坐标轴  
                yAxis: [{  
                    type: 'value'  
                }],  
                // 数据内容数组  
                series: function(){  
                    var serie=[];  
                    for(var i=0;i<$scope.legend.length;i++){  
                        var item = {  
                            name : $scope.legend[i],  
                            type: 'line',  
                            data: $scope.data[i]  
                        };  
                        serie.push(item);  
                    }  
                    return serie;  
                }()  
            };  
            var myChart = echarts.init(document.getElementById($scope.id),'macarons');  
            myChart.setOption(option);  
        }  
    };  
});


/*detail*/
var detail = angular.module('myDetail', []);
	detail.controller('DetailCtrl', function ($scope,$location,$http) {
 		var yid = $location.search().yid;
	    $http({
	        method: 'GET',
	        url: './sites.php'
	    }).then(function successCallback(response) {
	        for (var i = 0; i < response.data.sites.length; i++) { 
	            if (response.data.sites[i].id==yid) { 
	            	$scope.title = response.data.sites[i].title;
	            	$scope.img = response.data.sites[i].img;
	            	$scope.author = response.data.sites[i].author;
	            	$scope.content = response.data.sites[i].content;
	            	break;
	            }else{
	                continue;
	            }
	        }
	    }, function errorCallback(response) {
	        console.log("连接错误");
	    });
	    
	    $scope.back = function(){
	    	window.location = 'route.html';
	    }
	});