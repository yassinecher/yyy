import prismadb from '@/lib/prismadb';
import React from 'react';
import { Motherboard } from './_componenets/Motherboard';
import { BuildForm } from './_componenets/BuildForm';
export type ProfileType=typeof prismadb.compatibiltyProfile.findMany extends (
  ...args: any[]
) => Promise<infer T>
  ? T
  : never;
  export type Filter= {
    title:String
    list:String[]
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
   const motherboardcath =await prismadb.manufacturer.findMany({
  where:{
    motherboards:{
      some:{
      }
    }
  }
   })
   console.log()
    return (
      <div>
        <BuildForm profiles={profiles}/>

      </div>
    );
  } catch (error) {
    console.error('Error fetching compatibility profiles:', error);
    // Handle the error as needed
    return <div>Error loading profiles</div>;
  }
};

export default buildPc;
