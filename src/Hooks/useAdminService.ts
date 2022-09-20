import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CompanyModel } from "../Models/CompanyModel";
import { CustomerModel } from "../Models/CustomerModel";
import {
  addCompanyToStore,
  removeCompany,
  setCompanyList,
  updateCompanyInStore,
} from "../Redux/Reducers/companyListSlice";
import {
  addCustomerToStore,
  removeCustomer,
  setCustomerList,
  updateCustomerInStore,
} from "../Redux/Reducers/customerListSlice";
import { RootState } from "../Redux/Store/Store";
import appConfig from "../Utils/Config";

const useAdminService = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const companyList = state.companyList.CompanyList;
  const customerList = state.customerList.CustomerList;

  const getAllCompanies = async () => {
    if (companyList.length === 0) {
      // fetch the companies:
      try {
        const response = await axios.get<CompanyModel[]>(
          appConfig.adminCompaniesUrl
        ); // waiting
        const companies = response.data;

        //this is checked to avoid infinite calls to the server when the array is empty
        if (companies.length > 0) {
          dispatch(setCompanyList(companies));
          return companyList;
        }

        return companyList;
      } catch (e) {
        console.log(e);
      }
    }
    return companyList;
  };
  const getOneCompany = async (id: number) => {
    // const response = await axios.get<CompanyModel>(appConfig.companiesUrl + id);
    // const company = response.data;
    // return company;
    const company = companyList.find((p) => p.id === id);
    return company;
  };

  const addCompany = async (company: CompanyModel) => {
    // Send company to server
    const response = await axios.post<CompanyModel>(
      appConfig.adminCompaniesUrl,
      company
    );
    const addedCompany = response.data;
    // update redux global state
    dispatch(addCompanyToStore(addedCompany));
  };

  const updateCompany = async (company: CompanyModel) => {
    // Senf company to server for update
    const response = await axios.put<CompanyModel>(
      appConfig.adminCompaniesUrl,
      company
    );
    const updatedCompany = response.data;
    // Update redux global state
    dispatch(updateCompanyInStore(updatedCompany));
  };

  const deleteCompany = async (id: number) => {
    // Delete in backend
    await axios.delete(appConfig.adminCompaniesUrl, {
      params: {
        id,
      },
    });
    dispatch(removeCompany(id));
  };
  const getAllCustomers = async () => {
    if (customerList.length === 0) {
      // fetch the customers:
      const response = await axios.get<CustomerModel[]>(
        appConfig.adminCustomersUrl
      ); // waiting
      const customers = response.data;
      console.log(customers);

      //this is checked to avoid infinite calls to the server when the array is empty
      if (customers.length > 0) {
        dispatch(setCustomerList(customers));
        return customerList;
      }

      return customerList;
    }
    return customerList;
  };
  const getOneCustomer = async (id: number) => {
    // const response = await axios.get<CustomerModel>(appConfig.customersUrl + id);
    // const customer = response.data;
    // return customer;
    const customer = customerList.find((p) => p.id === id);
    return customer;
  };

  const addCustomer = async (customer: CustomerModel) => {
    // Send customer to server
    const response = await axios.post<CustomerModel>(
      appConfig.adminCustomersUrl,
      customer
    );
    const addedCustomer = response.data;
    // update redux global state
    dispatch(addCustomerToStore(addedCustomer));
  };

  const updateCustomer = async (customer: CustomerModel) => {
    // Senf customer to server for update
    const response = await axios.put<CustomerModel>(
      appConfig.adminCustomersUrl,
      customer
    );
    const updatedCustomer = response.data;
    // Update redux global state
    dispatch(updateCustomerInStore(updatedCustomer));
  };

  const deleteCustomer = async (id: number) => {
    // Delete in backend
    await axios.delete(appConfig.adminCustomersUrl, { params: { id } });
    dispatch(removeCustomer(id));
  };

  return {
    getAllCompanies,
    getOneCompany,
    addCompany,
    updateCompany,
    deleteCompany,
    getAllCustomers,
    getOneCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useAdminService;
