console.log("Products frontend javascript file");

$(function () {
  // Toggle visibility of volume/type fields (optional based on collection type logic)
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "TRUCK") {
      $("#product-volume-wrapper").show();
    } else {
      $("#product-volume-wrapper").hide();
    }
  });

  // Toggle form display
  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").hide();
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(300);
    $("#process-btn").show();
  });

  // Status change with server update
  $(".new-product-status").on("change", async function () {
    const id = $(this).attr("id");
    const status = $(this).val();

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: status,
      });
      if (!response.data || response.data.error) {
        alert("Product update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Product update failed");
    }
  });

  // Form validation on submit
  $("form.dish-container").on("submit", function (e) {
    if (!validateForm()) {
      e.preventDefault();
    }
  });
});

// Validate form fields
function validateForm() {
  const productName = $(".product-name").val().trim();
  const productPrice = $(".product-price").val().trim();
  const productSize = $(".product-size").val();
  const productCollection = $(".product-collection").val();
  const productStatus = $(".product-status").val();

  if (
    !productName ||
    !productPrice ||
    !productSize ||
    !productCollection ||
    !productStatus
  ) {
    alert("Please fill in all required fields.");
    return false;
  }
  return true;
}

// Image preview function
function previewFileHandler(input, order) {
  const file = input.files[0];
  if (!file) return;

  const validTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) {
    alert("Only JPG, JPEG, or PNG images are allowed.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    $(`#image-section-${order}`).attr("src", reader.result);
  };
  reader.readAsDataURL(file);
}

/**<%- include('includes/header') %>

<link rel="stylesheet" type="text/css" href="/css/products.css" />

<body>
  <div class="products-container">
    <!-- Navigation Menu -->
    <div class="navigation-menu">
      <ul class="nav justify-content-center">
        <li class="nav-item" style="cursor: pointer">
          <a class="nav-link active" href="/admin/">Home</a>
        </li>
        <li class="nav-item" style="cursor: pointer">
          <a class="nav-link" href="/admin/product/all">Menu</a>
        </li>
        <li class="nav-item" style="cursor: pointer">
          <a class="nav-link" href="/admin/user/all">Users</a>
        </li>
        <li
          class="nav-item"
          style="cursor: pointer"
          onclick="return confirm('Do you want to logout?')"
        >
          <a class="nav-link" href="/admin/logout">Logout</a>
        </li>
      </ul>
    </div>

    <!-- Restaurant Menu Frame -->
    <div class="restaurant-menu-frame">
      <div class="board">
        <div class="dishes-table">
          <span class="new-dish-txt" style="margin-bottom: 30px">
            CAR MENU
          </span>
          <table class="table table-bordered table-hover">
            <thead class="thead-light">
              <tr>
                <th scope="col">T/r</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Type</th>
                <th scope="col">Product Volume</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Size</th>
                <th scope="col">Product Status</th>
              </tr>
            </thead>
            <tbody style="background: white">
              <% products.forEach(function(value, key) { %>
                <tr>
                  <td><%= key + 1 %></td>
                  <td><%= value.productName %></td>
                  <td><%= value.productCollection %></td>
                  <td><%= value.productVolume %></td>
                  <td><%= value.productPrice %></td>
                  <td><%= value.productSize %></td>
                  <td>
                    <select class="spec-select new-product-status" id="<%= value._id %>">
                      <option value="AVAILABLE" <%= value.productStatus === 'AVAILABLE' ? 'selected' : '' %>>AVAILABLE</option>
                      <option value="RENTED" <%= value.productStatus === 'RENTED' ? 'selected' : '' %>>RENTED</option>
                      <option value="IN_SERVICE" <%= value.productStatus === 'IN_SERVICE' ? 'selected' : '' %>>IN_SERVICE</option>
                      <option value="DAMAGED" <%= value.productStatus === 'DAMAGED' ? 'selected' : '' %>>DAMAGED</option>
                      <option value="RETIRED" <%= value.productStatus === 'RETIRED' ? 'selected' : '' %>>RETIRED</option>
                    </select>
                  </td>
                </tr>
              <% }) %>
            </tbody>
          </table>
          <div class="long-input" style="align-items: flex-end; margin-bottom: 25px">
            <button class="btn btn-primary" id="process-btn">
              New Product
            </button>
          </div>
        </div>

        <!-- New Product Form -->
        <form action="/admin/product/create" method="POST" class="dish-container" enctype="multipart/form-data">
          <div class="long-input" style="display: flex; align-items: center">
            <span class="new-dish-txt">NEW PRODUCT DETAIL</span>
          </div>
          <div class="login-input-frame">
            <div class="long-input">
              <label>Product Name</label>
              <input type="text" placeholder="Name" name="productName" class="product-name" />
            </div>
            <input name="productStatus" value="RENTED" class="product-status" hidden />
          </div>
          <div class="half-input-frame">
            <div class="half-input">
              <label>Product Price</label>
              <input type="number" placeholder="Price" name="productPrice" class="product-price" />
            </div>
            <div class="half-input">
              <label>Product Size</label>
              <select class="product-size" name="productSize">
                <option value="COMPACT" selected>COMPACT</option>
                <option value="MIDSIZE">MIDSIZE</option>
                <option value="FULLSIZE">FULLSIZE</option>
                <option value="SPORT">SPORT</option>
                <option value="TRUCK">TRUCK</option>
              </select>
            </div>
          </div>
          <div class="half-input-frame">
            <div class="half-input">
              <label>Product Type</label>
              <select class="product-collection" name="productCollection">
                <option value="SEDAN">SEDAN</option>
                <option value="SUV">SUV</option>
                <option value="COUPE">COUPE</option>
                <option value="CONVERTIBLE">CONVERTIBLE</option>
                <option value="TRUCK">TRUCK</option>
              </select>
            </div>
            <div class="half-input" id="product-volume">
              <label>Product Volume</label>
              <select class="product-volume" name="productVolume">
                <option value="SUBCOMPACT">SUBCOMPACT</option>
                <option value="COMPACT" selected>COMPACT</option>
                <option value="MIDSIZE">MIDSIZE</option>
                <option value="LARGE">LARGE</option>
              </select>
            </div>
          </div>
          <div class="long-input">
            <label>Product Description</label>
            <textarea name="productDesc" class="product-desc"></textarea>
          </div>
          <div class="img-frame">
            <label>Product Images</label>
            <div class="media-frame">
              <div class="upload-img-box">
                <img src="/img/upload.svg" class="preview-image" id="image-section-1" />
                <input type="file" name="productImages" class="image-input" data-order="1" required />
              </div>
              <div class="upload-img-box">
                <img src="/img/upload.svg" class="preview-image" id="image-section-2" />
                <input type="file" name="productImages" class="image-input" data-order="2" />
              </div>
              <!-- Add more image upload
::contentReference[oaicite:0]{index=0}
 
 */
