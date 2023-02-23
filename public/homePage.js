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

ApiConnector.current((response) => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }

});

const rateBoard = new RatesBoard();

ApiConnector.getStocks((response) => console.log(response));