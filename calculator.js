var numb_chain = "";
var operator = "";
var first_num = "";
var active_operator = "";
var result = "";
var memory = "";
var error = false;

$(document).ready(function() {
  $("#calcy").click(function(e) {
    var offset = $(this).offset();
    var x = (e.pageX - offset.left);
    var y = (e.pageY);
    $("#coords").html(x+':'+y);

    if (x > 181 && x < 226 && y > 200 && y < 230) {operator = "SR";}
    if (x > 235 && x < 280 && y > 200 && y < 230) {operator = "OFF";}
    
    if (x > 20 && x < 65 && y > 241 && y < 281) {operator = "MC";}
    if (x > 75 && x < 120 && y > 241 && y < 281) {operator = "MR";}
    if (x > 129 && x < 174 && y > 241 && y < 281) {operator = "M-";}
    if (x > 181 && x < 226 && y > 241 && y < 281) {operator = "M+";}
    if (x > 235 && x < 280 && y > 241 && y < 281) {operator = "/";}
        
    if (x > 20 && x < 65 && y > 290 && y < 330) {operator = "%";}
    if (x > 75 && x < 120 && y > 290 && y < 330) {numb = "7";}
    if (x > 129 && x < 174 && y > 290 && y < 330) {numb = "8";}
    if (x > 181 && x < 226 && y > 290 && y < 330) {numb = "9";}
    if (x > 235 && x < 280 && y > 290 && y < 330) {operator = "*";}
    
    if (x > 20 && x < 65 && y > 340 && y < 380) {operator="+/-";}
    if (x > 75 && x < 120 && y > 340 && y < 380) {numb = "4";}
    if (x > 129 && x < 174 && y > 340 && y < 380) {numb = "5";}
    if (x > 181 && x < 226 && y > 340 && y < 380) {numb = "6";}
    if (x > 235 && x < 280 && y > 340 && y < 380) {operator = "-";}
    
    if (x > 20 && x < 65 && y > 389 && y < 429) {operator = "C";}
    if (x > 75 && x < 120 && y > 389 && y < 429) {numb = "1";}
    if (x > 129 && x < 174 && y > 389 && y < 429) {numb = "2";}
    if (x > 181 && x < 226 && y > 389 && y < 429) {numb = "3";}
    if (x > 235 && x < 280 && y > 389 && y < 477) {operator = "+";}
    
    if (x > 20 && x < 65 && y > 439 && y < 478) {operator = "AC";}
    if (x > 75 && x < 120 && y > 439 && y < 478) {numb = "0";}
    if (x > 129 && x < 174 && y > 439 && y < 478) {numb = ".";}
    if (x > 181 && x < 226 && y > 439 && y < 478) {operator = "=";}
    
    if (numb_chain.length < 10 && operator === "" && error === false) {
      if (numb in [,"1","2","3","4","5","6","7","8","9"] || numb === "0" || numb === ".") {
        if (numb_chain === "0" && numb != ".") {
          numb_chain = numb;
        } else {
          numb_chain = numb_chain + numb;
        }
        $("#numy").html(numb_chain);
        numb = "";
      }
    }
    
    if (operator === "AC") {
      numb_chain = "0";
      operator = "";
      first_num = "";
      error = false;
      $("#numy").html(numb_chain);
    }    
    
    if (operator === "C" && error === false) {
      numb_chain = "0";
      $("#numy").html(numb_chain);
      operator = "";
    }
    
    if (operator === "OFF") {
      numb_chain = "";
      first_num = "";
      memory = "";
      error = false;
      $("#numy").html("");
      $("#mem").html("");
      operator = "";
    }
    
  if (error === false) {
    if (operator === "=" || operator === "+" || operator === "-" || operator === "*" || operator ==="/") {
      if (first_num === "") {} else {
        first_num_val = Number(first_num);
        second_num_val = Number(numb_chain);
        if (active_operator === "+") {result = first_num_val + second_num_val;}
        if (active_operator === "-") {result = first_num_val - second_num_val;}
        if (active_operator === "*") {result = first_num_val * second_num_val;}
        if (active_operator === "/") {result = first_num_val / second_num_val;}
        if (result.toString().length > 10) {
          if (result.toFixed(0).toString().length > 10) {
            result = result.toExponential(5);
          } else {
            trunky = 10 - result.toFixed(0).toString().length;
            result = parseFloat(result).toFixed(trunky);          
          }
        }
      }
      
      if (first_num === "") {first_num = numb_chain;}
      if (result === "") {} else {first_num = result;}
      active_operator = operator;
      numb_chain = "0";
      operator = "";
      result = "";
      if (isFinite(first_num)) {
          $("#numy").html(first_num);
      } else {
        $("#numy").html("E");
        error = true;
      }
    }
    
    if (operator === "SR") {
      if (numb_chain === "0") {numb_chain = first_num;}
      if (numb_chain >= 0) {
        result = Math.sqrt(numb_chain);
        if (result.toString().length > 10) {
          if (result.toFixed(0).toString().length > 10) {
            result = result.toExponential(5);
          } else {
            trunky = 10 - result.toFixed(0).toString().length;
            result = parseFloat(result).toFixed(trunky);          
          }
        }
      $("#numy").html(result);
      if (result != "") {first_num = result;}
        
      } else {
        $("#numy").html("E");
        error = true;        
      }
      
      numb_chain = "0";
      operator = "";
      result = "";
    }
    
    if (operator === "%") {
      if (numb_chain === "0") {numb_chain = first_num;}
      result = Number(numb_chain)/100;
      if (result.toString().length > 10) {
        if (result.toFixed(0).toString().length > 10) {
          result = result.toExponential(5);
        } else {
          trunky = 10 - result.toFixed(0).toString().length;
          result = parseFloat(result).toFixed(trunky);          
        }
      }
      $("#numy").html(result);
      if (result != "") {first_num = result;}
      numb_chain = "0";
      operator = "";
      result = "";
    }
    
    if (operator === "+/-") {
      if (numb_chain === "0") {numb_chain = first_num;}
      result = -numb_chain;
      if (result.toString().length > 10) {
        if (result.toFixed(0).toString().length > 10) {
          result = result.toExponential(5);
        } else {
          trunky = 10 - result.toFixed(0).toString().length;
          result = parseFloat(result).toFixed(trunky);          
        }
      }
      $("#numy").html(result);
      if (result != "") {first_num = result;}
      numb_chain = "0";
      operator = "";
      result = "";
    }
    
    if (operator === "M+") {
      if (numb_chain === "0") {numb_chain = first_num;}
      memory = memory + numb_chain;
      $("#mem").html("M");
      numb_chain = "0";
      operator = "";
    }
    
    if (operator === "M-") {
      if (numb_chain === "0") {numb_chain = first_num;}
      memory = memory - numb_chain;
      $("#mem").html("M");
      numb_chain = "0";
      operator = "";
    }    
    
    if (operator === "MR" && memory != "") {
      $("#mem").html("M");
      first_num = memory;
      $("#numy").html(first_num);
      numb_chain = "0";
      operator = "";
    }    
   
    if (operator === "MC") {
      $("#mem").html("");
      memory = "";
      operator = "";
    }
  }
    
  });
});