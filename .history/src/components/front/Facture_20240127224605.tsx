"use client"
import { CartItem } from '@/hooks/use-cart';
import React from 'react';

const Invoice = (props: { invoiceData: CartItem[] }) => {
  return (
    <div className='container '>
      <h1>Facture</h1>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
        <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr >
                    
              <th  scope="col" className="px-6 py-3" >Description</th>
              <th  scope="col" className="px-6 py-3" >Quantité</th>
              <th  scope="col" className="px-6 py-3" >Prix unitaire</th>
              <th  scope="col" className="px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {props.invoiceData.map((item: CartItem, index) => (
              <React.Fragment key={index}>

                <> {
                  "idd" in item ? <>
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                      <td>Pc par command</td>
                      <td></td>
                      <td></td>
                      <td></td></tr>

                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                      <td>Carte Mére:{item.motherboard.name} </td>
                      <td>X1</td>
                      <td>{item.motherboard.price} </td>
                      <td></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                      <td>Processeur:{item.processor.name} </td>
                      <td>X1</td>
                      <td>{item.processor.price} </td>
                      <td></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                      <td>Carte Grapfique:{item.gpu.name} </td>
                      <td>X1</td>
                      <td>{item.gpu.price} </td>
                      <td></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                      <td>Boitier:{item.case.name} </td>
                      <td>X1</td>
                      <td>{item.case.price} </td>
                      <td></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                      <td>Bloc d'alimentation:{item.power.name} </td>
                      <td>X1</td>
                      <td>{item.power.price} </td>
                      <td></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                      <td>Ram:<br />
                        {item.ram.map((e) => <>{e.name}<br /></>)} </td>
                      <td><br />
                        {item.ram.map((e) => <>X1<br /></>)}
                      </td>
                      <td><br />
                        {item.ram.map((e) => <>{e.price}<br /></>)}</td>
                      <td></td>

                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                      <td>Stockage Principal:{item.disk.name} </td>
                      <td>X1</td>
                      <td>{item.disk.price} </td>
                      <td></td>
                    </tr>
                    {
                      item.disk2 ? <>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                          <td>Stockage Secondaire:{item.disk2.name} </td>
                          <td>X1</td>
                          <td>{item.disk2.price} </td>
                          <td></td>
                        </tr>
                      </> : <></>
                    }
                    {
                      item.cooling ? <>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                          <td>Refroidisseur CPU:{item.cooling.name} </td>
                          <td>X1</td>
                          <td>{item.cooling.price} </td>
                          <td></td>
                        </tr>
                      </> : <></>
                    }
                    {
                      item.screen ? <>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                          <td>Ecran:{item.screen.name} </td>
                          <td>X1</td>
                          <td>{item.screen.price} </td>
                          <td></td>
                        </tr>
                      </> : <></>
                    }
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{item.price}</td></tr>
                  </> : <>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                      <td>{item.name}</td>
                      <td>X{item.number}</td>
                      <td>{item.price}</td>
                      <td>{item.price * item.number}</td></tr>
                  </>

                }
                </> </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <p>Total : {calculateTotal(props.invoiceData)} TND</p>
    </div>
  );
};

const calculateTotal = (items: CartItem[]) => {


  return items.reduce((total, item) => total + item.number * item.price, 0);
};

export default Invoice;
