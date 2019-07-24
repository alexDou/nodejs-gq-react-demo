import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import DeleteOrder from './DeleteOrder';


function parseItems(items) {
    // sort by item name first
    items.sort((a, b) => (a.item > b.item) ? -1 : (a.item < b.item) ? 1 : 0);
    
    // calculate count of order items
    items = items.reduce((obj, v) => {
        if (obj[v.item]) {
            obj[v.item].count++;
        } else {
            v.count = 1;
            obj[v.item] = v;
        }

        return obj;
    }, {});
    
    // put together helper array
    var objCountSort = [];
    for (var it in items) {
        objCountSort.push([it, items[it].count]);
    }
    // and sort by count DESC
    objCountSort.sort((a, b) => b[1] - a[1]);
    
    // in sorted by count array,
    // [0] is item name [1] is count
    // then, map it to items
    let ordersSorted = {};
    for (let i = 0; i < objCountSort.length; i++) {
        ordersSorted[objCountSort[i][0]] = items[objCountSort[i][0]];
    }
   
    return ordersSorted;
}

function ListOrders({ items }) {
    const [orders, setOrders] = useState({});
    
    useEffect(() => {
        setOrders(parseItems(items));
    }, [items]);
    
    const renderOrders = () => {
        if (!Object.keys(orders).length) {
            return (
              <div className="alert alert-info alert-dismissible">
                  <strong>Info!</strong> You can add an order via link at the top.
              </div>
            );
        }
        
        return <div className="container mt-3">
            {
                Object.keys(orders).map(okey => {
                    return (
                      <div className="d-flex justify-content-between bg-light rounded-lg border border-info m-2" key={orders[okey].id}>
                          <div className="p-2 w-50">
                              <h2 className="display-6 text-dark text-monospace mx-4" style={itemHStyle}>#{orders[okey].id}: {okey} </h2>
                              <div className="p-2 text-muted text-left">{orders[okey].company}</div>
                              <div className="p-2 text-muted text-left">{orders[okey].address}</div>
                           </div>
                          <div className="p-2">
                              <span className="badge badge-primary badge-pill">
                                  {orders[okey].count}
                              </span>
                              <DeleteOrder rmid={parseInt(orders[okey].id)} />
                          </div>
                      </div>
                    )
                })
            }
        </div>
    }
    
    return (
          <div className="col-sm-10 offset-sm-1">
              {renderOrders()}
          </div>
        );
}

const itemHStyle = {
    fontSize:'1.2rem',
    paddingBottom:'6px',
    borderBottom: '1px dashed #252529'
}

ListOrders.propTypes = {
    items: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.string,
            company: propTypes.string,
            item: propTypes.string,
            created: propTypes.string,
            updated: propTypes.string,
        }),
    )
};

export default ListOrders;
