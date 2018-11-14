$btnCalc = document.querySelector('#calculate');
$loader = document.querySelector('.loading');
$result = document.querySelector(".result");
$monthly_payment = document.querySelector("#monthly-payment");
$total_payment = document.querySelector("#total-payment");
$total_interest = document.querySelector("#total-interest");
$loan = document.querySelector("#loan");
$rate = document.querySelector("#rate");
$time = document.querySelector("#time");


$btnCalc.addEventListener('click', function(){
    if( $loan.checkValidity() & $rate.checkValidity() & $time.checkValidity() )
    {
        dispLoading();
        setTimeout(function(){ 
            hideLoading();
        }, 2000 );
    }
});

function dispLoading()
{
    $loader.style.display = "block";
    $result.style.display = "none";
}
function hideLoading()
{
    $loader.style.display = "none"
    displayResult();
}

function displayResult()
{
    calculateResult();
    $result.style.display = "block";

}

function calculateResult()
{

        
    let loan = $loan.value;
    let rate = $rate.value;
    let interest = rate/1200;
    let time = $time.value;


    let temp = Math.pow( (1+interest), time );
    let monthly_payment = ( (interest*temp) / (temp-1) ) * loan;
    let total_payment = monthly_payment * time;

    $monthly_payment.value = monthly_payment.toFixed(2);
    $total_payment.value = total_payment.toFixed(2);
    $total_interest.value = rate;
}