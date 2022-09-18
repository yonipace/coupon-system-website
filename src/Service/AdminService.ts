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

class AdminService {
  dispatch = useDispatch();
  state = useSelector((state: RootState) => state);
  companyList = this.state.companyList.CompanyList;
  customerList = this.state.customerList.CustomerList;

  //company methods

  public async getAllCompanies(): Promise<CompanyModel[]> {
    // If no companies in global state
    if (this.companyList.length === 0) {
      // fetch the companies:
      const response = await axios.get<CompanyModel[]>(
        appConfig.adminCompaniesUrl
      ); // waiting
      const companies = response.data;

      // save companies in global state
      // companiestore.dispatch({ type: CompaniesActionType.FetchCompanies, payload: companies });
      this.dispatch(setCompanyList(companies));

      // Return the companies
      return companies;
    }

    // If global state has the companies - return from global state
    return this.companyList;
  }

  public async getOneCompany(id: number): Promise<CompanyModel> {
    // const response = await axios.get<CompanyModel>(appConfig.companiesUrl + id);
    // const company = response.data;
    // return company;
    const company = this.companyList.find((p) => p.id === id);
    return company;
  }

  public async addCompanyToStore(company: CompanyModel): Promise<void> {
    // Send company to server
    const response = await axios.post<CompanyModel>(
      appConfig.adminCompaniesUrl,
      company
    );
    const addedCompany = response.data;
    // update redux global state
    this.dispatch(addCompanyToStore(addedCompany));
  }
  public async updateCompanyInStore(company: CompanyModel): Promise<void> {
    // Senf company to server for update
    const response = await axios.put<CompanyModel>(
      appConfig.adminCompaniesUrl + company.id,
      company
    );
    const updatedCompany = response.data;
    // Update redux global state
    this.dispatch(updateCompanyInStore(updatedCompany));
  }

  public async deleteCompany(id: number): Promise<void> {
    // Delete in backend
    await axios.delete(appConfig.adminCompaniesUrl + id);
    this.dispatch(removeCompany(id));
  }

  //customer methods

  public async getAllCustomers(): Promise<CustomerModel[]> {
    // If no customers in global state
    if (this.customerList.length === 0) {
      // fetch the customers:
      const response = await axios.get<CustomerModel[]>(
        appConfig.adminCustomersUrl
      ); // waiting
      const customers = response.data;

      // save customers in global state
      // customerstore.dispatch({ type: CustomersActionType.FetchCustomers, payload: customers });
      this.dispatch(setCustomerList(customers));

      // Return the customers
      return customers;
    }

    // If global state has the customers - return from global state
    return this.customerList;
  }

  public async getOneCustomer(id: number): Promise<CustomerModel> {
    // const response = await axios.get<CustomerModel>(appConfig.customersUrl + id);
    // const customer = response.data;
    // return customer;
    const customer = this.customerList.find((p) => p.id === id);
    return customer;
  }

  public async addCustomerToStore(customer: CustomerModel): Promise<void> {
    // Send customer to server
    const response = await axios.post<CustomerModel>(
      appConfig.adminCustomersUrl,
      customer
    );
    const addedCustomer = response.data;
    // update redux global state
    this.dispatch(addCustomerToStore(addedCustomer));
  }
  public async updateCustomerInStore(customer: CustomerModel): Promise<void> {
    // Senf customer to server for update
    const response = await axios.put<CustomerModel>(
      appConfig.adminCustomersUrl + customer.id,
      customer
    );
    const updatedCustomer = response.data;
    // Update redux global state
    this.dispatch(updateCustomerInStore(updatedCustomer));
  }

  public async deleteCustomer(id: number): Promise<void> {
    // Delete in backend
    await axios.delete(appConfig.adminCustomersUrl + id);
    this.dispatch(removeCustomer(id));
  }
}

const adminService = new AdminService();

export default adminService;
