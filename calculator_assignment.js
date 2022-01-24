var stackarr = [];
 
var topp = -1;

var op_choice = prompt("1. simple calculation\n2.expression calculator"); 

if(op_choice == 1) {

    var operation = parseInt(prompt("1. Addition\n2.Multiplication\n3.Division.\n4.Subtraction")); 
    if(operation < 1 || operation > 4) {
        alert("Wrong optionn choosed.")
    } else {
        var num1 = parseInt(prompt("number 1 : ")); 
        var num2 = parseInt(prompt("number 2 : ")); 
        
        switch(operation) {
            case 1: 
                alert("result : " + (num1 + num2)); 
                break; 
            case 2: 
                alert("result : " + (num1 * num2)); 
                break; 
            case 3: 
                alert("result : " + (num1 / num2)); 
                break; 
            case 4: 
                alert("result : " + (num1 - num2)); 
                break; 
            default: 
                break; 
        }
    }


} else if (op_choice == 2){

    var expression = prompt("Enter expression : (don\'t add any useless space");
    var post_fix = InfixtoPostfix(expression); 
    console.log(post_fix); 
    var result = calculatePostFix(post_fix); 
    console.log(result); 
    alert("result : " + result); 

} else {
    alert("You have choosed wrong option.")
}


// * -------------------- for expression ------------------------------------


 
function push(e) {
    topp++;
    stackarr[topp] = e;
}
 
function pop() {
    if (topp == -1)
        return 0;
    else {
        var popped_ele = stackarr[topp];
        topp--;
        return popped_ele;
    }
}
 
function operator(op) {
    if (op == '+' || op == '-' ||
        op == '^' || op == '*' ||
        op == '/' || op == '(' ||
        op == ')') {
        return true;
    }
    else
        return false;
}
 
function precedency(pre) {
    if (pre == '@' || pre == '(' || pre == ')') {
        return 1;
    }
    else if (pre == '+' || pre == '-') {
        return 2;
    }
    else if (pre == '/' || pre == '*') {
        return 3;
    }
    else if (pre == '^') {
        return 4;
    }
    else
        return 0;
}
 
function InfixtoPostfix(infix) {
 
    var postfix = [];
    var temp = 0;
    push('@');
    infixval = infix;
    for (var i = 0; i < infixval.length; i++) {
        var el = infixval[i];
        if (operator(el)) {
            if (el == ')') {
                while (stackarr[topp] != "(") {
                    postfix[temp++] = pop();
                }
                pop();
            }
            else if (el == '(') {
                push(el);
            }
 
            else if (precedency(el) > precedency(stackarr[topp])) {
                push(el);
            }
            else {
                while (precedency(el) <=
                    precedency(stackarr[topp]) && topp > -1) {
                    postfix[temp++] = pop();
                }
                push(el);
            }
        }
        else {
            postfix[temp++] = el;
        }
    }
    while (stackarr[topp] != '@') {
        postfix[temp++] = pop();
    }
 
    var st = "";
    for (var i = 0; i < postfix.length; i++)
        st += postfix[i];
    return st; 
}



function calculatePostFix(postfix_expresion) {
    if(stackarr != []) {
        stackarr = []; 
    }

    

    for(let i = 0; i < postfix_expresion.length; i++) {
    
        if(postfix_expresion[i] == " ") 
            continue; 
    
        if(postfix_expresion[i] == "*") {
            var val1 = pop(); 
            var val2 = pop();
            push(val1 * val2); 
        } else if(postfix_expresion[i] == "+") {
            var val1 = pop(); 
            var val2 = pop();    
            push(val1 + val2); 
        } else if(postfix_expresion[i] == "-") {
            var val1 = pop(); 
            var val2 = pop();
            push(val1 - val2); 
        }  else if(postfix_expresion[i] == "/") {
            var val1 = pop(); 
            var val2 = pop();
            push(val1 / val2); 
        }
        else {
            push(parseInt(postfix_expresion[i])); 
        }
    }

    return pop(); 
}