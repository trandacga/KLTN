let products = Object.values(JSON.parse(localStorage.getItem("productsIncart")));
const sumCart = products.reduce((total, item) => {
    return total + (item.price * +item.inCart)
}, 0); // tính tổng tền

document.getElementById("Total-product").innerHTML = sumCart + ".000";
document.getElementById("end-money").innerHTML = sumCart + 30 + ".000"; // tính tỏng tiền


var EmtyCart = document.getElementById('Empty-Cart')
if(products.length > 0) {
    EmtyCart.style.display = 'none';
}

function renderCart() { // in ra giỏ hàng
    const Container = document.getElementById('Your-Cart')
    for(var i = 0; i < products.length; i++) {
        const Product = document.createElement('DIV')
        Product.classList.add('Product-item')
        Product.innerHTML = `
            <div class="prd-image">
                <img src="/images/${products[i].tag}.webp" alt="">
            </div>
            <div class="prd-infor">
                <span class="prd-remove prd-amount">Giá: <span>${products[i].price}.000 đ</span></span>
                    <h3>${products[i].name}</h3>
                    <ul>
                        <li class="prd-price">
                            <p>SL:<span class='PA'>${products[i].inCart}</span></p>
                        </li>
                        <li class="prd-amount">
                            <p>Tổng: <span>${products[i].price * +products[i].inCart}.000 đ</span></p>
                        </li>
                    </ul>
            </div>`;
        Container.appendChild(Product)
    }
}
renderCart();

const infor = document.getElementById('infor'),
      address = document.getElementById('address'),
      paymentMethod = document.getElementById('paymentMethod');
      
const inforOder = JSON.parse(localStorage.getItem('inforOrder')) || {}; // lấy dự liệu là string ở local rồi parse lại thành array
function onLoad() {
    infor.innerHTML = `
        Họ tên: ${inforOder.name}<br><br>
        Số điện thoại: ${inforOder.phone}<br><br>
        Địa chỉ: ${inforOder.address}<br><br>
    `;
    address.innerHTML = `
        Địa chỉ chi tiết: ${inforOder.detailAdress}
    `;
    paymentMethod.innerHTML = `
        Phương thức thanh toán: <br>${inforOder.paymentMethod}
    `;
}

if(inforOder) { // kiểm tra nếu có hàng được đặt thì in ra 
    onLoad();
}

$('#accepted').click(function () { // quay trở lại tảng chủ và xóa giỏ hàng
    localStorage.removeItem('inforOrder');
    localStorage.removeItem('productsIncart');
    window.location.href = "/HTML/index.html";
})
