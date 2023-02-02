/**
 * ! danger
 * * important
 * ? questions
 * TODO orange 
 */

// Add item function
$("#create-button").click(function(){
  // Get the name and price of the item
  var itemName = $("input[placeholder='Name:']").val();
  var itemPrice = $("input[placeholder='Price:']").val();
  
  // Append new row with the given name and price
  $(".item-row").first().after(`
    <div class="row item-row">
      <div class="col-4 item-list">
        <ul>
          <li class="item">${itemName}</li>
        </ul>
      </div>
      <div class="col-4">
        <ul class="price-list">
          <li class="price-item"> ${itemPrice}</li>
        </ul>
      </div>
      <div class="col-2 qty-list">
        <div class="d-flex">
          <input type="text" value="0">
          <button class="btn btn-warning">Delete</button>
        </div>
      </div>
      <div class="col-2 item-total-list">
        <p></p>
      </div>
    </div>
  `);
  
  // Clear the input fields
  $("input[placeholder='Name:']").val("");
  $("input[placeholder='Price:']").val("");
});

$(document).ready(function() {
  // function to update the subtotal of a given item
  function updateSubtotal(item) {
    let input = $(item).find(".qty-list input");
    let price = $(item).find(".price-item").text();
    let subtotal = input.val() * price;

    $(item).find(".item-total-list p").text(subtotal + "$");
  }

  function updateTotalPrice() {
    let totalPrice = 0;
    let subtotals = $(".item-total-list p");

    subtotals.each(function(index, subtotal) {
      totalPrice += parseFloat($(subtotal).text());
    });
  
    $("#total-price").text(totalPrice.toFixed(2) + "$");
  }

  $(".item-total-list p").on("change", updateTotalPrice);

  // trigger the updateSubtotal function on change of the input value
  $(".qty-list input").on("change", function() {
    updateSubtotal($(this).closest(".item-row"));
    updateTotalPrice();
  });
  
  $(document).on("change", ".qty-list input", function() {
    let price = parseFloat($(this).closest(".item-row").find(".price-item").text());
    let quantity = parseInt($(this).val());
    let subtotal = price * quantity;
  
    $(this).closest(".item-row").find(".item-total-list p").text(subtotal.toFixed(2));
    updateTotalPrice();
  });

  $(document).on("click", ".btn-warning", function() {
    // Remove the row that contains the remove button that was clicked
    $(this).closest(".item-row").remove();
    updateTotalPrice()
    });
});



