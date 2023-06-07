let Country = [
    {
        Quan:"Thừa thiên huế",
    },
    {
        Quan:"Quãng ngãi",
    },
    {
        Quan:"Đà nẵng",
    },
    {
        Quan:"Quy nhơn",
    },
    {
        Quan:"Nha Trang",
    },
    {
        Quan:"Hà nội",
    },
    {
        Quan:"Hải phòng",
    },
    {
        Quan:"Sài gòn",
    },
    {
        Quan:"Quảng bình",
    },
    {
        Quan:"Quảng trị",
    },
    {
        Quan:"Cần thơ",
    },
    {
        Quan:"Bạc liêu",
    },
]

const ListCountry = document.getElementById('Your-section');
for(var i=0; i<Country.length; i++) {
    const buil = document.createElement('DIV');
    buil.innerHTML = `
        <li class='your-section' onclick='inner(${i})'>${Country[i].Quan}</li>
    `;
    ListCountry.appendChild(buil)
}

var ShowMenu = document.getElementById('Section-menu'),
    myMennu = document.getElementById('mySection-menu'),
    arown_down = document.getElementById('down'),
    offer = document.getElementById('conscious'),
    yourSection = document.getElementsByClassName('your-section');

arown_down.onclick = function() {
    if(myMennu.style.display == 'block') {
        myMennu.style.display = 'none';
        arown_down.style.transform = 'rotateX(0deg)';
    }
    else {
        myMennu.style.display = 'block';
        arown_down.style.transform = 'rotateX(180deg)';
    }
}

function inner(n) {
    offer.value = yourSection[n].innerHTML;
    myMennu.style.display = 'none';
    arown_down.style.transform = 'rotateX(0deg)';
}

// =================== Check Form ======================= //

var Check_Text = document.querySelectorAll('.check-text'),
    Check_phone = document.getElementById('phone'),
    Check_Email = document.getElementById('email'),
    error_text = document.getElementsByClassName('error-text'),
    error_phone = document.getElementsByClassName('error-phone'),
    // error_email = document.getElementsByClassName('error-email'),
    Country_error = document.getElementById('choose-type'),
    Check_null_Input = document.getElementsByClassName('input-style');
    Check_null_text = document.getElementsByClassName('check-null'),
    SendFrom = document.getElementById('Check-out'),
    detailAdress = document.getElementById('Adress-details');

var regex=/^[0-9 ]+$/,
    format_1 = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
    format_2 = /^[0-9' 'a-zA-Z_.-]+$/,
    filter = /^([ a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

$('#Check-out').click(function (e) {
    e.preventDefault();
    let CheckOut = false;
    for(var i = 0; i < Check_null_Input.length; i++) {
        if(Check_null_Input[i].value == '' || Check_null_Input[i].value.match(format_1)) {
            Check_null_Input[i].classList.add('boder-error')
            Check_null_text[i].classList.add('Error')
            CheckOut = false;
        } else {
            Check_null_Input[i].classList.remove('boder-error')
            Check_null_text[i].classList.remove('Error')
            CheckOut = true;
        }
    }
    ErrorPhone();

    if(CheckOut == true) {
        const inforOder = JSON.parse(localStorage.getItem('inforOrder'));
        SendFrom = true;
        alert("Đặt hàng thành công");
        window.location.href = "/HTML/success.html";
        let infor = inforOder ? {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('conscious').value,
            detailAdress: document.getElementById('Adress-details').value,
            ...inforOder,
        } : {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('conscious').value,
            detailAdress: document.getElementById('Adress-details').value,
        };
        localStorage.setItem('inforOrder', JSON.stringify(infor));
    } else {
        SendFrom = false;
        alert('vui lòng điền đầy đủ thồng tin..?')
    }
})

function ErrorPhone() {
    if(!Check_phone.value.match(regex) || Check_phone.value <= 100000000) {
        error_phone[0].classList.add('Error')
        $('.check-phone').addClass('boder-error')
        error_phone[0].innerHTML = 'Số điện thoại tối thiểu 10 chữ số';
        CheckOut = false;
    } else {
        error_phone[0].classList.remove('Error')
        $('.check-phone').removeClass('boder-error')
        error_phone[0].innerHTML = '';
        CheckOut = true;
    }

    return CheckOut;
}

let products = Object.values(JSON.parse(localStorage.getItem("productsIncart")));
const sumCart = products.reduce((total, item) => {
    return total + (item.price * +item.inCart)
}, 0);

document.getElementById("Total-product").innerHTML = sumCart + ".000";

var EmtyCart = document.getElementById('Empty-Cart')
if(products.length > 0) {
    EmtyCart.style.display = 'none';
}

function renderCart() {
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

function onLoadCartNumbers(){
    let products = Object.values(JSON.parse(localStorage.getItem("productsIncart")));

    products ? document.querySelector('.count_item').textContent = products.length : 0
}
onLoadCartNumbers();

var PayLength = document.getElementsByClassName('Pay-methods');
function Payment(n) {
    let order = JSON.parse(localStorage.getItem('inforOrder'));
    for (let i = 0; i < PayLength.length; i++) {
        if(i == n) {
            const inforOder = order ? {
                ...order,
                paymentMethod: document.querySelectorAll('.Pay-methods span')[n].innerHTML
            } : {
                paymentMethod: document.querySelectorAll('.Pay-methods span')[n].innerHTML
            };
            localStorage.setItem('inforOrder',  JSON.stringify(inforOder));
            PayLength[i].classList.add('border-active')
        }   else    {
            PayLength[i].classList.remove('border-active')
        }
    }
}