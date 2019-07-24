import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { REMOVE_ORDER } from "../../queries";

/**
 * delete an order
 * in a case of multiple orders with equal item
 * earliest to be deleted
 */
function DeleteOrder({ rmid }) {
    // removeId has to be in state
    // atm, doesn't meant to be modified anywhere in the component
    const [ removeId ] = useState(rmid);
    
    /** go ahead delete it. reload's sloppy */
    const handleRemoval = (removeOrder) => {
        removeOrder().then(_ => {
            return window.location.reload();
        }).catch(err => console.error(err))
        
        return <></>;
    }
    
    return (
      <Mutation
        mutation={REMOVE_ORDER}
        variables={{ removeId }}
        onCompleted={_=>{}}
        onError={(error) => console.error('REMOVE_ORDER error:', error)}
      >
          {
              // Queries declaration gives access to removeOrder
              (removeOrder, { data, loading, error }) => {
                  if (error) {
                      return (
                        <></>
                      )
                  }
              
                  return (
                    <span
                      onClick={_ => {
                          const del = window.confirm('Order will be deleted');
                          if (del) {
                              return handleRemoval(removeOrder);
                          }
                      
                          return null;
                      }}
                      className="badge badge-danger badge-pill ml-1"
                      style={delBadgeStyle}
                    >
                        X
                    </span>
                  )
              }
          }
      </Mutation>
    )
}

const delBadgeStyle = {
    cursor: 'pointer'
}

DeleteOrder.propTypes = {
    rmid: propTypes.number
};

export default DeleteOrder;
