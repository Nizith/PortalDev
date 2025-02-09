import React from "react";

const StepOne = ({ formData, handleChange, suppliers, customers, handleSubmit }) => (
    <div>
      <div className='flex items-center justify-center'>
              <div className='bg-zinc-200 brder border-neutral-500 rounded-2xl p-8 w-full'>
                  <form className='m-0' onSubmit={handleSubmit}>
                      <div className='mb-5'>
                          <label>Tender No :</label>
                          <input
                              className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                              type="text"
                              id="tenderNo"
                              name="tenderNo"
                              value={formData.tenderNo}
                              onChange={handleChange}
                          />
                      </div>
                      <div className='mb-5'>
                          <label>Supplier :</label>
                          <select
                              className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                              id="supplier"
                              name="supplier"
                              value={formData.supplier}
                              onChange={handleChange}
                          >
                              <option value=""></option>
                              {Array.isArray(suppliers.data) && suppliers.data.map((supplier) => (
                                  <option key={supplier._id} value={supplier.name}>{supplier.name}</option>
                              ))}
                          </select>
                      </div>
                      <div className='mb-8'>
                          <label>Customer :</label>
                          <select
                              className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                              id="customer"
                              name="customer"
                              value={formData.customer}
                              onChange={handleChange}
                          >
                              <option value=""></option>
                              {Array.isArray(customers.data) && customers.data.map((customer) => (
                                  <option key={customer._id} value={customer.name}>{customer.name}</option>
                              ))}
                          </select>
                      </div>
                      <div className='grid grid-cols-2 gap-x-10 gap-y-8'>
                          <div>
                              <label>Customer Contract Start Date</label>
                              <input
                                  className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                  type="date"
                                  name="customerContStartDate"
                                  value={formData.customerContStartDate}
                                  onChange={handleChange}
                              />
                          </div>
                          <div>
                              <label>Customer Contract End Date</label>
                              <input
                                  className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                  type="date"
                                  name="customerContEndDate"
                                  value={formData.customerContEndDate}
                                  onChange={handleChange}
                              />
                          </div>
                          <div>
                              <label>Supplier Contract Start Date</label>
                              <input
                                  className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                  type="date"
                                  name="supplierContStartDate"
                                  value={formData.supplierContStartDate}
                                  onChange={handleChange}
                              />
                          </div>
                          <div>
                              <label>Supplier Contract End Date</label>
                              <input
                                  className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                  type="date"
                                  name="supplierContEndDate"
                                  value={formData.supplierContEndDate}
                                  onChange={handleChange}
                              />
                          </div>
                      </div>
                  </form>
              </div>
          </div>
    </div>
  );

  export default StepOne;