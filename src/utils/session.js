export const setCustomerSession = (customerId) => {
    sessionStorage.setItem('customerId', customerId);
};

export const getCustomerSession = () => {
    return sessionStorage.getItem('customerId');
};

export const removeCustomerSession = () => {
    sessionStorage.removeItem('customerId');
};