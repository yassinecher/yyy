"use client"
import { CartItem } from '@/hooks/use-cart';
import React from 'react';

const Invoice = (props:{ invoiceData:CartItem[] }) => {
  return (
    <div className='container '>
      <h1>Facture</h1>
      <table className="table-fixed border-collapse border border-slate-500 bg-white">
  <thead>
    <tr>
      <th className='border border-slate-600'>Song</th>
      <th className='border border-slate-600'>Artist</th>
      <th  className='border border-slate-600'>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
      <table className="table-auto">
        <thead>
          <tr>
            <th className='border border-black-600'>Description</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.invoiceData.map((item:CartItem, index) => (
             <React.Fragment key={index}>
                 
         <> {
          "idd" in item?<>
 <tr>
             <td>Pc par command</td>
              <td></td>
              <td></td>
              <td></td></tr>
              
              <tr>
              <td>Carte Mére:{item.motherboard.name} </td>
              <td>X1</td>
              <td>{item.motherboard.price} </td>
              <td></td>
              </tr>
              <tr>
              <td>Processeur:{item.processor.name} </td>
              <td>X1</td>
              <td>{item.processor.price} </td>
              <td></td>
              </tr>
              <tr>
              <td>Carte Grapfique:{item.gpu.name} </td>
              <td>X1</td>
              <td>{item.gpu.price} </td>
              <td></td>
              </tr>
              <tr>
              <td>Boitier:{item.case.name} </td>
              <td>X1</td>
              <td>{item.case.price} </td>
              <td></td>
              </tr>
              <tr>
              <td>Bloc d'alimentation:{item.power.name} </td>
              <td>X1</td>
              <td>{item.power.price} </td>
              <td></td>
              </tr>
              <tr>
              <td>Ram:<br/>
              {item.ram.map((e)=><>{e.name}<br/></>)} </td>
              <td><br/>
              {item.ram.map((e)=><>X1<br/></>)}
              </td>
              <td><br/>
              {item.ram.map((e)=><>{e.price}<br/></>)}</td>
              <td></td>

              </tr>
              <tr>
              <td>Stockage Principal:{item.disk.name} </td>
              <td>X1</td>
              <td>{item.disk.price} </td>
              <td></td>
              </tr>
              {
                item.disk2?<>
                 <tr>
                  <td>Stockage Secondaire:{item.disk2.name} </td>
              <td>X1</td>
              <td>{item.disk2.price} </td>
              <td></td>
              </tr>
                </>:<></>
              }
              {
                item.cooling?<>
                 <tr>
                  <td>Refroidisseur CPU:{item.cooling.name} </td>
              <td>X1</td>
              <td>{item.cooling.price} </td>
              <td></td>
              </tr>
                </>:<></>
              } 
            {
                item.screen?<>
                 <tr>
                  <td>Ecran:{item.screen.name} </td>
              <td>X1</td>
              <td>{item.screen.price} </td>
              <td></td>
              </tr>
                </>:<></>
              }
               <tr>
               <td></td>
              <td></td>
              <td></td>
              <td>{item.price}</td></tr>
           </>:<>
           <tr>
           <td>{item.name}</td>
              <td>X{item.number}</td>
              <td>{item.price}</td>
              <td>{item.price*item.number}</td></tr>
           </>

            }
           </> </React.Fragment>
          ))} 
        </tbody>
      </table>
      <p>Total : {calculateTotal(props.invoiceData)} TND</p>
    </div>
  );
};

const calculateTotal = (items:CartItem[]) => {


  return items.reduce((total, item) => total + item.number * item.price, 0);
};

export default Invoice;
