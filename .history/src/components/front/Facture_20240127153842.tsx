import { CartItem } from '@/hooks/use-cart';
import React from 'react';

const Invoice = (props:{ invoiceData:CartItem[] }) => {
  return (
    <div>
      <h1>Facture</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.invoiceData.map((item:CartItem, index) => (
         <> {
          "idd" in item?<>

             <td>Pc par command</td>
              <td></td>
              <td></td>
              <td></td>
              <td>Carte Mére:{item.motherboard.name} </td>
              <td>X1</td>
              <td>{item.motherboard.price} </td>
              <td></td>
              <td>Processeur:{item.processor.name} </td>
              <td>X1</td>
              <td>{item.processor.price} </td>
              <td></td>
              <td>Carte Grapfique:{item.gpu.name} </td>
              <td>X1</td>
              <td>{item.gpu.price} </td>
              <td></td>
              <td>Boitier:{item.case.name} </td>
              <td>X1</td>
              <td>{item.case.price} </td>
              <td></td>
              <td>Bloc d'alimentation:{item.power.name} </td>
              <td>X1</td>
              <td>{item.power.price} </td>
              <td></td>
              <td>Ram:<br/>
              {item.ram.map((e)=><>{e.name}<br/></>)} </td>
              <td><br/>
              {item.ram.map((e)=><>X1<br/></>)}
              </td>
              <td><br/>
              {item.ram.map((e)=><>{e.price}<br/></>)}</td>
              <td></td>
              <td>Stockage Principal:{item.disk.name} </td>
              <td>X1</td>
              <td>{item.disk.price} </td>
              <td></td>
              {
                item.disk2?<>
                  <td>Stockage Secondaire:{item.disk2.name} </td>
              <td>X1</td>
              <td>{item.disk2.price} </td>
              <td></td>
                
                </>:<></>
              }
              {
                item.cooling?<>
                  <td>Refroidisseur CPU:{item.cooling.name} </td>
              <td>X1</td>
              <td>{item.cooling.price} </td>
              <td></td>
                
                </>:<></>
              } 
            {
                item.screen?<>
                  <td>Ecran:{item.screen.name} </td>
              <td>X1</td>
              <td>{item.screen.price} </td>
              <td></td>
                
                </>:<></>
              }
           </>:<></>

            }
           </> 
          ))} 
        </tbody>
      </table>
      <p>Total : {calculateTotal(invoiceData.items)} TND</p>
    </div>
  );
};

const calculateTotal = (items:CartItem[]) => {


  return items.reduce((total, item) => total + item.number * item.price, 0);
};

export default Invoice;
