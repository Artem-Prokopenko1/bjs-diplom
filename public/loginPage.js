'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    //console.log(data);
    let clb = (response) => {
        if(response.success){
            location.reload();
        }else{
            userForm.setLoginErrorMessage(response.error);
        }
    };
    ApiConnector.login({ login: data.login, password: data.password }, clb);
}

userForm.registerFormCallback = (data) => {
    let clb = (response) => {
        if(response.success){
            location.reload();
        }else{
            userForm.setRegisterErrorMessage(response.error);
        }
    };
    ApiConnector.register({ login: data.login, password: data.password }, clb);
}