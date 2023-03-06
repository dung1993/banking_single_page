// class Customer {
//     constructor(id, fullName, email, phone, address, balance) {
//         this.id = id;
//         this.fullName = fullName;
//         this.email = email;
//         this.phone = phone;
//         this.address = address;
//         this.balance = balance;
//     }
// }

// class Deposit {
//     constructor(id, customerId, transactionAmount, createdAt, createdBy, updatedAT, updatedBy, isDeleted) {
//         this.id = id;
//         this.customerId = customerId;
//         this.transactionAmount = transactionAmount;
//         this.createdAt = createdAt;
//         this.createdBy = createdBy;
//         this.updatedAt = updatedAT;
//         this.updatedBy = updatedBy;
//         this.isDeleted = isDeleted;
//     }
// }

let customers = [];

let currentCustomer = null;



function addEventShowCreate() {
    $('#btnShowCreateModal').on('click', () => {
        $('#modalCreate').modal('show');
    })
}

addEventShowCreate();

function addEventExitModalCreate() {
    $('#modalCreate').modal('hide');
}

function addEventShowUpdate() {
    $('#modalUpdate').modal('show');
}

function addEventExitModalUpdate() {
    $('.update').off('show');
}


function addEventShowDeposit() {
    $('#modalDeposit').modal('show');
}

function addEventShowWithDraw() {
    $('#modalWithDraw').modal('show');
}

function addEventShowTransfer() {
    $('#modalTransfer').modal('show');
}

let findCustomerById = (id) => {
    return customers.find(item => item.id == id);
}

let updateCustomerById = (obj) => {
    customers.filter(item =>{
        if(item.id === obj.id){
            item.fullNamev = obj.fullName;
            item.email =obj.email;
            item.phone = obj.phone;
            item.address =obj.address;
            
        }
    })
}

$('#btnCreateCustomer').on('click', () => {

    let id = generalId();
    let fullName = $('#fullNameCre').val();
    let email = $('#emailCre').val();
    let phone = $('#phoneCre').val();
    let address = $('#addressCre').val();
    let balance = 0;

    let customer = new Customer();
    customer.id = id;
    customer.fullName = fullName;
    customer.email = email;
    customer.phone = phone;
    customer.address = address;
    customer.balance = balance;

    customers.push(customer);

    addEventExitModalCreate();

    let str = renderCustomer(customer);
    $('#tbCustomer tbody').append(str);

    // addEventExitModalUpdate();

    

    $('.update').on('click', () => {
        addEventShowUpdate();

        let id = $(this).data('id');

        let customer = findCustomerById(id);
        

        if (customer !== undefined) {
            currentCustomer = customer;

            $("#fullNameUp").val(currentCustomer.fullName);
            $('#emailUp').val(currentCustomer.email);
            $('#phone').val(currentCustomer.phone);
            $('#address').val(currentCustomer.address);
            $('#balance').val(currentCustomer.balance);

        }
        else {
            alert('Customer not found');
        }

    })

})

$('#btnUpdateCustomer').on('click', () => {
    let id = currentCustomer.id;
    let fullName = $('#fullNameUp').val();
    let email = $('#emailUp').val();
    let phone = $('#phoneUp').val();
    let address = $('#addressUp').val();

    
    
    currentCustomer.fullName = fullName;
    currentCustomer.email = email;
    currentCustomer.phone = phone;
    currentCustomer.address = address;

    updateCustomerById(currentCustomer);
   
    addEventExitModalUpdate();
})

let generalId = () => {
    return "id" + Math.random().toString(12).slice(2);
}





let renderCustomer = (item) => {
    return `
                <tr id="tr_${item.id}">
                    <td>${item.id}</td>
                    <td>${item.fullName}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.balance}</td>
                    <td>${item.address}</td>
                    <td>
                        <button class="btn btn-outline-secondary update" data-id="${item.id}">
                            <i class="fa fa-edit" aria-hidden="true"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-outline-success deposit" data-id="${item.id}">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-outline-warning withdraw" data-id="${item.id}">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary transfer" data-id="${item.id}">
                            <i class="fa fa-exchange-alt" aria-hidden="true"></i>
                        </button>
                    </td>    
                    <td>
                        <button class="btn btn-outline-danger delete" data-id="${item.id}">
                            <i class='fas fa-trash'></i>
                        </button>                        
                    </td>
                </tr>
            `;
}

