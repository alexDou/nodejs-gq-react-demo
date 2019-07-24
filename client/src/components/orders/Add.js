import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import useForm from "react-hook-form";
import { ADD_ORDER } from "../../queries";

/**
 * create/add order to DB
 * here we rely heavily on
 * Mutation component from react-apollo
 * and react-hook-form
 */
function Add() {
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [item, setItem] = useState('');
    
    const { register, errors } = useForm();
    
    const companyChange = e => setCompany(e.target.value);
    const addressChange = e => setAddress(e.target.value);
    const itemChange = e => setItem(e.target.value);
    
    const flushForm = () => {
        setCompany('');
        setAddress('');
        setItem('');
    }
    
    const handleSubmit = (event, addOrder) => {
        event.preventDefault();
        
        addOrder().then(_ => {
            flushForm();
        }).catch(err => console.error(err))
        
        return false;
    };
    
    return (
        <div className="content mt-4">
            <Mutation
              mutation={ADD_ORDER}
              variables={{ company, address, item }}
              onCompleted={_ => flushForm()}
              onError={(error) => console.error('ADD_ORDER error:', error)}
            >
                {
                    // addOrder available since it's declared in queries
                    (addOrder, { data, loading, error }) => {
                        if (error) {
                            return (
                              <div className="alert alert-danger">{error}</div>
                            )
                        }
                        
                        return (
                          <form onSubmit={(event) => handleSubmit(event, addOrder)}>
                              <div className="row m-2">
                                  <label htmlFor="company" className="text-right pr-2" style={formLabel}>Company</label>
                                  <input name="company" onChange={companyChange} value={company} ref={register({
                                      required: 'Required',
                                      pattern: {
                                          value: /^[A-Z0-9._ /&#()%+-]+$/i,
                                          message: "invalid company name"
                                      }
                                  })}
                                  />
                                  {errors.company && errors.company.message}
                              </div>
      
                              <div className="row m-2">
                                  <label htmlFor="address" className="text-right pr-2" style={formLabel}>Address</label>
                                  <input name="address" onChange={addressChange} value={address} ref={register({
                                      required: 'Required',
                                      pattern: {
                                          value: /^[A-Z0-9._, /()#-]+$/i,
                                          message: "invalid address"
                                      }
                                  })}
                                  />
                                  {errors.address && errors.username.address}
                              </div>
      
                              <div className="row m-2">
                                  <label htmlFor="item" className="text-right pr-2" style={formLabel}>Item</label>
                                  <input name="item" onChange={itemChange} value={item} ref={register({
                                      required: 'Required',
                                      pattern: {
                                          value: /^[A-Z0-9._, /()%#+-]+$/i,
                                          message: "invalid item name"
                                      }
                                  })}
                                  />
                                  {errors.item && errors.username.item}
                              </div>
      
                              <div className="row m-2">
                                  <button type="submit" className="ml-4">Submit</button>
                              </div>
                          </form>
                        )
                    }
                }
            </Mutation>
        </div>
    );
}

const formLabel = {
    width: 100
};

export default Add;
