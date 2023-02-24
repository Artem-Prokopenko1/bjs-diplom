'use strict'


const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
    const cb = (response) => {
        if(response.success){
            location.reload();
        }
    }
    ApiConnector.logout(cb);
}

//инфо о пользователе
ApiConnector.current((response) => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }

});

//получение текущих курсов валют
const rateBoard = new RatesBoard();

function fillRateBoard(){
    ApiConnector.getStocks((response) => {
        if(response.success){
            rateBoard.clearTable();
            rateBoard.fillTable(response.data);
        }
        }
    );
}
fillRateBoard();
setInterval(fillRateBoard, 60000);

//операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney({ currency: data.currency, amount: data.amount }, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс пополнен успешно");
        }else{
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney({ fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount }, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация прошла успешно");
        }else{
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    console.log(data);
    ApiConnector.transferMoney({ to: data.to, currency: data.currency, amount: data.amount }, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод зачислен успешно");
        }else{
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

//Работа с избранным
const favoritWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if(response.success){
        favoritWidget.clearTable();
        favoritWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }  
});

favoritWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites({id: data.id, name: data.name}, (response) => {
       
        if(response.success){
            favoritWidget.clearTable();
            favoritWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritWidget.setMessage(response.success, "Пользователь добавлени в избранное");
        }else{
            favoritWidget.setMessage(response.success, response.error);
        }  
    });
};

favoritWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (response) => {
        
        if(response.success){
            favoritWidget.clearTable();
            favoritWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritWidget.setMessage(response.success, "Пользователь удален из избранного");
        }else{
            favoritWidget.setMessage(response.success, response.error);
        }  
    }) 
};