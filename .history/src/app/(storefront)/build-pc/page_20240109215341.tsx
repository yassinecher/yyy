import prismadb from '@/lib/prismadb';
import React from 'react';
import { Motherboard } from './_componenets/Motherboard';
import { BuildForm } from './_componenets/BuildForm';
export type ProfileType=typeof prismadb.compatibiltyProfile.findMany extends (
  ...args: any[]
) => Promise<infer T>
  ? T
  : never;
  type filterItem={
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
  return profiles
}

const buildPc = async () => {
  try {
   const profiles = await getprofiles()
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
   const motherboardchipset =await prismadb.motherboardChipset.findMany({
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
     const motherboardcpusupport =await prismadb.cPUSupport.findMany({
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
       const motherboardformat =await prismadb.motherboardFormat.findMany({
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
    return (
      <div>
        <BuildForm 
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
