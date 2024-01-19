import prismadb from "@/lib/prismadb";
import { Filter } from "../../build-pc/page";

export const motherboardFilters=async()=>{

    const motherboardmanufacturerr =await prismadb.manufacturer.findMany({
        where:{
          motherboards:{
            some:{
              products:{some:{}}
            }
          }
        }
        ,include:{
          _count:{
            select:{motherboards:{}}
          }
        }
         })
         const motherboardmanufacturer: Filter = {
          title: "Marque",
          list: motherboardmanufacturerr.map((manufacturer) => {
          return {  name:manufacturer.name,
            number: manufacturer._count?.motherboards ?? 0,
          
          }
          
          }),
        };
         const motherboardramslotss =await prismadb.ramSlots.findMany({
        where:{
          motherboards:{
            some:{
              products:{some:{}}
            }
      
          }
        }  ,include:{
          _count:{
            select:{motherboards:{}}
          }
        }
         })
         const motherboardramslots: Filter = {
          title: "Nombre de barrettes RAM",
          list: motherboardramslotss.map((manufacturer) => {
          return {  name:manufacturer.name,
            number: manufacturer._count?.motherboards ?? 0,
          
          }
          
          }),
        };
         const motherboardchipsett =await prismadb.motherboardChipset.findMany({
          where:{
            motherboards:{
              some:{
                products:{some:{}}
              }
            }
          }  ,include:{
            _count:{
              select:{motherboards:{}}
            }
          }
           })
           const motherboardchipset: Filter = {
            title: "Chipset de la carte mère",
            list: motherboardchipsett.map((manufacturer) => {
            return {  name:manufacturer.name,
              number: manufacturer._count?.motherboards ?? 0,
            
            }
            
            }),
          };
           const motherboardcpusupportt =await prismadb.cPUSupport.findMany({
            where:{
              motherboards:{
                some:{
                  products:{some:{}}
                }
              }
            }  ,include:{
              _count:{
                select:{motherboards:{}}
              }
            }
             })
             const motherboardcpusupport: Filter = {
              title: "Support du processeur",
              list: motherboardcpusupportt.map((manufacturer) => {
              return {  name:manufacturer.name,
                number: manufacturer._count?.motherboards ?? 0,
              
              }
              
              }),
            };
             const motherboardformatt =await prismadb.motherboardFormat.findMany({
              where:{
                motherboards:{
                  some:{
                    products:{some:{}}
                  }
                }
              }  ,include:{
                _count:{
                  select:{motherboards:{}}
                }
              }
               })
               const motherboardformat: Filter = {
                title: "Format de carte mère",
                list: motherboardformatt.map((manufacturer) => {
                return {  name:manufacturer.name,
                  number: manufacturer._count?.motherboards ?? 0,
                
                }
                
                }),
              };

              return {
                motherboardchipset,
                motherboardcpusupport,
                motherboardformat,
                motherboardramslots,
                motherboardmanufacturer,
              }

} 