var cardsNode = $('#cards');
var btnsNode = $('.btn');
 
function getData(callback){
    $.getJSON("src/data/sales-report.json", callback);
};

function appendData(data){
    
    data.forEach(function(order) {
        var amount = 0;    
        var html = `
            <div class="card">
            <table class="table table-sm borderless">
            <tbody>
                <tr>
                    <th scope="row" >Pedido</th>
                    <td>${`${order.id}`.padStart(10, '0')}</td>
                </tr>
                <tr>
                    <th scope="row">Cliente</th>
                    <td >${order.customer.name}</td>
                </tr>
                <tr>
                    <th scope="row">CPF/CNPJ</th>
                    <td >${order.customer.document}</td>
                </tr>
                <tr>
                    <th scope="row">Endereço</th>
                    <td>${order.customer.address.street}, ${order.customer.address.number}</td>
                </tr>
                
                <tr class="hidden-xs">
                    <th scope="row" class="hidden-xs">Itens</th>
                </tr>

                <tr class="hidden-xs thead-light">
                    <th scope="col">Produto</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Unidade</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Total</th>
                </tr>
        `;
        order.orders.forEach(function(item){
            amount += item.unitPrice * item.quantity;
            html += `<tr class="hidden-xs">    
                <td>${item.item}</td>
                <td>${item.itemDescription}</td>
                <td>${item.quantity}</td>
                <td>${item.type}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${(item.unitPrice * item.quantity).toFixed(2)}</td>
            </tr>`;
        });
        html += `
        <tr>
            <th>Preço Total</th>
            <td>${amount.toFixed(2)}</td>
        </tr>
        </tbody>
        </table>
        </div>
        ` ;    
        cardsNode.append(html);
    });
}

function buildEventListeners(){
    btnsNode.on('click', function(btn){
        var action = btn.currentTarget.dataset.show;
        if(action === "true"){
            cardsNode.removeClass('cards-hidden'); 
        }else{
            cardsNode.addClass('cards-hidden') ;
        }
    });
}

$(document).ready(function(){
    
    getData(appendData);
    buildEventListeners();

});