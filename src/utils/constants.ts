export const baseUrl: string = 'https://webaccounting.herokuapp.com/account'
export const createToken = (login:string, password:string) => {
    // const bta = login + ':' + password;
    const token = `Basic ${btoa(login + ':' + password)}`
    console.log(token);
    return token;
}

