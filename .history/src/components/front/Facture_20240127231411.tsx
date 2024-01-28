"use client"
import { CartItem } from '@/hooks/use-cart';
import React from 'react';
import './facture.css'
const Invoice = (props: { invoiceData: CartItem[] }) => {
  return (
    <div className='container bg-white py-5 my-5'>
      <h1 className='text-2xl font-bold'>Facture</h1>
      <div className='tt my-3 border-gray-200 relative overflow-x-auto shadow-md sm:rounded-lg '>
        <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr className='border-b text-lg'>
                    
              <th  scope="col" className="px-6 py-3" >Nom de produit</th>
              <th  scope="col" className="px-6 py-3" >Quantité</th>
              <th  scope="col" className="px-6 py-3" >Prix unitaire</th>
              <th  scope="col" className="px-6 py-3">Total (en TND)</th>
            </tr>
          </thead>
          <tbody>
            {props.invoiceData.map((item: CartItem, index) => (
              <React.Fragment key={index}>

                <> {
                  "idd" in item ? <>
                    <tr className='bg-white  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                     <td className='px-6 py-4 font-extrabold'>Pc par command</td>
                      <td className='px-6 py-4'>X1</td>
                     <td className='px-6 py-4'>{item.price}</td>
                     <td className='px-6 py-4'>{item.price}</td></tr>

                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                     <td className='px-6 py-4'><b>Carte Mére:</b> {item.motherboard.name} </td>
                     <td className='px-6 py-4'>X1</td>
                     <td className='px-6 py-4'>{item.motherboard.price} </td>
                     <td className='px-6 py-4'></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                     <td className='px-6 py-4'><b>Processeur:</b>{item.processor.name} </td>
                     <td className='px-6 py-4'>X1</td>
                     <td className='px-6 py-4'>{item.processor.price} </td>
                     <td className='px-6 py-4'></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                     <td className='px-6 py-4'><b>Carte Grapfique:</b>{item.gpu.name} </td>
                     <td className='px-6 py-4'>X1</td>
                     <td className='px-6 py-4'>{item.gpu.price} </td>
                     <td className='px-6 py-4'></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                     <td className='px-6 py-4'><b>Boitier:</b>{item.case.name} </td>
                     <td className='px-6 py-4'>X1</td>
                     <td className='px-6 py-4'>{item.case.price} </td>
                     <td className='px-6 py-4'></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                     <td className='px-6 py-4'><b>Bloc d'alimentation:</b>{item.power.name} </td>
                     <td className='px-6 py-4'>X1</td>
                     <td className='px-6 py-4'>{item.power.price} </td>
                     <td className='px-6 py-4'></td>
                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                     <td className='px-6 py-4'><b>Ram:</b><br />
                        {item.ram.map((e) => <>{e.name}<br /></>)} </td>
                     <td className='px-6 py-4'><br />
                        {item.ram.map((e) => <>X1<br /></>)}
                      </td>
                     <td className='px-6 py-4'><br />
                        {item.ram.map((e) => <>{e.price}<br /></>)}</td>
                     <td className='px-6 py-4'></td>

                    </tr>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                     <td className='px-6 py-4'><b>Stockage Principal:</b>{item.disk.name} </td>
                     <td className='px-6 py-4'>X1</td>
                     <td className='px-6 py-4'>{item.disk.price} </td>
                     <td className='px-6 py-4'></td>
                    </tr>
                    {
                      item.disk2 ? <>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                         <td className='px-6 py-4'><b>Stockage Secondaire:</b>{item.disk2.name} </td>
                         <td className='px-6 py-4'>X1</td>
                         <td className='px-6 py-4'>{item.disk2.price} </td>
                         <td className='px-6 py-4'></td>
                        </tr>
                      </> : <></>
                    }
                    {
                      item.cooling ? <>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                         <td className='px-6 py-4'><b>Refroidisseur CPU:</b>{item.cooling.name} </td>
                         <td className='px-6 py-4'>X1</td>
                         <td className='px-6 py-4'>{item.cooling.price} </td>
                         <td className='px-6 py-4'></td>
                        </tr>
                      </> : <></>
                    }
                    {
                      item.screen ? <>
                      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                         <td className='px-6 py-4'><b>Ecran:</b>{item.screen.name} </td>
                         <td className='px-6 py-4'>X1</td>
                         <td className='px-6 py-4'>{item.screen.price} </td>
                         <td className='px-6 py-4'></td>
                        </tr>
                      </> : <></>
                    }
                
                  </> : <>
                  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                    
                     <td className='px-6 py-4'>{item.name}</td>
                     <td className='px-6 py-4'>X{item.number}</td>
                     <td className='px-6 py-4'>{item.price}</td>
                     <td className='px-6 py-4'>{item.price * item.number}</td></tr>
                  </>

                }
                </> </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr className=" bg-white dark:bg-gray-950 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-3 text-base">Total</th>
                <td className="px-6 py-3">X{props.invoiceData.length}</td>
                <td></td>
                <td className="px-6 py-3"> {calculateTotal(props.invoiceData)}</td>
            </tr>
        </tfoot>
        </table>     </div>

    
    </div>
  );
};

const calculateTotal = (items: CartItem[]) => {


  return items.reduce((total, item) => total + item.number * item.price, 0);
};

export default Invoice;
