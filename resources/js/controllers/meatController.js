app.controller('meatController', ['$scope', '$http', function($scope, $http) {
  $scope.title = 'Top Seller in Meats';
  $scope.promo = "Current promotions and specials!";
  $scope.type = {
	'Beef': {
			'Rump Steak (5pk)': ['10'],
			'Sirloin Steak (5pk)': ['15'],
			'Mince (1Kg)': ['5'],
			'Burgers (10pk)': ['10']
			}, 
	'Chicken': {
			'Chicken (1.2Kg)': ['10'],
			'Chicken (1.6Kg)': ['15'],
			'Chicken Breasts (10pk)': ['5'],
			'Butterfly (10pk)': ['10']
			},
	'Pork':	{
			'Gammon Steak (5pk)': ['10'],
			'Pork Shoulder (5pk)': ['15'],
			'Bacon (1Kg)': ['5'],
			'Sausages (32pk)': ['10']	
			},
	'Game': {
			'Venison Steak (5pk)': ['10'],
			'Duck Breast (2pk)': ['15'],
			'Rabbit (whole)': ['5'],
			'Quails Eggs (6pk)': ['10']	
			},
	'Lamb':	{
			'Lamb Chops (5pk)': ['10'],
			'Rack of Lamb': ['15'],
			'Mince (1Kg)': ['5'],
			'Burgers (10pk)': ['10']
			}, 
	'Specials':	{
				'Kebabs (20pk)': ['10'],
				'Beef Wellington (5pk)': ['15'],
				}
};
	$scope.price=0;
	
	$scope.cost = 0;
	
	$scope.order =[];

	$scope.pictures = [
	{
		caption: "Steak",
		picture: "../images/steak.jpg"
	},
	{
		caption: "Chicken",
		picture: "../images/chicken.jpg"
	},
	{
		caption: "Mince",
		picture: "../images/mince.jpg"
	},
	{
		caption: "Beef Wellington",
		picture: "../images/beefWellington.jpg"
	}
	]
	
	
	$scope.populatePrice = function(item) {
	$scope.price = parseInt(item[0],10);
	$scope.cost = $scope.price * $scope.quantity;
	};
	
	$scope.populateCost = function(item) {
	$scope.cost = parseInt(item,10) * $scope.price;
	};
	
	$scope.quantity=0;

	$scope.cart = "Order Added Successfully";
	
	$('#quantity').on('change', validateNumber);
	
	function validateNumber() {
		if(this.value < 0 || this.value > 100) {
			$scope.quantity = 0;
			alert("You may only enter values between 0 and 100, if you require a larger order please email us via the contacts page.");
			this.value = $scope.quantity;	
		} else {
			$scope.quantity = parseInt(this.value, 10);
		}
	}
	
	$scope.addRow = function() {
		var type = $('#type option:selected').text();
		var prod = $('#product option:selected').text();
		var quantity = $('#quantity').val();
		var amount = $('#cost').val();
		
		if(type == "" || prod == "" || quantity == 0 || amount == 0) {
			alert("Please make sure all fields are selected before trying to place an order");
		} else {
			$scope.order.push({
				meat: type,
				product: prod,
				qty: quantity,
				cost: amount
			});
			$('#addCart').display = "block";
			setTimeout(function(){ $('#addCart').display = "none"; }, 10000);
		}
		console.log($scope.order);
        };

		$scope.total = 0;

		$scope.totalCost = function() {
            var totalCost = 0;

            angular.forEach($scope.order, function (order) {
                totalCost += parseInt(order.cost, 10);
				
            });
			$scope.total = totalCost;
            return totalCost;
        };
	
	$scope.removeRow = function(index) {
            $scope.order.splice(index, 1);
        };
	$scope.name = '';
	$scope.email = '';
	 $scope.orderSubmit = function(){
		var json = JSON.stringify( $scope.order, function( key, value ) {
			if( key === "$$hashKey" ) {
				return undefined;
				}
			return value;
		});

		json = JSON.parse(json);

		var data = {
			name: $scope.name,
			email: $scope.email,
			order: json,
			totalCost: $scope.total
		}


		console.log("yup ",data);
		console.log("sending ",JSON.stringify(data));
		$http({ url: '../html/secure_order_code.php',
            method: "POST",
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).success(function(data){
			alert("Thank your for your order, once the team process this you will be sent a confirmation email with your tracking code. Any questions do not hesistate to contact us via the contact page.");
		}).error(function(err){
			console.log(err)
		})
}
 
}]);