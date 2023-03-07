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
    $('#modalUpdate').modal('hide');
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

    Swal.fire({
        icon: 'success',
        title: "Create successfully",
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    })

    addEventExitModalCreate();

    let str = renderCustomer(customer);
    $('#tbCustomer tbody').append(str);

    addEventExitModalCreate();

    $('.update').on('click', function() {
        

        let id = $(this).data('id');

        let customer = findCustomerById(id);
        

        if (customer !== undefined) {

            currentCustomer = customer;

            $("#fullNameUp").val(customer.fullName);
            $('#emailUp').val(customer.email);
            $('#phoneUp').val(customer.phone);
            $('#addressUp').val(customer.address);
            $('#balanceUp').val(customer.balance);

            addEventShowUpdate();

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Warning',
                text: 'Customer not found',
            });
        }

    })

})

let updateCustomerById = (obj) => {
    customers.filter(item =>{
        if(item.id === obj.id){
            item.fullName = obj.fullName;
            item.email =obj.email;
            item.phone = obj.phone;
            item.address =obj.address;
            
        }
    })
}

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
    console.log(currentCustomer);

    let newRow = renderCustomer(currentCustomer);
    let currentRow = $('#tr_' + id);

    currentRow.replaceWith(newRow);
   
    addEventExitModalUpdate(); 
    
})

let generalId = () => {
    return  Math.random().toString(16).slice(13);
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

