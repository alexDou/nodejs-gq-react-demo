import React, { useState } from 'react';
import { Query } from 'react-apollo';

import { GET_ORDERS, GET_COMPANY_ORDERS, GET_ADDRESS_ORDERS } from '../../queries';
import ListOrders from './ListOrders';
import Button from '../elements/Button';

/**
 * list all orders
 * filter orders
 */
function List() {
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState(GET_ORDERS);
    const [search, setSearch] = useState({ company: '', address: '' });
    
    const reportQuery = (data, loading, error) => {
        console.log(data)
        if (!search.company && !search.address && data.data.getOrders) {
            setOrders(data.data.getOrders);
        }
        if (search.company && data.data.getCompanyOrders) {
            setOrders(data.data.getCompanyOrders);
        }
        if (search.address && data.data.getAddressOrders) {
            setOrders(data.data.getAddressOrders);
        }
        
        let content = loading ? 'loading..' : error ? `Error: ${error}` : '';

        return content ? <div className="jumbotron">{content}</div> : <></>
    }
    
    const renderOrders = () => {
        if (!orders.length) {
            return (
              <div className="alert alert-info alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert">&times;</button>
                  <strong>Info!</strong> You can add an order via link at the top.
              </div>
            );
        }
        
        return <ListOrders items={orders} />
    }
    
    const searchOnChange = (e, type) => {
        let newSearch = { company: '', address: '' }
        newSearch[type] = e.target.value;
        
        setQuery(type === 'company' ? GET_COMPANY_ORDERS : GET_ADDRESS_ORDERS);
        
        setSearch(newSearch);
    }
    
    return (
      <div className="container mt-5">
    
          {/* td: extract to its own component */}
          <div style={orders.length ? filterInitStyle : filterNoneStyle}>
              <div className="d-flex flex-column bd-highlight mb-3">
                  <div className="p-2 bd-secondary">
                      <Button
                        handleClick={() => {
                            setSearch({company: '', address: ''});
                            setQuery(GET_ORDERS);
                        }}
                        title="All Orders"
                      />
                  </div>
                  <div className="p-2 bd-secondary">
                      <Button
                        handleClick={() => {
                            setSearch({company: search.company, address: ''});
                            setQuery(GET_COMPANY_ORDERS);
                        }}
                        title="Company"
                        buttonClass="btn btn-light mr-4"
                        buttonStyle={{width: '12em'}}
                      />
                      <input
                        type="text"
                        onChange={e => searchOnChange(e, 'company')}
                        value={search.company}
                        style={searchInputStyle}
                      />
                  </div>
                  <div className="p-2 bd-secondary">
                      <Button
                        handleClick={() => {
                            setSearch({ company: '', address: search.address });
                            setQuery(GET_ADDRESS_ORDERS);
                        }}
                        title="Address"
                        buttonClass="btn btn-light mr-4"
                        buttonStyle={{width: '12em'}}
                      />
                      <input
                        type="text"
                        onChange={e => searchOnChange(e, 'address')}
                        value={search.address}
                        style={searchInputStyle}
                      />
                  </div>
              </div>
          </div>
          
          <div className="row">
              <Query
                children={reportQuery}
                onError={(error) => console.error('GET_ORDERS errored', error)}
                variables={search}
                pollInterval={60000}
                fetchPolicy={`network-only`}
                query={query}
                partialRefetch={false}
              />
          </div>
          <div className="row">
              {renderOrders()}
          </div>
      </div>
    );
}

const searchInputStyle = {
    height: '40px',
    width: '40%'
}

const filterNoneStyle = {
    display: 'none'
}

const filterInitStyle = {
    display: 'initial'
}

export default List;
