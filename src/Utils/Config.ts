// general configuration for any environment
class Config {}

// development environment
class DevelopmentConfig extends Config {
  public baseUrl = "http://localhost:8080/";
  public adminCompaniesUrl = "http://localhost:8080/admin/companies";
  public adminCustomersUrl = "http://localhost:8080/admin/customers";
  public companyUrl = "http://localhost:8080/company";
  public companyCouponsUrl = "http://localhost:8080/company/coupons";
  public customerUrl = "http://localhost:8080/customer";
  public customerCouponsUrl = "http://localhost:8080/customer/coupons";
  public couponsUrl = "http://localhost:8080/coupons";
  public registerUrl = "http://localhost:8080//signup/";
  public loginUrl = "	http://localhost:8080/login";
}

// production environment
class ProductionConfig extends Config {
  public baseUrl = "/";
  public adminCompaniesUrl = "/admin/companies";
  public adminCustomersUrl = "/admin/customers";
  public companyUrl = "/company";
  public companyCouponsUrl = "/company/coupons";
  public customerUrl = "/customer";
  public customerCouponsUrl = "/customer/coupons";
  public couponsUrl = "/coupons";
  public registerUrl = "/signup/";
  public loginUrl = "/login";
}

const appConfig =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default appConfig;
