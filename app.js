//Renay Hernandez

'use strict';
//function that toggles between light and dark mode
function darkMode() {
    document.body.classList.toggle("dark");
    document.querySelector("main").classList.toggle("dark");
    document.getElementById("shop").querySelector("div").classList.toggle("dark");
    document.querySelector("footer").classList.toggle("dark");
    document.querySelector("header").classList.toggle("darkHeader");
}

let cart = {
    productSelected:"",
    productPrice:"" 
};
//function that calculates costs and tracks items in cart
function cartCalculator(e) {
    e.preventDefault();
    // alert("Welcome to the cart!");

    cart.productSelected = "";
    cart.productPrice = parseFloat(0.0);

    let products = document.getElementsByName('product');
    for(let i = 0; i < products.length;i++) {
        if(products[i].checked) {
            // alert(products[i].id);
            // alert(products[i].value);
            cart.productSelected += products[i].id;
            cart.productSelected + "\n";
            cart.productPrice += parseFloat(products[i].value);
        }
    }

    let output = "";
    let cartOutput = document.getElementById("cartItems");
    let shippingCost = 5.00;

    let Subtotal = parseFloat(cart.productPrice);
    let totalCost =  parseFloat(cart.productPrice) + parseFloat(shippingCost); //undefined not getting int from string

    output += `<li>${cart.productSelected} $${cart.productPrice}<li><br>`;
    output += `<li>Subtotal: $${Subtotal} </li>`;
    output += `<li>Shipping Cost: $5.00</li>`;
    output += `<li>Final Total: $${totalCost}</li>`;
    cartOutput.innerHTML = output;


}

function cartCheckout(e){
    e.preventDefault();
    let output="";
    let cartOutput = document.getElementById("cartItems");
    if(cart.productSelected == "" && cart.productPrice == ""){
        output += `Please add something to the cart before checking out`;
    } else {
        output += `Thank you for your order! Your total is: $${cart.productPrice}`;
    }
    cartOutput.innerHTML = output;
    
}

//function that validates and stores user information
function checkForm(e) {
    e.preventDefault();
    alert("checkForm Reached");
    let formFullName = document.getElementById("fullName");
    let formNumber = document.getElementById("phone");
    let formEmail = document.getElementById("email");
    let formComment = document.getElementById("sendMessage");

    let phonePreference = document.getElementById("phonePreference");
    let emailPreference = document.getElementById("emailPreference");
    let customer={}; //customer object to store valid info

    let output = ""; //string to build output message
    let userInfoOutput = document.getElementById("customerInfo");

    let errorTracker = false; //boolean to keep track if errors are present
    //try-catch blocks to see if info is in form
    try{
        if(formFullName.value == ""){
            throw "Please enter full name";
        }  
    } catch (error){
        let errorSpan1 = document.getElementById("fullName").previousElementSibling;
        errorSpan1.innerHTML = error;
        errorTracker = true;
        console.log(error);
    }

    try {
        if(!/^([0-9]){10}$/.test(formNumber.value)){ //was formNumber is less than 10
            throw "Please enter a valid phone number";
        }
    } catch (error){
        let errorSpan2 = document.getElementById("phone").previousElementSibling;
        errorSpan2.innerHTML = error;
        errorTracker = true;
        console.log(error);
    }

    try{
        if(formEmail.value == ""){ //need REGEX to check email too
            throw "Please enter a valid email address";
        }   
        
    } catch (error){
        let errorSpan3 = document.getElementById("email").previousElementSibling;
        errorSpan3.innerHTML = error;
        errorTracker = true;
        console.log(error);
    }

    
    try {
        if(formComment.value == ""){
            throw "Please enter comment(s)";    
        }
    } catch (error){
        let errorSpan5 = document.getElementById("commentError");
        errorSpan5.innerHTML = error;
        errorTracker = true;
        console.log(error);
    }
    

    if(errorTracker != true){
        //add other fields to object
        customer.fullName = formFullName;
        customer.number = formNumber;
        customer.email = formEmail;
        customer.comment = formComment;

        if(phonePreference.checked){
            customer.contactPreference = phonePreference;
        }
        if(emailPreference.checked){
            customer.contactPreference = emailPreference;
        }

        //format output string then add to div inner html
        output += `<li>Thank you for your submission!</li>`;
        output += `<li>Full name: ${customer.fullName.value}</li>`;
        output += `<li>Phone Number: ${customer.number.value}</li>`;
        output += `<li>Email: ${customer.email.value}</li>`;
        output += `<li>Contact Preference: ${customer.contactPreference.value}`;
        output += `<li>Comments: ${customer.comment.value}</li>`;
        userInfoOutput.innerHTML = output;

        //resets the form
        customer.fullName.value = "";
        customer.number.value = "";
        customer.email.value = "";
        document.getElementById("phonePreference").setAttribute("checked", ""); //reset back to checked default option
        customer.comment.value = "";
        errorTracker = false; //reset the error tracker
    }
    
}
let productCheckboxes = document.querySelectorAll("input[type=\"checkbox\"]");
for(let checkbox of productCheckboxes){
	checkbox.addEventListener("change", cartCalculator);
}
document.getElementById("checkOut").addEventListener('click',cartCheckout);
document.getElementById("formSubmit").addEventListener('click', checkForm);

