import prismadb from '@/lib/prismadb';
import React from 'react';
import { Motherboard } from './_componenets/Motherboard';
import { BuildForm } from './_componenets/BuildForm';
import { Product } from '@prisma/client';
export type ProfileType={
  id:string
  cases: Pr[],
  CPUs: Pr[],
  GPUs: Pr[],
  motherboards: Pr[],
  powersupplys: Pr[],
  RAMs: { Components: Pr[]  },
  disks: { Components: Pr[]  },
}
 type Pr={
  productId:String
 }
  export type filterItem={
    name:string,
    number:number
  }
  export type Filter= {
    title:String
    list:filterItem[]
  }
const getprofiles= async ()=>{

  const profiles = await prismadb.compatibiltyProfile.findMany({
    // Specify your query parameters here
    include: {
      cases: true,
      CPUs:true,
      GPUs:true,
      motherboards:true,
      powersupplys:true,
      RAMs: { include: { Components: true } },
      disks: { include: { Components: true } },
      
    }
  })
  return profiles as unknown as ProfileType[]
}

const buildPc = async () => {
  try {
   const profiles = await getprofiles()
   const memoryFrequencyy =await prismadb.memoryFrequency.findMany({
    where:{
      memoryboards:{
        some:{
          products:{some:{}}
        }
      }
    }
    ,include:{
      _count:{
        select:{memoryboards:{}}
      }
    }
     })

     const memoryFrequency: Filter = {
      title: "Frequence",
      list: memoryFrequencyy.map((manufacturer) => {
      return {  name:manufacturer.name,
        number: manufacturer._count?.memoryboards ?? 0,
      
      }
      
      }),
    };
     const memoryMarquee =await prismadb.memoryMarque.findMany({
      where:{
        memoryboards:{
          some:{
            products:{some:{}}
          }
        }
      }
      ,include:{
        _count:{
          select:{memoryboards:{}}
        }
      }
       })
       const memoryMarque: Filter = {
        title: "Marque",
        list: memoryMarquee.map((manufacturer) => {
        return {  name:manufacturer.name,
          number: manufacturer._count?.memoryboards ?? 0,
        
        }
        
        }),
      };
       const memoryNumberr =await prismadb.memoryNumber.findMany({
        where:{
          memoryboards:{
            some:{
              products:{some:{}}
            }
          }
        }
        ,include:{
          _count:{
            select:{memoryboards:{}}
          }
        }
         })
         const memoryNumber: Filter = {
          title: "Capacity",
          list: memoryNumberr.map((manufacturer) => {
          return {  name:manufacturer.number.toString()+" Gb",
            number: manufacturer._count?.memoryboards ?? 0,
          
          }
          
          }),
        };
         const memoryTypee =await prismadb.memoryType.findMany({
          where:{
            memoryboards:{
              some:{
                products:{some:{}}
              }
            }
          }
          ,include:{
            _count:{
              select:{memoryboards:{}}
            }
          }
           })
           const memoryType: Filter = {
            title: "Type",
            list: memoryTypee.map((manufacturer) => {
            return {  name:manufacturer.name,
              number: manufacturer._count?.memoryboards ?? 0,
            
            }
            
            }),
          };

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
    return (
      <div>
        <BuildForm 
        motherboardchipset={motherboardchipset}
        motherboardcpusupport={motherboardcpusupport}
        motherboardformat={motherboardformat}
        motherboardramslots={motherboardramslots}
        motherboardmanufacturer={motherboardmanufacturer}
         profiles={profiles}/>

      </div>
    );
  } catch (error) {
    console.error('Error fetching compatibility profiles:', error);
    // Handle the error as needed
    return <div>Error loading profiles</div>;
  }
};

export default buildPc;
