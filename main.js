/**
 * ! danger
 * * important
 * ? questions
 * TODO orange 
 */

$('#add-button').click(function(element) {
  element.preventDefault();
    var itemName = $("input[placeholder='Name:']").val();
    var itemPrice = $("input[placeholder='Price:']").val();
      //console.log("add item triggered")

  $("tbody").append(`
    <tr> 
      <td class="item"> 
      ${itemName} 
      </td> 
      <td class="price"> 
      ${itemPrice + "$"} 
      </td>
      <td class="qty"><input type="number" value="0"></td> 
      <td class="total">0.00$</td>
      <td><button class="remove">remove</button></td> 
    </tr>
  `);
  $("input[placeholder='Name:']").val("");
  $("input[placeholder='Price:']").val("");
})

$(document).ready(function() {

  function updateSubtotal(item) {
    let input = $(item).find(".qty input");
    let price = parseFloat($(item).find(".price").text());
      
    let subtotal = input.val() * price;
    console.log(subtotal);
    $(item).find(".total").text(subtotal.toFixed(2) + "$");
  }

  function updateTotalPrice() {
    let totalPrice = 0;
    let subtotals = $(".total");
      //console.log(subtotals);
      
    subtotals.each(function(index, subtotal) {
      let value = parseFloat($(subtotal).text());
      if (!isNaN(value)) {
        totalPrice += value;
      }
      //console.log(totalPrice);
    });

    $("#total-price").text("Total: " + totalPrice.toFixed(2) + "$");
  }

  $("tr").on("change", updateTotalPrice);

  $(".qty input").on("change", function() {
    updateSubtotal($(this).closest("tr"));
    updateTotalPrice();
  });

  $(document).on("input", ".qty input", function() {
    let price = parseFloat($(this).closest("tr").find(".price").text());
    let quantity = parseInt($(this).val());
    let subtotal = price * quantity;
  
    $(this).closest("tr").find(".total").text(subtotal.toFixed(2));
    updateTotalPrice();
  });

  $(document).on("click", ".remove", function() {
    $(this).closest("tr").remove();
    updateTotalPrice()
    });
});




